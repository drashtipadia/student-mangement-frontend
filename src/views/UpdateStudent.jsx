import React, { useEffect, useState } from "react";
import { Header } from "../Component/Header";
import { Input } from "../Component/Input";
import { SelectBox } from "../Component/SelectBox";
import { RadioGroup } from "../Component/RadioGroup";
import { GIA_STREAMS, SEMESTER, SFI_STREAMS } from "../utils/constants";
import { SERVER_HOST, SERVER_PORT } from "../utils/config";
import { handleError, safeFetch } from "../utils";
import { useNavigate, useSearchParams } from "react-router-dom";

export function UpdateStudent() {
  const inst_type = localStorage.getItem("token");
  const [user, setUser] = useState({ udisk_no: "" });

  let [params] = useSearchParams();
  const id = params.get("id");
  const nav = useNavigate();

  useEffect(() => {
    async function callAPI() {
      let [resp, err] = await safeFetch(
        `http://${SERVER_HOST}:${SERVER_PORT}/students/${id}`,
      );
      handleError(err);
      // console.log(resp);
      const stu = JSON.parse(JSON.stringify(resp.student));
      console.log(stu);
      let birthdate = new Date(stu.birth_date);
      let date = birthdate.toISOString().split("T")[0];

      setUser({ ...stu, birth_date: date, gender: stu.student_gender });
    }

    callAPI();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (
      user.stream !== "Bachelor of Arts" ||
      user.stream !== "Bachelor of Commerce"
    ) {
      setUser({
        ...user,
        main_course: "",
        first_secondary_subject: "",
        tertiary_secondary_subject: "",
        elective_course: "",
      });
    }
    // eslint-disable-next-line
  }, [user.stream]);

  const handleInputs = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const isNumber = (value) => !Number(value) === false;

  const handlenumber = (e, max) => {
    let value = e.target.value.trim();
    if ((!isNumber(value) || value.length > max) && value !== "") {
      e.preventDefault();
      return;
    }

    setUser({ ...user, [e.target.name]: value });
  };

  // submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const submitData = new FormData();
    Object.entries(user).forEach(([key, value]) => {
      submitData.append(key, value);
    });

    // console.log(user);

    const [res, err] = await safeFetch(
      `http://${SERVER_HOST}:${SERVER_PORT}/${id}/edit`,
      {
        method: "POST",
        body: submitData,
      },
    );

    handleError(err);
    if (res.result === "success") {
      alert("record update");
    } else {
      alert("see console");
      console.log(res);
    }

    nav(-1);


  };

  return (
    <>
      <Header />
      <div className="bg-dark">
        <h2 className="text-center mt-3 text-white">Update Student Details</h2>
        <div className="col d-flex justify-content-center py-3">
          <div className="card bg-light" style={{ width: "50rem" }}>
            <form
              className="m-4"
              method="post"
              encType="multipart/form-data"
            >
              <div className="row border-3 form-group mb-3 align-items-center">
                <SelectBox
                  name="stream"
                  onChange={handleInputs}
                  label={"Stream:"}
                  placeholder={"Select Stream"}
                  selected={user.stream}
                  data={
                    inst_type === "GIA" ? [...GIA_STREAMS] : [...SFI_STREAMS]
                  }
                />

                <SelectBox
                  name="semester"
                  onChange={handleInputs}
                  label={"Semester :"}
                  placeholder={"Select Semester"}
                  selected={String(user.semester)}
                  data={[...SEMESTER]}
                />
              </div>

              {user.stream === "Bachelor of Commerce" && (
                <RadioGroup
                  label={"Choose Subject:"}
                  name={"elective_course"}
                  onChange={handleInputs}
                  data={[
                    { label: "Accountancy", value: "accountancy" },
                    { label: "Computer Science", value: "computer science" },
                  ]}
                  checked={user.elective_course}
                />
              )}

              {user.stream === "Bachelor of Arts" && (
                <RadioGroup
                  label={"Main Subject:"}
                  name={"main_course"}
                  onChange={handleInputs}
                  data={[
                    { label: "Economics", value: "economics" },
                    { label: "Gujarati", value: "gujarati" },
                    { label: "Psychology", value: "psychology" },
                    { label: "Hindi", value: "hindi" },
                  ]}
                  checked={user.main_course}
                />
              )}

              {user.stream === "Bachelor of Arts" && (
                <RadioGroup
                  label={"First Secondary Subject:"}
                  name={"first_secondary_subject"}
                  onChange={handleInputs}
                  data={[
                    { label: "Gujarati", value: "gujarati" },
                    { label: "Hindi", value: "hindi" },
                    { label: "Psychology", value: "psychology" },
                  ]}
                  checked={user.first_secondary_subject}
                />
              )}

              {user.stream === "Bachelor of Arts" && (
                <>
                  <RadioGroup
                    label={"Tertiary Secondary Subject:"}
                    name={"tertiary_secondary_subject"}
                    onChange={handleInputs}
                    data={[
                      { label: "Gujarati", value: "gujarati" },
                      { label: "Hindi", value: "hindi" },
                      { label: "Psychology", value: "psychology" },
                    ]}
                    checked={user.tertiary_secondary_subject}
                  />
                  <hr />
                </>
              )}
              <div className="row border-3 form-group mb-3 align-items-center">
                <Input
                  type="text"
                  name="gr_no"
                  label="GR NO:"
                  value={user.gr_no}
                  onChange={handleInputs}
                />

                <Input
                  type="text"
                  name="enrollment_no"
                  label="Enrollment no:"
                  value={user.enrollment_no}
                  placeholder="Enter Enrollment No."
                  onChange={handleInputs}
                />
              </div>
              <div className="row border-3 form-group mb-3 align-items-center">
                <Input
                  type="text"
                  name="abc_id"
                  label="ABC ID:"
                  value={user.abc_id}
                  placeholder="Enter ABC ID No."
                  onChange={(e) => handlenumber(e, 12)}
                />

                <Input
                  type="text"
                  name="udisk_no"
                  label="UDISK No:"
                  value={user.udisk_no}
                  placeholder="Enter UDISK No."
                  onChange={handleInputs}
                />
              </div>

              <div className="row border-3 form-group mb-3 align-items-center">
                <Input
                  type="text"
                  name="aadhar_number"
                  label="Aadhar No:"
                  value={user.aadhar_number}
                  placeholder="Enter Aadhar No."
                  max="12"
                  onChange={(e) => handlenumber(e, 12)}
                  required
                />
              </div>

              <RadioGroup
                name={"caste"}
                label={"Caste:"}
                onChange={handleInputs}
                data={[
                  { label: "GENERAL", value: "GENERAL" },
                  { label: "EWS", value: "EWS" },
                  { label: "SC", value: "SC" },
                  { label: "ST", value: "ST" },
                  { label: "SEBC(OBC)", value: "SEBC(OBC)" },
                  { label: "PH", value: "PH" },
                  { label: "EX-ARMY", value: "EX-ARMY" },
                ]}
                checked={user.caste}
              />
              <div className="row border-3 form-group mb-3 align-items-center">
                <Input
                  type="text"
                  name="surname"
                  label="Full Name:"
                  value={user.surname}
                  placeholder="SURNAME"
                  onChange={handleInputs}
                />
                <Input
                  type="text"
                  name="name"
                  placeholder="NAME"
                  value={user.name}
                  onChange={handleInputs}
                />
                <Input
                  type="text"
                  name="fathername"
                  placeholder="FATHERNAME"
                  value={user.fathername}
                  onChange={handleInputs}
                />
              </div>

              <div className="row border-3 form-group mb-3 align-items-center">
                <Input
                  type="text"
                  name="father_name"
                  label="Full father Name:"
                  placeholder="Enter Father Name"
                  value={user.father_name}
                  onChange={handleInputs}
                />
              </div>
              <div className="row border-3 form-group mb-3 align-items-center">
                <Input
                  type="text"
                  name="mother_name"
                  label="Full mother Name:"
                  placeholder="Enter Mother Name"
                  value={user.mother_name}
                  onChange={handleInputs}
                />
              </div>
              <div className="row border-3 form-group mb-3 align-items-center">
                <Input
                  type="textarea"
                  name="address"
                  label="Address:"
                  value={user.address}
                  onChange={handleInputs}
                  placeholder="Enter the Address"
                />
              </div>
              <div className="row border-3 form-group mb-3 align-items-center">
                <Input
                  type="text"
                  name="whatsapp_no"
                  label="Mobile No:"
                  placeholder="Whatsapp No."
                  value={user.whatsapp_no}
                  onChange={(e) => handlenumber(e, 10)}
                  required
                />

                <Input
                  type="text"
                  name="parent_contact_no"
                  placeholder="Parent No."
                  value={user.parent_contact_no}
                  onChange={(e) => handlenumber(e, 10)}
                />
              </div>

              <div className="row border-3 form-group mb-3 align-items-center">
                <Input
                  type="email"
                  name="email"
                  label="Email:"
                  placeholder="Student Email Address"
                  value={user.email}
                  onChange={handleInputs}
                  required
                />
              </div>

              <RadioGroup
                label={"Gender:"}
                name={"gender"}
                onChange={handleInputs}
                data={[
                  { label: "Male", value: "male" },
                  { label: "Female", value: "female" },
                ]}
                checked={user.gender}
              />
              <div className="row border-3 form-group mb-3 align-items-center">
                <Input
                  type="date"
                  name="birth_date"
                  value={user.birth_date}
                  label="Birth Date:"
                  onChange={handleInputs}
                />

                <Input
                  type="text"
                  name="birth_place"
                  value={user.birth_place}
                  label="Birth Place:"
                  placeholder="birthplace.."
                  onChange={handleInputs}
                />
              </div>

              <div className="row border-3 form-group mb-3 align-items-center">
                <Input
                  type="text"
                  name="city"
                  label="City:"
                  placeholder="city"
                  value={user.city}
                  onChange={handleInputs}
                />

                <Input
                  type="text"
                  name="district"
                  label="District:"
                  placeholder="district"
                  value={user.district}
                  onChange={handleInputs}
                />

                <Input
                  type="text"
                  name="pincode"
                  label="Pincode:"
                  placeholder="pincode"
                  value={user.pincode}
                  onChange={(e) => handlenumber(e, 6)}
                />
              </div>

              <div className="row border-3 form-group mb-3 align-items-center">
                <Input
                  type="text"
                  name="last_organization_studied_from"
                  label="Last Organization Studied From:"
                  placeholder="Institute/School Name.."
                  value={user.last_organization_studied_from}
                  onChange={handleInputs}
                />

                <Input
                  type="number"
                  name="last_studied_year"
                  label="Last Studied Year:"
                  value={user.last_studied_year}
                  onChange={handleInputs}
                  min="2000"
                  max={new Date().getFullYear()}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-lg w-100"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
