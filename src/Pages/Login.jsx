import BG from "../assets/SignBg.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { LetterCascade } from "@/components/ui/letter-cascade"

const API_BASE_URL = (
  import.meta.env.VITE_API_URL ||
  (typeof window !== "undefined" && window.location.hostname === "localhost"
    ? "http://localhost:3000"
    : "https://lynk.bonto.run")
).replace(/\/+$/, "");
const AUTH_API_URL = `${API_BASE_URL}/api/auth`;

const LoginPage = () => {
  const navigate = useNavigate();
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotMessage, setForgotMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const data = {
      username: formData.get("usernameOrEmail"),
      email: formData.get("usernameOrEmail"),
      password: formData.get("password"),
    };

    try {
      const res = await axios.post(
        `${AUTH_API_URL}/Login`,
        data,
        {
          withCredentials: true,
        },
      );

      if (res.status === 200) {
        navigate("/Feed");
      }
    } catch (error) {
      console.error(error);
      alert("Invalid username/email or password");
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${AUTH_API_URL}/forgot-password`,
        { email: forgotEmail },
      );

      setForgotMessage(res.data.message);
    } catch (error) {
      setForgotMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <div
        className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center px-4"
        style={{ backgroundImage: `url(${BG})` }}
      >
        <div className="absolute inset-0 bg-black/30 " />

        <div className="Card relative z-10 w-96 max-w-md rounded-3xl backdrop-blur-xl p-8 shadow-2xl">
          {/* Header */}
          <div className="mb-7 text-center">
            <h1 className="text-3xl font-bold text-white">Welcome back</h1>

            <p className="mt-2 text-sm text-white">
              Log in to continue using Lynk.
            </p>
          </div>

          {/* Login Form */}
          <form className="space-y-4" onSubmit={handleLogin}>
            {/* Username / Email */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-white">
                Email or username
              </label>

              <input
                name="usernameOrEmail"
                type="text"
                placeholder="Enter your email or username"
                required
                className="lynk-input"
              />
            </div>

            {/* Password */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-white">
                Password
              </label>

              <input
                name="password"
                type="password"
                placeholder="Enter your password"
                required
                className="lynk-input"
              />
            </div>

            {/* Login Button */}
            <div className="flex justify-center">
              <button type="submit" className="lynk-button ">
                <LetterCascade text="Login" className="font-bold"/>
              </button>
            </div>
          </form>

          {/* Signup */}
          <p className="mt-6 text-center text-sm text-white">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/SignUp")}
              className="font-semibold text-white hover:underline"
            >
              Create account
            </button>
          </p>

          {/* Forgot Password — functionality later */}
          <div className="mt-3 text-center">
            <button
              onClick={() => setShowForgot(true)}
              className="text-sm text-white hover:underline"
            >
              Forgot your password?
            </button>
          </div>
        </div>
      </div>

      {showForgot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="Card relative z-10 w-96 max-w-md rounded-3xl backdrop-blur-xl p-8 shadow-2xl">
            <div className="text-center">
              <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Reset your password
              </h2>

              <p className="mt-2 text-sm text-white">
                Enter your email and we'll send you a reset link.
              </p>
            </div>

            <form onSubmit={handleForgotPassword} className="mt-5 space-y-4">
              <input
                type="email"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="lynk-input"
              />

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="lynk-button"
                >
                  Send Reset Link
                </button>
              </div>
            </form>

            {forgotMessage && (
              <p className="mt-4 text-center text-sm text-white">
                {forgotMessage}
              </p>
            )}

            <div className="mt-3 text-center">
              <button
                type="button"
                onClick={() => {
                  setShowForgot(false);
                  setForgotMessage("");
                }}
                className="text-sm text-white hover:underline"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginPage;
