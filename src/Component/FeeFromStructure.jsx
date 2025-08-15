import { useState, useEffect } from "react";
import { SelectBox } from "./SelectBox";
import { Input } from "./Input";

import { GIA_STREAMS, SEMESTER, SFI_STREAMS } from "../utils/constants";
import { safeFetch } from "../utils";
import { BASE_URL } from "../utils/config";

/**
 * @typedef {{
 *   onAddStructure?: (data: any) => void;
 *   data: any | null;
 * }} FeeStructureProps
 */

const initialFeeStructureValue = {
  stream: "",
  semester: "",
  college_dev_fee: "",
  semester_fee: "",
  univ_sports_complex_fee: "",
  library_fee: "",
  sports_fee: "",
  test_fee: "",
  student_welfare_fund: "",
  cultural_activity_fee: "",
  stationary_fee: "",
  tuition_fee: "",
  entrance_fee: "",
  reservation_fee: "",
  univ_enrollment_fee: "",
  univ_dev_fee: "",
  practical_fee: "",
  e_library_fee: "",
  late_fee: "",
  univ_exam_fee: "",
};

/**
 * @param {FeeStructureProps} props
 */
export function FeeFromStructure(props) {
  const INSTITUTE_TYPE = localStorage.getItem("token");
  const { data: details } = props;

  const [data, setData] = useState(
    details ? { ...details } : { ...initialFeeStructureValue }
  );

  const handleInputs = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const isNumber = (value) => !Number(value) === false;

  const handlenumber = (e) => {
    let value = e.target.value.trim();
    if (!isNumber(value) && value !== "") {
      e.preventDefault();
      return;
    }

    setData({ ...data, [e.target.name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let [res, err] = [null, null];
    delete data.id;

    if (details) {
      res = await fetch(`${BASE_URL}/fee-structure/${details.id}/edit`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) err = "Server error";
    } else {
      [res, err] = await safeFetch(`${BASE_URL}/fee-structure/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    }

    if (err) {
      alert("Something went wrong");
      console.error(err);
    } else {
      if (details) alert("Fee structure updated");
      else alert("Fee structure added");

      if (props.onAddStructure) props.onAddStructure(data);
    }
  };

  return (
    <div className="flex items-center justify-center mt-6">
      <div className="m-5 border  border-black rounded-md surface-container">
        <form className="m-4">
          <div className="gap-y-3 gap-x-2 grid grid-cols-2 surface-container">
            <SelectBox
              name="stream"
              onChange={handleInputs}
              label={"Stream:"}
              placeholder={"Select Stream"}
              selected={data.stream}
              data={
                INSTITUTE_TYPE === "GIA" ? [...GIA_STREAMS] : [...SFI_STREAMS]
              }
            />

            <SelectBox
              name="semester"
              onChange={handleInputs}
              label={"Semester:"}
              placeholder={"Select Semester"}
              selected={data.semester}
              data={[...SEMESTER]}
            />

            <Input
              type="text"
              name="college_dev_fee"
              label="College Development Fee"
              value={data.college_dev_fee}
              onChange={(e) => handlenumber(e)}
            />
            <Input
              type="text"
              name="semester_fee"
              label="Semester Fee"
              value={data.semester_fee}
              onChange={(e) => handlenumber(e)}
            />
            <Input
              type="text"
              name="univ_sports_complex_fee"
              label="University Sports Complex Fee"
              value={data.univ_sports_complex_fee}
              onChange={(e) => handlenumber(e)}
            />
            <Input
              type="text"
              name="library_fee"
              label="Library Fee"
              value={data.library_fee}
              onChange={(e) => handlenumber(e)}
            />
            <Input
              type="text"
              name="sports_fee"
              label="Sports Fee"
              value={data.sports_fee}
              onChange={(e) => handlenumber(e)}
            />
            <Input
              type="text"
              name="test_fee"
              label="Test fee"
              value={data.test_fee}
              onChange={(e) => handlenumber(e)}
            />
            <Input
              type="text"
              name="student_welfare_fund"
              label="Student WelFare Fund"
              value={data.student_welfare_fund}
              onChange={(e) => handlenumber(e)}
            />
            <Input
              type="text"
              name="cultural_activity_fee"
              label="Cultural Activity Fee"
              value={data.cultural_activity_fee}
              onChange={(e) => handlenumber(e)}
            />
            <Input
              type="text"
              name="stationary_fee"
              label="Stationary Fee"
              value={data.stationary_fee}
              onChange={(e) => handlenumber(e)}
            />
            <Input
              type="text"
              name="tuition_fee"
              label="Tuition Fee"
              value={data.tuition_fee}
              onChange={(e) => handlenumber(e)}
            />
            <Input
              type="text"
              name="entrance_fee"
              label="Entrance Fee"
              value={data.entrance_fee}
              onChange={(e) => handlenumber(e)}
            />
            <Input
              type="text"
              name="reservation_fee"
              label="Reservation Fee"
              value={data.reservation_fee}
              onChange={(e) => handlenumber(e)}
            />
            <Input
              type="text"
              name="univ_enrollment_fee"
              label="University Enrollment Fee"
              value={data.univ_enrollment_fee}
              onChange={(e) => handlenumber(e)}
            />
            <Input
              type="text"
              name="univ_dev_fee"
              label="University Development Fee"
              value={data.univ_dev_fee}
              onChange={(e) => handlenumber(e)}
            />
            <Input
              type="text"
              name="practical_fee"
              label="Practical Fee"
              value={data.practical_fee}
              onChange={(e) => handlenumber(e)}
            />
            <Input
              type="text"
              name="e_library_fee"
              label="E-Library Fee"
              value={data.e_library_fee}
              onChange={(e) => handlenumber(e)}
            />
            <Input
              type="text"
              name="late_fee"
              label="Late Fee"
              value={data.late_fee}
              onChange={(e) => handlenumber(e)}
            />
            <Input
              type="text"
              name="univ_exam_fee"
              label="Saurashtra University Fee"
              value={data.univ_exam_fee}
              onChange={(e) => handlenumber(e)}
            />
          </div>
          <button
            type="submit"
            className="filled-button w-full mt-2"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

//From define
//props pass in data
//value=data.sem || ""
