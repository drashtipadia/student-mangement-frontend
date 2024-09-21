import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "../Component/Header";

const SERVER_HOST = process.env.SERVER_HOST || "192.168.91.246";
const SERVER_PORT = Number(process.env.SERVER_PORT) || 8000;

/**
 * returns object containing student information.
 * @param {string} id ID of the student
 */
const fetchStudent = async (id) => {
  const response = await fetch(
    `http://${SERVER_HOST}:${SERVER_PORT}/students/${id}`
  );
  return await response.json();
};

export function ViewStudent() {
  const [isLoading, setIsLoading] = useState(true);
  const [student, setStudent] = useState({});
  useEffect(() => {
    fetchStudent(params.id).then((stud) => {
      setStudent({ ...stud });
      setIsLoading(false);
      console.log(student);
    });
    // eslint-disable-next-line
  }, []);
  const params = useParams();
  return (
    <>
      <Header />
      <div className="sizedefine">
        <h1 >Student {params.id}</h1>
        <hr />
        {isLoading ? <h2>Loading...</h2> : <div className="row mb-2">
          <Link to={`/tcdoc?id=${params.id}`} className="btn btn-primary w-25" role="button">
            TC Document
          </Link>

          <Link to={"/noObjdoc"}>
            <button className="btn btn-primary w-25">
              No Objection Certificate
            </button>
          </Link>

          <Link to={"/bonafidedoc"}>
            <button className="btn btn-primary w-25">
              Bonafide Certificate
            </button>
          </Link>
          <Link to={"/firsttrialdoc"}>
            <button className="btn btn-primary w-25">
              First Trial Certificate
            </button>
          </Link>
        </div>}

      </div>
    </>
  );
}
