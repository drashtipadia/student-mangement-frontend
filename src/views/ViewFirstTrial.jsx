// import React from 'react'
import { useRef } from "react";
import "../styles/view.css";
import html2canvas from "html2canvas";
import { SERVER_HOST, SERVER_PORT } from "../utils/config";

export function ViewFirstTrial() {
  const student = JSON.parse(localStorage.getItem("first-trial-info"));
  const documentRef = useRef(null);
  if (student == null) {
    alert("Student is empty");
  }

  const handleDownload = () => {
    html2canvas(documentRef.current).then((canvas) => {
      canvas.toBlob((blob) => {
        let data = new FormData();
        // temporarily named hello.png. -- Still have to do something about doc name prefix
        data.append("first-trial-doc", blob, "hello.png");
        // eslint-diable-next-line

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
        a.download = "mytc.png";

        a.click();
      });
    });
  };

  return (
    <>
      <button className="btn btn-primary" onClick={handleDownload}>
        Download
      </button>
      <div className="container" style={{ height: "100vh" }} ref={documentRef}>
        <h1>First Effort Document</h1>
        <p>This is to certify that, {student.studentName}</p>
        <br />
        <p>
          In Year {student.year} was studying {student.stream} in this college.
        </p>
        <br />
        <p>
          Examination of {student.examstream} held in {student.month}-
          {student.examyear} was completed by them in first attempt.
        </p>
      </div>
      <hr />
    </>
  );
}
