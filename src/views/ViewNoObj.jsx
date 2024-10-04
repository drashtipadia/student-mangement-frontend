import React, { useRef } from "react";
import "../styles/view.css";
import html2canvas from "html2canvas";
import { SERVER_HOST, SERVER_PORT } from "../utils/config";
import { DocHeader } from "../Component/DocHeader";
import { Header } from "../Component/Header";
import { DocHeader2 } from "../Component/DocHeader2";
import DocFooter from "../Component/DocFooter";
import { Badge } from "../Component/Badge";
import { useNavigate } from "react-router-dom";
import ImagePlaceholder from "../Component/ImagePlaceholder";

export default function ViewNoObj() {
  const currentDate = new Date();
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

      <div
        className="container p-5 bg-light"
        style={{ height: "297mm", width: "210mm" }}
        ref={documentRef}
      >
        {/* <DocHeader2 />
        <section className="p-5">
          <div className="text-center  text-primary">
            <h5>No Objection Certificate</h5>
          </div>

          <Badge>NoObj No:{student.noSerial}</Badge>
          <p className="text-end">
            Date:{" "}
            {currentDate.getDate() +
              "/" +
              currentDate.getMonth() +
              "/" +
              currentDate.getFullYear()}
          </p>



          <p className="text-center">
            This is to certify to that,Mr./Ms.{" "}
            <abbr title="attribute" className="fw-bold">
              {student.studentName}
            </abbr>{" "}
            last year <span className="h6">{student.year}-{Number(student.year) + 1} </span>
            was studying <span className="h6"> {student.stream} </span>
            in this college.This institution does not have any objection if
            he/she gets admission to another college in the current year.
          </p>

        </section>
        <hr /> */}
        <DocHeader title={"NO OBJECTION CERTIFICATE"} serialNo={`NoObj No: ${student.noSerial}`} />
        <div className="p-5">
          {/* <h1 className="text-center">NO OBJECTION CERTIFICATE</h1>
          <br />
          <Badge>NoObj No: {student.noSerial}</Badge>
          <p className="text-end"> Date:{" "}
            {currentDate.getDate() +
              "/" +
              currentDate.getMonth() +
              "/" +
              currentDate.getFullYear()} </p> */}

          {/* <ImagePlaceholder /> */}

          <p className="text-center">
            This is to certify that, Mr./Ms.{" "}
            <abbr title="attribute" className="fw-bold">
              {student.studentName}
            </abbr>{" "}
            was studying <span className="h6 fw-bold">{student.stream} </span>in the year <span className="h-6 fw-bold">{student.year} </span>
            {/* last year <span className="h6 fw-bold">{student.year}-{Number(student.year) + 1} </span>
              was studying <span className="h6 fw-bold"> {student.stream} </span> */}
            in this college. This institution does not have any objection, if
            he/she gets admission to another college in the current year.
          </p>

        </div>
        <DocFooter />
      </div>
      <div className="justify-content-center">
        <button className="btn btn-primary " onClick={handleDownload}>
          Download
        </button>
      </div>
    </>
  );
}
