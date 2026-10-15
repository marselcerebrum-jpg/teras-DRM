"use strict";
/* ================= KONFIGURASI ================= */
const SB_URL = "https://qkkeeifefgmzkzdawpzr.supabase.co";
const SB_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFra2VlaWZlZmdtemt6ZGF3cHpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTIwMjEyMzQsImV4cCI6MjEwNzU5NzIzNH0.mZue4Yx778SLzIlMb8-fpdNktMCrFOUd6IdAxeANpSk";
// Domain internal untuk akun login. JANGAN diganti walaupun nama aplikasi berubah, karena akun yang sudah ada memakai domain ini.
const DOMAIN = "teras.cerebrum.id";
const LOGO_MARK = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 66 74" aria-hidden="true"><g transform="translate(1,1) scale(1)"><path d="M18 4 H44 A14 14 0 0 1 58 18 V26 A14 14 0 0 1 44 40 H28 V50 A5 5 0 0 1 18 50 V40 A14 14 0 0 1 4 26 V18 A14 14 0 0 1 18 4 Z" transform="translate(3.5,3.5)" fill="#121212"/><path d="M23 57 C23 57 18 62.5 18 65 A5 5 0 0 0 28 65 C28 62.5 23 57 23 57 Z" transform="translate(2.2,2.2)" fill="#121212"/><path d="M18 4 H44 A14 14 0 0 1 58 18 V26 A14 14 0 0 1 44 40 H28 V50 A5 5 0 0 1 18 50 V40 A14 14 0 0 1 4 26 V18 A14 14 0 0 1 18 4 Z" fill="#ff4f8b" stroke="#121212" stroke-width="3.2" stroke-linejoin="round"/><path d="M23 57 C23 57 18 62.5 18 65 A5 5 0 0 0 28 65 C28 62.5 23 57 23 57 Z" fill="#ff4f8b" stroke="#121212" stroke-width="2.72" stroke-linejoin="round"/><circle cx="20" cy="22" r="3.8" fill="#121212"/><circle cx="31" cy="22" r="3.8" fill="#121212"/><circle cx="42" cy="22" r="3.8" fill="#121212"/></g></svg>`;
function logo() {
  const s = document.createElement("span");
  s.className = "logo-wrap";
  s.innerHTML = LOGO_MARK + '<span class="logo">spill</span>';
  return s;
}
const sb = window.supabase.createClient(SB_URL, SB_KEY, { auth: { persistSession: true, autoRefreshToken: true } });

const HAMBATAN = ["Tidak ada hambatan","Tidak tahu caranya","Menunggu orang lain","Tidak yakin prioritas","Waktu habis untuk hal lain","Energi sedang turun"];
const PANDUAN = {
  "Tidak tahu caranya":"Cek eksperimen tim yang hasilnya jelas atau Bank Riset Kompetitor, polanya bisa jadi titik awal. Kalau masih buntu, isi kolom bantuan di bawah.",
  "Menunggu orang lain":"Tulis siapa yang kamu tunggu dan kapan kamu butuh jawabannya. Ini muncul di ringkasan leader sebagai blocker.",
  "Tidak yakin prioritas":"Ini ditandai untuk leader supaya diputuskan hari ini. Sambil menunggu, mulai dari konten yang jadwal tayangnya paling dekat.",
  "Waktu habis untuk hal lain":"Tulis apa yang menyita waktumu. Leader bisa bantu memutuskan mana yang boleh ditunda.",
  "Energi sedang turun":"Terima kasih sudah jujur. Leader akan menyapamu hari ini. Untuk sekarang, cukup pilih satu hal kecil yang bisa diselesaikan."
};
const PLATFORM = ["TikTok","Instagram","Web","YouTube","Threads"];
const FORMAT = ["Video pendek","Carousel","Single post","Story","Live"];
const ENERGI = ["Lelah sekali","Kurang","Biasa","Baik","Semangat"];
// Kata motivasi harian: semua orang melihat kalimat yang sama di hari yang sama, berganti setiap hari.
const MOTIVASI = [
 "Algoritma boleh labil, kamu jangan. Gas posting!",
 "Overthinking caption 3 jam? Posting dulu, revisi belakangan. Yang penting tayang, bestie.",
 "Engagement lagi sepi? Tenang, mantan aja bisa balik, apalagi views.",
 "Hari ini mungkin belum masuk FYP, tapi tetap hari yang pas buat bikin konten lebih bagus dari kemarin.",
 "Mager itu manusiawi. Deadline-nya yang nggak manusiawi. Yuk, satu tugas dulu.",
 "Kamu bukan robot, jadi wajar capek. Bedanya, robot nggak bisa bikin hook sekreatif kamu.",
 "Eksperimen gagal? Selamat, kamu baru nemu satu cara yang nggak perlu dicoba lagi. Hemat waktu, kan?",
 "Kopi boleh dingin, semangat jangan.",
 "Bikin konten itu kayak masak mi instan: ada aturannya, tapi topping-nya bebas berkreasi.",
 "Malu bertanya, sesat di dashboard insight. Kalau bingung, tanya aja.",
 "Musuh terbesar hari ini bukan deadline, tapi tab TikTok yang kebuka \"cuma sebentar\".",
 "Satu komentar dibalas = satu calon pejuang ASN merasa didengar. Itu bukan receh, itu impact.",
 "Reminder: angka engagement bukan angka harga diri. Kamu tetap keren walaupun views lagi diet.",
 "Riset kompetitor itu bukan stalking, tapi studi banding. Profesional dong.",
 "Kalau hari ini cuma kuat ngerjain satu hal, pilih yang paling penting. Itu bukan red flag, itu prioritas.",
 "Ide brilian sering muncul pas mandi. Jadi kalau lagi buntu… ya, mandi dulu juga boleh.",
 "Jangan bandingin behind the scene kamu sama highlight akun orang lain.",
 "Low battery boleh, low effort jangan. Isi daya dulu, terus gas lagi.",
 "Hook yang bagus itu kayak chat dari crush: bikin orang langsung berhenti scroll.",
 "Kamu nggak telat, kamu cuma lagi loading. Yang penting jangan force close.",
 "Konsisten nggak harus heboh. Yang penting nongol tiap hari, kayak notifikasi grup kantor.",
 "Healing terbaik hari ini: checklist 100%, terus pulang tepat waktu.",
 "Ada yang bikin macet? Spill di check-in. Leader bukan cenayang, nggak bisa nebak sendiri.",
 "Data engagement itu kayak zodiak, bedanya ini beneran bisa dipakai buat ambil keputusan.",
 "Semua ahli pernah bikin konten yang sekarang bikin dia malu sendiri pas nonton ulang. Santai.",
 "Mood hari ini: sedikit lelah, banyak berkah, dan semoga nggak ada revisi mendadak.",
 "Kerja tim itu kayak duet TikTok: harus nyambung, bukan saling ngalahin.",
 "Capek? Istirahat. Udah segar? Comeback lebih kuat, kayak idol K-pop.",
 "Satu persen lebih baik tiap hari. Setahun kemudian? Jauh banget. Matematika pun setuju.",
 "Bukan soal viral sekali, tapi soal dipercaya berkali-kali.",
 "Draft pertama jelek itu wajib hukumnya. Yang nggak boleh itu berhenti di draft pertama.",
 "Hari ini jadi main character di kerjaanmu sendiri. Plot twist-nya: kamu berhasil.",
 "Insight lagi turun? Jangan ikut turun. Ambil pelajarannya, terus coba lagi.",
 "Kerjaan numpuk? Pecah jadi kecil-kecil. Kayak makan pizza, nggak ada yang langsung telan satu loyang.",
 "Ngerjain checklist sambil dengerin playlist favorit itu legal. Yang ilegal itu nunda sampai jam 5 sore.",
 "Konten edukasimu bisa jadi alasan seseorang lolos seleksi. Secara teknis kamu pahlawan, cuma nggak pakai jubah.",
 "Nggak harus selalu semangat 100%. 60% asal tetap jalan juga udah keren.",
 "Komentar julid itu bahan konten gratis. Makasih, netizen.",
 "Jangan lupa minum air putih. Hidrasi dulu, kreasi kemudian.",
 "Makasih udah hadir hari ini. Tanpa kamu, tim ini kurang satu karakter penting."
];
function motivasiHariIni() {
  const d = new Date();
  const n = Math.floor(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / 864e5);
  return MOTIVASI[n % MOTIVASI.length];
}
function sapaan() {
  const j = new Date().getHours();
  return j < 11 ? "Selamat pagi" : j < 15 ? "Selamat siang" : j < 18 ? "Selamat sore" : "Selamat malam";
}
// Muncul sekali per hari setelah login, di setiap perangkat.
function tampilkanMotivasi() {
  const kunci = "spill-motivasi-" + today() + "-" + S.me.id;
  try { if (localStorage.getItem(kunci)) return; } catch (e) {}
  const tutup = () => { try { localStorage.setItem(kunci, "1"); } catch (e) {} ov.remove(); document.removeEventListener("keydown", esc); };
  const esc = e => { if (e.key === "Escape") tutup(); };
  const btn = el("button", { class:"btn", onclick: tutup }, "Gas, mulai!");
  const ov = el("div", { class:"overlay", role:"dialog", "aria-modal":"true", "aria-labelledby":"mot-judul", onclick: e => { if (e.target === ov) tutup(); } },
    el("div", { class:"mot" },
      el("span", { class:"sticker" }, fmt(today(), { weekday:"long", day:"numeric", month:"long" })),
      el("p", { id:"mot-judul", class:"mot-sapa" }, `${sapaan()}, ${S.me.nama}!`),
      el("blockquote", { class:"mot-teks" }, motivasiHariIni()),
      btn));
  document.body.append(ov);
  document.addEventListener("keydown", esc);
  btn.focus();
}
const PERAN_LABEL = { sms:"Social media specialist", kerja:"Marketplace & live / asisten", leader:"Leader" };

/* ================= UTIL ================= */
const z = n => String(n).padStart(2, "0");
const keyOf = d => `${d.getFullYear()}-${z(d.getMonth()+1)}-${z(d.getDate())}`;
const parseKey = k => { const [y,m,d] = k.split("-").map(Number); return new Date(y, m-1, d); };
const addDays = (k, n) => { const d = parseKey(k); d.setDate(d.getDate()+n); return keyOf(d); };
const today = () => keyOf(new Date());
const isWeekend = k => { const g = parseKey(k).getDay(); return g === 0 || g === 6; };
const fmt = (k, o = { weekday:"long", day:"numeric", month:"long" }) => parseKey(k).toLocaleDateString("id-ID", o);
const fmtShort = k => fmt(k, { day:"numeric", month:"short" });
const daysBetween = (a, b) => Math.round((parseKey(b) - parseKey(a)) / 864e5);
const titik = s => { s = (s||"").trim(); return s && !/[.!?]$/.test(s) ? s + "." : s; };
const jam = iso => new Date(iso).toLocaleString("id-ID", { day:"numeric", month:"short", hour:"2-digit", minute:"2-digit" });

function el(tag, attrs = {}, ...kids) {
  if (attrs == null || typeof attrs !== "object" || Array.isArray(attrs) || attrs.nodeType) { kids.unshift(attrs); attrs = {}; }
  const n = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === "class") n.className = v;
    else if (k === "value") n.value = v;
    else if (k.startsWith("on") && typeof v === "function") n.addEventListener(k.slice(2), v);
    else if (v === true) n.setAttribute(k, "");
    else if (v !== false && v != null) n.setAttribute(k, v);
  }
  for (const c of kids.flat(Infinity)) { if (c == null || c === false) continue; n.append(c.nodeType ? c : document.createTextNode(String(c))); }
  return n;
}
// append/replaceChildren bawaan browser menulis null sebagai teks "null"; buang nilai kosong dulu.
for (const fn of ["append", "replaceChildren"]) {
  const asli = Element.prototype[fn];
  Element.prototype[fn] = function (...a) { return asli.apply(this, a.flat(Infinity).filter(x => x != null && x !== false)); };
}
let toastT;
function toast(msg) { const t = document.getElementById("toast"); t.textContent = msg; t.classList.add("show"); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove("show"), 2600); }
async function q(p) { const { data, error } = await p; if (error) throw error; return data; }
function pilihan(opts, { get, set, multi = false, cls = "opts", onChange } = {}) {
  const val = o => typeof o === "object" ? o.v : o;
  const aktif = v => multi ? get().includes(v) : get() === v;
  const g = el("div", { class: cls, role: "group" });
  const sync = () => g.querySelectorAll(".opt").forEach((b, j) => b.setAttribute("aria-pressed", String(aktif(val(opts[j])))));
  opts.forEach(o => {
    const v = val(o);
    g.append(el("button", { type:"button", class:"opt", "aria-pressed": String(aktif(v)), onclick: () => {
      if (multi) { const L = get(); const i = L.indexOf(v); i >= 0 ? L.splice(i, 1) : L.push(v); }
      else set(get() === v && o.toggle ? null : v);
      sync(); onChange && onChange();
    }}, typeof o === "object" ? o.label : v));
  });
  return g;
}
function input(obj, key, attrs = {}) {
  const tag = attrs.multiline ? "textarea" : "input";
  const a = { ...attrs }; delete a.multiline;
  const n = el(tag, { ...a, class: "field" });
  n.value = obj[key] ?? ""; n.addEventListener("input", () => { obj[key] = n.value; });
  return n;
}
// Sandi awal seragam untuk akun baru & reset. Wajib diganti pemiliknya saat pertama masuk.
const SANDI_AWAL = "password";
function genPassword() { return SANDI_AWAL; }
const toEmail = u => { u = u.trim().toLowerCase(); return u.includes("@") ? u : `${u}@${DOMAIN}`; };
async function fnErr(error) {
  try { const b = await error.context.json(); return b.error || error.message; } catch { return error.message || "Terjadi kesalahan."; }
}
function weekBars(vals) {
  return el("div", { class:"week", title:"Energi 7 hari terakhir" }, vals.map((v, i) => {
    const col = v == null ? "var(--line)" : (v <= 2 ? "var(--attn)" : (v >= 4 ? "var(--calm)" : "var(--muted)"));
    return el("i", { class: i === vals.length-1 ? "last" : "", style: `height:${v ? 4 + v*3.6 : 3}px;background:${col}` });
  }));
}

/* ================= STATE ================= */
const S = { session:null, me:null, members:[], items:[], route:"", timDate:null, rekapBulan:null, juaraPeriode:null };
const memberById = id => S.members.find(m => m.id === id);
const namaOf = id => memberById(id)?.nama ?? "?";
const team = () => S.members.filter(m => m.peran !== "leader" && m.aktif);
function itemsFor(m, k) {
  if (!m || m.peran !== "sms") return [];
  const wk = isWeekend(k);
  return S.items.filter(i => i.aktif && (!wk || i.jadwal === "semua"));
}
function pctOf(dc, m, k) {
  const its = itemsFor(m, k);
  if (!its.length) return null;
  if (!dc) return 0;
  if (dc.cuti) return null;
  let done = 0, na = 0;
  its.forEach(i => { const s = dc.items?.[i.id]?.status; if (s === "selesai") done++; else if (s === "tidak_ada") na++; });
  const den = its.length - na;
  return den ? Math.round(done / den * 100) : 100;
}

/* ================= AUTH ================= */
const root = () => document.getElementById("root");
function authShell(...kids) {
  return el("div", { class:"auth" }, el("div", { class:"panel" },
    el("div", { class:"brand" }, logo(), el("span", "Tempat spill kabar harian tim")), ...kids));
}
function renderLogin(pesan = "") {
  const f = { u:"", p:"" };
  let mode = "login";
  const box = el("div");
  function draw() {
    if (mode === "lupa") {
      const msg = el("p", { class:"hint" });
      box.replaceChildren(authShell(
        el("form", { onsubmit: async e => {
          e.preventDefault();
          if (!f.u.trim()) { msg.className = "err"; msg.textContent = "Isi username dulu."; return; }
          await sb.rpc("minta_reset", { p_username: f.u.trim() });
          msg.className = "ok"; msg.textContent = "Permintaan terkirim. Admin akan membuat sandi baru dan mengabarimu lewat WhatsApp.";
        }},
          el("p", { class:"hint" }, "Isi username-mu. Admin akan menerima pemberitahuan dan mengatur sandi baru."),
          el("label", { class:"lbl" }, "Username", input(f, "u", { autocomplete:"username", autocapitalize:"none", spellcheck:"false" })),
          el("button", { class:"btn", type:"submit" }, "Minta reset ke admin"), msg,
          el("button", { class:"btn ghost", type:"button", onclick: () => { mode = "login"; draw(); } }, "Kembali ke halaman masuk"))));
      return;
    }
    const msg = el("p", { class: pesan ? "err" : "hint" }, pesan);
    const btn = el("button", { class:"btn", type:"submit" }, "Masuk");
    box.replaceChildren(authShell(
      el("form", { onsubmit: async e => {
        e.preventDefault();
        if (!f.u.trim() || !f.p) { msg.className = "err"; msg.textContent = "Isi username dan kata sandi."; return; }
        btn.disabled = true; msg.className = "hint"; msg.textContent = "Memeriksa…";
        const { error } = await sb.auth.signInWithPassword({ email: toEmail(f.u), password: f.p });
        btn.disabled = false;
        if (error) { msg.className = "err"; msg.textContent = "Username atau kata sandi salah. Kalau lupa, minta reset ke admin."; return; }
        boot();
      }},
        el("label", { class:"lbl" }, "Username", input(f, "u", { autocomplete:"username", autocapitalize:"none", spellcheck:"false" })),
        el("label", { class:"lbl" }, "Kata sandi", input(f, "p", { type:"password", autocomplete:"current-password" })),
        btn, msg,
        el("button", { class:"btn ghost", type:"button", onclick: () => { mode = "lupa"; draw(); } }, "Lupa kata sandi?"))));
  }
  draw(); root().replaceChildren(box);
}
function renderSetup() {
  const f = { nama:"", u:"", p:"", p2:"" };
  const msg = el("p", { class:"hint" }, "Akun ini menjadi leader dan admin pertama. Username anggota tim yang sudah terdaftar tidak bisa dipakai.");
  const btn = el("button", { class:"btn", type:"submit" }, "Buat akun leader");
  root().replaceChildren(authShell(
    el("h2", { style:"margin-top:16px" }, "Siapkan akun leader"),
    el("form", { onsubmit: async e => {
      e.preventDefault();
      if (f.p !== f.p2) { msg.className = "err"; msg.textContent = "Konfirmasi kata sandi tidak sama."; return; }
      btn.disabled = true; msg.className = "hint"; msg.textContent = "Membuat akun…";
      const { data, error } = await sb.functions.invoke("setup-leader", { body: { nama: f.nama, username: f.u, password: f.p } });
      if (error) { btn.disabled = false; msg.className = "err"; msg.textContent = await fnErr(error); return; }
      const { error: e2 } = await sb.auth.signInWithPassword({ email: toEmail(data.username), password: f.p });
      if (e2) return renderLogin("Akun dibuat. Silakan masuk.");
      boot();
    }},
      el("label", { class:"lbl" }, "Nama", input(f, "nama", { placeholder:"Nama kamu" })),
      el("label", { class:"lbl" }, "Username", input(f, "u", { placeholder:"huruf kecil, contoh: aditya", autocapitalize:"none", spellcheck:"false" })),
      el("label", { class:"lbl" }, "Kata sandi (minimal 8 karakter)", input(f, "p", { type:"password", autocomplete:"new-password" })),
      el("label", { class:"lbl" }, "Ulangi kata sandi", input(f, "p2", { type:"password", autocomplete:"new-password" })),
      btn, msg)));
}

