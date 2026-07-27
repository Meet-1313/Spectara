import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Search } from 'lucide-react';
import {
  Menu,
  X, LogOut,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const navItems = [
    { name: "Home", path: "/home" },
    { name: "Trending", path: "/trending" },
    { name: "Popular", path: "/popular" },
    { name: "Profile", path: "/profile" },
  ]

const {setUser} = useAuth();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    navigate(`/search?q=${encodeURIComponent(search.trim())}`);
    setSearch("");
  }

  const handleLogout = () => {
    setMobileMenuOpen(false);
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    setUser(null);
    navigate("/",{replace:true});
  };
  return (
    <>
      <nav className="sticky left-0 right-0 z-50 border-b border-zinc-800 bg-zinc-950/90 backdrop-blur">
        <div className="mx-auto flex h-20  items-center justify-between px-5">

          {/* Mobile Navbar */}
          <div className="flex w-full items-center justify-between lg:hidden">
            <button onClick={() => setMobileMenuOpen(true)}>
              <Menu size={28} />
            </button>

            <Link
              to="/"
              className="text-2xl font-semibold"
            >
              🎬 Spectara
            </Link>
          </div>

          {/* Desktop Navbar */}
          <div className="hidden w-full items-center gap-8 lg:flex">

            <Link
              to="/"
              className="text-2xl font-semibold"
            >
              🎬 Spectara
            </Link>

            <div className="flex gap-4">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex h-10 w-28 items-center justify-center rounded-xl font-medium transition ${isActive
                      ? "bg-white text-black"
                      : "text-white hover:bg-white hover:text-black"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </div>

            <form
              onSubmit={handleSearch}
              className="ml-auto flex items-center gap-3"
            >
              {isSearchOpen && (
                <input
                  type="text"
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-64 border border-zinc-700 bg-zinc-900 px-4 py-2 text-white outline-none transition focus:border-white"
                  autoFocus
                />
              )}

              <button
                type={isSearchOpen ? "submit" : "button"}
                className="btn"
                onClick={() => {
                  if (!isSearchOpen) {
                    setIsSearchOpen(true);
                  }
                }}
              >
                <Search size={18} />
              </button>
            </form>
            <button
              onClick={handleLogout}
              className="ml-4 flex items-center gap-2 rounded-xl border border-red-600 px-4 py-2 font-medium text-red-500 transition hover:bg-red-600 hover:text-white"
            >
              {/* <LogOut size={18} /> */}
              Logout
            </button>

          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/60"
            onClick={() => setMobileMenuOpen(false)}
          />

          <div className="fixed left-0 top-0 z-50 h-screen w-72 border-r border-zinc-800 bg-zinc-950 p-6">

            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Menu</h2>

              <button onClick={() => setMobileMenuOpen(false)}>
                <X size={26} />
              </button>
            </div>

            <div className="flex flex-col gap-3">

              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `rounded-lg px-4 py-3 transition ${isActive
                      ? "bg-white text-black"
                      : "hover:bg-zinc-800"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}

              <form
                onSubmit={(e) => {
                  handleSearch(e);
                  setMobileMenuOpen(false);
                }}
                className="mt-6 flex flex-col gap-3"
              >
                <input
                  type="text"
                  placeholder="Search movies..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none"
                />

                <button
                  type="submit"
                  className="btn"
                >
                  Search
                </button>
              </form>
              <button
                onClick={handleLogout}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg border border-red-600 px-4 py-3 text-red-500 transition hover:bg-red-600 hover:text-white"
              >
                {/* <LogOut size={1} /> */}
                Logout
              </button>

            </div>

          </div>
        </>
      )}
    </>
  );
}

export default Navbar;