import React, {
  useEffect,
  useState,
  useRef,
} from "react";
import { getProfile } from "../services/userServices";
import {
  useSelector,
  useDispatch,
} from "react-redux";
import { logout as logoutAction } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Cookies from "js-cookie";
import ToastContainerComponent from "../components/ToastContainer";
import { toast } from "react-toastify";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const canvasRef = useRef(null);
  const token = useSelector(
    (state) => state.auth.token
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token || user) return;

    getProfile()
      .then((data) => {
        setUser(data);
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
  }, [token, user, dispatch]);

  const handleLogout = () => {
    Cookies.remove("token");
    dispatch(logoutAction());
    navigate("/login");
  };

  const formatDate = (dateString) => {
    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    };
    return new Date(
      dateString
    ).toLocaleDateString("en-GB", options);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const stars = Array.from(
      { length: 100 },
      () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2,
        alpha: Math.random(),
        fade: Math.random() > 0.5 ? 0.01 : -0.01,
      })
    );

    function animate() {
      ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
      );
      stars.forEach((star) => {
        star.alpha += star.fade;
        if (star.alpha <= 0 || star.alpha >= 1)
          star.fade *= -1;
        ctx.globalAlpha = star.alpha;
        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.arc(
          star.x,
          star.y,
          star.radius,
          0,
          Math.PI * 2
        );
        ctx.fill();
      });
      requestAnimationFrame(animate);
    }

    animate();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-lg font-semibold">
        Loading...
      </div>
    );
  }

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
      {/* Star Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
      ></canvas>

      {/* Nebula Animated Background */}
      <div className="absolute inset-0 bg-[url('../public/nebula.jpg')] bg-cover bg-center animate-nebulaMove opacity-50"></div>

      {/* Floating Card */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: [0, -10, 0] }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative bg-white p-6 rounded-2xl shadow-lg text-center text-black z-10 backdrop-blur-xl bg-opacity-80"
      >
        <h1 className="text-3xl font-bold">
          Welcome,{" "}
          {user ? user.fullName : "Astronaut"}! 🚀
        </h1>
        <p className="text-gray-600 mt-2">
          Ready to explore the galaxy? 🌌
        </p>

        {user && (
          <div className="mt-4 text-left">
            <p>
              <strong>Date of Birth:</strong>{" "}
              {formatDate(user.dob)}
            </p>
            <p>
              <strong>Gender:</strong>{" "}
              {user.gender}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Registration Date:</strong>{" "}
              {formatDate(user.registDate)}
            </p>
          </div>
        )}

        <motion.button
          whileHover={{
            scale: 1.1,
            backgroundColor: "#D32F2F",
          }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.2 }}
          className="mt-4 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md"
          onClick={handleLogout}
        >
          Logout
        </motion.button>
      </motion.div>

      {/* Animasi Nebula */}
      <style>
        {`
          @keyframes nebulaMove {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }

          .animate-nebulaMove {
            background-size: 200% 200%;
            animation: nebulaMove 15s infinite alternate ease-in-out;
          }
        `}
      </style>
      <ToastContainerComponent />
    </div>
  );
}
