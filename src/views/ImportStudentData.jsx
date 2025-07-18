import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../Component/Header";
import { useDropzone } from "react-dropzone";
import { BASE_URL } from "../utils/config";
import { SelectBox } from "../Component";
import { GIA_STREAMS, SFI_STREAMS, SEMESTER } from "../utils/constants";

export function ImportStudentData() {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const [stream, setStream] = useState();
  const [semester, setSemester] = useState();

  const INSTITUTE_TYPE = localStorage.token;

  const onDrop = useCallback((acceptedFiles) => {
    // console.log(acceptedFiles[0]);
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
    setSemester(e.target.value);
  };

  const onUpload = async () => {
    const formData = new FormData();
    formData.append(file.name, file);
    formData.append("Stream", stream);
    formData.append("Semester", semester);
    //console.log(stream);

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
            onChange={handleSelect}
            placeholder={"Select Semester"}
            selected={semester}
            data={[...SEMESTER]}
          />
        </div>
        <div className="flex flex-col items-center justify-center bg-surface-container-low shadow-xl w-96 rounded-xl mt-5">
          <div className="p-4 w-full">
            <div
              {...getRootProps()}
              className="w-full h-72 text-white rounded-md cursor-pointer focus:outline-none"
            >
              <input {...getInputProps()} />
              <div
                className={
                  "flex flex-col h-full space-y-3 items-center justify-center border-2 border-dashed rounded-xl " +
                  (isDragReject ? "border-red-500 " : "") +
                  (isDragAccept ? "border-green-600 " : "")
                }
              >
                {isDragReject ? (
                  <p className="text-red-500">Please CSV File select </p>
                ) : (
                  <div>
                    <p className="text-center"> Drag &amp; Drop File Here</p>
                    <p className="text-center mt-2 text-base ">
                      Only CSV File upload{" "}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="text-white">{file?.name}</div>
          {file === null ? (
            ""
          ) : (
            <button
              className="primary-button"
              onClick={() => onUpload()}
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
