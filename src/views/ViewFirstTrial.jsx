import React, { useEffect, useRef, useState } from "react";
import "../styles/view.css";
// import html2canvas from "html2canvas";
import { BASE_URL } from "../utils/config";
import { DocHeader } from "../Component/DocHeader";
import { Header } from "../Component/Header";
import DocFooter from "../Component/DocFooter";
import { safeFetch } from "../utils";
import { useNavigate, useSearchParams } from "react-router-dom";
import { STREAM_ACRONYMS } from "../utils/constants";
import html2canvas from "html2canvas";

export function ViewFirstTrial() {
  const INSTITUTE_TYPE = localStorage.getItem("token");
  const [student, setStudent] = useState({});
  const [serial, setSerial] = useState(0);
  const [downloading, setDownloading] = useState(false);
  const [queryParams] = useSearchParams();

  useEffect(() => {
    document.title = "First-Trial Document";

    safeFetch(`${BASE_URL}/students/id/${queryParams.get("id")}`)
      .then(([resp, _]) => setStudent({ ...resp.student }))
      .catch(console.log);

    safeFetch(`${BASE_URL}/last-serial/first-trial`)
      .then(([res, err]) => {
        if (err !== null) throw new Error(err);

        setSerial((Number(res.serial) || 0) + 1);
      })
      .catch(console.log);

    // eslint-disable-next-line
  }, []);
  const currentYear = new Date().getFullYear();

  const FT_PREFIX = `FT-${INSTITUTE_TYPE}-${STREAM_ACRONYMS[student.stream]}-`;

  const documentRef = useRef(null);
  const navigate = useNavigate();

  const handleDownload = async () => {
    const docName = FT_PREFIX + serial.toString() + ".png";
    setDownloading(true);
    const canvas = await html2canvas(documentRef.current);

    canvas.toBlob((blob) => {
      fetch(`${BASE_URL}/last-serial`, {
        method: "POST",
        headers: {
          doc_type: "first-trial",
          uuid: student.id,
          docname: docName,
        },
      });

      let data = new FormData();
      data.append("doc", blob, docName);

      fetch(`${BASE_URL}/upload-doc`, {
        body: data,
        method: "POST",
        headers: {
          uuid: student.id,
        },
        uuid: student.id,
      })
        .then((res) => res.json())
        .then(console.log);
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = docName;
      a.click();

      setDownloading(false);
      navigate(-1);
    });
  };

  return (
    <>
      <Header />
      <div className="justify-content-end  d-flex p-4">
        <button
          className="btn btn-primary"
          disabled={downloading}
          onClick={handleDownload}
        >
          Download
        </button>
      </div>

      <div
        className="container p-5 bg-light"
        style={{ height: "297mm", width: "210mm" }}
        ref={documentRef}
      >
        <DocHeader
          title={"FIRST TRIAL CERTIFICATE"}
          serialNo={`Serial No: ${serial}`}
        />

        <div className="p-5">
          <p className="text-center">This is to certify that,</p>
          <p className="h6">
            Mr./Ms.{" "}
            <abbr title="attribute ">
              {`${student.surname} ${student.name} ${student.fathername}`}{" "}
            </abbr>{" "}
          </p>
          <p>
            &emsp; &emsp; &emsp; &emsp; &emsp; In Year{" "}
            <span className="h6 fw-bold">
              {currentYear}-{(currentYear + 1) % 100}
            </span>
            , was studying <span className="h6 fw-bold">{"MSCIT"}</span> in this
            college. Examination of <span className="h6 fw-bold"> {"BCA"}</span>{" "}
            held in{" "}
            <span className="h6 fw-bold">
              {"March"}-{"2024"}{" "}
            </span>
            was completed by them in first attempt.
          </p>
        </div>
        <DocFooter />
      </div>
    </>
  );
}
