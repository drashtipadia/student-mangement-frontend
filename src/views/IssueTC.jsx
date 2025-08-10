import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Header, Input, SelectBox } from "../Component";
import {
  SEMESTER,
  GIA_STREAMS,
  SFI_STREAMS,
  STREAM_ACRONYMS,
  MONTHS,
} from "../utils/constants";

import { BASE_URL } from "../utils/config";
import { handleError, safeFetch } from "../utils";
export function IssueTC() {
  useEffect(() => {
    document.title = "Transfer Certificate";
  }, []);

  const INSTITUTE_TYPE = localStorage.getItem("token");
  let [searchParams] = useSearchParams();

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
    next_study: "",
    tc_mg_no: "",
    nameofhead: "",
    enrollment_no: "",
    uuid: searchParams.get("id"),
  });

  const handleInputs = useCallback((e) => {
    setStudent((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const [res, err] = await safeFetch(`${BASE_URL}/last-serial/tc`);
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
    localStorage.setItem("tc-info", JSON.stringify(data));
    window.location.href = "/view-tc";
  };
  return (
    <>
      <Header />
      <h2 className="text-center mb-6 mt-3 text-2xl font-semibold">
        Transfer Certificate
      </h2>
      <div className=" flex items-center justify-center mt-6 ">
        <div className="bg-surface-container-high  rounded-2xl shadow-lg p-4 border-2">
          <form className="space-y-2">
            <Input
              type="text"
              name="enrollment_no"
              label="Enrollment No"
              value={student.enrollment_no}
              onChange={handleInputs}
            />

            <Input
              type="text"
              name="studentName"
              label="Student Name"
              value={student.studentName}
              onChange={handleInputs}
            />

            <div className="flex flex-wrap gap-2">
              <SelectBox
                name="stream"
                label={"Last Exam"}
                onChange={handleInputs}
                placeholder={"Select stream"}
                data={
                  INSTITUTE_TYPE === "GIA" ? [...GIA_STREAMS] : [...SFI_STREAMS]
                }
              />

              <SelectBox
                name="semester"
                onChange={handleInputs}
                placeholder={"Select Semester"}
                data={[...SEMESTER]}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <div className="flex-1">
                <Input
                  type="date"
                  name="start_date"
                  label="Starting date"
                  value={student.start_date}
                  onChange={handleInputs}
                />
              </div>
              <div className="flex-1">
                <Input
                  type="date"
                  name="end_date"
                  label="Ending date"
                  value={student.end_date}
                  onChange={handleInputs}
                />
              </div>
            </div>

            <div className="flex flex-wrap ">
              <div className="flex-1">
                <Input
                  type="text"
                  name="seatno"
                  label="2.Exam Seat no."
                  value={student.seatno}
                  onChange={handleInputs}
                />
              </div>
              <div className="flex-1">
                <SelectBox
                  name="exam_month"
                  placeholder={"Exam Month"}
                  data={[...MONTHS]}
                  onChange={handleInputs}
                />
              </div>
              <div className="flex-1">
                <Input
                  type="number"
                  name="examyear"
                  label="Exam Year"
                  min="2000"
                  max={new Date().getFullYear()}
                  value={student.examyear}
                  onChange={handleInputs}
                />
              </div>
            </div>

            <div className="flex flex-wrap">
              <div className="flex-1">
                <Input
                  type="text"
                  name="no_pass_subject"
                  label="Number of Subject Pass"
                  value={student.no_pass_subject}
                  onChange={handleInputs}
                />
              </div>
              <div className="flex-1">
                <SelectBox
                  name="result"
                  placeholder={"Result"}
                  data={[
                    { label: "Passed", value: "Passed" },
                    { label: "Failed", value: "Failed" },
                  ]}
                  onChange={handleInputs}
                />
              </div>
            </div>

            <Input
              label="Next Study"
              name="next_study"
              type="text"
              value={student.next_study}
              onChange={handleInputs}
            />

            <Input
              type="text"
              label="To Principal/General Secretary"
              name="nameofhead"
              value={student.nameofhead}
              onChange={handleInputs}
            />

            <hr className="border border-outline/20" />

            <button
              type="submit"
              className="elevated-button"
              onClick={handleSubmit}
            >
              Generate TC
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
