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
  "Tidak tahu caranya":"Cek eksperimen tim yang hasilnya jelas atau Bank Riset Kompetitor. Polanya bisa jadi titik awal. Kalau masih buntu, isi kolom bantuan di bawah.",
  "Menunggu orang lain":"Tulis siapa yang kamu tunggu dan kapan kamu butuh jawabannya. Ini muncul di ringkasan leader sebagai blocker.",
  "Tidak yakin prioritas":"Ini ditandai untuk leader supaya diputuskan hari ini. Sambil menunggu, mulai dari konten yang jadwal tayangnya paling dekat.",
  "Waktu habis untuk hal lain":"Tulis apa yang menyita waktumu. Leader bisa bantu memutuskan mana yang boleh ditunda.",
  "Energi sedang turun":"Terima kasih sudah jujur. Leader akan menyapamu hari ini. Untuk sekarang, cukup pilih satu hal kecil yang bisa diselesaikan."
};
const PLATFORM = ["TikTok","Instagram","Web","YouTube","Threads"];
const FORMAT = ["Video pendek","Carousel","Single post","Story","Live"];
const ENERGI = ["Lelah sekali","Kurang","Biasa","Baik","Semangat"];
// Kata-kata hari ini: semua orang melihat kalimat yang sama di hari yang sama, berganti setiap hari.
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
 "Makasih udah hadir hari ini. Tanpa kamu, tim ini kurang satu karakter penting.",
 "Hari ini jangan kerja setengah hati. Kerja sepenuh hati, setengah kopi.",
 "Algoritma itu kayak gebetan: susah ditebak, tapi kalau konsisten lama-lama luluh juga.",
 "Caption bagus nggak harus panjang. Kayak chat dari mantan: pendek, tapi bikin kepikiran.",
 "Revisi banyak? Tenang, itu tandanya kontenmu diperhatiin, bukan dicuekin.",
 "Views kecil bukan berarti kamu kecil. Bisa jadi audiensnya lagi sibuk ngejar passing grade.",
 "Ngonten itu maraton, bukan sprint. Jadi jangan lupa minum di tiap pos.",
 "Target hari ini simpel: bikin orang berhenti scroll, bukan berhenti follow.",
 "Ide terbaik kadang muncul pas antre makan siang. Jadi makan siang itu bagian dari riset. Fix.",
 "Deadline itu kayak hantu: makin dihindari, makin sering muncul tengah malam.",
 "Kamu tuh kayak soal TIU: awalnya bikin bingung, pas dipahami ternyata keren.",
 "Jangan cuma bikin konten yang lewat. Bikin konten yang disimpen.",
 "Mentok ide? Scroll TikTok 10 menit. Sepuluh menit ya, bukan sepuluh jam.",
 "Hook yang lemah itu kayak pintu macet: orangnya pergi sebelum sempat masuk.",
 "Konsisten itu kebiasaan, bukan bakat. Kayak buka kulkas padahal udah tahu isinya sama.",
 "Engagement turun? Mungkin audiens lagi healing. Kita tetap di sini, setia banget.",
 "Jadilah kreator yang dikomenin \"relate banget\", bukan \"ini maksudnya apa ya?\"",
 "Draft jelek lebih berguna dari ide bagus yang cuma ada di kepala. Kepala bukan Google Drive.",
 "Kerjain yang paling susah duluan. Yang gampang nanti sambil dengerin playlist galau.",
 "Hari ini kita cari bermanfaat, bukan cari viral. Viral mah bonus, kayak kerupuk di nasi uduk.",
 "Satu komentar positif dari audiens lebih manis dari gula aren di es kopi susu.",
 "Capek? Ingat, di luar sana ada calon ASN yang belajar dari kontenmu sambil rebahan.",
 "Insight itu bukan rapor, tapi peta. Kita lagi nyari jalan pintas yang legal.",
 "Eksperimen gagal itu biasa. Ilmuwan juga sering salah, bedanya mereka pakai jas lab.",
 "Cukup 1% lebih baik dari kemarin. Nggak usah langsung jadi superhero, capek.",
 "Notifikasi boleh numpuk, asal semangatnya nggak ikut ketumpuk.",
 "Ngonten itu kayak masak: kalau keasinan, besok kurangi garamnya. Bukan berhenti masak.",
 "Kerja tim yang sehat itu kayak grup chat yang asyik: semua nimbrung, nggak ada yang cuma read.",
 "Nanya itu gratis. Yang mahal itu salah arah seminggu.",
 "Skrip yang ditulis hari ini adalah penyelamatmu di hari ketika ide lagi mogok.",
 "Jangan bandingin chapter 1 kamu sama chapter 20 orang lain. Bandingin sama chapter kemarin kamu aja.",
 "Baterai sosial boleh tinggal 10%, baterai kreatif jangan.",
 "Postingan tepat waktu lebih berharga dari postingan sempurna yang telat seminggu.",
 "Kamu bukan sekadar admin sosmed. Kamu juru bicara mimpi ribuan pejuang ASN. Berat, tapi keren.",
 "Hari ini coba satu hal baru. Hook baru, font baru, atau minimal posisi duduk baru.",
 "Kalau ada yang bilang \"cuma bikin konten doang\", senyumin aja. Mereka belum pernah revisi 7 kali.",
 "Jadilah seperti autosave: diam-diam, tapi selalu menyelamatkan.",
 "Semangat itu kayak sinyal: kadang hilang, tinggal cari tempat yang lebih tinggi. Atau dekat jendela.",
 "Jangan nunggu sempurna buat posting. \"Sempurna\" itu nama warung, bukan standar kerja.",
 "Hari ini terasa berat? Kecilin targetnya. Langkah kecil tetap langkah.",
 "Data itu jujur, kadang terlalu jujur. Nggak apa-apa, teman jujur memang suka nyebelin.",
 "Bisa bikin orang paham deret angka dalam 30 detik? Selamat, kamu setara pesulap.",
 "Kreativitas nggak selalu lahir dari kepepet. Kadang dari tidur yang cukup. Jadi tidur, ya.",
 "Jadilah tim yang saling bantu, bukan saling tag tugas.",
 "Follower itu bukan angka, tapi orang. Dan orang suka diperlakukan kayak orang.",
 "Konten edukasi yang lucu itu kombo maut, kayak mi instan pakai telur dan cabai rawit.",
 "Ide belum keluar? Tulis yang jelek dulu. Ide bagus suka malu-malu keluar duluan.",
 "Kerjaan hari ini adalah investasi buat versi kamu yang lebih jago tahun depan.",
 "Jangan biarin komentar julid nyuri fokusmu. Fokusmu terlalu mahal buat dicolong.",
 "Hari ini, jadilah alasan seseorang semangat belajar lagi. Lewat konten, bukan lewat ceramah.",
 "Akun kecil bukan berarti mimpi kecil. Semua akun besar dulu mulai dari nol follower dan satu like dari keluarga.",
 "Stuck? Ganti tempat duduk. Masih stuck? Ganti minuman. Masih stuck juga? Spill di check-in.",
 "Senyum dulu sebelum kerja. Bukan buat orang lain, buat otot wajah biar nggak kaku.",
 "Tim kompak itu tahu kapan bercanda dan kapan nge-gas. Sekarang waktunya nge-gas. Dikit.",
 "Pelan-pelan aja, yang penting jalan. Siput juga sampai, dan dia nggak pernah burnout.",
 "Ragu sama idemu? Ingat, ide \"aneh\" hari ini bisa jadi tren besok.",
 "Kamu udah berhasil melewati 100% hari-hari burukmu sebelumnya. Track record yang bagus banget.",
 "Bikin konten yang kamu sendiri mau tonton sampai habis. Kalau kamu skip, audiens juga skip.",
 "Nggak harus super produktif hari ini. Produktif secukupnya, terus pulang dengan bangga.",
 "Kalau konten flop, anggap aja lagi pemanasan. Atlet juga nggak langsung juara.",
 "Ingat: kita bukan lagi bikin konten doang, kita lagi bantu orang ngejar mimpinya. Gas pelan-pelan tapi pasti."
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
// Draf otomatis: teks yang sedang diketik disimpan di perangkat, jadi tidak hilang saat halaman dimuat ulang.
// Aktif kalau input diberi opsi { draf: "nama-unik" }. Draf dihapus setelah formulir berhasil disimpan.
const kunciDraf = nama => "spill-draf:" + (S.me ? S.me.id : "anon") + ":" + nama;
let drafDipulihkan = false;
function hapusDraf(awalan) {
  try { const p = kunciDraf(awalan); Object.keys(localStorage).filter(k => k.startsWith(p)).forEach(k => localStorage.removeItem(k)); } catch (e) {}
}
function input(obj, key, attrs = {}) {
  const tag = attrs.multiline ? "textarea" : "input";
  const a = { ...attrs }; delete a.multiline; delete a.draf;
  const n = el(tag, { ...a, class: "field" });
  let kd = null;
  if (attrs.draf) {
    kd = kunciDraf(attrs.draf + ":" + key);
    if (!obj[key]) { try { const v = localStorage.getItem(kd); if (v) { obj[key] = v; if (!drafDipulihkan) { drafDipulihkan = true; setTimeout(() => toast("Tulisan yang belum tersimpan sudah dipulihkan ✍️"), 400); } } } catch (e) {} }
  }
  n.value = obj[key] ?? "";
  n.addEventListener("input", () => {
    obj[key] = n.value;
    if (kd) { try { n.value ? localStorage.setItem(kd, n.value) : localStorage.removeItem(kd); } catch (e) {} }
  });
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
const S = { session:null, me:null, members:[], items:[], route:"", timDate:null, rekapBulan:null, juaraPeriode:null, absenSiapa:null, absenBulan:null, risetAkun:null, raporMode:null, raporMinggu:null, laporanTgl:null, hook:null };
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
      el("button", { class:"btn ghost", type:"button", onclick: keluar }, "Keluar"))));
}

/* ================= KELUAR ================= */
// Keluar tanpa bergantung pada koneksi: sesi di perangkat selalu dihapus walaupun server tidak bisa dihubungi.
let sedangKeluar = false;
async function keluar() {
  if (sedangKeluar) return;
  sedangKeluar = true;
  toast("Keluar…");
  try { await Promise.race([sb.auth.signOut({ scope:"local" }), new Promise(ok => setTimeout(ok, 2500))]); } catch (e) {}
  try {
    Object.keys(localStorage).filter(k => k.startsWith("sb-") && k.includes("-auth-token")).forEach(k => localStorage.removeItem(k));
  } catch (e) {}
  S.me = null; S.session = null;
  // Muat ulang dari awal supaya tidak ada sisa data akun sebelumnya di layar
  try { history.replaceState(null, "", location.pathname); } catch (e) {}
  location.reload();
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
        el("button", { class:"btn ghost", style:"margin-top:12px", onclick: keluar }, "Keluar")));
      return;
    }
    S.me = me;
    if (me.wajib_ganti_sandi) return renderWajibGanti();
    await loadBase();
    if (!hashBound) { window.addEventListener("hashchange", route); hashBound = true; }
    route();
    tampilkanMotivasi();
    cekApresiasi();
    daftarSW();
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
  t.push({ k:"hari", label:"Hari ini", g:"Harian" });
  if (me.peran === "leader") t.push({ k:"absensi", label:"Absensi", g:"Harian" });
  if (me.peran === "kerja") t.push({ k:"kerja", label:"Papan kerja", g:"Harian" });
  if (me.is_admin) t.push({ k:"tim", label:"Ringkasan tim", g:"Tim" }, { k:"rekap", label:"Rekap checklist", g:"Tim" });
  if (me.is_admin && me.peran !== "leader") t.push({ k:"absensi", label:"Absensi leader", g:"Tim" });
  if (me.peran !== "leader") t.push({ k:"laporan", label:"Laporan harian", g:"Harian" });
  t.push({ k:"rapor", label:"Rapor mingguan", g:"Harian" });
  t.push({ k:"masukan", label:"Kritik & saran", g: me.is_admin ? "Tim" : "Harian" });
  if (me.is_admin) t.push({ k:"catatan", label:"Catatan 1:1", g:"Tim" });
  if (me.peran === "sms" || me.is_admin) t.push({ k:"hook", label:"Hook Generator", g:"Kreasi konten" });
  t.push({ k:"juara", label:"Si Paling", g:"Juara & ide" }, { k:"ide", label:"Bank Ide", g:"Juara & ide" });
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
  const pilih = me.peran === "leader" ? ["hari", "tim", "masukan"] : me.peran === "kerja" ? ["hari", "kerja", "juara"] : ["hari", "juara", "ide"];
  return pilih.map(k => t.find(x => x.k === k)).filter(Boolean);
}
function parseHash() {
  const h = location.hash.replace(/^#\/?/, "");
  const [r, qs] = h.split("?");
  return { r, p: new URLSearchParams(qs || "") };
}
async function route() {
  if (!S.me) return;
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
    utama.map(x => el("a", { href:"#/" + x.k, class: x.k === r ? "on" : "" }, { masukan:"Masukan", juara:"Si Paling", ide:"Bank Ide", kerja:"Kerja", tim:"Tim" }[x.k] || x.label, x.k === "masukan" ? badge() : null)),
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
    el("div", el("button", { class:"btn ghost", onclick: keluar }, "Keluar")));
}
async function hitungBelumDibaca() {
  if (S.me.peran !== "leader") return 0;
  const { count } = await sb.from("masukan").select("id", { count:"exact", head:true }).eq("status", "baru");
  return count || 0;
}

/* ================= HARI INI ================= */
async function viewHari() {
  if (S.me.peran === "leader") return viewHariLeader();
  const me = S.me, t = today(), wk = isWeekend(t);
  const [ci, dc, riset, dariLeader, akunku] = await Promise.all([
    q(sb.from("checkins").select("*").eq("member_id", me.id).eq("tanggal", t).maybeSingle()),
    q(sb.from("daily_checklists").select("*").eq("member_id", me.id).eq("tanggal", t).maybeSingle()),
    me.peran === "sms" ? q(sb.from("riset_kompetitor").select("*").eq("member_id", me.id).gte("tanggal", rentangPeriode("minggu").awal).lte("tanggal", t).order("tanggal")) : [],
    q(sb.from("messages").select("*").eq("member_id", me.id).neq("author_id", me.id).gte("created_at", parseKey(addDays(t, -6)).toISOString()).order("created_at", { ascending:false }).limit(3)),
    q(sb.from("akun_pegangan").select("akun").eq("member_id", me.id))]);
  const belumDibaca = dariLeader.filter(m => !m.dibaca).map(m => m.id);
  if (belumDibaca.length) sb.from("messages").update({ dibaca:true }).in("id", belumDibaca).then(() => {});
  return el("div", { class:"stack" },
    el("div", { class:"page-head" },
      el("div", el("h1", `Halo, ${me.nama}!`), el("p", { class:"hint" }, fmt(t) + (wk ? " · akhir pekan" : ""))),
      el("span", { class:"sticker" }, wk ? "Akhir pekan" : ci ? "Sudah check-in" : "Belum check-in")),
    el("div", { class:"mot-mini" }, el("small", "Kata-kata hari ini"), el("p", motivasiHariIni())),
    kartuNotif({ ringkas:true }),
    me.peran === "sms" ? await kartuAkunku(akunku.map(x => x.akun)).catch(() => null) : null,
    dariLeader.length ? el("section", { class:"panel pad stack", style:"gap:10px" },
      el("div", { class:"row between" }, el("h2", "Dari leader"), belumDibaca.length ? el("span", { class:"chip attn" }, belumDibaca.length + " baru") : null),
      dariLeader.map(m => el("div", { class:"bub" + (m.jenis === "apresiasi" ? " appr" : ""), style:"max-width:100%" },
        el("small", namaOf(m.author_id) + " · " + jam(m.created_at) + (m.jenis === "apresiasi" ? " · apresiasi" : m.jenis === "1on1" ? " · ajakan 1:1" : "")), m.body))) : null,
    wk ? el("div", { class:"note" }, me.peran === "sms" ? "Akhir pekan: tidak ada check-in. Cukup centang Story hari ini." : "Akhir pekan: kamu libur, tidak ada check-in maupun checklist. Selamat istirahat! 🌴") : checkinCard(ci, t),
    wk && me.peran !== "sms" ? null : checklistCard(dc, t, wk, riset.filter(r => r.tanggal === t), akunku.map(x => x.akun)),
    me.peran === "sms" && !wk ? kartuRisetMingguan(akunku.map(x => x.akun), riset) : null,
    !wk ? el("a", { class:"btn ghost", href:"#/laporan", style:"align-self:flex-start" }, "📋 Salin untuk laporan harian →") : null);
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
    if (!f.energi) kurang.push("mood");
    if (!f.fokus.trim()) kurang.push("goals hari ini");
    if (!f.hambatan) kurang.push("kendala");
    if (kurang.length) { err = "Belum diisi: " + kurang.join(", ") + "."; return draw(); }
    const bantuan = (f.hambatan !== "Tidak ada hambatan" && f.butuh.trim())
      ? titik(`Saya butuh ${f.butuh.trim()}${f.dari.trim() ? " dari " + f.dari.trim() : ""}${f.sebelum.trim() ? " sebelum " + f.sebelum.trim() : ""}`) : (f.bantuanLama || "");
    const fokus = f.fokus.trim();
    const p = [f.energi <= 2 ? `Mood rendah (${f.energi}/5).` : `Mood ${f.energi}/5.`];
    if (f.hambatan !== "Tidak ada hambatan") p.push(`Kendala: ${f.hambatan.toLowerCase()}.`);
    p.push("Goals: " + titik(fokus));
    const data = { member_id: me.id, tanggal: t, energi: f.energi, pelajaran: f.pelajaran.trim(), fokus, langkah: f.langkah.trim(),
      hambatan: f.hambatan, bantuan, ringkasan: p.join(" "), updated_at: new Date().toISOString() };
    btn.disabled = true;
    try { await q(sb.from("checkins").upsert(data)); ci = data; editing = false; err = ""; hapusDraf("checkin-" + t); toast("Check-in terkirim. Terima kasih!"); }
    catch (e) { err = "Gagal menyimpan: " + e.message; btn.disabled = false; }
    draw();
  }
  function draw() {
    if (!editing && ci) {
      const baris = (l, v) => v ? el("div", { class:"line" }, el("span", { class:"hint" }, l), el("span", v)) : null;
      box.replaceChildren(
        el("div", { class:"row between" }, el("h2", "Check-in pagi"), el("span", { class:"chip calm" }, "Terkirim")),
        el("div", { class:"note" }, ci.ringkasan),
        el("div", { class:"mini" }, baris("Mood", ci.energi + "/5 · " + ENERGI[ci.energi-1]), baris("Goals", ci.fokus), baris("Langkah pertama", ci.langkah),
          baris("Pelajaran", ci.pelajaran), baris("Kendala", ci.hambatan), baris("Bantuan", ci.bantuan)),
        el("div", el("button", { class:"btn ghost sm", onclick: () => {
          f = { ...blank(), energi: ci.energi, pelajaran: ci.pelajaran, fokus: ci.fokus, langkah: ci.langkah, hambatan: ci.hambatan, bantuanLama: ci.bantuan };
          editing = true; draw(); } }, "Ubah jawaban")));
      return;
    }
    const panduan = el("div", { class:"note", hidden: !PANDUAN[f.hambatan] }, PANDUAN[f.hambatan] || "");
    const bantuan = el("div", { class:"stack", style:"gap:8px", hidden: !f.hambatan || f.hambatan === "Tidak ada hambatan" },
      el("p", { class:"hint" }, f.bantuanLama ? "Permintaan sebelumnya: " + f.bantuanLama + " Isi lagi kalau ingin mengganti." : "Butuh bantuan? Isi kalau perlu, boleh dikosongkan."),
      el("div", { class:"help-row" },
        el("label", { class:"lbl" }, "Saya butuh", input(f, "butuh", { placeholder:"contoh: aset ilustrasi", draf:"checkin-" + t })),
        el("label", { class:"lbl" }, "dari", input(f, "dari", { placeholder:"contoh: tim desain", draf:"checkin-" + t })),
        el("label", { class:"lbl" }, "sebelum", input(f, "sebelum", { placeholder:"contoh: Kamis siang", draf:"checkin-" + t }))));
    const btn = el("button", { type:"submit", class:"btn" }, ci ? "Simpan perubahan" : "Kirim check-in");
    box.replaceChildren(el("form", { class:"stack", onsubmit: e => { e.preventDefault(); kirim(btn); } },
      el("div", el("h2", "Check-in pagi"), el("p", { class:"hint" }, "Sekitar 2 menit. Leader membaca ringkasannya untuk tahu siapa yang perlu dibantu, bukan untuk menilai.")),
      q2(1, "Boleh tau mood kamu hari ini? *", null, pilihan(ENERGI.map((l, i) => ({ v: i+1, label: [el("b", String(i+1)), el("small", l)] })), { get: () => f.energi, set: v => f.energi = v, cls:"opts energy" })),
      q2(2, "Goals hari ini apa? *", "Maksimal tiga hal, lalu langkah pertamanya.",
        input(f, "fokus", { multiline:true, rows:"2", placeholder:"Contoh: edit ulang video deret, buat 2 carousel ringkasan TWK", draf:"checkin-" + t }),
        el("label", { class:"lbl" }, "Langkah pertama dan jam mulai", input(f, "langkah", { placeholder:"Contoh: jam 09.00 potong hook video deret", draf:"checkin-" + t }))),
      q2(3, "Satu pelajaran dari hari kemarin?", "Kalau mengulang kemarin, apa yang akan kamu lakukan berbeda?",
        input(f, "pelajaran", { multiline:true, rows:"2", placeholder:"Contoh: hook saya terlalu panjang, hari ini saya potong jadi 2 detik", draf:"checkin-" + t })),
      q2(4, "Ada kendala & butuh bantuan gak nih? *", null, pilihan(HAMBATAN, { get: () => f.hambatan, set: v => f.hambatan = v, onChange: () => {
        panduan.textContent = PANDUAN[f.hambatan] || ""; panduan.hidden = !PANDUAN[f.hambatan]; bantuan.hidden = f.hambatan === "Tidak ada hambatan"; } }), panduan, bantuan),
      el("div", { class:"row" }, btn, ci ? el("button", { type:"button", class:"btn ghost", onclick: () => { editing = false; err = ""; draw(); } }, "Batal") : null),
      err ? el("p", { class:"err", role:"alert" }, err) : null));
  }
  draw();
  return box;
}

