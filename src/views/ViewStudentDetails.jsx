import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Header, Loading } from "../Component";
import { BASE_URL } from "../utils/config";
import { safeFetch } from "../utils";
import { handleError } from "../utils";

export function ViewStudentDetails() {
  useEffect(() => {
    document.title = "Student Details";
  });

  const [isLoading, setIsLoading] = useState(true);
  const [docs, setDocs] = useState({
    bonafide: "",
    transfer_certificate: "",
    first_trial: "",
    no_objection: "",
  });

  const params = useParams();
  const studentID = params.id;

  useEffect(() => {
    async function callAPI() {
      let [resp, err] = await safeFetch(
        `${BASE_URL}/students/${studentID}/docs`
      );
      handleError(err);
      setDocs({ ...resp.docData });
      // console.log(resp.documents);
      setIsLoading(false);
    }

    callAPI();
    // eslint-disable-next-line
  }, []);

  if (isLoading) return <Loading />;

  return (
    <>
      <Header />
      <div className="mx-auto sm:px-4">
        <div className="flex gap-2 flex-col justify-center mt-12">
          {!docs.transfer_certificate && (
            <Link
              to={`/tcdoc?id=${params.id}`}
              role="button"
              className="text-center  border text-xl rounded py-2  w-72  bg-blue-600 text-white hover:bg-blue-700  block mx-auto no-underline"
            >
              Transfer Certificate
            </Link>
          )}

          {!docs.no_objection && (
            <Link
              to={`/noObjdoc?id=${params.id}`}
              role="button"
              className="text-center  border text-xl rounded py-2  w-72  bg-blue-600 text-white hover:bg-blue-700  block mx-auto no-underline"
            >
              No Objection Certificate
            </Link>
          )}

          {!docs.bonafide && (
            <Link
              to={`/bonafidedoc?id=${params.id}`}
              role="button"
              className="text-center  border text-xl rounded py-2  w-72 bg-blue-600 text-white hover:bg-blue-700  block mx-auto no-underline"
            >
              Bonafide Certificate
            </Link>
          )}

          {!docs.first_trial && (
            <Link
              to={`/firsttrialdoc?id=${params.id}`}
              role="button"
              className="text-center  border text-xl rounded py-2 w-72 bg-blue-600 text-white hover:bg-blue-700  block mx-auto no-underline"
            >
              First Trial Certificate
            </Link>
          )}

          <Link
            to={`/UpdateStudent?id=${params.id}`}
            role="button"
            className="text-center  border text-xl rounded py-2  w-72  bg-blue-600 text-white hover:bg-blue-700  block mx-auto no-underline "
          >
            Update Student
          </Link>
        </div>
      </div>
      <div className="flex">
        {docs.transfer_certificate && (
          <div className="img-holder mx-auto w-64 mt-4">
            <img
              src={`${BASE_URL}/uploads/student-${studentID}/${docs.transfer_certificate}`}
              alt="transfer certificate"
              className="w-100"
            />
          </div>
        )}
        {docs.bonafide && (
          <div className="img-holder mx-auto w-64  mt-4">
            <img
              src={`${BASE_URL}/uploads/student-${studentID}/${docs.bonafide}`}
              alt="bonafide"
              className=""
            />
          </div>
        )}
        {docs.first_trial && (
          <div className="img-holder mx-auto w-64 mt-4">
            <img
              src={`${BASE_URL}/uploads/student-${studentID}/${docs.first_trial}`}
              alt="first trial"
              className=""
            />
          </div>
        )}
        {docs.no_objection && (
          <div className="img-holder mx-auto w-64 mt-4">
            <img
              src={`${BASE_URL}/uploads/student-${studentID}/${docs.no_objection}`}
              alt="no objection"
              className=""
            />
          </div>
        )}
      </div>
    </>
  );
}
