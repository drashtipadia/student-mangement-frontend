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
        <div className="container">
          <div className="d-flex align-item-center flex-column justify-content-center">
            <div className=" my-2">
              <Link
                to={"/admissionForm"}
                role="button"
                className="btn btn-primary  d-block mx-auto"
                style={{ maxWidth: "400px" }}
              >
                AdmissionForm
              </Link>
            </div>

            <div className="my-2">
              <Link
                to={"/viewdata"}
                role="button"
                className="btn btn-primary d-block mx-auto"
                style={{ maxWidth: "400px" }}
              >
                View Data
              </Link>
            </div>
            <div className="my-2">
              <Link
                to={"/count-student"}
                className="btn btn-primary d-block mx-auto"
                role="button"
                style={{ maxWidth: "400px" }}
              >
                Student Count
              </Link>
            </div>
            <div className="my-2">
              <Link
                className="btn btn-primary d-block mx-auto"
                role="button"
                style={{ maxWidth: "400px" }}
              >
                Import Excel
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
