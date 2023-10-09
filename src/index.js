import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import { AuthProvider } from "./context/reducer";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/features/Home";
import Dashboard from "./components/features/Dashboard";
import AddEmployee from "./components/features/Employee/AddEmployee";
import EmployeeInfo from "./components/features/Employee/EmployeeInfo";
import ProtectedRoute from "./routes/ProtectedRoute";
import EmployeeList from "./components/features/Employee/EmployeeList";
import Register from "./components/features/Register";
import Login from "./components/features/Login";
const routes = [
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/employee",
    element: (
      <ProtectedRoute>
        <EmployeeList />
      </ProtectedRoute>
    ),
  },
  {
    path: "/employee/info/:id",
    element: (
      <ProtectedRoute>
        <EmployeeInfo />
      </ProtectedRoute>
    ),
  },
  {
    path: "/employee/add",
    element: (
      <ProtectedRoute>
        <AddEmployee />
      </ProtectedRoute>
    ),
  },
  {
    path: "/employee/edit/:id",
    element: (
      <ProtectedRoute>
        <AddEmployee />
      </ProtectedRoute>
    ),
  },
];

const router = createBrowserRouter(routes);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      {/* <App /> */}
    </AuthProvider>
  </React.StrictMode>
);
