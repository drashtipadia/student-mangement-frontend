import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Header,
  TableRow,
  Loading,
  SelectBox,
  Input,
  RadioGroup,
} from "../Component";
import { convertToCSV } from "../utils/table-to-excel";
import { GIA_STREAMS, SEMESTER, SFI_STREAMS } from "../utils/constants";
import { BASE_URL } from "../utils/config";
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
  const [batchYear, setBatchYear] = useState(0);
  const tableRef = useRef();
  const [stream, setStream] = useState("");
  const [filters, setFilters] = useState({});
  const [selectStudent, setSelectStudent] = useState([]);
  const [updatesem, setUpdatesem] = useState([]);

  const handleClick = () => {
    const file = convertToCSV(tableRef.current);
    const a = document.createElement("a");
    a.href = file;
    a.download = "records.csv";
    a.click();
  };
  const isEmptyObject = (obj) => JSON.stringify(obj) === "{}";

  useEffect(() => {
    (async () => {
      const [res, err] = await safeFetch(
        `${BASE_URL}/students/${INSTITUTE_TYPE}` //=== change path
      );
      if (err != null) alert(err);
      else {
        setRecords([...res.students]);
        setRecordsCopy([...res.students]);
        setLoading(false);
      }
    })();
  }, [INSTITUTE_TYPE]);
  let data = [];

  if (stream === "Bachelor of Commerce") {
    data = [
      { label: "Accountancy", value: "accountancy" },
      { label: "Computer Science", value: "computer science" },
    ];
  } else if (stream === "Bachelor of Arts") {
    data = [
      { label: "Psychology", value: "psychology" },
      { label: "Hindi", value: "hindi" },
      { label: "Gujarati", value: "gujarati" },
      { label: "Economics", value: "economics" },
    ];
  }

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
    if (result !== "") setFilters({ ...filters, stream: result });
  };

  const handleSemester = (e) => {
    let sem = e.target.value;
    setFilters({ ...filters, semester: sem });
  };

  const handleYearChange = (e) => {
    let result = e.target.value;
    setBatchYear(result);
    setFilters({ ...filters, batch_year: result });
  };

  const sortStudents = () => {
    const filteredRecords = recordsCopy.filter((record) => {
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

  const clearFilters = () => {
    setBatchYear(0);
    setStream("");
    setFilters({});
    setRecordsCopy(records);
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete the record?")) {
      setLoading(true);
      const [res] = await safeFetch(`${BASE_URL}/students/bulk-delete`, {
        method: "DELETE",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ ids: selectStudent }),
      });

      if (res.status === "success") {
        alert("Record Deleted");
        selectStudent.forEach((id) => {
          setRecordsCopy((prev) => prev.filter((rec) => rec.Sr_No !== id));
          setRecords((prev) => prev.filter((rec) => rec.Sr_No !== id));
        });
        setSelectStudent([]);
        setLoading(false);
      }
    } else {
      setSelectStudent([]);
    }
  };

  const handleSelectAll = () => {
    if (selectStudent.length === recordsCopy.length) {
      setSelectStudent([]);
      return;
    }
    const ids = recordsCopy.map((rec) => rec.Sr_No);
    setSelectStudent([...ids]);
  };

  const handleIndividualCheck = (e) => {
    if (selectStudent.includes(e)) {
      setSelectStudent((prev) => prev.filter((ids) => ids !== e));
    } else {
      setSelectStudent([...selectStudent, e]);
    }
  };

  const handleUpdateSem = async () => {
    if (confirm("Are you sure want to update semester")) {
      setLoading(true);
      const [res] = await safeFetch(
        `${BASE_URL}/students/bulk-update-semester`,
        {
          method: "PATCH",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({ ids: selectStudent, semester: updatesem }),
        }
      );
      if (res.status === "success") {
        alert("Record Updated");
        location.reload();
      }
    }
  };

  if (loading) return <Loading />;

  return (
    <>
      <Header />
      <>
        <p className="text-3xl text-center p-3">Student Info</p>
        <div className="mb-3 mx-3 items-center p-2 space-y-4">
          <div className="flex items-center">
            <SelectBox
              name="stream"
              label={"Stream:"}
              placeholder={"Select Stream"}
              onChange={handleChange}
              selected={stream}
              data={[...STREAMS, { label: "View All", value: "" }]}
            />
            {stream && (
              <>
                <SelectBox
                  name="semester"
                  label={"Sem:"}
                  placeholder={"Semester"}
                  onChange={handleSemester}
                  data={[...SEMESTER]}
                />
                <RadioGroup
                  name="compulsary_subject"
                  data={data}
                  checked={filters.major_subject}
                  onChange={(e) => {
                    setFilters((prevFilters) => ({
                      ...prevFilters,
                      major_subject: e.target.value,
                    }));
                  }}
                />
              </>
            )}
            <Input
              type="number"
              name="batch_year"
              label="YEAR"
              value={batchYear === 0 ? "" : batchYear}
              min="2000"
              max={new Date().getFullYear()}
              onChange={handleYearChange}
            />
            <button onClick={sortStudents} className="filled-button ml-4">
              Filter
            </button>
          </div>
          <div className="flex items-center">
            <Input
              type="text"
              name="studentname"
              label="Student Name"
              onChange={(e) => setSearchName(e.target.value)}
            />

            <button onClick={handleSearch} className="elevated-button ml-4">
              Search
            </button>
          </div>
          <div className="flex items-center">
            <button className="filled-button" onClick={handleClick}>
              Export to Excel (CSV)
            </button>
            <button
              className="error-button ml-4"
              onClick={handleDelete}
              disabled={selectStudent.length == 0}
            >
              Delete
            </button>
            {selectStudent.length !== 0 && (
              <>
                <SelectBox
                  name="updatesem"
                  label={"Update Semster:"}
                  placeholder={"Semester"}
                  onChange={(e) => setUpdatesem(e.target.value)}
                  data={[...SEMESTER]}
                />
                <button
                  className="text-center border rounded h-11 px-4 disabled:bg-blue-400 bg-blue-600 text-white hover:bg-blue-700 block ml-4"
                  onClick={handleUpdateSem}
                >
                  Update
                </button>
              </>
            )}
            {!isEmptyObject(filters) && (
              <button
                className="text-center border rounded h-11 px-4 bg-tertiary text-on-tertiary shadow block ml-4"
                onClick={clearFilters}
              >
                Clear filters
              </button>
            )}
          </div>
        </div>
        {/* ====================================== */}
        <div className="mb-3 overflow-y-scroll p-3">
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
                <th>Compulsary Subject</th>
                <th>Major Subject</th>
                <th>Parent No.</th>
                <th className="">Batch Year</th>
                <th className="px-20"></th>
                <th className="p-6">
                  <button
                    className="text-center  border rounded  px-4  bg-blue-600 text-white hover:bg--700  block mx-auto no-underline"
                    onClick={handleSelectAll}
                  >
                    {selectStudent.length === recordsCopy.length
                      ? "Remove Selection"
                      : "Select All"}
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {recordsCopy &&
                recordsCopy.map((e) => {
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
