import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AdmissionForm } from "./Component/AdmissionForm";
import Error404 from "./views/Error404";
import { StudentsList } from "./views/StudentsList";
import { Login } from "./views/AuthLogin";

const root = ReactDOM.createRoot(document.getElementById("root"));

let allRoutes = createBrowserRouter([
  { path: "/login", element: <Login /> },
  { path: "/", element: <App /> },
  { path: "/admissionForm", element: <AdmissionForm /> },
  { path: "/viewdata", element: <StudentsList /> },
  { path: "*", element: <Error404 /> },
]);

root.render(<RouterProvider router={allRoutes} />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
