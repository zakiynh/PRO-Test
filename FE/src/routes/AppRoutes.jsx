import React, {
  useEffect,
  useState,
} from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import {
  useDispatch,
  useSelector,
} from "react-redux";
import Cookies from "js-cookie";
import { login as loginAction } from "../redux/slices/authSlice";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AdminDashboard from "../pages/admin/AdminDashboard";
import Dashboard from "../pages/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import { getUserById } from "../services/userServices";
import { toast } from "react-toastify";

export default function AppRoutes() {
  const dispatch = useDispatch();
  const token = useSelector(
    (state) => state.auth.token
  );
  const user = useSelector(
    (state) => state.auth.user
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const tokenFromCookies = Cookies.get("token");
    const roleFromCookies = Cookies.get("role");

    if (tokenFromCookies && !user) {
      if (roleFromCookies === "admin") {
        getUserById()
          .then((data) => {
            dispatch(
              loginAction({
                token: tokenFromCookies,
                user: data,
              })
            );
          })
          .catch((error) => {
            const errorMessage =
              error.response?.data?.message ||
              "Failed to fetch user";
            toast.error(errorMessage);
            Cookies.remove("token");
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        dispatch(
          loginAction({
            token: tokenFromCookies,
            user: { role: roleFromCookies },
          })
        );
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, [dispatch, user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const role = Cookies.get("role");

  let redirectPath = "/login";
  if (token) {
    redirectPath =
      role === "admin" ? "/admin" : "/dashboard";
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Navigate to={redirectPath} />}
        />
        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/register"
          element={<Register />}
        />
        <Route element={<ProtectedRoute />}>
          <Route
            path="/admin"
            element={<AdminDashboard />}
          />
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />
        </Route>
      </Routes>
    </Router>
  );
}
