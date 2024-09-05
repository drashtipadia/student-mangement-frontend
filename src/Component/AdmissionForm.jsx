import React from 'react'
import { useState } from "react"
import { Header } from './Header'
import axios from 'axios';

function AdmissionForm() {

    const [user, setUser] = useState({
        stream: '', semester: '', elective_course: '', main_subject: '', first_secondary_subject: '', tertiary_secondary_subject: '', gr_no: '', enrollment_no: '', abc_id: '', udisk_no: '', aadhar_number: '', full_name: '', full_name_of_parent: '', address: '', contact_no: '', wh_no: '', parent_no: '', email: '', gender: '', birth_date: '', birth_place: '', caste: '', city: '', district: '', pincode: '', studentimg: '', tc_doc: '', no_objection_doc: '', first_trial_doc: ''
    })
    let name, value;
    const handleInputs = (e) => {
        name = e.target.name;
        value = e.target.value;
        setUser({ ...user, [name]: value })

    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(user);
        const response = await fetch('http://192.168.209.247:8000/students/', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });
        console.log(await response.json());

    }
    return (
        <>
            <Header />
            <div className="container justify-content-around">
                <h2 className="text-center mt-3">Admission Form</h2>
                <div className="card ms-auto bg-light">

                    <form className='m-5' method="post">

                        <div className="row broder-3 form-group mb-3">
                            <label className='col-auto text-center'>Stream:</label>
                            <div className='col'>

                                <select className="form-select" name='stream' aria-label="Default select example" >
                                    <option hidden>Select Stream</option>
                                    <option value="BCA">BCA</option>
                                    <option value="BBA">BBA</option>
                                    <option value="MSCIT">MSCIT</option>
                                    <option value="BA">BA</option>
                                    <option value="BCOM">BCOM</option>
                                </select>
                            </div>
                        </div>

                        <div className="row broder-3 form-group mb-3">
                            <label className='col-auto text-center'>Semster:</label>
                            <div className='col'>

                                <select className="form-select" name='semester' aria-label="Default select example">
                                    <option hidden>Select Semester</option>
                                    <option value="1" >1st</option>
                                    <option value="2">2nd</option>
                                    <option value="3">3rd</option>
                                    <option value="4">4th</option>
                                    <option value="5">5th</option>
                                    <option value="5">6th</option>
                                    <option value="5">7th</option>
                                    <option value="5">8th</option>
                                </select>
                            </div>
                        </div>

                        <div className="row broder-3 form-group mb-3">
                            <label className='col-auto text-center'>Choose Subject:</label>
                            <div className='col'>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name='elective_course' id="inlineRadio1" value="Accountncy" onChange={handleInputs} />
                                    <label className="form-check-label" htmlFor="inlineRadio1">Accountncy</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name='elective_course' id="inlineRadio2" value="Computer" onChange={handleInputs} />
                                    <label className="form-check-label" htmlFor="inlineRadio2">Computer</label>
                                </div>
                            </div>
                        </div>
                        <div className="row broder-3 form-group mb-3">
                            <label className='col-auto text-center'>Compulsary Subject:</label>
                            <div className='col'>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name='elective_course' id="inlineRadio1" value="English" onChange={handleInputs} />
                                    <label className="form-check-label" htmlFor="inlineRadio1">English</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name='elective_course' id="inlineRadio2" value="Hindi" onChange={handleInputs} />
                                    <label className="form-check-label" htmlFor="inlineRadio2">Hindi</label>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className="row broder-3 form-group mb-3">
                            <label className='col-auto text-center'>Main Subject:</label>
                            <div className='col'>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name='main_subject' id="inlineRadio1" value="economics" onChange={handleInputs} />
                                    <label className="form-check-label" htmlFor="inlineRadio1">Economics</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name='main_subject' id="inlineRadio2" value="gujarati" onChange={handleInputs} />
                                    <label className="form-check-label" htmlFor="inlineRadio2">Gujarati</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name='main_subject' id="inlineRadio2" value="hindi" onChange={handleInputs} />
                                    <label className="form-check-label" htmlFor="inlineRadio2">Hindi</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name='main_subject' id="inlineRadio2" value="psychology" onChange={handleInputs} />
                                    <label className="form-check-label" htmlFor="inlineRadio2">Psychology</label>
                                </div>
                            </div>
                        </div>

                        <div className="row broder-3 form-group mb-3">
                            <label className='col-auto text-center'>First Secondary Subject:</label>
                            <div className='col'>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name='first_secondary_subject' id="inlineRadio2" value="gujarati" onChange={handleInputs} />
                                    <label className="form-check-label" htmlFor="inlineRadio2">Gujarati</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name='first_secondary_subject' id="inlineRadio2" value="hindi" onChange={handleInputs} />
                                    <label className="form-check-label" htmlFor="inlineRadio2">Hindi</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name='first_secondary_subject' id="inlineRadio2" value="psychology" onChange={handleInputs} />
                                    <label className="form-check-label" htmlFor="inlineRadio2">Psychology</label>
                                </div>
                            </div>
                        </div>

                        <div className="row broder-3 form-group mb-3">
                            <label className='col-auto text-center'>Tertiary Secondary Subject:</label>
                            <div className='col'>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name='tertiary_secondary_subject' id="inlineRadio2" value="gujarati" onChange={handleInputs} />
                                    <label className="form-check-label" htmlFor="inlineRadio2">Gujarati</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name='tertiary_secondary_subject' id="inlineRadio2" value="hindi" onChange={handleInputs} />
                                    <label className="form-check-label" htmlFor="inlineRadio2">Hindi</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name='tertiary_secondary_subject' id="inlineRadio2" value="psychology" onChange={handleInputs} />
                                    <label className="form-check-label" htmlFor="inlineRadio2">Psychology</label>
                                </div>
                            </div>
                        </div>

                        <hr />
                        <div className="row border-3 form-group mb-3">
                            <label className='col-auto text-center'>G R No:</label>
                            <div className='col'>
                                <input type="text" id="gr_no" name='gr_no' className="form-control" placeholder="G R No." value={user.gr_no} onChange={handleInputs} /> </div>
                        </div>


                        <div className="row border-3 form-group mb-3">
                            <label className='col-auto text-center'>Enrollment No:</label>
                            <div className='col'>
                                <input type="text" id="enrollment_no" name='enrollment_no' className="form-control" placeholder="Enrollment No." value={user.enrollment_no} onChange={handleInputs} /> </div>
                        </div>

                        <div className="row border-3 form-group mb-3">
                            <label className='col-auto text-center'> ABC ID:</label>
                            <div className='col'>
                                <input type="text" id="abc_id" name='abc_id' className="form-control" placeholder="ABC ID." value={user.abc_id} onChange={handleInputs} /> </div>
                        </div>
                        <div className="row border-3 form-group mb-3">
                            <label className='col-auto text-center'>UDISK No:</label>
                            <div className='col'>
                                <input type="text" id="udisk_no" name='udisk_no' className="form-control" placeholder="UDISK No." value={user.udisk_no} onChange={handleInputs} /> </div>
                        </div>
                        <div className="row border-3 form-group mb-3">
                            <label className='col-auto text-center'>Aadhar No:</label>
                            <div className='col'>
                                <input type="text" id="aadhar_number" name='aadhar_number' className="form-control" placeholder="Aadhar No." value={user.aadhar_number} onChange={handleInputs} /> </div>
                        </div>
                        <div className="row border-3 form-group mb-3">
                            <label className='col-auto text-center'>Full Name:</label>
                            <div className='col'>
                                <input type="text" id="full_name" name='full_name' className="form-control" placeholder="SURNAME NAME FATHERNAME" value={user.full_name} onChange={handleInputs} /> </div>
                        </div>
                        <div className="row border-3 form-group mb-3">
                            <label className='col-auto text-center'>Full Parent Name:</label>
                            <div className='col'>
                                <input type="text" id="full_name_of_parent" name='full_name_of_parent' className="form-control" placeholder="Parent Name" value={user.full_name_of_parent} onChange={handleInputs} /> </div>
                        </div>
                        <div className="row border-3 form-group mb-3">
                            <label className='col-auto text-center'>Address:</label>
                            <div className='col'>
                                <textarea id="address" name='address' className="form-control" placeholder="Address" value={user.address} onChange={handleInputs} />
                            </div>
                        </div>
                        <div className="row border-3 form-group mb-3">
                            <label className='col-auto text-center'>Mobile No:</label>
                            <div className='col'>
                                <input type="text" id="contact_no" name='contact_no' className="form-control" placeholder="Mobile No." value={user.contact_no} onChange={handleInputs} /> </div>
                            <div className='col'>
                                <input type="text" id="wh_no" name='wh_no' className="form-control" placeholder="WhatsApp No." value={user.wh_no} onChange={handleInputs} /> </div>
                            <div className='col'>
                                <input type="text" id="parent_no" name='parent_no' className="form-control" placeholder="Parent No." value={user.parent_no} onChange={handleInputs} /> </div>
                        </div>
                        <div className="row border-3 form-group mb-3">
                            <label className='col-auto text-center'>Email:</label>
                            <div className='col'>
                                <input type="email" id="email" name='email' className="form-control" placeholder="Email" value={user.email} onChange={handleInputs} /> </div>
                        </div>

                        <div className="row border-3 form-group mb-3">
                            <label className="form-label col-auto text-center" htmlFor="gender">Gender: </label>
                            <div className='col-auto'>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name='gender' id="inlineRadio1" value="male" onChange={handleInputs} />
                                    <label className="form-check-label" htmlFor="inlineRadio1">Male</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name='gender' id="inlineRadio2" value="female" onChange={handleInputs} />
                                    <label className="form-check-label" htmlFor="inlineRadio2">Female</label>
                                </div>
                            </div>


                        </div>



                        <div className="row border-3 form-group mb-3">
                            <label className='col-auto text-center'>Date OF Birth:</label>
                            <div className='col'>
                                <input type="date" id="birth_date" name='birth_date' className="form-control" value={user.birth_date} onChange={handleInputs} /> </div>
                        </div>
                        <div className="row border-3 form-group mb-3">
                            <label className='col-auto text-center'>Birth Place:</label>
                            <div className='col'>
                                <input type="text" id="birth_place" name='birth_place' className="form-control" value={user.birth_place} onChange={handleInputs} /> </div>
                        </div>

                        <div className="row border-3 form-group mb-3">
                            <label className='col-auto text-center'>Caste:</label>
                            <div className='col-auto'>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name='caste' id="inlineRadio1" value="general" onChange={handleInputs} />
                                    <label className="form-check-label" htmlFor="inlineRadio1">GENERAL</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name='caste' id="inlineRadio2" value="ews" onChange={handleInputs} />
                                    <label className="form-check-label" htmlFor="inlineRadio2">EWS</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name='caste' id="inlineRadio3" value="sc" onChange={handleInputs} />
                                    <label className="form-check-label" htmlFor="inlineRadio3">SC</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name='caste' id="inlineRadio4" value="st" onChange={handleInputs} />
                                    <label className="form-check-label" htmlFor="inlineRadio4">ST</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name='caste' id="inlineRadio5" value="sebc(obc)" onChange={handleInputs} />
                                    <label className="form-check-label" htmlFor="inlineRadio5">SEBC(OBC)</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name='caste' id="inlineRadio6" value="ph" onChange={handleInputs} />
                                    <label className="form-check-label" htmlFor="inlineRadio6">PH</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name='caste' id="inlineRadio7" value="ex-army" onChange={handleInputs} />
                                    <label className="form-check-label" htmlFor="inlineRadio7">EX-ARMY</label>
                                </div>
                            </div>


                        </div>
                        <div className="row border-3 form-group mb-3">
                            <label className='col-auto text-center'>City:</label>
                            <div className='col'>
                                <input type="text" id="city" name='city' className="form-control" placeholder="CITY" value={user.city} onChange={handleInputs} /> </div>
                            <label className='col-auto text-center'>District:</label>
                            <div className='col'>
                                <input type="text" id="district" name='district' className="form-control" placeholder="District" value={user.district} onChange={handleInputs} /> </div>
                            <label className='col-auto text-center'>PinCode:</label>
                            <div className='col'>
                                <input type="text" id="pincode" name='pincode' className="form-control" placeholder="pincode" value={user.pincode} onChange={handleInputs} /> </div>
                        </div>
                        <div className="row border-3 form-group mb-3">
                            <label className='col-auto text-center'>Last Organization Studied From:</label>
                            <div className='col'>
                                <input type="text" id="last_organzation_studied_from" name='last_organzation_studied_from' className="form-control" placeholder="Last Organzation Studied From" value={user.last_organzation_studied_from} onChange={handleInputs} /> </div>
                        </div>
                        <div className="row border-3 form-group mb-3">
                            <label className='col-auto text-center'>Last Studied Year:</label>
                            <div className='col'>
                                <input type="number" id="last_studied_year" name='last_studied_year' className="form-control" placeholder="Last StudiedYear" value={user.last_organzation_year} onChange={handleInputs} min="2000" max={new Date().getFullYear()} /> </div>

                        </div>
                        <div className="row border-3 form-group mb-3">
                            <label className='col-auto text-center'>Student Image:</label>
                            <div className='col'>
                                <input type="file" id="studentimg" name='studentimg' className="form-control" value={user.studentimg} onChange={handleInputs} /> </div>
                        </div>
                        <div className="row border-3 form-group mb-3">
                            <label className='col-auto text-center'>TC Document:</label>
                            <div className='col'>
                                <input type="file" id="tc_doc" name='tc_doc' className="form-control" value={user.tc_doc} onChange={handleInputs} /> </div>
                        </div>
                        <div className="row border-3 form-group mb-3">
                            <label className='col-auto text-center'>No Objection Document:</label>
                            <div className='col'>
                                <input type="file" id="no_objection_doc" name='no_objection_doc' className="form-control" value={user.no_objection_doc} onChange={handleInputs} /> </div>
                        </div>
                        <div className="row border-3 form-group mb-3">
                            <label className='col-auto text-center'>First Trial Document:</label>
                            <div className='col'>
                                <input type="file" id="first_trial_doc" name='first_trial_doc' className="form-control" value={user.first_trial_doc} onChange={handleInputs} /> </div>
                        </div>



                        <button type="submit" className="btn btn-primary btn-lg w-100" onClick={handleSubmit}>Submit</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export { AdmissionForm };
