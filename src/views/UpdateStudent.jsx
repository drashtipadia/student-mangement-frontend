import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Header, Input, SelectBox, RadioGroup } from "../Component";
import { GIA_STREAMS, SEMESTER, SFI_STREAMS } from "../utils/constants";
import { SERVER_HOST, SERVER_PORT } from "../utils/config";
import { handleError, safeFetch } from "../utils";

export function UpdateStudent() {
  useEffect(() => {
    document.title = "Update Student Form";
  }, []);

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

      const stu = resp.student;
      let birthdate = stu.DOB.split("-");
      let birthYear = birthdate[2];
      let birthMonth = birthdate[1] - 1 < 10 ? `${birthdate[1]}` : birthdate[1];
      let birthDay = birthdate[0];
      let date = `${birthYear}-${birthMonth}-${birthDay}`;
      setUser({ ...stu, DOB: date });
    }

    callAPI();
  }, []);

  useEffect(() => {
    if (
      user.stream !== "Bachelor of Arts" &&
      user.stream !== "Bachelor of Commerce"
    ) {
      setUser({
        ...user,
        main_subject: "",
      });
    }
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

    console.log(user);

    const [res, err] = await safeFetch(
      `http://${SERVER_HOST}:${SERVER_PORT}/${id}/edit`,
      {
        method: "POST",
        body: submitData,
      }
    );

    handleError(err);
    if (res.status === "success") {
      alert("record update");
    } else {
      alert("see console Some Error Occur");
    }

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

                <Input
                  type="number"
                  name="batch_year"
                  label="Batch Year:"
                  value={user.batch_year}
                  onChange={handleInputs}
                  max={new Date().getFullYear()}
                />
              </div>

              {user.stream === "Bachelor of Commerce" && (
                <RadioGroup
                  label={"Major Subject:"}
                  name={"major_subject"}
                  onChange={handleInputs}
                  data={[
                    { label: "Accountancy", value: "accountancy" },
                    { label: "Computer Science", value: "computer science" },
                  ]}
                  checked={user.major_subject}
                />
              )}

              {user.stream === "Bachelor of Arts" && (
                <>
                  <RadioGroup
                    label={"Compulsary Subject"}
                    name={"compulsary_subject"}
                    onChange={handleInputs}
                    data={[
                      { label: "English", value: "english" },
                      { label: "Hindi", value: "hindi" },
                    ]}
                    checked={user.compulsary_subject}
                  />
                  <RadioGroup
                    label={"Major Subject:"}
                    name={"major_subject"}
                    onChange={handleInputs}
                    data={[
                      { label: "Psychology", value: "psychology" },
                      { label: "Hindi", value: "hindi" },
                      { label: "Gujarati", value: "gujarati" },
                      { label: "Economics", value: "economics" },
                    ]}
                    checked={user.major_subject}
                  />
                </>
              )}

              <div className="flex flex-wrap">
                <Input
                  type="text"
                  name="Enrollment_No"
                  label="Enrollment no:"
                  value={user.Enrollment_No}
                  placeholder="Enter Enrollment No."
                  onChange={handleInputs}
                />
              </div>
              <div className="flex flex-wrap">
                <Input
                  type="text"
                  name="ABCID"
                  label="ABC ID:"
                  value={user.ABCID}
                  placeholder="Enter ABC ID No."
                  onChange={(e) => handlenumber(e, 12)}
                />

                <Input
                  type="text"
                  name="AadharCard_No"
                  label="Aadhar No:"
                  value={user.AadharCard_No}
                  placeholder="Enter Aadhar No."
                  max="12"
                  onChange={(e) => handlenumber(e, 12)}
                  required
                />
              </div>

              <RadioGroup
                name={"Category"}
                label={"Caste:"}
                onChange={handleInputs}
                data={[
                  { label: "GENERAL", value: "General" },
                  { label: "EWS", value: "EWS" },
                  { label: "SC", value: "SC" },
                  { label: "ST", value: "ST" },
                  { label: "SEBC", value: "SEBC" },
                  { label: "EX-ARMY", value: "EX-ARMY" },
                ]}
                checked={user.Category}
              />
              <RadioGroup
                label={"Disability:"}
                name={"is_disabled"}
                onChange={handleInputs}
                data={[
                  { label: "Yes", value: "Yes" },
                  { label: "No", value: "No" },
                ]}
                checked={user.is_disabled}
              />

              <Input
                type="text"
                name="Name"
                label="Full name"
                placeholder="Full NAME"
                value={user.Name}
                onChange={handleInputs}
              />

              <div className="">
                <Input
                  type="textarea"
                  name="Address"
                  label="Address:"
                  value={user.Address}
                  onChange={handleInputs}
                  placeholder="Enter the Address"
                />
              </div>
              <div className="flex flex-wrap">
                <Input
                  type="text"
                  name="Mobile_No"
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
                  name="Email"
                  label="Email:"
                  placeholder="Student Email Address"
                  value={user.Email}
                  onChange={handleInputs}
                  required
                />
              </div>

              <RadioGroup
                label={"Gender:"}
                name={"Gender"}
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
                  name="DOB"
                  value={user.DOB}
                  label="Birth Date:"
                  onChange={handleInputs}
                />
              </div>

              <div className="flex flex-wrap">
                <Input
                  type="text"
                  name="City"
                  label="City:"
                  placeholder="city"
                  value={user.City}
                  onChange={handleInputs}
                />
                <Input
                  type="text"
                  name="Taluka"
                  label="Taluka:"
                  placeholder="Taluka"
                  value={user.Taluka}
                  onChange={handleInputs}
                />

                <Input
                  type="text"
                  name="District"
                  label="District:"
                  placeholder="district"
                  value={user.District}
                  onChange={handleInputs}
                />

                <Input
                  type="text"
                  name="Pin_No"
                  label="Pincode:"
                  placeholder="pincode"
                  value={user.Pin_No}
                  onChange={(e) => handlenumber(e, 6)}
                />
              </div>

              <div className="flex flex-wrap">
                <Input
                  type="text"
                  name="Seat_Number"
                  label="seat_number:"
                  placeholder="seat_number"
                  value={user.Seat_Number}
                  onChange={handleInputs}
                />
                <Input
                  type="text"
                  name="Exam_Name"
                  label="exam_name:"
                  placeholder="exam_name"
                  value={user.Exam_Name}
                  onChange={handleInputs}
                />
              </div>
              <div className="flex flex-wrap">
                <Input
                  type="text"
                  name="School_College"
                  label="Last Organization Studied From:"
                  placeholder="Institute/School Name.."
                  value={user.School_College}
                  onChange={handleInputs}
                />

                <Input
                  type="number"
                  name="Passing_Year"
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
