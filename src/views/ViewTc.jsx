import { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import html2canvas from "html2canvas";
import { DocHeader, Header, DocFooter, Loading } from "../Component";
import { SERVER_HOST, SERVER_PORT } from "../utils/config";
import "../styles/view.css";

export function ViewTc() {
  const navigate = useNavigate();
  const [searchparam] = useSearchParams();
  useEffect(() => {
    document.title = "Transfer Certificate";
  }, []);

  useEffect(() => {
    if (localStorage.getItem("tc-info") === null) {
      alert("Student details are not set.");
      navigate("/");
    }
  }, [navigate]);

  const currentDate = new Date();
  const student = JSON.parse(localStorage.getItem("tc-info"));
  const documentRef = useRef(null);

  const handleDownload = () => {
    html2canvas(documentRef.current).then((canvas) => {
      canvas.toBlob((blob) => {
        if (searchparam.get("save") == "1") {
          let data = new FormData();
          data.append("doc", blob, student.docName);

          fetch(`http://${SERVER_HOST}:${SERVER_PORT}/last-serial`, {
            method: "POST",
            headers: {
              doc_type: "tc",
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
        }
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = student.docName;

        a.click();

        navigate(-2);
        localStorage.removeItem("tc-info");
      });
    });
  };

  if (student === null) return <Loading />;

  return (
    <>
      <Header />
      <div className="justify-between p-4">
        <button
          className="text-center border text-xl rounded py-1 bg-blue-600 text-white hover:bg-blue-700 block mx-auto"
          onClick={handleDownload}
        >
          Download
        </button>
      </div>
      <div className="flex justify-center">
        <div
          className="p-5 border border-black bg-white"
          style={{ height: "297mm", width: "210mm" }}
          ref={documentRef}
        >
          <DocHeader
            title={"TRANSFER CERTIFICATE"}
            serialNo={`TC No: ${student.tcSerial}`}
          />
          <div className="p-5">
            <p>
              &emsp; &emsp; &emsp; &emsp; This is to certify to that, Mr./Ms.{" "}
              <abbr title="attribute font-bold">{student.studentName}</abbr>
              &nbsp;was the student of this college.
            </p>
            <br />
            <ol className="m-0 list-disc space-y-2">
              <li>
                He/She gave exam of {student.stream} sem&nbsp;
                {student.semester} in year {student.examyear}
                <br />
                {student.start_date} to {student.end_date}.
                <br />
              </li>
              <li>
                As a student of this college he/she has {student.result}
                {student.lastexam} exam in {student.exam_month} -&nbsp;
                {student.examyear} but got exam exemption in
                <span> {student.no_pass_subject} </span>subjects.
              </li>
              <li>
                He/she Would have been on
                <span> {student.next_study} </span>if his/her education was
                continued.
              </li>
              <li>He/She does not have debts of this college&apos;s books. </li>
              <li>He/She does not have any other debts of this college.</li>
              <li>His/Her behavior is good.</li>
              <li>His/Her Optional subjects were as given below.</li>

              <li>
                The University has satisfactorily completed the prescribed
                course of exercises. He/She was given medical reasons/N.C.C.
                member Exempted from exercise.
              </li>
              <li>
                His/Her Enrollment/Eligibility Certificate/T.C. Number
                <span> TC.No.{student.tcSerial} </span>as of date&nbsp;
                <span>
                  {currentDate.getDate() +
                    "/" +
                    currentDate.getMonth() +
                    "/" +
                    currentDate.getFullYear()}
                  .
                </span>
              </li>
              <li>
                His/Her Examination of
                {student.lastexam} sem-{student.semester}
                &nbsp;seat number {student.seatno} Result {student.result}.
              </li>
              <li>
                They are not debarred or rusticated by university or college.
              </li>
              <li>Note:(Inform about EBC-CB & other scholarship).</li>
            </ol>
            <p>
              The Principal/The General Secretary To {student.nameofhead}{" "}
              college/university.
            </p>
            <br />
            <br />
            <br />
            <br />
            <DocFooter />
          </div>
        </div>
      </div>
    </>
  );
}
