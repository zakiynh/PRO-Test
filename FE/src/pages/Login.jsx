import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { login as loginAction } from "../redux/slices/authSlice";
import Button from "../components/Button";
import LabeledInput from "../components/LabeledInput";
import { login } from "../services/authServices";
import ToastContainerComponent from "../components/ToastContainer";
import { toast } from "react-toastify";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await login(email, password);
      const { token, role } = data.data;
      Cookies.set("token", token, {
        expires: 7,
      });
      Cookies.set("role", role, { expires: 7 });

      dispatch(loginAction({ token, role }));
      toast.success("Login successful!");

      if (role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Login failed. Please try again.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex justify-center items-center bg-white h-screen w-screen">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <a
          className="mt-10 w-fit text-zinc-950 "
          href="/"
        >
          <div className="flex w-fit items-center lg:pl-0 lg:pt-0 xl:pt-0">
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 320 512"
              className="mr-3 h-[13px] w-[8px] text-zinc-950 "
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"></path>
            </svg>
            <p className="ml-0 text-sm text-zinc-950 ">
              Back to the website
            </p>
          </div>
        </a>
        <p className="text-[32px] font-bold text-zinc-950 ">
          Sign In
        </p>
        <p className="mb-2.5 mt-2.5 font-normal text-zinc-950 dark:text-zinc-400">
          Enter your email and password to sign
          in!
        </p>
        <form
          noValidate=""
          className="mb-4"
          onSubmit={handleLogin}
        >
          <div className="grid gap-2">
            <div className="grid gap-1">
              <LabeledInput
                label="Email"
                type="email"
                placeholder="john.doe@example.com"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
              />
              <LabeledInput
                label="Password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
              />
              <div className="rounded-lg border border-transparent w-full text-blue-700 bg-gray-900 text-center px-3 py-2 text-base font-medium cursor-pointer transition-colors duration-200 hover:border-indigo-500 focus:outline-none focus-visible:outline-4 focus-visible:outline-webkit-focus-ring-color">
                <Button
                  type="submit"
                  onClick={handleLogin}
                >
                  Sign in
                </Button>
              </div>
            </div>
          </div>
        </form>
        <p>
          <a
            href="/register"
            className="font-medium text-zinc-950 text-sm"
          >
            Don’t have an account?{" "}
            <span className="text-blue-700">
              Sign up
            </span>
          </a>
        </p>
      </div>
      <ToastContainerComponent />
    </div>
  );
}
