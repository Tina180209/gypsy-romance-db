// ── Config ────────────────────────────────────────────────────────────────
const MOTIFS = [
  { name:'思念與痛苦', ru:'тоска и мука',      color:'#3A6EA5', light:'#EBF2FA' },
  { name:'義務與激情', ru:'долг и страсть',     color:'#9B3E22', light:'#FDF0EC' },
  { name:'女性的沉淪', ru:'падение девушки',    color:'#6B3D8A', light:'#F3EEF8' },
  { name:'背叛',      ru:'измена',             color:'#2E6040', light:'#EAF2EA' },
  { name:'忌妒',      ru:'ревность',            color:'#7A6200', light:'#FFF8E0' },
];
const MOTIF_MAP = {};
MOTIFS.forEach(m => MOTIF_MAP[m.name] = m);

// ── 五大母題最終判斷指標 ───────────────────────────────────────────────────
const MOTIF_CRITERIA = {
  '背叛': {
    ru: 'измена',
    rows: [
      { dim: '敘事視角', text: '常為第一人稱發聲，敘事者皆為被背叛者，直接傾訴被毀滅的痛苦與控訴' },
      { dim: '關鍵詞彙', text: '出現背叛類詞語，如 «погубить»（毀滅）、«измена»（背叛）、«обмануть»（欺騙）等；常伴隨痛苦類（如 «пали руки» 雙手無力）、瘋狂類（如 «с ума схожу» 陷入瘋狂）、愛戀與痛苦交織的詞彙' },
      { dim: '情感表現', text: '多為高昂、控訴、吶喊的直接表達；情感強烈且外放，帶有絕望、毀滅感，甚至出現詛咒、獻祭等極端情緒表現' },
      { dim: '情節發展', text: '以背叛事件為核心，可能涉及信任的破壞、愛人的離去，或對過往相遇的詛咒' },
      { dim: '行動後果', text: '多為仇恨、永不相見、精神崩潰（瘋狂）、身體衰敗（雙手無力）、或對過往的永恆詛咒' },
      { dim: '結局類型', text: '以悲劇結局為主──死亡、永遠分離、瘋狂、幸福永遠被帶走' },
      { dim: '情感強度', text: '強烈──情感當下爆發，以高昂控訴或永恆詛咒的方式呈現，後果具有毀滅性' },
    ]
  },
  '女性的沉淪': {
    ru: 'падение девушки',
    rows: [
      { dim: '敘事視角', text: '以第一人稱（女性視角）發聲，女性親自訴說自己的命運──無論是主動離去（«Я уйду»）或被動承受（«меня продадут»）' },
      { dim: '關鍵詞彙', text: '出現思念類詞語（如 «простимся» 道別）、痛苦類詞語（如 «Сердце ноет» 心中悲痛）、背叛／出賣類詞語（如 «продадут» 他們會出賣我）' },
      { dim: '情感表現', text: '情感表現方式多元──時而隱喻敘事（如 «искры гаснут на лету» 火花在空中熄滅），時而高昂直接吶喊（如 «Отойди, не гляди!»），呈現沉淪命運中的複雜心境' },
      { dim: '情節發展', text: '女性因愛情或社會結構，被迫（或主動選擇）離開正統社會──可能跟隨吉普賽族群流浪，或被出賣、失去自主權' },
      { dim: '行動後果', text: '永遠離去、失去安穩身份、成為流浪者或被物化的對象、因愛而不得而陷入無力（«нету сил ни каких»）' },
      { dim: '結局類型', text: '悲劇結局──永遠分離、永遠離去、被出賣、注定被遺忘' },
      { dim: '情感強度', text: '中度為主，帶有高昂爆發──情感以持續性內斂敘事為基調，但在關鍵時刻以高昂吶喊表達絕望與決絕' },
    ]
  },
  '義務與激情': {
    ru: 'долг и страсть',
    rows: [
      { dim: '敘事視角', text: '常見第一人稱與第三人稱混合──時而由愛戀者本人直接發聲（如 «Милая, ты услышь меня»），時而以第三人稱敘述愛戀者的故事（如 «А цыганская дочь за любимым в ночь»）' },
      { dim: '關鍵詞彙', text: '出現愛戀類詞語（如 «зазнобушка» 心上人）、痛苦類詞語（如 «Много мук я терпел» 承受許多痛苦）、思念類詞語；亦常見瘋狂、暈眩等激情表現（如 «Свели меня с ума» 讓我瘋狂），但未發展為沉淪' },
      { dim: '情感表現', text: '情感表現方式多元──時而高昂吶喊（反覆呼喊 «Милая»、«Так вперёд!»），時而隱喻內斂（如對自然傾訴 «омут речной»），呈現義務與激情之間的擺盪' },
      { dim: '情節發展', text: '以愛戀者對愛人的追尋、等待、祈求為核心，可能涉及跟隨、等待、訴說等行動' },
      { dim: '行動後果', text: '多為持續的祈求與等待、跟隨愛人、或因激情而陷入瘋狂（但未至沉淪）；行動結果多為開放式' },
      { dim: '結局類型', text: '以開放式結局為主──等待愛意回應、繼續前行、望著遠方' },
      { dim: '情感強度', text: '中度，但具波動性──情感在強烈（高昂吶喊、瘋狂）與內斂（隱喻、沉默等待）之間擺盪，呈現義務與激情的雙重面向' },
    ]
  },
  '思念與痛苦': {
    ru: 'тоска и мука',
    rows: [
      { dim: '敘事視角', text: '以第一人稱（痛苦者）為主，情感表現方式較為內斂，多向大自然、物品（如七弦吉他）、自己或聽眾傾訴，而非直接對愛人吶喊' },
      { dim: '關鍵詞彙', text: '同時出現思念類詞語（如 «тоской» 悲傷、«тоскую» 思念、«томления» 渴望）與痛苦類詞語（如 «мучусь» 痛苦、«бередит» 撩動傷痛），兩者緊密交織' },
      { dim: '情感表現', text: '大量使用敘事性表達、沉默、隱喻──透過自然意象（如秋風呻吟）、物品對話（如對吉他說話）、回憶敘述等，將痛苦化為靜態、持續性的情感' },
      { dim: '情節發展', text: '以回憶、訴說、祈求為主，情節推進緩慢，多停留在內心世界的反覆煎熬' },
      { dim: '行動後果', text: '行動結果多為思念、平靜、等待──以靜態方式呈現思念的苦楚，而非激烈的報復或離開' },
      { dim: '結局類型', text: '以悲劇結局（永不相見）或和解結局（接受過去）為主' },
      { dim: '情感強度', text: '中度至內斂──痛苦明確存在，但被隱藏在敘事與隱喻之中，化為一種持續性的思念，而非當下爆發的激烈情感' },
    ]
  },
  '忌妒': {
    ru: 'ревность',
    rows: [
      { dim: '敘事視角', text: '常見多重視角──以第三人稱描述場景與人，但關鍵時刻可能切換到被忌妒者（第三者）的第一人稱發聲，間接呈現忌妒者的處境' },
      { dim: '關鍵詞彙', text: '歌詞中出現忌妒類詞語，如 ревность（忌妒）、ревнивый（愛吃醋的）、зависть（羨慕／眼紅）、ревновать（吃醋）、завидовать（羨慕）等' },
      { dim: '情感表現', text: '呈現不安、佔有慾、猜疑等忌妒相關情緒；常帶有卑微請求與驕傲拒絕的矛盾姿態' },
      { dim: '情節發展', text: '可能涉及第三者，或對愛人與他人互動的猜測與痛苦' },
      { dim: '行動後果', text: '多為被拒絕、對方離開、感情破裂、未獲回應等不理想結局' },
      { dim: '結局類型', text: '以開放式結局或悲劇為主' },
      { dim: '情感強度', text: '中等──忌妒情緒明確存在，但尚未發展為仇恨、報復等極端行動，也未淡化為沉默的接受' },
    ]
  },
};

