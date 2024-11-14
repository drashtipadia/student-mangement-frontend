import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import html2canvas from "html2canvas";
import {
  DocHeader,
  Header,
  DocFooter,
  ImagePlaceholder,
  Loading,
} from "../Component";
import { BASE_URL } from "../utils/config";
import { safeFetch } from "../utils";
import { STREAM_ACRONYMS } from "../utils/constants";
import "../styles/view.css";

export function ViewBonafide() {
  const [queryParams] = useSearchParams();
  const [student, setStudent] = useState({});
  const [serial, setSerial] = useState(0);
  const [loading, setLoading] = useState(true);
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
    document.title = "Bonafide Document";

    getData();
    setLoading(false);
    // eslint-disable-next-line
  }, []);
  const [haveImgPlaceholder, setHaveImgPlaceholder] = useState(false);

  const PREFIX = `BC-${localStorage.getItem("token")}-${
    STREAM_ACRONYMS[student.stream]
  }-`;

  const documentRef = useRef(null);

  const navigate = useNavigate();

  const handleDownload = async () => {
    const canvas = await html2canvas(documentRef.current);
    canvas.toBlob(async (blob) => {
      const docName = PREFIX + serial + ".png";

      let data = new FormData();
      data.append("doc", blob, docName);
      console.log(docName);

      await fetch(`${BASE_URL}/last-serial`, {
        method: "POST",
        headers: {
          doc_type: "bonafide",
          uuid: studentID,
          docname: docName,
        },
      });

      await fetch(`${BASE_URL}/upload-doc`, {
        body: data,
        method: "POST",
        headers: {
          uuid: studentID,
        },
        uuid: studentID,
      });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = docName;
      a.click();
      navigate(-1);
    });
  };

  if (loading || !student) return <Loading />;

  return (
    <>
      <>
        <Header />
        <div className="justify-content-between d-flex p-4">
          <div>
            <label className="px-2">With Image PlaceHolder</label>
            <input
              type="checkbox"
              checked={haveImgPlaceholder}
              onChange={() => setHaveImgPlaceholder(!haveImgPlaceholder)}
            />
          </div>
          <button className="btn btn-primary" onClick={handleDownload}>
            Download
          </button>
        </div>
        <div
          className="container p-5 bg-light text-black"
          style={{ height: "297mm", width: "210mm" }}
          ref={documentRef}
        >
          <DocHeader
            title={"BONAFIDE CERTIFICATE"}
            serialNo={`Serial No: ${serial}`}
            docDate={"___/___/_______"}
          />
          <div className="p-5">
            {haveImgPlaceholder && <ImagePlaceholder />}

            <p className="text-center">
              It is to certify to that, Mr./Ms.&nbsp;
              <abbr title="attribute" className="fw-bold">
                {`${student.surname} ${student.name} ${student.fathername}`}
              </abbr>
              &nbsp;is/was enrolled student of this college. He/She is studying
              ________________________________________________________ in
              year&nbsp; _______ - _______ in this college.
            </p>
            <p className="text-center">
              As per our belief, he/she has a good characteristic.
            </p>
          </div>
          <DocFooter />
        </div>
        <hr />
      </>
    </>
  );
}