function checklistCard(dc, t, wk, risetList = [], akunku = []) {
  const me = S.me;
  const items = itemsFor(me, t);
  const st = { cuti: dc?.cuti || false, items: { ...(dc?.items || {}) }, tambahan: [...(dc?.tambahan || [])], catatan: dc?.catatan || "" };
  const box = el("section", { class:"panel pad stack" });
  const status = el("span", { class:"hint" }, dc ? "Tersimpan" : "");
  let timer, risetOpen = false;
  // Riset dicatat per aplikasi kita. Pemegang satu akun otomatis terpilih; pemegang dua akun memilih.
  let risetRow = risetList[0] || null;
  const rs = { akun: risetRow?.akun || akunku[0] || "", kompetitor:"", platform:[], temuan:"", ide:"", err:"" };
  const isiDari = r => { rs.kompetitor = (r?.kompetitor || []).join(", "); rs.platform = [...(r?.platform || [])]; rs.temuan = r?.temuan || ""; rs.ide = r?.ide || ""; };
  isiDari(risetList.find(r => r.akun === rs.akun) || risetRow);
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
    if (komp.length < 1) { rs.err = "Tulis minimal 1 kompetitor."; return draw(); }
    if (komp.length > MAKS_KOMPETITOR) { rs.err = "Maksimal " + MAKS_KOMPETITOR + " kompetitor saja."; return draw(); }
    if (!rs.temuan.trim()) { rs.err = "Isi temuan singkatnya dulu."; return draw(); }
    if (!rs.akun) { rs.err = "Pilih aplikasi kita yang kompetitornya kamu riset."; return draw(); }
    btn.disabled = true;
    try {
      await q(sb.from("riset_kompetitor").upsert({ member_id: me.id, tanggal: t, akun: rs.akun, kompetitor: komp, platform: rs.platform, temuan: rs.temuan.trim(), ide: rs.ide.trim() }, { onConflict:"member_id,tanggal,akun" }));
      risetRow = { akun: rs.akun, kompetitor: komp, platform: [...rs.platform], temuan: rs.temuan.trim(), ide: rs.ide.trim() };
      if (rs.ide.trim().length >= 3) { try { const b = await q(sb.from("riset_kompetitor").select("id").eq("member_id", me.id).eq("tanggal", t).eq("akun", rs.akun).single()); await simpanIdeDariSumber("riset", b.id, rs.ide.trim().slice(0, 200), "Dari riset kompetitor " + rs.akun + " (" + komp.join(", ") + "). Temuan: " + rs.temuan.trim()); } catch (e) {} }
      risetList = [...risetList.filter(r => r.akun !== rs.akun), risetRow];
      rs.err = ""; risetOpen = false; toast("Hasil riset masuk ke Bank Riset Kompetitor");
      setItem("riset", "selesai");
    } catch (e) { rs.err = "Gagal menyimpan: " + e.message; btn.disabled = false; draw(); }
  }
  function risetForm() {
    const btn = el("button", { type:"button", class:"btn sm" }, "Simpan hasil riset");
    btn.onclick = () => simpanRiset(btn);
    const pilihanAkun = akunku.length ? akunku : DAFTAR_AKUN;
    return el("div", { class:"subform" },
      akunku.length === 1 ? el("p", { class:"hint" }, "Riset untuk aplikasi ", el("b", akunku[0]))
        : el("div", { class:"lbl" }, "Riset untuk aplikasi kita yang mana? *", pilihan(pilihanAkun, { get: () => rs.akun, set: v => { rs.akun = v; isiDari(risetList.find(r => r.akun === v)); draw(); } })),
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
        el("div", { class:"row" }, risetRow.akun ? el("span", { class:"chip appr" }, risetRow.akun) : null, risetRow.kompetitor.map(k => el("span", { class:"chip brand" }, k)), (risetRow.platform || []).map(p => el("span", { class:"chip" }, p))),
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
      const inp = input(baru, "v", { placeholder:"Tambah tugas lain hari ini…", draf:"tambahan-" + t });
      const tambah = () => { if (!baru.v.trim()) return; st.tambahan.push({ judul: baru.v.trim(), selesai:false }); hapusDraf("tambahan-" + t); baru.v = ""; save(); draw(); };
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
    const dk = "eks-" + (x.id || (x.dari_id ? "lanjut-" + x.dari_id : "baru"));
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
        hapusDraf(dk); await reload(); toast("Eksperimen tersimpan"); draw0();
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
        el("label", { class:"lbl" }, "Judul *", input(f, "judul", { placeholder:"Contoh: Hook pertanyaan vs hook angka di video TIU", draf:dk })),
        el("label", { class:"lbl" }, "Variabel yang diuji", input(f, "variabel", { placeholder:"Contoh: kalimat pembuka 3 detik pertama", draf:dk }),
          el("span", { class:"hint", style:"font-weight:400" }, "Ubah satu hal saja antara A dan B, supaya hasilnya bisa dipercaya.")),
        el("label", { class:"lbl" }, "Hipotesis", input(f, "hipotesis", { multiline:true, rows:"2", placeholder:"Contoh: hook berupa pertanyaan akan membuat lebih banyak orang menonton sampai habis", draf:dk })),
        el("div", { class:"grid2" },
          el("label", { class:"lbl" }, "Varian A", input(f, "varian_a", { multiline:true, rows:"2", draf:dk })),
          el("label", { class:"lbl" }, "Varian B", input(f, "varian_b", { multiline:true, rows:"2", draf:dk }))),
        el("div", { class:"lbl" }, "Format", pilihan(FORMAT.map(v => ({ v, label:v, toggle:true })), { get: () => f.format, set: v => f.format = v || "" })),
        el("div", { class:"lbl" }, "Platform", pilihan(PLATFORM.map(v => ({ v, label:v, toggle:true })), { get: () => f.platform, set: v => f.platform = v || "" })),
        el("label", { class:"lbl", style:"max-width:240px" }, "Tanggal tayang", input(f, "tanggal_tayang", { type:"date" })),
        f.status === "selesai" ? el("div", { class:"subform" },
          umur != null && umur < 7 ? el("div", { class:"note warn" }, `Konten baru tayang ${Math.max(umur,0)} hari. Angkanya mungkin belum matang (idealnya H+7).`) : null,
          el("div", { class:"lbl" }, "Hasil *", pilihan(HASIL, { get: () => f.hasil, set: v => f.hasil = v })),
          el("label", { class:"lbl" }, "Catatan angka", input(f, "hasil_catatan", { multiline:true, rows:"2", placeholder:"Contoh: A 4,1% save rate, B 2,3%", draf:dk })),
          el("label", { class:"lbl" }, "Pelajaran *", input(f, "pelajaran", { multiline:true, rows:"2", placeholder:"Apa yang kita pelajari tentang audiens?", draf:dk })),
          el("label", { class:"lbl" }, "Ide lanjutan", input(f, "ide_lanjutan", { multiline:true, rows:"2", placeholder:"Eksperimen apa berikutnya?", draf:dk }))) : null,
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
    const judulIn = input(f, "judul", { placeholder:"Apa yang akan dikerjakan?", draf:"kerja-baru" });
    const tambah = async () => {
      if (!f.judul.trim()) return;
      await q(sb.from("tasks").insert({ member_id: me.id, judul: f.judul.trim(), catatan: f.catatan.trim(), status: "akan" }));
      f.judul = ""; f.catatan = ""; hapusDraf("kerja-baru"); toast("Tugas ditambahkan"); reload();
    };
    judulIn.addEventListener("keydown", e => { if (e.key === "Enter") { e.preventDefault(); tambah(); } });
    const minggu = addDays(today(), -7);
    box.replaceChildren(
      el("div", el("h1", "Papan kerja"), el("p", { class:"hint" }, "Catat yang akan, sedang, dan sudah kamu kerjakan. Leader bisa melihat papan ini untuk tahu di mana kamu butuh bantuan.")),
      el("section", { class:"panel pad stack", style:"gap:10px" },
        el("div", { class:"grid2" }, judulIn, input(f, "catatan", { placeholder:"Catatan singkat (opsional)", draf:"kerja-baru" })),
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
  const me = S.me;
  const [rows, peg] = await Promise.all([
    q(sb.from("riset_kompetitor").select("*").order("tanggal", { ascending:false }).order("created_at", { ascending:false }).limit(500)),
    q(sb.from("akun_pegangan").select("*"))]);
  const akunku = peg.filter(p => p.member_id === me.id).map(p => p.akun);
  let akun = S.risetAkun || akunku[0] || "SEMUA", cari = "", plat = null;
  const box = el("div", { class:"stack" });
  const list = el("div", { class:"stack", style:"gap:12px" });
  const panel = el("div");
  const jumlahPer = a => rows.filter(r => r.akun === a).length;
  const pemegang = a => peg.filter(p => p.akun === a).map(p => namaOf(p.member_id)).join(", ");
  function dipilih() { return rows.filter(r => akun === "SEMUA" || r.akun === akun); }
  function drawPanel() {
    const xs = dipilih(), peta = {};
    xs.forEach(r => r.kompetitor.forEach(k => {
      const n = k.trim(), key = n.toLowerCase();
      if (!peta[key]) peta[key] = { n, c:0, terakhir:r.tanggal, temuan:r.temuan, platform:new Set() };
      peta[key].c++; r.platform.forEach(p => peta[key].platform.add(p));
    }));
    const komp = Object.values(peta).sort((a, b) => b.c - a.c || b.terakhir.localeCompare(a.terakhir));
    panel.replaceChildren(akun === "SEMUA" ? el("p", { class:"hint" }, "Pilih aplikasi kita di atas untuk melihat peta kompetitornya.") :
      el("section", { class:"panel pad stack", style:"gap:12px" },
        el("div", { class:"row between" }, el("h2", "Kompetitor " + akun), el("span", { class:"hint" }, "Dipegang " + (pemegang(akun) || "–") + " · " + xs.length + " riset")),
        komp.length ? el("div", { class:"komp-grid" }, komp.map(k => el("button", { class:"komp" + (cari.toLowerCase() === k.n.toLowerCase() ? " on" : ""), onclick: () => { cari = cari.toLowerCase() === k.n.toLowerCase() ? "" : k.n; cariIn.value = cari; drawPanel(); drawList(); } },
          el("b", k.n), el("small", k.c + " kali diriset · terakhir " + fmt(k.terakhir, { day:"numeric", month:"short" })),
          k.platform.size ? el("div", { class:"row", style:"gap:4px" }, [...k.platform].map(p => el("span", { class:"chip" }, p))) : null)))
          : el("p", { class:"hint" }, "Belum ada riset untuk " + akun + ".")));
  }
  function drawList() {
    const s = cari.trim().toLowerCase();
    const xs = dipilih().filter(r => (!plat || r.platform.includes(plat)) &&
      (!s || r.kompetitor.join(" ").toLowerCase().includes(s) || r.temuan.toLowerCase().includes(s) || r.ide.toLowerCase().includes(s)));
    list.replaceChildren(...(xs.length ? xs.map(r => el("article", { class:"panel pad stack", style:"gap:8px" },
      el("div", { class:"row between" }, el("div", { class:"row", style:"gap:6px" }, el("b", namaOf(r.member_id)), el("span", { class:"chip appr" }, r.akun || "Tanpa aplikasi")), el("span", { class:"hint" }, fmt(r.tanggal))),
      el("div", { class:"row", style:"gap:6px" }, r.kompetitor.map(k => el("span", { class:"chip brand" }, k)), r.platform.map(p => el("span", { class:"chip" }, p))),
      el("p", { style:"white-space:pre-wrap" }, r.temuan),
      r.ide ? el("div", { class:"note" }, el("b", "Ide untuk kita: "), r.ide) : null)) : [el("p", { class:"empty" }, rows.length ? "Tidak ada riset yang cocok." : "Belum ada riset. Hasil riset dari checklist harian akan muncul di sini.")]));
  }
  const cariIn = el("input", { class:"field", placeholder:"Cari kompetitor atau isi temuan…", style:"max-width:320px" });
  cariIn.addEventListener("input", () => { cari = cariIn.value; drawPanel(); drawList(); });
  const pilihAkun = el("select", { class:"field", style:"max-width:280px", onchange: e => { akun = e.target.value; S.risetAkun = akun; cari = ""; cariIn.value = ""; drawPanel(); drawList(); } },
    el("option", { value:"SEMUA", ...(akun === "SEMUA" ? { selected:true } : {}) }, "Semua aplikasi (" + rows.length + ")"),
    DAFTAR_AKUN.map(x => el("option", { value:x, ...(akun === x ? { selected:true } : {}) }, x + (akunku.includes(x) ? " ★" : "") + " (" + jumlahPer(x) + ")")));
  box.append(
    el("div", el("h1", "Bank Riset Kompetitor"), el("p", { class:"hint", style:"margin-top:6px" }, "Pilih aplikasi kita untuk melihat siapa saja kompetitornya dan apa temuan tim. ★ = aplikasi yang kamu pegang.")),
    el("div", { class:"row" }, el("label", { class:"lbl", style:"flex-direction:row;align-items:center;gap:10px;white-space:nowrap" }, "Aplikasi kita", pilihAkun)),
    panel,
    el("div", { class:"row" }, cariIn, pilihan(PLATFORM.map(v => ({ v, label:v, toggle:true })), { get: () => plat, set: v => plat = v, onChange: drawList })),
    list);
  drawPanel(); drawList();
  return box;
}

/* ================= PESAN DARI LEADER ================= */
async function kirimPesan(memberId, body, jenis = "pesan") {
  await q(sb.from("messages").insert({ member_id: memberId, author_id: S.me.id, body, jenis }));
  const judul = { apresiasi:"🎉 Apresiasi dari " + S.me.nama, "1on1":"☕ " + S.me.nama + " ngajak ngobrol" }[jenis] || "💬 Pesan dari " + S.me.nama;
  dorongKe(memberId, judul, body);
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
  const ta = input(f, "isi", { multiline:true, rows:"5", placeholder:"Tulis apa saja: cara kerja tim, cara leader memimpin, beban kerja, ide perbaikan, atau hal yang menurutmu sudah bagus.", draf:"masukan-baru" });
  const btn = el("button", { class:"btn", type:"submit" }, "Kirim secara anonim");
  const form = el("form", { class:"panel pad stack", style:"gap:14px", onsubmit: async e => {
    e.preventDefault();
    if (!f.jenis) { msg.className = "err"; msg.textContent = "Pilih dulu: kritik, saran, atau apresiasi."; return; }
    if (f.isi.trim().length < 5) { msg.className = "err"; msg.textContent = "Tulis sedikit lebih panjang ya."; return; }
    btn.disabled = true;
    const { error } = await sb.rpc("kirim_masukan", { p_jenis: f.jenis, p_isi: f.isi.trim() });
    btn.disabled = false;
    if (error) { msg.className = "err"; msg.textContent = "Gagal mengirim: " + error.message; return; }
    f.isi = ""; ta.value = ""; hapusDraf("masukan-baru"); msg.className = "ok"; msg.textContent = "Terkirim secara anonim. Makasih sudah jujur!";
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
      el("label", { class:"lbl" }, "Tanggapanmu (opsional)", input(f, "tanggapan", { multiline:true, rows:"2", placeholder:"Contoh: Terima kasih, mulai minggu depan briefing dipindah ke jam 10.", draf:"tanggap-masukan-" + x.id })),
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
  { k:"rajin", emoji:"🔥", nama:"Si Paling Rajin", desc:"Rata-rata checklist harian dan check-in tanpa bolong." },
  { k:"ide", emoji:"💡", nama:"Si Paling Ide", desc:"Ide terbanyak yang dikirim ke Bank Ide." },
  { k:"strategis", emoji:"🧠", nama:"Si Paling Strategis", desc:"Eksperimen yang selesai dengan hasil jelas, ditambah ide yang dipakai tim." },
  { k:"detektif", emoji:"🕵️", nama:"Detektif Kompetitor", desc:"Riset kompetitor terbanyak.", sms:true },
  { k:"ilmu", emoji:"📚", nama:"Si Paling Haus Ilmu", desc:"Modul belajar yang diselesaikan." },
  { k:"tertib", emoji:"📊", nama:"Si Paling Tertib Data", desc:"Persentase hari (sampai H-3) yang angka jangkauan akunnya sudah lengkap di spreadsheet.", sms:true },
  { k:"suportif", emoji:"🤝", nama:"Si Paling Suportif", desc:"Dukungan 🔥 terbanyak untuk ide rekan di Bank Ide." },
  { k:"berani", emoji:"🧪", nama:"Si Paling Berani Coba", desc:"Eksperimen baru yang dimulai, apa pun hasilnya nanti." },
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
  viral_hunter: { emoji:"🚀", nama:"Viral Hunter", syarat:"Lencana lama (fitur sudah tidak dipakai)", lama:true },
  lulus_modul_wajib: { emoji:"🎓", nama:"Lulus Modul Wajib", syarat:"Semua modul wajib selesai" },
  penyemangat: { emoji:"🤝", nama:"Penyemangat Tim", syarat:"50 dukungan 🔥 untuk ide rekan" },
  data_lengkap: { emoji:"📊", nama:"Data Lengkap Sebulan", syarat:"Angka jangkauan akun terisi tanpa bolong selama satu bulan penuh" },
  detektif_konsisten: { emoji:"🕵️", nama:"Detektif Konsisten", syarat:"Target riset 2× seminggu tercapai 4 minggu berturut-turut" },
  ide_didukung: { emoji:"💡", nama:"Ide Paling Didukung", syarat:"Satu ide mendapat minimal 5 dukungan 🔥 dari rekan (bisa berkali-kali)" },
  belajar_kemarin: { emoji:"📝", nama:"Rajin Belajar dari Kemarin", syarat:"Mengisi “Satu pelajaran dari hari kemarin?” 20 kali" },
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
      const kosong = kat.k === "tertib"
        ? (pegangan.length ? "Belum cukup data (minimal 3 hari sampai H-3 di periode ini)." : "Akun yang dipegang belum dipetakan. Atur di Struktur tim.")
        : "Belum ada yang masuk. Kesempatan emas nih.";
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
        el("div", el("h1", "Si Paling"), el("p", { class:"hint" }, "Banyak cara buat jadi juara: rajin, kreatif, strategis, rajin riset, haus ilmu, tertib data, suportif, atau berani mencoba. Yang ditampilkan hanya 3 teratas di tiap kategori.")),
        el("span", { class:"sticker" }, p.label)),
      pilihan([{ v:"minggu", label:"Minggu ini" }, { v:"mingguLalu", label:"Minggu lalu" }, { v:"bulan", label:"Bulan ini" }, { v:"bulanLalu", label:"Bulan lalu" }], { get: () => jenis, set: v => { jenis = v; S.juaraPeriode = v; }, onChange: draw }),
      el("p", { class:"hint" }, "Juara 1 resmi dapat lencana 👑 setelah datanya matang: hari Kamis untuk mingguan, tanggal 4 untuk bulanan."),
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
        el("div", { class:"lencana-grid", style:"margin-top:12px" }, [...Object.entries(LENCANA).filter(([k, v]) => !v.lama).map(([k, v]) => el("div", { class:"lencana" + (kodeUnik.includes(k) ? "" : " belum") }, el("span", v.emoji), el("b", v.nama), el("small", v.syarat))),
          el("div", { class:"lencana" }, el("span", "👑"), el("b", "Juara kategori"), el("small", "Juara 1 di Si Paling mingguan atau bulanan"))])),
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
      el("label", { class:"lbl" }, "Idenya apa? *", input(f, "judul", { placeholder:"Contoh: Seri konten 'Sehari jadi ASN' bareng alumni", draf:"ide-baru" })),
      el("label", { class:"lbl" }, "Ceritain lebih detail (opsional)", input(f, "isi", { multiline:true, rows:"3", placeholder:"Kenapa ide ini bagus? Gimana cara jalaninnya?", draf:"ide-baru" })),
      el("div", { class:"lbl" }, "Kategori", pilihan(KATEGORI_IDE, { get: () => f.kategori, set: v => f.kategori = v })),
      el("div", el("button", { class:"btn", onclick: async () => {
        if (f.judul.trim().length < 3) { msg.className = "err"; msg.textContent = "Tulis idenya dulu."; return; }
        try { await q(sb.from("ide").insert({ member_id: me.id, judul: f.judul.trim(), isi: f.isi.trim(), kategori: f.kategori })); hapusDraf("ide-baru"); toast("Ide masuk Bank Ide! 💡"); route(); }
        catch (e) { msg.className = "err"; msg.textContent = "Gagal: " + e.message; } } }, "Kirim ide")), msg);
  }
  function kartu(x) {
    const n = jml(x.id), aku = sayaDukung(x.id), [stLabel, stWarna] = STATUS_IDE[x.status] || STATUS_IDE.baru;
    const card = el("article", { class:"panel pad stack", style:"gap:10px" },
      el("div", { class:"row between" },
        el("div", { class:"row", style:"gap:6px" }, el("span", { class:"chip" }, x.kategori), el("span", { class:"chip " + stWarna }, stLabel)),
        el("span", { class:"hint" }, namaOf(x.member_id) + " · " + fmt(keyOf(new Date(x.created_at)), { day:"numeric", month:"short" }))),
      el("h3", { style:"font-size:1.15rem" }, x.judul),
      x.sumber === "riset" ? el("a", { class:"chip brand", href:"#/riset", style:"text-decoration:none" }, "🕵️ Dari riset kompetitor") : null,
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
        el("label", { class:"lbl" }, "Tanggapanmu", input(f, "t", { placeholder:"Contoh: Bagus! Kita coba minggu depan, PIC-nya kamu ya.", draf:"tanggap-ide-" + x.id })),
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
    let xs = rows.filter(x => filter === "semua" || (filter === "saya" ? x.member_id === me.id : filter === "riset" ? x.sumber === filter : x.status === filter));
    xs = urut === "dukungan" ? [...xs].sort((a, b) => jml(b.id) - jml(a.id) || b.created_at.localeCompare(a.created_at)) : xs;
    box.replaceChildren(
      el("div", { class:"page-head" },
        el("div", el("h1", "Bank Ide"), el("p", { class:"hint" }, "Semua ide tim di satu tempat: yang ditulis langsung maupun dari riset kompetitor. Dukung ide teman dengan 🔥, ide yang dipakai tim dapat lencana.")),
        el("span", { class:"sticker" }, rows.length + " ide")),
      me.peran !== "leader" ? formBaru() : null,
      el("div", { class:"row between" },
        pilihan([{ v:"semua", label:"Semua" }, { v:"saya", label:"Ideku" }, { v:"riset", label:"🕵️ Dari riset" }, { v:"dipakai", label:"Dipakai" }, { v:"dibahas", label:"Dibahas" }, { v:"baru", label:"Baru" }], { get: () => filter, set: v => filter = v, onChange: draw }),
        pilihan([{ v:"dukungan", label:"🔥 Terpopuler" }, { v:"baru", label:"Terbaru" }], { get: () => urut, set: v => urut = v, onChange: draw })),
      xs.length ? el("div", { class:"stack", style:"gap:14px" }, xs.map(kartu)) : el("p", { class:"empty" }, "Belum ada ide di sini."));
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
  const { me, lencanaBaru, streak, kemarin100, ideDipakai, risetMinggu } = data;
  if (lencanaBaru) { const i = infoLencana(lencanaBaru.kode); return `Lencana baru mendarat: ${i.emoji} ${i.nama}! Mau dipajang di bio? Boleh. Pamer ke grup? Wajib.`; }
  if (ideDipakai) return `Idemu "${ideDipakai.judul}" dipakai tim. Kamu resmi jadi otak di balik layar, tinggal kurang jas lab doang.`;
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
  const [ls, cis, dcK, ide] = await Promise.all([
    q(sb.from("lencana").select("*").eq("member_id", me.id).order("created_at", { ascending:false }).limit(1)),
    q(sb.from("checkins").select("tanggal").eq("member_id", me.id).gte("tanggal", addDays(t, -40)).order("tanggal", { ascending:false })),
    (() => { let k = addDays(t, -1); while (isWeekend(k)) k = addDays(k, -1); return q(sb.from("daily_checklists").select("*").eq("member_id", me.id).eq("tanggal", k).maybeSingle()).then(r => ({ r, k })); })(),
    q(sb.from("ide").select("judul,dipakai_at").eq("member_id", me.id).eq("status", "dipakai").gte("dipakai_at", parseKey(addDays(t, -7)).toISOString()).limit(1))]).catch(() => [[], [], { r:null }, []]);
  let streak = 0; const ada = new Set(cis.map(c => c.tanggal));
  for (let k = ada.has(t) ? t : addDays(t, -1), i = 0; i < 60; i++, k = addDays(k, -1)) { if (isWeekend(k)) continue; if (ada.has(k)) streak++; else break; }
  let risetMinggu = 0;
  if (me.peran === "sms") { const { count } = await sb.from("riset_kompetitor").select("id", { count:"exact", head:true }).eq("member_id", me.id).gte("tanggal", awalMinggu); risetMinggu = count || 0; }
  const baru = ls[0] && ls[0].created_at > lihat ? ls[0] : null;
  const teks = apresiasiPersonal({ me, lencanaBaru: baru, streak, kemarin100: dcK.r && pctOf(dcK.r, me, dcK.k) === 100, ideDipakai: ide[0], risetMinggu });
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
  if (!S.me || sedangKeluar) return;
  if (document.visibilityState === "hidden") { try { localStorage.setItem("spill-aktif-" + S.me.id, String(Date.now())); } catch (e) {} }
  else cekApresiasi();
});


/* ================= HARI INI: LEADER ================= */
async function jumlahBaris(p) { const { count } = await p; return count || 0; }
const STATUS_ABSEN = [{ v:"kantor", label:"🏢 Kantor" }, { v:"wfh", label:"🏠 WFH" }, { v:"dinas", label:"🚗 Dinas luar" }, { v:"cuti", label:"🌴 Cuti" }];
const jamDari = iso => iso ? new Date(iso).toLocaleTimeString("id-ID", { hour:"2-digit", minute:"2-digit" }) : "–";
function kodeMinggu(k) { const d = parseKey(k); const t = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate())); const h = (t.getUTCDay() + 6) % 7; t.setUTCDate(t.getUTCDate() - h + 3); const y = t.getUTCFullYear(); const w = 1 + Math.round(((t - Date.UTC(y, 0, 4)) / 864e5 - 3 + ((new Date(Date.UTC(y, 0, 4)).getUTCDay() + 6) % 7)) / 7); return "W" + y + "-" + String(w).padStart(2, "0"); }
async function tandaiPeriode(periode, kode, nilai = true) {
  const me = S.me;
  const lama = await q(sb.from("checklist_periode").select("*").eq("member_id", me.id).eq("periode", periode).maybeSingle()).catch(() => null);
  const items = { ...(lama?.items || {}) };
  if (nilai) items[kode] = { status:"selesai", waktu: new Date().toISOString() }; else delete items[kode];
  await sb.from("checklist_periode").upsert({ member_id: me.id, periode, items, updated_at: new Date().toISOString() });
}
async function tandaiHarianLeader(kode) {
  const me = S.me, t = today();
  const lama = await q(sb.from("daily_checklists").select("*").eq("member_id", me.id).eq("tanggal", t).maybeSingle()).catch(() => null);
  if (lama?.items?.[kode]) return;
  const items = { ...(lama?.items || {}), [kode]: { status:"selesai", jam: jamDari(new Date().toISOString()) } };
  await sb.from("daily_checklists").upsert({ member_id: me.id, tanggal: t, cuti: lama?.cuti || false, items, tambahan: lama?.tambahan || [], catatan: lama?.catatan || "", updated_at: new Date().toISOString() });
}
async function viewHariLeader() {
  const me = S.me, t = today(), wk = isWeekend(t);
  const awalMinggu = rentangPeriode("minggu").awal, kodeW = kodeMinggu(t), kodeM = "M" + t.slice(0, 7);
  const h3 = addDays(t, -3);
  const [abs, energi, dcSaya, cis, dcs, pesanHariIni, ideBaru, masukanBaru, satuSatu, peg, kpiH3, perW, perM, cat1on1] = await Promise.all([
    q(sb.from("absensi").select("*").eq("member_id", me.id).eq("tanggal", t).maybeSingle()),
    q(sb.from("energi_pribadi").select("*").eq("member_id", me.id).gte("tanggal", addDays(t, -6)).order("tanggal")),
    q(sb.from("daily_checklists").select("*").eq("member_id", me.id).eq("tanggal", t).maybeSingle()),
    q(sb.from("checkins").select("member_id,energi,hambatan,bantuan").eq("tanggal", t)),
    q(sb.from("daily_checklists").select("member_id,cuti").eq("tanggal", t)),
    q(sb.from("messages").select("member_id,jenis").eq("author_id", me.id).gte("created_at", parseKey(t).toISOString())),
    jumlahBaris(sb.from("ide").select("id", { count:"exact", head:true }).eq("status", "baru")),
    jumlahBaris(sb.from("masukan").select("id", { count:"exact", head:true }).eq("status", "baru")),
    q(sb.from("messages").select("member_id,created_at").eq("author_id", me.id).eq("jenis", "1on1").gte("created_at", parseKey(addDays(t, -90)).toISOString()).order("created_at", { ascending:false })),
    q(sb.from("akun_pegangan").select("*")),
    q(sb.from("kpi_harian").select("akun").eq("metrik", "jangkauan").eq("tanggal", h3).gt("real", 0)),
    q(sb.from("checklist_periode").select("*").eq("member_id", me.id).eq("periode", kodeW).maybeSingle()),
    q(sb.from("checklist_periode").select("*").eq("member_id", me.id).eq("periode", kodeM).maybeSingle()),
    q(sb.from("catatan_1on1").select("member_id,tanggal,tindak_lanjut,tenggat,selesai").gte("tanggal", addDays(t, -90))).catch(() => [])]);
  const orang = team();
  const jatuhTempo = cat1on1.filter(c => c.tindak_lanjut && !c.selesai && c.tenggat && c.tenggat <= t);
  const cuti = new Set(dcs.filter(d => d.cuti).map(d => d.member_id));
  const sudahCI = new Set(cis.map(c => c.member_id));
  const disapa = new Set(pesanHariIni.map(p => p.member_id));
  const perluPerhatian = cis.filter(c => c.energi <= 2 || ["Tidak yakin prioritas", "Menunggu orang lain", "Tidak tahu caranya", "Waktu habis untuk hal lain"].includes(c.hambatan) || c.bantuan);
  const perhatianDisapa = perluPerhatian.filter(c => disapa.has(c.member_id)).length;
  const belumCI = orang.filter(m => !sudahCI.has(m.id) && !cuti.has(m.id));
  const belumDiingatkan = belumCI.filter(m => !disapa.has(m.id));
  const apresiasi = pesanHariIni.filter(p => p.jenis === "apresiasi").length;
  const terisi = new Set(kpiH3.map(k => k.akun));
  const akunKosong = [...new Set(peg.map(p => p.akun))].filter(a => !terisi.has(a));
  const pemegang = a => peg.filter(p => p.akun === a).map(p => namaOf(p.member_id)).join(", ");
  const satuMinggu = [...new Set([...satuSatu.filter(x => x.created_at >= parseKey(awalMinggu).toISOString()).map(x => x.member_id), ...cat1on1.filter(c => c.tanggal >= awalMinggu).map(c => c.member_id)])];
  const tglTerakhir = id => [satuSatu.find(x => x.member_id === id)?.created_at?.slice(0, 10) || "", cat1on1.filter(c => c.member_id === id).map(c => c.tanggal).sort().pop() || ""].sort().pop();
  const terakhir1on1 = Object.fromEntries(orang.map(m => [m.id, tglTerakhir(m.id)]));
  const saran1on1 = [...orang].sort((a, b) => terakhir1on1[a.id].localeCompare(terakhir1on1[b.id])).slice(0, 3);

  const st = { items: { ...(dcSaya?.items || {}) }, tambahan: [...(dcSaya?.tambahan || [])], catatan: dcSaya?.catatan || "" };
  const simpanHarian = async () => { await sb.from("daily_checklists").upsert({ member_id: me.id, tanggal: t, cuti: false, ...st, updated_at: new Date().toISOString() }); };
  const box = el("div", { class:"stack" });

  function kartuAbsen() {
    const f = { status: abs?.status || "kantor", baik: abs?.catatan_baik || "", besok: abs?.catatan_besok || "" };
    const sec = el("section", { class:"panel pad stack", style:"gap:12px" });
    const simpan = async patch => {
      try { await q(sb.from("absensi").upsert({ member_id: me.id, tanggal: t, status: f.status, masuk: abs?.masuk || null, pulang: abs?.pulang || null, catatan_baik: f.baik, catatan_besok: f.besok, ...patch })); hapusDraf("absen-" + t); toast("Absensi tersimpan"); route(); }
      catch (e) { toast("Gagal: " + e.message); }
    };
    if (!abs?.masuk) {
      sec.append(el("div", { class:"row between" }, el("h2", "Absen masuk"), el("span", { class:"chip attn" }, "Belum absen")),
        el("div", { class:"lbl" }, "Hari ini kerja dari mana?", pilihan(STATUS_ABSEN, { get: () => f.status, set: v => f.status = v })),
        el("div", el("button", { class:"btn", onclick: () => simpan({ masuk: new Date().toISOString() }) }, "Absen masuk sekarang")));
    } else {
      sec.append(el("div", { class:"row between" }, el("h2", "Absensi hari ini"),
          el("span", { class:"chip calm" }, STATUS_ABSEN.find(s => s.v === abs.status)?.label + " · masuk " + jamDari(abs.masuk) + (abs.pulang ? " · pulang " + jamDari(abs.pulang) : ""))),
        el("div", { class:"grid2" },
          el("label", { class:"lbl" }, "Satu hal yang berjalan baik hari ini", input(f, "baik", { multiline:true, rows:"2", placeholder:"Contoh: Zaki akhirnya berani minta bantuan", draf:"absen-" + t })),
          el("label", { class:"lbl" }, "Satu hal yang perlu diperbaiki besok", input(f, "besok", { multiline:true, rows:"2", placeholder:"Contoh: putuskan prioritas konten PPPK pagi-pagi", draf:"absen-" + t }))),
        el("div", { class:"row" },
          !abs.pulang ? el("button", { class:"btn", onclick: () => simpan({ pulang: new Date().toISOString() }) }, "Absen pulang") : el("button", { class:"btn ghost", onclick: () => simpan({}) }, "Simpan catatan"),
          !abs.pulang ? el("button", { class:"btn ghost", onclick: () => simpan({}) }, "Simpan catatan dulu") : null));
    }
    return sec;
  }
  function kartuEnergi() {
    const hariIni = energi.find(e => e.tanggal === t)?.energi || null;
    const vals = Array.from({ length: 7 }, (_, i) => energi.find(e => e.tanggal === addDays(t, i - 6))?.energi ?? null);
    return el("section", { class:"panel pad stack", style:"gap:10px" },
      el("div", { class:"row between" }, el("h2", "Energimu hari ini"), weekBars(vals)),
      el("p", { class:"hint" }, "Opsional dan hanya kamu yang bisa melihatnya. Leader juga boleh capek."),
      pilihan(ENERGI.map((l, i) => ({ v: i + 1, label: [el("b", String(i + 1)), el("small", l)] })), { get: () => hariIni, set: async v => {
        try { await q(sb.from("energi_pribadi").upsert({ member_id: me.id, tanggal: t, energi: v })); toast("Tersimpan"); route(); } catch (e) { toast("Gagal: " + e.message); } }, cls:"opts energy" }));
  }
  function baris(label, selesai, info, aksi) {
    return el("div", { class:"item" + (selesai ? " selesai" : "") },
      el("div", { class:"item-top" },
        el("div", el("div", { class:"item-label" }, (selesai ? "✅ " : "⬜ ") + label), info ? el("p", { class:"hint", style:"margin-top:2px" }, info) : null),
        aksi ? el("div", { class:"item-acts" }, aksi) : null));
  }
  function tombolManual(kode, simpanFn, items) {
    const cur = items[kode]?.status || "";
    return [el("button", { class:"tog" + (cur === "selesai" ? " on-done" : ""), onclick: async () => { if (cur === "selesai") delete items[kode]; else items[kode] = { status:"selesai" }; await simpanFn(); route(); } }, "Selesai"),
      el("button", { class:"tog" + (cur === "tidak_ada" ? " on-na" : ""), onclick: async () => { if (cur === "tidak_ada") delete items[kode]; else items[kode] = { status:"tidak_ada" }; await simpanFn(); route(); } }, "Tidak ada")];
  }
  function kartuHarian() {
    const daftar = [
      { k:"absen_masuk", label:"Absen masuk", ok: !!abs?.masuk, info: abs?.masuk ? "Masuk " + jamDari(abs.masuk) : "Isi di kartu absensi di atas" },
      { k:"baca_ringkasan", label:"Baca Ringkasan tim (target sebelum 10.00)", ok: !!st.items.baca_ringkasan, info: st.items.baca_ringkasan ? "Dibuka jam " + st.items.baca_ringkasan.jam : "Tercentang otomatis saat Ringkasan tim dibuka", aksi: el("a", { class:"btn ghost sm", href:"#/tim" }, "Buka") },
      { k:"perhatian", label:"Tindak lanjuti yang Perlu perhatian", ok: perhatianDisapa === perluPerhatian.length, info: perluPerhatian.length ? `${perhatianDisapa} dari ${perluPerhatian.length} sudah disapa` : "Belum ada yang perlu perhatian khusus" },
      { k:"apresiasi", label:"Beri apresiasi minimal 1 orang", ok: apresiasi > 0, info: apresiasi ? apresiasi + " apresiasi terkirim hari ini" : "Pakai tombol Beri apresiasi di Ringkasan tim" },
      { k:"ingatkan", label:"Ingatkan yang belum check-in", ok: belumDiingatkan.length === 0, info: belumCI.length ? `${belumCI.length} belum check-in, ${belumDiingatkan.length} belum diingatkan` + (belumDiingatkan.length ? ": " + belumDiingatkan.map(m => m.nama).join(", ") : "") : "Semua sudah check-in" },
      { k:"blocker", label:"Putuskan blocker dan permintaan bantuan", manual:true },
      { k:"tindak_1on1", label:"Tindak lanjut 1:1 yang jatuh tempo", ok: jatuhTempo.length === 0, info: jatuhTempo.length ? jatuhTempo.map(c => namaOf(c.member_id) + ": " + c.tindak_lanjut).join(" · ") : "Tidak ada janji 1:1 yang jatuh tempo", aksi: el("a", { class:"btn ghost sm", href:"#/catatan" }, "Buka") },
      { k:"jangkauan", label:"Cek pengisian jangkauan di spreadsheet (H-3)", ok: akunKosong.length === 0, info: akunKosong.length ? `${fmt(h3, { day:"numeric", month:"short" })} belum diisi: ` + akunKosong.map(a => `${a} (${pemegang(a)})`).join(", ") : "Semua akun sudah terisi sampai " + fmt(h3, { day:"numeric", month:"short" }) },
      { k:"absen_pulang", label:"Absen pulang + catatan hari ini", ok: !!abs?.pulang, info: abs?.pulang ? "Pulang " + jamDari(abs.pulang) : "" },
    ];
    const selesai = daftar.filter(x => x.manual ? st.items[x.k] : x.ok).length;
    const pct = Math.round(selesai / daftar.length * 100);
    const baru = { v:"" };
    const inp = input(baru, "v", { placeholder:"Tambah tugas lain hari ini…" });
    const tambah = async () => { if (!baru.v.trim()) return; st.tambahan.push({ judul: baru.v.trim(), selesai:false }); await simpanHarian(); route(); };
    inp.addEventListener("keydown", e => { if (e.key === "Enter") { e.preventDefault(); tambah(); } });
    return el("section", { class:"panel pad stack", style:"gap:10px" },
      el("div", { class:"row between" }, el("div", el("h2", "Tugas leader hari ini"), el("p", { class:"hint" }, "Sebagian besar tercentang otomatis dari aktivitasmu di Spill.")), el("b", pct + "%")),
      el("div", { class:"progress" }, el("i", { style:`width:${pct}%` })),
      el("div", daftar.map(x => baris(x.label, x.manual ? !!st.items[x.k] : x.ok, x.info, x.manual ? tombolManual(x.k, simpanHarian, st.items) : x.aksi))),
      el("h3", { style:"margin-top:6px" }, "Tugas tambahan"),
      st.tambahan.map((x, i) => el("div", { class:"extra" + (x.selesai ? " done" : "") },
        el("input", { type:"checkbox", ...(x.selesai ? { checked:true } : {}), onchange: async e => { x.selesai = e.target.checked; await simpanHarian(); route(); } }),
        el("span", x.judul),
        el("button", { class:"btn danger sm", onclick: async () => { st.tambahan.splice(i, 1); await simpanHarian(); route(); } }, "Hapus"))),
      el("div", { class:"row", style:"flex-wrap:nowrap" }, inp, el("button", { class:"btn sm", onclick: tambah }, "Tambah")));
  }
  function kartuPeriode(judul, periode, data, daftar) {
    const items = { ...(data?.items || {}) };
    const simpan = async () => { await sb.from("checklist_periode").upsert({ member_id: me.id, periode, items, updated_at: new Date().toISOString() }); };
    return el("section", { class:"panel pad stack", style:"gap:6px" },
      el("h2", judul),
      daftar.map(x => baris(x.label, x.manual ? !!items[x.k] : x.ok, x.info, x.manual ? tombolManual(x.k, simpan, items) : x.aksi)));
  }
  const mingguan = [
    { k:"ide", label:"Tanggapi Bank Ide", ok: ideBaru === 0, info: ideBaru ? ideBaru + " ide masih berstatus Baru" : "Semua ide sudah ditanggapi", aksi: el("a", { class:"btn ghost sm", href:"#/ide" }, "Buka") },
    { k:"masukan", label:"Baca Kritik & saran", ok: masukanBaru === 0, info: masukanBaru ? masukanBaru + " masukan baru" : "Semua masukan sudah dibaca", aksi: el("a", { class:"btn ghost sm", href:"#/masukan" }, "Buka") },
    { k:"review_menang", label:"Review eksperimen yang selesai (jadikan playbook tim)", manual:true },
    { k:"satu_satu", label:"1:1 bergilir minimal 3 orang", ok: satuMinggu.length >= 3, info: `${satuMinggu.length}/3 minggu ini. Paling lama belum diajak: ` + saran1on1.map(m => m.nama + (terakhir1on1[m.id] ? " (" + fmt(terakhir1on1[m.id], { day:"numeric", month:"short" }) + ")" : " (belum pernah)")).join(", ") },
    { k:"pilihan_leader", label:"Beri lencana Pilihan Leader (opsional)", manual:true },
  ];
  const bulanan = [
    { k:"unduh_csv", label:"Unduh CSV rekap checklist (cadangan data)", manual:true, aksi:null },
    { k:"review_target", label:"Review target per akun di spreadsheet supaya Si Paling tetap adil", manual:true },
    { k:"umumkan_juara", label:"Umumkan juara bulanan ke grup tim (setelah tanggal 4)", manual:true },
    { k:"perbarui_modul", label:"Perbarui modul belajar dan link kerja", manual:true },
  ];
  box.append(
    el("div", { class:"page-head" },
      el("div", el("h1", `Halo, ${me.nama}!`), el("p", { class:"hint" }, fmt(t) + (wk ? " · akhir pekan" : ""))),
      el("span", { class:"sticker" }, abs?.masuk ? (abs.pulang ? "Sudah pulang" : "Sedang bertugas") : "Belum absen")),
    el("div", { class:"mot-mini" }, el("small", "Kata-kata hari ini"), el("p", motivasiHariIni())),
    kartuNotif({ ringkas:true }),
    kartuAbsen(),
    kartuEnergi(),
    wk ? el("div", { class:"note" }, "Akhir pekan: tidak ada tugas harian leader. Selamat istirahat!") : kartuHarian(),
    kartuPeriode("Tugas minggu ini", kodeW, perW, mingguan),
    kartuPeriode("Tugas bulan ini", kodeM, perM, bulanan));
  return box;
}

/* ================= REKAP ABSENSI ================= */
async function viewAbsensi() {
  const me = S.me;
  const lead = S.members.filter(m => m.peran === "leader" && m.aktif);
  let siapa = S.absenSiapa && lead.some(m => m.id === S.absenSiapa) ? S.absenSiapa : (me.peran === "leader" ? me.id : lead[0]?.id);
  const bulan = S.absenBulan || today().slice(0, 7);
  const [y, mo] = bulan.split("-").map(Number);
  const awal = bulan + "-01", akhir = keyOf(new Date(y, mo, 0)), batas = akhir < today() ? akhir : today();
  const rows = siapa ? await q(sb.from("absensi").select("*").eq("member_id", siapa).gte("tanggal", awal).lte("tanggal", akhir).order("tanggal")) : [];
  const hari = []; for (let k = awal; k <= batas; k = addDays(k, 1)) if (!isWeekend(k)) hari.push(k);
  const byTgl = Object.fromEntries(rows.map(r => [r.tanggal, r]));
  const hitung = s => rows.filter(r => r.status === s).length;
  const rata = arr => { const m = arr.filter(Boolean).map(iso => { const d = new Date(iso); return d.getHours() * 60 + d.getMinutes(); }); if (!m.length) return "–"; const v = Math.round(m.reduce((a, b) => a + b, 0) / m.length); return z(Math.floor(v / 60)) + "." + z(v % 60); };
  const opsi = Array.from({ length: 6 }, (_, i) => { const dt = new Date(); dt.setDate(1); dt.setMonth(dt.getMonth() - i); return keyOf(dt).slice(0, 7); });
  function unduh() {
    const head = ["Nama", "Tanggal", "Hari", "Status", "Masuk", "Pulang", "Hal baik", "Perbaikan besok"];
    const data = [head, ...hari.map(k => { const r = byTgl[k]; return [namaOf(siapa), k, fmt(k, { weekday:"long" }), r ? r.status : "tidak absen", r ? jamDari(r.masuk) : "", r ? jamDari(r.pulang) : "", r?.catatan_baik || "", r?.catatan_besok || ""]; })];
    const csv = "\uFEFF" + data.map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(",")).join("\r\n");
    const a = el("a", { href: URL.createObjectURL(new Blob([csv], { type:"text/csv;charset=utf-8" })), download:`absensi-${namaOf(siapa).toLowerCase()}-${bulan}.csv` });
    document.body.append(a); a.click(); a.remove();
  }
  return el("div", { class:"stack" },
    el("div", { class:"page-head" },
      el("div", el("h1", "Absensi leader"), el("p", { class:"hint" }, "Rekap hari kerja Senin–Jumat. Bisa dilihat leader dan admin.")),
      el("div", { class:"row" },
        lead.length > 1 ? el("select", { class:"field", style:"max-width:180px", onchange: e => { S.absenSiapa = e.target.value; route(); } }, lead.map(m => el("option", { value:m.id, ...(m.id === siapa ? { selected:true } : {}) }, m.nama))) : null,
        el("select", { class:"field", style:"max-width:200px", onchange: e => { S.absenBulan = e.target.value; route(); } },
          opsi.map(b => el("option", { value:b, ...(b === bulan ? { selected:true } : {}) }, parseKey(b + "-01").toLocaleDateString("id-ID", { month:"long", year:"numeric" })))),
        el("button", { class:"btn ghost", onclick: unduh }, "Unduh CSV"))),
    el("div", { class:"stats" },
      el("div", { class:"stat" }, el("b", `${rows.filter(r => r.status !== "cuti" && hari.includes(r.tanggal)).length}/${hari.length}`), el("span", "Hari hadir (kantor, WFH, dinas)")),
      el("div", { class:"stat appr" }, el("b", `${hitung("kantor")} / ${hitung("wfh")} / ${hitung("dinas")}`), el("span", "Kantor / WFH / Dinas")),
      el("div", { class:"stat" }, el("b", String(hitung("cuti"))), el("span", "Cuti")),
      el("div", { class:"stat" }, el("b", rata(rows.map(r => r.masuk)) + " – " + rata(rows.map(r => r.pulang))), el("span", "Rata-rata masuk – pulang"))),
    el("section", { class:"panel pad table-wrap" }, el("table",
      el("thead", el("tr", el("th", "Tanggal"), el("th", "Status"), el("th", "Masuk"), el("th", "Pulang"), el("th", "Catatan"))),
      el("tbody", [...hari].reverse().map(k => { const r = byTgl[k];
        return el("tr", el("td", fmt(k, { weekday:"short", day:"numeric", month:"short" })),
          el("td", r ? el("span", { class:"chip " + (r.status === "cuti" ? "appr" : "calm") }, STATUS_ABSEN.find(s => s.v === r.status)?.label) : el("span", { class:"chip attn" }, "Tidak absen")),
          el("td", r ? jamDari(r.masuk) : "–"), el("td", r ? jamDari(r.pulang) : "–"),
          el("td", r && (r.catatan_baik || r.catatan_besok) ? el("div", r.catatan_baik ? el("div", "👍 " + r.catatan_baik) : null, r.catatan_besok ? el("div", { class:"hint" }, "➡️ " + r.catatan_besok) : null) : el("span", { class:"hint" }, "–"))); })))));
}