const SUB_DIMS = [
  { key:'1.1情感關鍵詞',   dim:'維度一 · 關鍵詞彙', label:'1.1 情感關鍵詞' },
  { key:'1.2行動關鍵詞',   dim:'維度一 · 關鍵詞彙', label:'1.2 行動關鍵詞' },
  { key:'1.3意象關鍵詞',   dim:'維度一 · 關鍵詞彙', label:'1.3 意象關鍵詞' },
  { key:'2.1敘事視角',    dim:'維度二 · 敘事結構', label:'2.1 敘事視角' },
  { key:'2.2傾訴對象',    dim:'維度二 · 敘事結構', label:'2.2 傾訴對象' },
  { key:'2.3情節發展',    dim:'維度二 · 敘事結構', label:'2.3 情節發展' },
  { key:'2.4結局類型',    dim:'維度二 · 敘事結構', label:'2.4 結局類型' },
  { key:'3.1情感表現方式', dim:'維度三 · 情感強度', label:'3.1 情感表現方式' },
  { key:'3.2行動後果',    dim:'維度三 · 情感強度', label:'3.2 行動後果' },
  { key:'3.3時間維度',    dim:'維度三 · 情感強度', label:'3.3 時間維度' },
  { key:'3.4情感強度等級', dim:'維度三 · 情感強度', label:'3.4 情感強度等級' },
];
const DIM_GROUPS = ['維度一 · 關鍵詞彙','維度二 · 敘事結構','維度三 · 情感強度'];


