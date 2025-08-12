import { useEffect, useState } from "react";
import { Header, Loading, TableRow } from "../Component";
import { safeFetch } from "../utils";
import { BASE_URL } from "../utils/config";
import { FeeFromStructure } from "../Component/FeeFromStructure";
import { Dialog } from "../Component/Dialog/Dialog";
import FloatingActionButton from "../Component/FloatingActionButton";

export const FeeStructure = () => {
  const [feeDetails, setFeeDetails] = useState([]);
  const [loading, setLoading] = useState();
  const [dialogActive, setDialogActive] = useState(false);

  useEffect(() => {
    (async () => {
      const [res, err] = await safeFetch(`${BASE_URL}/fee/`);
      if (err != null) alert(err);
      else {
        setFeeDetails([...res]);
        setLoading(false);
      }
    })();
  }, []);

  const handleAdd = () => {
    setDialogActive(true);
  };
  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this record?")) {
      setLoading(true);
      try {
        const res = await fetch(`${BASE_URL}/fee/${id}`, {
          method: "DELETE",
        });

        if (res.status === 204) {
          alert("Record deleted!");
          setFeeDetails((pre) => pre.filter((item) => item.id !== id));
          return;
        } else {
          const data = await res.json();

          if (data.status === "failed") throw new Error(data.error);
        }
      } catch (err) {
        console.error(err);
        alert("Something went wrong");
      } finally {
        setLoading(false);
      }
    }
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
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {feeDetails &&
              feeDetails.map((item) => (
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
                    <button
                      className="error-button"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </TableRow>
              ))}
          </tbody>
        </table>
      </div>
      <Dialog active={dialogActive} onClose={() => setDialogActive(false)}>
        <Dialog.Title>Fee Structure</Dialog.Title>
        <Dialog.Body>
          <FeeFromStructure
            onAddStructure={(structure) => {
              setDialogActive(false);
              window.location.reload();
            }}
          />
        </Dialog.Body>
      </Dialog>

      {/* <FeeFromStructure /> */}
      <div className="fixed bottom-4 right-4 z-[-1]">
        <FloatingActionButton onClick={handleAdd} type="base">
          <svg
            className="w-6 h-6"
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
        </FloatingActionButton>
      </div>
    </>
  );
};
