import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BG from "../assets/SignBg.png";
import { logout } from "../api/Auth";
import Logo_content from "../Components/Logo_content.jsx"

const Logout = () => {
  const navigate = useNavigate();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [isSignedOut, setIsSignedOut] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignOut = async () => {
    if (isSigningOut) return;

    setIsSigningOut(true);
    setErrorMessage("");

    try {
      await logout();

      localStorage.clear();
      sessionStorage.clear();

      setIsSignedOut(true);
    } catch (error) {
      console.error("Logout failed:", error);

      setErrorMessage("We couldn't sign you out. Please try again.");
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <main
      className={`relative flex min-h-dvh w-full overflow-hidden bg-zinc-900 bg-cover bg-center bg-no-repeat font-sans text-zinc-950 ${isSignedOut ? "items-center justify-center px-5 py-12" : "flex-col"
        }`}
      style={{ backgroundImage: `url(${BG})` }}
    >
      <div
        aria-hidden="true"
        className={`absolute inset-0 ${isSignedOut ? "bg-black/20" : "bg-zinc-950/10"}`}
      />

      {isSignedOut ? (
        <section
          aria-labelledby="logout-success-heading"
          className="Card relative z-10 flex w-96 max-w-md flex-col items-center rounded-3xl backdrop-blur-xl p-8 shadow-2xl"
        >
          <div
            aria-label="Lynk"
            className="mb-9 text-[27px] font-bold tracking-[-0.055em] text-white"
          >
            Lynk<span className="text-lime-500">.</span>
          </div>

          <div className="w-full text-center">
            <h1
              className="text-2xl font-bold tracking-tight text-white sm:text-3xl"
              id="logout-success-heading"
            >
              Signed out on this device
            </h1>
            <p className="mt-2 text-sm text-white">
              Your Lynk session on this browser has ended.
            </p>
          </div>

          <div className="flex justify-center">
            <Link
              className="lynk-button"
              to="/Login"
            >
              Log in again
            </Link>
          </div>
        </section>
      ) : (
        <>
          {/* this is logout upper section */}
          <div className="flex flex-col justify-between h-screen px-6 py-7">

            <header className="relative z-10 flex items-center sm:px-10 sm:pt-9 lg:px-16 lg:pt-11">
              <Logo_content />
            </header>

            {/* this is logout lower section */}
            <section
              aria-labelledby="logout-heading"
              className=" flex flex-col items-center justify-end px-4 "
            >
              <div className="Card w-96 max-w-md rounded-3xl backdrop-blur-xl p-8 shadow-2xl">
                <div className="text-center">
                  <h1
                    className="text-2xl font-bold tracking-tight text-white sm:text-3xl"
                    id="logout-heading"
                  >
                    Sign out on this device?
                  </h1>
                  <p className="mt-2 text-sm text-white">
                    Your Lynk session on this browser will end.
                  </p>
                </div>

                {errorMessage && (
                  <p
                    className="mt-3 text-center text-sm text-red-400"
                    role="alert"
                  >
                    {errorMessage}
                  </p>
                )}

                <div className="flex justify-center">
                  <button
                    aria-busy={isSigningOut}
                    className="lynk-button disabled:cursor-wait disabled:opacity-70"
                    disabled={isSigningOut}
                    onClick={handleSignOut}
                    type="button"
                  >
                    {isSigningOut ? "Signing out…" : "Sign out"}
                  </button>
                </div>

                <div className="mt-3 text-center">
                  <button
                    className="text-sm text-white hover:underline disabled:cursor-wait disabled:opacity-60"
                    disabled={isSigningOut}
                    onClick={() => navigate(-1)}
                    type="button"
                  >
                    Cancel and return
                  </button>
                </div>
              </div>
            </section>
          </div>
        </>
      )}
    </main>
  );
};

export default Logout;
