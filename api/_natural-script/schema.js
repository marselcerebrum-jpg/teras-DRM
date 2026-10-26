'use strict';
const outputSchema = {
  type: 'object', additionalProperties: false,
  properties: {
    angle: { type: 'string' },
    hooks: { type: 'array', items: { type: 'object', additionalProperties: false,
      properties: { category: { type: 'string' }, text: { type: 'string' }, reason: { type: 'string' } },
      required: ['category', 'text', 'reason'] } },
    recommended_hook_index: { type: 'integer' },
    script: { type: 'string' },
    ctas: { type: 'array', items: { type: 'string' } },
    visuals: { type: 'array', items: { type: 'string' } },
    estimated_duration_seconds: { type: 'integer' },
    estimated_word_count: { type: 'integer' },
    claim_notes: { type: 'string' }
  },
  required: ['angle','hooks','recommended_hook_index','script','ctas','visuals','estimated_duration_seconds','estimated_word_count','claim_notes']
};

const allowed = {
  purpose: ['promosi','edukasi','engagement','storytelling','followers','awareness'],
  duration: ['15–30 detik','30–60 detik','60–90 detik'],
  format: ['talking-head','voice-over','dialog','otomatis'],
  followup: ['belum','balas-komentar','dm-manual','dm-otomatis'],
  tone: ['santai','informatif','singkat','humor'],
};
function stringOf(body,key,max,defaultValue='') {
  const x = body[key];
  if (x === undefined || x === null) return defaultValue;
  if (typeof x !== 'string' || x.length > max) throw new Error(`Input ${key} tidak valid`);
  return x.trim();
}
function validate(body) {
  if (!body || Array.isArray(body) || typeof body !== 'object') throw new Error('Brief harus berupa objek');
  const topic=stringOf(body,'topic',1500);
  if (topic.length<8) throw new Error('Topik minimal 8 karakter');
  const b={topic};
  for(const [key,max,defaultValue] of [
    ['target',160,'Usia 20–30 tahun'],['productFacts',3500,''],['keyword',60,''],
    ['commentBenefit',350,''],['brand',100,''],['referenceNotes',1500,''],
    ['customCTA',250,''],['hookPreference',350,'']
  ]) b[key]=stringOf(body,key,max,defaultValue);
  for(const [key,values] of Object.entries(allowed)){
    const defaultValue={purpose:'promosi',duration:'60–90 detik',format:'talking-head',followup:'belum',tone:'santai'}[key];
    const v=stringOf(body,key,50,defaultValue);
    if (!values.includes(v)) throw new Error(`Pilihan ${key} tidak valid`);
    b[key]=v;
  }
  b.variant=Number.isInteger(body.variant) && body.variant>=0 && body.variant<20 ? body.variant : 0;
  return b;
}
module.exports = { outputSchema, validate };
