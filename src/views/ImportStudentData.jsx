import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../Component/Header";
import { useDropzone } from "react-dropzone";
import { BASE_URL } from "../utils/config";
import { SelectBox, Input } from "../Component";
import { GIA_STREAMS, SFI_STREAMS, SEMESTER } from "../utils/constants";

export function ImportStudentData() {
  useEffect(() => {
    document.title = "Upload data through CSV";
  }, []);

  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const [stream, setStream] = useState();
  const [semester, setSemester] = useState();
  const [batchYear, setBatchYear] = useState();

  const INSTITUTE_TYPE = localStorage.token;

  const onDrop = useCallback((acceptedFiles) => {
    setFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragAccept, isDragReject } =
    useDropzone({
      onDrop,
      multiple: false,
      accept: {
        "text/csv": [".csv"],
      },
    });
  const handleSelect = (e) => {
    setStream(e.target.value);
  };

  const onUpload = async () => {
    const formData = new FormData();
    formData.append(file.name, file);
    formData.append("Stream", stream);
    formData.append("semester", semester);
    formData.append("batch_year", batchYear);
    formData.append("institute_type", INSTITUTE_TYPE);

    const call = await fetch(`${BASE_URL}/upload-csv`, {
      method: "post",
      body: formData,
    });

    const res = await call.json();

    if (res.status === "done") {
      alert("Data uploaded successfully...");
      navigate("/viewdata");
    }
  };

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center">
        <h1 className="my-4 text-3xl font-medium"> Upload Excel Data</h1>
        <div>
          <SelectBox
            name="stream"
            label={"Stream:"}
            onChange={handleSelect}
            placeholder={"Select Stream"}
            selected={stream}
            data={
              INSTITUTE_TYPE === "GIA" ? [...GIA_STREAMS] : [...SFI_STREAMS]
            }
          />
          <SelectBox
            name="semester"
            label={"Semester:"}
            onChange={(e) => {
              setSemester(e.target.value);
            }}
            placeholder={"Select Semester"}
            selected={semester}
            data={[...SEMESTER]}
          />
          <Input
            type="number"
            name="batch_year"
            label="Batch Year"
            value={batchYear}
            onChange={(e) => {
              setBatchYear(e.target.value);
            }}
            max={new Date().getFullYear()}
          />
        </div>
        <div className="flex flex-col items-center justify-center bg-surface-container-highest w-96 rounded-xl mt-5 p-4">
          <div className="w-full">
            <div
              {...getRootProps()}
              className="w-full h-72 text-on-surface-variant rounded-md cursor-pointer focus:outline-none"
            >
              <input {...getInputProps()} />
              <div
                className={
                  "flex flex-col h-full space-y-3 items-center justify-center border-outline border-2 border-dashed rounded-xl " +
                  (isDragReject ? "border-error" : "") +
                  (isDragAccept ? "border-primary" : "")
                }
              >
                {isDragReject ? (
                  <p className="text-error">Please choose only CSV file</p>
                ) : (
                  <>
                    <p className="text-center"> Drag &amp; Drop File Here</p>
                    <p className="text-center">Upload only CSV file</p>
                  </>
                )}
              </div>
            </div>
          </div>
          {file && <div className="">{file.name}</div>}
          {file && (
            <button
              className="filled-button mt-4"
              onClick={onUpload}
              disabled={stream == undefined}
            >
              Upload Data
            </button>
          )}
        </div>
      </div>
    </>
  );
}
