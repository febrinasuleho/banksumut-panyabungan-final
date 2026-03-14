import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(localStorage.getItem("isLogin") === "true");

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const syncLogin = () => {
      setIsLogin(localStorage.getItem("isLogin") === "true");
    };

    window.addEventListener("storage", syncLogin);
    syncLogin();

    return () => {
      window.removeEventListener("storage", syncLogin);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLogin");
    setIsLogin(false);
    navigate("/login", { replace: true });
  };

  const handleBrandKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      navigate("/");
    }
  };

  return (
    <header className="navbar-wrap">
      <div className="navbar-inner">
        <div
          className="brand-block"
          onClick={() => navigate("/")}
          onKeyDown={handleBrandKeyDown}
          role="button"
          tabIndex={0}
        >
          <img src="/logo-bank-sumut.svg" alt="Logo Bank Sumut" className="brand-logo" />
          <div className="brand-text">
            <h2 className="logo">Bank Sumut</h2>
            <p className="logo-sub">KC Panyabungan | Sistem Layanan Nasabah</p>
          </div>
        </div>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-expanded={menuOpen}
          aria-label="Buka navigasi"
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`menu ${menuOpen ? "open" : ""}`} aria-label="Navigasi utama">
          <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>Beranda</NavLink>
          <NavLink to="/profil" className={({ isActive }) => (isActive ? "active" : "")}>Profil</NavLink>
          <NavLink to="/visi-misi" className={({ isActive }) => (isActive ? "active" : "")}>Visi & Misi</NavLink>
          <NavLink to="/produk" className={({ isActive }) => (isActive ? "active" : "")}>Produk</NavLink>
          {!isLogin && (
            <NavLink to="/login" className={({ isActive }) => (isActive ? "active menu-cta" : "menu-cta")}>
              Login
            </NavLink>
          )}
          {isLogin && (
            <>
              <NavLink to="/dashboard" className={({ isActive }) => (isActive ? "active" : "")}>Dashboard</NavLink>
              <button className="logout-link" onClick={handleLogout}>
                Keluar
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
