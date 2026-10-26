'use strict';
// Verifikasi login memakai sesi Supabase milik Spill. User ID tidak pernah diambil dari isi request.
// SUPABASE_URL / SUPABASE_ANON_KEY boleh diisi di Vercel. Kalau kosong, dipakai nilai publik yang sama
// dengan app.js dan api/_kirim.js (anon key memang kunci publik, bukan rahasia).
const SB_URL_SPILL = 'https://qkkeeifefgmzkzdawpzr.supabase.co';
const SB_ANON_SPILL = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFra2VlaWZlZmdtemt6ZGF3cHpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTIwMjEyMzQsImV4cCI6MjEwNzU5NzIzNH0.mZue4Yx778SLzIlMb8-fpdNktMCrFOUd6IdAxeANpSk';
// Sama dengan menu di Spill: social media specialist, leader, dan admin
const PERAN_BOLEH = ['sms', 'leader'];

async function verifySpillUser(request) {
  const auth = request.headers.authorization || '';
  const match = /^Bearer\s+(\S+)$/i.exec(auth);
  if (!match) return { status: 401, error: 'Silakan login ke Spill dahulu' };
  const url = (process.env.SUPABASE_URL || SB_URL_SPILL).replace(/\/$/, '');
  const key = process.env.SUPABASE_ANON_KEY || SB_ANON_SPILL;
  try {
    const headers = { apikey: key, authorization: `Bearer ${match[1]}` };
    const userResponse = await fetch(`${url}/auth/v1/user`, { headers, signal: AbortSignal.timeout(8000) });
    if (!userResponse.ok) return { status: 401, error: 'Sesi login sudah tidak valid. Silakan masuk lagi.' };
    const user = await userResponse.json();
    if (!user || !user.id) return { status: 401, error: 'Sesi tidak valid' };
    const memberResponse = await fetch(`${url}/rest/v1/members?user_id=eq.${encodeURIComponent(user.id)}&select=id,aktif,peran,is_admin&limit=1`, { headers, signal: AbortSignal.timeout(8000) });
    if (!memberResponse.ok) return { status: 503, error: 'Gagal memverifikasi anggota Spill' };
    const [member] = await memberResponse.json();
    if (!member || !member.aktif) return { status: 403, error: 'Akun Spill belum aktif' };
    if (!PERAN_BOLEH.includes(member.peran) && !member.is_admin) return { status: 403, error: 'Natural Script AI khusus tim kreatif (social media specialist, leader, admin)' };
    return { id: user.id, memberId: member.id };
  } catch { return { status: 503, error: 'Layanan login sementara tidak tersedia' }; }
}
module.exports = { verifySpillUser };
