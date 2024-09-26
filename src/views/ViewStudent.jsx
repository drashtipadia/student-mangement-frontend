import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "../Component/Header";
import { SERVER_HOST, SERVER_PORT } from "../utils/config";
import { Input } from "../Component/Input";

/**
 * returns object containing student information.
 * @param {string} id ID of the student
 */
// const fetchStudent = async (id) => {
//   const response = await fetch(
//     `http://${SERVER_HOST}:${SERVER_PORT}/students/${id}`
//   );
//   return await response.json();
// };

export function ViewStudent() {
  const [isLoading, setIsLoading] = useState(true);
  // eslint-disable-next-line
  const [student, setStudent] = useState({});
  const params = useParams();
  useEffect(() => {
    fetch(`http://${SERVER_HOST}:${SERVER_PORT}/students/${params.id}`)
      .then(body => body.json())
      .then((stud) => {
        // console.log(stud);
        setStudent({ ...stud.student });
        setIsLoading(false);

      });
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Header />



      <p className="bg-light">Student {params.id}</p>
      <hr />
      {isLoading ? (
        <h2>Loading...</h2>
      ) : (
        <div className="container ">

          <div className="row g-3 m-0">
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
              <button className="btn btn-primary w-25">
                First Trial Certificate
              </button>
            </Link>
            {student &&
              <Input
                value={student.birth_date}
              />}
          </div>


        </div>

      )}


    </>
  );
}