// ── State ─────────────────────────────────────────────────────────────────
let currentFilter = 'all';
let currentSearch = '';
let modalTab = 'analysis'; // 'analysis' | 'lyrics' | 'evidence'

// ── Boot ──────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  buildDonut();
  buildBarList();
  renderCards();
  buildMotifCards();
  buildCriteria();
  initFilterBtns();
  initSearch();
  initModal();
  initScrollNav();
});

// ── Donut ─────────────────────────────────────────────────────────────────
function buildDonut() {
  const svg = document.getElementById('donut-svg');
  const cx = 160, cy = 160, R = 130, r = 80;
  let cum = -Math.PI / 2;
  const total = SONGS.length;
  MOTIFS.forEach(m => {
    const n = SONGS.filter(s => s.motif === m.name).length;
    const angle = (n / total) * 2 * Math.PI;
    const x1 = cx + R * Math.cos(cum), y1 = cy + R * Math.sin(cum);
    const x2 = cx + R * Math.cos(cum + angle), y2 = cy + R * Math.sin(cum + angle);
    const ix1 = cx + r * Math.cos(cum + angle), iy1 = cy + r * Math.sin(cum + angle);
    const ix2 = cx + r * Math.cos(cum), iy2 = cy + r * Math.sin(cum);
    const la = angle > Math.PI ? 1 : 0;
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', `M${x1},${y1} A${R},${R} 0 ${la},1 ${x2},${y2} L${ix1},${iy1} A${r},${r} 0 ${la},0 ${ix2},${iy2} Z`);
    path.setAttribute('fill', m.color);
    path.style.cssText = 'cursor:pointer;transition:opacity .2s,transform .2s;transform-origin:160px 160px';
    path.addEventListener('mouseenter', () => {
      svg.querySelectorAll('path').forEach(p => p.style.opacity = '.35');
      path.style.opacity = '1'; path.style.transform = 'scale(1.05)';
      document.getElementById('donut-n').textContent = n;
      document.getElementById('donut-n').style.color = m.color;
      document.getElementById('donut-label').textContent = `首 · ${m.name}`;
    });
    path.addEventListener('mouseleave', () => {
      svg.querySelectorAll('path').forEach(p => { p.style.opacity = '1'; p.style.transform = ''; });
      document.getElementById('donut-n').textContent = total;
      document.getElementById('donut-n').style.color = '';
      document.getElementById('donut-label').textContent = '首 · 總計';
    });
    path.addEventListener('click', () => filterByMotifName(m.name));
    svg.appendChild(path);
    cum += angle;
  });
}

