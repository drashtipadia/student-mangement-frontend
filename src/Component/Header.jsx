import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (




    <div className="navbar navbar-light bg-light justify-content-center" >
      <Link to={"/"} className="navbar-brand"><h1>Student Mangement Admin</h1></Link>

    </div>

  );
}
export { Header };
