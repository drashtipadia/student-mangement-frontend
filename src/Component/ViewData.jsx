import React from 'react'
import Records from '../Json file/data.json'

export const ViewData = () => {
  return (
    <div className='container'>
        <h1 className='text-center'>Data</h1>
        {
            Records.map( record => {
                return(
                   <div className="box" key={ record.id}> 
                     { record.id}  { record.name}
                    </div>
                )
            })
        }
    </div>
  )
}
