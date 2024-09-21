// import React from 'react'

export function ViewFirstTrial() {
    localStorage.setItem('some-item', JSON.stringify({ name: "John" }));
    return (
        <div className='container'>

            <h1>First Trial Document</h1>
            <p>This is to certify that, Mr./ Miss-------</p><br />
            <p>In Year ----- was studying ---- in this college.</p><br />
            <p>Examination of ----- held in --- ---- was completed by them in the attempt.</p>


        </div>
    )
}