/* ================= NOTIFIKASI HP ================= */
const VAPID_PUBLIC = "BJbOJn4EjIsHB13t9ao9_wfjWYJffOtOrVfleXYYShV_YfLAk6jqx3cC0QCh4c_Y7EdQPExTaxEGVspaOv4cwWs";
const dukungPush = () => "serviceWorker" in navigator && "PushManager" in window && "Notification" in window;
const iPhoneBelumDipasang = () => /iphone|ipad|ipod/i.test(navigator.userAgent) && !(window.navigator.standalone || matchMedia("(display-mode: standalone)").matches);
function kunciB64(s) { const p = "=".repeat((4 - s.length % 4) % 4); const b = atob((s + p).replace(/-/g, "+").replace(/_/g, "/")); return Uint8Array.from([...b].map(c => c.charCodeAt(0))); }
async function daftarSW() { if (!("serviceWorker" in navigator)) return null; try { return await navigator.serviceWorker.register("/sw.js"); } catch (e) { return null; } }
async function statusNotif() {
  if (!dukungPush()) return iPhoneBelumDipasang() ? "pasang-dulu" : "tidak-didukung";
  if (Notification.permission === "denied") return "diblokir";
  const reg = await navigator.serviceWorker.getRegistration();
  const sub = reg && await reg.pushManager.getSubscription();
  return sub ? "aktif" : "belum";
}
async function aktifkanNotif() {
  if (!dukungPush()) throw new Error(iPhoneBelumDipasang() ? "Di iPhone, pasang Spill ke layar utama dulu (Bagikan → Tambahkan ke Layar Utama), lalu buka dari ikonnya." : "Browser ini belum mendukung notifikasi.");
  const izin = await Notification.requestPermission();
  if (izin !== "granted") throw new Error("Izin notifikasi tidak diberikan. Bisa diaktifkan lagi dari pengaturan browser.");
  const reg = (await daftarSW()) || await navigator.serviceWorker.ready;
  await navigator.serviceWorker.ready;
  let sub = await reg.pushManager.getSubscription();
  if (!sub) sub = await reg.pushManager.subscribe({ userVisibleOnly:true, applicationServerKey: kunciB64(VAPID_PUBLIC) });
  const j = sub.toJSON();
  await q(sb.from("push_langganan").upsert({ endpoint: j.endpoint, member_id: S.me.id, p256dh: j.keys.p256dh, auth: j.keys.auth, perangkat: navigator.userAgent.slice(0, 120) }, { onConflict:"endpoint" }));
}
async function matikanNotif() {
  const reg = await navigator.serviceWorker.getRegistration();
  const sub = reg && await reg.pushManager.getSubscription();
  if (sub) { await sb.from("push_langganan").delete().eq("endpoint", sub.endpoint); await sub.unsubscribe(); }
}
// Kartu ajakan menyalakan notifikasi (dipakai di Hari ini dan Akun)
function kartuNotif({ ringkas = false } = {}) {
  const sec = el("section", { class:"panel pad stack notif-kartu", style:"gap:10px" });
  const kunciTutup = "spill-notif-tutup-" + S.me.id;
  (async () => {
    const st = await statusNotif().catch(() => "tidak-didukung");
    const ditutup = (() => { try { return localStorage.getItem(kunciTutup); } catch (e) { return null; } })();
    if (ringkas && (st === "aktif" || st === "tidak-didukung" || ditutup)) { sec.remove(); return; }
    const pesan = { aktif:"Notifikasi aktif di perangkat ini. Kamu akan diingatkan check-in pagi, checklist sore, rapor Jumat, dan pesan dari leader.",
      belum:"Biar nggak lupa check-in, nyalakan notifikasi. Spill cuma mengingatkan seperlunya: pagi, sore, Jumat, dan saat ada pesan dari leader.",
      diblokir:"Notifikasi diblokir di browser ini. Buka pengaturan situs di browser, izinkan Notifikasi untuk teras-drm.vercel.app, lalu muat ulang.",
      "pasang-dulu":"Di iPhone, notifikasi hanya bisa jalan kalau Spill dipasang ke layar utama: tekan tombol Bagikan → Tambahkan ke Layar Utama, lalu buka Spill dari ikonnya.",
      "tidak-didukung":"Browser ini belum mendukung notifikasi. Coba buka Spill di Chrome (Android) atau pasang ke layar utama (iPhone)." }[st];
    const tombol = el("div", { class:"row" });
    if (st === "belum") tombol.append(el("button", { class:"btn", onclick: async e => { e.target.disabled = true; try { await aktifkanNotif(); toast("Notifikasi aktif 🔔"); route(); } catch (er) { toast(er.message); e.target.disabled = false; } } }, "🔔 Nyalakan notifikasi"));
    if (st === "aktif") tombol.append(el("button", { class:"btn ghost sm", onclick: async () => { await matikanNotif(); toast("Notifikasi dimatikan"); route(); } }, "Matikan di perangkat ini"));
    if (ringkas) tombol.append(el("button", { class:"btn ghost sm", onclick: () => { try { localStorage.setItem(kunciTutup, "1"); } catch (e) {} sec.remove(); } }, "Nanti saja"));
    sec.replaceChildren(el("div", { class:"row between" }, el("h2", "Notifikasi HP"), el("span", { class:"chip " + (st === "aktif" ? "calm" : "appr") }, st === "aktif" ? "Aktif" : "Belum aktif")), el("p", { class:"hint" }, pesan), tombol);
  })();
  return sec;
}
// Kabari anggota lewat HP saat leader/admin mengirim pesan (tidak menghalangi kalau gagal)
async function dorongKe(memberId, judul, isi) {
  try {
    const { data: { session } } = await sb.auth.getSession();
    if (!session) return;
    fetch("/api/dorong", { method:"POST", headers:{ "Content-Type":"application/json", Authorization:"Bearer " + session.access_token }, body: JSON.stringify({ member_id: memberId, judul, isi, url:"/#/hari" }) }).catch(() => {});
  } catch (e) {}
}

