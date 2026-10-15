import BG from "../assets/SignBg.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import Logo_content from "../Components/Logo_content";

const API_BASE_URL = (
  import.meta.env.VITE_API_URL ||
  (typeof window !== "undefined" && window.location.hostname === "localhost"
    ? "http://localhost:3000"
    : "https://lynk.bonto.run")
).replace(/\/+$/, "");
const AUTH_API_URL = `${API_BASE_URL}/api/auth`;

const SignUpPage = () => {
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotMessage, setForgotMessage] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSignup = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const data = {
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      const res = await axios.post(
        `${AUTH_API_URL}/SignUp`,
        data,
        {
          withCredentials: true,
        },
      );

      if (res.status === 201 || res.status === 200) {
        navigate("/Feed");
      }
    } catch (error) {
      setError(error.response?.data);
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
        className="min-h-screen text-white w-full bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center px-4"
        style={{ backgroundImage: `url(${BG})` }}
      >
        <Logo_content text={"Find your people"} />
        <span className="text-white">
          Your Social Media Links all in one place
        </span>

        <div className="Card mt-15 bg-linear-to-b from-[#344B3F]/80 to-[#10261F]/90 relative z-10 w-96 max-w-md rounded-3xl backdrop-blur-md p-8 shadow-2xl">
          <form
            className="space-y-4"
            autoComplete="off"
            onSubmit={handleSignup}
          >
            {/* Name */}
            <div>
              <label className="mb-1.5 block text-white text-sm font-medium">
                username
              </label>

              <input
                name="username"
                type="text"
                placeholder="Enter your name"
                className="lynk-input"
                autoComplete="off"
              />
            </div>
            {error?.field === "username" && (
              <p className="mt-1 text-sm text-red-500">{error.message}</p>
            )}

            {/* Email */}
            <div>
              <label className="mb-1.5 block text-white text-sm font-medium ">
                Email
              </label>

              <input
                name="email"
                type="email"
                placeholder="Enter your email"
                className="lynk-input"
                autoComplete="off"
              />
              {error?.field === "email" && (
                <p className="mt-1 text-sm text-red-500">{error.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-white">
                Password
              </label>

              <input
                name="password"
                type="password"
                placeholder="Create a password"
                className="lynk-input"
                autoComplete="off"
              />
            </div>
            <div className="flex justify-center ">
              <button type="submit" className=" lynk-button">
                Create Account
              </button>
            </div>
          </form>

          <p className="mt-6 text-center  text-sm text-white">
            Already have an account?{" "}
            <Link
              to="/Login"
              className="font-semibold text-white hover:underline"
            >
              Log in
            </Link>
          </p>

          <div className="mt-3 text-center">
            <button
              onClick={() => setShowForgot(true)}
              className="text-sm text-white hover:text-black hover:underline"
            >
              Forgot your password?
            </button>
          </div>
        </div>
      </div>

      {showForgot && (
        <div className="fixed bg-linear-to-b from-[#344B3F]/80 to-[#10261F]/90 inset-0 z-50 flex items-center justify-center px-4">
          <div className="w-full max-w-md bg-linear-to-b from-[#344B3F]/80 to-[#10261F]/90 rounded-2xl  p-6 shadow-2xl">
            <h2 className="text-2xl font-bold text-white">
              Reset your password
            </h2>

            <p className="mt-2 text-sm text-white">
              Enter your email and we'll send you a reset link.
            </p>

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
                <button type="submit" className="lynk-button">
                  Send Reset Link
                </button>
              </div>
            </form>

            {forgotMessage && (
              <p className="mt-4 text-center text-sm text-gray-600">
                {forgotMessage}
              </p>
            )}

            <button
              onClick={() => {
                setShowForgot(false);
                setForgotMessage("");
              }}
              className="mt-4 w-full text-sm text-gray-500 hover:text-black"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SignUpPage;
