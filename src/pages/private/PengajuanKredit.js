import React, { useState } from "react";
import "../../styles/ServicePages.css";

function PengajuanKredit() {
  const [form, setForm] = useState({
    nama: "",
    nik: "",
    pekerjaan: "",
    penghasilan: "",
    jumlahKredit: "",
    tenor: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataPengajuan = {
      ...form,
      status: "Diproses",
      tanggal: new Date().toLocaleDateString("id-ID"),
    };

    localStorage.setItem("pengajuanKredit", JSON.stringify(dataPengajuan));
    alert("Pengajuan kredit berhasil dikirim!");
  };

  return (
    <div className="service-page">
      <div className="service-container">
        <h2 className="service-heading">Form Pengajuan Kredit</h2>
        <p className="service-subheading">
          Isi data secara lengkap agar proses verifikasi dan persetujuan lebih cepat.
        </p>

        <div className="service-card">
          <form className="service-form" onSubmit={handleSubmit}>
            <label className="service-label" htmlFor="nama">Nama Lengkap</label>
            <input id="nama" className="service-input" type="text" name="nama" onChange={handleChange} required />

            <label className="service-label" htmlFor="nik">NIK</label>
            <input id="nik" className="service-input" type="text" name="nik" onChange={handleChange} required />

            <label className="service-label" htmlFor="pekerjaan">Pekerjaan</label>
            <input id="pekerjaan" className="service-input" type="text" name="pekerjaan" onChange={handleChange} required />

            <label className="service-label" htmlFor="penghasilan">Penghasilan per Bulan</label>
            <input id="penghasilan" className="service-input" type="number" name="penghasilan" onChange={handleChange} required />

            <label className="service-label" htmlFor="jumlahKredit">Jumlah Kredit</label>
            <input id="jumlahKredit" className="service-input" type="number" name="jumlahKredit" onChange={handleChange} required />

            <label className="service-label" htmlFor="tenor">Tenor</label>
            <select id="tenor" className="service-select" name="tenor" onChange={handleChange} required>
              <option value="">Pilih Tenor</option>
              <option value="12">12 Bulan</option>
              <option value="24">24 Bulan</option>
              <option value="36">36 Bulan</option>
            </select>

            <button className="service-button" type="submit">Ajukan Kredit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PengajuanKredit;
