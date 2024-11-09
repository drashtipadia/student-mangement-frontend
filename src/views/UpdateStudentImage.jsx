import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { safeFetch, handleError } from "../utils";
import { SERVER_HOST, SERVER_PORT } from "../utils/config";
import { Loading } from "../Component/Loading";

export function UpdateStudentImage() {
  useEffect(() => {
    document.title = "Update Stduent Image";
  });

  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();
  const params = useParams();
  const goBack = () => {
    nav(-1);
  };

  useEffect(() => {
    async function getImageFromAPI() {
      const [res, err] = await safeFetch(
        `http://${SERVER_HOST}:${SERVER_PORT}/${params.id}/get-img`
      );
      handleError(err);

      setImg(res.path);
      setLoading(false);
    }

    getImageFromAPI();
    // eslint-disable-next-line
  }, []);

  if (loading) return <Loading />;

  return (
    <>
      <img
        src={`http://${SERVER_HOST}:${SERVER_PORT}/${img}`}
        alt="student-img"
      />
      <button onClick={goBack} className="btn btn-primary">
        Go Back
      </button>
    </>
  );
}
