import React from "react";
import { Header } from "../Component/Header";
import { Input } from "../Component/Input";
import { SelectBox } from "../Component/SelectBox";

function TCDoc() {
  return (
    <>
      <Header />
      <div className="container">
        <h2 className="text-center mt-3">TC DOCUMENT</h2>
        <div className="col d-flex justify-content-center py-3">
          <div className="card bg-light" style={{ width: "50rem" }}>
            <form className="m-4" method="post">
              <div className="row border-3 form-group m-3 align-items-center">
                <Input
                  type="text"
                  name="name"
                  label="Student Name:"
                  // value={name}
                  placeholder="SURNAME NAME FATHERNAME"
                  // onChange={handleInputs}
                />
              </div>
              <div className="row border-3 form-group m-3 align-items-center">
                <SelectBox
                  name="lastexam"
                  label={"Last Exam"}
                  placeholder={"Select stream"}
                  data={[
                    { label: "BA", value: "ba" },
                    { label: "BBA", value: "bba" },
                    { label: "BCA", value: "bca" },
                    { label: "BCom", value: "bcom" },
                    { label: "MSCIT", value: "mscit" },
                  ]}
                />
                <SelectBox
                  name="semester"
                  // onChange={handleInputs}
                  label={""}
                  placeholder={"Select Semester"}
                  data={[
                    { label: "1st", value: "1" },
                    { label: "2nd", value: "2" },
                    { label: "3rd", value: "3" },
                    { label: "4th", value: "4" },
                    { label: "5th", value: "5" },
                    { label: "6th", value: "6" },
                    { label: "7th", value: "7" },
                    { label: "8th", value: "8" },
                  ]}
                />
                <Input
                  type="number"
                  name="year"
                  // onChange={handleInputs}
                  placeholder={"year"}
                  min="2000"
                  max={new Date().getFullYear()}
                />
              </div>
              <div className="row border-3 form-group m-3 align-items-center">
                <Input
                  type="text"
                  name="name"
                  label="Exam"
                  // value={name}
                  placeholder="SEAT NO"
                  // onChange={handleInputs}
                />
                <SelectBox
                  name="result"
                  // onChange={handleInputs}
                  label={""}
                  placeholder={"Result"}
                  data={[
                    { label: "Pass", value: "Pass" },
                    { label: "Fail", value: "Fail" },
                  ]}
                />
                <Input
                  type="text"
                  name="name"
                  label="Subject Pass"
                  // value={name}
                  placeholder="SEAT NO"
                  // onChange={handleInputs}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default TCDoc;