/* ================= KARTU AKUNKU: TARGET VS AKTUAL ================= */
const ringkasAngka = n => n >= 1e6 ? (n / 1e6).toLocaleString("id-ID", { maximumFractionDigits:1 }) + " jt" : n >= 1e3 ? Math.round(n / 1e3).toLocaleString("id-ID") + " rb" : Math.round(n).toLocaleString("id-ID");
// Kartu Akunku: target vs realisasi bulan ini, bisa dipilih metriknya (data dari tab DRM MARKETING)
const METRIK_AKUN = [
  { v:"jangkauan", label:"Jangkauan" }, { v:"views", label:"Views" },
  { v:"followers", label:"Followers" }, { v:"downloader", label:"Downloader" },
];
async function kartuAkunku(akunku) {
  if (!akunku.length) return null;
  const t = today(), awal = t.slice(0, 8) + "01";
  const [y, mo] = t.split("-").map(Number);
  const nHari = new Date(y, mo, 0).getDate(), akhir = keyOf(new Date(y, mo, 0));
  const semua = await q(sb.from("kpi_harian").select("akun,tanggal,metrik,target,real").in("akun", akunku).gte("tanggal", awal).lte("tanggal", akhir));
  const sec = el("section", { class:"panel akunku" });
  function draw() {
    const metrik = S.akunkuMetrik || "jangkauan";
    const nama = METRIK_AKUN.find(x => x.v === metrik).label;
    const kecil = nama.toLowerCase();
    const pilih = pilihan(METRIK_AKUN, { get: () => metrik, set: v => { S.akunkuMetrik = v; }, onChange: draw });
    const rows = semua.filter(r => r.metrik === metrik);
    const ada = rows.filter(r => r.real > 0);
    const targetBulan = akunku.reduce((s, a) => { const tg = rows.filter(r => r.akun === a); const sum = tg.reduce((x, r) => x + Number(r.target), 0); return s + (tg.length >= nHari ? sum : (tg.length ? sum / tg.length * nHari : 0)); }, 0);
    const kepala = (judulKanan, sub) => el("div", { class:"akunku-head" },
      el("div", el("h2", "Akunku: " + akunku.join(" + ")), el("p", { class:"hint" }, sub)), judulKanan);
    if (!ada.length || !targetBulan) {
      sec.replaceChildren(kepala(el("span", { class:"chip" }, "Belum ada data"), nama + " bulan ini"),
        el("div", { class:"akunku-metrik" }, pilih),
        el("p", { class:"hint", style:"padding:4px 18px 16px" }, "Data " + kecil + " bulan ini belum masuk dari spreadsheet DRM MARKETING."));
      return;
    }
    const realMTD = ada.reduce((s, r) => s + Number(r.real), 0), targetMTD = ada.reduce((s, r) => s + Number(r.target), 0);
    const pct = Math.round(realMTD / targetMTD * 100);
    const terakhir = ada.map(r => r.tanggal).sort().pop();
    const hariData = new Set(ada.map(r => r.tanggal)).size;
    const sisa = Math.max(0, nHari - Number(terakhir.slice(8)));
    const proyeksiPct = Math.round((realMTD + realMTD / hariData * sisa) / targetBulan * 100);
    const butuh = sisa ? Math.max(0, (targetBulan - realMTD) / sisa) : 0;
    const perHari = {}; ada.forEach(r => { perHari[r.tanggal] = perHari[r.tanggal] || { r:0, t:0 }; perHari[r.tanggal].r += Number(r.real); perHari[r.tanggal].t += Number(r.target); });
    const terbaik = Object.entries(perHari).sort((a, b) => b[1].r / b[1].t - a[1].r / a[1].t)[0];
    const batasIsi = addDays(t, -3), kosong = [];
    for (let k = awal; k <= batasIsi; k = addDays(k, 1)) akunku.forEach(a => { if (!ada.some(r => r.akun === a && r.tanggal === k)) kosong.push({ a, k }); });
    const status = pct >= 100 ? ["Melaju 🚀", "calm"] : pct >= 85 ? ["Hampir 💪", "appr"] : ["Butuh dorongan 🔥", "attn"];
    const hari14 = Array.from({ length: 14 }, (_, i) => addDays(terakhir, i - 13));
    const tglPendek = k => fmt(k, { day:"numeric", month:"short" });
    sec.replaceChildren(
      kepala(el("span", { class:"chip " + status[1] }, status[0]), "Target " + kecil + " bulan ini, data sampai " + tglPendek(terakhir)),
      el("div", { class:"akunku-metrik" }, pilih),
      el("div", { class:"akunku-isi" },
        el("div", { class:"akunku-angka" }, el("b", pct + "%"), el("small", "dari target " + kecil + " sampai " + tglPendek(terakhir) + " (" + ringkasAngka(realMTD) + " dari " + ringkasAngka(targetMTD) + ")")),
        el("div", { class:"akunku-angka" }, el("b", proyeksiPct + "%"), el("small", "proyeksi akhir bulan kalau ritmenya sama")),
        el("div", { class:"akunku-angka" }, el("b", sisa ? ringkasAngka(butuh) : "–"), el("small", sisa ? kecil + " per hari di " + sisa + " hari tersisa supaya tembus 100%" : "bulan ini sudah selesai"))),
      // Grafik harian: angka % di atas batang, tanggal di bawah, garis target 100%, keterangan warna
      el("div", { class:"grafik" },
        el("div", { class:"grafik-judul" }, el("b", "Pencapaian " + kecil + " harian"), el("small", "14 hari terakhir, % dari target " + kecil + " per hari")),
        el("div", { class:"grafik-area" },
          hari14.map(k => { const d = perHari[k]; const p = d ? d.r / d.t * 100 : 0;
            const tinggi = d ? Math.max(8, Math.min(100, p / 1.5)) : 4;
            return el("div", { class:"grafik-kol", title: fmt(k, { weekday:"long", day:"numeric", month:"short" }) + (d ? ": " + ringkasAngka(d.r) + " dari target " + ringkasAngka(d.t) + " (" + Math.round(p) + "%)" : ": belum diisi di spreadsheet") },
              el("div", { class:"grafik-wrap" },
                el("small", { class:"grafik-nilai", style:"bottom:calc(" + tinggi + "% + 2px)" }, d ? String(Math.round(p)) : "–"),
                el("i", { style:"height:" + tinggi + "%;background:" + (!d ? "var(--line)" : p >= 100 ? "var(--lime)" : p >= 85 ? "var(--yellow)" : "var(--pink)") })),
              el("span", { class:"grafik-tgl" }, String(Number(k.slice(8))))); })),
        el("div", { class:"grafik-legenda" },
          el("span", el("i", { style:"background:var(--lime)" }), "≥100%"),
          el("span", el("i", { style:"background:var(--yellow)" }), "85–99%"),
          el("span", el("i", { style:"background:var(--pink)" }), "<85%"),
          el("span", el("i", { style:"background:var(--line)" }), "belum diisi"),
          el("span", el("b", { class:"leg-garis" }), "target " + kecil + " 100%"),
          el("small", "Angka di atas batang = % dari target " + kecil + " hari itu. Angka di bawah = tanggal. Ketuk/arahkan ke batang untuk detail."))),
      el("div", { class:"akunku-kaki" },
        terbaik ? el("span", "🏅 Hari terbaik: " + tglPendek(terbaik[0]) + " (" + Math.round(terbaik[1].r / terbaik[1].t * 100) + "%)") : null,
        kosong.length ? el("span", { class:"err" }, "⚠️ " + nama + " belum diisi di spreadsheet: " + kosong.slice(0, 6).map(x => (akunku.length > 1 ? x.a + " " : "") + tglPendek(x.k)).join(", ") + (kosong.length > 6 ? ", …" : "")) : null,
        metrik === "downloader" ? el("span", { class:"hint" }, "ℹ️ Downloader juga dipengaruhi produk, harga, dan momen pendaftaran, bukan hanya konten.") : null,
        pct < 85 ? el("a", { class:"btn sm", href:"#/eksperimen" }, "Coba strategi baru → buat eksperimen") : null));
  }
  draw();
  return sec;
}

