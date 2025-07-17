import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Header, Input, SelectBox, RadioGroup } from "../Component";
import { GIA_STREAMS, SEMESTER, SFI_STREAMS } from "../utils/constants";
import { SERVER_HOST, SERVER_PORT } from "../utils/config";
import { handleError, safeFetch } from "../utils";

export function UpdateStudent() {
  useEffect(() => {
    document.title = "Update Student Form";
  });

  const INSTITUTE_TYPE = localStorage.getItem("token");
  const [user, setUser] = useState({});

  let [params] = useSearchParams();
  const id = params.get("id");
  const nav = useNavigate();

  useEffect(() => {
    async function callAPI() {
      let [resp, err] = await safeFetch(
        `http://${SERVER_HOST}:${SERVER_PORT}/students/id/${id}`
      );
      handleError(err);
      // console.log(resp);
      const stu = JSON.parse(JSON.stringify(resp.student));
      // console.log(stu);
      let birthdate = Date(stu.DOB);
      let date = birthdate.toISOString().split("T")[0];

      setUser({ ...stu, birth_date: date });
      // console.log(user);

      // console.log(user);
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
        main_subject: "",
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
      }
    );

    handleError(err);
    if (res.result === "success") {
      alert("record update");
    } else {
      alert("see console");
      console.log(res);
    }
    console.log(user);
    nav(-1);
  };

  return (
    <>
      <Header />
      <div>
        <h2 className="text-center mb-6 mt-3 text-2xl font-semibold">
          Update Student Details
        </h2>
        <div className="flex items-center justify-center mt-6">
          <div className=" bg-slate-100">
            <form className="m-4" method="post" encType="multipart/form-data">
              <div className="flex flex-wrap">
                <SelectBox
                  name="stream"
                  onChange={handleInputs}
                  label={"Stream:"}
                  placeholder={"Select Stream"}
                  selected={user.stream}
                  data={
                    INSTITUTE_TYPE === "GIA"
                      ? [...GIA_STREAMS]
                      : [...SFI_STREAMS]
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
                  name={"main_subject"}
                  onChange={handleInputs}
                  data={[
                    { label: "Accountancy", value: "accountancy" },
                    { label: "Computer Science", value: "computer science" },
                  ]}
                  checked={user.main_subject}
                />
              )}

              {user.stream === "Bachelor of Arts" && (
                <RadioGroup
                  label={"Main Subject:"}
                  name={"main_subject"}
                  onChange={handleInputs}
                  data={[
                    { label: "English", value: "english" },
                    { label: "Hindi", value: "hindi" },
                  ]}
                  checked={user.main_subject}
                />
              )}

              {/* {user.stream === "Bachelor of Arts" && (
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
              )} */}
              <div className="flex flex-wrap">
                {/* <Input
                  type="text"
                  name="gr_no"
                  label="GR NO:"
                  value={user.gr_no}
                  onChange={handleInputs}
                /> */}

                <Input
                  type="text"
                  name="enrollment_no"
                  label="Enrollment no:"
                  value={user.Enrollment_No}
                  placeholder="Enter Enrollment No."
                  onChange={handleInputs}
                />
              </div>
              <div className="flex flex-wrap">
                <Input
                  type="text"
                  name="abc_id"
                  label="ABC ID:"
                  value={user.ABCID}
                  placeholder="Enter ABC ID No."
                  onChange={(e) => handlenumber(e, 12)}
                />

                {/* <Input
                  type="text"
                  name="udisk_no"
                  label="UDISK No:"
                  value={user.udisk_no}
                  placeholder="Enter UDISK No."
                  onChange={handleInputs}
                /> */}
                <Input
                  type="text"
                  name="aadhar_number"
                  label="Aadhar No:"
                  value={user.AadharCard_No}
                  placeholder="Enter Aadhar No."
                  max="12"
                  onChange={(e) => handlenumber(e, 12)}
                  required
                />
              </div>

              <RadioGroup
                name={"category"}
                label={"Caste:"}
                onChange={handleInputs}
                data={[
                  { label: "GENERAL", value: "OPEN" },
                  { label: "EWS", value: "EWS" },
                  { label: "SC", value: "SC" },
                  { label: "ST", value: "ST" },
                  { label: "SEBC(OBC)", value: "SEBC(OBC)" },
                  { label: "EX-ARMY", value: "EX-ARMY" },
                ]}
                checked={user.Category}
              />
              <RadioGroup
                label={"Disability:"}
                name={"is_disability"}
                onChange={handleInputs}
                data={[
                  { label: "Yes", value: "true" },
                  { label: "No", value: "false" },
                ]}
                checked={user.is_disabled}
              />
              <div className="flex flex-wrap">
                <Input
                  type="text"
                  name="name"
                  label="Full name"
                  placeholder="Full NAME"
                  value={user.Name}
                  onChange={handleInputs}
                />
              </div>

              <div className="">
                <Input
                  type="textarea"
                  name="address"
                  label="Address:"
                  value={user.Address}
                  onChange={handleInputs}
                  placeholder="Enter the Address"
                />
              </div>
              <div className="flex flex-wrap">
                <Input
                  type="text"
                  name="whatsapp_no"
                  label="Mobile No:"
                  placeholder="Whatsapp No."
                  value={user.Mobile_No}
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
                <Input
                  type="email"
                  name="email"
                  label="Email:"
                  placeholder="Student Email Address"
                  value={user.Email}
                  onChange={handleInputs}
                  required
                />
              </div>

              <RadioGroup
                label={"Gender:"}
                name={"gender"}
                onChange={handleInputs}
                data={[
                  { label: "Male", value: "Male" },
                  { label: "Female", value: "Female" },
                ]}
                checked={user.Gender}
              />
              <div className="flex flex-wrap">
                <Input
                  type="date"
                  name="birth_date"
                  value={user.DOB}
                  label="Birth Date:"
                  onChange={handleInputs}
                />

                {/* <Input
                  type="text"
                  name="birth_place"
                  value={user.birth_place}
                  label="Birth Place:"
                  placeholder="birthplace.."
                  onChange={handleInputs}
                /> */}
              </div>

              <div className="flex flex-wrap">
                <Input
                  type="text"
                  name="city"
                  label="City:"
                  placeholder="city"
                  value={user.City}
                  onChange={handleInputs}
                />
                <Input
                  type="text"
                  name="taluka"
                  label="Taluka:"
                  placeholder="taluka"
                  value={user.Taluka}
                  onChange={handleInputs}
                />

                <Input
                  type="text"
                  name="district"
                  label="District:"
                  placeholder="district"
                  value={user.District}
                  onChange={handleInputs}
                />

                <Input
                  type="text"
                  name="pincode"
                  label="Pincode:"
                  placeholder="pincode"
                  value={user.Pin_No}
                  onChange={(e) => handlenumber(e, 6)}
                />
              </div>

              <div>
                <Input
                  type="text"
                  name="seat_number"
                  label="seat_number:"
                  placeholder="seat_number"
                  value={user.Seat_Number}
                  onChange={handleInputs}
                />
                <Input
                  type="text"
                  name="exam_name"
                  label="exam_name:"
                  placeholder="exam_name"
                  value={user.Exam_Name}
                  onChange={handleInputs}
                />
              </div>
              <div className="flex flex-wrap">
                <Input
                  type="text"
                  name="last_organization_studied_from"
                  label="Last Organization Studied From:"
                  placeholder="Institute/School Name.."
                  value={user.School_College}
                  onChange={handleInputs}
                />

                <Input
                  type="number"
                  name="last_studied_year"
                  label="Last Studied Year:"
                  value={user.Passing_Year}
                  onChange={handleInputs}
                  min="2000"
                  max={new Date().getFullYear()}
                />
              </div>
              <hr className="pb-2" />

              <button
                type="submit"
                className="text-center w-4/6  border text-xl rounded py-1 bg-blue-600 text-white hover:bg-blue-700  block mx-auto"
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
