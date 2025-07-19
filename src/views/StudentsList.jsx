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
  const [selectStudent, setSelectStudent] = useState([]);

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
        `http://${SERVER_HOST}:${SERVER_PORT}/students/${INSTITUTE_TYPE}` //=== change path
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
      val.Name.toLowerCase().includes(searchName.toLowerCase())
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
        if (key === "inserted_at") {
          if (new Date(record["inserted_at"]).getFullYear() == val) {
            allowed = true;
            return;
          }
        }
        if (String(record[key]) !== val) {
          allowed = false;
          return;
        }
      });

      return allowed;
    });

    setRecordsCopy(filteredRecords);
  };

  const handleDelete = async (e) => {
    if (confirm("sure want to delete record")) {
      setLoading(true);
      const [res, err] = await safeFetch(
        `http://${SERVER_HOST}:${SERVER_PORT}/students/bulk-delete`,
        {
          method: "DELETE",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({ ids: selectStudent }),
        }
      );
      // console.log(res);

      if (res.status === "success") {
        alert("Record Deleted");
        selectStudent.forEach((id) => {
          setRecordsCopy((prev) => prev.filter((rec) => rec.Sr_No !== id));
        });
        setSelectStudent([]);
        setLoading(false);
      }
    } else {
      setSelectStudent([]);
    }
  };
  const handleSelectAll = (e) => {
    const ids = recordsCopy.map((rec) => rec.Sr_No);
    setSelectStudent([...ids]);
    // console.log(ids);
  };
  const handleIndividualCheck = (e) => {
    // console.log(e);
    if (selectStudent.includes(e)) {
      setSelectStudent((prev) => prev.filter((ids) => ids !== e));
    } else {
      setSelectStudent([...selectStudent, e]);
    }
    //  console.log(selectStudent);
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
          <button
            className="text-center  border rounded h-11 px-4 disabled:bg-red-400 bg-red-600 text-white hover:bg-red-700  block mx-auto no-underline"
            onClick={handleDelete}
            disabled={selectStudent.length == 0}
          >
            Delete
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
                <th className="px-12">DOB</th>
                <th>Gender</th>
                <th>Address</th>

                <th>Pin</th>
                <th>City</th>
                <th>Category</th>
                <th>Taluka</th>
                <th>District</th>
                <th className="px-12">ABC ID</th>
                <th>Aadhar Card No.</th>
                <th>Exam Name</th>
                <th>Passing Year</th>
                <th>Seat No</th>
                <th>School/College Name</th>
                <th>Disability</th>
                <th className="px-20">Stream</th>
                <th>Semster</th>
                <th>Main Subject</th>
                <th>Parent No.</th>
                <th className="px-12">Batch Year</th>
                <th></th>
                <th className="p-6">
                  <button
                    className="text-center  border rounded  px-4  bg-blue-600 text-white hover:bg--700  block mx-auto no-underline"
                    onClick={handleSelectAll}
                  >
                    Select All
                  </button>
                </th>
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
                      ignoreCols={["Sr_No", "institute_type", "inserted_at"]}
                    >
                      <td>
                        <Link to={`/students/${e.Sr_No}`}>
                          View Details &rarr;
                        </Link>
                      </td>
                      <td className="p-2">
                        <input
                          type="checkbox"
                          checked={selectStudent.includes(e.Sr_No)}
                          onChange={() => handleIndividualCheck(e.Sr_No)}
                        />
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
