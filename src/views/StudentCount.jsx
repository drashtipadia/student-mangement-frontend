import { useState, useEffect } from "react";

import { Header, TableRow } from "../Component";
import { SERVER_HOST, SERVER_PORT } from "../utils/config";
import { safeFetch } from "../utils";

export function StudentCount() {
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
    SEBC: [0, 0, 0, 0, 0, 0],
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
    General: [0, 0, 0, 0],
    SC: [0, 0, 0, 0],
    ST: [0, 0, 0, 0],
    SEBC: [0, 0, 0, 0],
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
      if (err != null) alert(err);
      else {
        setRecords([...res.students]);
        setLoading(false);
      }
    })();
  }, [INSTITUTE_TYPE]);
  if (!loading) {
    records.forEach((val) => {
      let streamIdx = 0;

      if (INSTITUTE_TYPE === "SFI") {
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
          default:
            throw new Error(`undefined Stream: ${val.stream}`);
        }
      } else {
        switch (val.stream) {
          case "Bachelor of Arts":
            streamIdx = 0;
            break;
          case "Bachelor of Commerce":
            streamIdx = 2;
            break;
          default:
            throw new Error(`undefined Stream: ${val.stream}`);
        }
      }

      let genderIdx = val.Gender === "Male" ? 0 : 1;

      if (INSTITUTE_TYPE === "GIA") {
        GIACount[val.Category][streamIdx + genderIdx] += 1;
        GIACount["total"][streamIdx + genderIdx] += 1;
      } else {
        SFICount[val.Category][streamIdx + genderIdx] += 1;
        SFICount["total"][streamIdx + genderIdx] += 1;
      }
    });
  }

  return (
    <>
      <Header />
      <div className="flex justify-center items-center">
        <div className="flex mt-7">
          <table id="my-table">
            <thead className=" text-center">
              <tr>
                <td
                  colSpan="7"
                  className="font-bold py-3 text-xl border border-black"
                >
                  Stream
                </td>
              </tr>
              <tr className="text-center border border-black ">
                {INSTITUTE_TYPE === "SFI" ? (
                  <>
                    <td colSpan="1"></td>
                    <td
                      colSpan="2"
                      className="border border-black font-bold py-2 "
                    >
                      BCA
                    </td>
                    <td colSpan="2" className="boreder font-bold">
                      BBA
                    </td>
                    <td colSpan="2" className="border border-black font-bold">
                      MScIT
                    </td>
                  </>
                ) : (
                  <>
                    <td colSpan="1"></td>
                    <td
                      colSpan="2"
                      className="border border-black font-bold py-2"
                    >
                      BA
                    </td>
                    <td colSpan="2" className="border border-black font-bold">
                      BCom
                    </td>
                  </>
                )}
              </tr>
              <tr className="font-bold text-center">
                <td className="border border-black px-14 py-2">Category</td>
                {INSTITUTE_TYPE === "SFI" ? (
                  <>
                    <td className="border border-black px-9">Male</td>
                    <td className="border border-black px-9">Female</td>
                    <td className="border border-black px-9">Male</td>
                    <td className="border border-black px-9">Female</td>
                    <td className="border border-black px-9">Male</td>
                    <td className="border border-black px-9">Female</td>
                  </>
                ) : (
                  <>
                    <td className="border border-black px-9">Male</td>
                    <td className="border border-black px-9">Female</td>
                    <td className="border border-black px-9">Male</td>
                    <td className="border border-black px-9">Female</td>
                  </>
                )}
              </tr>
            </thead>
            <tbody className="">
              {Object.entries(
                INSTITUTE_TYPE === "GIA" ? GIACount : SFICount
              ).map(([k, entry]) => {
                return (
                  <TableRow data={entry} key={k} before defValue="0">
                    <td className="border border-black font-bold p-2">{k}</td>
                  </TableRow>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
