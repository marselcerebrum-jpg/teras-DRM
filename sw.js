// Service worker Spill: menerima dan menampilkan notifikasi HP.
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", e => e.waitUntil(self.clients.claim()));
self.addEventListener("push", e => {
  let d = {};
  try { d = e.data ? e.data.json() : {}; } catch (_) { d = { title: "Spill", body: e.data ? e.data.text() : "" }; }
  e.waitUntil(self.registration.showNotification(d.title || "Spill", {
    body: d.body || "", icon: "/spill-icon.png", badge: "/spill-badge.png",
    data: { url: d.url || "/" }, tag: d.tag || undefined, renotify: !!d.tag,
  }));
});
self.addEventListener("notificationclick", e => {
  e.notification.close();
  const url = new URL(e.notification.data && e.notification.data.url || "/", self.location.origin).href;
  e.waitUntil((async () => {
    const semua = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
    for (const c of semua) {
      if (c.url.startsWith(self.location.origin)) { await c.focus(); if ("navigate" in c) await c.navigate(url); return; }
    }
    await self.clients.openWindow(url);
  })());
});
