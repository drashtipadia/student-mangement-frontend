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
        <div className="conatiner">
          <div className="row g-3 w-100">
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
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
