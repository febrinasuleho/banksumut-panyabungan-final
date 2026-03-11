import React, { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import "./styles/ServicePages.css";

const getStoredSaldo = () => {
  const raw = localStorage.getItem("saldo");
  const parsed = Number(raw);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 3500000;
};

const monthMap = {
  jan: 0,
  feb: 1,
  mar: 2,
  apr: 3,
  mei: 4,
  jun: 5,
  jul: 6,
  agu: 7,
  ags: 7,
  sep: 8,
  okt: 9,
  nov: 10,
  des: 11,
};

const parseTransactionDate = (value) => {
  if (!value) return new Date(0);

  const direct = new Date(value);
  if (!Number.isNaN(direct.getTime())) return direct;

  const slashDateTimeMatch = String(value).match(
    /^(\d{1,2})\/(\d{1,2})\/(\d{4})(?:\s+(\d{1,2}):(\d{1,2}))?$/
  );
  if (slashDateTimeMatch) {
    const day = Number(slashDateTimeMatch[1]);
    const month = Number(slashDateTimeMatch[2]) - 1;
    const year = Number(slashDateTimeMatch[3]);
    const hour = Number(slashDateTimeMatch[4] || 0);
    const minute = Number(slashDateTimeMatch[5] || 0);
    return new Date(year, month, day, hour, minute);
  }

  const words = String(value).trim().split(/\s+/);
  if (words.length >= 3) {
    const day = Number(words[0]);
    const monthWord = words[1].toLowerCase().slice(0, 3);
    const year = Number(words[2]);
    const month = monthMap[monthWord];
    if (!Number.isNaN(day) && month !== undefined && !Number.isNaN(year)) {
      return new Date(year, month, day);
    }
  }

  return new Date(0);
};

const formatDateTime = (date) => {
  const pad = (num) => String(num).padStart(2, "0");
  return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()} ${pad(
    date.getHours()
  )}:${pad(date.getMinutes())}`;
};

const fallbackTransactions = [
  { tanggal: "12/03/2025 09:15", jenis: "Transfer", jumlah: -500000 },
  { tanggal: "10/03/2025 14:20", jenis: "Setor Tunai", jumlah: 1000000 },
  { tanggal: "05/03/2025 11:05", jenis: "Pembayaran", jumlah: -250000 },
];

function Rekening() {
  const [saldo, setSaldo] = useState(getStoredSaldo);
  const [historyVersion, setHistoryVersion] = useState(0);

  useEffect(() => {
    const syncSaldo = () => {
      setSaldo(getStoredSaldo());
      setHistoryVersion((prev) => prev + 1);
    };

    window.addEventListener("focus", syncSaldo);
    window.addEventListener("saldoUpdated", syncSaldo);

    return () => {
      window.removeEventListener("focus", syncSaldo);
      window.removeEventListener("saldoUpdated", syncSaldo);
    };
  }, []);

  const formatRupiah = (angka) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(angka);
  };

  const transaksiRaw = JSON.parse(localStorage.getItem("transaksi")) || [];
  const transaksi = (transaksiRaw.length > 0 ? transaksiRaw : fallbackTransactions)
    .map((trx, index) => ({
      id: `${trx.tanggal}-${trx.jenis}-${index}-${historyVersion}`,
      ...trx,
      parsedDate: trx.timestamp ? new Date(trx.timestamp) : parseTransactionDate(trx.tanggal),
      jumlah: Number(trx.jumlah),
    }))
    .sort((a, b) => b.parsedDate - a.parsedDate);

  const handleClearHistory = () => {
    const confirmClear = window.confirm("Hapus semua riwayat transaksi?");
    if (!confirmClear) return;

    localStorage.removeItem("transaksi");
    setHistoryVersion((prev) => prev + 1);
  };

  return (
    <div className="service-page">
      <div className="service-container">
        <h2 className="service-heading">Detail Rekening</h2>
        <p className="service-subheading">Informasi rekening aktif dan riwayat transaksi terakhir.</p>

        <section className="service-card">
          <h3>Informasi Rekening</h3>
          <div className="service-item">
            <p><strong>No Rekening:</strong> 1234 5678 9012</p>
            <p><strong>Jenis Rekening:</strong> Tabungan Platinum</p>
            <p><strong>Status:</strong> Aktif</p>
            <p><strong>Saldo:</strong> {formatRupiah(saldo)}</p>
          </div>
        </section>

        <section className="service-card">
          <div className="service-card-head">
            <h3>Riwayat Transaksi</h3>
            {transaksi.length > 0 && (
              <button className="service-clear-btn" onClick={handleClearHistory}>
                <FaTrashAlt /> Hapus Riwayat
              </button>
            )}
          </div>

          <table className="service-table">
            <thead>
              <tr>
                <th>Jenis</th>
                <th>Tanggal</th>
                <th>Jumlah</th>
              </tr>
            </thead>
            <tbody>
              {transaksi.map((trx) => (
                <tr key={trx.id}>
                  <td>{trx.jenis}</td>
                  <td>{formatDateTime(trx.parsedDate)}</td>
                  <td className={trx.jumlah < 0 ? "negative" : "positive"}>{formatRupiah(trx.jumlah)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
}

export default Rekening;
