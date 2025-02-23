import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../Component/Header";
import { useDropzone } from "react-dropzone";
import { BASE_URL } from "../utils/config";

export function ImportStudentData() {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

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
        // "application/vnd.ms-excel": [".xls"],
        // "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        //   ".xlsx",
        //],
      },
    });

  const onUpload = async () => {
    const formData = new FormData();
    formData.append(file.name, file);

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
        <div className="flex flex-col items-center justify-center bg-gray-800 shadow-xl w-96 rounded-xl">
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
                  <p className="text-red-500">Please Excel File select </p>
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
          <button
            className="primary-button"
            onClick={() => onUpload()}
            disabled={file === null}
          >
            Upload Data
          </button>
        </div>
      </div>
    </>
  );
}
