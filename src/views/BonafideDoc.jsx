import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Header } from "../Component/Header";
import { Input } from "../Component/Input";
import { SelectBox } from "../Component/SelectBox";
import {
  GIA_STREAMS,
  SFI_STREAMS,
  SEMESTER,
  STREAM_ACRONYMS,
} from "../utils/constants";
import { SERVER_HOST, SERVER_PORT } from "../utils/config";
import { handleError, safeFetch } from "../utils";

function BonafideDoc() {
  const inst_type = localStorage.getItem("token");
  let [searchParams] = useSearchParams();
  if (searchParams.get("id") === null) {
    alert("Student Not exits");
  }
  const [student, setStudent] = useState({
    studentName: "",
    stream: "",
    year: "",
    semester: "",
    uuid: searchParams.get("id"),
  });
  const BC_PREFIX = `BC-${inst_type}-`;

  const handleInputs = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(studnet);

    const [res, err] = await safeFetch(
      `http://${SERVER_HOST}:${SERVER_PORT}/last-serial/bonafide`
    );
    handleError(err);

    const serial = (res.serial || 0) + 1;
    let docName =
      BC_PREFIX +
      STREAM_ACRONYMS[student.stream] +
      "-" +
      String(serial) +
      ".png";
    let data = {
      ...student,
      docName,
      bcSerial: String(serial),
    };
    localStorage.setItem("bonafide-info", JSON.stringify(data));
    window.location.href = "/view-bonafide";

    // window.location.href = "/view-bonafide";
  };

  return (
    <>
      <Header />
      <div className="container">
        <h2 className="text-center mt-3 text-light">Bonofide Certificate</h2>
        <div className="col d-flex justify-content-center py-3">
          <div className="card bg-light" style={{ width: "50rem" }}>
            <form className="m-4" method="post">
              <div className="row border-3 form-group m-3 align-items-center">
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
                  label={"Stream"}
                  placeholder={"Select stream"}
                  onChange={handleInputs}
                  data={
                    inst_type === "GIA" ? [...GIA_STREAMS] : [...SFI_STREAMS]
                  }
                />
                <SelectBox
                  name="semester"
                  label={""}
                  placeholder={"Select Semester"}
                  onChange={handleInputs}
                  data={[...SEMESTER]}
                />
                <Input
                  type="number"
                  name="year"
                  placeholder={"year"}
                  min="2000"
                  max={new Date().getFullYear()}
                  onChange={handleInputs}
                />
              </div>

              <hr />
              <button
                type="submit"
                className="btn btn-primary btn-lg w-100"
                onClick={handleSubmit}
              >
                {" "}
                Generate Bonafide{" "}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default BonafideDoc;
