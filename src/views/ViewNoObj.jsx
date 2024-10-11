import React, { useEffect, useRef } from "react";
import "../styles/view.css";
import html2canvas from "html2canvas";
import { SERVER_HOST, SERVER_PORT } from "../utils/config";
import { DocHeader } from "../Component/DocHeader";
import { Header } from "../Component/Header";
import DocFooter from "../Component/DocFooter";
import { useNavigate } from "react-router-dom";

export default function ViewNoObj() {

  useEffect(() => { document.title = "NoObjection Document" })

  const student = JSON.parse(localStorage.getItem("no-objection-info"));
  const documentRef = useRef(null);
  if (student == null) {
    alert("Student is empty");
  }
  const navigate = useNavigate();
  const handleDownload = () => {
    html2canvas(documentRef.current).then((canvas) => {
      canvas.toBlob((blob) => {
        let data = new FormData();
        data.append("doc", blob, student.docName);
        // eslint-diable-next-line

        fetch(`http://${SERVER_HOST}:${SERVER_PORT}/last-serial`, {
          method: "POST",
          headers: {
            doc_type: "no-objection",
            uuid: student.uuid,
            docname: student.docName,
          },
        });

        fetch(`http://${SERVER_HOST}:${SERVER_PORT}/upload-doc`, {
          body: data,
          method: "POST",
          headers: {
            uuid: student.uuid,
          },
          uuid: student.uuid,
        })
          .then((res) => res.json())
          .then(console.log);

        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = student.docName;

        a.click();
        navigate("/viewdata");
        localStorage.removeItem("no-objection-info");
      });
    });
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
        <DocHeader title={"NO OBJECTION CERTIFICATE"} serialNo={`NoObj No: ${student.noSerial}`} />
        <div className="p-5">
          <p className="text-center">
            This is to certify that, Mr./Ms.{" "}
            <abbr title="attribute" className="fw-bold">
              {student.studentName}
            </abbr>{" "}
            was studying <span className="h6 fw-bold">{student.stream} </span>in the year <span className="h-6 fw-bold">{student.year} </span>
            in this college. This institution does not have any objection, if
            he/she gets admission to another college in the current year.
          </p>

        </div>
        <DocFooter />
      </div>


    </>
  );
}
