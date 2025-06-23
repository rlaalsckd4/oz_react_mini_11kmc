import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { useEffect, useState } from "react";
import { supabase } from "../hooks/supabase";

export default function NavBar({ onSearch }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("로그아웃 실패:", error.message);
      return;
    }
    console.log("로그아웃 됨");
    setIsLoggedIn(false);
    setDropdownOpen(false);
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsLoggedIn(!!session);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setIsLoggedIn(!!session);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <nav className="bg-gray-600 text-white px-5 py-4 shadow-md flex items-center justify-between flex-wrap gap-2">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-xl font-bold whitespace-nowrap">
            MovieApp
          </Link>
          <SearchBar onSearch={onSearch} />
        </div>

        <div className="flex items-center gap-4">
          {!isLoggedIn ? (
            <>
              <Link to="/login">로그인</Link>
              <Link to="/signup">회원 가입</Link>
            </>
          ) : (
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center"
              >
                👤
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-gray-900 text-white rounded shadow-lg z-10">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-700"
                  >
                    로그아웃
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
