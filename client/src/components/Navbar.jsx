import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <div>
      <header className="fixed inset-x-0 top-0 z-30 mx-auto w-full max-w-screen-md border border-gray-100 bg-white/80 py-3 shadow backdrop-blur-lg md:top-6 md:rounded-3xl lg:max-w-screen-lg">
        <div className="px-4">
          <div className="flex items-center justify-between">
            <div className="flex shrink-0">
              <a aria-current="page" className="flex items-center" href="/">
                <img
                  className="h-7 w-auto"
                  src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
                  alt=""
                />
                {/* <p className="sr-only">Website Title</p> */}
              </a>
            </div>
            <div>
              <h1 className="font-semibold">World News</h1>
            </div>
            <div className="flex items-center justify-end gap-3">
              {isLoggedIn ? (
                <button
                  className="inline-flex items-center justify-center rounded-xl bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              ) : (
                <>
                  <a
                    className="hidden items-center justify-center rounded-xl bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 transition-all duration-150 hover:bg-gray-50 sm:inline-flex"
                    href="/login"
                  >
                    Sign in
                  </a>
                  <a
                    className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    href="/register"
                  >
                    Sign up
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
