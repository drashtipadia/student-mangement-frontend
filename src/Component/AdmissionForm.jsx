import React, { useEffect } from "react";
import { useState } from "react";
import { Header } from "./Header";
import { Input } from "./Input";
import { SelectBox } from "./SelectBox";
import { RadioGroup } from "./RadioGroup";

function AdmissionForm() {
  const [user, setUser] = useState({
    stream: "",
    semester: "",
    elective_course: "",
    main_subject: "",
    first_secondary_subject: "",
    tertiary_secondary_subject: "",
    gr_no: "",
    enrollment_no: "",
    abc_id: "",
    udisk_no: "",
    aadhar_number: "",
    full_name: "",
    full_name_of_parent: "",
    address: "",
    contact_no: "",
    wh_no: "",
    parent_no: "",
    email: "",
    gender: "",
    birth_date: "",
    birth_place: "",
    caste: "",
    city: "",
    district: "",
    pincode: "",
    studentimg: null,
    tc_doc: null,
    no_objection_doc: null,
    first_trial_doc: null,
    bonafide_doc: null,
    fee_recipt_print: null,
    last_organization_studied_from: "",
    last_studied_year: "",
  });

  useEffect(() => {
    if (user.stream !== "BA") {
      setUser({
        ...user,
        main_subject: "",
        first_secondary_subject: "",
        tertiary_secondary_subject: "",
        elective_course: "",
      });
    }
  }, [user.stream]);

  let name, value;

  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const handleFileUploads = (e) => {
    const name = e.target.name;
    const file = e.target.files[0];

    setUser({ ...user, [name]: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submitData = new FormData();
    Object.entries(user).forEach(([key, value]) => {
      if (user[key] !== null) {
        submitData.append(key, value);
      }
    });

    const response = await fetch("http://localhost:8000/students/", {
      method: "POST",
      body: submitData,
    });

    // TODO
    console.log(await response.json());
  };
  return (
    <>
      <Header />
      <div className="container justify-content-around">
        <h2 className="text-center mt-3">Admission Form</h2>
        <div className="card ms-auto bg-light">
          <form className="m-5" method="post" encType="multipart/form-data">
            <SelectBox
              name="stream"
              onChange={handleInputs}
              label={"Stream:"}
              placeholder={"Select Stream:"}
              data={[
                { label: "BCA", value: "BCA" },
                { label: "BBA", value: "BBA" },
                { label: "BCom", value: "BCom" },
                { label: "MScIT", value: "MScIT" },
                { label: "BA", value: "BA" },
              ]}
            />

            <SelectBox
              name="semester"
              onChange={handleInputs}
              label={"Semester:"}
              placeholder={"Select Semester:"}
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

            {user.stream === "BCom" && (
              <RadioGroup
                label={"Choose Subject"}
                name={"elective_course"}
                onChange={handleInputs}
                data={[
                  { label: "Accountancy", value: "accountancy" },
                  { label: "Computer Science", value: "computer science" },
                ]}
              />
            )}

            {user.stream === "BA" && (
              <RadioGroup
                label={"Compulsary Subject"}
                name={"elective_course"}
                onChange={handleInputs}
                data={[
                  { label: "English", value: "english" },
                  { label: "Hindi", value: "hindi" },
                ]}
              />
            )}

            <hr />

            {user.stream === "BA" && (
              <RadioGroup
                label={"Main Subject"}
                name={"main_subject"}
                onChange={handleInputs}
                data={[
                  { label: "Economics", value: "economics" },
                  { label: "Gujarati", value: "gujarati" },
                  { label: "Psychology", value: "psychology" },
                  { label: "Hindi", value: "hindi" },
                ]}
              />
            )}

            {user.stream === "BA" && (
              <RadioGroup
                label={"First Secondary Subject"}
                name={"first_secondary_subject"}
                onChange={handleInputs}
                data={[
                  { label: "Gujarati", value: "gujarati" },
                  { label: "Hindi", value: "hindi" },
                  { label: "Psychology", value: "psychology" },
                ]}
              />
            )}

            {user.stream === "BA" && (
              <>
                <RadioGroup
                  label={"Tertiary Secondary Subject"}
                  name={"tertiary_secondary_subject"}
                  onChange={handleInputs}
                  data={[
                    { label: "Gujarati", value: "gujarati" },
                    { label: "Hindi", value: "hindi" },
                    { label: "Psychology", value: "psychology" },
                  ]}
                />
                <hr />
              </>
            )}

            <Input
              type="text"
              name="gr_no"
              label="GR No:"
              value={user.gr_no}
              onChange={handleInputs}
            />

            <Input
              type="text"
              name="enrollment_no"
              label="Enrollment No:"
              value={user.enrollment_no}
              onChange={handleInputs}
            />

            <Input
              type="text"
              name="abc_id"
              label="ABC ID:"
              value={user.abc_id}
              onChange={handleInputs}
            />

            <Input
              type="text"
              name="udisk_no"
              label="UDISK No:"
              value={user.udisk_no}
              onChange={handleInputs}
            />

            <Input
              type="text"
              name="aadhar_number"
              label="Aadhar No:"
              value={user.aadhar_number}
              onChange={handleInputs}
            />

            <Input
              type="text"
              name="full_name"
              label="Full Name:"
              value={user.full_name}
              onChange={handleInputs}
            />

            <Input
              type="text"
              name="full_name_of_parent"
              label="Full Parent Name:"
              value={user.full_name_of_parent}
              onChange={handleInputs}
            />

            <Input
              type="textarea"
              name="address"
              label="Address:"
              value={user.address}
              onChange={handleInputs}
            />

            <Input
              type="text"
              name="contact_no"
              label="Mobile No:"
              value={user.contact_no}
              onChange={handleInputs}
            />

            <Input
              type="text"
              name="wh_no"
              label="Whatsapp No:"
              value={user.wh_no}
              onChange={handleInputs}
            />

            <Input
              type="text"
              name="parent_no"
              label="Parent No:"
              value={user.parent_no}
              onChange={handleInputs}
            />

            <Input
              type="email"
              name="email"
              label="Email:"
              value={user.email}
              onChange={handleInputs}
            />

            <RadioGroup
              label={"Gender:"}
              name={"gender"}
              onChange={handleInputs}
              data={[
                { label: "Male", value: "male" },
                { label: "Female", value: "female" },
              ]}
            />

            <Input
              type="date"
              name="birth_place"
              value={user.birth_place}
              label="Birth Date:"
              onChange={handleInputs}
            />

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
            />

            <Input
              type="text"
              name="city"
              label="City:"
              value={user.city}
              onChange={handleInputs}
            />

            <Input
              type="text"
              name="district"
              label="District:"
              value={user.district}
              onChange={handleInputs}
            />

            <Input
              type="text"
              name="pincode"
              label="Pincode:"
              value={user.pincode}
              onChange={handleInputs}
            />

            <Input
              type="text"
              name="last_organization_studied_from"
              label="Last Organization Studied From:"
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

            <Input
              label="Student Image:"
              type="file"
              name="studentimg"
              onChange={handleFileUploads}
            />

            <Input
              label={"TC Document:"}
              type="file"
              name="tc_doc"
              onChange={handleFileUploads}
            />

            <Input
              label={"No Objection Document:"}
              type="file"
              name="no_objection_doc"
              onChange={handleFileUploads}
            />

            <Input
              label={"First Trial Document:"}
              type="file"
              name="first_trial_doc"
              onChange={handleFileUploads}
            />

            <Input
              label={"Bonafide Document:"}
              type="file"
              name="bonafide_doc"
              onChange={handleFileUploads}
            />

            <Input
              label={"Fee Recipt Print:"}
              type="file"
              name="fee_recipt_print"
              onChange={handleFileUploads}
            />

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
    </>
  );
}

export { AdmissionForm };
