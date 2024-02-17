import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from "./error-page"
import Login from "./auth/Login"
import Signup from "./auth/Signup"
import AccountVerification from "./auth/AccountVerification"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <ErrorPage />
  },{
    path: "/login",
    element: <Login />,
  },,{
    path: "/signup",
    element: <Signup />,
  },,{
    path: "/verify",
    element: <AccountVerification />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
