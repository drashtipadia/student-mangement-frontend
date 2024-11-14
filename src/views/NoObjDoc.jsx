import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Header, Input, SelectBox } from "../Component";
import {
  GIA_STREAMS,
  SFI_STREAMS,
  SEMESTER,
  STREAM_ACRONYMS,
} from "../utils/constants";
import { SERVER_HOST, SERVER_PORT } from "../utils/config";
import { handleError, safeFetch } from "../utils";

export function NoObjDoc() {
  useEffect(() => {
    document.title = "NoObjection Form";
  });

  const INSTITUTE_TYPE = localStorage.getItem("token");
  let [searchParams] = useSearchParams();

  if (searchParams.get("id") == null) {
    alert("Student not available");
  }
  const [studnet, setStudent] = useState({
    studentName: "",
    stream: "",
    year: "",
    uuid: searchParams.get("id"),
  });

  const NO_PREFIX = `NO-${INSTITUTE_TYPE}-`;

  const handleInputs = (e) => {
    setStudent({ ...studnet, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const [res, err] = await safeFetch(
      `http://${SERVER_HOST}:${SERVER_PORT}/last-serial/no-objection`
    );
    handleError(err);

    const serial = (res.serial || 0) + 1;
    let docName =
      NO_PREFIX +
      STREAM_ACRONYMS[studnet.stream] +
      "-" +
      String(serial) +
      ".png";

    let data = { ...studnet, docName, noSerial: String(serial) };

    localStorage.setItem("no-objection-info", JSON.stringify(data));
    window.location.href = "/view-noobj";
  };
  return (
    <>
      <Header />
      <div className="container">
        <h2 className="text-center mt-3 text-light">
          No Objection Certificate
        </h2>
        <div className="col d-flex justify-content-center py-3">
          <div className="card bg-light" style={{ width: "50rem" }}>
            <form className="m-4" method="post">
              <div className="row border-3 form-group m-3 align-items-center">
                <Input
                  type="text"
                  name="studentName"
                  label="Student Name:"
                  value={studnet.studentName}
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
                    INSTITUTE_TYPE === "GIA"
                      ? [...GIA_STREAMS]
                      : [...SFI_STREAMS]
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
                  placeholder={"Starting year"}
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
                Generate NoObjection{" "}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