function renderWajibGanti() {
  const f = { p:"", p2:"" };
  const msg = el("p", { class:"hint" }, "Sandimu masih sandi awal dari admin. Ganti dulu dengan sandi milikmu sendiri sebelum mulai, supaya tidak ada orang lain yang bisa masuk ke akunmu.");
  const btn = el("button", { class:"btn", type:"submit" }, "Simpan sandi baru");
  const salah = t => { msg.className = "err"; msg.textContent = t; };
  root().replaceChildren(authShell(
    el("h2", { style:"margin-top:16px" }, `Halo, ${S.me.nama}!`),
    el("form", { onsubmit: async e => {
      e.preventDefault();
      if (f.p.length < 8) return salah("Sandi baru minimal 8 karakter.");
      if (f.p.trim().toLowerCase() === SANDI_AWAL) return salah("Pilih sandi lain, jangan sama dengan sandi awal.");
      if (f.p !== f.p2) return salah("Konfirmasi sandi tidak sama.");
      btn.disabled = true; msg.className = "hint"; msg.textContent = "Menyimpan…";
      const { error } = await sb.auth.updateUser({ password: f.p });
      if (error) { btn.disabled = false; return salah("Gagal menyimpan: " + error.message); }
      await sb.rpc("selesai_ganti_sandi");
      toast("Sandi baru tersimpan");
      boot();
    }},
      msg,
      el("label", { class:"lbl" }, "Sandi baru (minimal 8 karakter)", input(f, "p", { type:"password", autocomplete:"new-password" })),
      el("label", { class:"lbl" }, "Ulangi sandi baru", input(f, "p2", { type:"password", autocomplete:"new-password" })),
      btn,
      el("button", { class:"btn ghost", type:"button", onclick: async () => { await sb.auth.signOut(); boot(); } }, "Keluar"))));
}

