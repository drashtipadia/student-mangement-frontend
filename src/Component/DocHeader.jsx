import React from 'react'
import img1 from '../styles/collegelogo.jpeg'
import img2 from '../styles/naaclog.jpeg'

export function DocHeader() {
    return (
        <nav className='navbar bg-light container'>
            <img src={img1} alt='collegelogo' height="100" />
            <div className='text-center'>
                <p className='m-0 fs-6'>since: June 1972</p>
                <p className='m-0 fs-6'>Managed by Shree Jetpur Kelavni Mandal Trust</p>
                <p className='fs-5 m-0 fw-bold'>Shree G.K. & C.K. Bosamiya</p>
                <p className='fs-5 m-0 fw-bold'>Arts and Commerce College </p>
                <p className='m-0 fs-6'>Post Box No.20, Junagadh road, Jetpur. No-220356,227356</p>
            </div>
            <img src={img2} alt='naaclogo' height="100" />
        </nav>
    )
}

