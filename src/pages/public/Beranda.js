import React from "react";
import { Link } from "react-router-dom";
import {
  FaExchangeAlt,
  FaCreditCard,
  FaHeadset,
  FaPiggyBank,
  FaMoneyCheckAlt,
  FaBriefcase,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaArrowRight,
  FaClock,
  FaShieldAlt,
} from "react-icons/fa";
import "./Beranda.css";

const layananDigital = [
  {
    icon: <FaExchangeAlt />,
    title: "Transfer Antar Rekening",
    description: "Transaksi cepat dengan bukti transfer digital otomatis.",
    action: "/transfer",
    actionLabel: "Mulai Transfer",
  },
  {
    icon: <FaCreditCard />,
    title: "Pengajuan Kredit",
    description: "Ajukan kredit dan pantau progres layanan secara online.",
    action: "/pengajuan-kredit",
    actionLabel: "Ajukan Kredit",
  },
  {
    icon: <FaHeadset />,
    title: "Pengaduan Nasabah",
    description: "Sampaikan kendala layanan dan cek status tindak lanjutnya.",
    action: "/pengaduan",
    actionLabel: "Buat Pengaduan",
  },
];

const produkUnggulan = [
  {
    icon: <FaPiggyBank />,
    title: "Tabungan Sumut",
    text: "Produk tabungan untuk kebutuhan transaksi harian nasabah.",
  },
  {
    icon: <FaMoneyCheckAlt />,
    title: "Deposito Sumut",
    text: "Investasi berjangka dengan pilihan tenor fleksibel.",
  },
  {
    icon: <FaBriefcase />,
    title: "Kredit Produktif",
    text: "Dukungan pembiayaan untuk individu dan pelaku usaha.",
  },
];

function Beranda() {
  return (
    <div className="beranda-clean">
      <section className="beranda-hero">
        <div className="beranda-container hero-grid">
          <div className="hero-main">
            <p className="hero-tag">Portal Layanan Nasabah</p>
            <h1>Bank Sumut KC Panyabungan</h1>
            <p className="hero-desc">
              Layanan digital terpadu untuk transaksi, pengajuan pembiayaan,
              serta monitoring status layanan nasabah secara profesional.
            </p>

            <div className="hero-actions">
              <Link to="/login" className="btn btn-primary">
                Masuk Dashboard <FaArrowRight />
              </Link>
              <Link to="/produk" className="btn btn-outline">
                Lihat Produk
              </Link>
            </div>

            <div className="hero-highlights">
              <span>
                <FaClock /> Layanan Digital 24/7
              </span>
              <span>
                <FaShieldAlt /> Keamanan Data Nasabah
              </span>
            </div>
          </div>

          <aside className="hero-info-card">
            <h3>Alamat Kantor</h3>
            <p className="address-text">
              Jl. Willem Iskandar No.114, Sipolu Polu, Kec. Panyabungan, Kabupaten Mandailing Natal, Sumatera Utara 22778. Telepon: (0636) 20155
            </p>
            <p className="info-note">Jam operasional: Senin - Jumat, 08.00 - 17.00 WIB</p>
            <Link to="/kontak">Hubungi Layanan Nasabah</Link>
          </aside>
        </div>
      </section>

      <section className="beranda-section">
        <div className="beranda-container">
          <div className="section-head">
            <h2>Layanan Digital Utama</h2>
            <p>Fitur penting untuk kebutuhan layanan nasabah sehari-hari.</p>
          </div>

          <div className="card-grid layanan-grid">
            {layananDigital.map((item) => (
              <article key={item.title} className="beranda-card">
                <div className="card-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <Link to={item.action}>{item.actionLabel}</Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="beranda-section section-soft">
        <div className="beranda-container">
          <div className="section-head">
            <h2>Produk Unggulan Bank Sumut</h2>
            <p>Pilihan produk keuangan untuk individu dan usaha.</p>
          </div>

          <div className="card-grid produk-grid">
            {produkUnggulan.map((item) => (
              <article key={item.title} className="beranda-card">
                <div className="card-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <Link to="/produk">Pelajari Produk</Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="beranda-section">
        <div className="beranda-container kontak-box">
          <div>
            <h2>Informasi Kontak Resmi</h2>
            <p>
                PT. Bank Sumut KC Panyabungan, Jl. Willem Iskandar No.114, Sipolu Polu, Kec. Panyabungan, Kabupaten Mandailing Natal, Sumatera Utara 22778. Telepon: (0636) 20155.
            </p>
          </div>
          <div className="kontak-actions">
            <Link to="/cabang" className="btn btn-outline">
              <FaMapMarkerAlt /> Lihat Cabang
            </Link>
            <Link to="/kontak" className="btn btn-primary">
              <FaPhoneAlt /> Hubungi Kami
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Beranda;