/* ================= BOOT & SHELL ================= */
let hashBound = false;
async function boot() {
  try {
    const { data: { session } } = await sb.auth.getSession();
    S.session = session;
    if (!session) {
      const { data: need } = await sb.rpc("perlu_setup");
      return need ? renderSetup() : renderLogin();
    }
    const me = await q(sb.from("members").select("*").eq("user_id", session.user.id).maybeSingle());
    if (!me || !me.aktif) {
      root().replaceChildren(authShell(el("p", { class:"err", style:"margin-top:16px" }, "Akun ini belum terhubung ke anggota tim yang aktif. Hubungi admin."),
        el("button", { class:"btn ghost", style:"margin-top:12px", onclick: async () => { await sb.auth.signOut(); boot(); } }, "Keluar")));
      return;
    }
    S.me = me;
    if (me.wajib_ganti_sandi) return renderWajibGanti();
    await loadBase();
    if (!hashBound) { window.addEventListener("hashchange", route); hashBound = true; }
    route();
    tampilkanMotivasi();
    cekApresiasi();
  } catch (e) {
    console.error(e);
    root().replaceChildren(authShell(el("p", { class:"err", style:"margin-top:16px" }, "Gagal memuat: " + (e.message || e)),
      el("button", { class:"btn ghost", style:"margin-top:12px", onclick: boot }, "Coba lagi")));
  }
}
async function loadBase() {
  const [m, i] = await Promise.all([
    q(sb.from("members").select("*").order("nama")),
    q(sb.from("checklist_items").select("*").order("urutan"))]);
  S.members = m; S.items = i;
}
function tabs() {
  const me = S.me, t = [];
  if (me.peran !== "leader") t.push({ k:"hari", label:"Hari ini", g:"Harian" });
  if (me.peran === "kerja") t.push({ k:"kerja", label:"Papan kerja", g:"Harian" });
  if (me.is_admin) t.push({ k:"tim", label:"Ringkasan tim", g:"Tim" }, { k:"rekap", label:"Rekap checklist", g:"Tim" });
  t.push({ k:"masukan", label:"Kritik & saran", g: me.is_admin ? "Tim" : "Harian" });
  t.push({ k:"juara", label:"Papan juara", g:"Juara & ide" }, { k:"menang", label:"Spill Menang", g:"Juara & ide" }, { k:"ide", label:"Kotak ide", g:"Juara & ide" });
  if (me.peran === "sms" || me.is_admin) t.push({ k:"eksperimen", label:"Eksperimen", g:"Belajar bareng" }, { k:"riset", label:"Riset kompetitor", g:"Belajar bareng" });
  t.push({ k:"modul", label:"Modul belajar", g:"Belajar bareng" });
  t.push({ k:"link", label:"Link kerja", g:"Ruang tim" }, { k:"struktur", label:"Struktur tim", g:"Ruang tim" });
  if (me.is_admin) t.push({ k:"atur", label:"Atur tim", g:"Pengaturan" });
  t.push({ k:"akun", label:"Akun", g:"Pengaturan" });
  return t;
}
// Tiga tab utama di bawah layar HP; sisanya masuk ke halaman Lainnya.
function tabUtama(t) {
  const me = S.me;
  const pilih = me.peran === "leader" ? ["tim", "juara", "masukan"] : me.peran === "kerja" ? ["hari", "kerja", "juara"] : ["hari", "juara", "menang"];
  return pilih.map(k => t.find(x => x.k === k)).filter(Boolean);
}
function parseHash() {
  const h = location.hash.replace(/^#\/?/, "");
  const [r, qs] = h.split("?");
  return { r, p: new URLSearchParams(qs || "") };
}
async function route() {
  const t = tabs();
  let { r } = parseHash();
  if (r !== "lainnya" && !t.find(x => x.k === r)) r = t[0].k;
  S.route = r;
  const main = el("main", { id:"main" }, el("p", { class:"hint" }, "Memuat…"));
  const badges = [];
  const badge = () => { const b = el("span", { class:"badge", hidden:true }); badges.push(b); return b; };
  const grup = [...new Set(t.map(x => x.g))];
  const side = el("aside", { class:"side" },
    el("div", { class:"brand" }, logo()),
    el("nav", { class:"snav" }, grup.map(g => [el("div", { class:"g" }, g),
      t.filter(x => x.g === g).map(x => el("a", { href:"#/" + x.k, class: x.k === r ? "on" : "" }, el("span", x.label), x.k === "masukan" ? badge() : null))])),
    el("div", { class:"me" }, el("span", { class:"av" }, S.me.nama.slice(0, 1).toUpperCase()),
      el("div", el("b", S.me.nama), el("small", PERAN_LABEL[S.me.peran] + (S.me.is_admin ? " · admin" : "")))));
  const utama = tabUtama(t);
  const lainAktif = r === "lainnya" || !utama.find(x => x.k === r);
  const mtabs = el("nav", { class:"mtabs" },
    utama.map(x => el("a", { href:"#/" + x.k, class: x.k === r ? "on" : "" }, { masukan:"Masukan", juara:"Juara", menang:"Menang", kerja:"Kerja" }[x.k] || x.label, x.k === "masukan" ? badge() : null)),
    el("a", { href:"#/lainnya", class: lainAktif ? "on" : "" }, "Lainnya"));
  const mtop = el("header", { class:"mtop" }, logo(), el("span", { class:"who" }, S.me.nama));
  root().replaceChildren(el("div", { class:"shell" }, side, el("div", { class:"col-main" }, mtop, main)), mtabs);
  hitungBelumDibaca().then(n => { if (n > 0) badges.forEach(b => { b.textContent = n; b.hidden = false; }); }).catch(() => {});
  try {
    const v = await VIEWS[r]();
    if (S.route === r) { main.replaceChildren(v); window.scrollTo(0, 0); }
  } catch (e) {
    console.error(e);
    main.replaceChildren(el("div", { class:"panel pad" }, el("p", { class:"err" }, "Gagal memuat: " + (e.message || e)),
      el("button", { class:"btn ghost", style:"margin-top:10px", onclick: route }, "Coba lagi")));
  }
}
async function viewLainnya() {
  const t = tabs(), utama = tabUtama(t).map(x => x.k);
  const warna = ["sky", "yellow", "pink", "orange", "lime", "white"];
  return el("div", { class:"stack" },
    el("div", el("h1", "Lainnya"), el("p", { class:"hint", style:"margin-top:6px" }, S.me.nama + " · " + PERAN_LABEL[S.me.peran] + (S.me.is_admin ? " · admin" : ""))),
    el("div", { class:"tiles" }, t.filter(x => !utama.includes(x.k)).map((x, i) =>
      el("a", { href:"#/" + x.k, class:"tile t-" + warna[i % warna.length] }, el("small", x.g), el("b", x.label)))),
    el("div", el("button", { class:"btn ghost", onclick: async () => { await sb.auth.signOut(); location.hash = ""; boot(); } }, "Keluar")));
}
async function hitungBelumDibaca() {
  if (S.me.peran !== "leader") return 0;
  const { count } = await sb.from("masukan").select("id", { count:"exact", head:true }).eq("status", "baru");
  return count || 0;
}

/* ================= HARI INI ================= */
async function viewHari() {
  const me = S.me, t = today(), wk = isWeekend(t);
  const [ci, dc, riset, dariLeader] = await Promise.all([
    q(sb.from("checkins").select("*").eq("member_id", me.id).eq("tanggal", t).maybeSingle()),
    q(sb.from("daily_checklists").select("*").eq("member_id", me.id).eq("tanggal", t).maybeSingle()),
    me.peran === "sms" ? q(sb.from("riset_kompetitor").select("*").eq("member_id", me.id).eq("tanggal", t).maybeSingle()) : null,
    q(sb.from("messages").select("*").eq("member_id", me.id).neq("author_id", me.id).gte("created_at", parseKey(addDays(t, -6)).toISOString()).order("created_at", { ascending:false }).limit(3))]);
  const belumDibaca = dariLeader.filter(m => !m.dibaca).map(m => m.id);
  if (belumDibaca.length) sb.from("messages").update({ dibaca:true }).in("id", belumDibaca).then(() => {});
  return el("div", { class:"stack" },
    el("div", { class:"page-head" },
      el("div", el("h1", `Halo, ${me.nama}!`), el("p", { class:"hint" }, fmt(t) + (wk ? " · akhir pekan" : ""))),
      el("span", { class:"sticker" }, wk ? "Akhir pekan" : ci ? "Sudah check-in" : "Belum check-in")),
    el("div", { class:"mot-mini" }, el("small", "Motivasi hari ini"), el("p", motivasiHariIni())),
    dariLeader.length ? el("section", { class:"panel pad stack", style:"gap:10px" },
      el("div", { class:"row between" }, el("h2", "Dari leader"), belumDibaca.length ? el("span", { class:"chip attn" }, belumDibaca.length + " baru") : null),
      dariLeader.map(m => el("div", { class:"bub" + (m.jenis === "apresiasi" ? " appr" : ""), style:"max-width:100%" },
        el("small", namaOf(m.author_id) + " · " + jam(m.created_at) + (m.jenis === "apresiasi" ? " · apresiasi" : m.jenis === "1on1" ? " · ajakan 1:1" : "")), m.body))) : null,
    wk ? el("div", { class:"note" }, "Akhir pekan: tidak ada check-in. " + (me.peran === "sms" ? "Cukup centang Story hari ini." : "Tidak ada checklist wajib.")) : checkinCard(ci, t),
    checklistCard(dc, t, wk, riset));
}

function checkinCard(ci, t) {
  const me = S.me;
  const box = el("section", { class:"panel pad stack" });
  const blank = () => ({ energi:null, pelajaran:"", fokus:"", langkah:"", hambatan:null, butuh:"", dari:"", sebelum:"" });
  let f = blank(), editing = !ci, err = "";
  function q2(no, judul, sub, ...body) {
    return el("fieldset", { class:"q" }, el("legend", el("span", { class:"no" }, String(no)), el("span", judul)), sub ? el("p", { class:"hint" }, sub) : null, ...body);
  }
  async function kirim(btn) {
    const kurang = [];
    if (!f.energi) kurang.push("energi");
    if (!f.fokus.trim()) kurang.push("fokus hari ini");
    if (!f.hambatan) kurang.push("hambatan");
    if (kurang.length) { err = "Belum diisi: " + kurang.join(", ") + "."; return draw(); }
    const bantuan = (f.hambatan !== "Tidak ada hambatan" && f.butuh.trim())
      ? titik(`Saya butuh ${f.butuh.trim()}${f.dari.trim() ? " dari " + f.dari.trim() : ""}${f.sebelum.trim() ? " sebelum " + f.sebelum.trim() : ""}`) : (f.bantuanLama || "");
    const fokus = f.fokus.trim();
    const p = [f.energi <= 2 ? `Energi rendah (${f.energi}/5).` : `Energi ${f.energi}/5.`];
    if (f.hambatan !== "Tidak ada hambatan") p.push(`Hambatan: ${f.hambatan.toLowerCase()}.`);
    p.push("Fokus: " + titik(fokus));
    const data = { member_id: me.id, tanggal: t, energi: f.energi, pelajaran: f.pelajaran.trim(), fokus, langkah: f.langkah.trim(),
      hambatan: f.hambatan, bantuan, ringkasan: p.join(" "), updated_at: new Date().toISOString() };
    btn.disabled = true;
    try { await q(sb.from("checkins").upsert(data)); ci = data; editing = false; err = ""; toast("Check-in terkirim. Terima kasih!"); }
    catch (e) { err = "Gagal menyimpan: " + e.message; btn.disabled = false; }
    draw();
  }
  function draw() {
    if (!editing && ci) {
      const baris = (l, v) => v ? el("div", { class:"line" }, el("span", { class:"hint" }, l), el("span", v)) : null;
      box.replaceChildren(
        el("div", { class:"row between" }, el("h2", "Check-in pagi"), el("span", { class:"chip calm" }, "Terkirim")),
        el("div", { class:"note" }, ci.ringkasan),
        el("div", { class:"mini" }, baris("Energi", ci.energi + "/5 · " + ENERGI[ci.energi-1]), baris("Fokus", ci.fokus), baris("Langkah pertama", ci.langkah),
          baris("Pelajaran", ci.pelajaran), baris("Hambatan", ci.hambatan), baris("Bantuan", ci.bantuan)),
        el("div", el("button", { class:"btn ghost sm", onclick: () => {
          f = { ...blank(), energi: ci.energi, pelajaran: ci.pelajaran, fokus: ci.fokus, langkah: ci.langkah, hambatan: ci.hambatan, bantuanLama: ci.bantuan };
          editing = true; draw(); } }, "Ubah jawaban")));
      return;
    }
    const panduan = el("div", { class:"note", hidden: !PANDUAN[f.hambatan] }, PANDUAN[f.hambatan] || "");
    const bantuan = el("div", { class:"stack", style:"gap:8px", hidden: !f.hambatan || f.hambatan === "Tidak ada hambatan" },
      el("p", { class:"hint" }, f.bantuanLama ? "Permintaan sebelumnya: " + f.bantuanLama + " Isi lagi kalau ingin mengganti." : "Butuh bantuan? Isi kalau perlu, boleh dikosongkan."),
      el("div", { class:"help-row" },
        el("label", { class:"lbl" }, "Saya butuh", input(f, "butuh", { placeholder:"contoh: aset ilustrasi" })),
        el("label", { class:"lbl" }, "dari", input(f, "dari", { placeholder:"contoh: tim desain" })),
        el("label", { class:"lbl" }, "sebelum", input(f, "sebelum", { placeholder:"contoh: Kamis siang" }))));
    const btn = el("button", { type:"submit", class:"btn" }, ci ? "Simpan perubahan" : "Kirim check-in");
    box.replaceChildren(el("form", { class:"stack", onsubmit: e => { e.preventDefault(); kirim(btn); } },
      el("div", el("h2", "Check-in pagi"), el("p", { class:"hint" }, "Sekitar 2 menit. Leader membaca ringkasannya untuk tahu siapa yang perlu dibantu, bukan untuk menilai.")),
      q2(1, "Energimu hari ini *", null, pilihan(ENERGI.map((l, i) => ({ v: i+1, label: [el("b", String(i+1)), el("small", l)] })), { get: () => f.energi, set: v => f.energi = v, cls:"opts energy" })),
      q2(2, "Fokus hari ini *", "Maksimal tiga hal, lalu langkah pertamanya.",
        input(f, "fokus", { multiline:true, rows:"2", placeholder:"Contoh: edit ulang video deret, buat 2 carousel ringkasan TWK" }),
        el("label", { class:"lbl" }, "Langkah pertama dan jam mulai", input(f, "langkah", { placeholder:"Contoh: jam 09.00 potong hook video deret" }))),
      q2(3, "Satu pelajaran dari kemarin", "Kalau mengulang kemarin, apa yang akan kamu lakukan berbeda?",
        input(f, "pelajaran", { multiline:true, rows:"2", placeholder:"Contoh: hook saya terlalu panjang, hari ini saya potong jadi 2 detik" })),
      q2(4, "Ada yang bikin macet? *", null, pilihan(HAMBATAN, { get: () => f.hambatan, set: v => f.hambatan = v, onChange: () => {
        panduan.textContent = PANDUAN[f.hambatan] || ""; panduan.hidden = !PANDUAN[f.hambatan]; bantuan.hidden = f.hambatan === "Tidak ada hambatan"; } }), panduan, bantuan),
      el("div", { class:"row" }, btn, ci ? el("button", { type:"button", class:"btn ghost", onclick: () => { editing = false; err = ""; draw(); } }, "Batal") : null),
      err ? el("p", { class:"err", role:"alert" }, err) : null));
  }
  draw();
  return box;
}

function checklistCard(dc, t, wk, risetRow) {
  const me = S.me;
  const items = itemsFor(me, t);
  const st = { cuti: dc?.cuti || false, items: { ...(dc?.items || {}) }, tambahan: [...(dc?.tambahan || [])], catatan: dc?.catatan || "" };
  const box = el("section", { class:"panel pad stack" });
  const status = el("span", { class:"hint" }, dc ? "Tersimpan" : "");
  let timer, risetOpen = false;
  const rs = { kompetitor: (risetRow?.kompetitor || []).join(", "), platform: [...(risetRow?.platform || [])], temuan: risetRow?.temuan || "", ide: risetRow?.ide || "", err:"" };
  function save(now) {
    clearTimeout(timer);
    status.textContent = "Menyimpan…";
    timer = setTimeout(async () => {
      const { error } = await sb.from("daily_checklists").upsert({ member_id: me.id, tanggal: t, ...st, updated_at: new Date().toISOString() });
      status.textContent = error ? "Gagal menyimpan, coba lagi" : "Tersimpan";
      status.className = error ? "err" : "hint";
    }, now ? 0 : 600);
  }
  function setItem(id, s) { if (s) st.items[id] = { status: s }; else delete st.items[id]; save(); draw(); }
  async function simpanRiset(btn) {
    const komp = rs.kompetitor.split(/[,\n]/).map(x => x.trim()).filter(Boolean);
    if (komp.length < 3) { rs.err = "Tulis minimal 3 kompetitor, pisahkan dengan koma."; return draw(); }
    if (!rs.temuan.trim()) { rs.err = "Isi temuan singkatnya dulu."; return draw(); }
    btn.disabled = true;
    try {
      await q(sb.from("riset_kompetitor").upsert({ member_id: me.id, tanggal: t, kompetitor: komp, platform: rs.platform, temuan: rs.temuan.trim(), ide: rs.ide.trim() }, { onConflict:"member_id,tanggal" }));
      risetRow = { kompetitor: komp, platform: [...rs.platform], temuan: rs.temuan.trim(), ide: rs.ide.trim() };
      rs.err = ""; risetOpen = false; toast("Hasil riset masuk ke Bank Riset Kompetitor");
      setItem("riset", "selesai");
    } catch (e) { rs.err = "Gagal menyimpan: " + e.message; btn.disabled = false; draw(); }
  }
  function risetForm() {
    const btn = el("button", { type:"button", class:"btn sm" }, "Simpan hasil riset");
    btn.onclick = () => simpanRiset(btn);
    return el("div", { class:"subform" },
      el("label", { class:"lbl" }, "Kompetitor yang dicek (minimal 3, pisahkan dengan koma) *", input(rs, "kompetitor", { placeholder:"Contoh: Alfaiz, Sobat CPNS, Viracun" })),
      el("div", { class:"lbl" }, "Platform", pilihan(PLATFORM, { get: () => rs.platform, multi:true })),
      el("label", { class:"lbl" }, "Temuan singkat *", input(rs, "temuan", { multiline:true, rows:"3", placeholder:"1–3 kalimat: apa yang mereka lakukan?" })),
      el("label", { class:"lbl" }, "Ide untuk kita (opsional)", input(rs, "ide", { multiline:true, rows:"2", placeholder:"Apa yang bisa kita tiru, adaptasi, atau hindari?" })),
      el("div", { class:"row" }, btn, el("button", { type:"button", class:"btn ghost sm", onclick: () => { risetOpen = false; rs.err = ""; draw(); } }, "Tutup")),
      rs.err ? el("p", { class:"err" }, rs.err) : null);
  }
  function itemRow(it) {
    const cur = st.items[it.id]?.status || "";
    const row = el("div", { class:"item " + cur },
      el("div", { class:"item-top" },
        el("div", { class:"item-label" }, it.label),
        el("div", { class:"item-acts" },
          el("button", { type:"button", class:"tog" + (cur === "selesai" ? " on-done" : ""), "aria-pressed": String(cur === "selesai"), onclick: () => {
            if (it.perlu_catatan && cur !== "selesai") { risetOpen = true; return draw(); }
            setItem(it.id, cur === "selesai" ? "" : "selesai"); } }, "Selesai"),
          el("button", { type:"button", class:"tog" + (cur === "tidak_ada" ? " on-na" : ""), "aria-pressed": String(cur === "tidak_ada"), title:"Tidak ada yang perlu dikerjakan hari ini",
            onclick: () => setItem(it.id, cur === "tidak_ada" ? "" : "tidak_ada") }, "Tidak ada"))));
    if (it.perlu_catatan) {
      if (risetOpen) row.append(risetForm());
      else if (cur === "selesai" && risetRow) row.append(el("div", { class:"subform" },
        el("div", { class:"row" }, risetRow.kompetitor.map(k => el("span", { class:"chip brand" }, k)), (risetRow.platform || []).map(p => el("span", { class:"chip" }, p))),
        el("p", { style:"font-size:14px" }, risetRow.temuan),
        risetRow.ide ? el("p", { class:"hint" }, "Ide: " + risetRow.ide) : null,
        el("div", el("button", { type:"button", class:"btn ghost sm", onclick: () => { risetOpen = true; draw(); } }, "Ubah hasil riset"))));
    }
    return row;
  }
  function draw() {
    const pct = pctOf({ ...st }, me, t);
    const head = el("div", { class:"row between" },
      el("div", el("h2", items.length ? "Checklist hari ini" : "Tugas tambahan hari ini"),
        el("p", { class:"hint" }, items.length ? "\"Tidak ada\" dipakai kalau memang tidak ada yang perlu dikerjakan, dan tidak mengurangi persentase." : (me.peran === "kerja" ? "Pekerjaan utama dicatat di Papan kerja. Di sini untuk tugas kecil harian." : ""))),
      status);
    const kids = [head];
    if (!wk) kids.push(el("label", { class:"row", style:"font-size:14px;font-weight:600" },
      el("input", { type:"checkbox", style:"width:18px;height:18px;accent-color:var(--brand)", ...(st.cuti ? { checked:true } : {}), onchange: e => { st.cuti = e.target.checked; save(true); draw(); } }),
      "Saya cuti / izin hari ini"));
    if (st.cuti) kids.push(el("div", { class:"note warn" }, "Tercatat cuti atau izin. Hari ini tidak dihitung dalam persentase checklist."));
    else {
      if (items.length) {
        kids.push(el("div", { class:"row between" }, el("span", { class:"hint" }, "Progres"), el("b", (pct ?? 0) + "%")),
          el("div", { class:"progress" }, el("i", { style:`width:${pct ?? 0}%` })),
          el("div", items.map(itemRow)));
      }
      const baru = { v:"" };
      const inp = input(baru, "v", { placeholder:"Tambah tugas lain hari ini…" });
      const tambah = () => { if (!baru.v.trim()) return; st.tambahan.push({ judul: baru.v.trim(), selesai:false }); save(); draw(); };
      inp.addEventListener("keydown", e => { if (e.key === "Enter") { e.preventDefault(); tambah(); } });
      kids.push(el("div", { class:"stack", style:"gap:4px" },
        items.length ? el("h3", { style:"margin-top:6px" }, "Tugas tambahan") : null,
        st.tambahan.map((x, i) => el("div", { class:"extra" + (x.selesai ? " done" : "") },
          el("input", { type:"checkbox", ...(x.selesai ? { checked:true } : {}), onchange: e => { x.selesai = e.target.checked; save(); draw(); } }),
          el("span", x.judul),
          el("button", { type:"button", class:"btn danger sm", onclick: () => { st.tambahan.splice(i, 1); save(); draw(); } }, "Hapus"))),
        el("div", { class:"row", style:"margin-top:8px;flex-wrap:nowrap" }, inp, el("button", { type:"button", class:"btn sm", onclick: tambah }, "Tambah"))));
    }
    kids.push(el("label", { class:"lbl" }, "Keterangan (opsional)", (() => { const n = input(st, "catatan", { multiline:true, rows:"2", placeholder:"Catatan tambahan untuk hari ini" }); n.addEventListener("input", () => save()); return n; })()));
    box.replaceChildren(...kids);
  }
  draw();
  return box;
}

/* ================= EKSPERIMEN ================= */
const STATUS_EXP = [["ide","Ide"],["berjalan","Berjalan"],["selesai","Selesai"]];
const HASIL = [{ v:"a", label:"Varian A lebih baik" },{ v:"b", label:"Varian B lebih baik" },{ v:"seri", label:"Hasilnya mirip" },{ v:"belum_jelas", label:"Belum jelas" }];
function matangInfo(x) {
  if (!x.tanggal_tayang) return null;
  const u = daysBetween(x.tanggal_tayang, today());
  if (u < 0) return el("span", { class:"chip" }, "Tayang " + fmtShort(x.tanggal_tayang));
  if (u < 7) return el("span", { class:"chip brand" }, `Data matang dalam ${7-u} hari`);
  return el("span", { class:"chip calm" }, "Data sudah matang");
}
async function viewEksperimen() {
  const me = S.me;
  let rows = await q(sb.from("experiments").select("*").order("updated_at", { ascending:false }));
  let filter = me.peran === "sms" ? "saya" : "semua", sel = null, msg = "";
  const box = el("div", { class:"stack" });
  const canEdit = x => x.member_id === me.id || me.is_admin;
  async function reload() { rows = await q(sb.from("experiments").select("*").order("updated_at", { ascending:false })); }

  function editor(x) {
    const baru = !x.id;
    const f = { judul:"", variabel:"", hipotesis:"", varian_a:"", varian_b:"", format:"", platform:"", tanggal_tayang:"", status:"ide", hasil:"", hasil_catatan:"", pelajaran:"", ide_lanjutan:"", ...x };
    f.tanggal_tayang = f.tanggal_tayang || "";
    const edit = baru || canEdit(x);
    let err = "";
    const wrap = el("section", { class:"panel pad stack" });
    async function simpan(statusBaru) {
      const st = statusBaru || f.status;
      if (!f.judul.trim()) { err = "Judul eksperimen wajib diisi."; return draw(); }
      if (st === "selesai" && (!f.hasil || !f.pelajaran.trim())) { err = "Untuk menandai selesai, pilih hasil dan tulis pelajarannya."; return draw(); }
      const data = { judul: f.judul.trim(), variabel: f.variabel.trim(), hipotesis: f.hipotesis.trim(), varian_a: f.varian_a.trim(), varian_b: f.varian_b.trim(),
        format: f.format || "", platform: f.platform || "", tanggal_tayang: f.tanggal_tayang || null, status: st, hasil: f.hasil || "",
        hasil_catatan: f.hasil_catatan.trim(), pelajaran: f.pelajaran.trim(), ide_lanjutan: f.ide_lanjutan.trim(), updated_at: new Date().toISOString() };
      try {
        if (baru) { const r = await q(sb.from("experiments").insert({ ...data, member_id: me.id, dari_id: x.dari_id || null }).select().single()); sel = r.id; }
        else await q(sb.from("experiments").update(data).eq("id", x.id));
        await reload(); toast("Eksperimen tersimpan"); draw0();
      } catch (e) { err = "Gagal menyimpan: " + e.message; draw(); }
    }
    function draw() {
      const ro = (l, v) => v ? el("div", { class:"line" }, el("span", { class:"hint" }, l), el("span", v)) : null;
      if (!edit) {
        wrap.replaceChildren(
          el("div", { class:"row between" }, el("h2", f.judul), el("button", { class:"btn ghost sm", onclick: () => { sel = null; draw0(); } }, "Tutup")),
          el("p", { class:"hint" }, "Oleh " + namaOf(x.member_id)),
          el("div", { class:"mini" }, ro("Variabel diuji", f.variabel), ro("Hipotesis", f.hipotesis), ro("Varian A", f.varian_a), ro("Varian B", f.varian_b),
            ro("Format", f.format), ro("Platform", f.platform), ro("Tanggal tayang", f.tanggal_tayang ? fmt(f.tanggal_tayang) : ""),
            ro("Hasil", HASIL.find(h => h.v === f.hasil)?.label), ro("Catatan angka", f.hasil_catatan), ro("Pelajaran", f.pelajaran), ro("Ide lanjutan", f.ide_lanjutan)));
        return;
      }
      const btns = [];
      if (f.status === "ide") btns.push(el("button", { type:"button", class:"btn", onclick: () => simpan(baru ? "ide" : null) }, "Simpan"), el("button", { type:"button", class:"btn ghost", onclick: () => simpan("berjalan") }, "Simpan & mulai jalan"));
      if (f.status === "berjalan") btns.push(el("button", { type:"button", class:"btn", onclick: () => simpan() }, "Simpan"), el("button", { type:"button", class:"btn ghost", onclick: () => { f.status = "selesai"; err = ""; draw(); } }, "Isi hasil & tandai selesai"));
      if (f.status === "selesai") btns.push(el("button", { type:"button", class:"btn", onclick: () => simpan("selesai") }, "Simpan hasil"));
      const umur = f.tanggal_tayang ? daysBetween(f.tanggal_tayang, today()) : null;
      wrap.replaceChildren(
        el("div", { class:"row between" }, el("h2", baru ? (x.dari_id ? "Eksperimen lanjutan" : "Eksperimen baru") : "Detail eksperimen"),
          el("button", { class:"btn ghost sm", onclick: () => { sel = null; draw0(); } }, "Tutup")),
        !baru ? el("p", { class:"hint" }, "Oleh " + namaOf(x.member_id) + " · status: " + STATUS_EXP.find(s => s[0] === f.status)[1]) : null,
        el("label", { class:"lbl" }, "Judul *", input(f, "judul", { placeholder:"Contoh: Hook pertanyaan vs hook angka di video TIU" })),
        el("label", { class:"lbl" }, "Variabel yang diuji", input(f, "variabel", { placeholder:"Contoh: kalimat pembuka 3 detik pertama" }),
          el("span", { class:"hint", style:"font-weight:400" }, "Ubah satu hal saja antara A dan B, supaya hasilnya bisa dipercaya.")),
        el("label", { class:"lbl" }, "Hipotesis", input(f, "hipotesis", { multiline:true, rows:"2", placeholder:"Contoh: hook berupa pertanyaan akan membuat lebih banyak orang menonton sampai habis" })),
        el("div", { class:"grid2" },
          el("label", { class:"lbl" }, "Varian A", input(f, "varian_a", { multiline:true, rows:"2" })),
          el("label", { class:"lbl" }, "Varian B", input(f, "varian_b", { multiline:true, rows:"2" }))),
        el("div", { class:"lbl" }, "Format", pilihan(FORMAT.map(v => ({ v, label:v, toggle:true })), { get: () => f.format, set: v => f.format = v || "" })),
        el("div", { class:"lbl" }, "Platform", pilihan(PLATFORM.map(v => ({ v, label:v, toggle:true })), { get: () => f.platform, set: v => f.platform = v || "" })),
        el("label", { class:"lbl", style:"max-width:240px" }, "Tanggal tayang", input(f, "tanggal_tayang", { type:"date" })),
        f.status === "selesai" ? el("div", { class:"subform" },
          umur != null && umur < 7 ? el("div", { class:"note warn" }, `Konten baru tayang ${Math.max(umur,0)} hari. Angkanya mungkin belum matang (idealnya H+7).`) : null,
          el("div", { class:"lbl" }, "Hasil *", pilihan(HASIL, { get: () => f.hasil, set: v => f.hasil = v })),
          el("label", { class:"lbl" }, "Catatan angka", input(f, "hasil_catatan", { multiline:true, rows:"2", placeholder:"Contoh: A 4,1% save rate, B 2,3%" })),
          el("label", { class:"lbl" }, "Pelajaran *", input(f, "pelajaran", { multiline:true, rows:"2", placeholder:"Apa yang kita pelajari tentang audiens?" })),
          el("label", { class:"lbl" }, "Ide lanjutan", input(f, "ide_lanjutan", { multiline:true, rows:"2", placeholder:"Eksperimen apa berikutnya?" }))) : null,
        el("div", { class:"row" }, btns,
          !baru && f.status === "selesai" && x.ide_lanjutan ? el("button", { type:"button", class:"btn ghost", onclick: () => { sel = { dari_id: x.id, judul: x.ide_lanjutan.slice(0, 140) }; draw0(); } }, "Jadikan eksperimen baru") : null,
          !baru ? el("button", { type:"button", class:"btn danger", onclick: async () => {
            if (!confirm("Hapus eksperimen ini?")) return;
            try { await q(sb.from("experiments").delete().eq("id", x.id)); await reload(); sel = null; draw0(); } catch (e) { toast("Gagal menghapus"); } } }, "Hapus") : null),
        err ? el("p", { class:"err", role:"alert" }, err) : null);
    }
    draw();
    return wrap;
  }

  function draw0() {
    const list = rows.filter(x => filter === "semua" || x.member_id === me.id);
    const kartu = x => el("button", { class:"card", onclick: () => { sel = x.id; draw0(); window.scrollTo({ top:0, behavior:"smooth" }); } },
      el("span", { class:"t" }, x.judul),
      el("span", { class:"m" }, namaOf(x.member_id) + (x.format ? " · " + x.format : "") + (x.platform ? " · " + x.platform : "")),
      el("div", { class:"row", style:"gap:6px" },
        x.status === "berjalan" ? matangInfo(x) : null,
        x.status === "selesai" && x.hasil ? el("span", { class:"chip " + (x.hasil === "a" || x.hasil === "b" ? "appr" : "") }, HASIL.find(h => h.v === x.hasil).label) : null),
      x.status === "selesai" && x.pelajaran ? el("span", { class:"m" }, "Pelajaran: " + x.pelajaran) : null);
    const selected = sel == null ? null : (typeof sel === "object" ? sel : rows.find(r => r.id === sel));
    box.replaceChildren(
      el("div", { class:"page-head" },
        el("div", el("h1", "Papan eksperimen"), el("p", { class:"hint" }, "Uji satu hal, tunggu datanya matang, catat pelajarannya. Semua tim bisa saling belajar dari papan ini.")),
        el("div", { class:"row" },
          pilihan([{ v:"saya", label:"Milik saya" }, { v:"semua", label:"Semua tim" }], { get: () => filter, set: v => { filter = v; }, onChange: draw0 }),
          el("button", { class:"btn", onclick: () => { sel = {}; draw0(); } }, "+ Eksperimen baru"))),
      selected ? editor(selected) : null,
      el("div", { class:"board" }, STATUS_EXP.map(([k, label]) => {
        const xs = list.filter(x => x.status === k);
        return el("div", { class:"col" }, el("div", { class:"col-head" }, el("span", label), el("span", { class:"hint" }, String(xs.length))),
          xs.length ? xs.map(kartu) : el("p", { class:"empty" }, "Kosong"));
      })));
  }
  draw0();
  return box;
}

/* ================= PAPAN KERJA ================= */
const STATUS_TASK = [["akan","Akan dikerjakan"],["sedang","Sedang dikerjakan"],["sudah","Sudah selesai"]];
async function viewKerja() {
  const me = S.me;
  let rows = await q(sb.from("tasks").select("*").eq("member_id", me.id).order("updated_at", { ascending:false }));
  const box = el("div", { class:"stack" });
  const f = { judul:"", catatan:"" };
  let open = null;
  async function reload() { rows = await q(sb.from("tasks").select("*").eq("member_id", me.id).order("updated_at", { ascending:false })); draw(); }
  async function pindah(x, dir) {
    const i = STATUS_TASK.findIndex(s => s[0] === x.status) + dir;
    if (i < 0 || i > 2) return;
    const st = STATUS_TASK[i][0];
    await q(sb.from("tasks").update({ status: st, updated_at: new Date().toISOString(), selesai_at: st === "sudah" ? new Date().toISOString() : null }).eq("id", x.id));
    reload();
  }
  function draw() {
    const judulIn = input(f, "judul", { placeholder:"Apa yang akan dikerjakan?" });
    const tambah = async () => {
      if (!f.judul.trim()) return;
      await q(sb.from("tasks").insert({ member_id: me.id, judul: f.judul.trim(), catatan: f.catatan.trim(), status: "akan" }));
      f.judul = ""; f.catatan = ""; toast("Tugas ditambahkan"); reload();
    };
    judulIn.addEventListener("keydown", e => { if (e.key === "Enter") { e.preventDefault(); tambah(); } });
    const minggu = addDays(today(), -7);
    box.replaceChildren(
      el("div", el("h1", "Papan kerja"), el("p", { class:"hint" }, "Catat yang akan, sedang, dan sudah kamu kerjakan. Leader bisa melihat papan ini untuk tahu di mana kamu butuh bantuan.")),
      el("section", { class:"panel pad stack", style:"gap:10px" },
        el("div", { class:"grid2" }, judulIn, input(f, "catatan", { placeholder:"Catatan singkat (opsional)" })),
        el("div", el("button", { class:"btn", onclick: tambah }, "+ Tambah ke Akan dikerjakan"))),
      el("div", { class:"board" }, STATUS_TASK.map(([k, label], ci) => {
        let xs = rows.filter(x => x.status === k);
        if (k === "sudah") xs = xs.filter(x => !x.selesai_at || x.selesai_at.slice(0, 10) >= minggu);
        return el("div", { class:"col" }, el("div", { class:"col-head" }, el("span", label), el("span", { class:"hint" }, String(xs.length))),
          k === "sudah" ? el("p", { class:"hint", style:"padding:0 4px" }, "Menampilkan 7 hari terakhir") : null,
          xs.length ? xs.map(x => el("div", { class:"card" },
            el("span", { class:"t" }, x.judul),
            x.catatan ? el("span", { class:"m" }, x.catatan) : null,
            el("span", { class:"m" }, "Diperbarui " + jam(x.updated_at)),
            el("div", { class:"row", style:"gap:6px" },
              ci > 0 ? el("button", { class:"btn ghost sm", onclick: () => pindah(x, -1) }, "←") : null,
              ci < 2 ? el("button", { class:"btn sm", onclick: () => pindah(x, 1) }, ci === 0 ? "Mulai →" : "Selesai →") : null,
              el("button", { class:"btn danger sm", onclick: async () => { if (!confirm("Hapus tugas ini?")) return; await q(sb.from("tasks").delete().eq("id", x.id)); reload(); } }, "Hapus"))))
            : el("p", { class:"empty" }, "Kosong"));
      })));
  }
  draw();
  return box;
}

/* ================= RISET KOMPETITOR ================= */
async function viewRiset() {
  const rows = await q(sb.from("riset_kompetitor").select("*").order("tanggal", { ascending:false }).order("created_at", { ascending:false }).limit(300));
  let cari = "", plat = null;
  const box = el("div", { class:"stack" });
  const hitung = {};
  rows.forEach(r => r.kompetitor.forEach(k => { const n = k.trim(); const key = n.toLowerCase(); hitung[key] = hitung[key] || { n, c:0 }; hitung[key].c++; }));
  const top = Object.values(hitung).sort((a, b) => b.c - a.c).slice(0, 10);
  const list = el("div", { class:"stack", style:"gap:12px" });
  function drawList() {
    const s = cari.trim().toLowerCase();
    const xs = rows.filter(r => (!plat || r.platform.includes(plat)) &&
      (!s || r.kompetitor.join(" ").toLowerCase().includes(s) || r.temuan.toLowerCase().includes(s) || r.ide.toLowerCase().includes(s)));
    list.replaceChildren(...(xs.length ? xs.map(r => el("article", { class:"panel pad stack", style:"gap:8px" },
      el("div", { class:"row between" }, el("b", namaOf(r.member_id)), el("span", { class:"hint" }, fmt(r.tanggal))),
      el("div", { class:"row", style:"gap:6px" }, r.kompetitor.map(k => el("span", { class:"chip brand" }, k)), r.platform.map(p => el("span", { class:"chip" }, p))),
      el("p", { style:"white-space:pre-wrap" }, r.temuan),
      r.ide ? el("div", { class:"note" }, el("b", "Ide untuk kita: "), r.ide) : null)) : [el("p", { class:"empty" }, rows.length ? "Tidak ada riset yang cocok." : "Belum ada riset. Hasil riset dari checklist harian akan muncul di sini.")]));
  }
  const cariIn = el("input", { class:"field", placeholder:"Cari kompetitor atau isi temuan…", style:"max-width:360px" });
  cariIn.addEventListener("input", () => { cari = cariIn.value; drawList(); });
  box.append(
    el("div", el("h1", "Bank Riset Kompetitor"), el("p", { class:"hint" }, "Kumpulan hasil riset 30 menit dari seluruh tim. Cek di sini sebelum meriset, supaya tidak mengulang hal yang sama.")),
    top.length ? el("div", { class:"row", style:"gap:6px" }, el("span", { class:"hint" }, "Paling sering diriset:"),
      top.map(t => el("button", { class:"opt", onclick: () => { cariIn.value = t.n; cari = t.n; drawList(); } }, `${t.n} (${t.c})`))) : null,
    el("div", { class:"row" }, cariIn, pilihan(PLATFORM.map(v => ({ v, label:v, toggle:true })), { get: () => plat, set: v => plat = v, onChange: drawList })),
    list);
  drawList();
  return box;
}

/* ================= PESAN DARI LEADER ================= */
async function kirimPesan(memberId, body, jenis = "pesan") {
  await q(sb.from("messages").insert({ member_id: memberId, author_id: S.me.id, body, jenis }));
}

/* ================= KRITIK & SARAN (ANONIM) ================= */
const JENIS_MASUKAN = [{ v:"kritik", label:"Kritik" }, { v:"saran", label:"Saran" }, { v:"apresiasi", label:"Apresiasi" }];
const warnaJenis = { kritik:"attn", saran:"brand", apresiasi:"appr" };
function kartuTanggapan(x) {
  return el("article", { class:"panel pad stack", style:"gap:8px" },
    el("div", { class:"row between" }, el("span", { class:"chip " + warnaJenis[x.jenis] }, JENIS_MASUKAN.find(j => j.v === x.jenis).label), el("span", { class:"hint" }, fmt(x.tanggal))),
    el("p", { style:"white-space:pre-wrap" }, x.isi),
    x.tanggapan ? el("div", { class:"note" }, el("b", "Tanggapan leader: "), x.tanggapan) : null);
}
async function viewMasukan() {
  if (S.me.peran === "leader") return viewMasukanLeader();
  const publik = await q(sb.from("masukan").select("*").eq("publik", true).order("tanggal", { ascending:false }).order("id", { ascending:false }).limit(50));
  const f = { jenis:null, isi:"" };
  const msg = el("p", { class:"hint" });
  const ta = input(f, "isi", { multiline:true, rows:"5", placeholder:"Tulis apa saja: cara kerja tim, cara leader memimpin, beban kerja, ide perbaikan, atau hal yang menurutmu sudah bagus." });
  const btn = el("button", { class:"btn", type:"submit" }, "Kirim secara anonim");
  const form = el("form", { class:"panel pad stack", style:"gap:14px", onsubmit: async e => {
    e.preventDefault();
    if (!f.jenis) { msg.className = "err"; msg.textContent = "Pilih dulu: kritik, saran, atau apresiasi."; return; }
    if (f.isi.trim().length < 5) { msg.className = "err"; msg.textContent = "Tulis sedikit lebih panjang ya."; return; }
    btn.disabled = true;
    const { error } = await sb.rpc("kirim_masukan", { p_jenis: f.jenis, p_isi: f.isi.trim() });
    btn.disabled = false;
    if (error) { msg.className = "err"; msg.textContent = "Gagal mengirim: " + error.message; return; }
    f.isi = ""; ta.value = ""; msg.className = "ok"; msg.textContent = "Terkirim secara anonim. Makasih sudah jujur!";
    toast("Masukan terkirim");
  }},
    el("div", { class:"lbl" }, "Jenis masukan", pilihan(JENIS_MASUKAN, { get: () => f.jenis, set: v => f.jenis = v })),
    el("label", { class:"lbl" }, "Isi masukan", ta),
    el("div", { class:"row" }, btn), msg);
  return el("div", { class:"stack" },
    el("div", el("h1", "Kritik & saran"), el("p", { class:"hint", style:"margin-top:6px" }, "Untuk leader. Sampaikan apa saja dengan jujur, tidak perlu basa-basi.")),
    el("div", { class:"note warn" }, el("b", "Anonim: "), "nama, akun, dan jam kirim tidak disimpan. Leader hanya melihat jenis, tanggal, dan isi masukan. Supaya tetap anonim, hindari menulis detail yang hanya kamu yang tahu."),
    form,
    el("div", { class:"stack", style:"gap:12px" },
      el("h2", "Sudah ditanggapi leader"),
      publik.length ? publik.map(kartuTanggapan) : el("p", { class:"hint" }, "Belum ada masukan yang ditanggapi secara terbuka.")));
}
async function viewMasukanLeader() {
  let rows = await q(sb.from("masukan").select("*").order("tanggal", { ascending:false }).order("id", { ascending:false }).limit(300));
  const baru = rows.filter(x => x.status === "baru").map(x => x.id);
  if (baru.length) await sb.from("masukan").update({ status:"dibaca" }).in("id", baru);
  let filter = "semua";
  const box = el("div", { class:"stack" });
  function kartu(x) {
    const f = { tanggapan: x.tanggapan, publik: x.publik };
    const card = el("article", { class:"panel pad stack", style:"gap:10px" });
    const simpan = async (patch, pesan) => {
      try { await q(sb.from("masukan").update(patch).eq("id", x.id)); Object.assign(x, patch); toast(pesan); draw(); }
      catch (e) { toast("Gagal: " + e.message); }
    };
    card.append(
      el("div", { class:"row between" },
        el("div", { class:"row", style:"gap:6px" },
          el("span", { class:"chip " + warnaJenis[x.jenis] }, JENIS_MASUKAN.find(j => j.v === x.jenis).label),
          baru.includes(x.id) ? el("span", { class:"chip attn" }, "Baru") : null,
          x.status === "ditindaklanjuti" ? el("span", { class:"chip calm" }, "Ditindaklanjuti") : null,
          x.publik ? el("span", { class:"chip" }, "Tampil ke tim") : null),
        el("span", { class:"hint" }, fmt(x.tanggal))),
      el("p", { style:"white-space:pre-wrap;font-size:1rem" }, x.isi),
      el("label", { class:"lbl" }, "Tanggapanmu (opsional)", input(f, "tanggapan", { multiline:true, rows:"2", placeholder:"Contoh: Terima kasih, mulai minggu depan briefing dipindah ke jam 10." })),
      el("label", { class:"row", style:"font-size:.9rem;font-weight:600" },
        el("input", { type:"checkbox", style:"width:18px;height:18px;accent-color:var(--ink)", ...(f.publik ? { checked:true } : {}), onchange: e => { f.publik = e.target.checked; } }),
        "Tampilkan masukan & tanggapan ini ke seluruh tim"),
      el("div", { class:"row" },
        el("button", { class:"btn sm", onclick: () => simpan({ tanggapan: f.tanggapan.trim(), publik: f.publik }, "Tanggapan tersimpan") }, "Simpan tanggapan"),
        x.status !== "ditindaklanjuti"
          ? el("button", { class:"btn ghost sm", onclick: () => simpan({ status:"ditindaklanjuti" }, "Ditandai sudah ditindaklanjuti") }, "Tandai ditindaklanjuti")
          : el("button", { class:"btn ghost sm", onclick: () => simpan({ status:"dibaca" }, "Status dikembalikan") }, "Batalkan tanda")));
    return card;
  }
  function draw() {
    const list = rows.filter(x => filter === "semua" || x.jenis === filter || (filter === "belum" && x.status !== "ditindaklanjuti"));
    const hitung = j => rows.filter(x => x.jenis === j).length;
    box.replaceChildren(
      el("div", { class:"page-head" },
        el("div", el("h1", "Kritik & saran"), el("p", { class:"hint" }, "Masukan anonim dari tim. Nama, akun, dan jam kirim tidak tersimpan, jadi kamu pun tidak bisa tahu siapa pengirimnya.")),
        el("span", { class:"sticker" }, rows.length + " masukan")),
      el("div", { class:"stats" },
        el("div", { class:"stat" }, el("b", String(rows.filter(x => x.status !== "ditindaklanjuti").length)), el("span", "Belum ditindaklanjuti")),
        el("div", { class:"stat attn" }, el("b", String(hitung("kritik"))), el("span", "Kritik")),
        el("div", { class:"stat appr" }, el("b", String(hitung("apresiasi"))), el("span", "Apresiasi")),
        el("div", { class:"stat" }, el("b", String(hitung("saran"))), el("span", "Saran"))),
      pilihan([{ v:"semua", label:"Semua" }, { v:"belum", label:"Belum ditindaklanjuti" }, ...JENIS_MASUKAN], { get: () => filter, set: v => filter = v, onChange: draw }),
      list.length ? el("div", { class:"stack", style:"gap:14px" }, list.map(kartu)) : el("p", { class:"empty" }, rows.length ? "Tidak ada masukan di filter ini." : "Belum ada masukan masuk."));
  }
  draw();
  return box;
}


/* ================= MODUL BELAJAR ================= */
const KATEGORI_MODUL = ["Hook & copywriting", "Konten video", "Desain & carousel", "Analitik & data", "Tools & otomasi", "Materi CPNS & produk", "SOP tim", "Umum"];
async function viewModul() {
  const me = S.me;
  const [mods, prog] = await Promise.all([
    q(sb.from("modul").select("*").eq("aktif", true).order("urutan").order("id")),
    q(sb.from("modul_progress").select("*"))]);
  const mine = Object.fromEntries(prog.filter(p => p.member_id === me.id).map(p => [p.modul_id, p]));
  const box = el("div", { class:"stack" });
  const peserta = team();
  let edit = null, buka = null;
  async function setStatus(m, status, catatan = "") {
    try {
      if (!status) await q(sb.from("modul_progress").delete().eq("member_id", me.id).eq("modul_id", m.id));
      else await q(sb.from("modul_progress").upsert({ member_id: me.id, modul_id: m.id, status, catatan, updated_at: new Date().toISOString() }));
      route();
    } catch (e) { toast("Gagal: " + e.message); }
  }
  function kartuModul(m) {
    const p = mine[m.id];
    const card = el("div", { class:"card" },
      el("div", { class:"row", style:"gap:6px" }, el("span", { class:"chip brand" }, m.kategori), m.wajib ? el("span", { class:"chip attn" }, "Wajib") : null),
      el("span", { class:"t" }, m.judul),
      m.deskripsi ? el("span", { class:"m" }, m.deskripsi) : null,
      p?.status === "selesai" && p.catatan ? el("span", { class:"m" }, "Catatanku: " + p.catatan) : null);
    const acts = el("div", { class:"row", style:"gap:6px" });
    if (m.url) acts.append(el("a", { class:"btn ghost sm", href: m.url, target:"_blank", rel:"noopener" }, "Buka materi ↗"));
    if (!p) acts.append(el("button", { class:"btn sm", onclick: () => setStatus(m, "sedang") }, "Mulai belajar"));
    else if (p.status === "sedang") acts.append(el("button", { class:"btn sm", onclick: () => { buka = m.id; draw(); } }, "Tandai selesai"));
    else acts.append(el("button", { class:"btn ghost sm", onclick: () => setStatus(m, "sedang") }, "Ulangi"));
    card.append(acts);
    if (buka === m.id) {
      const f = { c:"" };
      card.append(el("div", { class:"subform" },
        el("label", { class:"lbl" }, "Satu hal yang kamu pelajari (opsional)", input(f, "c", { multiline:true, rows:"2", placeholder:"Contoh: hook terbaik muncul di 2 detik pertama, bukan di caption" })),
        el("div", { class:"row" }, el("button", { class:"btn sm", onclick: () => setStatus(m, "selesai", f.c.trim()) }, "Simpan"), el("button", { class:"btn ghost sm", onclick: () => { buka = null; draw(); } }, "Batal"))));
    }
    return card;
  }
  function formModul() {
    const f = { judul:"", deskripsi:"", url:"", kategori:"Umum", wajib:false, urutan:0, ...(edit === "baru" ? {} : edit) };
    const msg = el("p", { class:"hint" });
    return el("section", { class:"panel pad stack", style:"gap:12px" },
      el("div", { class:"row between" }, el("h2", edit === "baru" ? "Tambah modul" : "Ubah modul"), el("button", { class:"btn ghost sm", onclick: () => { edit = null; draw(); } }, "Tutup")),
      el("label", { class:"lbl" }, "Judul *", input(f, "judul", { placeholder:"Contoh: Rumus hook 3 detik pertama" })),
      el("label", { class:"lbl" }, "Ringkasan singkat", input(f, "deskripsi", { multiline:true, rows:"2", placeholder:"Apa yang akan dipelajari dari modul ini?" })),
      el("label", { class:"lbl" }, "Link materi (video, dokumen, slide)", input(f, "url", { placeholder:"https://…" })),
      el("div", { class:"lbl" }, "Kategori", pilihan(KATEGORI_MODUL, { get: () => f.kategori, set: v => f.kategori = v })),
      el("label", { class:"row", style:"font-size:.9rem;font-weight:600" }, el("input", { type:"checkbox", style:"width:18px;height:18px;accent-color:var(--ink)", ...(f.wajib ? { checked:true } : {}), onchange: e => f.wajib = e.target.checked }), "Wajib dipelajari semua anggota"),
      el("div", { class:"row" },
        el("button", { class:"btn", onclick: async () => {
          if (!f.judul.trim()) { msg.className = "err"; msg.textContent = "Judul wajib diisi."; return; }
          if (f.url && !/^https?:\/\//i.test(f.url.trim())) { msg.className = "err"; msg.textContent = "Link harus diawali http:// atau https://"; return; }
          const data = { judul: f.judul.trim(), deskripsi: f.deskripsi.trim(), url: f.url.trim(), kategori: f.kategori, wajib: f.wajib };
          try {
            if (edit === "baru") await q(sb.from("modul").insert(data)); else await q(sb.from("modul").update(data).eq("id", edit.id));
            toast("Modul tersimpan"); route();
          } catch (e) { msg.className = "err"; msg.textContent = "Gagal: " + e.message; }
        } }, "Simpan modul"),
        edit !== "baru" ? el("button", { class:"btn danger", onclick: async () => {
          if (!confirm("Hapus modul ini? Progres belajar anggota untuk modul ini ikut terhapus.")) return;
          try { await q(sb.from("modul").delete().eq("id", edit.id)); toast("Modul dihapus"); route(); } catch (e) { toast("Gagal: " + e.message); }
        } }, "Hapus") : null),
      msg);
  }
  function rekapAdmin() {
    if (!me.is_admin || !mods.length) return null;
    return el("section", { class:"panel pad stack", style:"gap:10px" },
      el("h2", "Progres tim"),
      el("div", { class:"table-wrap" }, el("table",
        el("thead", el("tr", el("th", "Modul"), el("th", { class:"num" }, "Selesai"), el("th", { class:"num" }, "Sedang"), el("th", ""))),
        el("tbody", mods.map(m => {
          const ps = prog.filter(p => p.modul_id === m.id && peserta.some(x => x.id === p.member_id));
          const sel = ps.filter(p => p.status === "selesai");
          const det = el("tr", { hidden:true }, el("td", { colspan:"4" }, el("div", { class:"stack", style:"gap:6px" },
            sel.length ? sel.map(p => el("div", el("b", namaOf(p.member_id)), p.catatan ? ": " + p.catatan : "")) : el("span", { class:"hint" }, "Belum ada yang selesai."),
            el("span", { class:"hint" }, "Belum mulai: " + (peserta.filter(x => !ps.some(p => p.member_id === x.id)).map(x => x.nama).join(", ") || "–")))));
          return [el("tr",
            el("td", m.judul, m.wajib ? el("span", { class:"chip attn", style:"margin-left:6px" }, "Wajib") : null),
            el("td", { class:"num" }, el("span", { class:"chip " + (sel.length === peserta.length ? "calm" : "") }, `${sel.length}/${peserta.length}`)),
            el("td", { class:"num" }, String(ps.length - sel.length)),
            el("td", el("div", { class:"row", style:"gap:6px;flex-wrap:nowrap;justify-content:flex-end" },
              el("button", { class:"btn ghost sm", onclick: () => { det.hidden = !det.hidden; } }, "Siapa saja"),
              el("button", { class:"btn ghost sm", onclick: () => { edit = m; draw(); window.scrollTo({ top:0, behavior:"smooth" }); } }, "Ubah")))), det];
        })))));
  }
  function draw() {
    const kolom = [["belum", "Belum mulai", m => !mine[m.id]], ["sedang", "Sedang dipelajari", m => mine[m.id]?.status === "sedang"], ["selesai", "Selesai", m => mine[m.id]?.status === "selesai"]];
    const ikut = me.peran !== "leader";
    const selesai = mods.filter(m => mine[m.id]?.status === "selesai").length;
    box.replaceChildren(
      el("div", { class:"page-head" },
        el("div", el("h1", "Modul belajar"), el("p", { class:"hint" }, "Materi pilihan untuk naik level bareng. Buka materinya, tandai progresmu, dan tulis satu hal yang kamu pelajari.")),
        el("div", { class:"row" }, ikut && mods.length ? el("span", { class:"sticker" }, `${selesai}/${mods.length} selesai`) : null,
          me.is_admin ? el("button", { class:"btn", onclick: () => { edit = "baru"; draw(); } }, "+ Tambah modul") : null)),
      edit ? formModul() : null,
      !mods.length ? el("div", { class:"panel pad" }, el("p", { class:"empty" }, me.is_admin ? "Belum ada modul. Tambahkan modul pertama dengan tombol di atas." : "Belum ada modul. Leader akan segera menambahkan materi.")) : null,
      ikut && mods.length ? el("div", { class:"board" }, kolom.map(([k, label, fn]) => {
        const xs = mods.filter(fn);
        return el("div", { class:"col" }, el("div", { class:"col-head" }, el("span", label), el("span", { class:"hint" }, String(xs.length))),
          xs.length ? xs.map(kartuModul) : el("p", { class:"empty" }, "Kosong"));
      })) : null,
      me.peran === "leader" && mods.length ? el("div", { class:"stack", style:"gap:12px" }, mods.map(m => el("div", { class:"card" },
        el("div", { class:"row", style:"gap:6px" }, el("span", { class:"chip brand" }, m.kategori), m.wajib ? el("span", { class:"chip attn" }, "Wajib") : null),
        el("span", { class:"t" }, m.judul), m.deskripsi ? el("span", { class:"m" }, m.deskripsi) : null,
        m.url ? el("div", el("a", { class:"btn ghost sm", href:m.url, target:"_blank", rel:"noopener" }, "Buka materi ↗")) : null))) : null,
      rekapAdmin());
  }
  draw();
  return box;
}

/* ================= LINK KERJA ================= */
const KATEGORI_LINK = ["Kalender konten", "Aset & Drive", "Template", "Dashboard & data", "SOP & panduan", "Akun & tools", "Lainnya"];
async function viewTautan() {
  const me = S.me;
  let rows = await q(sb.from("tautan").select("*").order("disematkan", { ascending:false }).order("kategori").order("judul"));
  let cari = "", kat = null, edit = null;
  const box = el("div", { class:"stack" });
  const bisaUbah = x => x.dibuat_oleh === me.id || me.is_admin;
  const list = el("div", { class:"stack", style:"gap:18px" });
  function form() {
    const f = { judul:"", url:"", kategori:"Lainnya", keterangan:"", ...(edit === "baru" ? {} : edit) };
    const msg = el("p", { class:"hint" });
    return el("section", { class:"panel pad stack", style:"gap:12px" },
      el("div", { class:"row between" }, el("h2", edit === "baru" ? "Tambah link" : "Ubah link"), el("button", { class:"btn ghost sm", onclick: () => { edit = null; draw(); } }, "Tutup")),
      el("div", { class:"grid2" },
        el("label", { class:"lbl" }, "Nama link *", input(f, "judul", { placeholder:"Contoh: Kalender konten Oktober" })),
        el("label", { class:"lbl" }, "URL *", input(f, "url", { placeholder:"https://…" }))),
      el("div", { class:"lbl" }, "Kategori", pilihan(KATEGORI_LINK, { get: () => f.kategori, set: v => f.kategori = v })),
      el("label", { class:"lbl" }, "Keterangan (opsional)", input(f, "keterangan", { placeholder:"Contoh: diisi setiap Jumat sebelum jam 3" })),
      el("div", { class:"row" },
        el("button", { class:"btn", onclick: async () => {
          if (!f.judul.trim() || !/^https?:\/\/\S+$/i.test(f.url.trim())) { msg.className = "err"; msg.textContent = "Isi nama dan URL lengkap (diawali https://)."; return; }
          const data = { judul: f.judul.trim(), url: f.url.trim(), kategori: f.kategori, keterangan: f.keterangan.trim() };
          try {
            if (edit === "baru") await q(sb.from("tautan").insert({ ...data, dibuat_oleh: me.id })); else await q(sb.from("tautan").update(data).eq("id", edit.id));
            toast("Link tersimpan"); route();
          } catch (e) { msg.className = "err"; msg.textContent = "Gagal: " + e.message; }
        } }, "Simpan link"),
        edit !== "baru" ? el("button", { class:"btn danger", onclick: async () => {
          if (!confirm("Hapus link ini?")) return;
          try { await q(sb.from("tautan").delete().eq("id", edit.id)); toast("Link dihapus"); route(); } catch (e) { toast("Gagal: " + e.message); }
        } }, "Hapus") : null),
      msg);
  }
  function tile(x, i) {
    const warnaKat = { "Kalender konten":"t-yellow", "Aset & Drive":"t-sky", "Template":"t-lime", "Dashboard & data":"t-orange", "SOP & panduan":"t-white", "Akun & tools":"t-sky", "Lainnya":"t-white" };
    const warna = warnaKat[x.kategori] || "t-white";
    let host = ""; try { host = new URL(x.url).hostname.replace(/^www\./, ""); } catch (e) {}
    return el("div", { class:"tile " + (x.disematkan ? "t-pink" : warna), style:"justify-content:space-between;min-height:130px" },
      el("div", { class:"stack", style:"gap:4px" },
        el("div", { class:"row", style:"gap:6px" }, x.disematkan ? el("span", { class:"chip" }, "📌 Disematkan") : null, el("small", x.kategori)),
        el("a", { href:x.url, target:"_blank", rel:"noopener", style:"text-decoration:none" }, el("b", x.judul + " ↗")),
        x.keterangan ? el("small", x.keterangan) : null),
      el("div", { class:"row between", style:"margin-top:8px" },
        el("small", host + (x.dibuat_oleh ? " · " + namaOf(x.dibuat_oleh) : "")),
        el("div", { class:"row", style:"gap:4px" },
          me.is_admin ? el("button", { class:"btn ghost sm", title: x.disematkan ? "Lepas sematan" : "Sematkan di atas", onclick: async () => {
            try { await q(sb.from("tautan").update({ disematkan: !x.disematkan }).eq("id", x.id)); route(); } catch (e) { toast("Gagal: " + e.message); } } }, x.disematkan ? "Lepas" : "📌") : null,
          bisaUbah(x) ? el("button", { class:"btn ghost sm", onclick: () => { edit = x; draw(); window.scrollTo({ top:0, behavior:"smooth" }); } }, "Ubah") : null)));
  }
  function drawList() {
    const s = cari.trim().toLowerCase();
    const xs = rows.filter(x => (!kat || x.kategori === kat) && (!s || (x.judul + " " + x.keterangan + " " + x.url).toLowerCase().includes(s)));
    const pin = xs.filter(x => x.disematkan), lain = xs.filter(x => !x.disematkan);
    const grup = [...new Set(lain.map(x => x.kategori))];
    list.replaceChildren(
      !rows.length ? el("div", { class:"panel pad" }, el("p", { class:"empty" }, "Belum ada link. Tambahkan link kerja pertama tim, misalnya kalender konten atau folder aset.")) : null,
      rows.length && !xs.length ? el("p", { class:"empty" }, "Tidak ada link yang cocok.") : null,
      pin.length ? el("div", { class:"tiles links" }, pin.map(tile)) : null,
      grup.map(g => el("div", { class:"stack", style:"gap:10px" }, el("h2", g), el("div", { class:"tiles links" }, lain.filter(x => x.kategori === g).map(tile)))));
  }
  function draw() {
    const cariIn = el("input", { class:"field", placeholder:"Cari link…", style:"max-width:320px", value: cari });
    cariIn.addEventListener("input", () => { cari = cariIn.value; drawList(); });
    box.replaceChildren(
      el("div", { class:"page-head" },
        el("div", el("h1", "Link kerja"), el("p", { class:"hint" }, "Semua link penting tim di satu tempat: kalender konten, folder aset, template, dashboard. Siapa pun di tim bisa menambahkan.")),
        el("button", { class:"btn", onclick: () => { edit = "baru"; draw(); } }, "+ Tambah link")),
      edit ? form() : null,
      rows.length ? el("div", { class:"row" }, cariIn, pilihan(KATEGORI_LINK.filter(k => rows.some(x => x.kategori === k)).map(v => ({ v, label:v, toggle:true })), { get: () => kat, set: v => kat = v, onChange: drawList })) : null,
      list);
    drawList();
  }
  draw();
  return box;
}

/* ================= STRUKTUR TIM ================= */
const URUTAN_DIVISI = ["Leader", "Asisten", "Social Media", "Marketplace & Live"];
// Nama akun sesuai baris 1 tab DRM MARKETING di spreadsheet
const DAFTAR_AKUN = ["CEREBRUM", "JADIASN", "JADIBUMN", "JADIPCPM", "JADIPOLISI", "JADIPPPK", "JADISEKDIN", "JADIPRAJURIT", "PSIKOTES KERJA", "JADIBEASISWA", "JADIPPG", "JADIOJK", "TOEFL ACADEMY", "JAGOTPA"];
async function viewStruktur() {
  await loadBase();
  const pegangan = await q(sb.from("akun_pegangan").select("*"));
  const akunOf = id => pegangan.filter(p => p.member_id === id).map(p => p.akun);
  const me = S.me;
  const orang = S.members.filter(m => m.aktif);
  const divisi = [...new Set([...URUTAN_DIVISI.filter(d => orang.some(m => m.divisi === d)), ...orang.map(m => m.divisi || "Lainnya")])];
  const warnaAv = ["var(--sky)", "var(--lime)", "var(--yellow)", "var(--orange)", "var(--pink)"];
  const box = el("div", { class:"stack" });
  let edit = null;
  const avatar = (m, i) => el("span", { class:"av", style:`background:${warnaAv[i % warnaAv.length]}` }, m.nama.slice(0, 1).toUpperCase());
  function bagan() {
    let i = 0;
    const kartu = (m, d) => el("div", { class:"org-card" + (d === "Leader" ? " lead" : "") },
      avatar(m, i++), el("div", el("b", m.nama), el("small", m.jabatan || PERAN_LABEL[m.peran]), akunOf(m.id).length ? el("small", { class:"peg" }, akunOf(m.id).join(", ")) : m.pegangan ? el("small", { class:"peg" }, m.pegangan) : null));
    const isi = d => orang.filter(m => (m.divisi || "Lainnya") === d);
    const atas = divisi.filter(d => d === "Leader" || d === "Asisten");
    const bawah = divisi.filter(d => !atas.includes(d));
    return el("section", { class:"org" },
      atas.map((d, di) => el("div", { class:"org-level" },
        di > 0 ? el("span", { class:"org-line", "aria-hidden":"true" }) : null,
        el("div", { class:"org-label" }, d),
        el("div", { class:"org-row" }, isi(d).map(m => kartu(m, d))))),
      bawah.length ? el("span", { class:"org-line", "aria-hidden":"true" }) : null,
      bawah.length ? el("div", { class:"org-divs" }, bawah.map(d => el("div", { class:"org-div" + (isi(d).length > 3 ? " lebar" : "") },
        el("div", { class:"org-label" }, d + ` · ${isi(d).length} orang`),
        el("div", { class:"org-row" }, isi(d).map(m => kartu(m, d)))))) : null);
  }
  function tabel() {
    const urut = [...orang].sort((a, b) => (URUTAN_DIVISI.indexOf(a.divisi) + 99) % 99 - (URUTAN_DIVISI.indexOf(b.divisi) + 99) % 99 || a.nama.localeCompare(b.nama));
    return el("section", { class:"panel pad stack", style:"gap:10px" },
      el("div", { class:"row between" }, el("h2", "Tabel tim"), el("span", { class:"hint" }, orang.length + " orang")),
      el("div", { class:"table-wrap" }, el("table",
        el("thead", el("tr", el("th", "Nama"), el("th", "Jabatan"), el("th", "Divisi"), el("th", "Akun yang dipegang"), el("th", "Tanggung jawab lain"), el("th", "Kontak"), me.is_admin ? el("th", "") : null)),
        el("tbody", urut.map(m => {
          if (edit === m.id) {
            const f = { jabatan: m.jabatan, divisi: m.divisi, pegangan: m.pegangan, kontak: m.kontak, akun: akunOf(m.id) };
            return el("tr",
              el("td", el("b", m.nama)),
              el("td", input(f, "jabatan")), el("td", input(f, "divisi", { list:"daftar-divisi" })),
              el("td", { style:"min-width:260px" }, pilihan(DAFTAR_AKUN, { get: () => f.akun, multi:true })),
              el("td", input(f, "pegangan", { placeholder:"Contoh: koordinator event" })), el("td", input(f, "kontak", { placeholder:"Contoh: 08xx" })),
              el("td", el("div", { class:"row", style:"gap:6px;flex-wrap:nowrap" },
                el("button", { class:"btn sm", onclick: async () => {
                  try {
                    await q(sb.from("members").update({ jabatan: f.jabatan.trim(), divisi: f.divisi.trim(), pegangan: f.pegangan.trim(), kontak: f.kontak.trim() }).eq("id", m.id));
                    await q(sb.from("akun_pegangan").delete().eq("member_id", m.id));
                    if (f.akun.length) await q(sb.from("akun_pegangan").insert(f.akun.map(akun => ({ member_id: m.id, akun }))));
                    toast("Tersimpan"); edit = null; await loadBase(); route(); }
                  catch (e) { toast("Gagal: " + e.message); } } }, "Simpan"),
                el("button", { class:"btn ghost sm", onclick: () => { edit = null; draw(); } }, "Batal"))));
          }
          return el("tr",
            el("td", el("b", m.nama), m.id === me.id ? el("span", { class:"hint" }, " (kamu)") : null),
            el("td", m.jabatan || "–"), el("td", m.divisi || "–"),
            el("td", akunOf(m.id).length ? el("div", { class:"row", style:"gap:4px" }, akunOf(m.id).map(x => el("span", { class:"chip brand" }, x))) : el("span", { class:"hint" }, "–")),
            el("td", m.pegangan || el("span", { class:"hint" }, "–")),
            el("td", m.kontak ? (/^[0-9+ -]{8,}$/.test(m.kontak) ? el("a", { href:"https://wa.me/" + m.kontak.replace(/\D/g, "").replace(/^0/, "62"), target:"_blank", rel:"noopener" }, m.kontak) : m.kontak) : el("span", { class:"hint" }, "–")),
            me.is_admin ? el("td", el("button", { class:"btn ghost sm", onclick: () => { edit = m.id; draw(); } }, "Ubah")) : null);
        })))),
      el("datalist", { id:"daftar-divisi" }, URUTAN_DIVISI.map(d => el("option", { value:d }))));
  }
  function draw() {
    box.replaceChildren(
      el("div", el("h1", "Struktur tim"), el("p", { class:"hint", style:"margin-top:6px" }, "Siapa memegang apa, supaya tahu harus bertanya ke siapa." + (me.is_admin ? " Lewat tombol Ubah, kamu bisa mengatur jabatan, divisi, kontak, dan akun yang dipegang. Akun yang dipegang dipakai untuk menghitung lencana jangkauan dari spreadsheet." : ""))),
      bagan(), tabel());
  }
  draw();
  return box;
}


/* ================= JUARA & LENCANA ================= */
const KATEGORI_JUARA = [
  { k:"jangkau", emoji:"🏆", nama:"Si Paling Jangkau", desc:"Pencapaian target jangkauan akun yang dipegang. Adil untuk akun besar maupun kecil.", sms:true },
  { k:"naik", emoji:"📈", nama:"Si Paling Naik", desc:"Kenaikan pencapaian target jangkauan dibanding periode sebelumnya.", sms:true },
  { k:"rajin", emoji:"🔥", nama:"Si Paling Rajin", desc:"Rata-rata checklist harian dan check-in tanpa bolong." },
  { k:"ide", emoji:"💡", nama:"Si Paling Ide", desc:"Ide terbanyak yang dikirim ke Kotak ide." },
  { k:"strategis", emoji:"🧠", nama:"Si Paling Strategis", desc:"Eksperimen yang selesai dengan hasil jelas, ditambah ide yang dipakai tim." },
  { k:"detektif", emoji:"🕵️", nama:"Detektif Kompetitor", desc:"Riset kompetitor terbanyak.", sms:true },
  { k:"ilmu", emoji:"📚", nama:"Si Paling Haus Ilmu", desc:"Modul belajar yang diselesaikan." },
  { k:"inspiratif", emoji:"🎉", nama:"Si Paling Inspiratif", desc:"Kisah sukses yang paling banyak direaksi tim." },
];
const LENCANA = {
  langkah_pertama: { emoji:"🌱", nama:"Langkah Pertama", syarat:"Check-in pertama kali" },
  streak_5: { emoji:"⚡", nama:"Streak 5", syarat:"Check-in 5 hari kerja berturut-turut" },
  streak_20: { emoji:"⚡", nama:"Streak 20", syarat:"Check-in 20 hari kerja berturut-turut" },
  streak_60: { emoji:"🌩️", nama:"Streak 60", syarat:"Check-in 60 hari kerja berturut-turut" },
  bulan_sempurna: { emoji:"✅", nama:"Bulan Sempurna", syarat:"Checklist 100% sebulan penuh" },
  ilmuwan_konten: { emoji:"🧪", nama:"Ilmuwan Konten", syarat:"5 eksperimen selesai" },
  hipotesis_jitu: { emoji:"🎯", nama:"Hipotesis Jitu", syarat:"3 eksperimen dengan pemenang jelas" },
  ide_jadi_nyata: { emoji:"💡", nama:"Ide Jadi Nyata", syarat:"Ide dipakai tim (bisa berkali-kali)" },
  viral_hunter: { emoji:"🚀", nama:"Viral Hunter", syarat:"Kisah sukses ditandai viral oleh leader" },
  lulus_modul_wajib: { emoji:"🎓", nama:"Lulus Modul Wajib", syarat:"Semua modul wajib selesai" },
  penyemangat: { emoji:"🤝", nama:"Penyemangat Tim", syarat:"50 reaksi & dukungan untuk rekan" },
  pilihan_leader: { emoji:"⭐", nama:"Pilihan Leader", syarat:"Diberikan langsung oleh leader" },
};
function infoLencana(kode) {
  if (kode.startsWith("juara_")) { const k = KATEGORI_JUARA.find(x => x.k === kode.slice(6)); return { emoji:"👑", nama:"Juara " + (k ? k.nama : kode.slice(6)), syarat:"Juara 1 mingguan atau bulanan" }; }
  return LENCANA[kode] || { emoji:"🏅", nama:kode, syarat:"" };
}
function rentangPeriode(jenis) {
  const t = today();
  if (jenis === "minggu") { const d = parseKey(t); const g = (d.getDay() + 6) % 7; const awal = addDays(t, -g); return { awal, akhir: addDays(awal, 6), label:"Minggu ini (" + fmtShort(awal) + " – " + fmtShort(addDays(awal, 6)) + ")" }; }
  if (jenis === "mingguLalu") { const d = parseKey(t); const g = (d.getDay() + 6) % 7; const awal = addDays(t, -g - 7); return { awal, akhir: addDays(awal, 6), label:"Minggu lalu (" + fmtShort(awal) + " – " + fmtShort(addDays(awal, 6)) + ")" }; }
  const awal = t.slice(0, 8) + "01"; const [y, m] = t.split("-").map(Number);
  if (jenis === "bulanLalu") { const a = keyOf(new Date(y, m - 2, 1)); return { awal:a, akhir: keyOf(new Date(y, m - 1, 0)), label: parseKey(a).toLocaleDateString("id-ID", { month:"long", year:"numeric" }) }; }
  return { awal, akhir: keyOf(new Date(y, m, 0)), label: parseKey(awal).toLocaleDateString("id-ID", { month:"long", year:"numeric" }) };
}
async function viewJuara() {
  const me = S.me;
  await sb.rpc("hitung_lencana");
  let jenis = S.juaraPeriode || "minggu";
  const box = el("div", { class:"stack" });
  const [lencana, pegangan, kpiAkhir] = await Promise.all([
    q(sb.from("lencana").select("*").order("created_at", { ascending:false })),
    q(sb.from("akun_pegangan").select("*")),
    q(sb.from("kpi_harian").select("tanggal").eq("metrik", "jangkauan").gt("real", 0).order("tanggal", { ascending:false }).limit(1))]);
  async function draw() {
    const p = rentangPeriode(jenis);
    box.replaceChildren(el("p", { class:"hint" }, "Menghitung…"));
    const skor = await q(sb.rpc("papan", { p_awal: p.awal, p_akhir: p.akhir }));
    const medali = ["🥇", "🥈", "🥉"];
    const kartuKat = kat => {
      const xs = skor.filter(s => s.kategori === kat.k && Number(s.nilai) > 0).sort((a, b) => b.nilai - a.nilai).slice(0, 3);
      const kosong = kat.k === "jangkau" || kat.k === "naik"
        ? (pegangan.length ? "Belum cukup data jangkauan di periode ini (minimal 3 hari per minggu)." : "Akun yang dipegang belum dipetakan. Atur di Struktur tim.")
        : "Belum ada yang masuk papan. Kesempatan emas nih.";
      return el("section", { class:"panel juara" },
        el("div", { class:"juara-head" }, el("span", { class:"juara-emoji" }, kat.emoji), el("div", el("h2", kat.nama), el("p", { class:"hint" }, kat.desc))),
        xs.length ? el("ol", { class:"podium" }, xs.map((s, i) => el("li", { class: s.member_id === me.id ? "aku" : "" },
          el("span", { class:"medali" }, medali[i]), el("div", el("b", namaOf(s.member_id) + (s.member_id === me.id ? " (kamu)" : "")), el("small", s.detail))))) : el("p", { class:"hint", style:"padding:0 18px 16px" }, kosong));
    };
    const milikku = lencana.filter(l => l.member_id === me.id);
    const kodeUnik = [...new Set(lencana.map(l => l.kode))];
    const orang = team();
    box.replaceChildren(
      el("div", { class:"page-head" },
        el("div", el("h1", "Papan juara"), el("p", { class:"hint" }, "Banyak cara buat jadi juara: rajin, kreatif, strategis, haus ilmu, atau angkanya naik. Yang ditampilkan hanya 3 teratas di tiap kategori.")),
        el("span", { class:"sticker" }, p.label)),
      pilihan([{ v:"minggu", label:"Minggu ini" }, { v:"mingguLalu", label:"Minggu lalu" }, { v:"bulan", label:"Bulan ini" }, { v:"bulanLalu", label:"Bulan lalu" }], { get: () => jenis, set: v => { jenis = v; S.juaraPeriode = v; }, onChange: draw }),
      el("p", { class:"hint" }, "Data jangkauan dari spreadsheet DRM MARKETING" + (kpiAkhir[0] ? ", terakhir terisi " + fmt(kpiAkhir[0].tanggal) + "." : ", belum tersinkron.") + " Juara 1 resmi dapat lencana 👑 setelah datanya matang (Kamis untuk mingguan, tanggal 4 untuk bulanan)."),
      el("div", { class:"juara-grid" }, KATEGORI_JUARA.map(kartuKat)),
      el("section", { class:"panel pad stack", style:"gap:12px" },
        el("div", { class:"row between" }, el("h2", "Lencanaku"), el("span", { class:"sticker", style:"background:var(--lime);color:var(--ink)" }, milikku.length + " lencana")),
        milikku.length ? el("div", { class:"lencana-grid" }, milikku.map(l => { const i = infoLencana(l.kode); return el("div", { class:"lencana", title:i.syarat }, el("span", i.emoji), el("b", i.nama), el("small", l.periode ? labelPeriode(l.periode) : fmt(l.created_at.slice(0, 10), { day:"numeric", month:"short" }))); }))
          : el("p", { class:"hint" }, "Belum ada lencana. Check-in pertamamu langsung dapat 🌱 Langkah Pertama!")),
      el("section", { class:"panel pad stack", style:"gap:12px" },
        el("h2", "Koleksi lencana tim"),
        el("div", { class:"table-wrap" }, el("table", el("tbody", [...orang].sort((x, y) => lencana.filter(l => l.member_id === y.id).length - lencana.filter(l => l.member_id === x.id).length || x.nama.localeCompare(y.nama)).map(m => { const ls = lencana.filter(l => l.member_id === m.id);
          return el("tr", el("td", el("b", m.nama)), el("td", ls.length ? ls.map(l => el("span", { class:"lencana-mini", title: infoLencana(l.kode).nama + (l.periode ? " · " + labelPeriode(l.periode) : "") }, infoLencana(l.kode).emoji)) : el("span", { class:"hint" }, "–")), el("td", { class:"num" }, String(ls.length))); }))))),
      el("details", { class:"panel pad" }, el("summary", { style:"cursor:pointer;font-weight:800" }, "Cara mendapatkan lencana"),
        el("div", { class:"lencana-grid", style:"margin-top:12px" }, [...Object.entries(LENCANA).map(([k, v]) => el("div", { class:"lencana" + (kodeUnik.includes(k) ? "" : " belum") }, el("span", v.emoji), el("b", v.nama), el("small", v.syarat))),
          el("div", { class:"lencana" }, el("span", "👑"), el("b", "Juara kategori"), el("small", "Juara 1 di papan mingguan atau bulanan"))])),
      me.is_admin ? formPilihanLeader() : null);
  }
  function formPilihanLeader() {
    const f = { m:null, alasan:"" };
    return el("section", { class:"panel pad stack", style:"gap:12px" },
      el("h2", "⭐ Beri lencana Pilihan Leader"),
      el("p", { class:"hint" }, "Untuk kontribusi yang tidak tercatat angka, misalnya membantu rekan yang kewalahan."),
      el("div", { class:"lbl" }, "Untuk siapa", pilihan(team().map(m => ({ v:m.id, label:m.nama })), { get: () => f.m, set: v => f.m = v })),
      el("label", { class:"lbl" }, "Alasannya", input(f, "alasan", { placeholder:"Contoh: bantu edit 5 video Zaki waktu dia sakit" })),
      el("div", el("button", { class:"btn", onclick: async () => {
        if (!f.m || !f.alasan.trim()) return toast("Pilih orang dan tulis alasannya dulu.");
        try { await q(sb.from("lencana").insert({ member_id: f.m, kode:"pilihan_leader", periode: new Date().toISOString(), meta:{ alasan: f.alasan.trim() } }));
          await kirimPesan(f.m, "Kamu dapat lencana ⭐ Pilihan Leader: " + f.alasan.trim(), "apresiasi"); toast("Lencana terkirim!"); route(); }
        catch (e) { toast("Gagal: " + e.message); } } }, "Berikan lencana")));
  }
  draw();
  return box;
}
function labelPeriode(p) {
  if (/^W\d{4}-\d{2}$/.test(p)) return "Minggu ke-" + Number(p.slice(6)) + " " + p.slice(1, 5);
  if (/^M\d{4}-\d{2}$/.test(p)) return parseKey(p.slice(1) + "-01").toLocaleDateString("id-ID", { month:"long", year:"numeric" });
  if (/^\d{4}-\d{2}$/.test(p)) return parseKey(p + "-01").toLocaleDateString("id-ID", { month:"long", year:"numeric" });
  if (/^\d{4}-\d{2}-\d{2}T/.test(p)) return fmt(p.slice(0, 10), { day:"numeric", month:"short", year:"numeric" });
  return "";
}

/* ================= KOTAK IDE ================= */
const KATEGORI_IDE = ["Konten", "Event", "Produk", "Cara kerja", "Lainnya"];
const STATUS_IDE = { baru:["Baru",""], dibahas:["Dibahas","brand"], dipakai:["Dipakai","calm"], ditunda:["Ditunda","appr"] };
async function viewIde() {
  const me = S.me;
  const [rows, duk] = await Promise.all([
    q(sb.from("ide").select("*").order("created_at", { ascending:false }).limit(300)),
    q(sb.from("ide_dukungan").select("*"))]);
  let urut = "dukungan", filter = "semua";
  const box = el("div", { class:"stack" });
  const jml = id => duk.filter(d => d.ide_id === id).length;
  const sayaDukung = id => duk.some(d => d.ide_id === id && d.member_id === me.id);
  function formBaru() {
    const f = { judul:"", isi:"", kategori:"Konten" };
    const msg = el("p", { class:"hint" });
    return el("section", { class:"panel pad stack", style:"gap:12px" },
      el("h2", "Punya ide? Spill di sini"),
      el("label", { class:"lbl" }, "Idenya apa? *", input(f, "judul", { placeholder:"Contoh: Seri konten 'Sehari jadi ASN' bareng alumni" })),
      el("label", { class:"lbl" }, "Ceritain lebih detail (opsional)", input(f, "isi", { multiline:true, rows:"3", placeholder:"Kenapa ide ini bagus? Gimana cara jalaninnya?" })),
      el("div", { class:"lbl" }, "Kategori", pilihan(KATEGORI_IDE, { get: () => f.kategori, set: v => f.kategori = v })),
      el("div", el("button", { class:"btn", onclick: async () => {
        if (f.judul.trim().length < 3) { msg.className = "err"; msg.textContent = "Tulis idenya dulu."; return; }
        try { await q(sb.from("ide").insert({ member_id: me.id, judul: f.judul.trim(), isi: f.isi.trim(), kategori: f.kategori })); toast("Ide terkirim! 💡"); route(); }
        catch (e) { msg.className = "err"; msg.textContent = "Gagal: " + e.message; } } }, "Kirim ide")), msg);
  }
  function kartu(x) {
    const n = jml(x.id), aku = sayaDukung(x.id), [stLabel, stWarna] = STATUS_IDE[x.status];
    const card = el("article", { class:"panel pad stack", style:"gap:10px" },
      el("div", { class:"row between" },
        el("div", { class:"row", style:"gap:6px" }, el("span", { class:"chip" }, x.kategori), el("span", { class:"chip " + stWarna }, stLabel)),
        el("span", { class:"hint" }, namaOf(x.member_id) + " · " + fmt(keyOf(new Date(x.created_at)), { day:"numeric", month:"short" }))),
      el("h3", { style:"font-size:1.15rem" }, x.judul),
      x.isi ? el("p", { style:"white-space:pre-wrap" }, x.isi) : null,
      x.tanggapan ? el("div", { class:"note" }, el("b", "Tanggapan leader: "), x.tanggapan) : null,
      el("div", { class:"row" },
        el("button", { class:"btn sm" + (aku ? "" : " ghost"), disabled: x.member_id === me.id, title: x.member_id === me.id ? "Ide sendiri tidak bisa didukung" : "", onclick: async () => {
          try { if (aku) await q(sb.from("ide_dukungan").delete().eq("ide_id", x.id).eq("member_id", me.id)); else await q(sb.from("ide_dukungan").insert({ ide_id: x.id, member_id: me.id })); route(); }
          catch (e) { toast("Gagal: " + e.message); } } }, "🔥 " + n + (aku ? " · didukung" : " · dukung")),
        (x.member_id === me.id || me.is_admin) && x.status === "baru" ? el("button", { class:"btn danger sm", onclick: async () => { if (!confirm("Hapus ide ini?")) return; await q(sb.from("ide").delete().eq("id", x.id)); route(); } }, "Hapus") : null));
    if (me.is_admin) {
      const f = { t: x.tanggapan };
      card.append(el("div", { class:"subform" },
        el("label", { class:"lbl" }, "Tanggapanmu", input(f, "t", { placeholder:"Contoh: Bagus! Kita coba minggu depan, PIC-nya kamu ya." })),
        el("div", { class:"row", style:"gap:6px" }, Object.entries(STATUS_IDE).map(([k, [lab]]) => el("button", { class:"btn sm" + (x.status === k ? "" : " ghost"), onclick: async () => {
          const patch = { status: k, tanggapan: f.t.trim() };
          if (k === "dipakai" && !x.dipakai_at) patch.dipakai_at = new Date().toISOString();
          try { await q(sb.from("ide").update(patch).eq("id", x.id));
            if (k === "dipakai" && x.status !== "dipakai") await kirimPesan(x.member_id, `Idemu "${x.judul}" DIPAKAI tim! 💡 Kamu dapat lencana Ide Jadi Nyata.`, "apresiasi");
            toast("Status ide: " + lab); route(); } catch (e) { toast("Gagal: " + e.message); } } }, lab)))));
    }
    return card;
  }
  function draw() {
    let xs = rows.filter(x => filter === "semua" || (filter === "saya" ? x.member_id === me.id : x.status === filter));
    xs = urut === "dukungan" ? [...xs].sort((a, b) => jml(b.id) - jml(a.id) || b.created_at.localeCompare(a.created_at)) : xs;
    box.replaceChildren(
      el("div", { class:"page-head" },
        el("div", el("h1", "Kotak ide"), el("p", { class:"hint" }, "Ide sekecil apa pun boleh. Dukung ide teman dengan 🔥, dan ide yang dipakai tim dapat lencana.")),
        el("span", { class:"sticker" }, rows.length + " ide")),
      me.peran !== "leader" ? formBaru() : null,
      el("div", { class:"row between" },
        pilihan([{ v:"semua", label:"Semua" }, { v:"saya", label:"Ideku" }, { v:"dipakai", label:"Dipakai" }, { v:"dibahas", label:"Dibahas" }, { v:"baru", label:"Baru" }], { get: () => filter, set: v => filter = v, onChange: draw }),
        pilihan([{ v:"dukungan", label:"🔥 Terpopuler" }, { v:"baru", label:"Terbaru" }], { get: () => urut, set: v => urut = v, onChange: draw })),
      xs.length ? el("div", { class:"stack", style:"gap:14px" }, xs.map(kartu)) : el("p", { class:"empty" }, "Belum ada ide di sini."));
  }
  draw();
  return box;
}

/* ================= SPILL MENANG (kisah sukses) ================= */
const REAKSI = [["api", "🔥"], ["tepuk", "👏"], ["wow", "🤯"]];
async function kompresGambar(file) {
  const img = await new Promise((ok, gagal) => { const i = new Image(); i.onload = () => ok(i); i.onerror = gagal; i.src = URL.createObjectURL(file); });
  const skala = Math.min(1, 1280 / Math.max(img.width, img.height));
  const c = document.createElement("canvas"); c.width = Math.round(img.width * skala); c.height = Math.round(img.height * skala);
  c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
  return await new Promise(ok => c.toBlob(ok, "image/jpeg", 0.82));
}
async function viewMenang() {
  const me = S.me;
  const [rows, reaksi] = await Promise.all([
    q(sb.from("kisah").select("*").order("created_at", { ascending:false }).limit(200)),
    q(sb.from("kisah_reaksi").select("*"))]);
  let filter = "semua", buat = false;
  const box = el("div", { class:"stack" });
  const urlGambar = p => p ? SB_URL + "/storage/v1/object/public/kisah/" + p : "";
  function form() {
    const f = { judul:"", url:"", platform:"", format:"", angka:"", cara:"", pelajaran:"", file:null };
    const msg = el("p", { class:"hint" });
    const btn = el("button", { class:"btn" }, "Bagikan kemenangan");
    const fileIn = el("input", { type:"file", accept:"image/*", class:"field" });
    fileIn.addEventListener("change", () => { f.file = fileIn.files[0] || null; });
    btn.onclick = async () => {
      if (!f.judul.trim() || !f.angka.trim() || !f.cara.trim()) { msg.className = "err"; msg.textContent = "Judul, hasil, dan cara yang dilakukan wajib diisi."; return; }
      if (f.url && !/^https?:\/\//i.test(f.url.trim())) { msg.className = "err"; msg.textContent = "Link harus diawali https://"; return; }
      btn.disabled = true; msg.className = "hint"; msg.textContent = "Mengunggah…";
      try {
        let gambar = "";
        if (f.file) {
          const blob = await kompresGambar(f.file);
          gambar = me.id + "/" + Date.now() + ".jpg";
          const { error } = await sb.storage.from("kisah").upload(gambar, blob, { contentType:"image/jpeg" });
          if (error) throw error;
        }
        await q(sb.from("kisah").insert({ member_id: me.id, judul: f.judul.trim(), url: f.url.trim(), platform: f.platform || "", format: f.format || "", angka: f.angka.trim(), cara: f.cara.trim(), pelajaran: f.pelajaran.trim(), gambar }));
        toast("Kemenanganmu tayang! 🎉"); route();
      } catch (e) { btn.disabled = false; msg.className = "err"; msg.textContent = "Gagal: " + e.message; }
    };
    return el("section", { class:"panel pad stack", style:"gap:12px" },
      el("div", { class:"row between" }, el("h2", "Spill kemenanganmu"), el("button", { class:"btn ghost sm", onclick: () => { buat = false; draw(); } }, "Tutup")),
      el("label", { class:"lbl" }, "Judul *", input(f, "judul", { placeholder:"Contoh: Video deret tembus 300 ribu views" })),
      el("div", { class:"grid2" },
        el("label", { class:"lbl" }, "Hasilnya *", input(f, "angka", { placeholder:"Contoh: 312rb views, 9rb share, 140 download" })),
        el("label", { class:"lbl" }, "Link konten", input(f, "url", { placeholder:"https://…" }))),
      el("div", { class:"lbl" }, "Platform", pilihan(PLATFORM.map(v => ({ v, label:v, toggle:true })), { get: () => f.platform, set: v => f.platform = v || "" })),
      el("div", { class:"lbl" }, "Format", pilihan(FORMAT.map(v => ({ v, label:v, toggle:true })), { get: () => f.format, set: v => f.format = v || "" })),
      el("label", { class:"lbl" }, "Cara yang dilakukan *", input(f, "cara", { multiline:true, rows:"3", placeholder:"Apa yang beda dari biasanya? Hook-nya, jam posting, CTA, topik?" })),
      el("label", { class:"lbl" }, "Pelajaran buat tim", input(f, "pelajaran", { multiline:true, rows:"2", placeholder:"Kalau tim mau niru, apa yang paling penting?" })),
      el("label", { class:"lbl" }, "Screenshot (opsional)", fileIn),
      el("div", { class:"row" }, btn), msg);
  }
  function kartu(x) {
    const rs = reaksi.filter(r => r.kisah_id === x.id);
    return el("article", { class:"panel menang" + (x.viral ? " viral" : "") },
      x.gambar ? el("a", { href: urlGambar(x.gambar), target:"_blank", rel:"noopener" }, el("img", { src: urlGambar(x.gambar), alt:"Screenshot " + x.judul, loading:"lazy" })) : null,
      el("div", { class:"stack", style:"gap:8px;padding:16px 18px" },
        el("div", { class:"row", style:"gap:6px" }, x.viral ? el("span", { class:"chip attn" }, "🚀 Viral") : null, x.platform ? el("span", { class:"chip brand" }, x.platform) : null, x.format ? el("span", { class:"chip" }, x.format) : null),
        el("h3", { style:"font-size:1.15rem" }, x.judul),
        el("p", { class:"menang-angka" }, x.angka),
        el("p", { class:"hint" }, "oleh " + namaOf(x.member_id) + " · " + fmt(keyOf(new Date(x.created_at)), { day:"numeric", month:"short" })),
        el("div", el("b", "Caranya: "), x.cara),
        x.pelajaran ? el("div", { class:"note" }, el("b", "Pelajaran: "), x.pelajaran) : null,
        x.url ? el("div", el("a", { class:"btn ghost sm", href:x.url, target:"_blank", rel:"noopener" }, "Lihat konten ↗")) : null,
        el("div", { class:"row", style:"gap:6px" },
          REAKSI.map(([k, e]) => { const n = rs.filter(r => r.emoji === k).length, aku = rs.some(r => r.emoji === k && r.member_id === me.id);
            return el("button", { class:"btn sm" + (aku ? "" : " ghost"), onclick: async () => {
              try { if (aku) await q(sb.from("kisah_reaksi").delete().eq("kisah_id", x.id).eq("member_id", me.id).eq("emoji", k)); else await q(sb.from("kisah_reaksi").insert({ kisah_id: x.id, member_id: me.id, emoji: k })); route(); }
              catch (er) { toast("Gagal: " + er.message); } } }, e + " " + n); }),
          me.is_admin ? el("button", { class:"btn ghost sm", onclick: async () => {
            try { await q(sb.from("kisah").update({ viral: !x.viral }).eq("id", x.id));
              if (!x.viral) await kirimPesan(x.member_id, `Kisahmu "${x.judul}" ditandai VIRAL 🚀 Lencana Viral Hunter buat kamu!`, "apresiasi");
              route(); } catch (er) { toast("Gagal: " + er.message); } } }, x.viral ? "Batal viral" : "Tandai viral 🚀") : null,
          x.member_id === me.id || me.is_admin ? el("button", { class:"btn danger sm", onclick: async () => {
            if (!confirm("Hapus kisah ini?")) return;
            try { if (x.gambar) await sb.storage.from("kisah").remove([x.gambar]); await q(sb.from("kisah").delete().eq("id", x.id)); route(); } catch (er) { toast("Gagal: " + er.message); } } }, "Hapus") : null)));
  }
  function draw() {
    const xs = rows.filter(x => filter === "semua" || (filter === "saya" ? x.member_id === me.id : x.viral));
    box.replaceChildren(
      el("div", { class:"page-head" },
        el("div", el("h1", "Spill Menang"), el("p", { class:"hint" }, "Konten yang berhasil dan cara yang berhasil. Bagikan biar tim bisa niru, kasih reaksi biar yang bikin makin semangat.")),
        me.peran !== "leader" ? el("button", { class:"btn", onclick: () => { buat = true; draw(); } }, "+ Spill kemenangan") : null),
      buat ? form() : null,
      pilihan([{ v:"semua", label:"Semua" }, { v:"viral", label:"🚀 Viral" }, { v:"saya", label:"Punyaku" }], { get: () => filter, set: v => filter = v, onChange: draw }),
      xs.length ? el("div", { class:"menang-grid" }, xs.map(kartu)) : el("div", { class:"panel pad" }, el("p", { class:"empty" }, "Belum ada kisah sukses. Jadi yang pertama, biar namamu nangkring di sini.")));
  }
  draw();
  return box;
}

/* ================= POP-UP APRESIASI ================= */
const APRESIASI_UMUM = [
  "Welcome back! Tim ini tanpa kamu kayak caption tanpa CTA: kurang nendang.",
  "Kamu balik lagi! Algoritma aja belum tentu sesetia kamu.",
  "Kerja kerasmu mungkin nggak selalu masuk FYP, tapi selalu masuk hitungan kami.",
  "Halo lagi! Sekadar info: kamu keren. Udah, itu aja. Lanjut kerja.",
  "Kamu tuh kayak Wi-Fi kantor: kalau nggak ada, semua orang langsung kerasa.",
  "Welcome back, bestie. Progress kecil tetap progress, jangan diremehin.",
  "Balik lagi nih? Tandanya kamu peduli. Itu red flag… tapi red flag yang bagus.",
  "Apresiasi hari ini buat kamu yang tetap jalan walaupun views lagi pelit.",
  "Info penting: effort kamu kelihatan, walaupun kamu ngerjainnya diem-diem.",
  "Kerja bagus itu nggak harus berisik. Yang kayak kamu ini contohnya.",
  "Kalau kerja keras bisa ditukar poin, kamu udah bisa redeem liburan.",
  "Kamu balik! Grup chat kantor aja nggak seantusias ini nyambut kamu.",
  "Makasih udah jadi orang yang bikin tim ini nggak cuma jalan, tapi jalan bareng.",
  "Apresiasi spesial buat kamu yang masih semangat walau kopi udah dingin.",
  "Kamu tuh aset. Bukan aset Canva, aset beneran.",
  "Satu konten mungkin flop, tapi kamu nggak pernah flop di mata tim.",
  "Plot twist hari ini: kamu lebih jago dari yang kamu kira.",
  "Kalau ada penghargaan 'Paling Bisa Diandalkan', kandidatnya kamu. Juri: kami semua.",
  "Hari ini kamu belum dipuji siapa-siapa? Nah, ini dia: kamu hebat. Sama-sama.",
  "Tim tanpa kamu tuh kayak konten tanpa hook: orang langsung skip.",
];
function apresiasiPersonal(data) {
  const { me, lencanaBaru, streak, kemarin100, ideDipakai, reaksiMinggu, risetMinggu } = data;
  if (lencanaBaru) { const i = infoLencana(lencanaBaru.kode); return `Lencana baru mendarat: ${i.emoji} ${i.nama}! Mau dipajang di bio? Boleh. Pamer ke grup? Wajib.`; }
  if (ideDipakai) return `Idemu "${ideDipakai.judul}" dipakai tim. Kamu resmi jadi otak di balik layar, tinggal kurang jas lab doang.`;
  if (reaksiMinggu >= 3) return `Kisah suksesmu dapet ${reaksiMinggu} reaksi minggu ini. Selebgram internal kantor detected. 🔥`;
  if (streak >= 3) return `Streak check-in ${streak} hari kerja beruntun. Konsistennya ngalahin jadwal tayang sinetron.`;
  if (kemarin100) return "Checklist kemarin 100%. Leader liat ini auto senyum-senyum sendiri.";
  if (risetMinggu >= 3) return `Udah ${risetMinggu} riset kompetitor minggu ini. Kompetitor kita kayaknya mulai ngerasa diawasin. 🕵️`;
  return APRESIASI_UMUM[Math.floor(Math.random() * APRESIASI_UMUM.length)];
}
async function cekApresiasi() {
  if (!S.me || S.me.peran === "leader" || document.querySelector(".overlay")) return;
  const kAktif = "spill-aktif-" + S.me.id, kHari = "spill-apr-" + today() + "-" + S.me.id, kLihat = "spill-lencana-lihat-" + S.me.id;
  let terakhir = 0, kali = 0, lihat = "";
  try { terakhir = Number(localStorage.getItem(kAktif) || 0); kali = Number(localStorage.getItem(kHari) || 0); lihat = localStorage.getItem(kLihat) || ""; } catch (e) {}
  const motivasiSudah = (() => { try { return !!localStorage.getItem("spill-motivasi-" + today() + "-" + S.me.id); } catch (e) { return false; } })();
  const tandai = () => { try { localStorage.setItem(kAktif, String(Date.now())); } catch (e) {} };
  // Muncul saat membuka ulang setelah ≥ 60 menit pergi, maksimal 3 kali sehari, dan tidak di kunjungan pertama hari ini (itu jatah motivasi).
  if (!motivasiSudah || !terakhir || Date.now() - terakhir < 60 * 60 * 1000 || kali >= 3) { tandai(); return; }
  tandai();
  const me = S.me, t = today(), awalMinggu = rentangPeriode("minggu").awal;
  const [ls, cis, dcK, ide, kisah] = await Promise.all([
    q(sb.from("lencana").select("*").eq("member_id", me.id).order("created_at", { ascending:false }).limit(1)),
    q(sb.from("checkins").select("tanggal").eq("member_id", me.id).gte("tanggal", addDays(t, -40)).order("tanggal", { ascending:false })),
    (() => { let k = addDays(t, -1); while (isWeekend(k)) k = addDays(k, -1); return q(sb.from("daily_checklists").select("*").eq("member_id", me.id).eq("tanggal", k).maybeSingle()).then(r => ({ r, k })); })(),
    q(sb.from("ide").select("judul,dipakai_at").eq("member_id", me.id).eq("status", "dipakai").gte("dipakai_at", parseKey(addDays(t, -7)).toISOString()).limit(1)),
    q(sb.from("kisah").select("id").eq("member_id", me.id))]).catch(() => [[], [], { r:null }, [], []]);
  let streak = 0; const ada = new Set(cis.map(c => c.tanggal));
  for (let k = ada.has(t) ? t : addDays(t, -1), i = 0; i < 60; i++, k = addDays(k, -1)) { if (isWeekend(k)) continue; if (ada.has(k)) streak++; else break; }
  let reaksiMinggu = 0;
  if (kisah.length) { const rs = await q(sb.from("kisah_reaksi").select("member_id,created_at").in("kisah_id", kisah.map(x => x.id)).gte("created_at", parseKey(awalMinggu).toISOString())).catch(() => []); reaksiMinggu = rs.filter(r => r.member_id !== me.id).length; }
  let risetMinggu = 0;
  if (me.peran === "sms") { const { count } = await sb.from("riset_kompetitor").select("id", { count:"exact", head:true }).eq("member_id", me.id).gte("tanggal", awalMinggu); risetMinggu = count || 0; }
  const baru = ls[0] && ls[0].created_at > lihat ? ls[0] : null;
  const teks = apresiasiPersonal({ me, lencanaBaru: baru, streak, kemarin100: dcK.r && pctOf(dcK.r, me, dcK.k) === 100, ideDipakai: ide[0], reaksiMinggu, risetMinggu });
  try { localStorage.setItem(kHari, String(kali + 1)); if (baru) localStorage.setItem(kLihat, baru.created_at); } catch (e) {}
  const tutup = () => { ov.remove(); document.removeEventListener("keydown", esc); };
  const esc = e => { if (e.key === "Escape") tutup(); };
  const btn = el("button", { class:"btn", onclick: tutup }, "Makasih, gas lagi!");
  const ov = el("div", { class:"overlay", role:"dialog", "aria-modal":"true", "aria-labelledby":"apr-judul", onclick: e => { if (e.target === ov) tutup(); } },
    el("div", { class:"mot apr" },
      el("span", { class:"sticker" }, "Apresiasi buat " + me.nama),
      el("p", { id:"apr-judul", class:"mot-sapa" }, "Welcome back! 👋"),
      el("blockquote", { class:"mot-teks" }, teks),
      btn));
  document.body.append(ov);
  document.addEventListener("keydown", esc);
  btn.focus();
}
document.addEventListener("visibilitychange", () => {
  if (!S.me) return;
  if (document.visibilityState === "hidden") { try { localStorage.setItem("spill-aktif-" + S.me.id, String(Date.now())); } catch (e) {} }
  else cekApresiasi();
});

/* ================= AKUN ================= */
async function viewAkun() {
  const me = S.me;
  const f = { p:"", p2:"" };
  const msg = el("p", { class:"hint" });
  return el("div", { class:"stack", style:"max-width:520px" },
    el("h1", "Akun"),
    el("section", { class:"panel pad mini" },
      el("div", { class:"line" }, el("span", { class:"hint" }, "Nama"), el("span", me.nama)),
      el("div", { class:"line" }, el("span", { class:"hint" }, "Username"), el("span", me.username)),
      el("div", { class:"line" }, el("span", { class:"hint" }, "Peran"), el("span", PERAN_LABEL[me.peran] + (me.is_admin ? " · admin" : "")))),
    el("section", { class:"panel pad stack", style:"gap:12px" },
      el("h2", "Ganti kata sandi"),
      el("label", { class:"lbl" }, "Kata sandi baru (minimal 8 karakter)", input(f, "p", { type:"password", autocomplete:"new-password" })),
      el("label", { class:"lbl" }, "Ulangi kata sandi baru", input(f, "p2", { type:"password", autocomplete:"new-password" })),
      el("div", el("button", { class:"btn", onclick: async () => {
        if (f.p.length < 8) { msg.className = "err"; msg.textContent = "Minimal 8 karakter."; return; }
        if (f.p !== f.p2) { msg.className = "err"; msg.textContent = "Konfirmasi tidak sama."; return; }
        if (f.p.trim().toLowerCase() === SANDI_AWAL) { msg.className = "err"; msg.textContent = "Pilih sandi lain, jangan sama dengan sandi awal."; return; }
        const { error } = await sb.auth.updateUser({ password: f.p });
        if (!error) await sb.rpc("selesai_ganti_sandi");
        msg.className = error ? "err" : "ok"; msg.textContent = error ? "Gagal: " + error.message : "Kata sandi berhasil diganti.";
      } }, "Simpan kata sandi")), msg),
    el("div", el("button", { class:"btn ghost", onclick: async () => { await sb.auth.signOut(); location.hash = ""; boot(); } }, "Keluar")));
}

/* ================= RINGKASAN TIM (ADMIN) ================= */
async function viewTim() {
  const d = S.timDate || today();
  const start = addDays(d, -6);
  const dayStart = parseKey(d).toISOString(), dayEnd = parseKey(addDays(d, 1)).toISOString();
  const [cis, dcs, msgs, exps, tasks] = await Promise.all([
    q(sb.from("checkins").select("*").gte("tanggal", start).lte("tanggal", d)),
    q(sb.from("daily_checklists").select("*").gte("tanggal", addDays(d, -1)).lte("tanggal", d)),
    q(sb.from("messages").select("member_id,author_id,jenis,body,created_at").gte("created_at", dayStart).lt("created_at", dayEnd)),
    q(sb.from("experiments").select("member_id,hasil,judul,updated_at").eq("status", "selesai").gte("updated_at", parseKey(addDays(d, -6)).toISOString()).lt("updated_at", dayEnd)),
    q(sb.from("tasks").select("member_id,judul,status").eq("status", "sedang"))]);
  const ci = (id, k) => cis.find(c => c.member_id === id && c.tanggal === k);
  const dcOf = (id, k) => dcs.find(c => c.member_id === id && c.tanggal === k);
  const orang = team();
  const wk = isWeekend(d);

  const tglSel = el("select", { class:"field", style:"max-width:260px", onchange: e => { S.timDate = e.target.value; route(); } },
    Array.from({ length: 14 }, (_, i) => addDays(today(), -i)).map(k => el("option", { value:k, ...(k === d ? { selected:true } : {}) }, (k === today() ? "Hari ini, " : "") + fmt(k))));

  if (wk) {
    return el("div", { class:"stack" },
      el("div", { class:"page-head" }, el("div", el("h1", "Ringkasan tim"), el("p", { class:"hint" }, "Akhir pekan: tidak ada check-in, hanya Story.")), tglSel),
      el("section", { class:"panel pad table-wrap" }, el("table",
        el("thead", el("tr", el("th", "Nama"), el("th", "Story IG & TikTok"))),
        el("tbody", orang.filter(m => m.peran === "sms").map(m => { const s = dcOf(m.id, d)?.items?.story?.status;
          return el("tr", el("td", m.nama), el("td", s === "selesai" ? el("span", { class:"chip calm" }, "Selesai") : s === "tidak_ada" ? el("span", { class:"chip" }, "Tidak ada") : el("span", { class:"chip attn" }, "Belum"))); })))));
  }

  const data = orang.map(m => {
    const c = ci(m.id, d), dc = dcOf(m.id, d), kemarin = ci(m.id, addDays(d, -1));
    const pctHari = pctOf(dc, m, d);
    let kemarinKerja = addDays(d, -1); while (isWeekend(kemarinKerja)) kemarinKerja = addDays(kemarinKerja, -1);
    const pctKemarin = pctOf(dcOf(m.id, kemarinKerja), m, kemarinKerja);
    const attn = [], good = [];
    if (dc?.cuti) return { m, c, dc, cuti:true, attn, good, grup:"cuti" };
    if (c) {
      if (c.energi <= 2 && kemarin && kemarin.energi <= 2) attn.push("Energi rendah 2 hari");
      else if (c.energi <= 2) attn.push("Energi rendah hari ini");
      const map = { "Tidak yakin prioritas":"Butuh keputusan prioritas", "Menunggu orang lain":"Menunggu orang lain", "Tidak tahu caranya":"Butuh dicontohkan", "Waktu habis untuk hal lain":"Waktu tersita" };
      if (map[c.hambatan]) attn.push(map[c.hambatan]);
      if (c.bantuan) attn.push("Minta bantuan");
    }
    const ex = exps.filter(x => x.member_id === m.id && (x.hasil === "a" || x.hasil === "b"));
    if (ex.length) good.push(ex.length + " eksperimen selesai minggu ini");
    if (pctKemarin === 100 && dcOf(m.id, kemarinKerja)) good.push("Checklist kemarin 100%");
    const grup = attn.length ? "attn" : good.length ? "appr" : !c ? "belum" : "calm";
    return { m, c, dc, pctHari, attn, good, grup, ex, tugas: tasks.filter(t => t.member_id === m.id) };
  });

  function kartu(x) {
    const m = x.m, c = x.c;
    const sudah = msgs.filter(g => g.member_id === m.id && g.author_id === S.me.id);
    const energi = Array.from({ length: 7 }, (_, i) => ci(m.id, addDays(d, i - 6))?.energi ?? null);
    const card = el("div", { class:"person" },
      el("div", { class:"person-top" },
        el("div", { class:"row", style:"gap:8px" }, el("b", m.nama), x.pctHari != null ? el("span", { class:"chip" }, "Checklist " + x.pctHari + "%") : null),
        weekBars(energi)),
      (x.attn.length || x.good.length) ? el("div", { class:"row", style:"gap:6px" }, x.attn.map(r => el("span", { class:"chip attn" }, r)), x.good.map(r => el("span", { class:"chip appr" }, r))) : null,
      c ? el("p", { style:"font-size:14px" }, c.ringkasan) : null,
      c?.langkah ? el("p", { class:"hint" }, "Langkah pertama: " + c.langkah) : null,
      c?.pelajaran ? el("p", { class:"hint" }, "Pelajaran: " + c.pelajaran) : null,
      c?.bantuan ? el("div", { class:"ask" }, c.bantuan) : null,
      x.tugas?.length ? el("p", { class:"hint" }, "Sedang dikerjakan: " + x.tugas.map(t => t.judul).join(", ")) : null);
    if (sudah.length) card.append(el("p", { class:"ok", style:"font-size:13px" }, "Sudah kamu sapa hari ini: " + sudah[sudah.length - 1].body.slice(0, 80)));
    const form = el("div", { class:"stack", style:"gap:8px", hidden:true });
    const f = { v:"" };
    const ta = input(f, "v", { multiline:true, rows:"2", placeholder:`Balas ${m.nama}…` });
    const kirim = async (body, jenis) => { try { await kirimPesan(m.id, body, jenis); toast("Terkirim ke " + m.nama); route(); } catch (e) { toast("Gagal: " + e.message); } };
    form.append(ta, el("div", { class:"row" }, el("button", { class:"btn sm", onclick: () => f.v.trim() && kirim(f.v.trim(), "pesan") }, "Kirim"), el("button", { class:"btn ghost sm", onclick: () => form.hidden = true }, "Batal")));
    card.append(el("div", { class:"row", style:"gap:6px" },
      el("button", { class:"btn sm", onclick: () => { form.hidden = false; ta.focus(); } }, "Balas"),
      el("button", { class:"btn ghost sm", onclick: () => kirim("Kerja bagus hari ini, terima kasih. Lanjutkan!", "apresiasi") }, "Beri apresiasi"),
      x.grup === "attn" ? el("button", { class:"btn ghost sm", onclick: () => kirim("Kita ngobrol 15 menit hari ini ya, nanti saya kabari jamnya.", "1on1") }, "Ajak 1:1") : null,
), form);
    return card;
  }
  const by = g => data.filter(x => x.grup === g);
  const attn = by("attn").sort((a, b) => b.attn.length - a.attn.length || a.c.energi - b.c.energi);
  const group = (judul, warna, list, kosong, fn = kartu) => el("section", { class:"panel group" },
    el("div", { class:"group-head" }, el("span", { class:"dot", style:`background:${warna}` }), el("h2", `${judul} (${list.length})`)),
    list.length ? list.map(fn) : el("p", { class:"hint" }, kosong));
  const sudahCI = data.filter(x => x.c).length;
  return el("div", { class:"stack" },
    el("div", { class:"page-head" }, el("div", el("h1", "Ringkasan tim"), el("p", { class:"hint" }, "Dipilah otomatis dari check-in pagi dan checklist.")), tglSel),
    el("div", { class:"stats" },
      el("div", { class:"stat" }, el("b", `${sudahCI}/${orang.length}`), el("span", "Sudah check-in")),
      el("div", { class:"stat attn" }, el("b", String(attn.length)), el("span", "Perlu perhatianmu")),
      el("div", { class:"stat appr" }, el("b", String(data.filter(x => x.good.length).length)), el("span", "Layak diapresiasi")),
      el("div", { class:"stat" }, el("b", String(by("cuti").length)), el("span", "Cuti / izin"))),
    el("div", { class:"groups" },
      group("Perlu perhatian", "var(--attn)", attn, sudahCI ? "Tidak ada yang perlu perhatian khusus." : "Belum ada check-in masuk."),
      el("div", { class:"stack" },
        group("Layak diapresiasi", "var(--appr)", by("appr"), "Belum ada."),
        group("Aman", "var(--calm)", by("calm"), "Belum ada."),
        group("Belum check-in", "var(--line)", by("belum"), "Semua sudah check-in.", x => el("div", { class:"row between", style:"padding:4px 0" },
          el("span", x.m.nama),
          msgs.some(g => g.member_id === x.m.id && g.author_id === S.me.id) ? el("span", { class:"hint" }, "Sudah diingatkan")
            : el("button", { class:"btn ghost sm", onclick: async () => { try { await kirimPesan(x.m.id, "Hai! Jangan lupa check-in hari ini ya, cuma 2 menit kok.", "pesan"); toast("Pengingat terkirim ke " + x.m.nama); route(); } catch (e) { toast("Gagal: " + e.message); } } }, "Ingatkan"))),
        by("cuti").length ? group("Cuti / izin", "var(--muted)", by("cuti"), "", x => el("div", { style:"padding:4px 0" }, x.m.nama)) : null)));
}

/* ================= REKAP CHECKLIST (ADMIN) ================= */
async function viewRekap() {
  const now = today();
  const bulan = S.rekapBulan || now.slice(0, 7);
  const [y, mo] = bulan.split("-").map(Number);
  const awal = `${bulan}-01`, akhir = keyOf(new Date(y, mo, 0));
  const batas = akhir < now ? akhir : now;
  const dcs = awal <= now ? await q(sb.from("daily_checklists").select("*").gte("tanggal", awal).lte("tanggal", batas)) : [];
  const hari = []; for (let k = awal; k <= batas; k = addDays(k, 1)) hari.push(k);
  const kerja = hari.filter(k => !isWeekend(k)), libur = hari.filter(isWeekend);
  const orang = team().filter(m => m.peran === "sms");
  const dcOf = (id, k) => dcs.find(c => c.member_id === id && c.tanggal === k);
  const baris = orang.map(m => {
    let tot = 0, n = 0, full = 0, cuti = 0, diisi = 0, story = 0;
    kerja.forEach(k => { const dc = dcOf(m.id, k); if (dc?.cuti) { cuti++; return; } const p = pctOf(dc, m, k); if (dc && Object.keys(dc.items || {}).length) diisi++; tot += p; n++; if (p === 100) full++; });
    libur.forEach(k => { if (dcOf(m.id, k)?.items?.story?.status === "selesai") story++; });
    return { m, rata: n ? Math.round(tot / n) : null, full, cuti, diisi, n, story };
  });
  const itemRate = S.items.filter(i => i.aktif).map(it => {
    let done = 0, den = 0;
    orang.forEach(m => kerja.forEach(k => { const dc = dcOf(m.id, k); if (dc?.cuti) return; const s = dc?.items?.[it.id]?.status; if (s === "tidak_ada") return; den++; if (s === "selesai") done++; }));
    return { it, pct: den ? Math.round(done / den * 100) : null };
  });
  const opsi = Array.from({ length: 6 }, (_, i) => { const dt = new Date(); dt.setDate(1); dt.setMonth(dt.getMonth() - i); return keyOf(dt).slice(0, 7); });
  const sel = el("select", { class:"field", style:"max-width:220px", onchange: e => { S.rekapBulan = e.target.value; route(); } },
    opsi.map(b => el("option", { value:b, ...(b === bulan ? { selected:true } : {}) }, parseKey(b + "-01").toLocaleDateString("id-ID", { month:"long", year:"numeric" }))));
  function unduh() {
    const items = S.items.filter(i => i.aktif);
    const head = ["Nama","Tanggal","Hari","Cuti", ...items.map(i => i.label), "Tugas tambahan selesai", "% Selesai", "Keterangan"];
    const rows = [head];
    orang.forEach(m => hari.forEach(k => {
      const dc = dcOf(m.id, k); const p = pctOf(dc, m, k);
      rows.push([m.nama, k, fmt(k, { weekday:"long" }), dc?.cuti ? "Ya" : "", ...items.map(i => { const s = dc?.items?.[i.id]?.status; return s === "selesai" ? "Selesai" : s === "tidak_ada" ? "Tidak ada" : ""; }),
        (dc?.tambahan || []).filter(t => t.selesai).map(t => t.judul).join("; "), p == null ? "" : p + "%", dc?.catatan || ""]);
    }));
    const csv = "\uFEFF" + rows.map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(",")).join("\r\n");
    const a = el("a", { href: URL.createObjectURL(new Blob([csv], { type:"text/csv;charset=utf-8" })), download:`rekap-checklist-${bulan}.csv` });
    document.body.append(a); a.click(); a.remove();
  }
  const warna = p => p == null ? "" : p >= 90 ? "calm" : p >= 70 ? "" : "attn";
  return el("div", { class:"stack" },
    el("div", { class:"page-head" }, el("div", el("h1", "Rekap checklist"), el("p", { class:"hint" }, `Hari kerja dihitung sampai ${fmt(batas)}. Hari cuti tidak dihitung, hari tanpa isian dihitung 0%.`)),
      el("div", { class:"row" }, sel, el("button", { class:"btn ghost", onclick: unduh }, "Unduh CSV"))),
    el("section", { class:"panel pad table-wrap" }, el("table",
      el("thead", el("tr", el("th", "Nama"), el("th", { class:"num" }, "Rata-rata"), el("th", { class:"num" }, "Hari 100%"), el("th", { class:"num" }, "Hari diisi"), el("th", { class:"num" }, "Cuti"), el("th", { class:"num" }, "Story akhir pekan"))),
      el("tbody", baris.sort((a, b) => (b.rata ?? -1) - (a.rata ?? -1)).map(b => el("tr",
        el("td", b.m.nama),
        el("td", { class:"num" }, b.rata == null ? "–" : el("span", { class:"chip " + warna(b.rata) }, b.rata + "%")),
        el("td", { class:"num" }, `${b.full}/${b.n}`), el("td", { class:"num" }, `${b.diisi}/${b.n}`), el("td", { class:"num" }, String(b.cuti)), el("td", { class:"num" }, `${b.story}/${libur.length}`)))))),
    el("section", { class:"panel pad stack", style:"gap:10px" }, el("h2", "Per item (seluruh tim)"),
      el("p", { class:"hint" }, "Item dengan persentase rendah bisa jadi tanda tugasnya kurang jelas, terlalu berat, atau memang bukan pekerjaan harian."),
      el("div", { class:"table-wrap" }, el("table", el("tbody", itemRate.map(r => el("tr", el("td", r.it.label), el("td", { class:"num" }, r.pct == null ? "–" : el("span", { class:"chip " + warna(r.pct) }, r.pct + "%")))))))));
}

/* ================= ATUR TIM (ADMIN) ================= */
async function viewAtur() {
  await loadBase();
  const resets = await q(sb.from("reset_requests").select("*").eq("status", "pending").order("created_at"));
  const box = el("div", { class:"stack" });
  let hasil = [];
  const PERAN = { sms:"Social media", kerja:"Marketplace & live / asisten", leader:"Leader" };
  async function akun(action, m, password) {
    const { data, error } = await sb.functions.invoke("admin-akun", { body: { action, member_id: m.id, password } });
    if (error) throw new Error(await fnErr(error));
    return data;
  }
  async function satu(action, m) {
    const pw = genPassword();
    try { await akun(action, m, pw); hasil = [{ nama: m.nama, username: m.username, pw }]; toast(action === "create" ? "Akun dibuat" : "Sandi diatur ulang"); await loadBase(); draw(); }
    catch (e) { toast(e.message); }
  }
  function draw() {
    const belum = S.members.filter(m => !m.user_id && m.aktif);
    const teks = hasil.map(h => `${h.nama}\nUsername: ${h.username}\nKata sandi: ${h.pw}`).join("\n\n");
    const baru = { nama:"", username:"", peran:"sms" };
    box.replaceChildren(
      el("div", el("h1", "Atur tim"), el("p", { class:"hint" }, `Anggota login di ${location.host} dengan username dan sandi awal "${SANDI_AWAL}", tanpa email. Saat pertama masuk, mereka wajib mengganti sandinya sendiri. Reset sandi juga mengembalikan ke sandi awal.`)),
      hasil.length ? el("section", { class:"panel pad stack", style:"gap:10px;border-color:var(--brand)" },
        el("div", { class:"row between" }, el("h2", "Kirimkan ke masing-masing anggota"),
          el("button", { class:"btn sm", onclick: async () => { try { await navigator.clipboard.writeText(teks); toast("Disalin"); } catch { toast("Salin manual dari tabel"); } } }, "Salin semua")),
        el("div", { class:"note warn" }, `Sandi awal semua akun adalah "${SANDI_AWAL}". Setiap anggota wajib menggantinya sendiri saat pertama kali masuk.`),
        el("div", { class:"table-wrap" }, el("table", el("thead", el("tr", el("th", "Nama"), el("th", "Username"), el("th", "Kata sandi"))),
          el("tbody", hasil.map(h => el("tr", el("td", h.nama), el("td", h.username), el("td", el("code", h.pw)))))))) : null,
      resets.length ? el("section", { class:"panel pad stack", style:"gap:8px" }, el("h2", "Permintaan reset sandi"),
        resets.map(r => { const m = S.members.find(x => x.username === r.username);
          return el("div", { class:"row between" }, el("span", `${r.username} · ${jam(r.created_at)}`),
            m && m.user_id ? el("button", { class:"btn sm", onclick: async () => { await satu("reset", m); route(); } }, "Buat sandi baru")
              : el("span", { class:"hint" }, "Username tidak dikenal")); })) : null,
      el("section", { class:"panel pad stack", style:"gap:12px" },
        el("div", { class:"row between" }, el("h2", "Anggota"),
          belum.length ? el("button", { class:"btn", onclick: async e => {
            e.target.disabled = true; hasil = [];
            for (const m of belum) { const pw = genPassword(); try { await akun("create", m, pw); hasil.push({ nama: m.nama, username: m.username, pw }); } catch (er) { toast(m.username + ": " + er.message); } }
            await loadBase(); draw(); } }, `Buat akun untuk ${belum.length} anggota`) : null),
        el("div", { class:"table-wrap" }, el("table",
          el("thead", el("tr", el("th", "Nama"), el("th", "Username"), el("th", "Peran"), el("th", "Akun"), el("th", ""))),
          el("tbody", [...S.members].sort((a, b) => (a.peran === "leader") - (b.peran === "leader") || a.nama.localeCompare(b.nama)).map(m => el("tr", { style: m.aktif ? "" : "opacity:.5" },
            el("td", m.nama, m.is_admin ? el("span", { class:"chip brand", style:"margin-left:6px" }, "admin") : null),
            el("td", m.username), el("td", PERAN[m.peran]),
            el("td", m.user_id ? el("span", { class:"chip calm" }, "Aktif") : el("span", { class:"chip" }, "Belum ada")),
            el("td", el("div", { class:"row", style:"gap:6px;flex-wrap:nowrap" },
              m.user_id ? el("button", { class:"btn ghost sm", onclick: () => satu("reset", m) }, "Reset sandi") : el("button", { class:"btn sm", onclick: () => satu("create", m) }, "Buat akun"),
              m.id !== S.me.id && m.peran !== "leader" ? el("button", { class:"btn ghost sm", onclick: async () => {
                if (!confirm(`${m.is_admin ? "Cabut" : "Beri"} akses admin untuk ${m.nama}? Admin bisa membaca mood dan hambatan seluruh tim.`)) return;
                await q(sb.from("members").update({ is_admin: !m.is_admin }).eq("id", m.id)); await loadBase(); draw(); } }, m.is_admin ? "Cabut admin" : "Jadikan admin") : null,
              m.id !== S.me.id ? el("button", { class:"btn danger sm", onclick: async () => {
                if (!confirm(`${m.aktif ? "Nonaktifkan" : "Aktifkan kembali"} ${m.nama}?`)) return;
                await q(sb.from("members").update({ aktif: !m.aktif }).eq("id", m.id)); await loadBase(); draw(); } }, m.aktif ? "Nonaktifkan" : "Aktifkan") : null)))))))),
      el("section", { class:"panel pad stack", style:"gap:10px" }, el("h2", "Tambah anggota"),
        el("div", { class:"grid2" }, el("label", { class:"lbl" }, "Nama", input(baru, "nama")), el("label", { class:"lbl" }, "Username", input(baru, "username", { placeholder:"huruf kecil, contoh: dinda", autocapitalize:"none" }))),
        el("div", { class:"lbl" }, "Peran", pilihan([{ v:"sms", label:"Social media specialist" }, { v:"kerja", label:"Marketplace & live / asisten" }], { get: () => baru.peran, set: v => baru.peran = v })),
        el("div", el("button", { class:"btn", onclick: async () => {
          const u = baru.username.trim().toLowerCase();
          if (!baru.nama.trim() || !/^[a-z0-9][a-z0-9._-]{2,29}$/.test(u)) return toast("Isi nama dan username 3–30 karakter (huruf kecil, angka, titik, strip).");
          try { await q(sb.from("members").insert({ nama: baru.nama.trim(), username: u, peran: baru.peran })); toast("Anggota ditambahkan. Buat akunnya dari tabel."); await loadBase(); draw(); }
          catch (e) { toast(/duplicate|unique/i.test(e.message) ? "Username sudah dipakai." : "Gagal: " + e.message); } } }, "Tambah anggota"))),
      el("section", { class:"panel pad stack", style:"gap:8px" }, el("h2", "Item checklist social media"),
        el("p", { class:"hint" }, "Matikan item yang tidak lagi dipakai. Item bertanda akhir pekan juga muncul di hari Sabtu dan Minggu."),
        S.items.map(it => el("label", { class:"extra" },
          el("input", { type:"checkbox", ...(it.aktif ? { checked:true } : {}), onchange: async e => { try { await q(sb.from("checklist_items").update({ aktif: e.target.checked }).eq("id", it.id)); it.aktif = e.target.checked; toast("Tersimpan"); } catch (er) { toast("Gagal: " + er.message); } } }),
          el("span", it.label), it.jadwal === "semua" ? el("span", { class:"chip brand" }, "akhir pekan juga") : null))));
  }
  draw();
  return box;
}

/* ================= MULAI ================= */
const VIEWS = { juara: viewJuara, ide: viewIde, menang: viewMenang, modul: viewModul, link: viewTautan, struktur: viewStruktur, lainnya: viewLainnya, hari: viewHari, kerja: viewKerja, eksperimen: viewEksperimen, riset: viewRiset, masukan: viewMasukan, akun: viewAkun, tim: viewTim, rekap: viewRekap, atur: viewAtur };
sb.auth.onAuthStateChange((ev) => { if (ev === "SIGNED_OUT") { S.me = null; } });
boot();
