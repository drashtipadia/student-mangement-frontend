import React, { useState } from 'react'
import { Header } from '../Component/Header'
import { Input } from "../Component/Input";
import { SelectBox } from "../Component/SelectBox";
import { GIA_STREAMS, SFI_STREAMS, SEMESTER } from "../utils/constants";

function BonafideDoc() {
    const inst_type = localStorage.getItem("token");
    const [studnet, setStudent] = useState({
        studentName: '',
        stream: '',
        year: '',
    })
    const handleInputs = (e) => {
        setStudent({ ...studnet, [e.target.name]: e.target.value })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(studnet);
    }

    return (
        <>
            <Header />
            <div className="container">
                <h2 className="text-center mt-3">Bonofide Certificate</h2>
                <div className="col d-flex justify-content-center py-3">
                    <div className="card bg-light" style={{ width: "50rem" }}>
                        <form className="m-4" method="post">
                            <div className="row border-3 form-group m-3 align-items-center">
                                <Input
                                    type="text"
                                    name="studentName"
                                    label="Student Name:"
                                    value={studnet.studentName}
                                    placeholder="SURNAME NAME FATHERNAME"
                                    onChange={handleInputs}
                                />
                            </div>
                            <div className="row border-3 form-group m-3 align-items-center">
                                <SelectBox
                                    name="stream"
                                    label={"Stream"}
                                    placeholder={"Select stream"}
                                    onChange={handleInputs}
                                    data={
                                        inst_type === "GIA" ? [...GIA_STREAMS] : [...SFI_STREAMS]
                                    }
                                />
                                <SelectBox
                                    name="semester"
                                    label={""}
                                    placeholder={"Select Semester"}
                                    onChange={handleInputs}
                                    data={[...SEMESTER]}
                                />
                                <Input
                                    type="number"
                                    name="year"
                                    placeholder={"year"}
                                    min="2000"
                                    max={new Date().getFullYear()}
                                    onChange={handleInputs}
                                />
                            </div>

                            <hr />
                            <button
                                type="submit"
                                className="btn btn-primary btn-lg w-100"
                                onClick={handleSubmit}
                            > Generate BONOFIDE </button>

                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}

export default BonafideDoc