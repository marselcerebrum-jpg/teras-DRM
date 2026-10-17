// Bantuan bersama untuk mengirim notifikasi HP (Web Push). File berawalan _ tidak menjadi endpoint.
const webpush = require("web-push");
const SB_URL = "https://qkkeeifefgmzkzdawpzr.supabase.co";
const SB_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFra2VlaWZlZmdtemt6ZGF3cHpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTIwMjEyMzQsImV4cCI6MjEwNzU5NzIzNH0.mZue4Yx778SLzIlMb8-fpdNktMCrFOUd6IdAxeANpSk";

webpush.setVapidDetails("mailto:timmarketingcere@gmail.com", process.env.VAPID_PUBLIC, process.env.VAPID_PRIVATE);

async function rpc(nama, body, token = SB_KEY) {
  const r = await fetch(`${SB_URL}/rest/v1/rpc/${nama}`, {
    method: "POST",
    headers: { apikey: SB_KEY, Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const teks = await r.text();
  if (!r.ok) throw new Error(`${nama}: ${r.status} ${teks}`);
  return teks ? JSON.parse(teks) : null;
}

// Kirim ke satu langganan; langganan yang sudah kedaluwarsa dihapus otomatis.
async function kirim(langganan, pesan) {
  try {
    await webpush.sendNotification(
      { endpoint: langganan.endpoint, keys: { p256dh: langganan.p256dh, auth: langganan.auth } },
      JSON.stringify(pesan), { TTL: 60 * 60 * 6 });
    return true;
  } catch (e) {
    if (e.statusCode === 404 || e.statusCode === 410) {
      await rpc("hapus_langganan", { p_token: process.env.PENGINGAT_TOKEN, p_endpoint: langganan.endpoint }).catch(() => {});
    }
    return false;
  }
}

module.exports = { SB_URL, SB_KEY, rpc, kirim };