/* ================= CATATAN 1:1 (LEADER/ADMIN) ================= */
function panelCatatan(m) {
  const box = el("div", { class:"subform", style:"gap:10px" });
  box.append(el("p", { class:"hint" }, "Memuat catatan…"));
  (async () => {
    const rows = await q(sb.from("catatan_1on1").select("*").eq("member_id", m.id).order("tanggal", { ascending:false }).limit(6)).catch(() => []);
    const f = { topik:"", kesepakatan:"", tindak:"", tenggat:"" };
    box.replaceChildren(
      el("b", "Catatan 1:1 dengan " + m.nama),
      el("p", { class:"hint" }, "Pribadi, hanya kamu yang bisa membaca."),
      rows.length ? rows.map(c => el("div", { class:"catatan-1on1" + (c.selesai ? " selesai" : "") },
        el("small", fmt(c.tanggal, { day:"numeric", month:"short", year:"numeric" })),
        c.topik ? el("div", el("b", "Dibahas: "), c.topik) : null,
        c.kesepakatan ? el("div", el("b", "Sepakat: "), c.kesepakatan) : null,
        c.tindak_lanjut ? el("label", { class:"row", style:"gap:6px" },
          el("input", { type:"checkbox", ...(c.selesai ? { checked:true } : {}), onchange: async e => { await q(sb.from("catatan_1on1").update({ selesai: e.target.checked }).eq("id", c.id)); toast("Tersimpan"); } }),
          el("span", "Tindak lanjut: " + c.tindak_lanjut + (c.tenggat ? " (tenggat " + fmt(c.tenggat, { day:"numeric", month:"short" }) + ")" : ""))) : null)) : el("p", { class:"hint" }, "Belum ada catatan."),
      el("div", { class:"grid2" },
        el("label", { class:"lbl" }, "Yang dibahas", input(f, "topik", { multiline:true, rows:"2", draf:"c1-" + m.id })),
        el("label", { class:"lbl" }, "Kesepakatan", input(f, "kesepakatan", { multiline:true, rows:"2", draf:"c1-" + m.id }))),
      el("div", { class:"grid2" },
        el("label", { class:"lbl" }, "Tindak lanjut", input(f, "tindak", { placeholder:"Contoh: kirim template hook", draf:"c1-" + m.id })),
        el("label", { class:"lbl" }, "Tenggat", input(f, "tenggat", { type:"date" }))),
      el("div", el("button", { class:"btn sm", onclick: async () => {
        if (!f.topik.trim() && !f.kesepakatan.trim() && !f.tindak.trim()) return toast("Isi minimal satu kolom.");
        try { await q(sb.from("catatan_1on1").insert({ member_id: m.id, penulis_id: S.me.id, topik: f.topik.trim(), kesepakatan: f.kesepakatan.trim(), tindak_lanjut: f.tindak.trim(), tenggat: f.tenggat || null }));
          hapusDraf("c1-" + m.id); toast("Catatan 1:1 tersimpan"); box.replaceWith(panelCatatan(m)); } catch (e) { toast("Gagal: " + e.message); } } }, "Simpan catatan")));
  })();
  return box;
}
async function viewCatatan() {
  const rows = await q(sb.from("catatan_1on1").select("*").order("tanggal", { ascending:false }).limit(300));
  const t = today();
  const terbuka = rows.filter(c => c.tindak_lanjut && !c.selesai).sort((a, b) => (a.tenggat || "9999").localeCompare(b.tenggat || "9999"));
  let pilih = null;
  const box = el("div", { class:"stack" });
  function draw() {
    const orang = team();
    const terakhir = id => rows.find(c => c.member_id === id)?.tanggal;
    box.replaceChildren(
      el("div", el("h1", "Catatan 1:1"), el("p", { class:"hint", style:"margin-top:6px" }, "Pribadi, hanya penulisnya yang bisa membaca. Supaya obrolan berikutnya tidak mulai dari nol.")),
      el("section", { class:"panel pad stack", style:"gap:8px" },
        el("h2", "Tindak lanjut terbuka (" + terbuka.length + ")"),
        terbuka.length ? terbuka.map(c => el("label", { class:"extra" },
          el("input", { type:"checkbox", onchange: async () => { await q(sb.from("catatan_1on1").update({ selesai:true }).eq("id", c.id)); toast("Selesai ✅"); route(); } }),
          el("span", el("b", namaOf(c.member_id) + ": "), c.tindak_lanjut),
          c.tenggat ? el("span", { class:"chip " + (c.tenggat < t ? "attn" : c.tenggat === t ? "appr" : "") }, (c.tenggat < t ? "Lewat · " : "") + fmt(c.tenggat, { day:"numeric", month:"short" })) : null))
          : el("p", { class:"hint" }, "Tidak ada tindak lanjut yang menggantung. Mantap.")),
      el("section", { class:"panel pad stack", style:"gap:10px" },
        el("h2", "Per anggota"),
        el("p", { class:"hint" }, "Diurutkan dari yang paling lama belum diajak ngobrol."),
        el("div", { class:"table-wrap" }, el("table", el("tbody", [...orang].sort((a, b) => (terakhir(a.id) || "").localeCompare(terakhir(b.id) || "")).map(m => el("tr",
          el("td", el("b", m.nama)),
          el("td", terakhir(m.id) ? "Terakhir " + fmt(terakhir(m.id), { day:"numeric", month:"short" }) : el("span", { class:"chip appr" }, "Belum pernah")),
          el("td", { class:"num" }, el("button", { class:"btn ghost sm", onclick: () => { pilih = pilih === m.id ? null : m.id; draw(); } }, pilih === m.id ? "Tutup" : "Buka catatan"))))))),
        pilih ? panelCatatan(member(pilih)) : null));
  }
  draw();
  return box;
}

/* ================= TREN ENERGI TIM ================= */
function awalMingguDari(k) { const d = parseKey(k); const g = (d.getDay() + 6) % 7; return addDays(k, -g); }
function warnaEnergi(v) { return v == null ? "var(--line)" : v < 2.8 ? "var(--pink)" : v < 3.5 ? "var(--yellow)" : "var(--lime)"; }
function trenEnergi(cis, akhir) {
  const mulai = awalMingguDari(akhir);
  const minggu = Array.from({ length: 8 }, (_, i) => { const a = addDays(mulai, -7 * (7 - i)); return { a, b: addDays(a, 6) }; });
  const rata = minggu.map(w => { const xs = cis.filter(c => c.tanggal >= w.a && c.tanggal <= w.b).map(c => c.energi); return xs.length ? xs.reduce((s, v) => s + v, 0) / xs.length : null; });
  const waspada = team().map(m => {
    const xs = cis.filter(c => c.member_id === m.id && c.tanggal <= akhir).sort((a, b) => b.tanggal.localeCompare(a.tanggal));
    let n = 0; for (const c of xs) { if (c.energi <= 2) n++; else break; }
    return { m, n };
  }).filter(x => x.n >= 3);
  return el("section", { class:"panel pad stack", style:"gap:12px" },
    el("div", { class:"row between" }, el("h2", "Tren energi tim (8 minggu)"), el("span", { class:"hint" }, "Rata-rata check-in per minggu, skala 1–5")),
    el("div", { class:"tren" }, minggu.map((w, i) => el("div", { class:"tren-kol" },
      el("small", rata[i] == null ? "–" : rata[i].toFixed(1)),
      el("i", { style:"height:" + (rata[i] == null ? 4 : rata[i] / 5 * 100) + "%;background:" + warnaEnergi(rata[i]) }),
      el("span", fmt(w.a, { day:"numeric", month:"short" }))))),
    waspada.length ? el("div", { class:"note bad" }, el("b", "⚠️ Waspada kelelahan: "), waspada.map(x => x.m.nama + " (energi rendah " + x.n + " check-in berturut-turut)").join(", ") + ". Pertimbangkan ajak ngobrol atau kurangi bebannya sementara.")
      : el("p", { class:"hint" }, "Tidak ada yang energinya rendah 3 check-in berturut-turut. 👍"));
}

/* ================= RAPOR MINGGUAN ================= */
const PENUTUP_RAPOR = [
  "Minggu ini udah lewat. Kamu juga udah lewat banyak hal. Bangga dikit boleh lah.",
  "Angka bisa naik turun, tapi effort kamu konsisten. Itu yang bikin beda.",
  "Istirahat yang bener ya weekend ini. Algoritma juga butuh kamu yang fresh.",
  "Apa pun hasilnya minggu ini, kamu sudah datang dan berusaha. Respect.",
  "Minggu depan kita gas lagi. Pelan-pelan asal kelihatan jalannya.",
];
function kotakAngka(judul, nilai, ket, warna) { return el("div", { class:"stat " + (warna || "") }, el("b", nilai), el("span", judul + (ket ? " · " + ket : ""))); }
const tsHari = d => parseKey(d).toISOString();
async function viewRapor() {
  const me = S.me;
  let mode = S.raporMode || (me.peran === "leader" ? "tim" : "saya");
  if (!me.is_admin) mode = "saya";
  if (me.peran === "leader") mode = "tim";
  let pilihMinggu = S.raporMinggu || "ini";
  const box = el("div", { class:"stack" });
  async function draw() {
    const r = rentangPeriode(pilihMinggu === "ini" ? "minggu" : "mingguLalu");
    const lalu = { awal: addDays(r.awal, -7), akhir: addDays(r.awal, -1) };
    const kepala = el("div", { class:"page-head" },
      el("div", el("h1", mode === "tim" ? "Rapor mingguan tim" : "Rapor mingguanku"), el("p", { class:"hint" }, r.label)),
      el("div", { class:"row" },
        me.is_admin && me.peran !== "leader" ? pilihan([{ v:"saya", label:"Raporku" }, { v:"tim", label:"Rapor tim" }], { get: () => mode, set: v => { mode = v; S.raporMode = v; }, onChange: draw }) : null,
        pilihan([{ v:"ini", label:"Minggu ini" }, { v:"lalu", label:"Minggu lalu" }], { get: () => pilihMinggu, set: v => { pilihMinggu = v; S.raporMinggu = v; }, onChange: draw })));
    box.replaceChildren(kepala, el("p", { class:"hint" }, "Menyusun rapor…"));
    try { box.replaceChildren(kepala, ...(mode === "tim" ? await raporTim(r, lalu) : await raporSaya(r, lalu))); }
    catch (e) { box.replaceChildren(kepala, el("p", { class:"err" }, "Gagal menyusun rapor: " + e.message)); }
  }
  draw();
  return box;
}
async function raporSaya(r, lalu) {
  const me = S.me, akhirTs = tsHari(addDays(r.akhir, 1));
  const [cis, dcs, ls, papan, papanLalu, eks, riset, ide, modul] = await Promise.all([
    q(sb.from("checkins").select("*").eq("member_id", me.id).gte("tanggal", addDays(r.awal, -40)).lte("tanggal", r.akhir)),
    q(sb.from("daily_checklists").select("*").eq("member_id", me.id).gte("tanggal", addDays(r.awal, -40)).lte("tanggal", r.akhir)),
    q(sb.from("lencana").select("*").eq("member_id", me.id).gte("created_at", tsHari(r.awal)).lt("created_at", akhirTs)),
    q(sb.rpc("papan", { p_awal: r.awal, p_akhir: r.akhir })),
    q(sb.rpc("papan", { p_awal: lalu.awal, p_akhir: lalu.akhir })),
    q(sb.from("experiments").select("id").eq("member_id", me.id).eq("status", "selesai").gte("updated_at", tsHari(r.awal)).lt("updated_at", akhirTs)),
    q(sb.from("riset_kompetitor").select("id").eq("member_id", me.id).gte("tanggal", r.awal).lte("tanggal", r.akhir)),
    q(sb.from("ide").select("id").eq("member_id", me.id).gte("created_at", tsHari(r.awal)).lt("created_at", akhirTs)),
    q(sb.from("modul_progress").select("modul_id").eq("member_id", me.id).eq("status", "selesai").gte("updated_at", tsHari(r.awal)).lt("updated_at", akhirTs))]);
  const batas = r.akhir < today() ? r.akhir : today();
  const hari = []; for (let k = r.awal; k <= batas; k = addDays(k, 1)) if (!isWeekend(k)) hari.push(k);
  const ciMinggu = cis.filter(c => c.tanggal >= r.awal && c.tanggal <= r.akhir);
  const cuti = new Set(dcs.filter(d => d.cuti).map(d => d.tanggal));
  const hk = hari.filter(k => !cuti.has(k));
  const pcts = me.peran === "sms" ? hk.map(k => pctOf(dcs.find(d => d.tanggal === k), me, k) ?? 0) : [];
  const rataCL = pcts.length ? Math.round(pcts.reduce((s, v) => s + v, 0) / pcts.length) : null;
  const rataEnergi = ciMinggu.length ? (ciMinggu.reduce((s, c) => s + c.energi, 0) / ciMinggu.length).toFixed(1) : "–";
  const ada = new Set(cis.map(c => c.tanggal)); let streak = 0;
  for (let k = batas, i = 0; i < 60; i++, k = addDays(k, -1)) { if (isWeekend(k)) continue; if (ada.has(k) || cuti.has(k)) streak++; else if (k !== today()) break; }
  const jk = papan.find(p => p.kategori === "jangkau" && p.member_id === me.id), jkL = papanLalu.find(p => p.kategori === "jangkau" && p.member_id === me.id);
  const juara = KATEGORI_JUARA.map(k => { const xs = papan.filter(p => p.kategori === k.k && Number(p.nilai) > 0).sort((a, b) => b.nilai - a.nilai).slice(0, 3); const i = xs.findIndex(p => p.member_id === me.id); return i >= 0 ? ["🥇", "🥈", "🥉"][i] + " " + k.nama : null; }).filter(Boolean);
  const pelajaran = ciMinggu.filter(c => c.pelajaran).map(c => ({ k: c.tanggal, p: c.pelajaran }));
  return [
    el("div", { class:"stats" },
      kotakAngka("Hari check-in", ciMinggu.filter(c => !isWeekend(c.tanggal)).length + "/" + hk.length),
      rataCL != null ? kotakAngka("Rata-rata checklist", rataCL + "%", "", "appr") : kotakAngka("Rata-rata energi", rataEnergi, "", "appr"),
      kotakAngka("Jangkauan akun", jk ? Math.round(jk.nilai) + "%" : "–", jk && jkL ? (jk.nilai >= jkL.nilai ? "▲ " : "▼ ") + Math.abs(Math.round(jk.nilai - jkL.nilai)) + " poin dari minggu lalu" : "dari target"),
      kotakAngka("Streak check-in", streak + " hari", "", "attn")),
    el("section", { class:"panel pad stack", style:"gap:10px" }, el("h2", "Yang kamu kerjakan minggu ini"),
      el("div", { class:"row", style:"gap:8px" },
        [[eks.length, "eksperimen selesai"], [riset.length, "riset kompetitor"], [ide.length, "ide dikirim"], [modul.length, "modul selesai"]].map(x => el("span", { class:"chip" + (x[0] ? " calm" : "") }, x[0] + " " + x[1])))),
    juara.length || ls.length ? el("section", { class:"panel pad stack", style:"gap:10px" }, el("h2", "Pencapaian 🏆"),
      juara.length ? el("div", { class:"row", style:"gap:8px" }, juara.map(j => el("span", { class:"chip appr" }, j))) : null,
      ls.length ? el("div", { class:"row", style:"gap:8px" }, ls.map(l => { const i = infoLencana(l.kode); return el("span", { class:"chip brand" }, i.emoji + " " + i.nama); })) : null) : null,
    pelajaran.length ? el("section", { class:"panel pad stack", style:"gap:8px" }, el("h2", "Pelajaranmu minggu ini"),
      pelajaran.map(x => el("div", { class:"line-p" }, el("small", fmt(x.k, { weekday:"short", day:"numeric", month:"short" })), el("span", x.p)))) : null,
    el("div", { class:"mot-mini" }, el("small", "Catatan dari Spill"), el("p", PENUTUP_RAPOR[Number(r.awal.slice(8)) % PENUTUP_RAPOR.length]))];
}
async function raporTim(r, lalu) {
  const akhirTs = tsHari(addDays(r.akhir, 1));
  const [cis, dcs, papan, papanLalu, eks, riset, ide, masukan] = await Promise.all([
    q(sb.from("checkins").select("member_id,tanggal,energi,hambatan,bantuan").gte("tanggal", addDays(r.awal, -56)).lte("tanggal", r.akhir)),
    q(sb.from("daily_checklists").select("*").gte("tanggal", r.awal).lte("tanggal", r.akhir)),
    q(sb.rpc("papan", { p_awal: r.awal, p_akhir: r.akhir })),
    q(sb.rpc("papan", { p_awal: lalu.awal, p_akhir: lalu.akhir })),
    q(sb.from("experiments").select("id").eq("status", "selesai").gte("updated_at", tsHari(r.awal)).lt("updated_at", akhirTs)),
    q(sb.from("riset_kompetitor").select("id").gte("tanggal", r.awal).lte("tanggal", r.akhir)),
    q(sb.from("ide").select("id").gte("created_at", tsHari(r.awal)).lt("created_at", akhirTs)),
    S.me.peran === "leader" ? jumlahBaris(sb.from("masukan").select("id", { count:"exact", head:true }).gte("tanggal", r.awal).lte("tanggal", r.akhir)).catch(() => 0) : 0]);
  const orang = team(), sms = orang.filter(m => m.peran === "sms");
  const batas = r.akhir < today() ? r.akhir : today();
  const hari = []; for (let k = r.awal; k <= batas; k = addDays(k, 1)) if (!isWeekend(k)) hari.push(k);
  const ciMinggu = cis.filter(c => c.tanggal >= r.awal && c.tanggal <= r.akhir && !isWeekend(c.tanggal));
  const cutiHK = dcs.filter(d => d.cuti && !isWeekend(d.tanggal)).length;
  const slot = orang.length * hari.length - cutiHK;
  const pcts = []; sms.forEach(m => hari.forEach(k => { const dc = dcs.find(d => d.member_id === m.id && d.tanggal === k); if (dc && dc.cuti) return; pcts.push(pctOf(dc, m, k) ?? 0); }));
  const hambatan = {}; ciMinggu.forEach(c => { if (c.hambatan && c.hambatan !== "Tidak ada hambatan") hambatan[c.hambatan] = (hambatan[c.hambatan] || 0) + 1; });
  const energiHari = hari.map(k => { const xs = ciMinggu.filter(c => c.tanggal === k).map(c => c.energi); return { k, v: xs.length ? xs.reduce((s, v) => s + v, 0) / xs.length : null }; });
  const nilai = (p, id) => p.find(x => x.kategori === "jangkau" && x.member_id === id);
  const gerak = sms.map(m => { const a = nilai(papan, m.id), b = nilai(papanLalu, m.id); return a && b ? { m, d: a.nilai - b.nilai, a: a.nilai } : null; }).filter(Boolean).sort((x, y) => y.d - x.d);
  const juara = KATEGORI_JUARA.map(k => { const top = papan.filter(p => p.kategori === k.k && Number(p.nilai) > 0).sort((a, b) => b.nilai - a.nilai)[0]; return top ? { k, top } : null; }).filter(Boolean);
  return [
    el("div", { class:"stats" },
      kotakAngka("Kehadiran check-in", slot > 0 ? Math.round(ciMinggu.length / slot * 100) + "%" : "–"),
      kotakAngka("Rata-rata checklist", pcts.length ? Math.round(pcts.reduce((s, v) => s + v, 0) / pcts.length) + "%" : "–", "social media", "appr"),
      kotakAngka("Permintaan bantuan", String(ciMinggu.filter(c => c.bantuan).length), "", "attn"),
      kotakAngka(S.me.peran === "leader" ? "Masukan anonim" : "Ide baru", String(S.me.peran === "leader" ? masukan : ide.length))),
    el("section", { class:"panel pad stack", style:"gap:10px" }, el("h2", "Energi tim per hari"),
      el("div", { class:"tren" }, energiHari.map(x => el("div", { class:"tren-kol" }, el("small", x.v == null ? "–" : x.v.toFixed(1)),
        el("i", { style:"height:" + (x.v == null ? 4 : x.v / 5 * 100) + "%;background:" + warnaEnergi(x.v) }),
        el("span", fmt(x.k, { weekday:"short" })))))),
    trenEnergi(cis, batas),
    el("div", { class:"grid2" },
      el("section", { class:"panel pad stack", style:"gap:8px" }, el("h2", "Hambatan tersering"),
        Object.keys(hambatan).length ? Object.entries(hambatan).sort((a, b) => b[1] - a[1]).map(([h, n]) => el("div", { class:"row between" }, el("span", h), el("b", n + "×"))) : el("p", { class:"hint" }, "Tidak ada hambatan yang dilaporkan.")),
      el("section", { class:"panel pad stack", style:"gap:8px" }, el("h2", "Aktivitas tim"),
        [[eks.length, "eksperimen selesai"], [riset.length, "riset kompetitor"], [ide.length, "ide baru"]].map(x => el("div", { class:"row between" }, el("span", x[1]), el("b", String(x[0])))))),
    el("section", { class:"panel pad stack", style:"gap:10px" }, el("h2", "Pergerakan jangkauan vs minggu lalu"),
      gerak.length ? el("div", { class:"table-wrap" }, el("table", el("tbody", gerak.map(x => el("tr", el("td", el("b", x.m.nama)), el("td", Math.round(x.a) + "% target"),
        el("td", { class:"num" }, el("span", { class:"chip " + (x.d >= 0 ? "calm" : "attn") }, (x.d >= 0 ? "▲ " : "▼ ") + Math.abs(Math.round(x.d)) + " poin"))))))) : el("p", { class:"hint" }, "Belum cukup data jangkauan untuk dibandingkan.")),
    juara.length ? el("section", { class:"panel pad stack", style:"gap:8px" }, el("h2", "Juara minggu ini"),
      el("div", { class:"row", style:"gap:8px" }, juara.map(j => el("span", { class:"chip appr" }, j.k.emoji + " " + j.k.nama + ": " + namaOf(j.top.member_id))))) : null];
}


