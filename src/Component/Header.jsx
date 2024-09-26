import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (




    <div className="navbar navbar-light bg-light p-2" >
      <Link to={"/"} className="navbar-brand"><h1>Student Mangement Admin</h1></Link>

      <button
        className="btn btn-danger"
        onClick={() => {
          localStorage.removeItem("token");
          window.location.reload();
        }}
      >
        Logout
      </button>

    </div>

  );
}
export { Header };
