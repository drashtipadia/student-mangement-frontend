import React, { useEffect } from "react";
import { useState } from "react";
import { Header } from "../Component/Header";
import { Input } from "../Component/Input";
import { SelectBox } from "../Component/SelectBox";
import { RadioGroup } from "../Component/RadioGroup";

// const SERVER_HOST = process.env.SERVER_HOST || "localhost";
const SERVER_HOST = process.env.SERVER_HOST || "192.168.115.246";
const SERVER_PORT = Number(process.env.SERVER_PORT) || 8000;

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
    surname: "",
    name: "",
    fathername: "",
    father_name: "",
    mother_name: "",
    address: "",
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
    // tc_doc: null,
    // no_objection_doc: null,
    // first_trial_doc: null,
    // bonafide_doc: null,
    // fee_recipt_print: null,
    last_organization_studied_from: "",
    last_studied_year: "",
    // institute_type: localStorage.getItem('token'),

  });

  useEffect(() => {
    if (user.stream !== "Bachelor of Arts") {
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
  //================

  const FIELDS_TO_VALIDATE = ["email", "name", "aadhar_number", "whatsapp_no"];

  const isValidate = () => {
    // if (user.email.trim() === "") {
    //   alert("Email is required");
    //   return false;
    // } else if (user.name.trim() === "") {
    //   alert("Name is Required");
    //   return false;
    // } else if (user.aadhar_number.trim() === "") {
    //   alert("Aadhar Number is required");
    //   return false;
    // } else if (user.whatsapp_no.trim() === "") {
    //   alert("Whatsapp number is required");
    //   return false;
    // }

    let valid = true;
    FIELDS_TO_VALIDATE.forEach(field => {
      if (user[field] === "") {
        valid = false;
        return;
      }
    })

    return valid;
  };
  let id;
  (async () => {
    const gr_res = await fetch(`http://${SERVER_HOST}:${SERVER_PORT}/last-gr/`)
    const jsonRes = await gr_res.json();
    id = jsonRes.gr_no;
  })();
  let inc = id ? Number(id.split('-')[2]) : 1;

  const STREAM = {
    "Bachelor of Computer Application": "BCA",
    "Bachelor of Commerce": "BCOM",
    "Bachelor of Business Administration": "BBA",
    "Bachelor of Arts": "BA",
    "Master of Science (Information Technology & Computer Application)": "MSCIT",
  }

  const GR_PREFIX = "GR-" + localStorage.getItem('token') + "-" + STREAM[user.stream] + "-" + inc;
  // console.log(GR_PREFIX);

  //==========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log(user.studentimg);
    if (!isValidate()) {
      return false;
    }
    user.gr_no = GR_PREFIX;
    const submitData = new FormData();
    Object.entries(user).forEach(([key, value]) => {
      // submitData.append(user.gr_no, GR_PREFIX);
      if (user[key] !== null) {
        submitData.append(key, value);
      }
    });


    const response = await fetch(
      `http://${SERVER_HOST}:${SERVER_PORT}/students/`,
      // "http://localhost:8000/students/",
      {
        method: "POST",
        body: submitData,
      }
    );

    // TODO
    // console.log(await response.json());
    const check = await response.json();
    if (check.status === "success") {
      alert("Record Insert");
      window.location.reload();
    }
  };
  return (
    <>
      <Header />
      <div className="container">
        <h2 className="text-center mt-3">Admission Form</h2>
        <div className="col d-flex justify-content-center py-3">
          <div className="card bg-light" style={{ width: "50rem" }}>
            <form className="m-4" method="post" encType="multipart/form-data">
              <div className="row border-3 form-group mb-3 align-items-center">
                <SelectBox
                  name="stream"
                  onChange={handleInputs}
                  label={"Stream:"}
                  placeholder={"Select Stream"}
                  data={[
                    { label: "Bachelor of Arts", value: "Bachelor of Arts" },
                    {
                      label: "Bachelor of Business Administration",
                      value: "Bachelor of Business Administration",
                    },
                    {
                      label: "Bachelor of Commerce",
                      value: "Bachelor of Commerce",
                    },
                    {
                      label: "Bachelor of Computer Application",
                      value: "Bachelor of Computer Application",
                    },
                    {
                      label:
                        "Master of Science (Information Technology & Computer Application)",
                      value:
                        "Master of Science (Information Technology & Computer Application)",
                    },
                  ]}
                />

                <SelectBox
                  name="semester"
                  onChange={handleInputs}
                  label={"Semester :"}
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
                />
              )}

              {user.stream === "Bachelor of Arts" && (
                <RadioGroup
                  label={"Compulsary Subject:"}
                  name={"elective_course"}
                  onChange={handleInputs}
                  data={[
                    { label: "English", value: "english" },
                    { label: "Hindi", value: "hindi" },
                  ]}
                />
              )}

              <hr />

              {user.stream === "Bachelor of Arts" && (
                <RadioGroup
                  label={"Main Subject:"}
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
                  />
                  <hr />
                </>
              )}
              {/* <div className="row border-3 form-group mb-3 align-items-center">
                <Input
                  type="text"
                  name="gr_no"
                  label="GR No:"
                  value={user.gr_no}
                  placeholder="Enter G R No."
                  onChange={handleInputs}
                />


                <Input
                  type="text"
                  name="enrollment_no"
                  label="Enrollment No:"
                  value={user.enrollment_no}
                  placeholder="Enter Enrollment No."
                  onChange={handleInputs}

                />
              </div> */}

              <div className="row border-3 form-group mb-3 align-items-center">
                <Input
                  type="text"
                  name="abc_id"
                  label="ABC ID:"
                  value={user.abc_id}
                  placeholder="Enter ABC ID No."
                  onChange={handleInputs}
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
                  onChange={handleInputs}
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
                {/* <Input
                  type="text"
                  name="contact_no"
                  label="Mobile No:"
                  placeholder="Contact No."
                  value={user.contact_no}
                  onChange={handleInputs}
                /> */}

                <Input
                  type="text"
                  name="wh_no"
                  label="Mobile No:"
                  placeholder="Whatsapp No."
                  value={user.wh_no}
                  // required={true}
                  onChange={handleInputs}
                />

                <Input
                  type="text"
                  name="parent_no"
                  placeholder="Parent No."
                  value={user.parent_no}
                  onChange={handleInputs}
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
                  onChange={handleInputs}
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
              <div className="row border-3 form-group mb-3 align-items-center">
                <Input
                  label="Student Image:"
                  type="file"
                  name="studentimg"
                  onChange={handleFileUploads}
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

export { AdmissionForm };
