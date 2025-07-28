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
          <div className="flex align-item-center flex-col justify-center mt-12 gap-2">
            <Link
              to={"/admissionForm"}
              role="button"
              className="w-full max-w-[400px] text-center border text-xl rounded py-2 px-4 bg-blue-600 text-white hover:bg-blue-700 block mx-auto"
            >
              Admission Form
            </Link>

            <Link
              to={"/viewdata"}
              role="button"
              className="w-full max-w-[400px] text-center border text-xl rounded py-2 px-4 bg-blue-600 text-white hover:bg-blue-700 block mx-auto"
            >
              View Data
            </Link>
            <Link
              to={"/count-student"}
              className="w-full max-w-[400px] text-center border text-xl rounded py-2 px-4 bg-blue-600 text-white hover:bg-blue-700 block mx-auto"
              role="button"
            >
              Student Count
            </Link>
            <Link
              to={"/add-excel"}
              className="w-full max-w-[400px] text-center border text-xl rounded py-2 px-4 bg-blue-600 text-white hover:bg-blue-700 block mx-auto"
              role="button"
            >
              Import Excel
            </Link>
            <Link
              to={"/issue-tc"}
              className="w-full max-w-[400px] text-center border text-xl rounded py-2 px-4 bg-blue-600 text-white hover:bg-blue-700 block mx-auto"
              role="button"
            >
              Issue TC
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
