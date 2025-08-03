import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Header } from "./Component";

function App() {
  useEffect(() => {
    document.title = "Dashboard";
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/login");
  }, [navigate]);

  return (
    <>
      <Header />
      <div className="App">
        <div className="mx-auto sm:px-4">
          <div className="flex align-item-center flex-col justify-center mt-12 gap-2 max-w-[400px] mx-auto">
            <Link to={"/admissionForm"} role="button" className="filled-button">
              Admission Form
            </Link>

            <Link to={"/viewdata"} role="button" className="filled-button">
              View Data
            </Link>
            <Link to={"/count-student"} className="filled-button" role="button">
              Student Count
            </Link>
            <Link to={"/add-excel"} className="filled-button" role="button">
              Import Excel
            </Link>
            <Link to={"/issue-tc"} className="filled-button" role="button">
              Issue TC
            </Link>
            <Link
              to={"/fees-structure"}
              className="filled-button"
              role="button"
            >
              Fee Structure
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
