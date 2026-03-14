const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:4000";

const handleResponse = async (response) => {
  if (!response.ok) {
    const payload = await response.json().catch(() => ({}));
    throw new Error(payload.error || "Request gagal.");
  }
  return response.json();
};

export const getSaldo = () =>
  fetch(`${API_BASE}/api/saldo`).then(handleResponse);

export const getTransaksi = () =>
  fetch(`${API_BASE}/api/transaksi`).then(handleResponse);

export const transferDana = (payload) =>
  fetch(`${API_BASE}/api/transfer`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }).then(handleResponse);

export const clearTransaksi = () =>
  fetch(`${API_BASE}/api/transaksi`, { method: "DELETE" }).then(handleResponse);

export const resetSaldo = () =>
  fetch(`${API_BASE}/api/reset-saldo`, { method: "POST" }).then(handleResponse);
