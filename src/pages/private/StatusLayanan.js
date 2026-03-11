import React from "react";
import "../../styles/ServicePages.css";

function StatusLayanan() {
  const kredit = JSON.parse(localStorage.getItem("pengajuanKredit"));
  const pengaduan = JSON.parse(localStorage.getItem("pengaduanNasabah")) || [];

  return (
    <div className="service-page">
      <div className="service-container">
        <h2 className="service-heading">Status Layanan Nasabah</h2>
        <p className="service-subheading">
          Pantau progres pengajuan kredit dan pengaduan Anda secara transparan.
        </p>

        <section className="service-card">
          <h3>Pengajuan Kredit</h3>
          {!kredit && <p className="service-subheading">Belum ada pengajuan kredit.</p>}
          {kredit && (
            <div className="service-item">
              <p><strong>Nama:</strong> {kredit.nama}</p>
              <p><strong>Jumlah Kredit:</strong> Rp {Number(kredit.jumlahKredit).toLocaleString("id-ID")}</p>
              <p><strong>Tenor:</strong> {kredit.tenor} bulan</p>
              <p>
                <strong>Status:</strong> <span className="service-badge">{kredit.status}</span>
              </p>
              <p><strong>Tanggal:</strong> {kredit.tanggal}</p>
            </div>
          )}
        </section>

        <section className="service-card">
          <h3>Riwayat Pengaduan</h3>
          {pengaduan.length === 0 && <p className="service-subheading">Belum ada pengaduan yang dikirim.</p>}
          {pengaduan.length > 0 && (
            <div className="service-list">
              {pengaduan.map((item) => (
                <div key={item.id} className="service-item">
                  <p><strong>ID:</strong> {item.id}</p>
                  <p><strong>Kategori:</strong> {item.kategori}</p>
                  <p>
                    <strong>Status:</strong> <span className="service-badge">{item.status}</span>
                  </p>
                  <p><strong>Tanggal:</strong> {item.tanggal}</p>
                  <p><strong>Pesan:</strong> {item.pesan}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default StatusLayanan;
