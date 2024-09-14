import { useEffect, useState } from "react";
import { Header } from "../Component/Header";
import { TableRow } from "../Component/TableRow";
import { Loading } from "../Component/Loading";

export function StudentsList() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [filter, setFilter] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:8000/students");
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
        <div className="container">
          <h1 className="text-center p-5">Data</h1>

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
                <th>Surname</th>
                <th>Name</th>
                <th>Father Name</th>
                <th>Father_Name</th>
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
                  console.log(e);
                  return <TableRow data={e} key={e.id} />;
                })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
