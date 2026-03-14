import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 4000;
const DEFAULT_SALDO = Number(process.env.DEFAULT_SALDO || 3500000);

const app = express();
app.use(cors());
app.use(express.json());

let saldo = DEFAULT_SALDO;
let transaksi = [];

const buildReferensi = () => {
  const txDate = new Date();
  return `BSM-${txDate
    .toISOString()
    .replace(/[^\d]/g, "")
    .slice(0, 14)}-${Math.floor(Math.random() * 900 + 100)}`;
};

app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});

app.get("/api/saldo", (req, res) => {
  res.json({ saldo });
});

app.get("/api/transaksi", (req, res) => {
  res.json({ transaksi });
});

app.post("/api/transfer", (req, res) => {
  const { rekeningTujuan, namaPenerima, jumlah, catatan } = req.body || {};
  const jumlahTransfer = Number(jumlah);

  if (!Number.isFinite(jumlahTransfer) || jumlahTransfer <= 0) {
    return res.status(400).json({ error: "Jumlah transfer tidak valid." });
  }

  if (jumlahTransfer > saldo) {
    return res.status(400).json({ error: "Saldo tidak cukup." });
  }

  saldo -= jumlahTransfer;
  const txDate = new Date();
  const transaksiBaru = {
    timestamp: txDate.toISOString(),
    tanggal: txDate.toLocaleString("id-ID"),
    jenis: "Transfer",
    jumlah: -jumlahTransfer,
    referensi: buildReferensi(),
    status: "Berhasil",
    metode: "Mobile Banking",
    biayaAdmin: 0,
    catatan: catatan || "Transfer antar rekening",
    rekeningTujuan: rekeningTujuan || "-",
    namaPenerima: namaPenerima || "-",
  };

  transaksi = [transaksiBaru, ...transaksi].slice(0, 100);

  return res.json({
    saldo,
    transaksi: transaksiBaru,
  });
});

app.delete("/api/transaksi", (req, res) => {
  transaksi = [];
  res.json({ ok: true });
});

app.post("/api/reset-saldo", (req, res) => {
  saldo = DEFAULT_SALDO;
  res.json({ saldo });
});

app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});
