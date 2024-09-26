import React, { useRef } from "react";
import "../styles/view.css";
import html2canvas from "html2canvas";
import { DocHeader } from "../Component/DocHeader";
import { Header } from "../Component/Header";
import { DocHeader2 } from "../Component/DocHeader2";
import DocFooter from "../Component/DocFooter";

export function ViewBonafide() {
  // const student = JSON.parse(localStorage.getItem("first-trial-info"));
  const documentRef = useRef(null);
  //if (student == null) {
  //   alert("Student is empty");
  // }
  const currentDate = new Date();

  const handleDownload = () => {
    html2canvas(documentRef.current).then((canvas) => {
      canvas.toBlob((blob) => {
        let data = new FormData();
        //     // temporarily named hello.png. -- Still have to do something about doc name prefix
        data.append("first-trial-doc", blob, "hello.png");
        //     // eslint-diable-next-line

        //     fetch(`http://${SERVER_HOST}:${SERVER_PORT}/upload-first-trial`, {
        //         body: data,
        //         method: "POST",
        //         headers: {
        //             uuid: student.uuid,
        //         },
        //         uuid: student.uuid,
        //     })
        //         .then((res) => res.json())
        //         .then(console.log);

        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "mybonofide.png";

        a.click();
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
        <section className=" text-center p-5">
          <div className=" text-primary">
            <h5>Bonofide Certificate</h5>
          </div>
          <p className="text-end">
            Date:
            {currentDate.getDate() +
              "/" +
              currentDate.getMonth() +
              "/" +
              currentDate.getFullYear()}
          </p>
          <div>
            <p className="text-center">
              It is to certify to that,Mr.\Ms.
              <abbr title="attribute" className="fw-bold">
                {" "}
                Patel Aadhya Niketbhai{" "}
              </abbr>{" "}
              is/was enrolled student of this college.He/She is studying{" "}
              <span className="h6"> MSCIT </span> in year{" "}
              <span className="h6"> 2021-2022 </span>
              in this college.Examination of{" "}
              <span className="h6"> 2021-2022</span> held in{" "}
              <span className="h6"> MSCIT sem-3 </span>was completed by them in
              first attempt.
            </p>
          </div>
        </section>
        <DocHeader />
        <div className="p-4 mb-3">
          <h1 className="text-center">Bonofide certificate</h1>
          <br />
          <div className="p-4">
            <p className="text-end">Date: 22/09/2024 </p>
            <div>
              <p className="text-center">
                It is to certify to that,Mr.\Ms.
                <abbr title="attribute" className="fw-bold">
                  Patel Aadhya Niketbhai{" "}
                </abbr>{" "}
                is/was enrolled student of this college.He/She is studying{" "}
                <span className="h6">MSCIT</span> in year{" "}
                <span className="h6">2021-2022</span>
                in this college.Examination of{" "}
                <span className="h6"> 2021-2022 </span> held in{" "}
                <span className="h6">MSCIT sem-3 </span>was completed by them in
                first attempt.
              </p>
              <p className="text-center">
                {" "}
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
