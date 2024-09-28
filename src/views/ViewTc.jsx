import React, { useRef } from "react";
import "../styles/view.css";
import html2canvas from "html2canvas";
import { SERVER_HOST, SERVER_PORT } from "../utils/config";
import { DocHeader } from "../Component/DocHeader";
import { Header } from "../Component/Header";
import DocFooter from "../Component/DocFooter";
import { Badge } from "../Component/Badge";
import { useNavigate } from "react-router-dom";

export default function ViewTc() {
  const currentDate = new Date();
  const student = JSON.parse(localStorage.getItem("tc-info"));
  const documentRef = useRef(null);
  if (student == null) {
    alert("Student is empty");
  }
  const navigate = useNavigate();

  const handleDownload = () => {
    html2canvas(documentRef.current).then((canvas) => {
      canvas.toBlob((blob) => {
        let data = new FormData();

        data.append("tc-doc", blob, student.docName);
        //     // eslint-diable-next-line

        fetch(`http://${SERVER_HOST}:${SERVER_PORT}/last-serial`, {
          method: "POST",
          headers: {
            doc_type: "tc-doc",
            uuid: student.uuid,
            docname: student.docName,
          },
        });





        fetch(`http://${SERVER_HOST}:${SERVER_PORT}/upload-tc`, {
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
        localStorage.removeItem("tc-info");
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
        <DocHeader />
        <div className="p-4">
          <h4 className="text-center">Leaving Certificate</h4>
          <br />
          <Badge>TC No: {student.tcSerial}</Badge>
          <div className="">
            <p className="text-end">
              Date:
              {currentDate.getDate() +
                "/" +
                currentDate.getMonth() +
                "/" +
                currentDate.getFullYear()
              }
            </p>
            <p>
              &emsp; &emsp; &emsp; &emsp; This is to certify to that, Mr.\Ms.
              <span className="h6"><abbr title="attribute"> {student.studentName}</abbr>
              </span> {" "}
              was the student of this college.
            </p>
            <ol className="m-0">
              <li>
                He/She gave exam of <span className="h6">{student.stream}{" "}sem {student.semester}</span> in
                year <span className="h6">{student.examyear}</span> <br />
                <span className="h6">{student.start_date} to {student.end_date}</span>
                <br />
              </li>
              <li>
                As a student of this college he/she has passed/not-passed{" "}
                <span className="h6">{student.lastexam}</span> exam in{" "}
                <span className="h6">{student.exam_month} - {student.examyear}</span> but got exam exemption in
                <span className="h6"> {student.no_pass_subject} </span>Subjects.
              </li>
              <li>
                He/she Would have been on{" "}
                <span className="h6"> {student.next_study_stream} sem-{student.next_study_sem} </span> if his/her education was
                continued.
              </li>
              <li>He/She does not have debts of this college's books </li>
              <li>He/She does not have any other debts of this college</li>
              <li>His/Her behavior is good.</li>
              <li>His/Her Optional subjects were as given below.</li>

              <li>
                The University has satisfactorily completed the prescribed
                course of exercises. He/She was given medical reasons/N.C.C.
                member Exempted from exercise.
              </li>
              <li>
                His/Her Enrollment/Eligibility Certificate/T.C. Number{" "}
                <span className="h6"> TC.No.{student.tcSerial} </span>as of date{" "}
                <span className="h6">  {currentDate.getDate() + "/" + currentDate.getMonth() + "/" + currentDate.getFullYear()}
                </span>
              </li>
              <li>
                His/Her Examination of <span className="h6">{student.lastexam} sem- {student.semester}</span> seat
                number <span className="h6">{student.seatno}</span>. Result{" "}
                <span className="h6">{student.result}</span>
              </li>
              <li>
                They are not debarred or rusticated by uinversity or college.
              </li>
              <li>Note:(Inform about EBC-CB & other scholarship)</li>
            </ol>
            <p className="m-0">
              No:G.K.C.K/TC/Migration <span className="h6">{student.tc_mg_no}</span>
            </p>
            <p className="m-0">
              The Principal/The General Secretary
              <span className="h6">{student.nameofhead}</span> college/university.
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
