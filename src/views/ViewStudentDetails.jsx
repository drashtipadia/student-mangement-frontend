import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "../Component/Header";
import { SERVER_HOST, SERVER_PORT } from "../utils/config";


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



export function ViewStudentDetails() {

  const [isLoading, setIsLoading] = useState(true);
  // eslint-disable-next-line
  const [student, setStudent] = useState({});
  const params = useParams();

  // let hasFT;
  // fetch(`http://${SERVER_HOST}:${SERVER_PORT}/students/${params.id}/has/first-trial`)
  //   .then(checkFT => checkFT.json())
  //   .then(checkFT => hasFT = checkFT.exists);



  let checkFT;
  // fetch(`http://${SERVER_HOST}:${SERVER_PORT}/students/${params.id}/has/first-trial`)
  //   .then((body) => (body.json()))
  //   .then(console.log);



  useEffect(() => {
    fetch(`http://${SERVER_HOST}:${SERVER_PORT}/students/${params.id}`)
      .then(body => body.json())
      .then((stud) => {
        // console.log(stud);
        setStudent({ ...stud.student });

        async function fetchAPI() {
          fetch(`http://${SERVER_HOST}:${SERVER_PORT}/students/${params.id}/has/first-trial`)
            .then((body) => (body.json()))
            //.then(console.log);
            .then(res => checkFT = res.exists);
        }

        fetchAPI();

        //console.log(checkFT);

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
        <div className="container" style={{ paddingLeft: "21rem" }}>

          <div className="row g-3">

            <Link to={`/tcdoc?id=${params.id}`}>
              <span className="btn btn-primary w-50">TC Document </span>
            </Link>

            <Link to={`/noObjdoc?id=${params.id}`}>
              <span className="btn btn-primary w-50"> No Objection Certificate</span>
            </Link>

            <Link to={`/bonafidedoc?id=${params.id}`}>
              <span className=" btn btn-primary w-50"> Bonafide Certificate</span>
            </Link>

            {/* {checkFT && checkFT.exists && */}
            <Link to={`/firsttrialdoc?id=${params.id}`}>
              <span className="btn btn-primary w-50">First Trial Certificate</span>
            </Link>
            {/* } */}

            <Link to={`/updateStudent?id=${params.id}`}>
              <span className="btn btn-primary w-50">Update Student</span>
            </Link>



            {/* {student &&
              <Input
                name="name"
                value={student.name}
              />} */}
          </div>


        </div >

      )
      }


    </>
  );
}
