import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import BackButton from "./components/BackButton";

// Public Pages
import Beranda from "./pages/public/Beranda";
import Profil from "./pages/public/Profil";
import VisiMisi from "./pages/public/VisiMisi";
import Produk from "./pages/public/Produk";
import Cabang from "./pages/public/Cabang";
import Kontak from "./pages/public/Kontak";

// Private pages
import Dashboard from "./pages/private/Dashboard";
import PengajuanKredit from "./pages/private/PengajuanKredit";
import Pengaduan from "./pages/private/Pengaduan";
import StatusLayanan from "./pages/private/StatusLayanan";
import Transfer from "./Transfer";
import Rekening from "./Rekening";

// Login
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        {/* ===== PUBLIC ROUTES ===== */}
        <Route path="/" element={<Beranda />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/visi-misi" element={<VisiMisi />} />
        <Route path="/produk" element={<Produk />} />
        <Route path="/cabang" element={<Cabang />} />
        <Route path="/kontak" element={<Kontak />} />
        <Route path="/login" element={<Login />} />

        {/* ===== PRIVATE ROUTES ===== */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/pengajuan-kredit"
          element={
            <PrivateRoute>
              <PengajuanKredit />
            </PrivateRoute>
          }
        />
        <Route
          path="/pengaduan"
          element={
            <PrivateRoute>
              <Pengaduan />
            </PrivateRoute>
          }
        />
        <Route
          path="/status-layanan"
          element={
            <PrivateRoute>
              <StatusLayanan />
            </PrivateRoute>
          }
        />
        <Route
          path="/transfer"
          element={
            <PrivateRoute>
              <Transfer />
            </PrivateRoute>
          }
        />
        <Route
          path="/rekening"
          element={
            <PrivateRoute>
              <Rekening />
            </PrivateRoute>
          }
        />
      </Routes>

      <BackButton />
      <Footer />
    </Router>
  );
}

export default App;
