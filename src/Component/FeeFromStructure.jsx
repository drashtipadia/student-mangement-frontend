import { useState } from "react";
import { SelectBox } from "./SelectBox";
import { Input } from "./Input";

import { GIA_STREAMS, SEMESTER, SFI_STREAMS } from "../utils/constants";
import { safeFetch } from "../utils";
import { BASE_URL } from "../utils/config";

/**
 * @typedef {{
 *   onAddStructure?: (data: any) => void;
 *   data: any;
 * }} FeeStructureProps
 */

const initialFeeStructureValue = {
  stream: "",
  semester: "",
  college_dev_fee: "",
  semester_fee: "",
  univ_sport_complex_fee: "",
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
  pratical_fee: "",
  e_library_fee: "",
  late_fee: "",
  sau_univ_fee: "",
};

/**
 * @param {FeeStructureProps} props
 */
export function FeeFromStructure(props) {
  const INSTITUTE_TYPE = localStorage.getItem("token");

  const [data, setData] = useState({ ...initialFeeStructureValue });
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
    const [res, err] = await safeFetch(`${BASE_URL}/fee/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (err) {
      alert("Something went wrong");
      console.error(err);
    } else {
      alert("Fee structure added");
      console.log(data);
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
              data={
                INSTITUTE_TYPE === "GIA" ? [...GIA_STREAMS] : [...SFI_STREAMS]
              }
            />

            <SelectBox
              name="semester"
              onChange={handleInputs}
              label={"Semester:"}
              placeholder={"Select Semester"}
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
              name="univ_sport_complex_fee"
              label="University Sport Complex Fee"
              value={data.univ_sport_complex_fee}
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
              name="pratical_fee"
              label="Pratical Fee"
              value={data.pratical_fee}
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
              name="sau_univ_fee"
              label="Saurashtra University Fee"
              value={data.sau_univ_fee}
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
