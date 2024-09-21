import { useState, useEffect, } from "react";
import { Header } from "../Component/Header";
import { useSearchParams } from "react-router-dom";
import { Input } from "../Component/Input";
import { SelectBox } from "../Component/SelectBox";
import { SEMESTER, GIA_STREAMS, SFI_STREAMS } from "../utils/constants";
import { Loading } from "../Component/Loading";

function TCDoc() {
  const [loading, setLoading] = useState(true);
  const [tcSerial, setTcSerial] = useState(0);
  let [searchParams] = useSearchParams();
  console.log(searchParams.get('id'));

  useEffect(() => {
    fetch("http://192.168.91.246:8000/last-tc-serial")
      .then((res) => res.json())
      .then((body) => {
        setTcSerial(body.tc_serial + 1 || 1);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        alert("see console");
      });
    // eslint-disable-next-line
  }, []);

  const inst_type = localStorage.getItem("token");

  const [student, setStudent] = useState({
    studentname: "",
    lastexam: "",
    examyear: "",
    seatno: "",
    result: "",
    no_pass_subject: "",
  });

  const handleInputs = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(tcSerial);
    console.log(student);
  };
  console.log();

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Header />
          <div className="container">
            <h2 className="text-center mt-3">Leaving Certificate</h2>
            <div className="col d-flex justify-content-center py-3">
              <div className="card bg-light" style={{ width: "50rem" }}>
                <form className="m-4" method="post">
                  <div className="row border-3 form-group m-3 align-items-center">

                    <Input
                      type="text"
                      name="studentname"
                      label="Student Name:"
                      value={student.studentname}
                      placeholder="SURNAME NAME FATHERNAME"
                      onChange={handleInputs}
                    />
                  </div>
                  <div className="row border-3 form-group m-3 align-items-center">
                    <SelectBox
                      name="lastexam"
                      label={"Last Exam"}
                      onChange={handleInputs}
                      placeholder={"Select stream"}
                      data={
                        inst_type === "GIA"
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
                      type="text"
                      name="seatno"
                      label="Exam"
                      value={student.seatno}
                      placeholder="SEAT NO"
                      onChange={handleInputs}
                    />
                    <SelectBox
                      name="result"
                      label=""
                      placeholder={"Result"}
                      data={[
                        { label: "Pass", value: "Pass" },
                        { label: "Fail", value: "Fail" },
                      ]}
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
                  <hr />
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg w-100"
                    onClick={handleSubmit} > Generate TC </button>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default TCDoc;
