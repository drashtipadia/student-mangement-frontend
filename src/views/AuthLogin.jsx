import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, RadioGroup } from "../Component";
import { BASE_URL, SERVER_HOST, SERVER_PORT } from "../utils/config";
import { safeFetch, handleError } from "../utils";
import { Loading } from "../Component";

export function AuthLogin() {
  useEffect(() => {
    document.title = "Login";
  }, []);

  const navigate = useNavigate();

  const [admin, setAdmin] = useState({
    adminname: "",
    adminpassword: "",
    institute_type: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInput = ({ target }) => {
    setAdmin({ ...admin, [target.name]: target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let formData = new FormData();
    formData.append("username", admin.adminname);
    formData.append("password", admin.adminpassword);

    const [res, err] = await safeFetch(`${BASE_URL}/admin-creds`, {
      method: "POST",
      body: formData,
    });
    handleError(err);

    if (res.status === "failed") {
      setError(res.err);
    }
    // console.log(res);

    if (res.status === "success" && res.exists === true) {
      localStorage.setItem("token", admin.institute_type);
      navigate("/");
    }
  };

  if (loading) return <Loading />;
  return (
    <>
      <section className=" bg-gradient-to-r from-slate-50 to-slate-500">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-surface rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-lg font-bold leading-tight tracking-tight text-center text-gray-900 md:text-2xl ">
                Admin Login
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                <Input
                  type="text"
                  name="adminname"
                  onChange={handleInput}
                  value={admin.adminname}
                  label="Admin Name"
                />

                <Input
                  type="password"
                  name="adminpassword"
                  onChange={handleInput}
                  value={admin.adminpassword}
                  label="Password"
                />

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
                <div className="text-error mb-3">{error}</div>

                <button
                  className="w-full filled-button"
                  type="submit"
                  onClick={handleSubmit}
                >
                  {/*  bg-gray-200 border-2 border-black rounded-lg py-2 px-5 text-lg outline-2 focus:outline-black */}
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
