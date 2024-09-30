import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Header } from "../Component/Header";
import { Input } from "../Component/Input";
import { SelectBox } from "../Component/SelectBox";
import {
  GIA_STREAMS,
  SFI_STREAMS,
  SEMESTER,
  MONTHS,
  STREAM_ACRONYMS,
} from "../utils/constants";
import { SERVER_HOST, SERVER_PORT } from "../utils/config";
import { safeFetch } from "../utils";

function FirstTrialDoc() {
  const inst_type = localStorage.getItem("token");
  let [searchParams] = useSearchParams();
  if (searchParams.get("id") === null) {
    alert("Get yourself an ID first");
  }

  const FT_PREFIX = `FT-${inst_type}-`;

  const [student, setStudent] = useState({
    studentName: "",
    semester: "",
    stream: "",
    year: "",
    examsem: "",
    examstream: "",
    month: "",
    examyear: "",
    uuid: searchParams.get("id"),
  });

  const handleInput = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const [res, err] = await safeFetch(
      `http://${SERVER_HOST}:${SERVER_PORT}/last-serial/first-trial`
    );

    if (err != null) {
      alert("see console");
      console.log(err);
    }

    const serial = (res.serial || 0) + 1;
    let docName =
      FT_PREFIX +
      STREAM_ACRONYMS[student.stream] +
      "-" +
      String(serial) +
      ".png";

    let data = {
      ...student,
      docName,
      ftSerial: String(serial),
    };
    console.log(data);
    localStorage.setItem("first-trial-info", JSON.stringify(data));
    window.location.href = "/view-firstTrial";
  };

  return (
    <>
      <Header />
      <div className="container">
        <h2 className="text-center mt-3 text-light">First Trial Certificate</h2>
        <div className="col d-flex justify-content-center py-3">
          <div className="card bg-light" style={{ width: "50rem" }}>
            <form className="m-4" method="post">
              <div className="row border-3 form-group m-3 align-items-center">
                <Input
                  type="text"
                  name="studentName"
                  label="Student Name:"
                  value={student.studentName}
                  onChange={handleInput}
                  placeholder="SURNAME NAME FATHERNAME"
                />
              </div>
              <div className="row border-3 form-group m-3 align-items-center">
                <SelectBox
                  name="stream"
                  label={"Last Study Stream"}
                  placeholder={"stream"}
                  data={
                    inst_type === "GIA" ? [...GIA_STREAMS] : [...SFI_STREAMS]
                  }
                  onChange={handleInput}
                />
                <SelectBox
                  name="semester"
                  label={""}
                  placeholder={"Select Semester"}
                  onChange={handleInput}
                  data={[...SEMESTER]}
                />
                <Input
                  type="number"
                  name="year"
                  placeholder={"Starting Year"}
                  min="2000"
                  max={new Date().getFullYear()}
                  onChange={handleInput}
                />
              </div>
              <div className="row border-3 form-group m-3 align-items-center">
                <SelectBox
                  name="examstream"
                  label={"Exam of"}
                  placeholder={"stream"}
                  data={
                    inst_type === "GIA" ? [...GIA_STREAMS] : [...SFI_STREAMS]
                  }
                  onChange={handleInput}
                />
                <SelectBox
                  name="examsem"
                  label={"sem"}
                  placeholder={"Semester"}
                  onChange={handleInput}
                  data={[...SEMESTER]}
                />
                <SelectBox
                  name="month"
                  label={""}
                  placeholder={"Month"}
                  data={[...MONTHS]}
                  onChange={handleInput}
                />
                <Input
                  type="number"
                  name="examyear"
                  placeholder={"year"}
                  min="2000"
                  max={new Date().getFullYear()}
                  onChange={handleInput}
                />
              </div>

              <hr />
              <button
                type="submit"
                className="btn btn-primary btn-lg w-100"
                onClick={handleSubmit}
              >
                Generate First Trial
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default FirstTrialDoc;
