import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/features/Home";
import Dashboard from "./components/features/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import AddEmployee from "./components/features/Employee/AddEmployee";
import EmployeeInfo from "./components/features/Employee/EmployeeInfo";
import EmployeeList from "./components/features/Employee/EmployeeList";
import ProtectedLogin from "./routes/ProtectedLogin";
import Login from "./components/features/Login";
import Register from "./components/features/Register";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedLogin />}>
          <Route path="login" element={<Login />} />
        </Route>
        {/* <Route path="/login" element={<Login />} /> */}

        <Route path="/register" element={<Register />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employee"
          element={
            <ProtectedRoute>
              <EmployeeList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employee/add"
          element={
            <ProtectedRoute>
              <AddEmployee />
            </ProtectedRoute>
          }
          replace={true}
        />
        <Route
          path="/employee/info/:id"
          element={
            <ProtectedRoute>
              <EmployeeInfo />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
