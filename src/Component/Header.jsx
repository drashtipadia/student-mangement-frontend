import { Link, useNavigate, useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <header>
      <nav className="bg-surface-container text-on-surface border-gray-200 shadow-md px-4 lg:px-6 py-2.5">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <div>
            {location.pathname !== "/" && (
              <button
                className="bg-transparent shadow-none"
                onClick={() => navigate(-1)}
              >
                <svg
                  className="size-5"
                  fill="none"
                  viewBox="0 0 26 26"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
              </button>
            )}

            <Link to={"/"} className="text-3xl ml-2">
              Student Mangement Admin
            </Link>
          </div>

          <div>
            <button
              className="bg-error hover:opacity-90 text-on-error font-bold py-2 px-4 rounded"
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("update-details");
                navigate("/login");
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
export { Header };
