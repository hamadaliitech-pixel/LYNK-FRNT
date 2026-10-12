import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import BG from "../assets/SignBg.png";

const API_BASE_URL = import.meta.env.VITE_API_URL || "https://lynk.bonto.run";
const AUTH_API_URL = `${API_BASE_URL}/api/auth`;

const getAvatar = (seed = "User") => {
  return `https://api.dicebear.com/10.x/line-face/svg?seed=${encodeURIComponent(seed)}`;
};
const Feed = () => {
  // Lynk state variables
  const [Lynk, setLynk] = useState([]);
  const [user, setUser] = useState(null);
  const [profileImage, setProfileImage] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const [link, setLink] = useState("");
  const [title, setTitle] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${AUTH_API_URL}/getLynk`, {
        withCredentials: true,
      })
      .then((res) => {
        setLynk(Array.isArray(res?.data?.lynks) ? res.data.lynks : []);
        setUser(res?.data?.user ?? null);
        setProfileImage(res?.data?.user?.Profileimage ?? "");
      })
      .catch((err) => {
        console.error("Failed to get Feed data:", err);
        setLynk([]);
        setUser(null);
        setError(err.response?.data?.message || "Unable to load Feed.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleAddLynk = async (e) => {
    e.preventDefault();

    setError("");

    if (!title.trim() || !link.trim()) {
      setError("Please enter both a title and a link.");
      return;
    }

    setIsAdding(true);

    try {
      const res = await axios.post(
        `${AUTH_API_URL}/Lynks`,
        {
          title: title.trim(),
          link: link.trim(),
        },
        {
          withCredentials: true,
        },
      );

      const newLynk = res?.data?.lynk;

      if (!newLynk) {
        throw new Error("Invalid response from server.");
      }

      setLynk((prev) => [...prev, newLynk]);

      setTitle("");
      setLink("");
    } catch (err) {
      console.error("Lynk creation failed:", err);

      setError(
        err.response?.data?.message || err.message || "Unable to create Lynk.",
      );
    } finally {
      setIsAdding(false);
    }
  };

  const handleDeleteLynk = async (id) => {
    try {
      await axios.delete(`${AUTH_API_URL}/Lynks/${id}`, {
        withCredentials: true,
      });

      setLynk((prev) => prev.filter((lynk) => lynk._id !== id));
    } catch (err) {
      console.error("Lynk deletion failed:", err);

      setError(err.response?.data?.message || "Unable to delete Lynk.");
    }
  };

  const handleProfileUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const formData = new FormData();
    formData.append("Profileimage", file);

    setIsUploading(true);
    setError("");

    try {
      const res = await axios.post(
        `${AUTH_API_URL}/profile/image`,
        formData,
        {
          withCredentials: true,
        },
      );

      setProfileImage(res.data.Profileimage);

      setUser((prev) => ({
        ...prev,
        Profileimage: res.data.Profileimage,
      }));
    } catch (err) {
      console.error("Profile image upload failed:", err);

      setError(
        err.response?.data?.message || "Unable to upload profile image.",
      );
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#08130F]">
        <div className="h-9 w-9 animate-spin rounded-full border-2 border-[#D0EAB6]/20 border-t-[#D0EAB6]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen  text-white pt-3 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${BG})` }}>
      <header className="sticky top-0 z-20 flex items-center justify-between border-b border-[#D0EAB6]/17 bg-[#08130F]/50 rounded-full px-4 mx-4 py-4 backdrop-blur-xl sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            onClick={() => setShowProfile(true)}
            aria-label="Open profile picture settings"
            className="shrink-0 rounded-full ring-2 ring-[#D0EAB6]/17 transition hover:ring-[#D0EAB6]/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D0EAB6]"
          >
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                className="h-12 w-12 rounded-full object-cover"
              />
            ) : (
              <img
                src={getAvatar(user?.username)}
                alt="Default profile"
                className="h-12 w-12 rounded-full object-cover"
              />
            )}
          </button>

          <div className="min-w-0">
            <h1 className="truncate text-base font-semibold text-white sm:text-lg">
              Welcome, {user?.username ?? "User"}
            </h1>
            <p className="max-w-[52vw] truncate text-xs text-[#9BB0A4] sm:max-w-none sm:text-sm">
              {user?.email ?? "Not available"}
            </p>
          </div>
        </div>

        <Link
          className="inline-flex min-h-10 shrink-0 items-center justify-center border  px-4 text-sm font-semibold text-gray-500 transition hover:bg-lime-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D0EAB6]/60  rounded-full
      bg-[#41f641] "
          to="/Logout"
        >
          Log out
        </Link>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-10">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#D0EAB6]">
            Your space
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Your Lynks
          </h2>
          <p className="mt-2 text-sm text-[#9BB0A4]">
            Save and organize the links worth keeping.
          </p>
        </div>

        {error && (
          <p
            role="alert"
            className="mb-5 rounded-xl border border-red-300/20 bg-red-950/30 px-4 py-3 text-sm text-red-200"
          >
            {error}
          </p>
        )}

        <section className="mb-9 rounded-2xl border border-[#D0EAB6]/[0.17] bg-linear-to-b from-[#344B3F]/80 to-[#10261F]/90 p-5 shadow-[0_18px_50px_rgba(0,0,0,0.18)] sm:p-6">
          <h3 className="mb-1 text-xl font-semibold text-white">Add a Lynk</h3>
          <p className="mb-5 text-sm text-[#9BB0A4]">
            Add a title and the URL you want to save.
          </p>

          <form onSubmit={handleAddLynk} className="space-y-4">
            <div>
              <label
                htmlFor="lynk-title"
                className="mb-2 block text-sm font-medium text-white"
              >
                Title
              </label>
              <input
                id="lynk-title"
                type="text"
                placeholder="e.g. My favourite website"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-xl border border-[#D0EAB6]/[0.17] bg-[#173C2F] px-4 py-3 text-white placeholder:text-[#9BB0A4] outline-none transition focus:border-[#D0EAB6]/60 focus:ring-2 focus:ring-[#D0EAB6]/10"
              />
            </div>

            <div>
              <label
                htmlFor="lynk-url"
                className="mb-2 block text-sm font-medium text-white"
              >
                Link URL
              </label>
              <input
                id="lynk-url"
                type="url"
                placeholder="https://example.com"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                className="w-full rounded-xl border border-[#D0EAB6]/[0.17] bg-[#173C2F] px-4 py-3 text-white placeholder:text-[#9BB0A4] outline-none transition focus:border-[#D0EAB6]/60 focus:ring-2 focus:ring-[#D0EAB6]/10"
              />
            </div>

            <button
              type="submit"
              disabled={isAdding}
              className="inline-flex min-h-[50px] w-full items-center justify-center rounded-full bg-[#1A5642] px-6 font-semibold text-white transition hover:bg-[#22694F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D0EAB6]/60 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
            >
              {isAdding ? "Adding..." : "Add Lynk"}
            </button>
          </form>
        </section>

        <section>
          <div className="mb-4 flex items-center justify-between gap-3">
            <h3 className="text-xl font-semibold text-white">Saved links</h3>
            <span className="rounded-full border border-[#D0EAB6]/[0.17] bg-[#173C2F] px-3 py-1 text-xs font-medium text-[#D0EAB6]">
              {Lynk.length} {Lynk.length === 1 ? "Lynk" : "Lynks"}
            </span>
          </div>

          {Lynk.length > 0 ? (
            Lynk.map((lynk) => (
              <article
                key={lynk._id}
                className="mb-4 rounded-2xl border border-[#D0EAB6]/[0.17] bg-linear-to-b from-[#344B3F]/80 to-[#10261F]/90 p-5 transition hover:border-[#D0EAB6]/30 sm:p-6"
              >
                <h4 className="break-words text-lg font-semibold text-white">
                  {lynk.title ?? "Untitled Lynk"}
                </h4>

                {lynk.link ? (
                  <a
                    href={lynk.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block max-w-full break-all text-sm text-[#9BB0A4] underline decoration-[#D0EAB6]/30 underline-offset-4 transition hover:text-[#D0EAB6]"
                  >
                    {lynk.link}
                  </a>
                ) : (
                  <p className="mt-2 text-sm text-[#9BB0A4]">
                    No URL available
                  </p>
                )}

                <div className="mt-5 border-t border-[#D0EAB6]/[0.17] pt-4">
                  <button
                    type="button"
                    onClick={() => handleDeleteLynk(lynk._id)}
                    className="rounded-full border border-red-300/25 px-4 py-2 text-sm font-medium text-red-200 transition hover:bg-red-950/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-200/50"
                  >
                    Delete Lynk
                  </button>
                </div>
              </article>
            ))
          ) : (
            <div className="rounded-2xl border border-dashed border-[#D0EAB6]/[0.17] bg-[#10261F]/60 px-5 py-12 text-center">
              <p className="text-base font-medium text-white">No Lynks yet</p>
              <p className="mt-2 text-sm text-[#9BB0A4]">
                Add your first link using the form above.
              </p>
            </div>
          )}
        </section>
      </main>

      {showProfile && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 p-4 backdrop-blur-sm"
          onClick={() => !isUploading && setShowProfile(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="profile-dialog-title"
            className="relative w-full max-w-sm rounded-2xl border border-[#D0EAB6]/17 bg-linear-to-b from-[#344B3F]/80 to-[#10261F]/90 p-6 text-white shadow-2xl shadow-black/40"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => !isUploading && setShowProfile(false)}
              disabled={isUploading}
              aria-label="Close profile picture dialog"
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-2xl leading-none text-[#BCC9C0] transition hover:bg-[#173C2F] hover:text-white disabled:opacity-30"
            >
              ×
            </button>

            <h2
              id="profile-dialog-title"
              className="pr-8 text-xl font-semibold text-white"
            >
              Profile picture
            </h2>
            <p className="mt-1 text-sm text-[#9BB0A4]">
              Personalize how you appear on LYNK.
            </p>

            <div className="mt-6 flex justify-center">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="h-36 w-36 rounded-full border-2 border-[#D0EAB6]/30 object-cover shadow-lg"
                />
              ) : (
                <div className="flex h-36 w-36 items-center justify-center rounded-full border border-[#D0EAB6]/17 bg-[#173C2F] text-4xl text-[#BCC9C0]">
                  +
                </div>
              )}
            </div>

            <label
              className={`mt-6 block w-full cursor-pointer rounded-full bg-[#1A5642] py-3 text-center font-semibold text-white transition hover:bg-[#22694F] focus-within:ring-2 focus-within:ring-[#D0EAB6]/60 ${
                isUploading ? "cursor-not-allowed opacity-50" : ""
              }`}
            >
              {isUploading ? "Uploading..." : "Upload new picture"}
              <input
                type="file"
                accept="image/*"
                onChange={handleProfileUpload}
                disabled={isUploading}
                className="hidden"
              />
            </label>

            {isUploading && (
              <div className="mt-4 text-center">
                <div className="mx-auto h-6 w-6 animate-spin rounded-full border-2 border-[#D0EAB6]/20 border-t-[#D0EAB6]" />
                <p className="mt-2 text-sm text-[#9BB0A4]">
                  Uploading your profile picture...
                </p>
              </div>
            )}

            <button
              type="button"
              onClick={() => !isUploading && setShowProfile(false)}
              disabled={isUploading}
              className="mt-3 w-full rounded-full border border-[#D0EAB6]/[0.17] py-3 text-sm font-medium text-[#BCC9C0] transition hover:bg-[#173C2F] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Feed;
