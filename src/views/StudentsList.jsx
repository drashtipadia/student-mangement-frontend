import { useEffect, useState, useRef } from "react";
import { Header } from "../Component/Header";
import { TableRow } from "../Component/TableRow";
import { Loading } from "../Component/Loading";
import { SelectBox } from "../Component/SelectBox";
import { Input } from "../Component/Input";
import { convertToCSV } from "../utils/table-to-excel";

const SERVER_HOST = process.env.SERVER_HOST || "localhost";
const SERVER_PORT = process.env.SERVER_PORT || 8000;

export function StudentsList() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [recordsCopy, setRecordsCopy] = useState([]);
  const [year, setYear] = useState(null);
  const tableRef = useRef();
  const institute_type = localStorage.getItem("token");

  const handleClick = () => {
    // let table = (tableRef.current.querySelectorAll('tr'));

    // console.log(tab);

    const file = convertToCSV(tableRef.current);

    const a = document.createElement('a');

    // something similar to this works
    a.href = file;
    a.download = "file.csv";

    a.click();
  }

  useEffect(() => {
    (async () => {
      const response = await fetch(
        `http://${SERVER_HOST}:${SERVER_PORT}/students`
      );
      const jsonResponse = await response.json();

      setRecords([...jsonResponse.students]);
      // setRecordsCopy();
      setRecordsCopy([...jsonResponse.students]);
      setLoading(false);
    })();
  }, []);

  //   fetch(`http://${SERVER_HOST}:${SERVER_PORT}/students`)
  //     .then((res) => res.json())
  //     .then(value => {
  //       setRecordsCopy(value['students']);
  //       setRecords(value['students']);
  //       setLoading(false);
  //     });
  // }, []);

  // function filter() {
  //   const type_ = "sfi";

  //   setFilter(records.filter((record) => record.type_ === type_));
  // }

  //============
  // const [field, setField] = useState('stream');
  // const [year, setYear] = useState('year');

  const handleChange = (e) => {
    let result = e.target.value;
    setRecordsCopy([...records]);
    if (result === "") {
      setRecordsCopy([...records]);
    } else {
      setRecordsCopy(records.filter(val => val.stream === result));
    }
  }

  const handleSemester = (e) => {
    let sem = e.target.value;
    setRecordsCopy([...records]);
    setRecordsCopy(records.filter(val => val.semester === sem));
  }

  const handleYearChange = (e) => {
    let result = e.target.value;
    setYear(result);
    setRecordsCopy([...records]);
    setRecordsCopy(records.filter(val => val.year === result));
  }


  return (
    <>
      <Header />
      {loading ? (
        <Loading />
      ) : (
        <>

          <h2 className="text-center m-4">Student Info</h2>
          <div className="container mb-3  align-items-center">
            <div className="border border-3 rounded-1 justify-content-between ">
              <div className="row  align-items-center form-group m-2">
                <SelectBox
                  name="stream"
                  label={"Stream:"}
                  placeholder={"Select Stream"}
                  onChange={handleChange}
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
                        {
                          label: "View All",
                          value: "",
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
                        {
                          label: "View All",
                          value: "",
                        },
                      ]
                  }
                />
                <SelectBox
                  name="semester"
                  label={"Sem :"}
                  placeholder={"Semester"}
                  onChange={handleSemester}
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
                <Input
                  type="number"
                  name="year"
                  label=""
                  value={year}
                  min="2000"
                  max={new Date().getFullYear()}
                  placeholder={"Year"}
                  onChange={handleYearChange}
                />

                <div className="col"><input type="checkbox" id="name" name="name" value="name" onChange={handleChange} /><label>Name</label></div>

                <div className="col"><button className="btn btn-primary" onClick={handleClick}>Excel File</button></div>

              </div>
            </div>
          </div>
          <div className="container">
            <table className="table table-bordered" id="my-table" ref={tableRef}>
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
                  <th>Admission Date</th>
                </tr>
              </thead>
              <tbody>
                {recordsCopy &&
                  recordsCopy.map((e) => {
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
