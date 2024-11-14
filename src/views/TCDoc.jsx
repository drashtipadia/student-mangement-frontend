import { useEffect, useState } from "react";
import { Header } from "../Component/Header";
import { useSearchParams } from "react-router-dom";
import { Input } from "../Component/Input";
import { SelectBox } from "../Component/SelectBox";
import {
  SEMESTER,
  GIA_STREAMS,
  SFI_STREAMS,
  STREAM_ACRONYMS,
  MONTHS,
} from "../utils/constants";

import { SERVER_HOST, SERVER_PORT } from "../utils/config";
import { handleError, safeFetch } from "../utils";

function TCDoc() {
  useEffect(() => {
    document.title = "Transfer Certificate";
  });

  const INSTITUTE_TYPE = localStorage.getItem("token");
  let [searchParams] = useSearchParams();
  if (searchParams.get("id") === null) {
    alert("Get yourself an ID first");
  }

  const TC_PREFIX = `TC-${INSTITUTE_TYPE}-`;

  const [student, setStudent] = useState({
    studentName: "",
    stream: "",
    semester: "",
    examyear: "",
    seatno: "",
    exam_month: "",
    start_date: "",
    end_date: "",
    result: "",
    no_pass_subject: "",
    next_study_stream: "",
    next_study_sem: "",
    tc_mg_no: "",
    nameofhead: "",
    uuid: searchParams.get("id"),
  });

  const handleInputs = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const [res, err] = await safeFetch(
      `http://${SERVER_HOST}:${SERVER_PORT}/last-serial/tc`
    );
    handleError(err);

    const serial = (res.serial || 0) + 1;
    let docName =
      TC_PREFIX +
      STREAM_ACRONYMS[student.stream] +
      "-" +
      String(serial) +
      ".png";

    let data = {
      ...student,
      docName,
      tcSerial: String(serial),
    };
    console.log(data);
    localStorage.setItem("tc-info", JSON.stringify(data));
    window.location.href = "/view-tc";
  };

  return (
    <>
      <Header />
      <div className="container">
        <h2 className="text-center mt-3 text-light">Transfer Certificate</h2>
        <div className="col d-flex justify-content-center py-3">
          <div className="card" style={{ width: "50rem" }}>
            <form className="m-4" method="post">
              <div className="row border-3 form-group m-2 align-items-center">
                <Input
                  type="text"
                  name="studentName"
                  label="Student Name:"
                  value={student.studentName}
                  placeholder="SURNAME NAME FATHERNAME"
                  onChange={handleInputs}
                />
              </div>
              <div className="row border-3 form-group m-3 align-items-center">
                <SelectBox
                  name="stream"
                  label={"1.Last Exam"}
                  onChange={handleInputs}
                  placeholder={"Select stream"}
                  data={
                    INSTITUTE_TYPE === "GIA"
                      ? [...GIA_STREAMS]
                      : [...SFI_STREAMS]
                  }
                />
                <SelectBox
                  name="semester"
                  label={""}
                  onChange={handleInputs}
                  placeholder={"Select Semester"}
                  data={[...SEMESTER]}
                />
                <Input
                  type="number"
                  name="examyear"
                  placeholder={"year"}
                  min="2000"
                  max={new Date().getFullYear()}
                  value={student.examyear}
                  onChange={handleInputs}
                />
              </div>
              <div className="row border-3 form-group m-3 align-items-center">
                <Input
                  type="date"
                  name="start_date"
                  label="Starting date"
                  value={student.start_date}
                  onChange={handleInputs}
                />
                <Input
                  type="date"
                  name="end_date"
                  label="Ending date"
                  value={student.end_date}
                  onChange={handleInputs}
                />
              </div>

              <div className="row border-3 form-group m-3 align-items-center">
                <Input
                  type="text"
                  name="seatno"
                  label="2.Exam"
                  value={student.seatno}
                  placeholder="SEAT NO"
                  onChange={handleInputs}
                />
                <SelectBox
                  name="result"
                  placeholder={"Result"}
                  data={[
                    { label: "Passed", value: "Passed" },
                    { label: "Failed", value: "Failed" },
                  ]}
                  onChange={handleInputs}
                />
                <SelectBox
                  name="exam_month"
                  placeholder={"Exam Month"}
                  data={[...MONTHS]}
                  onChange={handleInputs}
                />
                <Input
                  type="text"
                  name="no_pass_subject"
                  label="Subject Pass"
                  value={student.no_pass_subject}
                  placeholder="No Subject"
                  onChange={handleInputs}
                />
              </div>

              <div className="row border-3 form-group m-2 align-items-center">
                <SelectBox
                  name="next_study_stream"
                  label={"3.Next Study Year"}
                  onChange={handleInputs}
                  placeholder={"Select stream"}
                  data={
                    INSTITUTE_TYPE === "GIA"
                      ? [...GIA_STREAMS]
                      : [...SFI_STREAMS]
                  }
                />
                <SelectBox
                  name="next_study_sem"
                  label={""}
                  onChange={handleInputs}
                  placeholder={"Select Semester"}
                  data={[...SEMESTER]}
                />
              </div>
              <div className="row border-3 form-group m-2 align-items-center">
                <Input
                  type="text"
                  label="NO: G.K.C.K./TC/Migration"
                  name="tc_mg_no"
                  value={student.tc_mg_no}
                  onChange={handleInputs}
                  placeholder={"G.K.C.K./TC/Migration "}
                />
                <Input
                  type="text"
                  label="Principal/General Secretary"
                  name="nameofhead"
                  value={student.nameofhead}
                  onChange={handleInputs}
                  placeholder={"Name "}
                />
              </div>

              <hr />
              <button
                type="submit"
                className="btn btn-primary btn-lg w-100"
                onClick={handleSubmit}
              >
                Generate TC
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default TCDoc;
