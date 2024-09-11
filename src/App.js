import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./App.css";
import { Header } from "./Component/Header";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Header />

      <li>
        {" "}
        <Link to={"admissionForm"}>AdmissionForm</Link>{" "}
      </li>
      <li>
        {" "}
        <Link to={"viewdata"}>View Data</Link>{" "}
      </li>
      {/* <li>
        <FontAwesomeIcon icon={faPhone} />{" "}
      </li> */}
    </div>
  );
}

export default App;
