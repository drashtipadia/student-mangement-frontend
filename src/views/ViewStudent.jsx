import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SERVER_HOST = process.env.SERVER_HOST || "localhost";
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
      <h1>Student {params.id}</h1>
      <hr />
      {isLoading ? <h2>Loading...</h2> : <h3>Student Loaded</h3>}
    </>
  );
}
