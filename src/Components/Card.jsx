import React from 'react'
import { Link } from "react-router-dom";

const Card = () => {
  return (
    <>
    <div
        className="min-h-screen text-white w-full bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center px-4"
      >
        <span className="text-white">
          Your Social Media Links all in one place
        </span>

        <div className="Card mt-15 bg-linear-to-b from-[#344B3F]/80 to-[#10261F]/90 relative z-10 w-96 max-w-md rounded-3xl backdrop-blur-md p-8 shadow-2xl">
          <form
            className="space-y-4"
            autoComplete="off"
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
              className="text-sm text-white hover:text-black hover:underline"
            >
              Forgot your password?
            </button>
          </div>
        </div>
      </div>
    
    </>
  )
}

export default Card