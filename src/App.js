import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./App.css";
import { Header } from "./Component/Header";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Header />

      <div className="conatiner p-5 bg-dark">
        <div className="row">
          <div className="col">
            <Link to={"admissionForm"}>
              <button className="btn btn-primary">AdmissionForm</button>
            </Link>
          </div>

          <div className="col">
            <Link to={"viewdata"}>
              <button className="btn btn-primary">View Data</button>
            </Link>
          </div>

          <div className="col">
            <button className="btn btn-primary">Bonafied Certificate</button>
          </div>

          {/* <li>
                  <FontAwesomeIcon icon={faPhone} />{" "}
                </li> */}
        </div>
      </div>
    </div>
  );
}

export default App;
