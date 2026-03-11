import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import {
  FaWallet,
  FaBell,
  FaClipboardCheck,
  FaCommentDots,
  FaExchangeAlt,
  FaFileInvoiceDollar,
  FaCreditCard,
  FaBullhorn,
  FaSearch,
  FaTrashAlt,
} from "react-icons/fa";
import "./Dashboard.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const DEFAULT_SALDO = 3500000;
const getStoredSaldo = () => {
  const raw = localStorage.getItem("saldo");
  const parsed = Number(raw);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    localStorage.setItem("saldo", String(DEFAULT_SALDO));
    return DEFAULT_SALDO;
  }
  return parsed;
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

const fallbackTransactions = [
  { jenis: "Transfer", tanggal: "12/03/2025 09:15", jumlah: -500000 },
  { jenis: "Setor Tunai", tanggal: "10/03/2025 14:20", jumlah: 1000000 },
  { jenis: "Pembayaran Listrik", tanggal: "05/03/2025 11:05", jumlah: -250000 },
];

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

function Dashboard() {
  const navigate = useNavigate();
  const accountNumber = "1234 5678 9012";
  const [showSaldo, setShowSaldo] = useState(true);
  const [saldo, setSaldo] = useState(getStoredSaldo);
  const [historyVersion, setHistoryVersion] = useState(0);
  const [activeHistoryFilter, setActiveHistoryFilter] = useState("all");
  const [showKpiHistoryModal, setShowKpiHistoryModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isCopiedAccount, setIsCopiedAccount] = useState(false);

  const [period, setPeriod] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const syncData = () => {
      setSaldo(getStoredSaldo());
      setHistoryVersion((prev) => prev + 1);
    };

    window.addEventListener("focus", syncData);
    window.addEventListener("saldoUpdated", syncData);

    return () => {
      window.removeEventListener("focus", syncData);
      window.removeEventListener("saldoUpdated", syncData);
    };
  }, []);

  useEffect(() => {
    setPage(1);
  }, [period, searchQuery]);

  const transaksiData = JSON.parse(localStorage.getItem("transaksi")) || [];
  const allTransactions = (transaksiData.length > 0 ? transaksiData : fallbackTransactions)
    .map((trx, index) => ({
      id: `${trx.tanggal}-${trx.jenis}-${index}-${historyVersion}`,
      ...trx,
      parsedDate: trx.timestamp ? new Date(trx.timestamp) : parseTransactionDate(trx.tanggal),
      jumlah: Number(trx.jumlah),
      status: trx.status || "Berhasil",
      metode: trx.metode || "Mobile Banking",
      biayaAdmin: Number.isFinite(Number(trx.biayaAdmin)) ? Number(trx.biayaAdmin) : 0,
      catatan: trx.catatan || trx.keterangan || "-",
      referensi:
        trx.referensi ||
        `BSM-${(trx.timestamp || trx.tanggal || "000000")
          .replace(/[^\d]/g, "")
          .slice(0, 12)
          .padEnd(12, "0")}-${String(index + 1).padStart(3, "0")}`,
    }))
    .sort((a, b) => b.parsedDate - a.parsedDate);

  const formatRupiah = (angka) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(angka);
  };

  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const sevenDaysAgo = new Date(startOfToday);
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const transactionsByPeriod = allTransactions.filter((trx) => {
    if (period === "today") {
      return trx.parsedDate >= startOfToday;
    }
    if (period === "week") {
      return trx.parsedDate >= sevenDaysAgo;
    }
    if (period === "month") {
      return trx.parsedDate >= startOfMonth;
    }
    return true;
  });

  const searchedTransactions = transactionsByPeriod.filter((trx) => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return true;
    return (
      String(trx.jenis).toLowerCase().includes(q) ||
      String(trx.tanggal).toLowerCase().includes(q) ||
      String(trx.jumlah).includes(q)
    );
  });

  const sortedTransactions = [...searchedTransactions].sort((a, b) => b.parsedDate - a.parsedDate);

  const pageSize = 5;
  const totalPages = Math.max(1, Math.ceil(sortedTransactions.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pagedTransactions = sortedTransactions.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const totalIncome = transactionsByPeriod
    .filter((trx) => trx.jumlah > 0)
    .reduce((sum, trx) => sum + trx.jumlah, 0);
  const totalExpense = transactionsByPeriod
    .filter((trx) => trx.jumlah < 0)
    .reduce((sum, trx) => sum + Math.abs(trx.jumlah), 0);

  const monthLabels = [];
  for (let i = 5; i >= 0; i -= 1) {
    const dt = new Date(now.getFullYear(), now.getMonth() - i, 1);
    monthLabels.push(
      dt.toLocaleDateString("id-ID", {
        month: "short",
        year: "2-digit",
      })
    );
  }

  const monthValues = Array(6).fill(0);
  allTransactions.forEach((trx) => {
    const diffMonth =
      (now.getFullYear() - trx.parsedDate.getFullYear()) * 12 +
      (now.getMonth() - trx.parsedDate.getMonth());
    if (diffMonth >= 0 && diffMonth <= 5) {
      const idx = 5 - diffMonth;
      monthValues[idx] += trx.jumlah;
    }
  });

  const chartData = {
    labels: monthLabels,
    datasets: [
      {
        label: "Arus Kas Bersih",
        data: monthValues,
        borderColor: "#1565c0",
        backgroundColor: "rgba(21,101,192,0.16)",
        tension: 0.35,
        fill: true,
      },
    ],
  };

  const handleClearHistory = () => {
    const confirmClear = window.confirm("Hapus semua riwayat transaksi?");
    if (!confirmClear) return;

    localStorage.removeItem("transaksi");
    setPage(1);
    setHistoryVersion((prev) => prev + 1);
  };

  const kpiHistoryTransactions = transactionsByPeriod.filter((trx) => {
    if (activeHistoryFilter === "expense") return trx.jumlah < 0;
    if (activeHistoryFilter === "income") return trx.jumlah > 0;
    return true;
  });

  const kpiHistoryTitle =
    activeHistoryFilter === "expense"
      ? "Riwayat Pengeluaran"
      : activeHistoryFilter === "income"
      ? "Riwayat Pemasukan"
      : "Riwayat Semua Transaksi";

  const openHistoryModal = (filterKey) => {
    setActiveHistoryFilter(filterKey);
    setShowKpiHistoryModal(true);
  };

  const handleOpenTransactionDetail = (trx) => {
    setSelectedTransaction(trx);
  };

  const handleSaveReceipt = () => {
    if (!selectedTransaction) return;

    const receiptText = [
      "BUKTI TRANSAKSI BANK SUMUT KC PANYABUNGAN",
      "-----------------------------------------",
      `Referensi  : ${selectedTransaction.referensi}`,
      `Jenis      : ${selectedTransaction.jenis}`,
      `Tanggal    : ${formatDateTime(selectedTransaction.parsedDate)}`,
      `Nominal    : ${formatRupiah(selectedTransaction.jumlah)}`,
      `Status     : ${selectedTransaction.status}`,
      `Metode     : ${selectedTransaction.metode}`,
      `Biaya      : ${formatRupiah(selectedTransaction.biayaAdmin || 0)}`,
      `Catatan    : ${selectedTransaction.catatan || "-"}`,
    ].join("\n");

    const blob = new Blob([receiptText], { type: "text/plain;charset=utf-8" });
    const fileUrl = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = fileUrl;
    anchor.download = `bukti-${selectedTransaction.referensi}.txt`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(fileUrl);
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Yakin ingin logout?");
    if (confirmLogout) {
      localStorage.removeItem("isLogin");
      navigate("/login", { replace: true });
    }
  };

  const handleCopyAccountNumber = async () => {
    const plainAccount = accountNumber.replace(/\s+/g, "");
    try {
      await navigator.clipboard.writeText(plainAccount);
      setIsCopiedAccount(true);
      setTimeout(() => setIsCopiedAccount(false), 1600);
    } catch (error) {
      alert("Gagal menyalin nomor rekening. Silakan salin manual.");
    }
  };

  const handleResetSaldo = () => {
    const confirmReset = window.confirm("Setel saldo ke nilai awal?");
    if (!confirmReset) return;
    localStorage.setItem("saldo", String(DEFAULT_SALDO));
    setSaldo(DEFAULT_SALDO);
    window.dispatchEvent(new Event("saldoUpdated"));
  };

  return (
    <div className="dashboard-page">
      <aside className="dashboard-sidebar">
        <div className="dashboard-profile">
          <img src="/profile.jpg" alt="profile" />
          <h3>Febrina Suleho</h3>
          <small>Nasabah Platinum</small>
        </div>

        <MenuItem text="Dashboard" onClick={() => navigate("/dashboard")} />
        <MenuItem text="Rekening" onClick={() => navigate("/rekening")} />
        <MenuItem text="Transfer" onClick={() => navigate("/transfer")} />
        <MenuItem text="Pengajuan Kredit" onClick={() => navigate("/pengajuan-kredit")} />
        <MenuItem text="Pengaduan" onClick={() => navigate("/pengaduan")} />
        <MenuItem text="Status Layanan" onClick={() => navigate("/status-layanan")} />

        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-header">
          <div>
            <h2>Dashboard Nasabah</h2>
            <p>Ringkasan layanan dan aktivitas rekening Anda.</p>
          </div>
        </header>

        <section className="control-bar card-box">
          <div className="period-filter">
            <button className={period === "all" ? "active" : ""} onClick={() => setPeriod("all")}>Semua</button>
            <button className={period === "today" ? "active" : ""} onClick={() => setPeriod("today")}>Hari Ini</button>
            <button className={period === "week" ? "active" : ""} onClick={() => setPeriod("week")}>7 Hari</button>
            <button className={period === "month" ? "active" : ""} onClick={() => setPeriod("month")}>Bulan Ini</button>
          </div>

          <div className="search-sort-wrap">
            <label className="search-input">
              <FaSearch />
              <input
                type="text"
                placeholder="Cari transaksi..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </label>
          </div>
        </section>

        <section className="saldo-card">
          <div>
            <h4>Saldo Rekening</h4>
            <h1>{showSaldo ? formatRupiah(saldo) : "********"}</h1>
            <div className="account-copy-row">
              <small>No Rekening: {accountNumber}</small>
              <button
                type="button"
                className={`copy-account-btn ${isCopiedAccount ? "copied" : ""}`}
                onClick={handleCopyAccountNumber}
              >
                {isCopiedAccount ? "Tersalin" : "Salin"}
              </button>
              <button type="button" className="reset-saldo-btn" onClick={handleResetSaldo}>
                Reset Saldo
              </button>
            </div>
          </div>
          <button onClick={() => setShowSaldo(!showSaldo)} className="toggle-saldo">
            {showSaldo ? "Sembunyikan" : "Tampilkan"}
          </button>
        </section>

        <section className="quick-status kpi-grid">
          <article
            className={activeHistoryFilter === "all" ? "kpi-card kpi-active" : "kpi-card"}
            onClick={() => openHistoryModal("all")}
          >
            <h4>
              <FaWallet /> Saldo Tersedia
            </h4>
            <p>{formatRupiah(saldo)}</p>
            <small>Klik untuk lihat riwayat</small>
          </article>
          <article
            className={activeHistoryFilter === "expense" ? "kpi-card kpi-active" : "kpi-card"}
            onClick={() => openHistoryModal("expense")}
          >
            <h4>
              <FaClipboardCheck /> Pengeluaran Periode
            </h4>
            <p>{formatRupiah(totalExpense)}</p>
            <small>Klik untuk lihat riwayat</small>
          </article>
          <article
            className={activeHistoryFilter === "income" ? "kpi-card kpi-active" : "kpi-card"}
            onClick={() => openHistoryModal("income")}
          >
            <h4>
              <FaCommentDots /> Pemasukan Periode
            </h4>
            <p>{formatRupiah(totalIncome)}</p>
            <small>Klik untuk lihat riwayat</small>
          </article>
          <article
            className={activeHistoryFilter === "all" ? "kpi-card kpi-active" : "kpi-card"}
            onClick={() => openHistoryModal("all")}
          >
            <h4>
              <FaBell /> Jumlah Transaksi
            </h4>
            <p>{transactionsByPeriod.length} transaksi</p>
            <small>Klik untuk lihat riwayat</small>
          </article>
        </section>

        <section className="quick-actions card-box">
          <h4>Quick Actions</h4>
          <div className="quick-actions-grid">
            <button onClick={() => navigate("/transfer")}><FaExchangeAlt /> Transfer</button>
            <button onClick={() => navigate("/rekening")}><FaFileInvoiceDollar /> Rekening</button>
            <button onClick={() => navigate("/pengajuan-kredit")}><FaCreditCard /> Ajukan Kredit</button>
            <button onClick={() => navigate("/pengaduan")}><FaBullhorn /> Pengaduan</button>
          </div>
        </section>

        <section className="dashboard-grid single-column">
          <div className="card-box">
            <h4>Grafik Arus Kas 6 Bulan</h4>
            <Line data={chartData} />
          </div>
        </section>

        <section className="card-box transaction-table-card">
          <div className="table-head">
            <h4>Riwayat Transaksi</h4>
            <div className="table-head-actions">
              <small>
                Menampilkan {pagedTransactions.length} dari {sortedTransactions.length} transaksi
              </small>
              {allTransactions.length > 0 && (
                <button className="clear-history-btn" onClick={handleClearHistory}>
                  <FaTrashAlt /> Hapus Riwayat
                </button>
              )}
            </div>
          </div>

          {pagedTransactions.length === 0 && <p className="empty-state">Tidak ada transaksi untuk filter saat ini.</p>}

          {pagedTransactions.length > 0 && (
            <>
              <table className="transaction-table">
                <thead>
                  <tr>
                    <th>Jenis</th>
                    <th>Tanggal</th>
                    <th>Nominal</th>
                  </tr>
                </thead>
                <tbody>
                  {pagedTransactions.map((trx) => (
                  <tr key={trx.id} className="clickable-row" onClick={() => handleOpenTransactionDetail(trx)}>
                    <td>{trx.jenis}</td>
                    <td>{formatDateTime(trx.parsedDate)}</td>
                    <td className={trx.jumlah < 0 ? "amount-minus" : "amount-plus"}>
                      {formatRupiah(trx.jumlah)}
                      <span className={`status-pill status-${trx.status.toLowerCase()}`}>{trx.status}</span>
                    </td>
                  </tr>
                ))}
                </tbody>
              </table>

              <div className="pagination-wrap">
                <button
                  onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                >
                  Sebelumnya
                </button>
                <span>
                  Halaman {currentPage} / {totalPages}
                </span>
                <button
                  onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                >
                  Berikutnya
                </button>
              </div>
            </>
          )}
        </section>

        {showKpiHistoryModal && (
          <div className="kpi-history-modal-overlay" onClick={() => setShowKpiHistoryModal(false)}>
            <div className="kpi-history-modal card-box" onClick={(event) => event.stopPropagation()}>
              <div className="table-head">
                <h4>{kpiHistoryTitle}</h4>
                <div className="table-head-actions">
                  <small>{kpiHistoryTransactions.length} transaksi</small>
                  <button className="close-modal-btn" onClick={() => setShowKpiHistoryModal(false)}>
                    Tutup
                  </button>
                </div>
              </div>

              {kpiHistoryTransactions.length === 0 && (
                <p className="empty-state">Belum ada data transaksi pada kategori ini.</p>
              )}

              {kpiHistoryTransactions.length > 0 && (
                <table className="transaction-table">
                  <thead>
                    <tr>
                      <th>Jenis</th>
                      <th>Tanggal</th>
                      <th>Nominal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {kpiHistoryTransactions.slice(0, 8).map((trx) => (
                      <tr
                        key={`kpi-${trx.id}`}
                        className="clickable-row"
                        onClick={() => handleOpenTransactionDetail(trx)}
                      >
                        <td>{trx.jenis}</td>
                        <td>{formatDateTime(trx.parsedDate)}</td>
                        <td className={trx.jumlah < 0 ? "amount-minus" : "amount-plus"}>
                          {formatRupiah(trx.jumlah)}
                          <span className={`status-pill status-${trx.status.toLowerCase()}`}>{trx.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {selectedTransaction && (
          <div className="kpi-history-modal-overlay" onClick={() => setSelectedTransaction(null)}>
            <div
              className="kpi-history-modal card-box transaction-detail-modal"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="table-head">
                <h4>Detail Transaksi</h4>
                <button className="close-modal-btn" onClick={() => setSelectedTransaction(null)}>
                  Tutup
                </button>
              </div>

              <div className="detail-grid">
                <div>
                  <span>ID Referensi</span>
                  <strong>{selectedTransaction.referensi}</strong>
                </div>
                <div>
                  <span>Jenis Transaksi</span>
                  <strong>{selectedTransaction.jenis}</strong>
                </div>
                <div>
                  <span>Waktu</span>
                  <strong>{formatDateTime(selectedTransaction.parsedDate)} WIB</strong>
                </div>
                <div>
                  <span>Nominal</span>
                  <strong className={selectedTransaction.jumlah < 0 ? "amount-minus" : "amount-plus"}>
                    {formatRupiah(selectedTransaction.jumlah)}
                  </strong>
                </div>
                <div>
                  <span>Status</span>
                  <strong className={`status-pill status-${selectedTransaction.status.toLowerCase()}`}>
                    {selectedTransaction.status}
                  </strong>
                </div>
                <div>
                  <span>Metode</span>
                  <strong>{selectedTransaction.metode}</strong>
                </div>
                <div className="detail-full">
                  <span>Biaya Admin</span>
                  <strong>{formatRupiah(selectedTransaction.biayaAdmin || 0)}</strong>
                </div>
                <div className="detail-full">
                  <span>Catatan</span>
                  <strong>{selectedTransaction.catatan || "-"}</strong>
                </div>
              </div>

              <div className="detail-actions">
                <button className="close-modal-btn" onClick={handleSaveReceipt}>
                  Simpan Bukti
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

    </div>
  );
}

function MenuItem({ text, onClick }) {
  return (
    <button className="menu-item" onClick={onClick}>
      {text}
    </button>
  );
}

export default Dashboard;
