import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SERVER_HOST, SERVER_PORT } from "../utils/config";
import { safeFetch, handleError } from "../utils";

function Login() {
  const navigate = useNavigate();

  const [admin, setAdmin] = useState({
    adminname: "",
    adminpassword: "",
    institute_type: "",
  });
  const [error, setError] = useState("");

  let a_name, a_value;
  const handleInput = (e) => {
    a_name = e.target.name;
    a_value = e.target.value;
    setAdmin({ ...admin, [a_name]: a_value });
  };

  let token;
  const handleSubmit = async (e) => {
    e.preventDefault();

    token = admin.institute_type;
    let formData = new FormData();
    formData.append("username", admin.adminname);
    formData.append("password", admin.adminpassword);

    const [res, err] = await safeFetch(
      `http://${SERVER_HOST}:${SERVER_PORT}/admin-creds`,
      {
        method: "POST",
        body: formData,
      },
    );
    handleError(err);

    if (res.status === "failed") {
      setError(res.err);
    }

    if (res.status === "success" && res.exists === 1) {
      localStorage.setItem("token", token);
      navigate("/");
    }
  };

  return (
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
                      {" "}
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
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="institute_type"
                          id="inlineRadio1"
                          value="SFI"
                          onChange={handleInput}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="inlineRadio1"
                        >
                          SFI
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="institute_type"
                          id="inlineRadio2"
                          value="GIA"
                          onChange={handleInput}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="inlineRadio2"
                        >
                          GIA
                        </label>
                      </div>
                    </div>
                    {error && <div className="text-danger">{error}</div>}
                    <button
                      className="btn btn-outline-dark btn-lg px-5"
                      type="submit"
                      onClick={handleSubmit}
                    >
                      Login{" "}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
export { Login };
