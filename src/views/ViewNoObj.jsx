import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import html2canvas from "html2canvas";
import { DocHeader, Header, DocFooter, Loading } from "../Component";
import { safeFetch } from "../utils";
import { BASE_URL } from "../utils/config";
import { STREAM_ACRONYMS } from "../utils/constants";
import "../styles/view.css";

export function ViewNoObj() {
  const [queryParams] = useSearchParams();
  const [student, setStudent] = useState({});
  const [loading, setLoading] = useState(true);
  const [serial, setSerial] = useState(0);
  const currentYear = new Date().getFullYear();
  const studentID = queryParams.get("id");

  const getData = async () => {
    try {
      let [resp, err] = await safeFetch(`${BASE_URL}/students/id/${studentID}`);
      if (err) throw new Error(err);
      setStudent({ ...resp.student });

      [resp, err] = await safeFetch(`${BASE_URL}/last-serial/bonafide`);
      if (err) throw new Error(err);
      setSerial((Number(resp.serial) || 0) + 1);
    } catch (e) {
      alert("Some error occured");
      throw new Error(e);
    }
  };

  useEffect(() => {
    document.title = "No Objection Document";

    getData();
    setLoading(false);

    // eslint-disable-next-line
  }, []);

  const documentRef = useRef(null);
  const PREFIX = `NO-${localStorage.getItem("token")}-${
    STREAM_ACRONYMS[student.stream]
  }-`;

  const handleDownload = async () => {
    const canvas = await html2canvas(documentRef.current);
    canvas.toBlob((blob) => {
      const docname = PREFIX + serial + ".png";

      let data = new FormData();
      data.append("doc", blob, docname);

      fetch(`${BASE_URL}/last-serial`, {
        method: "POST",
        headers: {
          doc_type: "no-objection",
          uuid: studentID,
          docname,
        },
      });

      fetch(`${BASE_URL}/upload-doc`, {
        body: data,
        method: "POST",
        headers: {
          uuid: studentID,
        },
        uuid: studentID,
      })
        .then((res) => res.json())
        .then(console.log);
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = docname;
      a.click();
    });
  };

  if (loading && !student) return <Loading />;

  return (
    <>
      <Header />
      <div className="justify-between p-4">
        <button
          className="text-center border text-xl rounded py-1 bg-blue-600 text-white hover:bg-blue-700  block mx-auto "
          onClick={handleDownload}
        >
          Download
        </button>
      </div>
      <div className="flex justify-center">
        <div
          className=" p-5  border border-black "
          style={{ height: "297mm", width: "210mm" }}
          ref={documentRef}
        >
          <DocHeader
            title={"NO OBJECTION CERTIFICATE"}
            serialNo={`NoObj No: ${serial}`}
          />
          <div className="p-5">
            <p className="text-center">
              This is to certify that, Mr./Ms.&nbsp;
              <abbr title="attribute" className="fw-bold">
                {`${student.surname} ${student.name} ${student.fathername}`}
              </abbr>
              &nbsp;was studying&nbsp;
              <span className="h6 fw-bold">{student.stream}</span> in the
              year&nbsp;
              <span className="h-6 fw-bold">{currentYear}</span>&nbsp;in this
              college. This institution does not have any objection, if he/she
              gets admission to another college in the current year.
            </p>
          </div>
          <DocFooter />
        </div>
      </div>
    </>
  );
}
