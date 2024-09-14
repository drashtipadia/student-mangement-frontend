import React, { useEffect, useState } from "react";
import { Input } from "../Component/Input";
import { Navigate, useNavigate } from "react-router-dom";

function Login() {

    const navigate = useNavigate()

    const [admin, setAdmin] = useState({
        adminname: "",
        adminpassword: "",
        institute_type: "",

    });

    let a_name, a_value;
    const handleInput = (e) => {
        a_name = e.target.name;
        a_value = e.target.value;
        setAdmin({ ...admin, [a_name]: a_value });
    }

    let token;
    const handleSubmit = async (e) => {
        e.preventDefault();

        token = admin.institute_type;

        if (admin.adminname === "admin" && admin.adminpassword === "admin") {
            localStorage.setItem('token', token);
            navigate('/')
        }
    }


    // navigate('/')
    return (
        <div>
            <section style={{ height: "625px", backgroundImage: "linear-gradient(to right, white, gray)" }}>
                <div className="container py-5">
                    <div className="row d-flex justify-content-center align-items-center">
                        <div className="col-lg-6 col-md-6">
                            <div className="card bg-light text-black">
                                <div className="card-body p-5 text-center">
                                    <form id="adminloginform" method="POST">
                                        <h2 className="fw-bold mb-3 text-uppercase"> Admin Login</h2>

                                        <div className="form-outline mb-4">
                                            {/* <div className="row border-3 form-group mb-3 align-items-center">
                                                <Input
                                                    type="text"
                                                    name="username"
                                                    label="Admin Name:"
                                                    // value={admin.username}
                                                    placeholder="Enter Admin Name."
                                                    // onChange={handleInputs}
                                                    required
                                                />
                                            </div> */}
                                            <input type="text" id="adminname" name="adminname" className="form-control form-control-lg"
                                                placeholder="Enter your Admin name..." onChange={handleInput} required />

                                        </div>
                                        <div className="form-outline mb-4">
                                            <input type="password" id="adminpassword" name="adminpassword" className="form-control form-control-lg"
                                                placeholder="Enter your Password..." onChange={handleInput} required />

                                        </div>
                                        <div className="form-outline mb-5">
                                            <div className="form-check form-check-inline">
                                                <input className="form-check-input" type="radio" name="institute_type" id="inlineRadio1" value="sfi" onChange={handleInput} />
                                                <label className="form-check-label" htmlFor="inlineRadio1">SFI</label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <input className="form-check-input" type="radio" name="institute_type" id="inlineRadio2" value="gia" onChange={handleInput} />
                                                <label className="form-check-label" htmlFor="inlineRadio2">GIA</label>
                                            </div>

                                        </div>
                                        <button className="btn btn-outline-dark btn-lg px-5" type="submit" onClick={handleSubmit} >Login </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div >
    );
}
export { Login };
