import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
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
      let [resp, err] = await safeFetch(
        `http://${SERVER_HOST}:${SERVER_PORT}/students/${params.id}`
      );
      handleError(err);
      setStudent({ ...resp.student });

      [resp, err] = await safeFetch(
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
  });

  const handleClick = () => {
    if (student) {
      localStorage.setItem("update-details", JSON.stringify(student));
    }
  };

  return (
    <>
      <Header />
      {isLoading ? (
        <Loading />
      ) : (
        <div className="container pt-4" style={{ paddingLeft: "21rem" }}>
          <div className="row g-3">
            {tc === false && (
              <Link to={`/tcdoc?id=${params.id}`}>
                <span className="btn btn-primary w-50">TC Document </span>
              </Link>
            )}

            {noObjection === false && (
              <Link to={`/noObjdoc?id=${params.id}`}>
                <span className="btn btn-primary w-50">
                  No Objection Certificate
                </span>
              </Link>
            )}

            {bonafide === false && (
              <Link to={`/bonafidedoc?id=${params.id}`}>
                <span className=" btn btn-primary w-50">
                  Bonafide Certificate
                </span>
              </Link>
            )}

            {firstTrial === false && (
              <Link to={`/firsttrialdoc?id=${params.id}`}>
                <span className="btn btn-primary w-50">
                  First Trial Certificate
                </span>
              </Link>
            )}

            <button className="btn btn-primary w-50" onClick={handleClick}>
              Update Student
            </button>
          </div>
        </div>
      )}
    </>
  );
}
