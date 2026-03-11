import React, { useEffect, useState } from "react";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
  FaHeadset,
  FaPaperPlane,
  FaTrashAlt,
  FaWhatsapp,
} from "react-icons/fa";
import "./PublicInfo.css";

const STORAGE_KEY = "pesanKontakNasabah";
const WA_NUMBER = "6285805794501";
const WA_MESSAGE = encodeURIComponent(
  "Halo Bank Sumut KC Panyabungan, saya ingin mendapatkan informasi layanan nasabah."
);
const WA_LINK = `https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`;

function Kontak() {
  const [form, setForm] = useState({
    nama: "",
    email: "",
    subjek: "",
    pesan: "",
  });
  const [riwayatPesan, setRiwayatPesan] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    setRiwayatPesan(saved);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const pesanBaru = {
      id: `MSG-${Date.now()}`,
      ...form,
      tanggal: new Date().toLocaleString("id-ID"),
      status: "Diterima",
    };

    const updated = [pesanBaru, ...riwayatPesan].slice(0, 10);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setRiwayatPesan(updated);

    alert("Pesan Anda berhasil dikirim. Tim kami akan menghubungi Anda.");
    setForm({ nama: "", email: "", subjek: "", pesan: "" });
  };

  const handleClearHistory = () => {
    const confirmClear = window.confirm("Hapus semua riwayat pesan?");
    if (!confirmClear) return;

    localStorage.removeItem(STORAGE_KEY);
    setRiwayatPesan([]);
  };

  return (
    <div className="info-page">
      <section className="info-hero">
        <div className="info-container">
          <h1>Hubungi Kami</h1>
          <p>
            Layanan informasi resmi Bank Sumut KC Panyabungan untuk kebutuhan
            nasabah.
          </p>
        </div>
      </section>

      <section className="info-section">
        <div className="info-container info-grid">
          <article className="info-card">
            <h3>
              <FaMapMarkerAlt /> Alamat Kantor
            </h3>
            <p>
              PT. Bank Sumut KC Panyabungan, Jl. Willem Iskandar No.114, Sipolu Polu, Kec. Panyabungan, Kabupaten Mandailing Natal, Sumatera Utara 22778
            </p>
            <a
              href="https://maps.google.com/?q=Jl.+Willem+Iskandar+No.114,+Sipolu+Polu,+Kec.+Panyabungan,+Kabupaten+Mandailing+Natal,+Sumatera+Utara+22778"
              target="_blank"
              rel="noreferrer"
            >
              Buka di Google Maps
            </a>
          </article>

          <article className="info-card">
            <h3>
              <FaHeadset /> Kontak Layanan
            </h3>
            <p>
              <FaPhoneAlt /> Telepon: 085805794501
            </p>
            <p>
              <FaEnvelope /> Email: layanan@banksumutpanyabungan.co.id
            </p>
            <p>
              <FaClock /> Senin - Jumat, 08.00 - 17.00 WIB
            </p>
            <a href={WA_LINK} target="_blank" rel="noreferrer" className="wa-link">
              <FaWhatsapp /> Chat WhatsApp
            </a>
          </article>

          <article className="info-card">
            <h3>Media Respon Cepat</h3>
            <p>
              Gunakan menu <strong>Pengaduan Nasabah</strong> di dashboard untuk
              laporan layanan terintegrasi.
            </p>
            <a href={WA_LINK} target="_blank" rel="noreferrer" className="wa-link">
              <FaWhatsapp /> Hubungi via WhatsApp
            </a>
          </article>
        </div>
      </section>

      <section className="info-section section-soft">
        <div className="info-container form-layout">
          <div className="section-head">
            <h2>Form Pesan Nasabah</h2>
            <p>
              Isi form berikut untuk pertanyaan umum, keluhan, atau permintaan
              informasi layanan.
            </p>
          </div>

          <form className="info-form" onSubmit={handleSubmit}>
            <label htmlFor="nama">Nama Lengkap</label>
            <input
              id="nama"
              type="text"
              value={form.nama}
              onChange={(e) => setForm({ ...form, nama: e.target.value })}
              required
            />

            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />

            <label htmlFor="subjek">Subjek</label>
            <input
              id="subjek"
              type="text"
              value={form.subjek}
              onChange={(e) => setForm({ ...form, subjek: e.target.value })}
              required
            />

            <label htmlFor="pesan">Pesan</label>
            <textarea
              id="pesan"
              rows={5}
              value={form.pesan}
              onChange={(e) => setForm({ ...form, pesan: e.target.value })}
              required
            />

            <button type="submit">
              <FaPaperPlane /> Kirim Pesan
            </button>
          </form>
        </div>
      </section>

      <section className="info-section">
        <div className="info-container">
          <div className="history-head">
            <div className="section-head">
              <h2>Riwayat Pesan Terbaru</h2>
              <p>Pesan dari form kontak akan tersimpan otomatis di browser ini.</p>
            </div>

            {riwayatPesan.length > 0 && (
              <button className="clear-history-btn" onClick={handleClearHistory}>
                <FaTrashAlt /> Hapus Riwayat
              </button>
            )}
          </div>

          {riwayatPesan.length === 0 && (
            <div className="info-card history-empty">Belum ada pesan terkirim.</div>
          )}

          {riwayatPesan.length > 0 && (
            <div className="history-grid">
              {riwayatPesan.map((item) => (
                <article className="info-card" key={item.id}>
                  <h3>{item.subjek}</h3>
                  <p>
                    <strong>Nama:</strong> {item.nama}
                  </p>
                  <p>
                    <strong>Email:</strong> {item.email}
                  </p>
                  <p>
                    <strong>Status:</strong> <span className="history-status">{item.status}</span>
                  </p>
                  <p>
                    <strong>Tanggal:</strong> {item.tanggal}
                  </p>
                  <p>{item.pesan}</p>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Kontak;
