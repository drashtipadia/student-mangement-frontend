import React, { useEffect, useRef, useState } from "react";
import "../styles/view.css";
import { DocHeader } from "../Component/DocHeader";
import { Header } from "../Component/Header";
import DocFooter from "../Component/DocFooter";
import { safeFetch } from "../utils";
import { BASE_URL } from "../utils/config";
import { useSearchParams } from "react-router-dom";
import { STREAM_ACRONYMS } from "../utils/constants";
import html2canvas from "html2canvas";

export default function ViewNoObj() {
  const [queryParams] = useSearchParams();
  const [student, setStudent] = useState({});
  const currentYear = new Date().getFullYear();
  const studentID = queryParams.get("id");
  const [serial, setSerial] = useState(0);

  useEffect(() => {
    document.title = "NoObjection Document";

    safeFetch(`${BASE_URL}/students/id/${studentID}`)
      .then(([resp, _]) => setStudent({ ...resp.student }))
      .catch(console.log);

    safeFetch(`${BASE_URL}/last-serial/no-objection`).then(([resp, err]) => {
      if (err !== null) throw new Error(err);

      setSerial((Number(resp.serial) || 0) + 1);
    });
    // eslint-disable-next-line
  }, []);

  const documentRef = useRef(null);
  const PREFIX = `NO-${localStorage.getItem("token")}-${
    STREAM_ACRONYMS[student.stream]
  }-`;

  // const navigate = useNavigate();
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
    // html2canvas(documentRef.current).then((canvas) => {
    //   canvas.toBlob((blob) => {
    //     let data = new FormData();
    //     data.append("doc", blob, student.docName);
    //     // eslint-diable-next-line
    //     fetch(`http://${SERVER_HOST}:${SERVER_PORT}/last-serial`, {
    //       method: "POST",
    //       headers: {
    //         doc_type: "no-objection",
    //         uuid: student.uuid,
    //         docname: student.docName,
    //       },
    //     });
    //     fetch(`http://${SERVER_HOST}:${SERVER_PORT}/upload-doc`, {
    //       body: data,
    //       method: "POST",
    //       headers: {
    //         uuid: student.uuid,
    //       },
    //       uuid: student.uuid,
    //     })
    //       .then((res) => res.json())
    //       .then(console.log);
    //     const a = document.createElement("a");
    //     a.href = URL.createObjectURL(blob);
    //     a.download = student.docName;
    //     a.click();
    //     navigate("/viewdata");
    //     localStorage.removeItem("no-objection-info");
    //   });
    // });
  };
  return (
    <>
      <Header />
      <div className="justify-content-end d-flex p-4">
        <button className="btn btn-primary " onClick={handleDownload}>
          Download
        </button>
      </div>
      <div
        className="container p-5 bg-light"
        style={{ height: "297mm", width: "210mm" }}
        ref={documentRef}
      >
        <DocHeader
          title={"NO OBJECTION CERTIFICATE"}
          serialNo={`NoObj No: ${1}`}
        />
        <div className="p-5">
          <p className="text-center">
            This is to certify that, Mr./Ms.{" "}
            <abbr title="attribute" className="fw-bold">
              {`${student.surname} ${student.name} ${student.fathername}`}
            </abbr>{" "}
            was studying <span className="h6 fw-bold">{student.stream} </span>in
            the year <span className="h-6 fw-bold">{currentYear} </span>
            in this college. This institution does not have any objection, if
            he/she gets admission to another college in the current year.
          </p>
        </div>
        <DocFooter />
      </div>
    </>
  );
}
