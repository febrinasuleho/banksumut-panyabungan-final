import React from "react";
import { Link } from "react-router-dom";
import {
  FaPiggyBank,
  FaMoneyCheckAlt,
  FaBriefcase,
  FaCreditCard,
  FaCheckCircle,
  FaArrowRight,
} from "react-icons/fa";
import "./PublicPages.css";

const products = [
  {
    icon: <FaPiggyBank />,
    title: "Tabungan Sumut",
    points: [
      "Setoran awal ringan",
      "Akses transaksi melalui layanan digital",
      "Cocok untuk kebutuhan transaksi harian",
    ],
    target: "Nasabah perorangan",
  },
  {
    icon: <FaMoneyCheckAlt />,
    title: "Deposito Sumut",
    points: [
      "Pilihan tenor sesuai kebutuhan investasi",
      "Bunga kompetitif",
      "Perencanaan keuangan lebih terstruktur",
    ],
    target: "Nasabah investor",
  },
  {
    icon: <FaBriefcase />,
    title: "Kredit Produktif",
    points: [
      "Pembiayaan untuk pelaku usaha",
      "Proses pengajuan lebih terarah",
      "Monitoring status pengajuan secara online",
    ],
    target: "Pelaku usaha/UMKM",
  },
  {
    icon: <FaCreditCard />,
    title: "Layanan Rekening & Transfer",
    points: [
      "Informasi saldo dan mutasi lebih cepat",
      "Transfer antar rekening secara aman",
      "Bukti transaksi digital otomatis",
    ],
    target: "Seluruh nasabah aktif",
  },
];

const comparisonRows = [
  {
    product: "Tabungan Sumut",
    benefit: "Transaksi harian, menabung rutin",
    process: "Buka rekening di cabang / layanan nasabah",
    availability: "Tersedia di seluruh kantor layanan",
  },
  {
    product: "Deposito Sumut",
    benefit: "Investasi berjangka dengan tenor pilihan",
    process: "Pengajuan deposito di kantor layanan",
    availability: "Sesuai ketentuan nominal minimal deposito",
  },
  {
    product: "Kredit Produktif",
    benefit: "Pembiayaan modal usaha dan pengembangan bisnis",
    process: "Ajukan dokumen, verifikasi, analisis kelayakan",
    availability: "Mengikuti kebijakan kredit yang berlaku",
  },
  {
    product: "Rekening & Transfer",
    benefit: "Akses saldo, mutasi, dan transfer lebih cepat",
    process: "Aktivasi layanan dan login dashboard",
    availability: "24/7 untuk layanan digital",
  },
];

function Produk() {
  return (
    <div className="public-page">
      <section className="public-hero">
        <div className="public-container">
          <h1>Produk dan Layanan Bank Sumut</h1>
          <p>
            Pilihan produk untuk kebutuhan tabungan, investasi, pembiayaan,
            dan layanan transaksi digital nasabah.
          </p>
        </div>
      </section>

      <section className="public-section">
        <div className="public-container">
          <div className="section-head">
            <h2>Portofolio Produk Utama</h2>
            <p>Produk disusun untuk kebutuhan individu maupun pelaku usaha.</p>
          </div>

          <div className="public-grid">
            {products.map((product) => (
              <article key={product.title} className="public-card">
                <h3 className="card-title-with-icon">
                  {product.icon} {product.title}
                </h3>
                <p className="produk-target">Target: {product.target}</p>
                <ul className="public-list">
                  {product.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="public-section section-soft">
        <div className="public-container">
          <div className="section-head">
            <h2>Keunggulan Layanan</h2>
            <p>Nilai tambah utama yang dirasakan nasabah dalam setiap produk.</p>
          </div>

          <div className="produk-highlight-grid">
            <article className="public-card produk-highlight-card">
              <h3>
                <FaCheckCircle /> Proses Layanan Terarah
              </h3>
              <p>
                Setiap produk memiliki alur yang jelas sehingga nasabah dapat
                memahami tahapan layanan dengan mudah.
              </p>
            </article>
            <article className="public-card produk-highlight-card">
              <h3>
                <FaCheckCircle /> Dukungan Digital
              </h3>
              <p>
                Layanan dashboard membantu nasabah memantau status pengajuan,
                transaksi, dan informasi rekening secara cepat.
              </p>
            </article>
            <article className="public-card produk-highlight-card">
              <h3>
                <FaCheckCircle /> Pendampingan Nasabah
              </h3>
              <p>
                Tim layanan siap membantu kebutuhan informasi produk dan
                konsultasi perbankan sesuai profil nasabah.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="public-section">
        <div className="public-container">
          <div className="section-head">
            <h2>Perbandingan Ringkas Produk</h2>
            <p>Gambaran cepat manfaat dan proses tiap produk.</p>
          </div>

          <div className="table-wrap public-card">
            <table className="public-table">
              <thead>
                <tr>
                  <th>Produk</th>
                  <th>Manfaat Utama</th>
                  <th>Proses</th>
                  <th>Ketersediaan</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr key={row.product}>
                    <td>{row.product}</td>
                    <td>{row.benefit}</td>
                    <td>{row.process}</td>
                    <td>{row.availability}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="public-section section-soft">
        <div className="public-container produk-cta">
          <h2>Butuh Produk yang Sesuai Kebutuhan Anda?</h2>
          <p>
            Tim Bank Sumut KC Panyabungan siap membantu Anda memilih produk dan
            memulai proses layanan dengan cepat.
          </p>
          <div>
            <Link to="/kontak" className="btn-action btn-outline-action">
              Konsultasi Produk
            </Link>
            <Link to="/login" className="btn-action btn-primary-action">
              Masuk Dashboard <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Produk;
