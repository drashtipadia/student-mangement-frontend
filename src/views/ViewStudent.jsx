import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "../Component/Header";


const SERVER_HOST = process.env.REACT_APP_SERVER_HOST || "localhost";
const SERVER_PORT = Number(process.env.REACT_APP_SERVER_PORT) || 8000;

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
  const params = useParams();
  useEffect(() => {
    fetchStudent(params.id).then((stud) => {
      setStudent({ ...stud });
      setIsLoading(false);
      // console.log(student);
    });
    // eslint-disable-next-line
  }, []);

  return (
    <>

      <Header />




      <div className="justify-content-center">
        <div className="container p-5">
          <h1>Student {params.id}</h1>
          <hr />
          {isLoading ? (
            <h2>Loading...</h2>
          ) : (

            <div className="row g-3 ">

              <Link to={`/tcdoc?id=${params.id}`}>
                <button className="btn btn-primary w-25">TC Document</button>
              </Link>


              <Link to={`/noObjdoc?id=${params.id}`}>
                <button className="btn btn-primary w-25">
                  No Objection Certificate
                </button>
              </Link>

              <Link to={`/bonafidedoc?id=${params.id}`}>
                <button className="btn btn-primary w-25">
                  Bonafide Certificate
                </button>
              </Link>
              <Link to={`/firsttrialdoc?id=${params.id}`}>
                <button className="btn btn-primary w-25" >
                  First Trial Certificate
                </button>
              </Link>
            </div>

          )}
        </div>
      </div>
    </>
  );
}
