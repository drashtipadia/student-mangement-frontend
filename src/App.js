import "./App.css";
import { Header } from "./Component/Header";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";

function App() {
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
            <Link to={"/admissionForm"}>
              <button className="btn btn-primary w-25">AdmissionForm</button>
            </Link>

            <Link to={"/viewdata"}>
              <button className="btn btn-primary w-25">View Data</button>
            </Link>
            <Link to={"/tcdocument"}>
              <button className="btn btn-primary w-25">TC Document</button>
            </Link>

            <Link>
              <button className="btn btn-primary w-25">
                No Objection Certificate
              </button>
            </Link>

            <Link>
              <button className="btn btn-primary w-25">
                Bonafied Certificate
              </button>{" "}
            </Link>

            <Link>
              <button className="btn btn-primary w-25">First Trial</button>
            </Link>
            <span>
              <button
                className="btn btn-primary w-50"
                onClick={() => {
                  localStorage.removeItem("token");
                  window.location.reload();
                }}
              >
                Logout
              </button>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
