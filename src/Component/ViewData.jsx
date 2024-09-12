import React, { useState, useEffect } from 'react'
import { Header } from './Header';
// import Records from '../Json file/data.json'

export const ViewData = () => {
  const [students, setStudent] = useState([]);

  const studentlist = async () => {
    const res = await fetch("http://localhost:8000/students/", {
      method: 'GET',
    });
    // const a = await res.json()
    // setStudent(a);
    return await res.json();

  };

  useEffect(() => {
    studentlist().then((list) => setStudent(list));

  }, []);




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

              // students.map((e) => {

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
