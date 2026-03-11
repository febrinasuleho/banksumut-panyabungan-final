import React, { useState } from "react";
import "./styles/ServicePages.css";

const getStoredSaldo = () => {
  const raw = localStorage.getItem("saldo");
  const parsed = Number(raw);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 3500000;
};

const formatDateTime = (date) => {
  const pad = (num) => String(num).padStart(2, "0");
  return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()} ${pad(
    date.getHours()
  )}:${pad(date.getMinutes())}`;
};

function Transfer() {
  const [form, setForm] = useState({
    rekeningTujuan: "",
    namaPenerima: "",
    jumlah: "",
    keterangan: "",
  });

  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptData, setReceiptData] = useState(null);
  const [saldoSaatIni, setSaldoSaatIni] = useState(getStoredSaldo);

  const formatRupiah = (angka) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(angka);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!window.confirm("Yakin ingin melakukan transfer?")) return;

    const jumlahTransfer = parseInt(form.jumlah, 10);

    if (!Number.isFinite(jumlahTransfer) || jumlahTransfer <= 0) {
      alert("Jumlah transfer tidak valid.");
      return;
    }

    if (jumlahTransfer > saldoSaatIni) {
      alert("Saldo tidak cukup!");
      return;
    }

    const saldoBaru = saldoSaatIni - jumlahTransfer;
    localStorage.setItem("saldo", String(saldoBaru));
    setSaldoSaatIni(saldoBaru);

    const txDate = new Date();
    const refCode = `BSM-${txDate
      .toISOString()
      .replace(/[^\d]/g, "")
      .slice(0, 14)}-${Math.floor(Math.random() * 900 + 100)}`;
    const transaksiBaru = {
      timestamp: txDate.toISOString(),
      tanggal: formatDateTime(txDate),
      jenis: "Transfer",
      jumlah: -jumlahTransfer,
      referensi: refCode,
      status: "Berhasil",
      metode: "Mobile Banking",
      biayaAdmin: 0,
      catatan: form.keterangan || "Transfer antar rekening",
    };

    const transaksiLama = JSON.parse(localStorage.getItem("transaksi")) || [];
    localStorage.setItem("transaksi", JSON.stringify([transaksiBaru, ...transaksiLama]));

    window.dispatchEvent(new Event("saldoUpdated"));

    setReceiptData({
      ...form,
      jumlah: jumlahTransfer,
      tanggal: transaksiBaru.tanggal,
      saldoTersisa: saldoBaru,
      referensi: refCode,
      status: transaksiBaru.status,
      metode: transaksiBaru.metode,
      biayaAdmin: transaksiBaru.biayaAdmin,
      catatan: transaksiBaru.catatan,
    });

    setShowReceipt(true);
    setForm({
      rekeningTujuan: "",
      namaPenerima: "",
      jumlah: "",
      keterangan: "",
    });
  };

  return (
    <div className="service-page">
      <div className="service-container">
        <h2 className="service-heading">Transfer Dana</h2>
        <p className="service-subheading">Lakukan transfer antar rekening dengan aman dan cepat.</p>
        <p className="service-subheading">
          Saldo tersedia: <strong>{formatRupiah(saldoSaatIni)}</strong>
        </p>

        <div className="service-card">
          <form className="service-form" onSubmit={handleSubmit}>
            <label className="service-label" htmlFor="rekeningTujuan">No Rekening Tujuan</label>
            <input
              id="rekeningTujuan"
              className="service-input"
              value={form.rekeningTujuan}
              required
              onChange={(e) => setForm({ ...form, rekeningTujuan: e.target.value })}
            />

            <label className="service-label" htmlFor="namaPenerima">Nama Penerima</label>
            <input
              id="namaPenerima"
              className="service-input"
              value={form.namaPenerima}
              required
              onChange={(e) => setForm({ ...form, namaPenerima: e.target.value })}
            />

            <label className="service-label" htmlFor="jumlahTransfer">Jumlah Transfer</label>
            <input
              id="jumlahTransfer"
              className="service-input"
              type="number"
              value={form.jumlah}
              required
              onChange={(e) => setForm({ ...form, jumlah: e.target.value })}
            />

            <label className="service-label" htmlFor="keterangan">Keterangan</label>
            <textarea
              id="keterangan"
              className="service-textarea"
              rows={3}
              value={form.keterangan}
              onChange={(e) => setForm({ ...form, keterangan: e.target.value })}
            />

            <button className="service-button" type="submit">Kirim Transfer</button>
          </form>
        </div>

        {showReceipt && (
          <div className="modal-overlay">
            <div className="modal-card">
              <h3>Transfer Berhasil</h3>
              <p><strong>Tanggal:</strong> {receiptData.tanggal}</p>
              <p><strong>Referensi:</strong> {receiptData.referensi}</p>
              <p><strong>Penerima:</strong> {receiptData.namaPenerima}</p>
              <p><strong>Rekening:</strong> {receiptData.rekeningTujuan}</p>
              <p><strong>Jumlah:</strong> {formatRupiah(receiptData.jumlah)}</p>
              <p><strong>Status:</strong> {receiptData.status}</p>
              <p><strong>Metode:</strong> {receiptData.metode}</p>
              <p><strong>Biaya Admin:</strong> {formatRupiah(receiptData.biayaAdmin)}</p>
              <p><strong>Catatan:</strong> {receiptData.catatan}</p>
              <p><strong>Saldo Tersisa:</strong> {formatRupiah(receiptData.saldoTersisa)}</p>
              <button className="service-button" onClick={() => setShowReceipt(false)}>Tutup</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Transfer;
