import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://lynk-api.bonto.run/api/auth/logout",
        {},
        {
          withCredentials: true,
        },
      );

      console.log(res.data);
      navigate("/");
    } catch (error) {
      console.log(
        "Logout error:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8ff] text-[#131b2e]">

      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="h-16 px-4 flex items-center justify-between gap-2">

          {/* Logo + Dashboard */}
          <div className="flex items-center gap-2 min-w-0">

            <div className="h-9 w-9 rounded-lg bg-[#4648d4] flex items-center justify-center text-white font-bold text-lg">
              L
            </div>

            <span className="text-lg font-semibold truncate">
              Dashboard
            </span>

          </div>

          {/* Notification + Profile */}
          <div className="flex items-center gap-1">

            <button
              type="button"
              aria-label="Notifications"
              className="w-11 h-11 flex items-center justify-center rounded-full text-[#464554] hover:text-[#131b2e] hover:bg-[#eaedff] transition-colors"
            >
              <span className="text-xl">🔔</span>
            </button>

            <div className="w-11 h-11 flex items-center justify-center rounded-full">
              <div className="w-8 h-8 rounded-full bg-[#e1e0ff] text-[#4648d4] flex items-center justify-center font-semibold">
                U
              </div>
            </div>

          </div>
        </div>
      </header>


      {/* Main */}
      <main className="min-h-screen pt-20 pb-24 px-4">

        <div className="max-w-3xl mx-auto space-y-4">

          {/* Greeting */}
          <div className="flex flex-col items-start gap-1 pt-1">

            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#eaedff] text-[#4648d4] text-xs font-semibold">
              Lynk Workspace
            </span>

            <h1 className="text-2xl font-semibold mt-1">
              Good morning 👋
            </h1>

            <p className="text-base text-[#464554]">
              You are signed into your workspace.
            </p>

          </div>


          {/* Profile / Session Card */}
          <div className="flex flex-col p-5 rounded-xl bg-white shadow-sm">

            <div className="flex items-center gap-3">

              {/* Avatar */}
              <div className="relative flex-shrink-0">

                <div className="w-12 h-12 rounded-full bg-[#e1e0ff] text-[#4648d4] flex items-center justify-center text-lg font-semibold">
                  U
                </div>

                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-[#6ffbbe] ring-2 ring-white" />

              </div>


              {/* User information */}
              <div className="flex flex-col min-w-0 flex-1">

                <span className="text-lg font-semibold truncate">
                  Welcome User
                </span>

                <span className="text-sm text-[#464554] truncate">
                  Your account
                </span>

                <span className="text-xs text-[#4648d4] font-semibold mt-0.5">
                  Active Session
                </span>

              </div>

            </div>


            {/* Logout */}
            <div className="pt-5">

              <form onSubmit={handleLogout}>

                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl bg-[#ffdad6]/70 hover:bg-[#ffdad6] text-[#93000a] flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-sm font-semibold"
                >
                  <span className="text-lg">
                    ⎋
                  </span>

                  <span>
                    Sign Out of Account
                  </span>

                </button>

              </form>

            </div>

          </div>

        </div>

      </main>


      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 w-full z-50 bg-white/80 backdrop-blur-xl shadow-[0_-1px_8px_rgba(0,0,0,0.04)]">

        <div className="h-16 px-4 flex items-center justify-around">

          {/* Home */}
          <button
            type="button"
            className="flex flex-col items-center justify-center min-w-[56px] h-11 text-[#4648d4] font-semibold"
          >
            <span className="text-xl">
              ▦
            </span>

            <span className="text-xs mt-0.5">
              Home
            </span>
          </button>


          {/* Analytics */}
          <button
            type="button"
            className="flex flex-col items-center justify-center min-w-[56px] h-11 text-[#767586] hover:text-[#131b2e] transition-colors"
          >
            <span className="text-xl">
              ↗
            </span>

            <span className="text-xs mt-0.5">
              Analytics
            </span>
          </button>


          {/* Activity */}
          <button
            type="button"
            className="flex flex-col items-center justify-center min-w-[56px] h-11 text-[#767586] hover:text-[#131b2e] transition-colors"
          >
            <span className="text-xl">
              ◉
            </span>

            <span className="text-xs mt-0.5">
              Activity
            </span>
          </button>


          {/* Profile */}
          <button
            type="button"
            className="flex flex-col items-center justify-center min-w-[56px] h-11 text-[#767586] hover:text-[#131b2e] transition-colors"
          >
            <span className="text-xl">
              ●
            </span>

            <span className="text-xs mt-0.5">
              Profile
            </span>
          </button>

        </div>

      </nav>

    </div>
  );
};

export default Dashboard;
