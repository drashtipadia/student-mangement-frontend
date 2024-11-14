import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RadioGroup } from "../Component";
import { SERVER_HOST, SERVER_PORT } from "../utils/config";
import { safeFetch, handleError } from "../utils";

export function AuthLogin() {
  useEffect(() => {
    document.title = "Login";
  });

  const navigate = useNavigate();

  const [admin, setAdmin] = useState({
    adminname: "",
    adminpassword: "",
    institute_type: "",
  });
  const [error, setError] = useState("");

  const handleInput = ({ target }) => {
    setAdmin({ ...admin, [target.name]: target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("username", admin.adminname);
    formData.append("password", admin.adminpassword);

    const [res, err] = await safeFetch(
      `http://${SERVER_HOST}:${SERVER_PORT}/admin-creds`,
      {
        method: "POST",
        body: formData,
      }
    );
    handleError(err);

    if (res.status === "failed") {
      setError(res.err);
    }

    if (res.status === "success" && res.exists === 1) {
      localStorage.setItem("token", admin.institute_type);
      navigate("/");
    }
  };

  return (
    <>
      <div>
        <section
          style={{
            height: "625px",
            backgroundImage: "linear-gradient(to right, white, gray)",
          }}
        >
          <div className="container py-5">
            <div className="row d-flex justify-content-center align-items-center">
              <div className="col-lg-6 col-md-6">
                <div className="card bg-light text-black">
                  <div className="card-body p-5 text-center">
                    <form
                      id="adminloginform"
                      encType="multipart/form-data"
                      method="POST"
                    >
                      <h2 className="fw-bold mb-3 text-uppercase">
                        Admin Login
                      </h2>

                      <div className="form-outline mb-4">
                        <input
                          type="text"
                          id="adminname"
                          name="adminname"
                          className="form-control form-control-lg"
                          placeholder="Enter your Admin name..."
                          onChange={handleInput}
                          required
                        />
                      </div>
                      <div className="form-outline mb-4">
                        <input
                          type="password"
                          id="adminpassword"
                          name="adminpassword"
                          className="form-control form-control-lg"
                          placeholder="Enter your Password..."
                          onChange={handleInput}
                          required
                        />
                      </div>
                      <div className="form-outline mb-5">
                        <RadioGroup
                          name={"institute_type"}
                          label={"Institute Type:"}
                          data={[
                            { label: "GIA", value: "GIA" },
                            { label: "SFI", value: "SFI" },
                          ]}
                          onChange={handleInput}
                          checked={admin.institute_type}
                        />
                      </div>
                      <div className="text-danger mb-4">{error}</div>
                      <button
                        className="btn btn-outline-dark btn-lg px-5"
                        type="submit"
                        onClick={handleSubmit}
                      >
                        Login
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
