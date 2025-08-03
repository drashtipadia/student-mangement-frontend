import { useEffect, useState } from "react";
import { Header, Input, Loading, SelectBox, TableRow } from "../Component";
import { GIA_STREAMS, SEMESTER, SFI_STREAMS } from "../utils/constants";
import { safeFetch } from "../utils";
import { BASE_URL } from "../utils/config";
import { FeeFromStructure } from "../Component/FeeFromStructure";
import { Dialog } from "../Component/Dialog/Dialog";

export const FeeStructure = () => {
  const INSTITUTE_TYPE = localStorage.getItem("token");

  const [feeDetails, setFeeDetails] = useState([]);
  const [loading, setLoading] = useState();
  const [dialogActive, setDialogActive] = useState(false);

  useEffect(() => {
    (async () => {
      const [res, err] = await safeFetch(`${BASE_URL}/fee/`);
      if (err != null) alert(err);
      else {
        console.log(res);
        setFeeDetails([...res]);
        setLoading(false);
      }
    })();
  }, []);

  const handleAdd = () => {
    setDialogActive(true);
    console.log("Call");
  };

  if (loading) return <Loading />;
  return (
    <>
      <Header />
      <div className="mb-3 overflow-y-scroll p-3">
        <table>
          <thead>
            <tr>
              <th>Stream</th>
              <th>Sem</th>
              <th>College Dev Fee</th>
              <th>Semester Fee</th>
              <th>University Sport Complex Fee</th>
              <th>Library Fee</th>
              <th>Sports Fee</th>
              <th>Test Fee</th>
              <th>Student Welfare Fund</th>
              <th>Cultural Activity Fee</th>
              <th>Sationary Fee</th>
              <th>Tuition Fee</th>
              <th>Entrace Fee</th>
              <th>Reservation Fee</th>
              <th>University Enrollment Fee</th>
              <th>University Development Fee</th>
              <th>Practial Fee</th>
              <th>E-Libarary Fee</th>
              <th>University Exam Fee</th>
              <th>Late Fee</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {feeDetails &&
              feeDetails.map((item) => {
                // return JSON.stringify(item);
                return (
                  <TableRow
                    data={item}
                    key={item.id}
                    after
                    ignoreCols={["id", "inserted_at"]}
                  >
                    <td>
                      <button className="tonal-button">Update</button>
                    </td>
                    <td>
                      <button className="error-button">Delete</button>
                    </td>
                  </TableRow>
                );
              })}
          </tbody>
        </table>
      </div>
      <Dialog active={dialogActive} onClose={() => setDialogActive(false)}>
        <Dialog.Title>Fee Structure</Dialog.Title>
        <Dialog.Body>
          <div className="overflow-y-scroll h-[400px]">
            <FeeFromStructure />
          </div>
        </Dialog.Body>
      </Dialog>

      {/* <FeeFromStructure /> */}
      <div className="fixed bottom-4 right-4">
        <button
          className="filled-button rounded-full h-[55px] "
          onClick={handleAdd}
        >
          <svg
            className="w-6 h-6 "
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 12h14m-7 7V5"
            />
          </svg>
        </button>
      </div>
    </>
  );
};
