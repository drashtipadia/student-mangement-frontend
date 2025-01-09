import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import "./styles/index.css";
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

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<AuthLogin />} />
      <Route path="/" element={<App />} />
      <Route path="/admissionForm" element={<AdmissionForm />} />
      <Route path="/viewdata" element={<StudentsList />} />
      <Route path="/students/:id" element={<ViewStudentDetails />} />
      <Route path="*" element={<Error404 />} />
      <Route path="/tcdoc" element={<TCDoc />} />
      <Route path="/noObjdoc" element={<ViewNoObj />} />
      <Route path="/bonafidedoc" element={<ViewBonafide />} />
      <Route path="/firsttrialdoc" element={<ViewFirstTrial />} />
      <Route path="/view-firstTrial" element={<ViewFirstTrial />} />
      <Route path="/view-tc" element={<ViewTc />} />
      <Route path="/view-noobj" element={<ViewNoObj />} />
      <Route path="/view-bonafide" element={<ViewBonafide />} />
      <Route path="/updateStudent" element={<UpdateStudent />} />
      <Route path="/update-img/:id" element={<UpdateStudentImage />} />
      <Route path="/count-student" element={<StudentCount />} />
    </Routes>
  </BrowserRouter>
);
