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
      setDocs({ ...resp.documents });
      console.log(resp.documents);
      setIsLoading(false);
    }

    callAPI();
    // eslint-disable-next-line
  }, []);

  if (isLoading) return <Loading />;

  return (
    <>
      <Header />
      <div className="container p-3">
        <div className="row g-3 justify-content-center d-flex align-items-center flex-column">
          {!docs.transfer_certificate && (
            <div className="w-50">
              <Link
                to={`/tcdoc?id=${params.id}`}
                role="button"
                className="btn btn-primary w-100"
              >
                Transfer Certificate
              </Link>
            </div>
          )}

          {!docs.no_objection && (
            <div className="w-50">
              <Link
                to={`/noObjdoc?id=${params.id}`}
                role="button"
                className="btn btn-primary w-100"
              >
                No Objection Certificate
              </Link>
            </div>
          )}

          {!docs.bonafide && (
            <div className="w-50">
              <Link
                to={`/bonafidedoc?id=${params.id}`}
                role="button"
                className="btn btn-primary w-100"
              >
                Bonafide Certificate
              </Link>
            </div>
          )}

          {!docs.first_trial && (
            <div className="w-50">
              <Link
                to={`/firsttrialdoc?id=${params.id}`}
                role="button"
                className="btn btn-primary w-100"
              >
                First Trial Certificate
              </Link>
            </div>
          )}
          <div className="w-50">
            <Link
              to={`/UpdateStudent?id=${params.id}`}
              role="button"
              className="btn btn-primary w-100"
            >
              Update Student
            </Link>
          </div>
          <div className="w-50">
            <Link
              to={`/update-img/${params.id}`}
              role="button"
              className="btn btn-primary w-100"
            >
              Update Image
            </Link>
          </div>
        </div>

        {docs.transfer_certificate && (
          <div className="img-holder mx-auto w-50 mt-4">
            <img
              src={`${BASE_URL}/uploads/${studentID}/${docs.transfer_certificate}`}
              alt="transfer certificate"
              className="w-100"
            />
          </div>
        )}
        {docs.bonafide && (
          <div className="img-holder mx-auto w-50 mt-4">
            <img
              src={`${BASE_URL}/uploads/${studentID}/${docs.bonafide}`}
              alt="bonafide"
              className="w-100"
            />
          </div>
        )}
        {docs.first_trial && (
          <div className="img-holder mx-auto w-50 mt-4">
            <img
              src={`${BASE_URL}/uploads/${studentID}/${docs.first_trial}`}
              alt="first trial"
              className="w-100"
            />
          </div>
        )}
        {docs.no_objection && (
          <div className="img-holder mx-auto w-50 mt-4">
            <img
              src={`${BASE_URL}/uploads/${studentID}/${docs.no_objection}`}
              alt="no objection"
              className="w-100"
            />
          </div>
        )}
      </div>
    </>
  );
}
