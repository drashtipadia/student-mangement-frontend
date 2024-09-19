import React from 'react'
import { Header } from '../Component/Header'
import { Input } from '../Component/Input'
import { SelectBox } from '../Component/SelectBox'

function TCDoc() {
    return (
        <>
            <Header />
            <div className="container justify-content-between">
                <h2 className="text-center mt-3">TC DOCUMENT</h2>
                {/* <div className='row '> */}
                {/* <div className="col d-flex justify-content-center py-3"> */}
                <div className="card bg-light" style={{ width: "50rem" }}>

                    <div className="row border-3 form-group m-3 align-items-center">
                        <Input
                            type="text"
                            name="name"
                            label="Student Name:"
                            // value={name}
                            placeholder="SURNAME NAME FATHERNAME"
                        // onChange={handleInputs}
                        />
                    </div>
                    <div className="row border-3 form-group m-3 align-items-center">
                        <SelectBox
                            name="lastexam"
                            label={"Last Exam"}
                            placeholder={"Select stream"}
                            data={[{ label: "BCA", value: "bca" }, { label: "BCA", value: "bca" }]}

                        />
                    </div>



                </div>

            </div>

        </>
    )
}

export default TCDoc