/* ================= RISET KOMPETITOR MINGGUAN ================= */
// Riset tidak lagi wajib setiap hari: target 2 kali per minggu, masing-masing 1–3 kompetitor saja.
const TARGET_RISET_MINGGUAN = 2, MAKS_KOMPETITOR = 3;
// Kirim/perbarui ide ke Bank Ide dari riset kompetitor
async function simpanIdeDariSumber(sumber, ref, judul, isi) {
  const ada = await q(sb.from("ide").select("id,status").eq("member_id", S.me.id).eq("sumber", sumber).eq("sumber_ref", String(ref)).maybeSingle());
  if (ada) { if (ada.status === "baru") await q(sb.from("ide").update({ judul, isi }).eq("id", ada.id)); return ada.id; }
  const r = await q(sb.from("ide").insert({ member_id: S.me.id, judul, isi, kategori:"Konten", status:"baru", sumber, sumber_ref: String(ref) }).select("id").single());
  return r.id;
}
function kartuRisetMingguan(akunku, risetMinggu) {
  const me = S.me, t = today();
  const sec = el("section", { class:"panel pad stack", style:"gap:10px" });
  let buka = false;
  const rs = { akun: akunku[0] || "", kompetitor:"", platform:[], temuan:"", ide:"", keBank:true, err:"" };
  const punyaHariIni = () => risetMinggu.find(r => r.tanggal === t && r.akun === rs.akun);
  const isiDari = r => { rs.kompetitor = (r?.kompetitor || []).join(", "); rs.platform = [...(r?.platform || [])]; rs.temuan = r?.temuan || ""; rs.ide = r?.ide || ""; };
  isiDari(punyaHariIni());
  async function simpan(btn) {
    const komp = rs.kompetitor.split(/[,\n]/).map(x => x.trim()).filter(Boolean);
    if (!rs.akun) { rs.err = "Pilih aplikasi kita yang kompetitornya kamu riset."; return draw(); }
    if (komp.length < 1) { rs.err = "Tulis minimal 1 kompetitor."; return draw(); }
    if (komp.length > MAKS_KOMPETITOR) { rs.err = "Maksimal " + MAKS_KOMPETITOR + " kompetitor saja, biar risetnya fokus dan dalam."; return draw(); }
    if (!rs.temuan.trim()) { rs.err = "Isi temuan singkatnya dulu."; return draw(); }
    btn.disabled = true;
    try {
      const baris = await q(sb.from("riset_kompetitor").upsert({ member_id: me.id, tanggal: t, akun: rs.akun, kompetitor: komp, platform: rs.platform, temuan: rs.temuan.trim(), ide: rs.ide.trim() }, { onConflict:"member_id,tanggal,akun" }).select().single());
      let keIde = false;
      if (rs.ide.trim().length >= 3 && rs.keBank) {
        await simpanIdeDariSumber("riset", baris.id, rs.ide.trim().slice(0, 200), "Dari riset kompetitor " + rs.akun + " (" + komp.join(", ") + "). Temuan: " + rs.temuan.trim());
        keIde = true;
      }
      hapusDraf("riset-" + t);
      toast(keIde ? "Riset tersimpan, idenya masuk Bank Ide 💡" : "Riset tersimpan di Bank Riset");
      route();
    } catch (e) { rs.err = "Gagal menyimpan: " + e.message; btn.disabled = false; draw(); }
  }
  function form() {
    const btn = el("button", { type:"button", class:"btn sm" }, "Simpan riset");
    btn.onclick = () => simpan(btn);
    const pilihanAkun = akunku.length ? akunku : DAFTAR_AKUN;
    return el("div", { class:"subform" },
      akunku.length === 1 ? el("p", { class:"hint" }, "Riset untuk aplikasi ", el("b", akunku[0]))
        : el("div", { class:"lbl" }, "Riset untuk aplikasi kita yang mana? *", pilihan(pilihanAkun, { get: () => rs.akun, set: v => { rs.akun = v; isiDari(punyaHariIni()); draw(); } })),
      el("label", { class:"lbl" }, "Kompetitor yang dicek (1–" + MAKS_KOMPETITOR + ", pisahkan dengan koma) *", input(rs, "kompetitor", { placeholder:"Contoh: Alfaiz, Sobat CPNS", draf:"riset-" + t })),
      el("div", { class:"lbl" }, "Platform", pilihan(PLATFORM, { get: () => rs.platform, multi:true })),
      el("label", { class:"lbl" }, "Temuan singkat *", input(rs, "temuan", { multiline:true, rows:"3", placeholder:"1–3 kalimat: apa yang mereka lakukan dan kenapa menarik?", draf:"riset-" + t })),
      el("label", { class:"lbl" }, "Ide untuk kita (opsional)", input(rs, "ide", { multiline:true, rows:"2", placeholder:"Apa yang bisa kita tiru, adaptasi, atau hindari?", draf:"riset-" + t })),
      el("label", { class:"row", style:"font-size:.88rem;font-weight:600" },
        el("input", { type:"checkbox", style:"width:18px;height:18px;accent-color:var(--ink)", ...(rs.keBank ? { checked:true } : {}), onchange: e => { rs.keBank = e.target.checked; } }),
        "Kirim ide ini ke Bank Ide supaya bisa didukung tim"),
      el("div", { class:"row" }, btn, el("button", { type:"button", class:"btn ghost sm", onclick: () => { buka = false; rs.err = ""; draw(); } }, "Tutup")),
      rs.err ? el("p", { class:"err" }, rs.err) : null);
  }
  function draw() {
    const n = risetMinggu.length, pct = Math.min(100, Math.round(n / TARGET_RISET_MINGGUAN * 100));
    sec.replaceChildren(
      el("div", { class:"row between" },
        el("div", el("h2", "🕵️ Riset kompetitor minggu ini"), el("p", { class:"hint" }, "Target " + TARGET_RISET_MINGGUAN + "× seminggu, cukup 1–" + MAKS_KOMPETITOR + " kompetitor per riset. Lebih baik sedikit tapi dalam.")),
        el("b", n + "/" + TARGET_RISET_MINGGUAN)),
      el("div", { class:"progress" }, el("i", { style:"width:" + pct + "%" })),
      risetMinggu.length ? el("div", { class:"stack", style:"gap:6px" }, risetMinggu.map(r => el("div", { class:"row", style:"gap:6px" },
        el("span", { class:"hint", style:"min-width:70px" }, fmt(r.tanggal, { weekday:"short", day:"numeric", month:"short" })),
        r.akun ? el("span", { class:"chip appr" }, r.akun) : null,
        r.kompetitor.map(k => el("span", { class:"chip brand" }, k))))) : null,
      buka ? form() : el("div", el("button", { class:"btn sm" + (n >= TARGET_RISET_MINGGUAN ? " ghost" : ""), onclick: () => { buka = true; draw(); } },
        punyaHariIni() ? "Ubah riset hari ini" : (n >= TARGET_RISET_MINGGUAN ? "+ Tambah riset (bonus)" : "+ Tambah riset hari ini"))));
  }
  draw();
  return sec;
}


/* ================= LAPORAN HARIAN (untuk disalin ke laporan magang / instansi) ================= */
// Menyusun teks Uraian aktivitas, Pembelajaran, dan Kendala dari data Spill di tanggal tertentu.
// Teks bisa diedit dulu sebelum disalin; ditandai kalau masih di bawah 100 karakter.
const MIN_KARAKTER_LAPORAN = 100;
const labelRingkas = s => s.replace(/\s*\([^)]*\)/g, "").trim();
const kalimat = s => { s = (s || "").trim(); return s ? s.charAt(0).toUpperCase() + s.slice(1) : s; };
// Huruf pertama dikecilkan hanya kalau itu kata biasa (bukan singkatan atau nama seperti TIU, Alfaiz)
const kecilAwal = s => { s = (s || "").trim(); return /^[A-Z][a-z]/.test(s) && !/^(Alfaiz|Sobat|Viracun|Ruangguru|Pahamify|Zenius|Instagram|TikTok|YouTube|Threads|Facebook)/.test(s) ? s.charAt(0).toLowerCase() + s.slice(1) : s; };
const daftarKalimat = xs => xs.length <= 1 ? (xs[0] || "") : xs.length === 2 ? xs[0] + " dan " + xs[1] : xs.slice(0, -1).join(", ") + ", dan " + xs[xs.length - 1];
async function salinTeks(teks) {
  try { await navigator.clipboard.writeText(teks); return true; }
  catch (e) {
    const ta = el("textarea", { style:"position:fixed;opacity:0" }); ta.value = teks; document.body.append(ta); ta.select();
    let ok = false; try { ok = document.execCommand("copy"); } catch (_) {} ta.remove(); return ok;
  }
}
async function susunLaporan(me, k) {
  const sehari = { awal: parseKey(k).toISOString(), akhir: parseKey(addDays(k, 1)).toISOString() };
  const [ci, dc, riset, eks, tugas] = await Promise.all([
    q(sb.from("checkins").select("*").eq("member_id", me.id).eq("tanggal", k).maybeSingle()),
    q(sb.from("daily_checklists").select("*").eq("member_id", me.id).eq("tanggal", k).maybeSingle()),
    q(sb.from("riset_kompetitor").select("*").eq("member_id", me.id).eq("tanggal", k)),
    q(sb.from("experiments").select("*").eq("member_id", me.id).gte("updated_at", sehari.awal).lt("updated_at", sehari.akhir)),
    me.peran === "kerja" ? q(sb.from("tasks").select("*").eq("member_id", me.id)) : []]);
  const items = itemsFor(me, k);
  const selesai = items.filter(i => dc?.items?.[i.id]?.status === "selesai").map(i => kecilAwal(labelRingkas(i.label)));
  const tambahan = (dc?.tambahan || []).filter(x => x.selesai).map(x => kecilAwal(x.judul));
  const tugasSelesai = tugas.filter(x => x.status === "sudah" && x.selesai_at && keyOf(new Date(x.selesai_at)) === k).map(x => kecilAwal(x.judul));
  const tugasJalan = tugas.filter(x => x.status === "sedang").map(x => kecilAwal(x.judul));

  // ---------- Uraian aktivitas ----------
  const u = [];
  if (ci?.fokus) u.push("Fokus pekerjaan saya hari ini adalah " + kecilAwal(ci.fokus.replace(/\.$/, "")) + (ci.langkah ? ", dimulai dengan " + kecilAwal(ci.langkah.replace(/\.$/, "")) : "") + ".");
  if (selesai.length) u.push("Aktivitas rutin yang saya selesaikan meliputi " + daftarKalimat(selesai) + ".");
  if (tambahan.length) u.push("Selain itu, saya juga mengerjakan " + daftarKalimat(tambahan) + ".");
  if (tugasSelesai.length) u.push("Pekerjaan yang saya selesaikan hari ini: " + daftarKalimat(tugasSelesai) + ".");
  if (tugasJalan.length) u.push("Pekerjaan yang masih saya lanjutkan: " + daftarKalimat(tugasJalan) + ".");
  riset.forEach(r => u.push("Saya melakukan riset kompetitor untuk " + (r.akun || "akun yang saya pegang") + " terhadap " + daftarKalimat(r.kompetitor) + (r.platform.length ? " di " + daftarKalimat(r.platform) : "") + "."));
  eks.forEach(x => u.push(x.status === "selesai" ? "Saya menyelesaikan evaluasi eksperimen konten \"" + x.judul + "\"." : "Saya menyiapkan eksperimen konten \"" + x.judul + "\"" + (x.variabel ? " dengan menguji " + x.variabel.replace(/\.$/, "") : "") + "."));

  // ---------- Pembelajaran ----------
  const p = [];
  if (ci?.pelajaran) p.push(kalimat(titik(ci.pelajaran)));
  riset.forEach(r => p.push("Dari riset kompetitor, saya mempelajari bahwa " + kecilAwal(titik(r.temuan)) + (r.ide ? " Hal ini bisa kami terapkan dengan " + kecilAwal(titik(r.ide)) : "")));
  eks.filter(x => x.status === "selesai" && x.pelajaran).forEach(x => p.push("Dari eksperimen \"" + x.judul + "\", saya belajar bahwa " + kecilAwal(titik(x.pelajaran))));

  // ---------- Kendala ----------
  const kd = [];
  if (ci && ci.hambatan && ci.hambatan !== "Tidak ada hambatan") {
    kd.push("Kendala yang saya alami hari ini adalah " + ci.hambatan.toLowerCase() + ".");
    if (ci.bantuan) kd.push("Untuk mengatasinya, " + kecilAwal(ci.bantuan));
    else kd.push("Saya sudah mengomunikasikan kendala ini kepada leader agar bisa segera ditindaklanjuti.");
  } else if (ci) {
    kd.push("Tidak ada kendala berarti yang saya alami hari ini. Pekerjaan berjalan sesuai rencana dan koordinasi dengan tim berjalan dengan baik.");
  }
  const belum = items.filter(i => !dc?.items?.[i.id]?.status).map(i => kecilAwal(labelRingkas(i.label)));
  if (ci && belum.length && belum.length <= 3) kd.push("Beberapa pekerjaan belum sempat diselesaikan, yaitu " + daftarKalimat(belum) + ", dan akan saya lanjutkan pada hari kerja berikutnya.");

  return { ci, dc, cuti: !!dc?.cuti, uraian: u.join(" "), pembelajaran: p.join(" "), kendala: kd.join(" ") };
}
async function viewLaporan() {
  const me = S.me;
  let k = S.laporanTgl || today();
  if (isWeekend(k)) { while (isWeekend(k)) k = addDays(k, -1); }
  const data = await susunLaporan(me, k);
  const pilihTgl = el("select", { class:"field", style:"max-width:260px", onchange: e => { S.laporanTgl = e.target.value; route(); } },
    Array.from({ length: 14 }, (_, i) => addDays(today(), -i)).filter(x => !isWeekend(x)).map(x => el("option", { value:x, ...(x === k ? { selected:true } : {}) }, (x === today() ? "Hari ini, " : "") + fmt(x))));
  const f = { uraian: data.uraian, pembelajaran: data.pembelajaran, kendala: data.kendala };
  const kolom = (judul, kunci, saran) => {
    const hitung = el("span", { class:"chip" });
    try { const d = localStorage.getItem(kunciDraf("laporan-" + k + ":" + kunci)); if (d) f[kunci] = d; } catch (e) {}
    const ta = input(f, kunci, { multiline:true, rows:"6", draf:"laporan-" + k });
    const perbarui = () => { const n = (f[kunci] || "").trim().length; hitung.textContent = n + " karakter"; hitung.className = "chip " + (n >= MIN_KARAKTER_LAPORAN ? "calm" : "attn"); };
    ta.addEventListener("input", perbarui); perbarui();
    return el("section", { class:"panel pad stack", style:"gap:10px" },
      el("div", { class:"row between" }, el("h2", judul), hitung),
      ta,
      (f[kunci] || "").trim().length < MIN_KARAKTER_LAPORAN ? el("p", { class:"hint" }, saran) : null,
      el("div", el("button", { class:"btn", onclick: async () => {
        const teks = (f[kunci] || "").trim();
        if (!teks) return toast("Kolom ini masih kosong.");
        toast(await salinTeks(teks) ? judul + " tersalin ✅" + (teks.length < MIN_KARAKTER_LAPORAN ? " (masih kurang dari 100 karakter)" : "") : "Gagal menyalin, salin manual dari kotak di atas.");
      } }, "📋 Salin " + judul.toLowerCase())));
  };
  return el("div", { class:"stack" },
    el("div", { class:"page-head" },
      el("div", el("h1", "Laporan harian"), el("p", { class:"hint" }, "Disusun otomatis dari check-in, checklist, tugas, riset, dan eksperimen. Edit kalau perlu, lalu salin ke laporan magang/instansi.")),
      pilihTgl),
    data.cuti ? el("div", { class:"note warn" }, "Di tanggal ini kamu tercatat cuti/izin. Pilih status kehadiran yang sesuai di laporanmu.") :
      !data.ci ? el("div", { class:"note bad" }, "Kamu belum check-in di tanggal ini, jadi laporannya masih tipis. Isi check-in dan checklist dulu supaya teksnya lengkap.") :
      el("div", { class:"note" }, "Kehadiran: Hadir. Teks di bawah bisa langsung diedit. Hasil editanmu tersimpan di perangkat ini sampai kamu ganti tanggal."),
    kolom("Uraian aktivitas", "uraian", "Tambahkan detail, misalnya judul konten yang dibuat, jumlah konten, atau akun yang dikerjakan."),
    kolom("Pembelajaran yang diperoleh", "pembelajaran", "Isi bagian “Satu pelajaran dari hari kemarin?” di check-in supaya bagian ini otomatis lebih lengkap, atau tambahkan langsung di sini."),
    kolom("Kendala yang dialami", "kendala", "Ceritakan kendala kecil sekalipun, misalnya menunggu aset, revisi, atau koneksi."),
    el("div", { class:"row" }, el("button", { class:"btn ghost", onclick: () => { hapusDraf("laporan-" + k); toast("Disusun ulang dari data terbaru"); route(); } }, "↻ Susun ulang dari data"), el("button", { class:"btn ghost", onclick: async () => {
      const semua = "Uraian aktivitas:\n" + f.uraian.trim() + "\n\nPembelajaran yang diperoleh:\n" + f.pembelajaran.trim() + "\n\nKendala yang dialami:\n" + f.kendala.trim();
      toast(await salinTeks(semua) ? "Ketiganya tersalin ✅" : "Gagal menyalin.");
    } }, "Salin ketiganya sekaligus")));
}


