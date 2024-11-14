import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import {
  AdmissionForm,
  Error404,
  StudentsList,
  AuthLogin,
  TCDoc,
  ViewStudentDetails,
  ViewFirstTrial,
  ViewTc,
  ViewNoObj,
  UpdateStudent,
  UpdateStudentImage,
  ViewBonafide,
  StudentCount,
} from "./views";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";

const root = ReactDOM.createRoot(document.getElementById("root"));

let allRoutes = createBrowserRouter([
  { path: "/login", element: <AuthLogin /> },
  { path: "/", element: <App /> },
  { path: "/admissionForm", element: <AdmissionForm /> },
  { path: "/viewdata", element: <StudentsList /> },
  { path: "/students/:id", element: <ViewStudentDetails /> },
  { path: "*", element: <Error404 /> },
  { path: "/tcdoc", element: <TCDoc /> },
  { path: "/noObjdoc", element: <ViewNoObj /> },
  { path: "/bonafidedoc", element: <ViewBonafide /> },
  { path: "/firsttrialdoc", element: <ViewFirstTrial /> },
  { path: "/view-firstTrial", element: <ViewFirstTrial /> },
  { path: "/view-tc", element: <ViewTc /> },
  { path: "/view-noobj", element: <ViewNoObj /> },
  { path: "/view-bonafide", element: <ViewBonafide /> },
  { path: "/updateStudent", element: <UpdateStudent /> },
  { path: "/update-img/:id", element: <UpdateStudentImage /> },
  { path: "/count-student", element: <StudentCount /> },
]);

root.render(<RouterProvider router={allRoutes} />);