// ── Bar list ──────────────────────────────────────────────────────────────
function buildBarList() {
  const el = document.getElementById('bar-list');
  const total = SONGS.length;
  el.innerHTML = MOTIFS.map(m => {
    const n = SONGS.filter(s => s.motif === m.name).length;
    const pct = (n / total * 100).toFixed(1);
    return `<div class="motif-bar-item" onclick="filterByMotifName('${m.name}')">
      <div class="motif-bar-row">
        <div class="motif-bar-name"><div class="motif-bar-dot" style="background:${m.color}"></div>${m.name}<span class="motif-bar-ru">${m.ru}</span></div>
        <div class="motif-bar-count" style="color:${m.color}">${n}<span>首</span></div>
      </div>
      <div class="bar-track"><div class="bar-fill" style="background:${m.color};width:0%" data-pct="${pct}"></div></div>
      <div class="motif-bar-pct">${pct}%</div>
    </div>`;
  }).join('');
  setTimeout(() => {
    document.querySelectorAll('.bar-fill').forEach(b => { b.style.width = b.dataset.pct + '%'; });
  }, 150);
}

// ── Cards ─────────────────────────────────────────────────────────────────
function renderCards() {
  const grid = document.getElementById('cards-grid');
  const q = currentSearch.toLowerCase();
  const filtered = SONGS.filter(s => {
    const motifOk = currentFilter === 'all' || s.motif === currentFilter;
    const searchOk = !q ||
      s.title_ru.toLowerCase().includes(q) ||
      s.title_zh.includes(q) ||
      s.motif.includes(q) ||
      (s.lyrics || '').toLowerCase().includes(q) ||
      Object.values(s.analysis).some(a => a.指標.includes(q) || a.分類.includes(q)) ||
      Object.values(s.evidence || {}).some(e => e.includes(q));
    return motifOk && searchOk;
  });
  document.getElementById('result-count').textContent =
    filtered.length === SONGS.length ? `顯示全部 ${SONGS.length} 首`
    : `找到 ${filtered.length} / ${SONGS.length} 首`;
  grid.innerHTML = '';
  filtered.forEach(s => {
    const m = MOTIF_MAP[s.motif];
    const intensity = (s.analysis['3.4情感強度等級']?.分類 || '').match(/內斂|中度|強烈/)?.[0] || '';
    const card = document.createElement('div');
    card.className = 'card fade-in';
    card.innerHTML = `
      <div class="card-bar" style="background:${m.color}"></div>
      <div class="card-id">No.${String(s.id).padStart(2,'0')} · ${s.batch===1?'第一批':'第二批'}</div>
      <div class="card-ru">${s.title_ru}</div>
      <div class="card-zh">${s.title_zh}</div>
      <div class="card-bottom">
        <div class="card-motif">
          <div class="card-motif-dot" style="background:${m.color}"></div>
          <span class="card-motif-name">${s.motif}</span>
        </div>
        <span class="card-intensity">${intensity}</span>
      </div>`;
    card.addEventListener('click', () => openModal(s));
    grid.appendChild(card);
  });
}

// ── Filter ────────────────────────────────────────────────────────────────
function initFilterBtns() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      currentFilter = btn.dataset.motif;
      document.querySelectorAll('.filter-btn').forEach(b => {
        b.classList.remove('active'); b.style.background = ''; b.style.color = '';
      });
      btn.classList.add('active');
      if (currentFilter !== 'all') {
        const m = MOTIF_MAP[currentFilter];
        if (m) { btn.style.background = m.color; btn.style.color = '#fff'; }
      }
      renderCards();
      document.getElementById('database').scrollIntoView({ behavior:'smooth', block:'start' });
    });
  });
}
function filterByMotifName(name) {
  const btn = document.querySelector(`.filter-btn[data-motif="${name}"]`);
  if (btn) btn.click();
}
function initSearch() {
  document.getElementById('search-input').addEventListener('input', e => {
    currentSearch = e.target.value; renderCards();
  });
}

// ── Motif cards ───────────────────────────────────────────────────────────
function buildMotifCards() {
  const wrap = document.getElementById('motif-cards');
  wrap.innerHTML = MOTIFS.map(m => {
    const songs = SONGS.filter(s => s.motif === m.name);
    const items = songs.map(s => `
      <div class="motif-song-item" data-id="${s.id}">
        <div><div class="motif-song-ru">${s.title_ru}</div><div class="motif-song-zh">${s.title_zh}</div></div>
        <span class="motif-song-arrow">›</span>
      </div>`).join('');
    return `<div class="motif-card">
      <div class="motif-card-header" style="background:${m.color}">
        <div class="motif-card-count">${songs.length}</div>
        <div class="motif-card-ru">${m.ru}</div>
        <div class="motif-card-name">${m.name}</div>
      </div>
      <div class="motif-card-songs">${items}</div>
    </div>`;
  }).join('');
  wrap.querySelectorAll('.motif-song-item').forEach(item => {
    item.addEventListener('click', () => {
      const song = SONGS.find(s => s.id === +item.dataset.id);
      if (song) openModal(song);
    });
  });
}

