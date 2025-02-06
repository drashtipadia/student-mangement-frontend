import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Header, Loading } from "../Component";
import { safeFetch, handleError } from "../utils";
import { SERVER_HOST, SERVER_PORT } from "../utils/config";

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
      <Header />
      <div className="m-auto">
        <img
          src={`http://${SERVER_HOST}:${SERVER_PORT}/${img}`}
          alt="student-img"
          style={{ height: "250px", width: "250px" }}
        />
        <button
          onClick={goBack}
          className="text-center border text-xl rounded py-1 px-2 bg-blue-600 text-white hover:bg-blue-700   mx-auto"
        >
          Go Back
        </button>
      </div>
    </>
  );
}
