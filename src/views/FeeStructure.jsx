import { useState } from "react";
import { Header, Input, SelectBox } from "../Component";
import { GIA_STREAMS, SEMESTER, SFI_STREAMS } from "../utils/constants";

export const FeeStructure = () => {
  const INSTITUTE_TYPE = localStorage.getItem("token");
  const [feeStructure, setFeeStructure] = useState({
    stream: "",
    semester: "",
    college_dev_fee: "",
    semester_fee: "",
    univ_sport_fee: "",
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
  });

  const handleInputs = (e) => {
    //e.preventDefault();
    setFeeStructure({ ...feeStructure, [e.target.name]: e.target.value });
  };
  const isNumber = (value) => !Number(value) === false;

  const handlenumber = (e) => {
    let value = e.target.value.trim();
    if (!isNumber(value) && value !== "") {
      e.preventDefault();
      return;
    }

    setFeeStructure({ ...feeStructure, [e.target.name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(feeStructure);
  };
  return (
    <>
      {" "}
      <Header />
      <div className="flex items-center justify-center mt-6">
        <div className=" bg-slate-100 ">
          <h2 className="text-center mb-6 mt-3 text-3xl font-semibold">
            Fee Structure
          </h2>
          <div className="m-5 border  border-black rounded-md ">
            <form className="m-4 " method="post">
              <div className="justify-center space-y-3">
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
                <SelectBox
                  name="semester"
                  onChange={handleInputs}
                  label={"Semester :"}
                  placeholder={"Select Semester"}
                  data={[...SEMESTER]}
                />
                <Input
                  type="text"
                  name="college_dev_fee"
                  label="College Development Fee:"
                  value={feeStructure.college_dev_fee}
                  onChange={(e) => handlenumber(e)}
                />
                <Input
                  type="text"
                  name="semester_fee"
                  label="Semester Fee:"
                  value={feeStructure.semester_fee}
                  onChange={(e) => handlenumber(e)}
                />
                <Input
                  type="text"
                  name="univ_sport_fee"
                  label="University Sport Fee"
                  value={feeStructure.univ_sport_fee}
                  onChange={(e) => handlenumber(e)}
                />
                <Input
                  type="text"
                  name="library_fee"
                  label="Library Fee"
                  value={feeStructure.library_fee}
                  onChange={(e) => handlenumber(e)}
                />
                <Input
                  type="text"
                  name="sports_fee"
                  label="Sports Fee"
                  value={feeStructure.sports_fee}
                  onChange={(e) => handlenumber(e)}
                />
                <Input
                  type="text"
                  name="test_fee"
                  label="Test fee"
                  value={feeStructure.test_fee}
                  onChange={(e) => handlenumber(e)}
                />
                <Input
                  type="text"
                  name="student_welfare_fund"
                  label="Student WelFare Fund"
                  value={feeStructure.student_welfare_fund}
                  onChange={(e) => handlenumber(e)}
                />
                <Input
                  type="text"
                  name="cultural_activity_fee"
                  label="Cultural Activity Fee"
                  value={feeStructure.cultural_activity_fee}
                  onChange={(e) => handlenumber(e)}
                />
                <Input
                  type="text"
                  name="stationary_fee"
                  label="Stationary Fee"
                  value={feeStructure.stationary_fee}
                  onChange={(e) => handlenumber(e)}
                />
                <Input
                  type="text"
                  name="tuition_fee"
                  label="Tuition Fee"
                  value={feeStructure.tuition_fee}
                  onChange={(e) => handlenumber(e)}
                />
                <Input
                  type="text"
                  name="entrance_fee"
                  label="Entrance Fee"
                  value={feeStructure.entrance_fee}
                  onChange={(e) => handlenumber(e)}
                />
                <Input
                  type="text"
                  name="reservation_fee"
                  label="Reservation Fee"
                  value={feeStructure.reservation_fee}
                  onChange={(e) => handlenumber(e)}
                />
                <Input
                  type="text"
                  name="univ_enrollment_fee"
                  label="University Enrollment Fee"
                  value={feeStructure.univ_enrollment_fee}
                  onChange={(e) => handlenumber(e)}
                />
                <Input
                  type="text"
                  name="univ_dev_fee"
                  label="University Development Fee"
                  value={feeStructure.univ_dev_fee}
                  onChange={(e) => handlenumber(e)}
                />
                <Input
                  type="text"
                  name="pratical_fee"
                  label="Pratical Fee"
                  value={feeStructure.pratical_fee}
                  onChange={(e) => handlenumber(e)}
                />
                <Input
                  type="text"
                  name="e_library_fee"
                  label="E-Library Fee"
                  value={feeStructure.e_library_fee}
                  onChange={(e) => handlenumber(e)}
                />
                <Input
                  type="text"
                  name="late_fee"
                  label="Late Fee"
                  value={feeStructure.late_fee}
                  onChange={(e) => handlenumber(e)}
                />
                <Input
                  type="text"
                  name="sau_univ_fee"
                  label="Saurashtra University Fee"
                  value={feeStructure.sau_univ_fee}
                  onChange={(e) => handlenumber(e)}
                />
                <button
                  type="submit"
                  className="text-center  border text-xl rounded py-2 px-4  bg-blue-600 text-white hover:bg-blue-700  block mx-auto"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
