import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Header } from "./Component";

function App() {
  useEffect(() => {
    document.title = "Dashboard";
  });
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Header />
      <div className="App">
        <div className="mx-auto sm:px-4">
          <div className="flex align-item-center flex-col justify-center mt-12">
            <div className=" my-2">
              <Link
                to={"/admissionForm"}
                role="button"
                className="text-center  border text-xl rounded py-2 px-4  bg-blue-600 text-white hover:bg-blue-700  block mx-auto"
                style={{ maxWidth: "400px" }}
              >
                Admission Form
              </Link>
            </div>

            <div className="my-2">
              <Link
                to={"/viewdata"}
                role="button"
                className=" text-center  border text-xl rounded py-2 px-4  bg-blue-600 text-white hover:bg-blue-700  block mx-auto"
                style={{ maxWidth: "400px" }}
              >
                View Data
              </Link>
            </div>
            <div className="my-2">
              <Link
                to={"/count-student"}
                className=" text-center  border text-xl rounded py-2 px-4  bg-blue-600 text-white hover:bg-blue-700  block mx-auto"
                role="button"
                style={{ maxWidth: "400px" }}
              >
                Student Count
              </Link>
            </div>
            <div className="my-2">
              <Link
                to={"/add-excel"}
                className="text-center  border text-xl rounded py-2 px-4  bg-blue-600 text-white hover:bg-blue-700  block mx-auto"
                role="button"
                style={{ maxWidth: "400px" }}
              >
                Import Excel
              </Link>
            </div>
          </div>
        </div>
      </div>{" "}
    </>
  );
}

export default App;
