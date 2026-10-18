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
          className="relative z-10 flex w-full max-w-[452px] flex-col items-center rounded-[28px] bg-white/95 px-8 py-10 shadow-[0_28px_80px_rgba(10,16,8,0.24)] backdrop-blur-md sm:px-11 sm:py-12"
        >
          <div
            aria-label="Lynk"
            className="mb-9 text-[27px] font-bold tracking-[-0.055em] text-zinc-950"
          >
            Lynk<span className="text-lime-600">.</span>
          </div>

          <div className="w-full text-center">
            <h1
              className="text-[30px] font-semibold leading-[1.18] tracking-[-0.04em] text-zinc-950 sm:text-[34px]"
              id="logout-success-heading"
            >
              Signed out on this device
            </h1>
            <p className="mx-auto mt-4 max-w-[320px] text-[15px] leading-6 text-zinc-600">
              Your Lynk session on this browser has ended.
            </p>
          </div>

          <Link
            className="mt-8 flex min-h-14 w-full items-center justify-center rounded-xl bg-zinc-950 px-5 py-3.5 text-[15px] font-semibold text-white shadow-sm transition-colors hover:bg-zinc-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime-500"
            to="/Login"
          >
            Log in again
          </Link>
        </section>
      ) : (
        <>
          <header className="relative z-10 flex items-center px-6 pt-7 sm:px-10 sm:pt-9 lg:px-16 lg:pt-11"> 
            <Logo_content />
          </header>

          <section
            aria-labelledby="logout-heading"
            className="relative z-10 mt-auto w-full bg-white px-6 pb-8 pt-8 sm:px-10 sm:pb-10 sm:pt-9 lg:px-16 lg:pb-12 lg:pt-11"
          >
            <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-7 lg:flex-row lg:items-center lg:justify-between lg:gap-14">
              <div className="max-w-[620px]">
                <h1
                  className="text-[30px] font-semibold leading-[1.12] tracking-[-0.045em] text-zinc-950 sm:text-[36px] lg:text-[40px]"
                  id="logout-heading"
                >
                  Sign out on this device?
                </h1>
                <p className="mt-3 max-w-[500px] text-[15px] leading-6 text-zinc-600 sm:mt-4 sm:text-base">
                  Your Lynk session on this browser will end.
                </p>
              </div>

              <div className="flex w-full flex-col items-stretch gap-4 lg:w-[220px] lg:shrink-0">
                {errorMessage && (
                  <p
                    className="rounded-lg bg-red-50 px-3 py-2 text-sm leading-5 text-red-800"
                    role="alert"
                  >
                    {errorMessage}
                  </p>
                )}

                <button
                  aria-busy={isSigningOut}
                  className="inline-flex min-h-[54px] w-full items-center justify-center rounded-xl bg-zinc-950 px-7 text-[15px] font-semibold text-white shadow-sm transition-colors hover:bg-zinc-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-950 disabled:cursor-wait disabled:opacity-70"
                  disabled={isSigningOut}
                  onClick={handleSignOut}
                  type="button"
                >
                  {isSigningOut ? "Signing out…" : "Sign out"}
                </button>

                <button
                  className="self-center px-3 py-1 text-sm font-medium text-zinc-600 underline decoration-zinc-300 underline-offset-4 transition-colors hover:text-zinc-950 hover:decoration-zinc-700 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-500 disabled:cursor-wait disabled:opacity-60"
                  disabled={isSigningOut}
                  onClick={() => navigate(-1)}
                  type="button"
                >
                  Cancel and return
                </button>
              </div>
            </div>
          </section>
        </>
      )}
    </main>
  );
};

export default Logout;
