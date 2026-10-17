// Dipanggil Vercel Cron: pagi (±09.30 WIB) dan sore (±16.00 WIB). Jumat sore juga mengirim kabar rapor mingguan.
// Juga menjaga database Supabase gratis tetap aktif.
const { rpc, kirim } = require("./_kirim");

function pesanUntuk(t) {
  const nama = t.nama.split(" ")[0];
  if (t.info === "checkin") return { title: `Pagi, ${nama}! ☀️`, body: "Check-in dulu yuk, cuma 2 menit. Biar leader tahu kabarmu hari ini.", url: "/#/hari" };
  if (t.info === "absen") return { title: `Pagi, ${nama}! ☀️`, body: "Jangan lupa absen masuk, terus intip Ringkasan tim ya.", url: "/#/hari" };
  if (t.info === "pulang") return { title: "Udah mau pulang? 🏃", body: "Absen pulang dulu, sekalian tulis 1 hal baik hari ini.", url: "/#/hari" };
  if (t.info.startsWith("checklist:")) {
    const pct = t.info.split(":")[1];
    return { title: `Checklist kamu baru ${pct}% 📋`, body: "Masih sempat diberesin. Yang memang nggak ada kerjaannya, tandai 'Tidak ada' ya.", url: "/#/hari" };
  }
  if (t.info === "rapor") return { title: "Rapor mingguanmu udah jadi 📊", body: "Intip pencapaianmu minggu ini. Spoiler: kamu lebih keren dari yang kamu kira.", url: "/#/rapor" };
  return null;
}

module.exports = async (req, res) => {
  if (req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`) return res.status(401).json({ error: "Tidak diizinkan" });
  const waktu = req.query.waktu === "sore" ? "sore" : "pagi";
  const hasil = { waktu, terkirim: 0, gagal: 0 };
  try {
    await rpc("perlu_setup", {}); // menjaga database tetap aktif
    const jenis = [waktu];
    const hariJkt = new Date(Date.now() + 7 * 3600 * 1000).getUTCDay();
    if (waktu === "sore" && hariJkt === 5) jenis.push("rapor");
    for (const j of jenis) {
      const target = await rpc("target_pengingat", { p_token: process.env.PENGINGAT_TOKEN, p_jenis: j });
      for (const t of target || []) {
        const pesan = pesanUntuk(t);
        if (!pesan) continue;
        (await kirim(t, pesan)) ? hasil.terkirim++ : hasil.gagal++;
      }
    }
    res.status(200).json(hasil);
  } catch (e) {
    res.status(500).json({ ...hasil, error: String(e.message || e) });
  }
};
