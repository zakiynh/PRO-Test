import React from "react";
import { useSelector } from "react-redux";
import {
  Navigate,
  Outlet,
} from "react-router-dom";
import Cookies from "js-cookie";

export default function ProtectedRoute() {
  const user =
    useSelector((state) => state.auth.token) ||
    Cookies.get("token");

  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
}
