import React from "react";
import {
  FaBuilding,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaClock,
  FaLandmark,
  FaUsers,
  FaChartLine,
  FaShieldAlt,
  FaHandshake,
  FaImage,
} from "react-icons/fa";
import "./PublicPages.css";
import ruangOperasionalImg from "./ruang-operasional.jpg";

const OFFICE_IMAGE_PATH = "/kantor-bank-sumut-kcp-panyabungan.jpg";

const highlights = [
  {
    icon: <FaLandmark />,
    title: "Bank Pembangunan Daerah",
    text: "Mendukung pertumbuhan ekonomi regional secara berkelanjutan.",
  },
  {
    icon: <FaUsers />,
    title: "Fokus Nasabah",
    text: "Pelayanan cepat, jelas, dan adaptif untuk kebutuhan masyarakat.",
  },
  {
    icon: <FaChartLine />,
    title: "Transformasi Digital",
    text: "Layanan transaksi dan monitoring berbasis portal digital.",
  },
];

const timeline = [
  {
    year: "1961",
    text: "Didirikan sebagai PT Bank Pembangunan Daerah Sumatera Utara dengan sebutan BPSU.",
  },
  {
    year: "Transformasi",
    text: "Mengembangkan layanan modern untuk memperkuat peran bank daerah.",
  },
  {
    year: "Saat Ini",
    text: "Bank Sumut KC Panyabungan menjadi mitra keuangan masyarakat Mandailing Natal.",
  },
];

const gallery = [
  {
    title: "Ruang Operasional",
    subtitle:
      "Mengelola kegiatan operasional bank seperti transaksi harian dan administrasi sistem.",
    theme: "theme-a",
    image: ruangOperasionalImg,
  },
  {
    title: "Ruang Kredit (Laka)",
    subtitle:
      "Menangani proses analisis kredit, persetujuan pinjaman, dan pengawasan pembiayaan.",
    theme: "theme-b",
  },
  {
    title: "Ruang Pemasaran",
    subtitle:
      "Bertanggung jawab mempromosikan produk perbankan dan mencari nasabah baru.",
    theme: "theme-c",
  },
  {
    title: "Customer Service",
    subtitle:
      "Melayani kebutuhan informasi, pembukaan rekening, dan penanganan keluhan nasabah.",
    theme: "theme-d",
  },
  {
    title: "Teller Area",
    subtitle:
      "Melayani transaksi setoran, penarikan, dan transfer dana nasabah secara langsung.",
    theme: "theme-e",
  },
  {
    title: "Ruang Administrasi",
    subtitle: "Mengelola dokumen, arsip, dan administrasi internal kantor cabang.",
    theme: "theme-f",
  },
];

function Profil() {
  return (
    <div className="public-page">
      <section className="public-hero">
        <div className="public-container">
          <h1>Profil Bank Sumut KC Panyabungan</h1>
          <p>
            Bank Sumut hadir sebagai mitra layanan keuangan terpercaya untuk
            masyarakat, pelaku usaha, dan pembangunan ekonomi daerah.
          </p>
        </div>
      </section>

      <section className="public-section">
        <div className="public-container">
          <div className="public-grid">
            {highlights.map((item) => (
              <article className="public-card" key={item.title}>
                <h3 className="card-title-with-icon">
                  {item.icon} {item.title}
                </h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="public-section section-soft">
        <div className="public-container two-col">
          <article className="public-card">
            <h2>
              <FaBuilding /> Tentang Kami
            </h2>
            <p>
              PT Bank Pembangunan Daerah Sumatera Utara (Bank Sumut) didirikan
              pada 4 November 1961. Seiring perkembangan industri perbankan,
              Bank Sumut terus bertransformasi untuk menyediakan layanan yang
              profesional, aman, dan relevan dengan kebutuhan masyarakat.
            </p>
            <p>
              KC Panyabungan berkomitmen memperkuat kualitas layanan transaksi,
              pembiayaan, serta dukungan terhadap aktivitas ekonomi lokal di
              Kabupaten Mandailing Natal.
            </p>

            <div className="profile-values">
              <span>
                <FaHandshake /> Integritas dan Pelayanan
              </span>
              <span>
                <FaShieldAlt /> Keamanan dan Kepatuhan
              </span>
            </div>
          </article>

          <article className="public-card profile-info">
            <h2>Informasi Kantor</h2>
            <p>
              <FaMapMarkerAlt /> Jl. Willem Iskandar No.114, Sipolu Polu,
              Kec. Panyabungan, Kabupaten Mandailing Natal, Sumatera Utara
              22778
            </p>
            <p>
              <FaPhoneAlt /> Telepon: (0636) 20155
            </p>
            <p>
              <FaClock /> Operasional: Senin - Jumat, 08.00 - 17.00 WIB
            </p>
          </article>
        </div>
      </section>

      <section className="public-section">
        <div className="public-container">
          <div className="section-head">
            <h2>Perjalanan Singkat</h2>
            <p>Jejak perkembangan Bank Sumut hingga saat ini.</p>
          </div>

          <div className="timeline-list">
            {timeline.map((item) => (
              <article className="public-card timeline-item" key={item.year}>
                <strong>{item.year}</strong>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="public-section section-soft">
        <div className="public-container">
          <div className="section-head">
            <h2 className="card-title-with-icon">
              <FaImage /> Galeri Ruangan Kantor
            </h2>
            <p>
              Gambaran fungsi ruangan kerja di Bank Sumut KC Panyabungan.
            </p>
          </div>

          <div className="profile-gallery-grid">
            {gallery.map((item) => (
              <article className="profile-gallery-item public-card" key={item.title}>
                {item.image ? (
                  <img src={item.image} alt={item.title} className="gallery-photo" />
                ) : (
                  <div className={`gallery-visual ${item.theme}`} />
                )}
                <h3>{item.title}</h3>
                <p>{item.subtitle}</p>
              </article>
            ))}
          </div>

          <article className="public-card office-photo-card">
            <h3>Foto Kantor Bank Sumut KC Panyabungan</h3>
            <p>
              Area ini untuk menampilkan foto gedung kantor utama. Silakan
              ganti file gambar sesuai foto terbaru kantor.
            </p>
            <div className="office-photo-wrap">
              <img
                src={OFFICE_IMAGE_PATH}
                alt="Kantor Bank Sumut KC Panyabungan"
                className="office-photo"
              />
            </div>
            <small>
              Gunakan file: <code>public/kantor-bank-sumut-kcp-panyabungan.jpg</code>
            </small>
          </article>
        </div>
      </section>
    </div>
  );
}

export default Profil;
