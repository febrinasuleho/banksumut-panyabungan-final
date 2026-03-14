import React, { useEffect, useState } from "react";
import "../../styles/ServicePages.css";
import { getSaldo, transferDana } from "../../services/api";

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
  const [saldoSaatIni, setSaldoSaatIni] = useState(0);
  const [isLoadingSaldo, setIsLoadingSaldo] = useState(true);

  const formatRupiah = (angka) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(angka);
  };

  useEffect(() => {
    let isMounted = true;
    getSaldo()
      .then((data) => {
        if (isMounted) {
          setSaldoSaatIni(data.saldo);
          setIsLoadingSaldo(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setSaldoSaatIni(0);
          setIsLoadingSaldo(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!window.confirm("Yakin ingin melakukan transfer?")) return;

    const jumlahTransfer = parseInt(form.jumlah, 10);

    if (!Number.isFinite(jumlahTransfer) || jumlahTransfer <= 0) {
      alert("Jumlah transfer tidak valid.");
      return;
    }

    transferDana({
      rekeningTujuan: form.rekeningTujuan,
      namaPenerima: form.namaPenerima,
      jumlah: jumlahTransfer,
      catatan: form.keterangan,
    })
      .then((data) => {
        const txDate = new Date(data.transaksi.timestamp);
        setSaldoSaatIni(data.saldo);

        setReceiptData({
          ...form,
          jumlah: jumlahTransfer,
          tanggal: formatDateTime(txDate),
          saldoTersisa: data.saldo,
          referensi: data.transaksi.referensi,
          status: data.transaksi.status,
          metode: data.transaksi.metode,
          biayaAdmin: data.transaksi.biayaAdmin,
          catatan: data.transaksi.catatan,
        });

        window.dispatchEvent(new Event("saldoUpdated"));
        setShowReceipt(true);
        setForm({
          rekeningTujuan: "",
          namaPenerima: "",
          jumlah: "",
          keterangan: "",
        });
      })
      .catch((error) => {
        alert(error.message || "Transfer gagal.");
      });
  };

  const buildReceiptText = (data) => {
    return [
      "BUKTI TRANSAKSI BANK SUMUT KC PANYABUNGAN",
      "-----------------------------------------",
      `Referensi  : ${data.referensi}`,
      `Tanggal    : ${data.tanggal}`,
      `Penerima   : ${data.namaPenerima}`,
      `Rekening   : ${data.rekeningTujuan}`,
      `Jumlah     : ${formatRupiah(data.jumlah)}`,
      `Status     : ${data.status}`,
      `Metode     : ${data.metode}`,
      `Biaya Admin: ${formatRupiah(data.biayaAdmin)}`,
      `Catatan    : ${data.catatan}`,
      `Saldo Akhir: ${formatRupiah(data.saldoTersisa)}`,
    ].join("\n");
  };

  const handleShareReceipt = async () => {
    if (!receiptData) return;

    const receiptText = buildReceiptText(receiptData);
    const fileName = `bukti-${receiptData.referensi}.txt`;
    const file = new File([receiptText], fileName, { type: "text/plain" });

    if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({
          title: "Bukti Transfer Bank Sumut",
          text: "Berikut bukti transfer.",
          files: [file],
        });
        return;
      } catch (error) {
        // fallback to download
      }
    }

    const blob = new Blob([receiptText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = fileName;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="service-page">
      <div className="service-container">
        <h2 className="service-heading">Transfer Dana</h2>
        <p className="service-subheading">Lakukan transfer antar rekening dengan aman dan cepat.</p>
        <p className="service-subheading">
          Saldo tersedia:{" "}
          <strong>{isLoadingSaldo ? "Memuat..." : formatRupiah(saldoSaatIni)}</strong>
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
              <div className="receipt-actions">
                <button className="service-button" onClick={handleShareReceipt}>
                  Bagikan Bukti
                </button>
                <button className="service-button" onClick={() => setShowReceipt(false)}>
                  Tutup
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Transfer;
