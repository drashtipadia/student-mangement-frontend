import { useEffect, useState, useRef } from "react";
import { Header } from "../Component/Header";
import { TableRow } from "../Component/TableRow";
import { Loading } from "../Component/Loading";
import { SelectBox } from "../Component/SelectBox";
import { Input } from "../Component/Input";
import { convertToCSV } from "../utils/table-to-excel";
import { GIA_STREAMS, SEMESTER, SFI_STREAMS } from "../utils/constants";
import { SERVER_HOST, SERVER_PORT } from "../utils/config";

export function StudentsList() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [recordsCopy, setRecordsCopy] = useState([]);
  const [year, setYear] = useState(0);
  const tableRef = useRef();
  const institute_type = localStorage.getItem("token");
  const [stream, setStream] = useState("");
  const [filters, setFilters] = useState({});

  const handleClick = () => {
    const file = convertToCSV(tableRef.current);

    const a = document.createElement("a");

    a.href = file;
    a.download = "file.csv";

    a.click();
  };

  useEffect(() => {
    (async () => {
      const response = await fetch(
        `http://${SERVER_HOST}:${SERVER_PORT}/students`
      );
      const jsonResponse = await response.json();

      setRecords([...jsonResponse.students]);
      setRecordsCopy([...jsonResponse.students]);
      setLoading(false);
    })();
    // eslint-disable-next-line
  }, []);

  const handleChange = (e) => {
    let result = e.target.value;

    setStream(result);
    setFilters({ ...filters, stream: result });
  };
  const handleSemester = (e) => {
    let sem = e.target.value;
    setFilters({ ...filters, semester: sem });
  };

  const handleYearChange = (e) => {
    let result = e.target.value;
    setYear(result);

    setFilters({ ...filters, inserted_at: result });
  };

  const sortStudents = () => {
    const filteredRecords = records.filter((record) => {
      let entries = Object.entries(filters);
      if (entries.length === 0) return true;

      let allowed = true;
      entries.forEach(([key, val]) => {
        if (String(record[key]) !== val) {
          allowed = false;
          return;
        }

        // allowed = year === val;
      });

      return allowed;
    });

    setRecordsCopy(filteredRecords);
  };

  return (
    <>
      <Header />
      {loading ? (
        <Loading />
      ) : (
        <>
          <h2 className="text-center m-4 text-light">Student Info</h2>
          <div className="container mb-3  align-items-center bg-light p-2">
            <div className=" justify-content-between ">
              <div className="row  align-items-center form-group m-2">
                <SelectBox
                  name="stream"
                  label={"Stream:"}
                  placeholder={"Select Stream"}
                  onChange={handleChange}
                  data={
                    institute_type === "SFI"
                      ? [
                        ...SFI_STREAMS,
                        {
                          label: "View All",
                          value: "",
                        },
                      ]
                      : [
                        ...GIA_STREAMS,
                        {
                          label: "View All",
                          value: "",
                        },
                      ]
                  }
                />
                {stream !== "" && (
                  <SelectBox
                    name="semester"
                    label={"Sem :"}
                    placeholder={"Semester"}
                    onChange={handleSemester}
                    data={[...SEMESTER]}
                  />
                )}
                <Input
                  type="number"
                  name="year"
                  label=""
                  value={year === 0 ? "" : year}
                  min="2000"
                  max={new Date().getFullYear()}
                  placeholder={"Year"}
                  onChange={handleYearChange}
                />

                <div className="col">
                  <button onClick={sortStudents} className="btn btn-primary">
                    Sort
                  </button>
                </div>

                <div className="col">
                  <button className="btn btn-primary" onClick={handleClick}>
                    Export to Excel (CSV)
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="container mb-3 bg-light">
            <table
              className="table table-bordered"
              id="my-table"
              ref={tableRef}
            >
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
                  <th></th>
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
