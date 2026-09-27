import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
const Signup = () => {
  const navigate = useNavigate();
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const Register = async (e) => {
    e.preventDefault();

    const payload = {
      username: e.target.username.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };

    try {
      await axios.post(
        "https://lynk-api.bonto.run/api/auth/register",
        payload,
        {
          withCredentials: true,
        },
      );

      navigate("/dashboard");
    } catch (error) {
      console.error("Register error:", error.response?.data || error.message);
    }
  };

  const Login = async (e) => {
    e.preventDefault();

    const data = {
      Username_or_email: e.target.Username_or_email.value,
      password: e.target.password.value,
    };

    try {
      const res = await axios.post(
        "https://lynk-api.bonto.run/api/auth/Login",
        data,
        {
          withCredentials: true,
        },
      );

      console.log("User Login Successfully", res.data.user);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8ff] text-[#131b2e] px-4 py-8 md:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="relative overflow-hidden rounded-3xl mb-6">
          <div className="absolute -top-16 -right-12 w-48 h-48 rounded-full bg-[#e1e0ff] blur-3xl opacity-60 pointer-events-none" />

          <div className="absolute top-10 -left-12 w-40 h-40 rounded-full bg-[#dae2fd] blur-2xl opacity-70 pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center text-center pt-6 pb-4">
            {/* Logo */}
            <div className="relative mb-4">
              <div className="w-16 h-16 rounded-xl bg-white shadow-md flex items-center justify-center p-2.5">
                <div className="w-full h-full rounded-lg bg-[#4648d4] flex items-center justify-center text-white text-2xl font-bold">
                  L
                </div>
              </div>

              <span className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#006c49] opacity-75" />
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#006c49]" />
              </span>
            </div>

            {/* Badge */}
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#eaedff] text-[#4648d4] text-xs font-semibold mb-2">
              <span>⚡</span>
              <span>Pulse Platform</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-2">
              Welcome back
            </h1>

            <p className="text-sm text-[#464554] max-w-75">
              Sign in or create an account to access your dashboard
            </p>
          </div>
        </div>

        {/* Forms */}
        <div className="grid md:grid-cols-2 gap-5">
          {/* REGISTER */}
          <form
            onSubmit={Register}
            className="bg-white rounded-xl shadow-sm p-5 md:p-6"
          >
            <div className="mb-5">
              <h2 className="text-xl font-semibold mb-1">Create account</h2>

              <p className="text-sm text-[#464554]">Register a new account</p>
            </div>

            <div className="flex flex-col gap-4">
              {/* Username */}
              <div className="relative">
                <input
                  autoComplete="off"
                  type="text"
                  name="username"
                  required
                  placeholder=" "
                  className="peer w-full h-12 bg-[#f2f3ff] text-[#131b2e] pl-4 pr-4 pt-3.5 pb-1 rounded-lg focus:outline-none focus:bg-white focus:shadow-sm transition-all"
                />

                <label className="absolute left-4 top-3.5 text-[#767586] text-sm pointer-events-none transition-all duration-200 peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-[#4648d4] ">
                  Username
                </label>
              </div>

              {/* Email */}
              <div className="relative">
                <input
                  autoComplete="off"
                  type="email"
                  name="email"
                  required
                  placeholder=" "
                  className="peer w-full h-12 bg-[#f2f3ff] text-[#131b2e] pl-4 pr-4 pt-3.5 pb-1 rounded-lg focus:outline-none focus:bg-white focus:shadow-sm transition-all"
                />

                <label className="absolute left-4 top-3.5 text-[#767586] text-sm pointer-events-none transition-all duration-200 peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-[#4648d4] ">
                  Email
                </label>
              </div>

              {/* Register Password */}
              <div className="relative">
                <input
                  autoComplete="new-password"
                  type={showRegisterPassword ? "text" : "password"}
                  name="password"
                  required
                  placeholder=" "
                  className="peer w-full h-12 bg-[#f2f3ff] text-[#131b2e] pl-4 pr-12 pt-3.5 pb-1 rounded-lg focus:outline-none focus:bg-white focus:shadow-sm transition-all"
                />

                <label className="absolute left-4 top-3.5 text-[#767586] text-sm pointer-events-none transition-all duration-200 peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-[#4648d4] ">
                  Password
                </label>

                <button
                  type="button"
                  onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                  className="absolute right-3 top-3 text-[#767586] hover:text-[#131b2e]"
                >
                  {showRegisterPassword ? "◉" : "◌"}
                </button>
              </div>

              {/* Register Button */}
              <button
                type="submit"
                className="w-full h-12 rounded-lg bg-[#4648d4] hover:bg-[#6063ee] text-white font-semibold flex items-center justify-center gap-2 shadow-md active:scale-[0.98] transition-all duration-150 mt-1"
              >
                Create Account
                <span>→</span>
              </button>
            </div>
          </form>

          {/* LOGIN */}
          <form
            onSubmit={Login}
            className="bg-white rounded-xl shadow-sm p-5 md:p-6"
          >
            <div className="mb-5">
              <h2 className="text-xl font-semibold mb-1">Welcome back</h2>

              <p className="text-sm text-[#464554]">Sign in to your account</p>
            </div>

            <div className="flex flex-col gap-4">
              {/* Username / Email */}
              <div className="relative">
                <input
                  type="text"
                  name="Username_or_email"
                  required
                  autoComplete="off"
                  placeholder=" "
                  className="peer w-full h-12 bg-[#f2f3ff] text-[#131b2e] pl-4 pr-4 pt-3.5 pb-1 rounded-lg focus:outline-none focus:bg-white focus:shadow-sm transition-all"
                />

                <label className="absolute left-4 top-3.5 text-[#767586] text-sm pointer-events-none transition-all duration-200 peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-[#4648d4]">
                  Username or Email
                </label>
              </div>

              {/* Login Password */}
              <div className="relative">
                <input
                  type={showLoginPassword ? "text" : "password"}
                  name="password"
                  autoComplete="new-password"
                  required
                  placeholder=" "
                  className="peer w-full h-12 bg-[#f2f3ff] text-[#131b2e] pl-4 pr-12 pt-3.5 pb-1 rounded-lg focus:outline-none focus:bg-white focus:shadow-sm transition-all"
                />

                <label className="absolute left-4 top-3.5 text-[#767586] text-sm pointer-events-none transition-all duration-200 peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-[#4648d4] ">
                  Password
                </label>

                <button
                  type="button"
                  onClick={() => setShowLoginPassword(!showLoginPassword)}
                  className="absolute right-3 top-3 text-[#767586] hover:text-[#131b2e]"
                >
                  {showLoginPassword ? "◉" : "◌"}
                </button>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full h-12 rounded-lg bg-[#4648d4] hover:bg-[#6063ee] text-white font-semibold flex items-center justify-center gap-2 shadow-md active:scale-[0.98] transition-all duration-150 mt-1"
              >
                Sign In
                <span>→</span>
              </button>
              <button
                className="w-full h-12 rounded-lg bg-[#4648d4] hover:bg-[#6063ee] text-white font-semibold flex items-center justify-center gap-2 shadow-md active:scale-[0.98] transition-all duration-150 mt-1"
                type="button"
                onClick={() => setShowForgot(true)}
              >
                Forgot Password?
                <span>→</span>
              </button>
            </div>
          </form>
        </div>
        {showForgot && (
          <div>
            <div>
              <h2>Forgot Password?</h2>

              <p>Enter your email and we'll send you a reset link.</p>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <button
                onClick={async () => {
                  try {
                    const res = await axios.post(
                      "https://lynk-api.bonto.run/api/auth/forgot-password",
                      { email },
                    );

                    setMessage(res.data.message);
                  } catch (error) {
                    setMessage(
                      error.response?.data?.message || "Something went wrong",
                    );
                  }
                }}
              >
                Send Reset Link
              </button>

              <button onClick={() => setShowForgot(false)}>Cancel</button>

              {message && <p>{message}</p>}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex flex-col items-center text-center mt-6 gap-2">
          <p className="text-sm text-[#464554]">
            Secure authentication for your account
          </p>

          <div className="flex items-center justify-center gap-2 text-xs text-[#767586]">
            <span>Pulse Platform</span>
            <span>•</span>
            <span>Secure Login</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
