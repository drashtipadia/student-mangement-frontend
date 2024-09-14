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
    <div className="App">
      <Header />

      <div className="conatiner p-5 bg-dark w-100 ">
        <div className="row">
          <div className="col">
            <Link to={"/admissionForm"}>
              <button className="btn btn-primary">AdmissionForm</button>
            </Link>
          </div>

          <div className="col">
            <Link to={"/viewdata"}>
              <button className="btn btn-primary">View Data</button>
            </Link>
          </div>

          {/* <div className="col">
            <Link to={"/login"}>
              <button className="btn btn-primary">LogIN</button>
            </Link>
          </div> */}

          <div className="col">
            <button
              className="btn btn-primary"
              onClick={() => {
                localStorage.removeItem("token");
                window.location.reload();
              }}
            >
              Logout
            </button>
          </div>

          <div className="col">
            <button className="btn btn-primary">Bonafied Certificate</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
