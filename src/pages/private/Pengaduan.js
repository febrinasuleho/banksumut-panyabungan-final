import React, { useState } from "react";
import "../../styles/ServicePages.css";

function Pengaduan() {
  const [form, setForm] = useState({
    kategori: "Layanan Mobile Banking",
    pesan: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const laporanBaru = {
      id: `PGD-${Date.now()}`,
      kategori: form.kategori,
      pesan: form.pesan,
      tanggal: new Date().toLocaleDateString("id-ID"),
      status: "Diterima",
    };

    const riwayatLama = JSON.parse(localStorage.getItem("pengaduanNasabah")) || [];
    localStorage.setItem("pengaduanNasabah", JSON.stringify([laporanBaru, ...riwayatLama]));

    alert("Pengaduan berhasil dikirim.");
    setForm({ kategori: "Layanan Mobile Banking", pesan: "" });
  };

  return (
    <div className="service-page">
      <div className="service-container">
        <h2 className="service-heading">Form Pengaduan Nasabah</h2>
        <p className="service-subheading">
          Sampaikan kendala layanan Anda, tim kami akan menindaklanjuti secepatnya.
        </p>

        <div className="service-card">
          <form className="service-form" onSubmit={handleSubmit}>
            <label className="service-label" htmlFor="kategori">Kategori Pengaduan</label>
            <select
              id="kategori"
              className="service-select"
              value={form.kategori}
              onChange={(e) => setForm({ ...form, kategori: e.target.value })}
              required
            >
              <option>Layanan Mobile Banking</option>
              <option>Transaksi Transfer</option>
              <option>Kartu ATM/Debit</option>
              <option>Pelayanan Kantor Cabang</option>
              <option>Lainnya</option>
            </select>

            <label className="service-label" htmlFor="pesan">Isi Pengaduan</label>
            <textarea
              id="pesan"
              className="service-textarea"
              value={form.pesan}
              onChange={(e) => setForm({ ...form, pesan: e.target.value })}
              placeholder="Tuliskan detail kendala Anda"
              rows={5}
              required
            />

            <button className="service-button" type="submit">Kirim Pengaduan</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Pengaduan;
