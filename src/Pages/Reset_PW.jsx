import BG from "../assets/SignBg.png";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
const ResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  
  const handleResetPassword = async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");
  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  try {
    const res = await axios.post(
      `http://localhost:3000/api/auth/reset-password/${token}`,
      { password }
    );

    if (res.status === 200) {
      alert("Password reset successfully");
      navigate("/Login");
    }
  } catch (error) {
    console.error(error);
    alert(error.response?.data?.message || "Something went wrong");
  }
};

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center px-4"
      style={{ backgroundImage: `url(${BG})` }}
    >
      <div className="absolute inset-0 bg-black/30" />

      <div className="relative z-10 w-full max-w-md rounded-3xl bg-white/95 backdrop-blur-md p-8 shadow-2xl">

        {/* Header */}
        <div className="mb-7 text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Reset your password
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Create a new password for your LYNK account.
          </p>
        </div>

        {/* Reset Form */}
        <form
          className="space-y-4"
          onSubmit={handleResetPassword}
        >

          {/* New Password */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              New password
            </label>

            <input
              name="password"
              type="password"
              placeholder="Enter your new password"
              required
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition focus:border-black focus:bg-white"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Confirm password
            </label>

            <input
              name="confirmPassword"
              type="password"
              placeholder="Confirm your new password"
              required
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition focus:border-black focus:bg-white"
            />
          </div>

          {/* Reset Button */}
          <button
            type="submit"
            className="w-full rounded-xl bg-black py-3.5 font-semibold text-white transition hover:bg-gray-800 active:scale-[0.98]"
          >
            Reset Password
          </button>
        </form>

        {/* Back to Login */}
        <div className="mt-6 text-center">
          <button
            onClick={() => navigate("/Login")}
            className="text-sm font-semibold text-gray-600 hover:text-black hover:underline"
          >
            Back to Login
          </button>
        </div>

      </div>
    </div>
  );
};

export default ResetPassword;
