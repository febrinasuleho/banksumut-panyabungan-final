const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:4000";
const DEFAULT_SALDO = 3500000;
const SALDO_KEY = "saldo";
const TRANSAKSI_KEY = "transaksi";

const handleResponse = async (response) => {
  if (!response.ok) {
    const payload = await response.json().catch(() => ({}));
    throw new Error(payload.error || "Request gagal.");
  }
  return response.json();
};

const formatDateTime = (date) => {
  const pad = (num) => String(num).padStart(2, "0");
  return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()} ${pad(
    date.getHours()
  )}:${pad(date.getMinutes())}`;
};

const getLocalSaldo = () => {
  const saved = Number(localStorage.getItem(SALDO_KEY));
  if (Number.isFinite(saved) && saved >= 0) return saved;
  return DEFAULT_SALDO;
};

const setLocalSaldo = (value) => {
  localStorage.setItem(SALDO_KEY, String(value));
};

const getLocalTransaksi = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(TRANSAKSI_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch (error) {
    return [];
  }
};

const setLocalTransaksi = (items) => {
  localStorage.setItem(TRANSAKSI_KEY, JSON.stringify(items));
};

const createLocalTransfer = (payload) => {
  const now = new Date();
  const amount = Number(payload.jumlah);
  const saldoSaatIni = getLocalSaldo();
  const saldoBaru = saldoSaatIni - amount;
  const referensi = `BSM-${now.getTime()}-${String(Math.floor(Math.random() * 900) + 100)}`;

  const transaksi = {
    _id: `local-${now.getTime()}`,
    jenis: "Transfer",
    tanggal: formatDateTime(now),
    jumlah: -amount,
    status: "Berhasil",
    metode: "Mobile Banking",
    biayaAdmin: 0,
    catatan: payload.catatan || "-",
    referensi,
    timestamp: now.toISOString(),
  };

  const all = [transaksi, ...getLocalTransaksi()];
  setLocalTransaksi(all);
  setLocalSaldo(saldoBaru);

  return { saldo: saldoBaru, transaksi };
};

export const getSaldo = async () => {
  try {
    return await fetch(`${API_BASE}/api/saldo`).then(handleResponse);
  } catch (error) {
    return { saldo: getLocalSaldo() };
  }
};

export const getTransaksi = async () => {
  try {
    return await fetch(`${API_BASE}/api/transaksi`).then(handleResponse);
  } catch (error) {
    return { transaksi: getLocalTransaksi() };
  }
};

export const transferDana = async (payload) => {
  try {
    return await fetch(`${API_BASE}/api/transfer`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).then(handleResponse);
  } catch (error) {
    return createLocalTransfer(payload);
  }
};

export const clearTransaksi = async () => {
  try {
    return await fetch(`${API_BASE}/api/transaksi`, { method: "DELETE" }).then(handleResponse);
  } catch (error) {
    setLocalTransaksi([]);
    return { ok: true };
  }
};

export const resetSaldo = async () => {
  try {
    return await fetch(`${API_BASE}/api/reset-saldo`, { method: "POST" }).then(handleResponse);
  } catch (error) {
    setLocalSaldo(DEFAULT_SALDO);
    return { saldo: DEFAULT_SALDO };
  }
};
