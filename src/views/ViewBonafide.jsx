import React, { useRef } from "react";
import "../styles/view.css";
import html2canvas from "html2canvas";
import { DocHeader } from "../Component/DocHeader";
import { Header } from "../Component/Header";
import { DocHeader2 } from "../Component/DocHeader2";
import DocFooter from "../Component/DocFooter";
import { useNavigate } from "react-router-dom";
import { SERVER_HOST, SERVER_PORT } from "../utils/config";
import { Badge } from "../Component/Badge";



export function ViewBonafide() {
  const student = JSON.parse(localStorage.getItem("bonafide-info"));
  const documentRef = useRef(null);
  if (student == null) {
    alert("Student is empty");
  }
  const currentDate = new Date();
  const navigate = useNavigate();

  const handleDownload = () => {
    html2canvas(documentRef.current).then((canvas) => {
      canvas.toBlob((blob) => {
        let data = new FormData();
        data.append("bc-doc", blob, student.docName);
        // eslint-diable-next-line
        fetch(`http://${SERVER_HOST}:${SERVER_PORT}/last-serial`, {
          method: "POST",
          headers: {
            doc_type: "bonafide",
            uuid: student.uuid,
            docname: student.docName,
          }
        });

        fetch(`http://${SERVER_HOST}:${SERVER_PORT}/upload-bc`, {
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
        localStorage.removeItem("bonafide-info");
      });
    });
  };

  return (
    <>
      <Header />

      <div
        className="container p-5 bg-light"
        style={{ height: "297mm", width: "210mm" }}
        ref={documentRef}
      >
        <DocHeader2 />
        <section className="p-5">
          <div className="text-center text-primary">
            <h5>Bonofide Certificate</h5>
          </div>
          <Badge>Bonafide No:{student.bcSerial}</Badge>
          <p className="text-end">
            Date:
            {
              currentDate.getDate() +
              "/" +
              currentDate.getMonth() +
              "/" +
              currentDate.getFullYear()} }
          </p>
          <div>
            <p className="text-center">
              It is to certify to that,Mr./Ms.{" "}
              <abbr title="attribute" className="fw-bold">

                {student.studentName}
              </abbr>{" "}
              is/was enrolled student of this college.He/She is studying{" "}
              <span className="h6"> {student.stream} </span> in year{" "}
              <span className="h6">{student.year}</span>
              in this college.

            </p>
          </div>
        </section>
        <hr />
        <DocHeader />
        <div className="p-4 mb-3">
          <h1 className="text-center">Bonofide certificate</h1>
          <br />
          <div className="p-4">
            <p className="text-end"> Date:
              {
                currentDate.getDate() +
                "/" +
                currentDate.getMonth() +
                "/" +
                currentDate.getFullYear()} } </p>
            <div>
              <p className="text-center">
                It is to certify to that,Mr./Ms.{" "}
                <abbr title="attribute" className="fw-bold">
                  {student.studentName}
                </abbr>{" "}
                is/was enrolled student of this college.He/She is studying
                <span className="h6">{student.stream}</span> in year
                <span className="h6">{student.year}</span>
                in this college.
              </p>
              <p className="text-center">

                As per our belief, he/she has a good characteristic.
              </p>
            </div>
          </div>
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
