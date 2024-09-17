import { useEffect, useState } from "react";
import { Header } from "../Component/Header";
import { TableRow } from "../Component/TableRow";
import { Loading } from "../Component/Loading";
import { SelectBox } from "../Component/SelectBox";

const SERVER_HOST = process.env.SERVER_HOST || "localhost";
const SERVER_PORT = process.env.SERVER_PORT || 8000;

export function StudentsList() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [filter, setFilter] = useState([]);
  const institute_type = localStorage.getItem("token");

  useEffect(() => {
    (async () => {
      const response = await fetch(
        `http://${SERVER_HOST}:${SERVER_PORT}/students`
      );
      const jsonResponse = await response.json();

      setRecords(jsonResponse.students);
      setLoading(false);
    })();
  }, []);

  // function filter() {
  //   const type_ = "sfi";

  //   setFilter(records.filter((record) => record.type_ === type_));
  // }
  return (
    <>
      <Header />
      {loading ? (
        <Loading />
      ) : (
        <>
          <h2 className="text-center m-4 ">Student Info</h2>
          <div className="container mb-3  align-items-center">
            <form className="border border-3 rounded-1 ">
              <div className="row justify-content-between form-group m-2">



                <SelectBox
                  name="stream"
                  // onChange={handleInputs}
                  label={"Stream:"}
                  placeholder={"Select Stream"}
                  data={
                    institute_type === "SFI"
                      ? [
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
                        {
                          label: "Bachelor of Business Administration",
                          value: "Bachelor of Business Administration",
                        },
                      ]
                      : [
                        {
                          label: "Bachelor of Arts",
                          value: "Bachelor of Arts",
                        },
                        {
                          label: "Bachelor of Commerce",
                          value: "Bachelor of Commerce",
                        },
                      ]
                  }
                />

                <div className="col">
                  <input type="text" name="studentName" placeholder="Name" /> </div>
                <div className="col"> <button type="submit" className="btn btn-primary"> Search </button> </div>

              </div>
            </form>
          </div>
          <div className="container">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Enrollment</th>
                  <th>ABC ID</th>
                  <th>Gr No</th>
                  <th>Aadhar Number</th>
                  <th>Stream</th>
                  <th>Semester</th>
                  <th>Main Course</th>
                  <th>First Secondary Subject</th>
                  <th>Tertiary Secondary Subject</th>
                  <th>Gender</th>
                  <th>Email</th>
                  <th>Whatsapp Number</th>
                  <th>Name</th>
                  <th>Father Name</th>
                  <th>Mother Name</th>
                  <th>Address</th>
                  <th>City</th>
                  <th>District</th>
                  <th>Pincode</th>
                  <th>Birth Date</th>
                  <th>Birth Place</th>
                  <th>Caste</th>
                  <th>Parent Contact Number</th>
                  <th>Last Organization Studied From</th>
                  <th>Last Studied Year</th>
                  <th>Elective Course</th>
                </tr>
              </thead>
              <tbody>
                {records &&
                  records.map((e) => {
                    return <TableRow data={e} key={e.id} />;
                  })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
}
