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
      },
    );
    handleError(err);

    if (res.status === "failed") {
      setError(res.err);
    }
    console.log(res);

    if (res.status === "success" && res.exists === true) {
      localStorage.setItem("token", admin.institute_type);
      navigate("/");
    }
  };

  return (
    <>
      <section className=" bg-gradient-to-r from-slate-50 to-slate-500">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-lg font-bold leading-tight tracking-tight text-center text-gray-900 md:text-2xl ">
                Admin Login
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                <div>
                  <input
                    type="text"
                    id="adminname"
                    name="adminname"
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    placeholder="Enter your Admin name..."
                    onChange={handleInput}
                    required
                  />
                </div>
                <div>
                  <input
                    type="password"
                    id="adminpassword"
                    name="adminpassword"
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    placeholder="Enter your Password..."
                    onChange={handleInput}
                    required
                  />
                </div>
                <div className="items-center">
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
                <div className="text-red-500 mb-4">{error}</div>

                <button
                  className="w-full bg-gray-200 border border-2 border-black rounded-lg py-2 px-5 text-lg focus:outline-black-2   "
                  type="submit"
                  onClick={handleSubmit}
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
