import React, { useState, useEffect } from 'react'
import { Header } from './Header';
// import Records from '../Json file/data.json'

export const ViewData = () => {
  const [students, setStudent] = useState([]);

  const studentlist = async () => {
    const res = await fetch("http://192.168.115.246:8000/");
    const a = await res.json();
    // setStudent(a);
    console.log(a.students);
    return a;
  };

  useEffect(() => {
    studentlist().then((list) => setStudent(list));

  }, []);

  console.log(students);

  return (
    <>
      <Header />
      <div className='container'>
        <h1 className='text-center p-5'>Data</h1>
        <table className="table table-bordered">
          <thead>
            <th>id</th>
            <th>Enrollment</th>
            <th>Gr No</th>
          </thead>
          <tbody>
            {
              // students.students.map((e) => {

              //   return (
              //     <tr>
              //       <td>{e.id}</td>
              //       <td>{e.enrollment_no}</td>
              //       <td>{e.gr_no}</td>
              //     </tr>
              //   )
              // })
            }
          </tbody>
        </table>


      </div>
    </>
  )
}
