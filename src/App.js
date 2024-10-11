import "./App.css";
import { Header } from "./Component/Header";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";

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
        <div className="conatiner p-5">
          <div className="row g-3">
            <div className="w-100">
              <Link
                to={"/admissionForm"}
                role="button"
                className="btn btn-primary w-25"
              >
                AdmissionForm
              </Link>
            </div>

            <div className="w-100">
              <Link
                to={"/viewdata"}
                role="button"
                className="btn btn-primary w-25"
              >
                View Data
              </Link>
            </div>
            <div className="w-100">
              <Link
                to={"/count-student"}
                className="btn btn-primary w-25"
                role="button"
              >
                Student Count
              </Link>
            </div>

            {/* <span>
              <button
                className="btn btn-primary w-50"
                onClick={() => {
                  localStorage.removeItem("token");
                  window.location.reload();
                }}
              >
                Logout
              </button> */}
            {/* </span> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
