import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Header } from "../Component/Header";
import { Input } from "../Component/Input";
import { SelectBox } from "../Component/SelectBox";
import { GIA_STREAMS, SFI_STREAMS, SEMESTER, MONTHS } from "../utils/constants";

function FirstTrialDoc() {
  const inst_type = localStorage.getItem("token");
  let [searchParams] = useSearchParams();
  if (searchParams.get("id") === null) {
    alert("Get yourself an ID first");
  }

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

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("first-trial-info", JSON.stringify(student));
    window.location.href = "/view-firstTrial";
  };

  return (
    <>
      <Header />
      <div className="container">
        <h2 className="text-center mt-3">First Trial Certificate</h2>
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
                  placeholder={"year"}
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
                {" "}
                First Trial Certificate{" "}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default FirstTrialDoc;
