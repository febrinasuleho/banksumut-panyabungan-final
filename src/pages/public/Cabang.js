import React, { useMemo, useState } from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaClock, FaSearch } from "react-icons/fa";
import "./PublicInfo.css";

const daftarCabang = [
  {
    nama: "Cabang Panyabungan",
    alamat: "Jl. Willem Iskandar No.114, Sipolu Polu, Kec. Panyabungan, Kabupaten Mandailing Natal, Sumatera Utara 22778",
    telepon: "(0636) 20155",
    jam: "Senin - Jumat, 08.00 - 17.00 WIB",
    wilayah: "Mandailing Natal",
  },
  {
    nama: "Cabang Padangsidimpuan",
    alamat: "Jl. Merdeka No.32, Padangsidimpuan, Sumatera Utara",
    telepon: "(0634) 24510",
    jam: "Senin - Jumat, 08.00 - 16.00 WIB",
    wilayah: "Padangsidimpuan",
  },
  {
    nama: "Cabang Sibuhuan",
    alamat: "Jl. Kihajar Dewantara No.10, Sibuhuan, Sumatera Utara",
    telepon: "(0637) 31188",
    jam: "Senin - Jumat, 08.00 - 16.00 WIB",
    wilayah: "Padang Lawas",
  },
  {
    nama: "Cabang Gunung Tua",
    alamat: "Jl. Sisingamangaraja No.21, Gunung Tua, Sumatera Utara",
    telepon: "(0635) 41102",
    jam: "Senin - Jumat, 08.00 - 16.00 WIB",
    wilayah: "Padang Lawas Utara",
  },
];

function Cabang() {
  const [keyword, setKeyword] = useState("");

  const filteredCabang = useMemo(() => {
    const q = keyword.trim().toLowerCase();
    if (!q) return daftarCabang;

    return daftarCabang.filter(
      (item) =>
        item.nama.toLowerCase().includes(q) ||
        item.alamat.toLowerCase().includes(q) ||
        item.wilayah.toLowerCase().includes(q)
    );
  }, [keyword]);

  return (
    <div className="info-page">
      <section className="info-hero">
        <div className="info-container">
          <h1>Jaringan Cabang</h1>
          <p>
            Informasi cabang dan kantor layanan Bank Sumut untuk memudahkan
            akses nasabah.
          </p>
        </div>
      </section>

      <section className="info-section">
        <div className="info-container">
          <div className="branch-toolbar">
            <label className="search-box" htmlFor="cabang-search">
              <FaSearch />
              <input
                id="cabang-search"
                type="text"
                placeholder="Cari cabang atau wilayah..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
            </label>
            <span>{filteredCabang.length} cabang ditemukan</span>
          </div>

          <div className="branch-grid">
            {filteredCabang.map((cabang) => (
              <article className="info-card" key={cabang.nama}>
                <h3>{cabang.nama}</h3>
                <p>
                  <FaMapMarkerAlt /> {cabang.alamat}
                </p>
                <p>
                  <FaPhoneAlt /> {cabang.telepon}
                </p>
                <p>
                  <FaClock /> {cabang.jam}
                </p>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(cabang.alamat)}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Lihat Rute
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Cabang;

