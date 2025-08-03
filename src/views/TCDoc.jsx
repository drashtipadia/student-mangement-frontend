import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
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

export function TCDoc() {
  useEffect(() => {
    document.title = "Transfer Certificate";
  }, []);
  const navigate = useNavigate();

  const INSTITUTE_TYPE = localStorage.getItem("token");
  let [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    if (id === null) {
      alert("Not a valid way to generate TC");
      navigate("/");
    }
  }, [id, navigate]);

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
    uuid: id,
  });

  useEffect(() => {
    (async function () {
      let [resp, err] = await safeFetch(`${BASE_URL}/students/id/${id}`);
      if (err != null) throw new Error(err);

      setStudent((prevStudent) => ({
        ...prevStudent,
        studentName: resp.student.Name,
      }));
    })();
  }, [id, setStudent]);

  const handleInputs = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

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
    navigate("/view-tc?save=1");
  };

  return (
    <>
      <Header />
      <h2 className="text-center mb-6 mt-3 text-2xl font-semibold">
        Transfer Certificate
      </h2>
      <div className="flex items-center justify-center mt-6">
        <div className=" bg-slate-100 p-2">
          <form className="" method="post">
            <div className="m-2 pt-3">
              <Input
                type="text"
                name="studentName"
                label="Student Name"
                value={student.studentName}
                onChange={handleInputs}
              />
            </div>
            <div className="flex flex-wrap m-2">
              <SelectBox
                name="stream"
                label={"1.Last Exam"}
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
            <div className="flex flex-wrap m-2">
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

            <div className="flex flex-wrap m-2">
              <Input
                type="text"
                name="seatno"
                label="2.Exam Seat no."
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
            </div>
            <div>
              <Input
                type="text"
                name="no_pass_subject"
                label="Number of Subject Pass"
                value={student.no_pass_subject}
                placeholder="No Subject"
                onChange={handleInputs}
              />
            </div>
            <div className="flex flex-wrap m-2">
              <Input
                label="Next Study"
                name="next_study"
                type="text"
                value={student.next_study}
                onChange={handleInputs}
              />
              {/* <SelectBox
                name="next_study_stream"
                label={"3.Next Study"}
                onChange={handleInputs}
                placeholder={"Select stream"}
                data={
                  INSTITUTE_TYPE === "GIA" ? [...GIA_STREAMS] : [...SFI_STREAMS]
                }
              /> */}
            </div>
            <div className="flex flex-wrap m-2">
              <Input
                type="text"
                label="To Principal/General Secretary"
                name="nameofhead"
                value={student.nameofhead}
                onChange={handleInputs}
                placeholder={"Name "}
              />
            </div>

            <hr />
            <div className="m-2">
              <button
                type="submit"
                className="text-center  border text-xl rounded py-2 px-4  bg-blue-600 text-white hover:bg-blue-700  block mx-auto"
                onClick={handleSubmit}
              >
                Generate TC
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