// ── Criteria section ─────────────────────────────────────────────────────
function buildCriteria() {
  const wrap = document.getElementById('criteria-wrap');
  if (!wrap) return;

  // Display order matches MOTIFS array
  const order = ['思念與痛苦','義務與激情','女性的沉淪','背叛','忌妒'];

  wrap.innerHTML = order.map(name => {
    const m   = MOTIF_MAP[name];
    const cri = MOTIF_CRITERIA[name];
    const rows = cri.rows.map((r, i) => `
      <tr class="${i%2===1?'tr-alt':''}">
        <td class="cri-dim">${r.dim}</td>
        <td class="cri-text">${r.text}</td>
      </tr>`).join('');

    return `
    <div class="cri-card">
      <div class="cri-header" style="background:${m.color}">
        <span class="cri-header-ru">${cri.ru}</span>
        <span class="cri-header-name">${name}</span>
      </div>
      <div class="cri-table-wrap">
        <table class="cri-table">
          <thead>
            <tr>
              <th class="cri-th-dim">分析維度</th>
              <th class="cri-th-text">判斷指標</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    </div>`;
  }).join('');
}

// ── Indicator table ───────────────────────────────────────────────────────
// ── Modal ─────────────────────────────────────────────────────────────────
function initModal() {
  const overlay = document.getElementById('modal-overlay');
  overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
  document.getElementById('modal-close').addEventListener('click', closeModal);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
}

