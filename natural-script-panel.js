/* Natural Script AI — komponen vanilla JS khusus Spill; tidak mengubah halaman lama. */
(function () {
  'use strict';
  const h = (tag, className = '', text = '') => {
    const n = document.createElement(tag);
    if (className) n.className = className;
    if (text) n.textContent = String(text);
    return n;
  };
  const options = (items) => items.map(([value,label]) => {
    const n=h('option'); n.value=value; n.textContent=label; return n;
  });
  function field(parent,label,type,items,initial,required=false) {
    const w=h('label','nsai-field');
    const title=h('span','nsai-label',label); w.append(title);
    let input;
    if (type==='textarea') { input=h('textarea','nsai-input'); input.rows=3; }
    else if (type==='select') { input=h('select','nsai-input'); input.append(...options(items||[])); }
    else { input=h('input','nsai-input'); input.type='text'; }
    input.value=initial||''; input.required=required; w.append(input); parent.append(w); return input;
  }
  function paragraph(parent, text, className='') {
    const p=h('p',className,text); parent.append(p); return p;
  }
  function block(parent,title,text) {
    const section=h('section','nsai-result-section');
    section.append(h('h3','nsai-subtitle',title)); paragraph(section,text||'—');
    parent.append(section); return section;
  }
  function copyButton(text,label='Salin') {
    const btn=h('button','nsai-button nsai-secondary',label); btn.type='button';
    btn.addEventListener('click',async()=>{
      try { await navigator.clipboard.writeText(text);btn.textContent='Tersalin';setTimeout(()=>btn.textContent=label,1300); }
      catch { btn.textContent='Tidak bisa menyalin'; }
    });
    return btn;
  }
  // Opsi tambahan dari Spill: brands (daftar akun), defaultBrand (akun yang dipegang), readOnly (mode akun bayangan)
  function mount(host, { supabaseClient, brands = [], defaultBrand = '', readOnly = false } = {}) {
    if (!host || !supabaseClient) throw new Error('Container dan supabaseClient wajib disediakan');
    const wrapper=h('div','nsai stack');
    const heading=h('div'); heading.append(h('h1','','Natural Script AI'));
    paragraph(heading,'Buat skrip TikTok & Reels yang natural, siap direkam, lengkap dengan hook dan CTA komentar.','nsai-muted');
    wrapper.append(heading);
    const form=h('form','nsai-card nsai-form'); form.noValidate=true;
    const topic=field(form,'Topik konten *','textarea',null,'',true);
    const duo=h('div','nsai-grid');form.append(duo);
    const purpose=field(duo,'Tujuan','select', [['promosi','Promosi & conversion'],['edukasi','Edukasi'],['engagement','Engagement'],['storytelling','Storytelling'],['followers','Followers'],['awareness','Awareness']],'promosi');
    const duration=field(duo,'Durasi','select',[['15–30 detik','15–30 detik'],['30–60 detik','30–60 detik'],['60–90 detik','60–90 detik']],'60–90 detik');
    const tone=field(duo,'Gaya bahasa','select',[['santai','Santai seperti ngobrol'],['informatif','Santai informatif'],['singkat','Singkat dan meyakinkan'],['humor','Spontan dan sedikit humor']],'santai');
    const format=field(duo,'Format','select',[['talking-head','Talking head'],['voice-over','Voice over'],['dialog','Dialog'],['otomatis','Otomatis']],'talking-head');
    const brand=field(duo,'Akun / brand','select',[['','Tanpa brand khusus'],...brands.map(b=>[b,b])],brands.includes(defaultBrand)?defaultBrand:'');
    const keyword=field(duo,'Kata kunci CTA','text',null,'PROMO');
    const followup=field(duo,'Tindak lanjut komentar','select',[['belum','Belum disiapkan'],['balas-komentar','Dibalas admin'],['dm-manual','DM manual'],['dm-otomatis','DM otomatis sudah siap']],'belum');
    const benefit=field(form,'Informasi untuk penonton setelah komentar','textarea',null,'Detail paket, fasilitas, dan pendaftaran');
    const facts=field(form,'Fakta produk & informasi wajib (jangan mengarang)','textarea',null,'');
    const hookPreference=field(form,'Hook pilihan / arahan khusus (opsional)','text',null,'');
    const actions=h('div','nsai-actions');
    const submit=h('button','nsai-button nsai-primary','Generate Skrip');submit.type='submit';submit.disabled=readOnly;
    const regenerate=h('button','nsai-button nsai-secondary','Regenerate');regenerate.type='button';regenerate.disabled=true;
    actions.append(submit,regenerate);form.append(actions);
    const status=h('p','nsai-status');status.setAttribute('role','status');status.setAttribute('aria-live','polite');form.append(status);
    if(readOnly){const note=h('p','nsai-note','Mode akun bayangan: hanya lihat. Generate skrip dinonaktifkan supaya tidak memakai kuota anggota.');form.prepend(note);}
    wrapper.append(form);
    const results=h('div','nsai-results');wrapper.append(results);
    host.replaceChildren(wrapper);
    let variant=0;
    function renderResult(r) {
      results.replaceChildren();
      const panel=h('section','nsai-card');results.append(panel);
      panel.append(h('h2','','Hasil Skrip'));
      block(panel,'Angle Konten',r.angle);
      const hookSection=h('section','nsai-result-section');hookSection.append(h('h3','nsai-subtitle','3 Pilihan Hook'));
      (r.hooks||[]).forEach((v,i)=>{
        const item=h('div','nsai-hook');
        item.append(h('div','nsai-small',`${i+1}. ${v.category}${i===r.recommended_hook_index?' — Direkomendasikan':''}`));
        paragraph(item,v.text,'nsai-hook-text');paragraph(item,v.reason,'nsai-muted');
        const pick=h('button','nsai-link','Gunakan hook ini sebagai arahan');pick.type='button';
        pick.addEventListener('click',()=>{hookPreference.value=v.text;hookPreference.focus();window.scrollTo({top:0,behavior:'smooth'});});
        item.append(pick);hookSection.append(item);
      });panel.append(hookSection);
      const sec=h('section','nsai-result-section');sec.append(h('h3','nsai-subtitle','Skrip Final — bisa diedit'));
      const editor=h('textarea','nsai-editor');editor.value=r.script||'';editor.rows=15;sec.append(editor);
      const buttons=h('div','nsai-actions');const copy=h('button','nsai-button nsai-secondary','Salin Skrip');copy.type='button';
      copy.addEventListener('click',()=>navigator.clipboard.writeText(editor.value).then(()=>copy.textContent='Tersalin').catch(()=>copy.textContent='Gagal menyalin'));
      buttons.append(copy);sec.append(buttons);panel.append(sec);
      const cta=h('section','nsai-result-section');cta.append(h('h3','nsai-subtitle','2 Pilihan CTA'));
      (r.ctas||[]).forEach((v,i)=>{const x=h('div','nsai-cta');paragraph(x,v);x.append(copyButton(v,'Salin CTA'));cta.append(x);});panel.append(cta);
      if((r.visuals||[]).length) block(panel,'Arahan Visual',(r.visuals||[]).map((x,i)=>`${i+1}. ${x}`).join('\n'));
      const durationText=`±${r.estimated_duration_seconds||'?'} detik · ${r.estimated_word_count||'?'} kata`;
      block(panel,'Estimasi',durationText);
      if(r.claim_notes) block(panel,'Catatan Verifikasi',r.claim_notes);
    }
    async function generate() {
      const brief={
        topic:topic.value.trim(),purpose:purpose.value,duration:duration.value,tone:tone.value,
        format:format.value,keyword:keyword.value.trim(),followup:followup.value,brand:brand.value,
        commentBenefit:benefit.value.trim(),productFacts:facts.value.trim(),hookPreference:hookPreference.value.trim(),variant
      };
      if(brief.topic.length<8){status.textContent='Topik minimal 8 karakter.';topic.focus();return;}
      status.textContent='Sedang menyusun skrip…';submit.disabled=true;regenerate.disabled=true;
      try {
        const {data:{session},error:authError}=await supabaseClient.auth.getSession();
        if(authError || !session?.access_token) throw new Error('Sesi login sudah habis. Silakan masuk lagi.');
        const response=await fetch('/api/generate-script',{
          method:'POST',headers:{'Content-Type':'application/json',Authorization:`Bearer ${session.access_token}`},
          body:JSON.stringify(brief)
        });
        const data=await response.json().catch(()=>({}));
        if(!response.ok){
          const pesan={401:'Sesi login sudah habis. Muat ulang Spill lalu masuk lagi.',403:'Akunmu belum punya akses ke Natural Script AI.',503:'Natural Script AI belum aktif. Hubungi admin.'};
          throw new Error(data.error||pesan[response.status]||'Gagal membuat skrip');
        }
        renderResult(data.result);
        const sisa=data.sisa&&Number.isInteger(data.sisa.hari)?` Sisa kuota: ${data.sisa.jam} kali jam ini, ${data.sisa.hari} kali hari ini.`:'';
        status.textContent='Skrip berhasil dibuat. Kamu bisa mengedit dan menyalinnya.'+sisa;
      } catch(err) { status.textContent=err.message||'Terjadi kesalahan'; }
      finally { submit.disabled=readOnly;regenerate.disabled=readOnly||!results.childElementCount; }
    }
    form.addEventListener('submit',(e)=>{e.preventDefault();variant=0;generate();});
    regenerate.addEventListener('click',()=>{variant+=1;generate();});
    return wrapper;
  }
  window.NaturalScriptAI={ mount };
})();
