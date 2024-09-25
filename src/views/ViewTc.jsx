import React, { useRef } from "react";
import "../styles/view.css";
import html2canvas from "html2canvas";
import { DocHeader } from "../Component/DocHeader";
import { Header } from "../Component/Header";
import DocFooter from "../Component/DocFooter";

export default function ViewTc() {
  const currentDate = new Date();
  // const student = JSON.parse(localStorage.getItem("first-trial-info"));
  const documentRef = useRef(null);
  //if (student == null) {
  //   alert("Student is empty");
  // }

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
        a.download = "mytc.png";

        a.click();
      });
    });
  };

  return (
    <>
      <Header />

      <div
        className="container p-2"
        style={{ height: "297mm", width: "210mm" }}
        ref={documentRef}
      >
        <DocHeader />
        <div className="p-4">
          <h1 className="text-center">Leaving Certificate</h1>
          <br />
          <div className="p-4">
            <p className="text-end">
              Date:
              {currentDate.getDate() +
                "/" +
                currentDate.getMonth() +
                "/" +
                currentDate.getFullYear()}
            </p>
            <p>
              &emsp; &emsp; &emsp; &emsp; This is to certify to that, Mr.\Ms.{" "}
              <span className="h6">
                {" "}
                <abbr title="attribute">---Name--- </abbr>{" "}
              </span>{" "}
              was the student of this college.
            </p>
            <ol>
              <li>
                He/She gave exam of <span className="h6">---Stream---</span> in
                year <span className="h6">--2023--</span> <br />
                <span className="h6">-----</span>June
                <span className="h6">-YEAR-</span>to October,
                <span className="h6">-YEAR-</span>
                <br />
                <span className="h6">-----</span>Navember
                <span className="h6">-YEAR-</span>to March,
                <span className="h6">-YEAR-</span>
                <br />
              </li>
              <li>
                As a student of this college he/she has passed/not-passed{" "}
                <span className="h6">B.A.</span> exam in{" "}
                <span className="h6">July 2023</span> but got exam exemption in
                <span className="h6"> 7 </span>Subjects.
              </li>
              <li>
                He/she Would have been on{" "}
                <span className="h6"> BCA SEM-6 </span> if his/her education was
                continued.
              </li>
              <li>He/She does not have debts of this college's books </li>
              <li>He/She does not have any other debts of this college</li>
              <li>His/Her behavior is good.</li>
              <li>His/Her Optional subjects were as given below.</li>
              <li>------Optional Subjcet--------</li>
              <li>
                The University has satisfactorily completed the prescribed
                course of exercises. He/She was given medical reasons/N.C.C.
                member Exempted from exercise.
              </li>
              <li>
                His/Her Enrollment/Eligibility Certificate/T.C. Number{" "}
                <span className="h6">TC-BCA-6</span>as of date{" "}
                <span className="h6"> 27/10/2022</span>
              </li>
              <li>
                His/Her Examination of <span className="h6">TC-BCA-6</span> seat
                number <span className="h6">2596333</span>. Result{" "}
                <span className="h6">Pass/Failed</span>
              </li>
              <li>
                They are not debarred or rusticated by uinversity or college.
              </li>
              <li>Note:(Inform about EBC-CB & other scholarship)</li>
            </ol>
            <p>
              No:G.K.C.K/TC/Migration <span className="h6">-------</span>
            </p>
            <p>
              The Principal/The General Secretary
              <span className="h6">-------</span> college/university.
            </p>

            <DocFooter />
          </div>
        </div>
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
