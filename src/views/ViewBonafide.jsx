import React, { useEffect, useRef, useState } from "react";
import "../styles/view.css";
import html2canvas from "html2canvas";
import { DocHeader } from "../Component/DocHeader";
import { Header } from "../Component/Header";
import DocFooter from "../Component/DocFooter";
import { useNavigate, useSearchParams } from "react-router-dom";
// eslint-disable-next-line
import { BASE_URL, SERVER_HOST, SERVER_PORT } from "../utils/config";
import ImagePlaceholder from "../Component/ImagePlaceholder";
import { safeFetch } from "../utils";
import { STREAM_ACRONYMS } from "../utils/constants";

export function ViewBonafide() {
  const [queryParams] = useSearchParams();
  const [student, setStudent] = useState({});
  const [serial, setSerial] = useState(0);
  const studentID = queryParams.get("id");

  useEffect(() => {
    document.title = "Bonafide Document";

    safeFetch(`${BASE_URL}/students/id/${studentID}`)
      .then(([resp, _]) => setStudent({ ...resp.student }))
      .catch(console.log);

    safeFetch(`${BASE_URL}/last-serial/bonafide`)
      .then(([res, err]) => {
        if (err !== null) throw new Error(err);

        setSerial((Number(res.serial) || 0) + 1);
      })
      .catch(console.log);
    // eslint-disable-next-line
  }, []);
  const [haveImgPlaceholder, setHaveImgPlaceholder] = useState(false);

  const PREFIX = `BC-${localStorage.getItem("token")}-${
    STREAM_ACRONYMS[student.stream]
  }-`;

  console.log(PREFIX);

  const documentRef = useRef(null);

  // eslint-disable-next-line
  const navigate = useNavigate();

  const handleDownload = async () => {
    const canvas = await html2canvas(documentRef.current);
    canvas.toBlob(async (blob) => {
      const docName = PREFIX + serial + ".png";

      let data = new FormData();
      data.append("doc", blob, docName);
      console.log(docName);

      await fetch(`${BASE_URL}/last-serial`, {
        method: "POST",
        headers: {
          doc_type: "bonafide",
          uuid: studentID,
          docname: docName,
        },
      });

      await fetch(`${BASE_URL}/upload-doc`, {
        body: data,
        method: "POST",
        headers: {
          uuid: studentID,
        },
        uuid: studentID,
      });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = docName;
      a.click();
      navigate(-1);
    });
    // html2canvas(documentRef.current).then((canvas) => {
    //   canvas.toBlob(async (blob) => {
    /// ============ This thing is too messed up right now (works fine :) ) ============
    // let data = new FormData();
    // data.append("doc", blob, student.docName);
    // await fetch(`http://${SERVER_HOST}:${SERVER_PORT}/last-serial`, {
    //   method: "POST",
    //   headers: {
    //     doc_type: "bonafide",
    //     uuid: student.id,
    //     docname: student.docName,
    //   },
    // });
    // await fetch(`http://${SERVER_HOST}:${SERVER_PORT}/upload-doc`, {
    //   body: data,
    //   method: "POST",
    //   headers: {
    //     uuid: student.uuid,
    //   },
    //   uuid: student.uuid,
    // });
    // const a = document.createElement("a");
    // a.href = URL.createObjectURL(blob);
    // a.download = student.docName;
    // a.click();
    // navigate("/viewdata");
    // localStorage.removeItem("bonafide-info");
    /// ===============================================================
    //   });
    // });
  };

  return (
    <>
      {student && (
        <>
          <Header />
          <div className="justify-content-between d-flex p-4">
            <div>
              <label className="text-white px-2">With Image PlaceHolder</label>
              <input
                type="checkbox"
                checked={haveImgPlaceholder}
                onChange={() => setHaveImgPlaceholder(!haveImgPlaceholder)}
              />
            </div>
            <button className="btn btn-primary" onClick={handleDownload}>
              Download
            </button>
          </div>
          <div
            className="container p-5 bg-light"
            style={{ height: "297mm", width: "210mm" }}
            ref={documentRef}
          >
            <DocHeader
              title={"BONAFIDE CERTIFICATE"}
              serialNo={`Serial No: ${serial}`}
              docDate={"___ /___ /_______"}
            />
            <div className="p-5">
              {haveImgPlaceholder && <ImagePlaceholder />}

              <p className="text-center">
                It is to certify to that, Mr./Ms.{" "}
                <abbr title="attribute" className="fw-bold">
                  {`${student.surname} ${student.name} ${student.fathername}`}
                </abbr>{" "}
                is/was enrolled student of this college. He/She is studying
                ________________________________________________________ in year{" "}
                _______ - _______ in this college.
              </p>
              <p className="text-center">
                As per our belief, he/she has a good characteristic.
              </p>
            </div>
            <DocFooter />
          </div>
          <hr />
        </>
      )}
    </>
  );
}
