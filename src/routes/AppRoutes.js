import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../pages/Dashboard";
import Login from "../components/auth/Login";
import Registration from "../components/auth/Registration";
import Layout from "../components/master/Layout";
import { AuthContext } from "../utils/AuthContext";
import Counter from "../pages/Counter";
import Profile from "../pages/Profile";
import AllDriverLocations from "../pages/AllDriverLocations";

function AppRoutes() {
  const { isAuthenticated } = useContext(AuthContext); // Access authentication state from context

  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<Layout />}>
        <Route
          path="/registration"
          element={!isAuthenticated ? <Registration /> : <Navigate to="/dashboard" />}
        />
        <Route
          path="/login"
          element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />}
        />

        {/* Private Routes */}
        <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/all-driver-locations" element={<PrivateRoute><AllDriverLocations /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
      </Route>

      {/* Fallback for unmatched routes */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