/* ================= HOOK GENERATOR ================= */
// Rumus hook disimpan sebagai data di /data/rumus-hook.json (bisa ditambah tanpa mengubah kode).
// Placeholder: {k} topik, {m} masalah, {a} sebutan audiens akun, {h} tujuan audiens akun.
const PROFIL_AKUN = {
  CEREBRUM:{ aud:"pejuang tes", hasil:"lolos tes impianmu" }, JADIASN:{ aud:"pejuang CPNS", hasil:"lolos SKD" },
  JADIBUMN:{ aud:"pelamar BUMN", hasil:"lolos rekrutmen BUMN" }, JADIPCPM:{ aud:"pejuang PCPM BI", hasil:"lolos PCPM" },
  JADIPOLISI:{ aud:"calon polisi", hasil:"lolos seleksi Polri" }, JADIPPPK:{ aud:"pejuang PPPK", hasil:"lolos PPPK" },
  JADISEKDIN:{ aud:"pejuang sekolah kedinasan", hasil:"lolos sekolah kedinasan" }, JADIPRAJURIT:{ aud:"calon prajurit TNI", hasil:"lolos seleksi TNI" },
  "PSIKOTES KERJA":{ aud:"pencari kerja", hasil:"lolos psikotes kerja" }, JADIBEASISWA:{ aud:"pejuang beasiswa", hasil:"lolos beasiswa" },
  JADIPPG:{ aud:"calon peserta PPG", hasil:"lolos PPG" }, JADIOJK:{ aud:"pejuang OJK", hasil:"lolos rekrutmen OJK" },
  "TOEFL ACADEMY":{ aud:"pejuang TOEFL", hasil:"dapat skor TOEFL aman" }, JAGOTPA:{ aud:"pejuang TPA", hasil:"skor TPA tinggi" },
};
const WARNA_KATEGORI = ["attn", "brand", "appr", "calm"];
let DATA_HOOK = null;
async function muatDataHook() {
  if (DATA_HOOK) return DATA_HOOK;
  const r = await fetch("/data/rumus-hook.json", { cache:"no-cache" });
  if (!r.ok) throw new Error("Data rumus hook belum tersedia di server.");
  DATA_HOOK = await r.json();
  return DATA_HOOK;
}
function acakDenganBenih(xs, benih) {
  const a = [...xs]; let s = benih || 1;
  for (let i = a.length - 1; i > 0; i--) { s = (s * 9301 + 49297) % 233280; const j = Math.floor(s / 233280 * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}
// Teks layar: baris 1 = kalimat penekan dari rumus, baris 2 = ringkasan hook (maks. 10 kata) supaya relevan dengan topik
function ringkasLayar(hook) {
  let s = hook.replace(/\s*\([^)]*\)\s*/g, " ").trim();
  const akhir = s.search(/[.?!:](\s|$)/);
  if (akhir > 0) s = s.slice(0, akhir + (s[akhir] === "?" ? 1 : 0));
  let kata = s.split(/\s+/);
  if (kata.length > 10 && s.includes(",")) { s = s.split(",")[0]; kata = s.split(/\s+/); }
  if (kata.length > 10) s = kata.slice(0, 10).join(" ") + "…";
  return s.replace(/[.,]$/, "");
}
function rapikan(t) { return t.replace(/\b(\w+)\s+\1\b/gi, "$1"); }
// Ambil kalimat rumus sesuai jenis topik; rumus tanpa varian untuk jenis itu dianggap tidak cocok
function templateUntuk(r, jenis) { return (r.varian && r.varian[jenis]) || (jenis === "materi" ? r.template : null); }
function susunHook(tpl, kunci, masalah, profil, tujuan) {
  let t = tpl.replaceAll("{k}", kunci).replaceAll("{m}", masalah).replaceAll("{a}", profil.aud).replaceAll("{h}", tujuan || profil.hasil);
  t = t.replace(/\b(\w+)\s+\1\b/gi, "$1");   // "soal soal" → "soal"
  return t.charAt(0).toUpperCase() + t.slice(1);
}

/* ---------- Hook Generator: mode "isi rumus" ---------- */
// Pengguna memilih rumus, lalu mengisi bagian kosong [..] sendiri. Hasilnya selalu nyambung karena isinya ditulis manusia.
const CONTOH_SLOT = {
  "x":"latihan soal asal banyak", "y":"masih sering kehabisan waktu", "kebiasaan umum":"ngerjain soal tanpa batas waktu",
  "hasil yang diinginkan":"lolos SKD", "hasil":"lolos SKD", "tren":"belajar 10 jam sehari", "produk viral":"tryout gratisan",
  "kebenaran pahit":"bikin cepat capek dan nggak efektif", "keyakinan umum":"TIU itu soal bakat", "kondisi negatif":"belum siap tes",
  "kondisi positif":"udah paham materi", "ekspektasi":"belajar sambil rebahan", "realita":"latihan terarah tiap hari",
  "kondisi spesifik":"sering kehabisan waktu di TIU", "struggle":"sering kehabisan waktu di TIU", "lakukan x":"ngerjain deret angka cepat",
  "hal yang paling dibenci audiens":"hafalan rumus", "jumlah":"3", "n":"3", "angka":"30", "tools":"trik", "hacks":"trik",
  "pesaing":"saingan tesmu", "orang lain":"saingan tesmu", "hasil spektakuler":"naik 40 poin TIU", "kondisi terbatas":"cuma belajar 30 menit sehari",
  "target audience":"pejuang CPNS", "audiens":"pejuang CPNS", "akibat fatal":"nilai TIU jeblok", "akibat":"nilai jeblok",
  "industri":"bimbel mahal", "orang sukses":"yang udah lolos", "hal spesifik":"trik deret angka", "aktivitas":"latihan soal",
  "kebiasaan":"ngerjain soal sambil main HP", "masalah umum":"skor TIU stagnan", "topik":"deret angka", "hal kecil":"kebiasaan kecil",
  "momen penting":"hari tes", "momen":"hari tes", "kehilangan besar":"gagal SKD", "hal sepele":"salah baca soal",
  "hal yang diyakini benar":"latihan sebanyak-banyaknya", "akibat buruk":"skor stagnan", "hal biasa":"coret-coret di kertas",
  "hasil tak terduga":"hemat waktu 10 menit", "alasan sebenarnya":"belum tahu polanya", "a":"langsung jawab", "b":"coret-coret dulu",
  "kondisi":"masih lemah di TIU", "waktu singkat":"30 detik", "kelemahan":"bagian tersulit", "kekuatan":"bagian tercepat",
  "metode":"latihan 15 menit sehari", "waktu":"seminggu", "kondisi buruk":"paling takut TIU", "orang":"pejuang CPNS",
  "kejadian":"tahu trik ini", "opini":"belajar lama nggak jaminan lolos", "opini berani":"kamu nggak perlu belajar 10 jam sehari",
  "perasaan":"capeknya", "situasi":"udah belajar tapi tetap lupa", "aksi kecil":"latihan 10 menit", "data":"tryout kami",
  "ahli":"tutor", "tutor":"tutor", "jumlah orang":"ribuan member", "x detik":"10",
};
function contohSlot(label) {
  const l = label.toLowerCase().trim();
  if (CONTOH_SLOT[l]) return CONTOH_SLOT[l];
  for (const bagian of l.split("/")) if (CONTOH_SLOT[bagian.trim()]) return CONTOH_SLOT[bagian.trim()];
  const cocok = Object.keys(CONTOH_SLOT).find(k => k.length > 3 && l.includes(k));
  return cocok ? CONTOH_SLOT[cocok] : "isi sesuai topikmu";
}
function slotRumus(rumus) { return [...rumus.matchAll(/\[([^\]]+)\]/g)].map(m => m[1]); }
// Kerangka rumus yang ditulis huruf besar semua dibuat huruf biasa, kecuali kata pertama (misalnya JANGAN)
function rakitRumus(rumus, isian) {
  let i = 0;
  const kerangka = rumus.replace(/\[[^\]]+\]/g, "");
  const kapital = kerangka === kerangka.toUpperCase() && /[A-Z]/.test(kerangka);
  let hasil = rumus.replace(/\[[^\]]+\]/g, () => "\u0000" + (i++) + "\u0000");
  if (kapital) { const kata = hasil.split(" "); hasil = kata[0] + " " + kata.slice(1).join(" ").toLowerCase(); }
  hasil = hasil.replace(/\u0000(\d+)\u0000/g, (_, n) => (isian[n] || "").trim() || "…");
  hasil = hasil.replace(/\s+/g, " ").trim();
  const tanya = /^(gimana|bagaimana|kenapa|apa|mana|pernah|tahu nggak|kamu tim|kamu masih|kamu juga|tebak|siapa|kapan|berapa)\b/i.test(hasil);
  if (!/[.?!…:]$/.test(hasil)) hasil += tanya ? "?" : ".";
  return hasil.charAt(0).toUpperCase() + hasil.slice(1);
}
function modeIsiRumus(data, kategori, jenisTopik, st, me) {
  const box = el("div", { class:"stack" });
  st.isi = st.isi || { rumus:null, nilai:{}, cari:"", kat:null, topik:"", jenis: st.jenis || "materi", platform:null, viral:false };
  const s = st.isi;
  const PLATFORM_REK = [{ v:null, label:"Semua platform" }, { v:"TikTok", label:"TikTok" }, { v:"Reels", label:"Instagram Reels" }, { v:"Shorts", label:"YouTube Shorts" }];
  // Skor rekomendasi: cocok dengan jenis topik (wajib), pola viral, pola terbaik untuk konten edukasi, platform, dan tidak butuh data nyata
  const skorRekomendasi = r => {
    if (!(r.varian && r.varian[s.jenis]) && !(s.jenis === "materi" && r.template)) return -1;
    let n = 1;
    if (r.viral) n += 3;
    if (r.viral && [4, 6].includes(r.viral.no) && ["materi", "tips"].includes(s.jenis)) n += 2;
    if (s.platform && r.viral && (r.viral.kuat_di === "Semua platform" || r.viral.kuat_di.includes(s.platform))) n += 2;
    if (r.butuh_data) n -= 2;
    return n;
  };
  const alasan = r => [r.viral ? "🔥 Pola viral: " + r.viral.pola + " (paling kuat di " + r.viral.kuat_di + ")" : null,
    r.viral && [4, 6].includes(r.viral.no) && ["materi", "tips"].includes(s.jenis) ? "📚 Pola terbaik untuk konten edukasi" : null,
    r.butuh_data ? "⚠️ Butuh data atau kisah nyata" : null].filter(Boolean);
  function daftarRumus() {
    const q2 = s.cari.trim().toLowerCase();
    const xs = data.rumus.filter(r => (!s.kat || r.kategori === s.kat) && (!q2 || (r.rumus + " " + r.nama).toLowerCase().includes(q2)));
    const cariIn = el("input", { class:"field", placeholder:"Cari rumus, misalnya: jangan, rahasia, POV", value: s.cari });
    cariIn.addEventListener("input", () => { s.cari = cariIn.value; daftar.replaceChildren(...isiDaftar()); });
    const daftar = el("div", { class:"rumus-list" });
    function isiDaftar() {
      const ys = data.rumus.filter(r => (!s.viral || r.viral) && (!s.kat || r.kategori === s.kat) && (!s.cari.trim() || (r.rumus + " " + r.nama).toLowerCase().includes(s.cari.trim().toLowerCase())));
      return ys.length ? ys.map(r => el("button", { class:"rumus-item" + (s.rumus === r.id ? " on" : ""), onclick: () => { s.rumus = r.id; s.nilai = {}; draw(); setTimeout(() => box.querySelector(".isi-form")?.scrollIntoView({ behavior:"smooth", block:"start" }), 50); } },
        el("span", { class:"chip " + kategori[r.kategori].warna }, kategori[r.kategori].label),
        el("b", r.rumus),
        r.viral ? el("small", { class:"hint" }, "🔥 Pola viral: " + r.viral.pola) : null,
        r.butuh_data ? el("small", { class:"err" }, "⚠️ Butuh data/kisah nyata") : el("small", { class:"hint" }, r.asal === "tim" ? "Rumus tim" : "Rumus Spill"))) : [el("p", { class:"empty" }, "Rumus tidak ditemukan.")];
    }
    daftar.replaceChildren(...isiDaftar());
    const jt = (data.jenis_topik || []).map(j => ({ v:j.id, label:j.label }));
    // Maksimal 2 rumus per pola supaya rekomendasinya bervariasi
    const perPola = {}, rek = [];
    for (const x of data.rumus.map(r => ({ r, n: skorRekomendasi(r) })).filter(x => x.n > 0).sort((a, b) => b.n - a.n)) {
      const kunci = x.r.viral ? x.r.viral.no : "lain-" + x.r.kategori;
      if ((perPola[kunci] || 0) >= 2) continue;
      perPola[kunci] = (perPola[kunci] || 0) + 1; rek.push(x);
      if (rek.length >= 8) break;
    }
    const panelRek = el("div", { class:"stack", style:"gap:10px" },
      el("div", { class:"lbl" }, "Topik kontenmu jenis apa?", pilihan(jt, { get: () => s.jenis, set: v => s.jenis = v, onChange: draw })),
      el("div", { class:"lbl" }, "Mau diunggah di mana?", pilihan(PLATFORM_REK, { get: () => s.platform, set: v => s.platform = v, onChange: draw })),
      el("b", "⭐ Rekomendasi rumus untuk kamu"),
      el("div", { class:"rumus-list rek" }, rek.map(({ r }) => el("button", { class:"rumus-item" + (s.rumus === r.id ? " on" : ""), onclick: () => { s.rumus = r.id; s.nilai = {}; draw(); setTimeout(() => box.querySelector(".isi-form")?.scrollIntoView({ behavior:"smooth", block:"start" }), 50); } },
        el("span", { class:"chip " + kategori[r.kategori].warna }, kategori[r.kategori].label),
        el("b", r.rumus),
        ...alasan(r).map(t => el("small", { class: t.startsWith("⚠️") ? "err" : "hint" }, t))))),
      el("p", { class:"hint" }, "Rekomendasi berdasarkan pola hook yang paling sering muncul di 500 video viral 2026, disesuaikan dengan jenis topik dan platformmu. Pola viral bukan jaminan viral; uji hook-mu sendiri di Papan eksperimen."));
    return el("section", { class:"panel pad stack", style:"gap:12px" },
      el("h2", "1. Pilih rumus"),
      panelRek,
      el("b", { style:"margin-top:6px" }, "Atau cari dari semua " + data.rumus.length + " rumus"),
      el("div", { class:"row" }, cariIn),
      pilihan([{ v:false, label:"Semua rumus" }, { v:true, label:"🔥 Hanya pola viral" }], { get: () => s.viral, set: v => s.viral = v, onChange: () => daftar.replaceChildren(...isiDaftar()) }),
      pilihan([{ v:null, label:"Semua jenis" }, ...data.kategori.map(k => ({ v:k.id, label:k.label }))], { get: () => s.kat, set: v => s.kat = v, onChange: () => daftar.replaceChildren(...isiDaftar()) }),
      daftar);
  }
  function formIsi() {
    const r = data.rumus.find(x => x.id === s.rumus);
    if (!r) return el("p", { class:"hint" }, "Pilih salah satu rumus di atas untuk mulai mengisi.");
    const slot = slotRumus(r.rumus);
    const k = kategori[r.kategori];
    const profil = PROFIL_AKUN[st.akun] || PROFIL_AKUN.CEREBRUM;
    const hasilBox = el("div");
    function gambarHasil() {
      const teks = rakitRumus(r.rumus, s.nilai);
      const isian = slot.map((_, i) => (s.nilai[i] || "").trim()).filter(Boolean);
      let layar1 = r.teks_layar;
      let layar2 = teks.split(/\s+/).length <= 9 ? teks.replace(/[.]$/, "") : isian.slice(0, 2).join(" • ");
      layar2 = layar2 ? layar2.charAt(0).toUpperCase() + layar2.slice(1) : "";
      const topik = s.topik.trim();
      const jt = jenisTopik.find(x => x.id === st.jenis) || jenisTopik[0];
      const visual = topik ? rapikan((k.visual_tpl || r.visual).replaceAll("{o}", rapikan((jt.objek || "{k}").replaceAll("{k}", topik))).replaceAll("{k}", topik).replaceAll("{a}", profil.aud)) : r.visual;
      const lengkap = slot.every((_, i) => (s.nilai[i] || "").trim());
      const paket = () => "🗣️ Diucapkan:\n" + teks + "\n\n📝 Teks layar:\n" + layar1 + (layar2 ? "\n" + layar2 : "") + "\n\n🎬 Visual 0–3 detik:\n" + visual;
      hasilBox.replaceChildren(el("article", { class:"hook-kartu" },
        el("div", { class:"row", style:"gap:6px" }, el("span", { class:"chip " + k.warna }, k.label), r.viral ? el("span", { class:"chip appr" }, "🔥 " + r.viral.pola) : null, el("span", { class:"chip" }, lengkap ? "Siap dipakai ✅" : "Lengkapi isian dulu")),
        el("small", { class:"hook-label" }, "🗣️ Diucapkan"), el("p", { class:"hook-teks" }, "“" + teks + "”"),
        el("small", { class:"hook-label" }, "📝 Teks layar (detik 0–3)"), el("div", { class:"hook-layar" }, el("b", layar1), layar2 ? el("span", layar2) : null),
        el("small", { class:"hook-label" }, "🎬 Visual pembuka"),
        el("div", { class:"hook-detail" }, el("div", visual), topik ? null : el("div", { class:"hint" }, "Isi topik konten supaya arahan visual lebih spesifik."),
          r.catatan ? el("div", { class:"err", style:"font-size:.84rem" }, "Catatan: " + r.catatan) : null),
        el("div", { class:"row", style:"gap:6px" },
          el("button", { class:"btn sm", disabled: !lengkap, onclick: async () => toast(await salinTeks(paket()) ? "Hook lengkap tersalin 📋" : "Gagal menyalin") }, "📋 Salin lengkap"),
          el("button", { class:"btn ghost sm", disabled: !lengkap, onclick: async () => toast(await salinTeks(teks) ? "Kalimat hook tersalin" : "Gagal menyalin") }, "Salin ucapan"),
          me.peran !== "leader" ? el("button", { class:"btn ghost sm", disabled: !lengkap, onclick: async e2 => {
            e2.target.disabled = true;
            try { await q(sb.from("ide").insert({ member_id: me.id, judul: teks.slice(0, 200), isi: "Hook untuk konten " + st.akun + (topik ? " tentang " + topik : "") + ".\n\n" + paket() + "\n\nRumus " + r.id + ": " + r.rumus, kategori:"Konten", status:"baru" })); toast("Masuk Bank Ide 💡"); }
            catch (er) { toast("Gagal: " + er.message); e2.target.disabled = false; } } }, "💡 Simpan ke Bank Ide") : null)));
    }
    const isianEl = slot.map((label, i) => {
      const n = el("input", { class:"field", placeholder:"Contoh: " + contohSlot(label) });
      n.value = s.nilai[i] || "";
      n.addEventListener("input", () => { s.nilai[i] = n.value; gambarHasil(); });
      const nama = r.id === "H001" ? { X:"hal yang jangan dilakukan", Y:"kondisi penonton" }[label] : null;
      return el("label", { class:"lbl" }, "[" + label + "]" + (nama ? " · " + nama : ""), n);
    });
    const topikIn = el("input", { class:"field", placeholder:"Contoh: soal deret angka TIU" });
    topikIn.value = s.topik;
    topikIn.addEventListener("input", () => { s.topik = topikIn.value; gambarHasil(); });
    gambarHasil();
    return el("section", { class:"panel pad stack isi-form", style:"gap:12px" },
      el("h2", "2. Isi bagian kosongnya"),
      el("div", { class:"note" }, el("b", "Rumus: "), r.rumus),
      el("p", { class:"hint" }, "Contoh dari Spill: " + r.contoh),
      ...isianEl,
      el("label", { class:"lbl" }, el("span", "Topik konten (opsional, untuk arahan visual)"), topikIn),
      el("div", { class:"lbl" }, "Untuk akun", pilihan(DAFTAR_AKUN, { get: () => st.akun, set: v => st.akun = v, onChange: gambarHasil })),
      el("h2", { style:"margin-top:6px" }, "3. Hasilnya"),
      hasilBox);
  }
  function draw() { box.replaceChildren(daftarRumus(), formIsi()); }
  draw();
  return box;
}

