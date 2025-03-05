import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Header, TableRow, Loading, SelectBox, Input } from "../Component";
import { convertToCSV } from "../utils/table-to-excel";
import { GIA_STREAMS, SEMESTER, SFI_STREAMS } from "../utils/constants";
import { SERVER_HOST, SERVER_PORT } from "../utils/config";
import { safeFetch } from "../utils";

export function StudentsList() {
  useEffect(() => {
    document.title = "Student List";
  }, []);

  const INSTITUTE_TYPE = localStorage.getItem("token");
  const [searchName, setSearchName] = useState([]);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [recordsCopy, setRecordsCopy] = useState([]);
  const [year, setYear] = useState(0);
  const tableRef = useRef();
  const [stream, setStream] = useState("");
  const [filters, setFilters] = useState({});

  const handleClick = () => {
    const file = convertToCSV(tableRef.current);

    const a = document.createElement("a");

    a.href = file;
    a.download = "records.csv";

    a.click();
  };

  useEffect(() => {
    (async () => {
      const [res, err] = await safeFetch(
        `http://${SERVER_HOST}:${SERVER_PORT}/students/${INSTITUTE_TYPE}`, //=== change path
      );
      if (err != null) console.log(err);
      else {
        setRecords([...res.students]);
        setRecordsCopy([...res.students]);

        setLoading(false);
      }
    })();
  }, [INSTITUTE_TYPE]);

  const STREAMS =
    INSTITUTE_TYPE === "GIA" ? [...GIA_STREAMS] : [...SFI_STREAMS];

  const handleSearch = () => {
    let filteredRecords = records.filter((val) =>
      val.Name.toLowerCase().includes(searchName.toLowerCase()),
    );
    setRecordsCopy(filteredRecords);
  };

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
      });

      return allowed;
    });

    setRecordsCopy(filteredRecords);
  };

  if (loading) return <Loading />;

  return (
    <>
      <Header />
      <>
      
        <p className="text-3xl text-center p-3">Student Info</p>
        <div className="flex mb-3 mx-3  align-items-center p-2">
          <SelectBox
            name="stream"
            label={"Stream:"}
            placeholder={"Select Stream"}
            onChange={handleChange}
            data={[
              ...STREAMS,
              {
                label: "View All",
                value: "",
              },
            ]}
          />
          {stream !== "" && (
            <SelectBox
              name="semester"
              label={"Sem:"}
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

          {/* <div className=""> */}
          <button
            onClick={sortStudents}
            className="text-center border rounded px-4 h-11  bg-blue-600 text-white hover:bg-blue-700  block mx-auto no-underline"
          >
            Filter
          </button>
          {/* </div> */}

          <Input
            type="text"
            name="studentname"
            label=""
            placeholder={"Student Name"}
            onChange={(e) => setSearchName(e.target.value)}
          />

          <button
            onClick={handleSearch}
            className="text-center  border rounded h-11 px-4  bg-blue-600 text-white hover:bg-blue-700  block mx-auto no-underline"
          >
            Search
          </button>

          <button
            className="text-center  border rounded h-11 px-4  bg-blue-600 text-white hover:bg-blue-700  block mx-auto no-underline"
            onClick={handleClick}
          >
            Export to Excel (CSV)
          </button>
        </div>
        {/* ====================================== */}
        <div className="mb-3 overflow-scroll p-3">
          <table
            className="table table-auto border border-collapse border-black"
            id="my-table"
            ref={tableRef}
          >
            <thead>
              <tr>
                <th>Name</th>
                <th>Mobile No</th>
                <th>Enrollment No</th>
                <th>Email</th>
                <th>DOB</th>
                <th>Gender</th>
                <th>Address</th>
                {/* {INSTITUTE_TYPE === "GIA" && (
                  <>
                    <th className="border border-black">Main Course</th>
                    <th className="border border-black">
                      First Secondary Subject
                    </th>
                    <th className="border border-black">
                      Tertiary Secondary Subject
                    </th>
                  </>
                )} */}
                <th>Pin</th>
                <th>City</th>
                <th>Category</th>
                <th>Taluka</th>
                <th>District</th>
                <th>ABC ID</th>
                <th>Aadhar Card No.</th>
                <th>Exam Name</th>
                <th>Passing Year</th>
                <th>Seat No</th>
                <th>School/College Name</th>
                <th>Entry Date</th>
                {/* <th className="border border-black">Caste</th>
                <th className="border border-black">Parent Contact Number</th>
                <th className="border border-black">
                  Last Organization Studied From
                </th>
                <th className="border border-black">Last Studied Year</th>
                {INSTITUTE_TYPE === "GIA" && (
                  <th className="border border-black">Elective Course</th>
                )}
                <th className="border border-black">Admission Date</th>
                <th className="border border-black"></th> */}
              </tr>
            </thead>
            <tbody>
              {recordsCopy &&
                recordsCopy.map((e) => {
                  // console.log(e);
                  return (
                    <TableRow
                      data={e}
                      key={e.Sr_No}
                      after
                      ignoreCols={["Sr_No", "institute_type"]}
                    >
                      <td>
                        <Link to={`/students/${e.Sr_No}`}>
                          View Details &rarr;
                        </Link>
                      </td>
                    </TableRow>
                  );
                })}
            </tbody>
          </table>
        </div>
      </>
    </>
  );
}
