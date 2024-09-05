import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AdmissionForm } from './Component/AdmissionForm';
import Error404 from './Component/Error404';
import { ViewData } from './Component/ViewData';

const root = ReactDOM.createRoot(document.getElementById('root'));
let allRoutes=createBrowserRouter([
  {path:'/',element:<App/>},
  {path:'admissionForm',element:<AdmissionForm/>},
  {path:'viewdata',element:<ViewData/>},
  {path:'*',element:<Error404/>}])
root.render(
  <React.StrictMode>
    <RouterProvider router={allRoutes}/>
 
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
