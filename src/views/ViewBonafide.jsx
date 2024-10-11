import React, { useEffect, useRef, useState } from "react";
import "../styles/view.css";
import html2canvas from "html2canvas";
import { DocHeader } from "../Component/DocHeader";
import { Header } from "../Component/Header";
import DocFooter from "../Component/DocFooter";
import { useNavigate } from "react-router-dom";
import { SERVER_HOST, SERVER_PORT } from "../utils/config";
import ImagePlaceholder from "../Component/ImagePlaceholder";

export function ViewBonafide() {

  useEffect(() => { document.title = "Bonafide Document" })
  const [haveImgPlaceholder, setHaveImgPlaceholder] = useState(false)

  const student = JSON.parse(localStorage.getItem("bonafide-info"));
  const documentRef = useRef(null);
  if (student == null) {
    alert("Student is empty");
  }
  const navigate = useNavigate();

  const handleDownload = () => {
    html2canvas(documentRef.current).then((canvas) => {
      canvas.toBlob(async (blob) => {
        let data = new FormData();
        data.append("doc", blob, student.docName);
        // eslint-diable-next-line
        await fetch(`http://${SERVER_HOST}:${SERVER_PORT}/last-serial`, {
          method: "POST",
          headers: {
            doc_type: "bonafide",
            uuid: student.uuid,
            docname: student.docName,
          },
        });

        await fetch(`http://${SERVER_HOST}:${SERVER_PORT}/upload-doc`, {
          body: data,

          method: "POST",
          headers: {
            uuid: student.uuid,
          },
          uuid: student.uuid,
        });

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
      <label className="text-white p-2">With Image PlaceHolder{" "}</label>
      <input
        className="inline"
        type="checkbox"
        name=""
        checked={haveImgPlaceholder}
        onChange={() => setHaveImgPlaceholder(!haveImgPlaceholder)}
      />
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
        <DocHeader title={"BONAFIDE CERTIFICATE"} serialNo={`Bonafide No:${student.bcSerial}`} docDate={"___ /___ /_______"} />
        <div className="p-5">

          {haveImgPlaceholder && <ImagePlaceholder />}

          <p className="text-center">
            It is to certify to that, Mr./Ms.{" "}
            <abbr title="attribute" className="fw-bold">
              {student.studentName}
            </abbr>{" "}
            is/was enrolled student of this college. He/She is studying ________________________________________________________ in year{" "}
            _______ - _______ in this college.
          </p>
          <p className="text-center">
            As per our belief, he/she has a good characteristic.
          </p>

        </div>
        <DocFooter />
      </div>
      <hr />

    </>
  );
}