function openModal(song, tab) {
  modalTab = tab || 'analysis';
  const m = MOTIF_MAP[song.motif];

  document.getElementById('modal-batch').textContent =
    `No.${String(song.id).padStart(2,'0')} · ${song.batch===1?'第一批':'第二批'}`;
  document.getElementById('modal-ru').textContent = song.title_ru;
  document.getElementById('modal-zh').textContent = song.title_zh;
  document.getElementById('modal-motif-chip').innerHTML = `
    <span class="motif-chip" style="background:${m.light};color:${m.color}">
      <span class="motif-chip-dot" style="background:${m.color}"></span>
      ${song.motif} · ${m.ru}
    </span>`;

  // Render tab bar
  const hasLyrics = !!(song.lyrics && song.lyrics.trim());
  document.getElementById('modal-tabs').innerHTML = `
    <button class="modal-tab ${modalTab==='analysis'?'active':''}" data-tab="analysis" onclick="switchTab(this,'${song.id}')">分析結果</button>
    <button class="modal-tab ${modalTab==='evidence'?'active':''}" data-tab="evidence" onclick="switchTab(this,'${song.id}')">文本論證</button>
    <button class="modal-tab ${modalTab==='lyrics'?'active':''}" data-tab="lyrics" onclick="switchTab(this,'${song.id}')"${!hasLyrics?' disabled title="文本未收錄"':''}>歌詞文本${!hasLyrics?' <span class="tab-na">—</span>':''}</button>`;

  renderModalTab(song, modalTab);

  const modal = document.getElementById('modal');
  modal.scrollTop = 0;
  document.getElementById('modal-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
  // store current song id on modal for tab switching
  modal.dataset.songId = song.id;
}

function switchTab(btn, songId) {
  const song = SONGS.find(s => s.id === +songId);
  if (!song) return;
  modalTab = btn.dataset.tab;
  document.querySelectorAll('.modal-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  renderModalTab(song, modalTab);
  document.getElementById('modal').scrollTop = document.getElementById('modal-header').offsetHeight;
}

function renderModalTab(song, tab) {
  const body = document.getElementById('modal-body');
  body.innerHTML = '';

  if (tab === 'analysis') {
    DIM_GROUPS.forEach(dim => {
      const items = SUB_DIMS.filter(d => d.dim === dim);
      const section = document.createElement('div');
      section.className = 'dim-section';
      section.innerHTML = `<div class="dim-label">${dim}</div>`;
      const grid = document.createElement('div');
      grid.className = 'analysis-grid';
      items.forEach(item => {
        const data = song.analysis[item.key] || {};
        const div = document.createElement('div');
        div.className = 'analysis-item';
        const classifyClean = (data.分類||'').replace(/\n/g,'<br>').replace(/▪\s*/g,'· ');
        div.innerHTML = `
          <div class="a-sub">${item.label}</div>
          <div class="a-val">${data.指標||'—'}</div>
          ${classifyClean ? `<div class="a-classify">${classifyClean}</div>` : ''}`;
        grid.appendChild(div);
      });
      section.appendChild(grid);
      body.appendChild(section);
    });
  }

  else if (tab === 'evidence') {
    DIM_GROUPS.forEach(dim => {
      const items = SUB_DIMS.filter(d => d.dim === dim);
      const section = document.createElement('div');
      section.className = 'dim-section';
      section.innerHTML = `<div class="dim-label">${dim}</div>`;
      const list = document.createElement('div');
      list.className = 'evidence-list';
      items.forEach(item => {
        const ev = (song.evidence||{})[item.key] || '';
        const data = song.analysis[item.key] || {};
        const div = document.createElement('div');
        div.className = 'evidence-item';
        div.innerHTML = `
          <div class="ev-header">
            <span class="ev-sub">${item.label}</span>
            <span class="ev-val">${data.指標||'—'}</span>
          </div>
          ${ev ? `<div class="ev-body">${ev.replace(/\n/g,'<br>')}</div>` : '<div class="ev-empty">（無論證記錄）</div>'}`;
        list.appendChild(div);
      });
      section.appendChild(list);
      body.appendChild(section);
    });
  }

  else if (tab === 'lyrics') {
    const hasLyrics = !!(song.lyrics && song.lyrics.trim());
    if (!hasLyrics) {
      body.innerHTML = `<div class="lyrics-empty"><div class="lyrics-empty-icon">♪</div><p>本曲目歌詞文本未收錄於研究文件中</p><p style="font-size:12px;margin-top:8px;opacity:.6">（纖細的花楸樹、我愛妳勝過愛大自然 兩首）</p></div>`;
      return;
    }
    // Format lyrics: alternate Cyrillic and Chinese lines
    const lines = song.lyrics.split('\n').filter(l => l.trim());
    let html = '<div class="lyrics-wrap">';
    let i = 0;
    while (i < lines.length) {
      const line = lines[i].trim();
      // Check if next line is Chinese translation
      const nextLine = lines[i+1]?.trim() || '';
      const isCyrillic = /[А-Яа-яёЁ]/.test(line);
      const isZh = /[\u4e00-\u9fff]/.test(line);
      const nextIsZh = /[\u4e00-\u9fff]/.test(nextLine);
      const nextIsCyr = /[А-Яа-яёЁ]/.test(nextLine);

      if (isCyrillic && nextIsZh) {
        html += `<div class="lyric-pair">
          <div class="lyric-ru">${escHtml(line)}</div>
          <div class="lyric-zh">${escHtml(nextLine)}</div>
        </div>`;
        i += 2;
      } else if (isZh || isCyrillic) {
        const cls = isZh ? 'lyric-zh lyric-solo' : 'lyric-ru lyric-solo';
        html += `<div class="lyric-pair"><div class="${cls}">${escHtml(line)}</div></div>`;
        i++;
      } else {
        html += `<div class="lyric-sep"></div>`;
        i++;
      }
    }
    html += '</div>';
    body.innerHTML = html;
  }
}

function escHtml(s) {
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function closeModal() {
  document.getElementById('modal-overlay').classList.remove('open');
  document.body.style.overflow = '';
}

// ── Scroll nav ────────────────────────────────────────────────────────────
function initScrollNav() {
  const sections = ['overview','database','motifs','method','criteria'];
  const links = document.querySelectorAll('.nav-links a');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el && window.scrollY >= el.offsetTop - 80) current = id;
    });
    links.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href').replace('#','') === current);
    });
  }, { passive: true });
}
