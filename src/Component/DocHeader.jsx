import React from 'react'
import img1 from '../styles/collegelogo.jpeg'
import img2 from '../styles/naaclog.jpeg'
import { Badge } from "../Component/Badge";

export function DocHeader({ title, serialNo, docDate }) {
    const currentDate = new Date();

    return (
        <>
            <nav className='navbar bg-light container'>
                <img src={img1} alt='collegelogo' height="80" />
                <div className='text-center'>
                    <small className='m-0'>Managed by Shree Jetpur Kelavni Mandal Trust (since: June 1972)</small>
                    <p className='fs-5 m-0 fw-bold'>Shree G.K. & C.K. Bosamia Arts & Commerce College </p>
                    <small className='m-0'>Post Box No.20, Junagadh road, Jetpur. No-220356, 227356</small>
                    <br />
                    <small className='m-0'>website: www.bosamiacollege.org  &emsp;&emsp;&emsp;&emsp; &emsp;  email: gkck.college@gmail.com</small>
                </div>
                <img src={img2} alt='naaclogo' height="80" />
            </nav>

            <hr />
            <div className='d-flex pb-4 pt-2 align-items-center justify-content-between'>
                <Badge>{serialNo}</Badge>


                <span className="text-end">
                    Date:{" "}

                    {docDate || currentDate.getDate() +
                        "/" +
                        currentDate.getMonth() +
                        "/" +
                        currentDate.getFullYear()}
                </span>
            </div>
            <h1 className="text-center ">{title}</h1>

        </>
    )
}

