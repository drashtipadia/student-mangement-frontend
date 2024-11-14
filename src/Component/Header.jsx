import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import darkThemeIcon from "../images/dark-theme.svg";
import lightThemeIcon from "../images/light-theme.svg";
import { useLocation } from "react-router-dom";

function Header() {
  const THEME = localStorage.getItem("theme");
  const [theme, setTheme] = useState(THEME);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    document.querySelector("html").setAttribute("data-bs-theme", theme);

    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <nav className="navbar fixed-top p-2 bg-body-tertiary">
      <div className="container-fluid">
        <div>
          {location.pathname !== "/" && (
            <button
              className="bg-transparent btn shadow-none"
              onClick={() => navigate(-1)}
            >
              <div className="h5 bi bi-arrow-left"></div>
            </button>
          )}
          <Link to={"/"} className="navbar-brand">
            Student Mangement Admin
          </Link>
        </div>

        <div>
          <button
            className="btn btn-primary me-3"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <img
              className="mb-1"
              src={theme === "dark" ? darkThemeIcon : lightThemeIcon}
              alt="Theme Toggler Icons"
            />
          </button>
          <button
            className="btn btn-danger"
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("update-details");
              window.location.href = "/login";
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
export { Header };
