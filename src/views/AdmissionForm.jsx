import React, { useEffect, useState } from "react";
import { Header, Input, SelectBox, RadioGroup } from "../Component";
import {
  GIA_STREAMS,
  SEMESTER,
  SFI_STREAMS,
  STREAM_ACRONYMS,
} from "../utils/constants";
import { SERVER_HOST, SERVER_PORT } from "../utils/config";
import { handleError, safeFetch } from "../utils";

function AdmissionForm() {
  useEffect(() => {
    document.title = "Admission Form";
  });

  const INSTITUTE_TYPE = localStorage.getItem("token");
  const [submitting, setSubmitting] = useState(false);
  const [user, setUser] = useState({
    stream: "",
    semester: "",
    main_subject: "",
    enrollment_no: "",
    abc_id: "",
    aadhar_number: "",
    name: "",
    address: "",
    whatsapp_no: "",
    parent_contact_no: "",
    email: "",
    gender: "",
    birth_date: "",
    caste: "",
    city: "",
    taluka: "",
    district: "",
    pincode: "",
    seat_number: "",
    exam_name: "",
    last_organization_studied_from: "",
    last_studied_year: "",
    institute_type: INSTITUTE_TYPE,
    is_disability: "",
  });

  const [errors, setErrors] = useState({
    whatsapp_no: "",
    email: "",

    name: "",
  });

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

  /**
   * Validates the form and populates the errors object.
   * Return false if errors occured, true otherwise.
   * @returns {boolean}
   */
  function validate() {
    let errs = {};
    const VALIDATE_FIELDS = ["name", "whatsapp_no", "email"];
    let valid = true;

    VALIDATE_FIELDS.forEach((field) => {
      if (!user[field]) {
        errs[field] = `${field} is required.`;
        valid = false;
      }
    });

    if (!user.email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
      errs.email = "Email is not a valid Email!";
      valid = false;
    }

    setErrors(errs);

    return valid;
  }

  const STREAM = STREAM_ACRONYMS;

  const handleSubmit = async (e) => {
    e.preventDefault();

    let valid = validate();
    if (!valid) return;
    setSubmitting(valid);

    let [res, err] = await safeFetch(
      `http://${SERVER_HOST}:${SERVER_PORT}/students/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
        // body: submitData,
      }
    );
    handleError(err);

    if (res.status === "success") {
      alert("record inserted");
      window.location.reload();
    } else {
      alert("see console");
      console.log(res);
      setSubmitting(true);
    }
    // }
    setSubmitting(false);
  };

  return (
    <>
      <Header />
      <div className="flex items-center justify-center mt-6">
        <div className="border border-black bg-slate-100">
          <h2 className="text-center mb-6 mt-3 text-3xl font-semibold">
            Admission Form
          </h2>

          <form className="m-4 items-center justify-center" method="post">
            <div className="flex flex-wrap w-full">
              <div className="w-auto">
                <SelectBox
                  name="stream"
                  onChange={handleInputs}
                  label={"Stream:"}
                  placeholder={"Select Stream"}
                  data={
                    INSTITUTE_TYPE === "GIA"
                      ? [...GIA_STREAMS]
                      : [...SFI_STREAMS]
                  }
                />
              </div>
              <div className="w-auto ">
                <SelectBox
                  name="semester"
                  onChange={handleInputs}
                  label={"Semester :"}
                  placeholder={"Select Semester"}
                  data={[...SEMESTER]}
                />
              </div>
            </div>

            {user.stream === "Bachelor of Commerce" && (
              <RadioGroup
                label={"Main Subject:"}
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

            <div className="flex flex-wrap mt-3">
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
                name="aadhar_number"
                label="Aadhar No:"
                value={user.aadhar_number}
                placeholder="Enter Aadhar No."
                max="12"
                onChange={(e) => handlenumber(e, 12)}
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
                { label: "EX-ARMY", value: "EX-ARMY" },
              ]}
              checked={user.caste}
            />
            <RadioGroup
              label={"Disability:"}
              name={"is_disability"}
              onChange={handleInputs}
              data={[
                { label: "Yes", value: "true" },
                { label: "No", value: "false" },
              ]}
              checked={user.is_disability}
            />
            <div className="">
              <Input
                type="text"
                name="name"
                label="FullName"
                placeholder="NAME"
                value={user.name}
                onChange={handleInputs}
                errorMessage={errors.name}
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
            <div className="flex flex-wrap">
              <Input
                type="text"
                name="whatsapp_no"
                label="Mobile No:"
                placeholder="Whatsapp No."
                value={user.whatsapp_no}
                onChange={(e) => handlenumber(e, 10)}
                errorMessage={errors.whatsapp_no}
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

            <div className="flex flex-wrap">
              <Input
                type="email"
                name="email"
                label="Email:"
                placeholder="Student Email Address"
                value={user.email}
                onChange={handleInputs}
                errorMessage={errors.email}
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
            <div className="flex flex-wrap">
              <Input
                type="date"
                name="birth_date"
                value={user.birth_date}
                label="Birth Date:"
                onChange={handleInputs}
              />
            </div>

            <div className="flex flex-wrap">
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
                name="taluka"
                label="Taluka:"
                placeholder="taluka"
                value={user.taluka}
                onChange={handleInputs}
              />
            </div>
            <div className="flex flex-wrap">
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
            <div className="flex flex-wrap">
              <div>
                <Input
                  type="text"
                  name="seat_number"
                  label="Seat Number:"
                  placeholder="seat_number"
                  value={user.seat_number}
                  onChange={handleInputs}
                />
              </div>
              <div>
                <Input
                  type="text"
                  name="exam_name"
                  label="exam name:"
                  placeholder="exam_name"
                  value={user.exam_name}
                  onChange={handleInputs}
                />
              </div>
            </div>

            <div className=" flex flex-wrap ">
              <div className="">
                {" "}
                <Input
                  type="text"
                  name="last_organization_studied_from"
                  label="Last Organization Studied From:"
                  placeholder="Institute/School Name.."
                  value={user.last_organization_studied_from}
                  onChange={handleInputs}
                />
              </div>
              <div>
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
            </div>

            <button
              type="submit"
              className="text-center  border text-xl rounded py-2 px-4  bg-blue-600 text-white hover:bg-blue-700  block mx-auto"
              onClick={handleSubmit}
              disabled={submitting}
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
