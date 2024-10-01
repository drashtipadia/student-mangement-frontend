import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Header } from "../Component/Header";
import { SERVER_HOST, SERVER_PORT } from "../utils/config";
import { safeFetch } from "../utils";
import { handleError } from "../utils";
import { Loading } from "../Component/Loading";

export function ViewStudentDetails() {
  const [isLoading, setIsLoading] = useState(true);
  // eslint-disable-next-line
  const [student, setStudent] = useState({});
  const [firstTrial, setFirstTrial] = useState(false);
  const [tc, setTc] = useState(false);
  const [noObjection, setNoObjection] = useState(false);
  const [bonafide, setBonafide] = useState(false);
  /// Doesn't work...
  // const [docs, setDocs] = useState({
  //   firstTrial: false,
  //   tc: false,
  //   noObjection: false,
  //   bonafide: false,
  // });
  const params = useParams();

  useEffect(() => {
    async function callAPI() {
      // let [resp, err] = await safeFetch(
      //   `http://${SERVER_HOST}:${SERVER_PORT}/students/${params.id}`
      // );
      // handleError(err);
      // setStudent({ ...resp.student });

      let [resp, err] = await safeFetch(
        `http://${SERVER_HOST}:${SERVER_PORT}/students/${params.id}/has/first-trial`
      );
      handleError(err);
      setFirstTrial(resp.exists);

      [resp, err] = await safeFetch(
        `http://${SERVER_HOST}:${SERVER_PORT}/students/${params.id}/has/bonafide`
      );
      handleError(err);
      setBonafide(resp.exists);

      [resp, err] = await safeFetch(
        `http://${SERVER_HOST}:${SERVER_PORT}/students/${params.id}/has/tc`
      );
      handleError(err);
      setTc(resp.exists);

      [resp, err] = await safeFetch(
        `http://${SERVER_HOST}:${SERVER_PORT}/students/${params.id}/has/no-objection`
      );
      handleError(err);
      setNoObjection(resp.exists);

      setIsLoading(false);
    }

    callAPI();
  }, []);

  let navigate = useNavigate();

  const handleClick = () => {
    if (student) {
      localStorage.setItem("update-details", JSON.stringify(student));
      navigate("/admissionForm");
    }
  };

  return (
    <>
      <Header />
      {isLoading ? (
        <Loading />
      ) : (
        <div className="container p-3  ">
          <div className="row g-3 justify-content-center d-flex align-items-center flex-column ">
            <div className="w-50">
              {tc === false && (
                <Link to={`/tcdoc?id=${params.id}`} role="button" className="btn btn-primary w-100">
                  Leaving Certificate
                </Link>
              )}
            </div>

            <div className="w-50">
              {noObjection === false && (
                <Link to={`/noObjdoc?id=${params.id}`} role="button" className="btn btn-primary w-100">
                  No Objection Certificate
                </Link>
              )}
            </div>

            <div className="w-50">
              {bonafide === false && (
                <Link to={`/bonafidedoc?id=${params.id}`} role="button" className="btn btn-primary w-100">
                  Bonafide Certificate
                </Link>
              )}
            </div>

            <div className="w-50">
              {firstTrial === false && (
                <Link to={`/firsttrialdoc?id=${params.id}`} role="button" className="btn btn-primary w-100">
                  First Trial Certificate
                </Link>
              )}
            </div>
            <div className="w-50">
              <Link to={`/UpdateStudent?id=${params.id}`} role="button" className="btn btn-primary w-100">
                Update Student
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
