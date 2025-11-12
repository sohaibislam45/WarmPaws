// src/components/layout/Navbar.jsx
import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import { FaUserAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import { AuthContext } from "../../contexts/AuthContext";
import iconimg from "../../assets/icon.png"

const Navbar = () => {
  const auth = useContext(AuthContext) || {};
  const user = auth.user ?? null;
  const logout = auth.logout ?? (() => Promise.resolve());

  const [menuOpen, setMenuOpen] = useState(false);
  const [imgSrc, setImgSrc] = useState(null);

  useEffect(() => {
    setImgSrc(user?.photoURL || null);
    console.log("Navbar user:", user);
  }, [user?.photoURL, user?.email, user?.displayName]);

  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = "/";
    } catch (err) {
      console.error("Logout error:", err);
      toast.error(err.message || "Logout failed");
    }
  };

  const onImgError = () => {
    // fallback to icon by clearing imgSrc
    setImgSrc(null);
  };

  const NavItem = ({ to, children }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
          isActive ? "bg-primary text-white" : "hover:bg-base-200"
        }`
      }
      onClick={() => setMenuOpen(false)}
    >
      {children}
    </NavLink>
  );

  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-40">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2">
              <img className="w-13" src={iconimg} alt="" />
              <div>
                <span className="block text-lg font-semibold">WarmPaws</span>
                <span className="block text-xs text-gray-500">
                  Pet Care in Winter
                </span>
              </div>
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-2">
            <NavItem to="/">Home</NavItem>
            <NavItem to="/services">Services</NavItem>
            <NavItem to="/profile">My Profile</NavItem>
          </nav>

          <div className="flex items-center gap-3">
            {!user ? (
              <div className="hidden md:flex items-center gap-2">
                <Link to="/login" className="btn btn-sm btn-ghost">
                  Login
                </Link>
                <Link to="/signup" className="btn btn-sm btn-primary">
                  Register
                </Link>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-3">
                <div className="relative group">
                  <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-primary bg-gray-100 flex items-center justify-center">
                    {imgSrc ? (
                      <img
                        src={imgSrc}
                        alt={user.displayName || user.email || "User avatar"}
                        className="object-cover w-full h-full"
                        onError={onImgError}
                        loading="lazy"
                      />
                    ) : (
                      <FaUserAlt className="text-gray-500 text-xl" />
                    )}
                  </div>
                  <div className="absolute right-0 mt-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap">
                    {user.displayName || user.email}
                  </div>
                </div>

                <button className="btn btn-sm btn-ghost" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}

            <button
              className="md:hidden btn btn-ghost"
              aria-label="Toggle menu"
              onClick={() => setMenuOpen((s) => !s)}
            >
              {menuOpen ? (
                <HiX className="w-6 h-6" />
              ) : (
                <HiMenu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden mt-2 pb-4 border-t">
            <div className="flex flex-col gap-1">
              <NavItem to="/">Home</NavItem>
              <NavItem to="/services">Services</NavItem>
              <NavItem to="/profile">My Profile</NavItem>

              {!user ? (
                <div className="flex gap-2 px-1 pt-2">
                  <Link
                    to="/login"
                    onClick={() => setMenuOpen(false)}
                    className="btn btn-block btn-sm btn-ghost"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setMenuOpen(false)}
                    className="btn btn-block btn-sm btn-primary"
                  >
                    Register
                  </Link>
                </div>
              ) : (
                <div className="px-1 pt-2 flex items-center gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-primary bg-gray-100 flex items-center justify-center">
                      {imgSrc ? (
                        <img
                          src={imgSrc}
                          alt={user.displayName || user.email || "User avatar"}
                          className="object-cover w-full h-full"
                          onError={onImgError}
                          loading="lazy"
                        />
                      ) : (
                        <FaUserAlt className="text-gray-500 text-xl" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium">
                        {user.displayName || "User"}
                      </div>
                      <div className="text-xs text-gray-500">{user.email}</div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      handleLogout();
                      setMenuOpen(false);
                    }}
                    className="ml-auto btn btn-sm btn-ghost"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
