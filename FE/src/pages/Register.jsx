import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Link,
  useNavigate,
} from "react-router-dom";
import { login } from "../redux/slices/authSlice";
import { register } from "../services/authServices";
import Button from "../components/Button";
import LabeledInput from "../components/LabeledInput";
import LabeledSelect from "../components/LabeledSelect";
import ToastContainerComponent from "../components/ToastContainer";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

export default function Register() {
  const [fullName, setFullName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");
  const [passwordError, setPasswordError] =
    useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }
    setPasswordError("");
    try {
      const response = await register(
        fullName,
        dob,
        gender,
        email,
        password
      );
      const { token, role } = response.data.data;
      dispatch(
        login({
          token,
          role,
          user: { fullName, dob, gender, email },
        })
      );
      Cookies.set("token", token, {
        expires: 7,
      });
      Cookies.set("role", role, { expires: 7 });
      toast.success(
        "Account created successfully!"
      );

      if (response.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Failed to create account";
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
          Register Account
        </p>
        <p className="mb-2.5 mt-2.5 font-normal text-zinc-950 dark:text-zinc-400">
          Register your account!
        </p>
        <form
          noValidate=""
          className="mb-4"
          onSubmit={handleRegister}
        >
          <div className="grid gap-2">
            <div className="grid gap-1">
              <LabeledInput
                label="Full Name"
                type="text"
                placeholder="John Doe"
                value={fullName}
                onChange={(e) =>
                  setFullName(e.target.value)
                }
              />
              <LabeledInput
                label="Date of Birth"
                type="date"
                placeholder="John Doe"
                value={dob}
                onChange={(e) =>
                  setDob(e.target.value)
                }
              />
              <LabeledSelect
                label="Gender"
                options={[
                  {
                    value: "",
                    label: "Select Gender",
                  },
                  {
                    value: "male",
                    label: "Male",
                  },
                  {
                    value: "female",
                    label: "Female",
                  },
                ]}
                value={gender}
                onChange={(e) =>
                  setGender(e.target.value)
                }
              />
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
              <LabeledInput
                label="Confirm Password"
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(
                    e.target.value
                  )
                }
              />
              {passwordError && (
                <p className="text-red-500 text-sm mt-1">
                  {passwordError}
                </p>
              )}
            </div>
            <div className="rounded-lg border border-transparent w-full text-blue-700 bg-gray-900 text-center px-3 py-2 text-base font-medium cursor-pointer transition-colors duration-200 hover:border-indigo-500 focus:outline-none focus-visible:outline-4 focus-visible:outline-webkit-focus-ring-color">
              <Button type="submit">
                Sign up
              </Button>
            </div>
          </div>
        </form>
        <p>
          <a
            href="/login"
            className="font-medium text-zinc-950 text-sm"
          >
            Already have an account?{" "}
            <span className="text-blue-700">
              Sign in
            </span>
          </a>
        </p>
      </div>

      <ToastContainerComponent />
    </div>
  );
}
