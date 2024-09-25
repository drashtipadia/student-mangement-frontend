import React, { useRef } from "react";
import "../styles/view.css";
import html2canvas from "html2canvas";
import { SERVER_HOST, SERVER_PORT } from "../utils/config";
import { DocHeader } from "../Component/DocHeader";
import { Header } from "../Component/Header";
import DocFooter from "../Component/DocFooter";
import { Badge } from "../Component/Badge";

export function ViewFirstTrial() {
  const currentDate = new Date();
  const student = JSON.parse(localStorage.getItem("first-trial-info"));
  const documentRef = useRef(null);
  if (student == null) {
    alert("Student is empty");
  }

  const handleDownload = () => {
    html2canvas(documentRef.current).then((canvas) => {
      canvas.toBlob((blob) => {
        let data = new FormData();
        data.append("first-trial-doc", blob, student.docName);
        // eslint-diable-next-line

        fetch(`http://${SERVER_HOST}:${SERVER_PORT}/add-first-trial`, {
          method: "POST",
          headers: {
            uuid: student.uuid,
            docname: student.docName,
          },
        });

        fetch(`http://${SERVER_HOST}:${SERVER_PORT}/upload-first-trial`, {
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
        // localStorage.removeItem("first-trial-info");
      });
    });
  };

  return (
    <>
      <Header />

      <div
        className="container p-0"
        style={{ height: "297mm", width: "210mm" }}
        ref={documentRef}
      >
        <DocHeader />
        <h1 className="text-center pt-5">First Trial Document</h1>
        <Badge>TC No: {student.ftSerial}</Badge>
        <br />
        <div className="p-4">
          <p className="text-end">
            Date:{" "}
            {currentDate.getDate() +
              "/" +
              currentDate.getMonth() +
              "/" +
              currentDate.getFullYear()}
          </p>
          <p className="text-center">This is to certify that,</p>
          <p className="h6">
            Mr.\Ms. <abbr title="attribute">{student.studentName} </abbr>{" "}
          </p>
          <p>
            &emsp; &emsp; &emsp; &emsp; &emsp; In Year{" "}
            <span className="h6">{student.year}</span> was studying{" "}
            <span className="h6">{student.stream}</span> in this college.
            Examination of <span className="h6"> {student.examstream}</span>{" "}
            held in{" "}
            <span className="h6">
              {student.month}-{student.examyear}{" "}
            </span>
            was completed by them in first attempt.
          </p>
        </div>
        <DocFooter />
      </div>

      <hr />
      <div className="justify-content-center">
        <button className="btn btn-primary " onClick={handleDownload}>
          Download
        </button>
      </div>
    </>
  );
}
