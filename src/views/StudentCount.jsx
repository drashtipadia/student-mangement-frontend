import { useState, useEffect } from "react";
import React from "react";
import { Header } from "../Component/Header";
import { SERVER_HOST, SERVER_PORT } from "../utils/config";
import { safeFetch } from "../utils";
import { TableRow } from "../Component/TableRow";

export default function StudentCount() {
  const INSTITUTE_TYPE = localStorage.getItem("token");

  /*
  - So..., here's how this thing works.
  - It first puts all the counts of an institute type in an array.
  - Each 2 array elements represent the stream. Here's how it works for SFI:
        - M is Male, F is Female

     M       F       M       F       M       F
    [0,      0,      0,      0,      0,      0]
     ~~~~v~~~~       ~~~~v~~~~       ~~~~v~~~~
        BCA             BBA            MSCIT
   */
  let SFICount = {
    GENERAL: [0, 0, 0, 0, 0, 0],
    SC: [0, 0, 0, 0, 0, 0],
    ST: [0, 0, 0, 0, 0, 0],
    "SEBC(OBC)": [0, 0, 0, 0, 0, 0],
    PH: [0, 0, 0, 0, 0, 0],
    "EX-ARMY": [0, 0, 0, 0, 0, 0],
    EWS: [0, 0, 0, 0, 0, 0],
    total: [0, 0, 0, 0, 0, 0],
  };

  /*
  - The same logic goes for GIA:
   M       F       M       F
  [0,      0,      0,      0]
   ~~~~v~~~~       ~~~~v~~~~
     B Com            B A
   */
  let GIACount = {
    GENERAL: [0, 0, 0, 0],
    SC: [0, 0, 0, 0],
    ST: [0, 0, 0, 0],
    "SEBC(OBC)": [0, 0, 0, 0],
    PH: [0, 0, 0, 0],
    "EX-ARMY": [0, 0, 0, 0],
    EWS: [0, 0, 0, 0],
    total: [0, 0, 0, 0],
  };

  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const [res, err] = await safeFetch(
        `http://${SERVER_HOST}:${SERVER_PORT}/students/${INSTITUTE_TYPE}`
      );
      if (err != null) console.log(err);
      else {
        setRecords([...res.students]);
        setLoading(false);
      }
    })();

    // eslint-disable-next-line
  }, []);
  if (!loading) {
    records.forEach((val) => {
      let streamIdx = 0;
      let genderIdx = 0;

      switch (val.stream) {
        case "Bachelor of Computer Application":
          streamIdx = 0;
          break;
        case "Bachelor of Business Administration":
          streamIdx = 2;
          break;
        case "Master of Science (Information Technology & Computer Application)":
          streamIdx = 4;
          break;
        case "Bachelor of Arts":
          streamIdx = 0;
          break;
        case "Bachelor of Commerce":
          streamIdx = 2;
          break;
        default:
          throw new Error(`undefined Stream: ${val.stream}`);
      }

      if (val.student_gender === "male") {
        genderIdx = 0;
      } else {
        genderIdx = 1;
      }

      if (val.institute_type === "GIA") {
        GIACount[val.caste][streamIdx + genderIdx] += 1;
        GIACount["total"][streamIdx + genderIdx] += 1;
      } else {
        SFICount[val.caste][streamIdx + genderIdx] += 1;
        SFICount["total"][streamIdx + genderIdx] += 1;
      }
    });
  }

  return (
    <>
      <Header />
      <div className="container mb-3 bg-light overflow-scroll">
        <table className="table table-bordered" id="my-table">
          <thead>
            <tr className="text-center">
              <td colSpan="7" className="fw-bold">
                Stream
              </td>
            </tr>
            <tr className="text-center">
              {INSTITUTE_TYPE === "SFI" ? (
                <>
                  <td colSpan="1"></td>
                  <td colSpan="2" className="fw-bold">
                    BCA
                  </td>
                  <td colSpan="2" className="fw-bold">
                    BBA
                  </td>
                  <td colSpan="2" className="fw-bold">
                    MScIT
                  </td>
                </>
              ) : (
                <>
                  <td colSpan="1"></td>
                  <td colSpan="2" className="fw-bold">
                    BCom
                  </td>
                  <td colSpan="2" className="fw-bold">
                    BA
                  </td>
                </>
              )}
            </tr>
            <tr className="fw-bold text-center">
              <td>Category</td>
              {INSTITUTE_TYPE === "SFI" ? (
                <>
                  <td>Male</td>
                  <td>Female</td>
                  <td>Male</td>
                  <td>Female</td>
                  <td>Male</td>
                  <td>Female</td>
                </>
              ) : (
                <>
                  <td>Male</td>
                  <td>Female</td>
                  <td>Male</td>
                  <td>Female</td>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {Object.entries(INSTITUTE_TYPE === "GIA" ? GIACount : SFICount).map(
              ([k, entry]) => {
                return (
                  <>
                    <TableRow data={entry} key={k} before defValue="0">
                      <td className="fw-bold">{k}</td>
                    </TableRow>
                  </>
                );
              }
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