async function viewHook() {
  const me = S.me;
  const [data, peg] = await Promise.all([muatDataHook(), q(sb.from("akun_pegangan").select("akun").eq("member_id", me.id)).catch(() => [])]);
  const kategori = Object.fromEntries(data.kategori.map((k, i) => [k.id, { ...k, warna: WARNA_KATEGORI[i % WARNA_KATEGORI.length] }]));
  const st = S.hook || (S.hook = { jenis:"materi", kunci:"", masalah:"", tujuan:"", akun: peg[0]?.akun || "JADIASN", kat:null, benih:1, hasil:false, semua:false });
  const jenisTopik = data.jenis_topik || [{ id:"materi", label:"Soal & materi tes", contoh_k:"soal deret angka TIU", contoh_m:"sering kehabisan waktu" }];
  const edit = {};
  const box = el("div", { class:"stack" });
  const hasilBox = el("div", { class:"stack", style:"gap:14px" });
  function drawHasil() {
    if (!st.hasil) { hasilBox.replaceChildren(); return; }
    const kunci = st.kunci.trim(), masalah = st.masalah.trim().replace(/\.$/, ""), tujuan = st.tujuan.trim().replace(/\.$/, "");
    const profil = PROFIL_AKUN[st.akun] || PROFIL_AKUN.CEREBRUM;
    // Hanya rumus yang punya kalimat untuk jenis topik ini. Tanpa masalah, rumus yang butuh {m} disembunyikan supaya tidak ada kalimat tempelan.
    let daftar = acakDenganBenih(data.rumus, st.benih).map(r => ({ r, tpl: templateUntuk(r, st.jenis) })).filter(x => x.tpl && (masalah || !x.tpl.includes("{m}")));
    daftar = [...daftar.filter(x => !x.r.butuh_data && x.r.viral), ...daftar.filter(x => !x.r.butuh_data && !x.r.viral), ...daftar.filter(x => x.r.butuh_data)];
    if (masalah) daftar = [...daftar.filter(x => x.tpl.includes("{m}")), ...daftar.filter(x => !x.tpl.includes("{m}"))];
    if (st.kat) daftar = daftar.filter(x => x.r.kategori === st.kat);
    const tampil = st.semua ? daftar : daftar.slice(0, 8);
    hasilBox.replaceChildren(
      el("div", { class:"row between" },
        el("h2", "Rekomendasi hook untuk “" + kunci + "”"),
        el("button", { class:"btn ghost sm", onclick: () => { st.benih++; drawHasil(); } }, "🔄 Acak lagi")),
      el("p", { class:"hint" }, daftar.length + " hook cocok untuk jenis topik ini." + (masalah ? "" : " Isi masalah untuk membuka lebih banyak pilihan.")),
      pilihan([{ v:null, label:"Semua jenis hook" }, ...data.kategori.filter(k => daftar.some(x => x.r.kategori === k.id) || st.kat === k.id).map(k => ({ v:k.id, label:k.label }))], { get: () => st.kat, set: v => st.kat = v, onChange: drawHasil }),
      st.kat ? el("p", { class:"hint" }, kategori[st.kat].penjelasan) : null,
      el("div", { class:"hook-grid" }, tampil.map(({ r, tpl }) => {
        const kunciEdit = r.id + st.jenis + st.benih;
        let teks = edit[kunciEdit] ?? susunHook(tpl, kunci, masalah, profil, tujuan);
        const k = kategori[r.kategori];
        const jt = jenisTopik.find(x => x.id === st.jenis) || jenisTopik[0];
        const objek = rapikan((jt.objek || "{k}").replaceAll("{k}", kunci));
        // Baris 2 teks layar: kalimat pendek berisi topik/masalah sesuai jenis hook; kalimat hook dipakai langsung kalau sudah pendek
        const tplLayar = (k.layar_tpl || [])[masalah ? 0 : 1];
        const kataHook = teks.split(/\s+/).length;
        let layar1 = r.teks_layar;
        let layar2 = kataHook <= 9 ? teks.replace(/[.]$/, "") : tplLayar ? rapikan(tplLayar.replaceAll("{K}", kunci.toUpperCase()).replaceAll("{k}", kunci).replaceAll("{m}", masalah).replaceAll("{a}", profil.aud)) : ringkasLayar(teks);
        layar2 = layar2.charAt(0).toUpperCase() + layar2.slice(1);
        const visual = rapikan((k.visual_tpl || r.visual).replaceAll("{o}", objek).replaceAll("{k}", kunci).replaceAll("{a}", profil.aud));
        const tampilTeks = el("p", { class:"hook-teks" }, "“" + teks + "”");
        const kotakEdit = el("textarea", { class:"field", rows:"3", hidden:true });
        kotakEdit.value = teks;
        const layarBox = el("div", { class:"hook-layar" }, el("b", layar1), el("span", layar2));
        const editLayar = el("input", { class:"field", hidden:true });
        editLayar.value = layar2;
        editLayar.addEventListener("input", () => { layar2 = editLayar.value; layarBox.lastChild.textContent = layar2; });
        kotakEdit.addEventListener("input", () => { teks = kotakEdit.value; edit[kunciEdit] = teks; tampilTeks.textContent = "“" + teks + "”"; });
        const tombolEdit = el("button", { class:"btn ghost sm", onclick: () => { const buka = kotakEdit.hidden; kotakEdit.hidden = !buka; editLayar.hidden = !buka; tampilTeks.hidden = buka; tombolEdit.textContent = buka ? "✅ Selesai" : "✏️ Ubah"; if (buka) kotakEdit.focus(); } }, "✏️ Ubah");
        const paket = () => "🗣️ Diucapkan:\n" + teks + "\n\n📝 Teks layar:\n" + layar1 + "\n" + layar2 + "\n\n🎬 Visual 0–3 detik:\n" + visual;
        return el("article", { class:"hook-kartu" },
          el("div", { class:"row", style:"gap:6px" },
            el("span", { class:"chip " + k.warna }, k.label),
            el("span", { class:"chip" }, r.asal === "tim" ? "Rumus tim" : "Rumus Spill"),
            r.viral ? el("span", { class:"chip appr", title:"Paling kuat di " + r.viral.kuat_di }, "🔥 " + r.viral.pola) : null,
            r.butuh_data ? el("span", { class:"chip attn", title: r.catatan }, "⚠️ Butuh data nyata") : null),
          el("small", { class:"hook-label" }, "🗣️ Diucapkan"), tampilTeks, kotakEdit,
          el("small", { class:"hook-label" }, "📝 Teks layar (detik 0–3)"), layarBox, editLayar,
          el("small", { class:"hook-label" }, "🎬 Visual pembuka"),
          el("div", { class:"hook-detail" },
            el("div", visual),
            el("div", el("b", "Cocok untuk: "), r.format),
            r.catatan ? el("div", { class:"err", style:"font-size:.84rem" }, "Catatan: " + r.catatan) : null,
            el("div", { class:"hint" }, r.id + " · Rumus: " + r.rumus)),
          el("div", { class:"row", style:"gap:6px" },
            el("button", { class:"btn sm", onclick: async () => toast(await salinTeks(paket()) ? "Hook lengkap tersalin 📋 (ucapan, teks layar, visual)" : "Gagal menyalin") }, "📋 Salin lengkap"),
            el("button", { class:"btn ghost sm", onclick: async () => toast(await salinTeks(teks) ? "Kalimat hook tersalin" : "Gagal menyalin") }, "Salin ucapan"),
            tombolEdit,
            me.peran !== "leader" ? el("button", { class:"btn ghost sm", onclick: async e2 => {
              e2.target.disabled = true;
              try { await q(sb.from("ide").insert({ member_id: me.id, judul: teks.slice(0, 200), isi: "Hook untuk konten " + st.akun + " tentang " + kunci + (masalah ? " (masalah: " + masalah + ")" : "") + ".\n\n" + paket() + "\n\nRumus " + r.id + ": " + r.rumus, kategori:"Konten", status:"baru" })); toast("Masuk Bank Ide 💡"); }
              catch (er) { toast("Gagal: " + er.message); e2.target.disabled = false; } } }, "💡 Simpan ke Bank Ide") : null));
      })),
      !st.semua && daftar.length > 8 ? el("div", el("button", { class:"btn ghost", onclick: () => { st.semua = true; drawHasil(); } }, "Lihat semua (" + daftar.length + " hook)")) : null,
      el("details", { class:"panel pad" },
        el("summary", { style:"cursor:pointer;font-weight:800" }, "🎬 " + data.hook_visual.length + " ide hook visual (tanpa kata) untuk detik pertama"),
        el("div", { class:"stack", style:"gap:8px;margin-top:12px" }, data.hook_visual.map(v => el("div", el("b", v.nama + ": "), v.cara)))),
      el("div", { class:"note" }, el("b", "Ingat: "), "janji di hook harus dibayar di isi video. Simpan poin terbaik di akhir supaya penonton bertahan sampai habis."));
  }
  const msg = el("p", { class:"hint" });
  const jAwal = jenisTopik.find(x => x.id === st.jenis) || jenisTopik[0];
  const inKunci = input(st, "kunci", { placeholder:"Contoh: " + jAwal.contoh_k, draf:"hook" });
  const inMasalah = input(st, "masalah", { placeholder:"Contoh: " + jAwal.contoh_m, draf:"hook" });
  st.mode = st.mode || "isi";
  const kepala = el("div", el("h1", "Hook Generator"), el("p", { class:"hint", style:"margin-top:6px" }, "Dua cara: isi rumus sendiri (hasil pasti nyambung), atau cari inspirasi dari topik. Ada " + data.rumus.length + " rumus hook."));
  const tukarMode = pilihan([{ v:"isi", label:"✍️ Isi rumus (disarankan)" }, { v:"cari", label:"🔍 Cari inspirasi dari topik" }], { get: () => st.mode, set: v => st.mode = v, onChange: () => route() });
  if (st.mode === "isi") { box.append(kepala, tukarMode, modeIsiRumus(data, kategori, jenisTopik, st, me)); return box; }
  box.append(
    kepala, tukarMode,
    el("div", { class:"note warn" }, "Mode ini menempelkan topikmu ke kalimat rumus secara otomatis, jadi hasilnya kadang perlu dirapikan. Untuk hasil yang pasti nyambung, pakai ✍️ Isi rumus."),
    el("section", { class:"panel pad stack", style:"gap:12px" },
      el("div", { class:"lbl" }, "Jenis topik *", pilihan(jenisTopik.map(j => ({ v:j.id, label:j.label })), { get: () => st.jenis, set: v => { st.jenis = v; st.kat = null; const j = jenisTopik.find(x => x.id === v); inKunci.placeholder = "Contoh: " + j.contoh_k; inMasalah.placeholder = "Contoh: " + j.contoh_m; }, onChange: () => { if (st.hasil) drawHasil(); } })),
      el("label", { class:"lbl" }, "Kata kunci / topik konten *", inKunci),
      el("label", { class:"lbl" }, el("span", "Masalah yang diangkat (opsional)"), el("small", { class:"hint", style:"font-weight:500" }, "Tulis sebagai kegiatan atau perasaan, misalnya: sering kehabisan waktu, gugup, bingung baca pengumuman."), inMasalah),
      el("label", { class:"lbl" }, el("span", "Tujuan audiens (opsional)"), el("small", { class:"hint", style:"font-weight:500" }, "Kosongkan untuk memakai tujuan bawaan akun, misalnya JADIASN: lolos SKD."), input(st, "tujuan", { placeholder:"Contoh: lolos tahap wawancara", draf:"hook" })),
      el("div", { class:"lbl" }, "Untuk akun", pilihan(DAFTAR_AKUN, { get: () => st.akun, set: v => st.akun = v })),
      el("div", { class:"row" }, el("button", { class:"btn", onclick: () => {
        if (st.kunci.trim().length < 3) { msg.className = "err"; msg.textContent = "Isi kata kunci dulu, minimal 3 huruf."; return; }
        msg.textContent = ""; st.hasil = true; st.semua = false; st.benih = Math.floor(Math.random() * 1000) + 1; drawHasil();
        setTimeout(() => hasilBox.scrollIntoView({ behavior:"smooth", block:"start" }), 50);
      } }, "✨ Buat rekomendasi hook")), msg),
    hasilBox);
  drawHasil();
  return box;
}

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
    kartuNotif(),
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
    el("div", el("button", { class:"btn ghost", onclick: keluar }, "Keluar")));
}

/* ================= RINGKASAN TIM (ADMIN) ================= */
async function viewTim() {
  const d = S.timDate || today();
  if (S.me.peran === "leader" && d === today() && !isWeekend(d)) tandaiHarianLeader("baca_ringkasan").catch(() => {});
  const start = addDays(d, -6);
  const dayStart = parseKey(d).toISOString(), dayEnd = parseKey(addDays(d, 1)).toISOString();
  const [cis, dcs, msgs, exps, tasks, cis56] = await Promise.all([
    q(sb.from("checkins").select("*").gte("tanggal", start).lte("tanggal", d)),
    q(sb.from("daily_checklists").select("*").gte("tanggal", addDays(d, -1)).lte("tanggal", d)),
    q(sb.from("messages").select("member_id,author_id,jenis,body,created_at").gte("created_at", dayStart).lt("created_at", dayEnd)),
    q(sb.from("experiments").select("member_id,hasil,judul,updated_at").eq("status", "selesai").gte("updated_at", parseKey(addDays(d, -6)).toISOString()).lt("updated_at", dayEnd)),
    q(sb.from("tasks").select("member_id,judul,status").eq("status", "sedang")),
    q(sb.from("checkins").select("member_id,tanggal,energi").gte("tanggal", addDays(d, -62)).lte("tanggal", d))]);
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
      el("button", { class:"btn ghost sm", onclick: () => { const ada = card.querySelector(".subform"); if (ada) ada.remove(); else card.append(panelCatatan(m)); } }, "📝 Catatan 1:1"),
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
        by("cuti").length ? group("Cuti / izin", "var(--muted)", by("cuti"), "", x => el("div", { style:"padding:4px 0" }, x.m.nama)) : null)),
    trenEnergi(cis56, d));
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
    if (S.me.peran === "leader") tandaiPeriode("M" + today().slice(0, 7), "unduh_csv").catch(() => {});
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

/* ================= CEK VERSI BARU ================= */
// Tab yang dibiarkan terbuka tidak ikut terbarui. Spill membandingkan sidik file app.js di server secara berkala;
// kalau berubah, muncul pemberitahuan untuk memuat ulang supaya kode lama tidak bentrok dengan database baru.
let sidikAwal = null, sudahDiberitahu = false;
async function sidikApp() {
  try {
    const r = await fetch("/app.js", { method:"HEAD", cache:"no-store" });
    return r.headers.get("etag") || r.headers.get("last-modified") || r.headers.get("content-length");
  } catch (e) { return null; }
}
async function cekVersi() {
  if (sudahDiberitahu || document.visibilityState !== "visible") return;
  const s = await sidikApp();
  if (!s) return;
  if (!sidikAwal) { sidikAwal = s; return; }
  if (s !== sidikAwal) {
    sudahDiberitahu = true;
    document.body.append(el("div", { class:"versi-baru", role:"alert" },
      el("span", "✨ Spill punya versi baru. Muat ulang dulu supaya semua fitur jalan normal."),
      el("button", { class:"btn sm", onclick: () => location.reload() }, "Muat ulang")));
  }
}
cekVersi();
setInterval(cekVersi, 5 * 60 * 1000);
document.addEventListener("visibilitychange", () => { if (document.visibilityState === "visible") cekVersi(); });

/* ================= MULAI ================= */
const VIEWS = { hook: viewHook, laporan: viewLaporan, rapor: viewRapor, catatan: viewCatatan, absensi: viewAbsensi, juara: viewJuara, ide: viewIde, modul: viewModul, link: viewTautan, struktur: viewStruktur, lainnya: viewLainnya, hari: viewHari, kerja: viewKerja, eksperimen: viewEksperimen, riset: viewRiset, masukan: viewMasukan, akun: viewAkun, tim: viewTim, rekap: viewRekap, atur: viewAtur };
sb.auth.onAuthStateChange((ev) => { if (ev === "SIGNED_OUT") { S.me = null; } });
boot();
