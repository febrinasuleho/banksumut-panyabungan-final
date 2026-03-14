import React from "react";
import {
  FaBullseye,
  FaFlagCheckered,
  FaHandshake,
  FaUsers,
  FaShieldAlt,
  FaLightbulb,
  FaUniversity,
  FaChartLine,
} from "react-icons/fa";
import "./PublicPages.css";

const values = [
  {
    icon: <FaHandshake />,
    title: "Integritas",
    text: "Menjalankan layanan secara jujur, transparan, dan bertanggung jawab.",
  },
  {
    icon: <FaUsers />,
    title: "Orientasi Nasabah",
    text: "Mengutamakan kepuasan nasabah melalui pelayanan responsif dan tepat.",
  },
  {
    icon: <FaShieldAlt />,
    title: "Keamanan",
    text: "Menjaga keamanan transaksi dan kerahasiaan data secara konsisten.",
  },
  {
    icon: <FaLightbulb />,
    title: "Inovasi",
    text: "Mengembangkan solusi layanan digital yang relevan dan adaptif.",
  },
];

const missionPillars = [
  {
    icon: <FaUniversity />,
    title: "Layanan Perbankan Berkualitas",
    desc: "Memberikan layanan keuangan yang profesional, cepat, dan mudah diakses.",
  },
  {
    icon: <FaChartLine />,
    title: "Penguatan Ekonomi Daerah",
    desc: "Mendukung pertumbuhan ekonomi lokal melalui pembiayaan produktif dan inklusif.",
  },
  {
    icon: <FaUsers />,
    title: "Pengembangan SDM dan Tata Kelola",
    desc: "Membangun budaya kerja unggul dengan tata kelola perusahaan yang sehat.",
  },
];

const strategicTargets = [
  "Meningkatkan kualitas pengalaman nasabah di seluruh titik layanan.",
  "Memperluas adopsi layanan digital secara bertahap dan aman.",
  "Mendorong kolaborasi dengan pelaku usaha untuk pertumbuhan ekonomi daerah.",
  "Memperkuat manajemen risiko dan kepatuhan dalam setiap proses layanan.",
];

function VisiMisi() {
  return (
    <div className="public-page">
      <section className="public-hero">
        <div className="public-container">
          <h1>Visi dan Misi Bank Sumut</h1>
          <p>
            Komitmen strategis dalam membangun layanan keuangan daerah yang
            kuat, modern, dan berorientasi pada nilai bagi masyarakat.
          </p>
        </div>
      </section>

      <section className="public-section section-soft">
        <div className="public-container two-col">
          <article className="public-card">
            <h2 className="card-title-with-icon">
              <FaBullseye /> Visi
            </h2>
            <p>
            Menjadi Bank pilihan Utama yang Solid dan Unggul sebagai Mitra Usaha dan Pembangunan.
            </p>
          </article>

          <article className="public-card">
            <h2 className="card-title-with-icon">
              <FaFlagCheckered /> Misi
            </h2>
            <ul className="public-list">
              <li>Mengelola keuangan pemerintah dan masyarakat secara professional berdasarkan prinsip kehati-hatian.</li>
              <li>Memberikan layanan keuangan terbaik untuk mendukung kemaslahatan usaha dan pembangunan daerah.</li>
              <li>Mendukung program keuangan berkelanjutan sesuai prinsip Environment, Social, & Governance (ESG).</li>
              <li>Menciptakan intellectual capital yang unggul dengan mewujudkan budaya perusahaan yang SMART dan TERBAIK.</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="public-section">
        <div className="public-container">
          <div className="section-head">
            <h2>Pilar Strategis Misi</h2>
            <p>Arah utama pelaksanaan misi dalam operasional dan pelayanan Bank Sumut.</p>
          </div>

          <div className="public-grid">
            {missionPillars.map((item) => (
              <article key={item.title} className="public-card">
                <h3 className="card-title-with-icon">
                  {item.icon} {item.title}
                </h3>
                <p>{item.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="public-section section-soft">
        <div className="public-container">
          <div className="section-head">
            <h2>Nilai Layanan</h2>
            <p>Prinsip kerja yang menjadi fondasi pelayanan Bank Sumut.</p>
          </div>

          <div className="public-grid">
            {values.map((item) => (
              <article key={item.title} className="public-card">
                <h3 className="card-title-with-icon">
                  {item.icon} {item.title}
                </h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="public-section">
        <div className="public-container">
          <div className="section-head">
            <h2>Target Pengembangan Layanan</h2>
            <p>Prioritas implementasi untuk menjaga kualitas layanan berkelanjutan.</p>
          </div>

          <article className="public-card">
            <ul className="public-list">
              {strategicTargets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>
    </div>
  );
}

export default VisiMisi;
