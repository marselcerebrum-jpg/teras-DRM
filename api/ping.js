// Dipanggil cron Vercel sekali sehari supaya project Supabase gratis tidak dijeda karena tidak aktif.
const URL = "https://qkkeeifefgmzkzdawpzr.supabase.co";
const KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFra2VlaWZlZmdtemt6ZGF3cHpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTIwMjEyMzQsImV4cCI6MjEwNzU5NzIzNH0.mZue4Yx778SLzIlMb8-fpdNktMCrFOUd6IdAxeANpSk";
module.exports = async (req, res) => {
  try {
    const r = await fetch(`${URL}/rest/v1/rpc/perlu_setup`, {
      method: "POST",
      headers: { apikey: KEY, Authorization: `Bearer ${KEY}`, "Content-Type": "application/json" },
      body: "{}",
    });
    res.status(200).json({ ok: r.ok, status: r.status, waktu: new Date().toISOString() });
  } catch (e) {
    res.status(500).json({ ok: false, error: String(e) });
  }
};
