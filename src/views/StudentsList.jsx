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
  });

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
        `http://${SERVER_HOST}:${SERVER_PORT}/students/${INSTITUTE_TYPE}`
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
      val.full_name.toLowerCase().includes(searchName.toLowerCase())
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
        <h2 className="text-center m-4">Student Info</h2>
        <div className="container mb-3  align-items-center p-2">
          <div className=" justify-content-between ">
            <div className="row  align-items-center form-group m-2">
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
                  Filter
                </button>
              </div>

              <Input
                type="text"
                name="studentname"
                label=""
                placeholder={"Student Name"}
                onChange={(e) => setSearchName(e.target.value)}
              />

              <div className="col">
                <button onClick={handleSearch} className="btn btn-primary">
                  Search
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
        <div className="mb-3  overscroll-y-none p-3">
          <table
            className="table border border-black"
            id="my-table"
            ref={tableRef}
          >
            <thead>
              <tr>
                <th className=" border border-black">Enrollment</th>
                <th className="border border-black">ABC ID</th>
                <th className="border border-black">Gr No</th>
                <th className="border border-black">UDISK No</th>
                <th className="border border-black">Aadhar Number</th>
                <th className="border border-black">Stream</th>
                <th className="border border-black">Semester</th>
                {INSTITUTE_TYPE === "GIA" && (
                  <>
                    <th className="border border-black">Main Course</th>
                    <th className="border border-black">
                      First Secondary Subject
                    </th>
                    <th className="border border-black">
                      Tertiary Secondary Subject
                    </th>
                  </>
                )}
                <th className="border border-black">Gender</th>
                <th className="border border-black">Email</th>
                <th className="border border-black">Whatsapp Number</th>
                <th className="border border-black">Name</th>
                <th className="border border-black">Father Name</th>
                <th className="border border-black">Mother Name</th>
                <th className="border border-black">Address</th>
                <th className="border border-black">City</th>
                <th className="border border-black">District</th>
                <th className="border border-black">Pincode</th>
                <th className="border border-black">Birth Date</th>
                <th className="border border-black">Birth Place</th>
                <th className="border border-black">Caste</th>
                <th className="border border-black">Parent Contact Number</th>
                <th className="border border-black">
                  Last Organization Studied From
                </th>
                <th className="border border-black">Last Studied Year</th>
                {INSTITUTE_TYPE === "GIA" && (
                  <th className="border border-black">Elective Course</th>
                )}
                <th className="border border-black">Admission Date</th>
                <th className="border border-black"></th>
              </tr>
            </thead>
            <tbody>
              {recordsCopy &&
                recordsCopy.map((e) => {
                  // console.log(e);
                  return (
                    <TableRow
                      data={e}
                      key={e.id}
                      after
                      ignoreCols={["id", "institute_type"]}
                    >
                      <td className="border border-black">
                        <Link to={`/students/${e.id}`}>
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
