import React, { useEffect } from "react";
import { useState } from "react";
import { Header } from "../Component/Header";
import { Input } from "../Component/Input";
import { SelectBox } from "../Component/SelectBox";
import { RadioGroup } from "../Component/RadioGroup";


const SERVER_HOST = process.env.SERVER_HOST || "localhost";
const SERVER_PORT = Number(process.env.SERVER_PORT) || 8000;

function AdmissionForm() {
  const [previewImage, setPreviewImage] = useState(null);
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
    last_organization_studied_from: "",
    last_studied_year: "",
  });
  let [inc, setInc] = useState(1);

  useEffect(() => {
    fetch(`http://${SERVER_HOST}:${SERVER_PORT}/last-gr/`)
      .then((res) => res.json())
      .then((d) => {
        let gr = d.gr_no;
        setInc((gr ? Number(gr.split("-")[3]) : 0) + 1);
      });
  }, []);

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
    // eslint-disable-next-line
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

    setPreviewImage(URL.createObjectURL(file));
    setUser({ ...user, [name]: file });
  };
  //=======================================

  const handlenumber = (e, max) => {
    let value = e.target.value.trim();
    if (value.length > max) {
      e.preventDefault();
      return;
    }

    setUser({ ...user, [e.target.name]: value });
  };
  // const FIELDS_TO_VALIDATE = ["email", "name", "aadhar_number", "wh_no"];
  // const NUMBER_VALIDATE = ["parent_no", "wh_no"];
  const [error, setError] = useState({});

  const isValidate = () => {
    // let valid = true;
    // FIELDS_TO_VALIDATE.forEach((field) => {
    //   if (user[field] === "") {
    //     alert(`${field} is required`);
    //     valid = false;
    //     return;
    //   }
    //   else {
    //     NUMBER_VALIDATE.forEach((field) => {
    //       if (!(user[field].match('[0-9]{10}'))) {
    //         alert(`Please Enter valid ${field}   Number`);
    //         valid = false;
    //         return;
    //       }
    //     });
    //   }
    // });
    //return valid;

    const validationError = {}
    if (!user.aadhar_number.trim()) {
      validationError.aadhar_number = "Aadhar Number is required";
    } else if (!user.aadhar_number.match(/^\d{12}$/)) {
      validationError.aadhar_number = "Aadhar Number must be 12 digit"
    }

    if (!user.email.trim()) {
      validationError.email = "Email is Required";
    } else if (!user.email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
      validationError.email = "Email is Not Valid";
    }
    if (!user.name.trim()) {
      validationError.name = "Name is Required";
    } else if (!user.surname.trim()) {
      validationError.name = "Surname is Required";
    } else if (!user.fathername.trim()) {
      validationError.name = "Fathername is Required"
    }
    if (!user.wh_no.trim()) {
      validationError.wh_no = "WhatsApp Number is Required"
    } else if (!user.wh_no.match(/^\d{10}$/)) {
      validationError.wh_no = "WhatsApp Number incorrect"
    }

    if (!user.studentimg) {
      validationError.studentimg = "Please Upload Image";
    }

    setError(validationError);
    if (Object.keys(validationError).length === 0) {
      return true;
    }

    return false;

  };




  //==================================

  const STREAM = {
    "Bachelor of Computer Application": "BCA",
    "Bachelor of Commerce": "BCOM",
    "Bachelor of Business Administration": "BBA",
    "Bachelor of Arts": "BA",
    "Master of Science (Information Technology & Computer Application)":
      "MSCIT",
  };
  // submit 

  const handleSubmit = async (e) => {
    e.preventDefault();

    const GR_PREFIX =
      "GR-" +
      localStorage.getItem("token") +
      "-" +
      STREAM[user.stream] +
      "-" +
      inc;
    //====


    if (!isValidate()) return false;
    //============

    //============

    user.gr_no = GR_PREFIX;

    const submitData = new FormData();
    Object.entries(user).forEach(([key, value]) => {
      if (user[key] !== null) {
        submitData.append(key, value);
      }
    });
    console.log(user);

    const response = await fetch(
      `http://${SERVER_HOST}:${SERVER_PORT}/students/`,
      {
        method: "POST",
        body: submitData,
      }
    );

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
            <form className="m-4" method="post" encType="multipart/form-data">  {/* onSubmit={handleSubmit}  */}
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
                  max="12"
                  onChange={e => handlenumber(e, 12)} //============
                  required
                />
              </div>

              {error.aadhar_number && <p className="text-danger">{error.aadhar_number}</p>}

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
              {error.name && <p className="text-danger">{error.name}</p>}

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
                  name="wh_no"
                  label="Mobile No:"
                  placeholder="Whatsapp No."
                  value={user.wh_no}
                  onChange={e => handlenumber(e, 10)} //============
                  required
                />


                <Input
                  type="text"
                  name="parent_no"
                  placeholder="Parent No."
                  value={user.parent_no}
                  // onChange={handleInputs}
                  onChange={e => handlenumber(e, 10)} //============
                />

              </div>
              {error.wh_no && <p className="text-danger">{error.wh_no}</p>}
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

              {error.email && <p className="text-danger">{error.email}</p>}

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
                  accept={"image/png, image/jpg, image/jpeg"}
                  required
                />
              </div>
              {error.studentimg && <p className="text-danger">{error.studentimg}</p>}

              {previewImage && (
                <div className="my-2">
                  {/* eslint-disable-next-line */}
                  <img src={previewImage} alt="image preview" height={200} />
                </div>
              )}

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
