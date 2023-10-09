import * as React from "react";
import * as ReactDOM from "react-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import Employee from "./components/Employee/Employee";
import AddEmployee from "./components/Employee/AddEmployee";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    // loader: rootLoader,
    // children: [
    //   {
    //     path: "team",
    //     element: <Team />,
    //     loader: teamLoader,
    //   },
    // ],
  },
  {
    path: "/employee",
    element: <Employee />,
    // loader: rootLoader,
    children: [
      {
        path: "add",
        element: <AddEmployee />,
        // loader: teamLoader,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
