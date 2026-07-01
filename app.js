// ============================================================
// KehilaAdmin — Full Application Logic
// ============================================================

// ------------------------------------------------------------
// 1. DataStore — localStorage Persistence Layer
// ------------------------------------------------------------
const DataStore = {
  _get(key) { return JSON.parse(localStorage.getItem('kehila_' + key) || 'null'); },
  _set(key, val) { localStorage.setItem('kehila_' + key, JSON.stringify(val)); },

  getMembers()    { return this._get('members')   || []; },
  saveMembers(m)  { this._set('members', m); },

  getDonations()  { return this._get('donations') || []; },
  saveDonations(d){ this._set('donations', d); },

  getYahrzeits()  { return this._get('yahrzeits') || []; },
  saveYahrzeits(y){ this._set('yahrzeits', y); },

  getMessages()   { return this._get('messages')  || []; },
  saveMessages(m) { this._set('messages', m); },

  getTheme()      { return this._get('theme') || 'light'; },
  saveTheme(t)    { this._set('theme', t); },

  getDismissedNotifications() { return this._get('dismissed_notifications') || []; },
  saveDismissedNotifications(arr) { this._set('dismissed_notifications', arr); },

  getUsers()      { return this._get('users') || []; },
  saveUsers(u)    { this._set('users', u); },

  getTasks()      { return this._get('tasks') || []; },
  saveTasks(t)    { this._set('tasks', t); },

  getLogs()       { return this._get('logs') || []; },
  saveLogs(l)     { this._set('logs', l); },
  addLog(action) {
    const logs = this.getLogs();
    const currentUser = this.getCurrentUser();
    logs.unshift({
      id: generateId(),
      username: currentUser.username,
      action: action,
      timestamp: new Date().toISOString()
    });
    if (logs.length > 100) logs.pop();
    this.saveLogs(logs);
  },

  getCurrentUser() { 
    return this._get('current_user') || { id: 1, name: 'Oscar Admin', username: 'admin', role: 'Administrador', avatar: 'OA', status: 'active' }; 
  },
  setCurrentUser(u) { this._set('current_user', u); },

  getCustomEvents() { return this._get('custom_events') || []; },
  saveCustomEvents(e) { this._set('custom_events', e); },

  isSeeded()      { return this._get('seeded') === true; },
  markSeeded()    { this._set('seeded', true); },

  seedData() {
    const existing = this.getMembers();
    const needsReseed = existing.length > 0 && !existing[0].hasOwnProperty('spouseId');
    if (this.isSeeded() && !needsReseed) return;

    const members = [
      { id: 'm1', name: 'David Cohen',       family: 'Familia Cohen',       email: 'david.cohen@kehila.org',     phone: '+34 612-345-001', status: 'active',   joinDate: '2022-03-15', hasChildren: true, spouseId: 'm2', fatherId: 'm9', motherId: 'm6'  },
      { id: 'm2', name: 'Raquel Levy',       family: 'Familia Levy',        email: 'raquel.levy@kehila.org',     phone: '+34 612-345-002', status: 'active',   joinDate: '2021-09-01', hasChildren: true, spouseId: 'm1'  },
      { id: 'm3', name: 'Moisés Rosenberg',  family: 'Familia Rosenberg',   email: 'moises.r@kehila.org',        phone: '+34 612-345-003', status: 'inactive', joinDate: '2020-01-10', hasChildren: false },
      { id: 'm4', name: 'Rebeca Stern',      family: 'Familia Stern',        email: 'rebeca.stern@kehila.org',    phone: '+34 612-345-004', status: 'active',   joinDate: '2023-06-20', hasChildren: true, fatherId: 'm1', motherId: 'm2'  },
      { id: 'm5', name: 'Aarón Kaplan',      family: 'Familia Kaplan',       email: 'aaron.kaplan@kehila.org',    phone: '+34 612-345-005', status: 'active',   joinDate: '2019-11-05', hasChildren: false },
      { id: 'm6', name: 'Sara Mizrahi',      family: 'Familia Mizrahi',      email: 'sara.mizrahi@kehila.org',    phone: '+34 612-345-006', status: 'active',   joinDate: '2022-08-12', hasChildren: true, spouseId: 'm9'  },
      { id: 'm7', name: 'Daniel Goldstein',  family: 'Familia Goldstein',    email: 'daniel.g@kehila.org',        phone: '+34 612-345-007', status: 'active',   joinDate: '2021-04-03', hasChildren: true, fatherId: 'm1', motherId: 'm2'  },
      { id: 'm8', name: 'Miriam Sch',        family: 'Familia Sch',          email: 'miriam.sch@kehila.org',      phone: '+34 612-345-008', status: 'inactive', joinDate: '2023-01-25', hasChildren: false },
      { id: 'm9', name: 'Jacobo Weiss',      family: 'Familia Weiss',        email: 'jacobo.weiss@kehila.org',    phone: '+34 612-345-009', status: 'active',   joinDate: '2020-07-18', hasChildren: true, spouseId: 'm6'  },
      { id: 'm10', name: 'Esther Benaim',     family: 'Familia Benaim',       email: 'esther.benaim@kehila.org',   phone: '+34 612-345-010', status: 'active',   joinDate: '2024-02-14', hasChildren: false }
    ];
    this.saveMembers(members);

    const donationTypes = ['Donación', 'Cuota Mensual', 'Promesa', 'Kiddush'];
    const donations = [
      { id: generateId(), memberId: members[0].id, memberName: 'David Cohen',       amount: 500,   type: 'Donación',      date: '2026-01-10', notes: 'Donación de Januká'      },
      { id: generateId(), memberId: members[1].id, memberName: 'Raquel Levy',       amount: 150,   type: 'Cuota Mensual', date: '2026-01-15', notes: ''                         },
      { id: generateId(), memberId: members[3].id, memberName: 'Rebeca Stern',      amount: 200,   type: 'Kiddush',       date: '2026-01-22', notes: 'Kiddush en honor de Bat Mitzvá' },
      { id: generateId(), memberId: members[4].id, memberName: 'Aarón Kaplan',      amount: 150,   type: 'Cuota Mensual', date: '2026-02-05', notes: ''                         },
      { id: generateId(), memberId: members[6].id, memberName: 'Daniel Goldstein',  amount: 1000,  type: 'Promesa',       date: '2026-02-14', notes: 'Promesa anual'             },
      { id: generateId(), memberId: members[5].id, memberName: 'Sara Mizrahi',      amount: 150,   type: 'Cuota Mensual', date: '2026-02-20', notes: ''                         },
      { id: generateId(), memberId: members[0].id, memberName: 'David Cohen',       amount: 300,   type: 'Donación',      date: '2026-03-08', notes: 'Purim'                    },
      { id: generateId(), memberId: members[8].id, memberName: 'Jacobo Weiss',      amount: 150,   type: 'Cuota Mensual', date: '2026-03-15', notes: ''                         },
      { id: generateId(), memberId: members[9].id, memberName: 'Esther Benaim',     amount: 250,   type: 'Kiddush',       date: '2026-03-28', notes: 'Kiddush comunitario'       },
      { id: generateId(), memberId: members[1].id, memberName: 'Raquel Levy',       amount: 150,   type: 'Cuota Mensual', date: '2026-04-10', notes: ''                         },
      { id: generateId(), memberId: members[3].id, memberName: 'Rebeca Stern',      amount: 500,   type: 'Promesa',       date: '2026-04-20', notes: 'Promesa Pésaj'             },
      { id: generateId(), memberId: members[6].id, memberName: 'Daniel Goldstein',  amount: 150,   type: 'Cuota Mensual', date: '2026-05-05', notes: ''                         },
      { id: generateId(), memberId: members[5].id, memberName: 'Sara Mizrahi',      amount: 400,   type: 'Donación',      date: '2026-05-18', notes: 'Lag BaOmer'                },
      { id: generateId(), memberId: members[4].id, memberName: 'Aarón Kaplan',      amount: 150,   type: 'Cuota Mensual', date: '2026-06-02', notes: ''                         },
      { id: generateId(), memberId: members[0].id, memberName: 'David Cohen',       amount: 750,   type: 'Donación',      date: '2026-06-15', notes: 'Donación Shavuot'          }
    ];
    this.saveDonations(donations);

    const yahrzeits = [
      { id: generateId(), deceasedName: 'Isaac Cohen',      hebrewName: 'Yitzjak ben Avraham',   relation: 'Padre',  gregorianDate: '2026-07-12', memberId: members[0].id },
      { id: generateId(), deceasedName: 'Sarah Levy',       hebrewName: 'Sarah bat Moshé',       relation: 'Madre',  gregorianDate: '2026-07-05', memberId: members[1].id },
      { id: generateId(), deceasedName: 'Abraham Goldstein', hebrewName: 'Avraham ben Yaakov',    relation: 'Abuelo', gregorianDate: '2026-08-20', memberId: members[6].id },
      { id: generateId(), deceasedName: 'Rivka Weiss',      hebrewName: 'Rivka bat Shmuel',      relation: 'Abuela', gregorianDate: '2026-07-01', memberId: members[8].id },
      { id: generateId(), deceasedName: 'Salomón Benaim',   hebrewName: 'Shlomo ben David',      relation: 'Tío',    gregorianDate: '2026-09-15', memberId: members[9].id }
    ];
    this.saveYahrzeits(yahrzeits);

    const messages = [
      { id: generateId(), recipients: 'Todos los miembros', subject: 'Horarios de Shabat — Junio', body: 'Querida comunidad, les recordamos los horarios de Kabbalat Shabat para el mes de junio. Encendido de velas a las 19:45.', sentAt: '2026-06-01T10:30:00' },
      { id: generateId(), recipients: 'Familias con niños',  subject: 'Campamento de Verano 2026', body: 'Nos complace anunciar el campamento de verano para niños de 6 a 12 años. Inscripciones abiertas hasta el 15 de julio.',    sentAt: '2026-06-10T14:00:00' }
    ];
    this.saveMessages(messages);

    if (!this._get('users')) {
      const users = [
        { id: 1, name: 'Oscar Admin', username: 'admin', role: 'Administrador', email: 'admin@kehila.org', avatar: 'OA', status: 'active' },
        { id: 2, name: 'Rabino Goldstein', username: 'rabino', role: 'Rabino / Educador', email: 'rabino@kehila.org', avatar: 'RG', status: 'active' },
        { id: 3, name: 'Tesorero Levy', username: 'tesorero', role: 'Tesorero', email: 'finanzas@kehila.org', avatar: 'TL', status: 'active' }
      ];
      this.saveUsers(users);
    }

    if (!this._get('tasks')) {
      const tasks = [
        { id: generateId(), title: 'Llamar a David Cohen', description: 'Recordarle la conmemoración del Yahrzeit de su padre Abraham la próxima semana.', assignedTo: 'admin', dueDate: '2026-07-05', status: 'pending', createdAt: new Date().toISOString() },
        { id: generateId(), title: 'Preparar sermón de Shabat', description: 'Tema: Enseñanzas éticas de la Parashá de la semana.', assignedTo: 'rabino', dueDate: '2026-07-03', status: 'pending', createdAt: new Date().toISOString() },
        { id: generateId(), title: 'Conciliar cuentas de Kiddush', description: 'Revisar las transferencias recibidas para el Kiddush patrocinado de la semana pasada.', assignedTo: 'tesorero', dueDate: '2026-07-06', status: 'pending', createdAt: new Date().toISOString() }
      ];
      this.saveTasks(tasks);
    }

    this.markSeeded();
  }
};


// ------------------------------------------------------------
// 2. Hebcal API Integration
// ------------------------------------------------------------
const HebrewCalendar = {
  _cache: null,
  _cacheTime: 0,
  CACHE_TTL: 24 * 60 * 60 * 1000,

  async fetchData() {
    if (this._cache && Date.now() - this._cacheTime < this.CACHE_TTL) return this._cache;
    try {
      const url = 'https://www.hebcal.com/hebcal?v=1&cfg=json&maj=on&min=on&mod=on&nx=on&year=now&month=x&ss=on&mf=on&c=on&geo=city&city=IL-Jerusalem&M=on&s=on&leyning=off';
      const res = await fetch(url);
      const data = await res.json();
      this._cache = data;
      this._cacheTime = Date.now();
      return data;
    } catch (e) {
      console.warn('Hebcal fetch failed:', e);
      return null;
    }
  },

  async getHolidays() {
    const data = await this.fetchData();
    if (!data || !data.items) return [];
    return data.items.filter(i => i.category === 'holiday').map(i => ({
      title:    i.title,
      date:     i.date,
      hebrew:   i.hebrew || '',
      subcat:   i.subcat || '',
      memo:     i.memo   || '',
      yomtov:   i.yomtov || false
    }));
  },

  async getParasha() {
    const data = await this.fetchData();
    if (!data || !data.items) return null;
    const now = new Date();
    const parashot = data.items
      .filter(i => i.category === 'parashat')
      .map(i => ({ title: i.title.replace('Parashat ', ''), date: i.date, hebrew: i.hebrew || '' }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    // Find current or next upcoming parasha
    for (const p of parashot) {
      const pDate = new Date(p.date);
      if (pDate >= new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1)) return p;
    }
    return parashot[parashot.length - 1] || null;
  },

  async getCandleLighting() {
    const data = await this.fetchData();
    if (!data || !data.items) return null;
    const now = new Date();
    const candles = data.items
      .filter(i => i.category === 'candles')
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    for (const c of candles) {
      if (new Date(c.date) >= now) return { title: c.title, date: c.date };
    }
    return candles[candles.length - 1] ? { title: candles[candles.length - 1].title, date: candles[candles.length - 1].date } : null;
  },

  async getHavdalah() {
    const data = await this.fetchData();
    if (!data || !data.items) return null;
    const now = new Date();
    const havdalahs = data.items
      .filter(i => i.category === 'havdalah')
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    for (const h of havdalahs) {
      if (new Date(h.date) >= now) return { title: h.title, date: h.date };
    }
    return havdalahs[havdalahs.length - 1] ? { title: havdalahs[havdalahs.length - 1].title, date: havdalahs[havdalahs.length - 1].date } : null;
  }
};


// ------------------------------------------------------------
// 3. Parashot Kids Data (Spanish) — Loaded from parashot.js
// ------------------------------------------------------------



// ------------------------------------------------------------
// 4. Dark Mode
// ------------------------------------------------------------
function initTheme() {
  const theme = DataStore.getTheme();
  document.documentElement.setAttribute('data-theme', theme);
  updateThemeIcon(theme);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  DataStore.saveTheme(next);
  updateThemeIcon(next);
}

function updateThemeIcon(theme) {
  const btn = document.getElementById('theme-toggle');
  if (btn) btn.innerHTML = theme === 'dark'
    ? '<i class="ph ph-sun"></i>'
    : '<i class="ph ph-moon"></i>';
}


// ------------------------------------------------------------
// 5. Modal System
// ------------------------------------------------------------
function openModal(title, bodyHtml, onSubmit) {
  closeModal();

  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';

  const modal = document.createElement('div');
  modal.className = 'modal';

  modal.innerHTML = `
    <div class="modal-header">
      <h3>${title}</h3>
      <button class="modal-close" aria-label="Cerrar"><i class="ph ph-x"></i></button>
    </div>
    <div class="modal-body">${bodyHtml}</div>
    <div class="modal-footer">
      ${onSubmit ? `
        <button class="btn btn-secondary modal-cancel">Cancelar</button>
        <button class="btn btn-primary modal-submit">Guardar</button>
      ` : `
        <button class="btn btn-primary modal-cancel">Cerrar</button>
      `}
    </div>
  `;

  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  // Force reflow then add visible class for animation
  requestAnimationFrame(() => overlay.classList.add('visible'));

  // Event listeners
  overlay.querySelector('.modal-close').addEventListener('click', closeModal);
  overlay.querySelector('.modal-cancel').addEventListener('click', closeModal);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });
  
  if (onSubmit) {
    overlay.querySelector('.modal-submit').addEventListener('click', () => {
      onSubmit();
    });
  }
}

function closeModal() {
  const overlay = document.querySelector('.modal-overlay');
  if (overlay) {
    overlay.classList.remove('visible');
    setTimeout(() => overlay.remove(), 200);
  }
}

function confirmModal(title, message, onConfirm) {
  const bodyHtml = `
    <div style="text-align:center; padding:8px 0;">
      <div style="width:56px;height:56px;border-radius:50%;background:rgba(239,68,68,0.1);display:flex;align-items:center;justify-content:center;margin:0 auto 16px;">
        <i class="ph ph-warning" style="font-size:28px;color:var(--danger);"></i>
      </div>
      <p style="font-size:15px;color:var(--text-main);line-height:1.5;">${message}</p>
    </div>
  `;
  openModal(title, bodyHtml, () => {
    closeModal();
    onConfirm();
  });
  setTimeout(() => {
    const submitBtn = document.querySelector('.modal-submit');
    if (submitBtn) {
      submitBtn.textContent = 'Confirmar';
      submitBtn.style.background = 'var(--danger)';
      submitBtn.style.borderColor = 'var(--danger)';
    }
  }, 50);
}


// ------------------------------------------------------------
// 6. Toast System
// ------------------------------------------------------------
function showToast(message, type = 'success') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  const icons = { success: 'ph-check-circle', error: 'ph-x-circle', info: 'ph-info' };
  toast.innerHTML = `<i class="ph ${icons[type] || icons.info}"></i> ${message}`;
  container.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => toast.classList.add('show'));

  setTimeout(() => {
    toast.classList.add('fadeout');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}


// ------------------------------------------------------------
// 7. Utilities
// ------------------------------------------------------------
function formatCurrency(n) {
  return '$' + n.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

function formatDate(d) {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
}

function formatDateShort(d) {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
}

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function daysUntil(dateStr) {
  const target = new Date(dateStr);
  const now = new Date();
  target.setHours(0, 0, 0, 0);
  now.setHours(0, 0, 0, 0);
  return Math.ceil((target - now) / (1000 * 60 * 60 * 24));
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str || '';
  return div.innerHTML;
}

function getMonthName(monthIndex) {
  const names = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  return names[monthIndex] || '';
}// ------------------------------------------------------------
// 7b. Notifications Center System
// ------------------------------------------------------------
function initNotifications() {
  const btn = document.getElementById('notifications-btn');
  const badge = document.getElementById('notifications-badge');
  if (!btn || !badge) return;

  const rawNotifications = [];
  const yahrzeits = DataStore.getYahrzeits();
  const members = DataStore.getMembers();
  
  const upcomingYahrzeits = yahrzeits.filter(y => {
    const diff = daysUntil(y.gregorianDate);
    return diff >= 0 && diff <= 7;
  });

  upcomingYahrzeits.forEach(y => {
    const sponsor = members.find(m => m.id === y.memberId);
    const sponsorName = sponsor ? `${sponsor.name} ${sponsor.family}` : 'Miembro';
    rawNotifications.push({
      id: `yahr_${y.id}`,
      type: 'yahrzeit',
      icon: 'ph-candle',
      title: `Yahrzeit de ${escapeHtml(y.deceasedName)}`,
      text: `Aniversario el ${formatDate(y.gregorianDate)} (${escapeHtml(y.relation)} de ${escapeHtml(sponsorName)}).`,
      date: y.gregorianDate
    });
  });

  const today = new Date();
  if (today.getDay() === 5) {
    rawNotifications.push({
      id: 'shabbat_today',
      type: 'info',
      icon: 'ph-flame',
      title: '¡Hoy es Shabat!',
      text: 'Recuerda encender las velas antes del atardecer. ¡Shabat Shalom!',
      date: today.toISOString()
    });
  }

  rawNotifications.push({
    id: 'welcome_note',
    type: 'info',
    icon: 'ph-info',
    title: 'KehiláAdmin v2.2',
    text: 'Se han integrado todas las 54 Parashot de la Torá y el módulo Shorashim de genealogía interactiva.',
    date: new Date().toISOString()
  });

  // Filter out dismissed notifications
  const dismissedIds = DataStore.getDismissedNotifications();
  const notifications = rawNotifications.filter(n => !dismissedIds.includes(n.id));
  window.currentActiveNotifications = notifications;

  const count = notifications.length;
  if (count > 0) {
    badge.textContent = count;
    badge.style.display = 'flex';
  } else {
    badge.style.display = 'none';
  }

  // Clone button to clear previous click event listeners cleanly
  const newBtn = btn.cloneNode(true);
  btn.parentNode.replaceChild(newBtn, btn);

  newBtn.addEventListener('click', () => {
    let html = '';
    if (notifications.length === 0) {
      html = '<p style="color:var(--text-muted); text-align:center; padding:16px;">No tienes notificaciones pendientes.</p>';
    } else {
      html = `
        <div style="display:flex; flex-direction:column; gap:12px; max-height:400px; overflow-y:auto; padding-right:4px;">
          ${notifications.map(n => `
            <div style="display:flex; align-items:center; gap:12px; padding:12px; border:1px solid var(--border-color); border-radius:10px; background:var(--bg-surface);">
              <div style="display:flex; align-items:center; justify-content:center; width:36px; height:36px; border-radius:50%; background:rgba(212,175,55,0.1); color:var(--accent); flex-shrink:0;">
                <i class="ph ${n.icon}" style="font-size:18px;"></i>
              </div>
              <div style="flex:1;">
                <h4 style="font-size:14px; margin:0 0 4px 0; color:var(--text-main); font-weight:600;">${n.title}</h4>
                <p style="font-size:13px; margin:0 0 6px 0; color:var(--text-muted); line-height:1.4;">${n.text}</p>
                <span style="font-size:11px; color:var(--accent); font-weight:500;">${n.type === 'yahrzeit' ? 'Urgente' : 'Informativo'}</span>
              </div>
              <button class="btn-small-icon" style="flex-shrink:0; align-self:center;" title="Borrar" onclick="dismissNotification('${n.id}')">
                <i class="ph ph-trash"></i>
              </button>
            </div>
          `).join('')}
        </div>
        <div style="margin-top:16px; display:flex; justify-content:flex-end;">
          <button class="btn-secondary btn-sm" onclick="clearAllNotifications()" style="display:flex; align-items:center; gap:8px; width:100%; justify-content:center; padding:10px; border-color:var(--border-color);">
            <i class="ph ph-trash"></i> Borrar todas las notificaciones
          </button>
        </div>
      `;
    }

    openModal('Centro de Notificaciones', html, null);
  });
}

// Global notification controllers
window.dismissNotification = function(id) {
  const dismissed = DataStore.getDismissedNotifications();
  if (!dismissed.includes(id)) {
    dismissed.push(id);
    DataStore.saveDismissedNotifications(dismissed);
  }
  closeModal();
  initNotifications();
  showToast('Notificación borrada');
};

window.clearAllNotifications = function() {
  const dismissed = DataStore.getDismissedNotifications();
  const activeIds = (window.currentActiveNotifications || []).map(n => n.id);
  activeIds.forEach(id => {
    if (!dismissed.includes(id)) dismissed.push(id);
  });
  DataStore.saveDismissedNotifications(dismissed);
  closeModal();
  initNotifications();
  showToast('Todas las notificaciones borradas');
};


// ------------------------------------------------------------
// 8. App State & Navigation
// ------------------------------------------------------------
const state = {
  currentView: 'dashboard',
  membersPage: 1,
  membersPerPage: 10,
  calendarMonth: new Date().getMonth(),
  calendarYear: new Date().getFullYear(),
  financeFilter: 'all'
};

const viewContainer = document.getElementById('view-container');

document.addEventListener('DOMContentLoaded', () => {
  DataStore.seedData();
  initTheme();
  initNotifications();
  initGlobalSearch();
  initSidebarToggle();

  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const view = e.currentTarget.getAttribute('data-view');
      if (view && view !== state.currentView) {
        navItems.forEach(nav => nav.classList.remove('active'));
        e.currentTarget.classList.add('active');
        renderView(view);
      }
    });
  });

  const themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) themeBtn.addEventListener('click', toggleTheme);

  const globalNewRecordBtn = document.getElementById('btn-global-new-record');
  if (globalNewRecordBtn) {
    globalNewRecordBtn.addEventListener('click', openGlobalNewRecordModal);
  }

  updateActiveUserProfileDisplay();
  const profileBtn = document.getElementById('current-user-profile');
  if (profileBtn) {
    profileBtn.addEventListener('click', openSwitchUserModal);
  }

  renderView(state.currentView);
});


// ------------------------------------------------------------
// View Renderer
// ------------------------------------------------------------
function renderView(viewName) {
  state.currentView = viewName;
  viewContainer.style.opacity = 0;

  setTimeout(() => {
    const templateId = `view-${viewName}`;
    const template = document.getElementById(templateId);

    if (template) {
      const content = template.content.cloneNode(true);
      viewContainer.innerHTML = '';
      viewContainer.appendChild(content);

      const initializers = {
        dashboard:       initDashboard,
        members:         initMembers,
        finances:        initFinances,
        calendar:        initCalendar,
        yahrzeits:       initYahrzeits,
        communications:  initCommunications,
        kids:            initKids,
        shorashim:       initShorashim,
        admin:           initAdmin
      };

      if (initializers[viewName]) initializers[viewName]();
    } else {
      viewContainer.innerHTML = `
        <div class="view-header">
          <h2 class="view-title">Vista en Desarrollo</h2>
          <p class="view-subtitle">El módulo "${escapeHtml(viewName)}" estará disponible próximamente.</p>
        </div>
      `;
    }

    viewContainer.style.opacity = 1;
  }, 150);
}


// ============================================================
// 9. VIEW INITIALIZERS
// ============================================================

// ------------------------------------------------------------
// 9a. Dashboard
// ------------------------------------------------------------
function initDashboard() {
  const members   = DataStore.getMembers();
  const donations = DataStore.getDonations();
  const yahrzeits = DataStore.getYahrzeits();

  // --- Stat Cards ---
  const activeMembers = members.filter(m => m.status === 'active').length;
  const statFamilies = document.getElementById('stat-families');
  if (statFamilies) statFamilies.textContent = activeMembers;

  // Current month donations
  const now = new Date();
  const currentMonthDonations = donations
    .filter(d => {
      const dd = new Date(d.date);
      return dd.getMonth() === now.getMonth() && dd.getFullYear() === now.getFullYear();
    })
    .reduce((sum, d) => sum + d.amount, 0);
  const statDonations = document.getElementById('stat-donations');
  if (statDonations) statDonations.textContent = formatCurrency(currentMonthDonations);

  // Upcoming yahrzeits (next 7 days)
  const upcomingYahrzeits = yahrzeits.filter(y => {
    const days = daysUntil(y.gregorianDate);
    return days >= 0 && days <= 7;
  });
  const statYahrzeits = document.getElementById('stat-yahrzeits');
  if (statYahrzeits) statYahrzeits.textContent = upcomingYahrzeits.length;

  // Events from Hebcal
  const statEvents = document.getElementById('stat-events');
  HebrewCalendar.fetchData().then(data => {
    if (data && data.items) {
      const thisMonthEvents = data.items.filter(i => {
        if (i.category !== 'holiday') return false;
        const iDate = new Date(i.date);
        return iDate.getMonth() === now.getMonth() && iDate.getFullYear() === now.getFullYear();
      });
      if (statEvents) statEvents.textContent = thisMonthEvents.length;
    } else {
      if (statEvents) statEvents.textContent = '—';
    }
  }).catch(() => {
    if (statEvents) statEvents.textContent = '—';
  });

  // --- Stat Trends (compare current month vs previous month) ---
  const prevMonthDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const prevMonthDonations = donations.filter(d => {
    const dd = new Date(d.date);
    return dd.getMonth() === prevMonthDate.getMonth() && dd.getFullYear() === prevMonthDate.getFullYear();
  }).reduce((sum, d) => sum + d.amount, 0);

  const trendEls = document.querySelectorAll('.stat-trend');
  if (trendEls.length >= 2 && currentMonthDonations > 0) {
    const diff = prevMonthDonations > 0 ? Math.round(((currentMonthDonations - prevMonthDonations) / prevMonthDonations) * 100) : 100;
    const arrow = diff >= 0 ? '↑' : '↓';
    const cls = diff >= 0 ? 'positive' : 'negative';
    trendEls[1].className = `stat-trend ${cls}`;
    trendEls[1].textContent = `${arrow} ${Math.abs(diff)}% vs. ${getMonthName(prevMonthDate.getMonth())}`;
  }
  if (trendEls.length >= 1) {
    const totalCount = members.length;
    trendEls[0].className = 'stat-trend neutral';
    trendEls[0].textContent = `${totalCount} miembros en total`;
  }

  // --- Hebrew Date & Shabat Countdown ---
  HebrewCalendar.fetchData().then(data => {
    if (!data || !data.items) return;
    const hebrewDateItem = data.items.find(i => i.category === 'hebdate' && new Date(i.date).toDateString() === now.toDateString());
    const subtitleEl = document.querySelector('.view-subtitle');
    if (subtitleEl && hebrewDateItem) {
      subtitleEl.innerHTML = `Resumen general de la congregación · <span style="color:var(--accent);font-weight:600;">${escapeHtml(hebrewDateItem.hebrew || hebrewDateItem.title)}</span>`;
    }
  });

  HebrewCalendar.getCandleLighting().then(candles => {
    if (!candles) return;
    const candleTime = new Date(candles.date);
    const diff = candleTime - now;
    if (diff > 0 && diff < 7 * 24 * 60 * 60 * 1000) {
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      let countdownText = days > 0 ? `${days}d ${hours}h ${mins}m` : `${hours}h ${mins}m`;

      const statsGrid = document.querySelector('.stats-grid');
      if (statsGrid) {
        const shabatCard = document.createElement('div');
        shabatCard.className = 'stat-card';
        shabatCard.style.background = 'linear-gradient(135deg, rgba(212,175,55,0.08), rgba(212,175,55,0.02))';
        shabatCard.style.border = '1px solid rgba(212,175,55,0.2)';
        shabatCard.innerHTML = `
          <div class="stat-icon-wrapper" style="background:rgba(212,175,55,0.15);color:var(--accent);"><i class="ph ph-flame"></i></div>
          <div class="stat-info">
            <h3 style="color:var(--accent);">Shabat</h3>
            <p class="stat-value" style="font-size:20px;">${countdownText}</p>
            <span class="stat-trend neutral">Velas: ${candleTime.toLocaleTimeString('es-ES', {hour:'2-digit',minute:'2-digit'})} · ${candleTime.toLocaleDateString('es-ES', {weekday:'short',day:'numeric',month:'short'})}</span>
          </div>
        `;
        const cards = statsGrid.children;
        if (cards.length >= 3) {
          statsGrid.insertBefore(shabatCard, cards[2]);
        } else {
          statsGrid.appendChild(shabatCard);
        }
      }
    }
  });

  // --- Yahrzeit list ---
  const yahrzeitList = document.getElementById('yahrzeit-list');
  if (yahrzeitList) {
    const sorted = [...yahrzeits]
      .map(y => ({ ...y, _days: daysUntil(y.gregorianDate) }))
      .filter(y => y._days >= 0)
      .sort((a, b) => a._days - b._days)
      .slice(0, 5);

    if (sorted.length === 0) {
      yahrzeitList.innerHTML = '<li class="list-item"><div class="item-content"><div class="item-desc">No hay yahrzeits próximos</div></div></li>';
    } else {
      yahrzeitList.innerHTML = sorted.map(y => {
        const badgeType = y._days <= 3 ? 'primary' : y._days <= 7 ? 'warning' : 'neutral';
        const member = members.find(m => m.id === y.memberId);
        const relation = member ? `${y.relation} de ${member.name}` : y.relation;
        return `
          <li class="list-item">
            <div class="item-icon"><i class="ph ph-candle"></i></div>
            <div class="item-content">
              <div class="item-title">${escapeHtml(y.deceasedName)}</div>
              <div class="item-desc">${escapeHtml(relation)}</div>
            </div>
            <div class="item-meta">
              <div style="font-weight:500;font-size:14px;">${formatDate(y.gregorianDate)}</div>
              <span class="badge-tag badge-${badgeType}">${y._days === 0 ? 'Hoy' : `Faltan ${y._days} días`}</span>
            </div>
          </li>`;
      }).join('');
    }
  }

  // --- Services list ---
  const servicesList = document.getElementById('services-list');
  if (servicesList) {
    const staticServices = [
      { title: 'Kabbalat Shabbat', time: 'Viernes, 19:30 hrs', location: 'Santuario Principal', tag: 'Shabbat' },
      { title: 'Shacharit',        time: 'Sábado, 09:00 hrs',  location: 'Santuario Principal', tag: 'Shabbat' },
      { title: 'Clase de Torá',    time: 'Martes, 20:00 hrs',  location: 'Biblioteca',          tag: 'Estudio' }
    ];
    servicesList.innerHTML = staticServices.map(s => `
      <li class="list-item">
        <div class="item-icon"><i class="ph ph-book-open"></i></div>
        <div class="item-content">
          <div class="item-title">${s.title}</div>
          <div class="item-desc"><i class="ph ph-map-pin"></i> ${s.location}</div>
        </div>
        <div class="item-meta">
          <div style="font-weight:500;font-size:14px;margin-bottom:4px;">${s.time}</div>
          <span class="badge-tag badge-primary">${s.tag}</span>
        </div>
      </li>`).join('');
  }

  // --- Tasks and Billing Alerts ---
  const addTaskBtn = document.getElementById('btn-dashboard-add-task');
  if (addTaskBtn) {
    addTaskBtn.addEventListener('click', () => openDashboardAddTaskModal());
  }
  renderDashboardTasks();
  renderBillingAlerts();
}


// ------------------------------------------------------------
// 9b. Members
// ------------------------------------------------------------
function initMembers() {
  state.membersPage = 1;
  renderMembersTable();

  const searchInput = document.getElementById('member-search');
  if (searchInput) {
    searchInput.addEventListener('keyup', () => { state.membersPage = 1; renderMembersTable(); });
  }

  const statusFilter = document.getElementById('member-status-filter');
  if (statusFilter) {
    statusFilter.addEventListener('change', () => { state.membersPage = 1; renderMembersTable(); });
  }

  const addBtn = document.getElementById('btn-add-member');
  if (addBtn) {
    addBtn.addEventListener('click', () => openMemberModal());
  }

  const exportBtn = document.getElementById('btn-export-members');
  if (exportBtn) {
    exportBtn.addEventListener('click', exportMembersToCSV);
  }
}

function getFilteredMembers() {
  let members = DataStore.getMembers();
  const search = (document.getElementById('member-search')?.value || '').toLowerCase();
  const status = document.getElementById('member-status-filter')?.value || 'all';

  if (search) {
    members = members.filter(m =>
      m.name.toLowerCase().includes(search) ||
      m.family.toLowerCase().includes(search) ||
      m.email.toLowerCase().includes(search)
    );
  }
  if (status !== 'all') {
    members = members.filter(m => m.status === status);
  }
  return members;
}

function renderMembersTable() {
  const filtered = getFilteredMembers();
  const totalPages = Math.max(1, Math.ceil(filtered.length / state.membersPerPage));
  if (state.membersPage > totalPages) state.membersPage = totalPages;

  const start = (state.membersPage - 1) * state.membersPerPage;
  const pageMembers = filtered.slice(start, start + state.membersPerPage);

  const tbody = document.getElementById('members-table-body');
  if (tbody) {
    tbody.innerHTML = pageMembers.map(m => {
      const initials = m.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
      const statusDot = m.status === 'active' ? 'active' : 'inactive';
      const statusLabel = m.status === 'active' ? 'Activo' : 'Inactivo';
      return `
        <tr>
          <td>
            <div class="member-cell">
              <div class="member-avatar">${initials}</div>
              <div>
                <div class="member-name">${escapeHtml(m.name)}</div>
                <div class="member-email">${escapeHtml(m.email)}</div>
              </div>
            </div>
          </td>
          <td>${escapeHtml(m.family)}</td>
          <td>${escapeHtml(m.phone)}</td>
          <td>
            <div class="status-indicator">
              <div class="status-dot ${statusDot}"></div>${statusLabel}
            </div>
          </td>
          <td>
            <div class="action-buttons">
              <button class="btn-small-icon" title="Historial de Aportes" onclick="showMemberDonationHistory('${m.id}')"><i class="ph ph-clock-counter-clockwise"></i></button>
              <button class="btn-small-icon" title="Copiar Datos de Contacto" onclick="copyMemberContact('${m.id}')"><i class="ph ph-copy"></i></button>
              <button class="btn-small-icon" title="Editar" onclick="openMemberModal('${m.id}')"><i class="ph ph-pencil-simple"></i></button>
              <button class="btn-small-icon" title="Eliminar" onclick="deleteMember('${m.id}')"><i class="ph ph-trash"></i></button>
            </div>
          </td>
        </tr>`;
    }).join('');
  }

  // Update count
  const countEl = document.getElementById('member-count');
  if (countEl) countEl.textContent = `${filtered.length} miembro${filtered.length !== 1 ? 's' : ''}`;

  // Pagination
  renderMembersPagination(totalPages);
}

function renderMembersPagination(totalPages) {
  const container = document.getElementById('members-pagination');
  if (!container) return;

  if (totalPages <= 1) { container.innerHTML = ''; return; }

  let html = `<button class="btn btn-secondary btn-sm" ${state.membersPage <= 1 ? 'disabled' : ''} onclick="changeMembersPage(${state.membersPage - 1})"><i class="ph ph-caret-left"></i></button>`;
  for (let i = 1; i <= totalPages; i++) {
    html += `<button class="btn ${i === state.membersPage ? 'btn-primary' : 'btn-secondary'} btn-sm" onclick="changeMembersPage(${i})">${i}</button>`;
  }
  html += `<button class="btn btn-secondary btn-sm" ${state.membersPage >= totalPages ? 'disabled' : ''} onclick="changeMembersPage(${state.membersPage + 1})"><i class="ph ph-caret-right"></i></button>`;
  container.innerHTML = html;
}

function changeMembersPage(page) {
  state.membersPage = page;
  renderMembersTable();
}

function openMemberModal(memberId) {
  const members = DataStore.getMembers();
  const existing = memberId ? members.find(m => m.id === memberId) : null;
  const title = existing ? 'Editar Miembro' : 'Nuevo Miembro';

  const otherMembers = members.filter(m => m.id !== memberId);
  const spouseOptions = '<option value="">Ninguno/a</option>' + otherMembers.map(m => `<option value="${m.id}" ${existing?.spouseId === m.id ? 'selected' : ''}>${escapeHtml(m.name)}</option>`).join('');
  const fatherOptions = '<option value="">Ninguno</option>' + otherMembers.map(m => `<option value="${m.id}" ${existing?.fatherId === m.id ? 'selected' : ''}>${escapeHtml(m.name)}</option>`).join('');
  const motherOptions = '<option value="">Ninguna</option>' + otherMembers.map(m => `<option value="${m.id}" ${existing?.motherId === m.id ? 'selected' : ''}>${escapeHtml(m.name)}</option>`).join('');

  const bodyHtml = `
    <div class="form-grid">
      <div class="form-group">
        <label for="modal-member-name">Nombre Completo</label>
        <input type="text" id="modal-member-name" class="form-input" value="${escapeHtml(existing?.name || '')}" placeholder="Nombre y apellido">
      </div>
      <div class="form-group">
        <label for="modal-member-family">Familia</label>
        <input type="text" id="modal-member-family" class="form-input" value="${escapeHtml(existing?.family || '')}" placeholder="Familia Apellido">
      </div>
      <div class="form-group">
        <label for="modal-member-email">Email</label>
        <input type="email" id="modal-member-email" class="form-input" value="${escapeHtml(existing?.email || '')}" placeholder="correo@ejemplo.com">
      </div>
      <div class="form-group">
        <label for="modal-member-phone">Teléfono</label>
        <input type="text" id="modal-member-phone" class="form-input" value="${escapeHtml(existing?.phone || '')}" placeholder="+34 612-345-678">
      </div>
      <div class="form-group">
        <label for="modal-member-spouse">Cónyuge</label>
        <select id="modal-member-spouse" class="form-input">${spouseOptions}</select>
      </div>
      <div class="form-group">
        <label for="modal-member-father">Padre</label>
        <select id="modal-member-father" class="form-input">${fatherOptions}</select>
      </div>
      <div class="form-group">
        <label for="modal-member-mother">Madre</label>
        <select id="modal-member-mother" class="form-input">${motherOptions}</select>
      </div>
      <div class="form-group form-group-full">
        <label class="checkbox-label">
          <input type="checkbox" id="modal-member-children" ${existing?.hasChildren ? 'checked' : ''}>
          Tiene hijos en edad escolar
        </label>
      </div>
      <div class="form-group form-group-full">
        <label for="modal-member-notes">Notas Internas (solo staff)</label>
        <textarea id="modal-member-notes" class="form-input" rows="3" placeholder="Observaciones privadas sobre este miembro..." style="resize:vertical;min-height:60px;">${escapeHtml(existing?.notes || '')}</textarea>
      </div>
    </div>`;

  openModal(title, bodyHtml, () => {
    const name    = document.getElementById('modal-member-name')?.value.trim();
    const family  = document.getElementById('modal-member-family')?.value.trim();
    const email   = document.getElementById('modal-member-email')?.value.trim();
    const phone   = document.getElementById('modal-member-phone')?.value.trim();
    const spouseId = document.getElementById('modal-member-spouse')?.value || '';
    const fatherId = document.getElementById('modal-member-father')?.value || '';
    const motherId = document.getElementById('modal-member-mother')?.value || '';
    const hasChildren = document.getElementById('modal-member-children')?.checked || false;
    const notes = document.getElementById('modal-member-notes')?.value.trim() || '';

    if (!name) { showToast('El nombre es obligatorio', 'error'); return; }

    const all = DataStore.getMembers();
    if (existing) {
      const idx = all.findIndex(m => m.id === existing.id);
      if (idx !== -1) {
        all[idx] = { ...all[idx], name, family, email, phone, hasChildren, spouseId, fatherId, motherId, notes };
        
        // Bidirectional spouse linking helper
        if (spouseId) {
          all.forEach(m => {
            if (m.id === spouseId) m.spouseId = existing.id;
            else if (m.spouseId === existing.id && m.id !== spouseId) m.spouseId = '';
          });
        } else {
          all.forEach(m => {
            if (m.spouseId === existing.id) m.spouseId = '';
          });
        }

        DataStore.saveMembers(all);
        DataStore.addLog(`Actualizó el perfil del miembro ${name}`);
        showToast('Miembro actualizado correctamente');
      }
    } else {
      const newId = generateId();
      
      // Bidirectional spouse linking helper for new member
      if (spouseId) {
        all.forEach(m => {
          if (m.id === spouseId) m.spouseId = newId;
        });
      }

      all.push({
        id: newId, name, family, email, phone, hasChildren, notes,
        spouseId, fatherId, motherId,
        status: 'active', joinDate: new Date().toISOString().split('T')[0]
      });
      DataStore.saveMembers(all);
      DataStore.addLog(`Agregó al nuevo miembro ${name}`);
      showToast('Miembro agregado correctamente');
    }
    closeModal();
    renderMembersTable();
  });
}

function deleteMember(memberId) {
  const toDelete = DataStore.getMembers().find(m => m.id === memberId);
  const nameStr = toDelete ? toDelete.name : memberId;
  confirmModal('Eliminar Miembro', `¿Estás seguro de que deseas eliminar al miembro <strong>${escapeHtml(nameStr)}</strong>? Esta acción no se puede deshacer.`, () => {
    const members = DataStore.getMembers().filter(m => m.id !== memberId);
    DataStore.saveMembers(members);
    DataStore.addLog(`Eliminó al miembro ${nameStr}`);
    showToast('Miembro eliminado', 'info');
    renderMembersTable();
  });
}


// ------------------------------------------------------------
// 9c. Finances
// ------------------------------------------------------------
function initFinances() {
  const donations = DataStore.getDonations();
  const now = new Date();

  // Current month calculations
  const thisMonthDonations = donations.filter(d => {
    const dd = new Date(d.date);
    return dd.getMonth() === now.getMonth() && dd.getFullYear() === now.getFullYear();
  });

  const donationsTotal = thisMonthDonations.filter(d => d.type === 'Donación').reduce((s, d) => s + d.amount, 0);
  const duesTotal      = thisMonthDonations.filter(d => d.type === 'Cuota Mensual').reduce((s, d) => s + d.amount, 0);
  const pledgesTotal   = donations.filter(d => d.type === 'Promesa').reduce((s, d) => s + d.amount, 0);
  const allTotal       = donations.reduce((s, d) => s + d.amount, 0);

  const el = (id, val) => { const e = document.getElementById(id); if (e) e.textContent = val; };
  el('finance-donations-month', formatCurrency(donationsTotal));
  el('finance-dues-month', formatCurrency(duesTotal));
  el('finance-pledges', formatCurrency(pledgesTotal));
  el('finance-balance', formatCurrency(allTotal));

  // --- Annual Summary ---
  const currentYear = now.getFullYear();
  const yearDonations = donations.filter(d => new Date(d.date).getFullYear() === currentYear);
  const yearTotal = yearDonations.reduce((s, d) => s + d.amount, 0);
  const yearByType = {};
  yearDonations.forEach(d => { yearByType[d.type] = (yearByType[d.type] || 0) + d.amount; });
  const allActiveMembers = DataStore.getMembers().filter(m => m.status === 'active');
  const membersPaid = new Set(yearDonations.filter(d => d.type === 'Cuota Mensual').map(d => d.memberId));
  const pctPaid = allActiveMembers.length > 0 ? Math.round((membersPaid.size / allActiveMembers.length) * 100) : 0;

  const yearLabel = document.getElementById('finance-annual-year');
  const yearTotalEl = document.getElementById('finance-annual-total');
  const yearCountEl = document.getElementById('finance-annual-count');
  const breakdownEl = document.getElementById('finance-annual-breakdown');
  if (yearLabel) yearLabel.textContent = currentYear;
  if (yearTotalEl) yearTotalEl.textContent = formatCurrency(yearTotal);
  if (yearCountEl) yearCountEl.textContent = `${pctPaid}% de familias al día con cuotas`;
  if (breakdownEl) {
    const typeColors = { 'Donación': 'var(--accent)', 'Cuota Mensual': 'var(--info)', 'Promesa': '#8B5CF6', 'Kiddush': 'var(--success)' };
    breakdownEl.innerHTML = Object.entries(yearByType).map(([type, amount]) => `
      <div class="annual-type-card">
        <div class="type-label">${escapeHtml(type)}</div>
        <div class="type-amount" style="color:${typeColors[type] || 'var(--text-main)'}">${formatCurrency(amount)}</div>
        <div style="font-size:10px;color:var(--text-muted);margin-top:2px;">${yearDonations.filter(d => d.type === type).length} registros</div>
      </div>
    `).join('');
  }

  // --- Bar chart (last 6 months) ---
  renderFinanceChart(donations);

  // --- Recent transactions ---
  renderTransactionsList(donations);

  // --- Add donation button ---
  const addBtn = document.getElementById('btn-add-donation');
  if (addBtn) addBtn.addEventListener('click', openDonationModal);

  // --- Filter selector ---
  const filterSelect = document.getElementById('finance-type-filter');
  if (filterSelect) {
    filterSelect.value = state.financeFilter || 'all';
    filterSelect.addEventListener('change', (e) => {
      state.financeFilter = e.target.value;
      renderTransactionsList(DataStore.getDonations());
    });
  }

  // --- Export button ---
  const exportBtn = document.getElementById('btn-export-transactions');
  if (exportBtn) {
    exportBtn.addEventListener('click', exportTransactionsToCSV);
  }
}

function renderFinanceChart(donations) {
  const chartEl = document.getElementById('finance-chart');
  if (!chartEl) return;

  const now = new Date();
  const months = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push({ month: d.getMonth(), year: d.getFullYear(), label: getMonthName(d.getMonth()).substring(0, 3) });
  }

  const monthTotals = months.map(m => {
    const total = donations
      .filter(d => {
        const dd = new Date(d.date);
        return dd.getMonth() === m.month && dd.getFullYear() === m.year;
      })
      .reduce((s, d) => s + d.amount, 0);
    return { ...m, total };
  });

  const maxVal = Math.max(...monthTotals.map(m => m.total), 1);

  chartEl.innerHTML = `
    <div class="chart-bars">
      ${monthTotals.map(m => {
        const pct = (m.total / maxVal) * 100;
        return `
          <div class="chart-bar-group">
            <div class="chart-bar-value">${formatCurrency(m.total)}</div>
            <div class="chart-bar-track">
              <div class="chart-bar-fill" style="height:${pct}%"></div>
            </div>
            <div class="chart-bar-label">${m.label}</div>
          </div>`;
      }).join('')}
    </div>`;
}

function renderTransactionsList(donations) {
  const listEl = document.getElementById('transactions-list');
  if (!listEl) return;

  const typeFilter = state.financeFilter || 'all';
  let filtered = donations;
  if (typeFilter !== 'all') {
    filtered = donations.filter(d => d.type === typeFilter);
  }

  const sorted = [...filtered].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 10);

  if (sorted.length === 0) {
    listEl.innerHTML = '<p class="empty-text">No hay transacciones registradas de este tipo.</p>';
    return;
  }

  listEl.innerHTML = sorted.map(d => {
    const typeIcons = { 'Donación': 'ph-gift', 'Cuota Mensual': 'ph-calendar-check', 'Promesa': 'ph-handshake', 'Kiddush': 'ph-wine' };
    const icon = typeIcons[d.type] || 'ph-currency-dollar';
    return `
      <li class="list-item" style="display:flex; align-items:center;">
        <div class="item-icon"><i class="ph ${icon}"></i></div>
        <div class="item-content" style="flex:1;">
          <div class="item-title">${escapeHtml(d.memberName)}</div>
          <div class="item-desc">${escapeHtml(d.type)}${d.notes ? ' — ' + escapeHtml(d.notes) : ''}</div>
        </div>
        <div class="item-meta" style="display:flex; flex-direction:column; align-items:flex-end;">
          <div style="font-weight:600;font-size:14px;color:var(--text-main);">${formatCurrency(d.amount)}</div>
          <div style="font-size:12px;color:var(--text-muted);">${formatDateShort(d.date)}</div>
        </div>
        <button class="btn-small-icon" onclick="copyThankYouTemplate('${d.id}')" title="Copiar Mensaje de Agradecimiento" style="margin-left:12px; cursor:pointer; padding:6px; border:1px solid var(--border-color); border-radius:8px; background:var(--bg-surface);">
          <i class="ph ph-copy"></i>
        </button>
      </li>`;
  }).join('');
}

function openDonationModal() {
  const members = DataStore.getMembers();
  const memberOptions = members.map(m => `<option value="${m.id}">${escapeHtml(m.name)}</option>`).join('');

  const bodyHtml = `
    <div class="form-grid">
      <div class="form-group">
        <label for="modal-don-member">Miembro</label>
        <select id="modal-don-member" class="form-input">${memberOptions}</select>
      </div>
      <div class="form-group">
        <label for="modal-don-amount">Monto ($)</label>
        <input type="number" id="modal-don-amount" class="form-input" min="0" step="0.01" placeholder="0.00">
      </div>
      <div class="form-group">
        <label for="modal-don-type">Tipo</label>
        <select id="modal-don-type" class="form-input">
          <option value="Donación">Donación</option>
          <option value="Cuota Mensual">Cuota Mensual</option>
          <option value="Promesa">Promesa</option>
          <option value="Kiddush">Kiddush</option>
        </select>
      </div>
      <div class="form-group">
        <label for="modal-don-date">Fecha</label>
        <input type="date" id="modal-don-date" class="form-input" value="${new Date().toISOString().split('T')[0]}">
      </div>
      <div class="form-group form-group-full">
        <label for="modal-don-notes">Notas</label>
        <input type="text" id="modal-don-notes" class="form-input" placeholder="Opcional">
      </div>
    </div>`;

  openModal('Nueva Donación', bodyHtml, () => {
    const memberId = document.getElementById('modal-don-member')?.value;
    const amount   = parseFloat(document.getElementById('modal-don-amount')?.value);
    const type     = document.getElementById('modal-don-type')?.value;
    const date     = document.getElementById('modal-don-date')?.value;
    const notes    = document.getElementById('modal-don-notes')?.value.trim();

    if (!memberId || isNaN(amount) || amount <= 0) {
      showToast('Por favor completa los campos obligatorios', 'error');
      return;
    }

    const member = DataStore.getMembers().find(m => m.id === memberId);
    const donations = DataStore.getDonations();
    donations.push({
      id: generateId(),
      memberId,
      memberName: member ? member.name : 'Desconocido',
      amount, type, date, notes
    });
    DataStore.saveDonations(donations);
    DataStore.addLog(`Registró una transacción de ${type} por $${amount} para ${member ? member.name : 'Desconocido'}`);
    closeModal();
    showToast('Donación registrada correctamente');
    initFinances();
  });
}


// ------------------------------------------------------------
// 9d. Calendar
// ------------------------------------------------------------
function initCalendar() {
  renderCalendarGrid();
  loadCalendarData();

  const prevBtn = document.getElementById('cal-prev');
  const nextBtn = document.getElementById('cal-next');
  if (prevBtn) prevBtn.addEventListener('click', () => {
    state.calendarMonth--;
    if (state.calendarMonth < 0) { state.calendarMonth = 11; state.calendarYear--; }
    renderCalendarGrid();
    loadCalendarData();
  });
  if (nextBtn) nextBtn.addEventListener('click', () => {
    state.calendarMonth++;
    if (state.calendarMonth > 11) { state.calendarMonth = 0; state.calendarYear++; }
    renderCalendarGrid();
    loadCalendarData();
  });

  const addEventBtn = document.getElementById('btn-add-calendar-event') || document.getElementById('btn-add-event');
  if (addEventBtn) addEventBtn.addEventListener('click', openCustomEventModal);
}

function renderCalendarGrid() {
  const grid = document.getElementById('calendar-grid');
  const titleEl = document.getElementById('calendar-month-title');
  if (!grid) return;

  const year  = state.calendarYear;
  const month = state.calendarMonth;

  if (titleEl) titleEl.textContent = `${getMonthName(month)} ${year}`;

  const firstDay = new Date(year, month, 1).getDay(); // 0=Sun
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();

  let html = '';

  // Empty cells before first day
  for (let i = 0; i < firstDay; i++) {
    html += '<div class="calendar-day empty"></div>';
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const isToday = d === today.getDate() && month === today.getMonth() && year === today.getFullYear();
    const isShabat = new Date(year, month, d).getDay() === 6;
    const classes = ['calendar-day'];
    if (isToday) classes.push('today');
    if (isShabat) classes.push('shabbat');

    html += `<div class="${classes.join(' ')}" data-date="${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}">
      <span class="day-number">${d}</span>
      <div class="calendar-events"></div>
    </div>`;
  }

  grid.innerHTML = html;
}

async function loadCalendarData() {
  try {
    const data = await HebrewCalendar.fetchData();
    const grid = document.getElementById('calendar-grid');
    if (!grid || !data || !data.items) return;

    const holidays = data.items.filter(i => i.category === 'holiday');
    const parashot = data.items.filter(i => i.category === 'parashat');

    const year = state.calendarYear;
    const month = state.calendarMonth;

    // Clear any previous badges or dots to prevent duplicates on navigation
    grid.querySelectorAll('.holiday-badge, .shabbat-badge, .yahrzeit-badge, .calendar-event-dot').forEach(el => el.remove());

    // 1. Render holidays in the grid cells
    holidays.forEach(h => {
      const dateStr = h.date.split('T')[0];
      const cell = grid.querySelector(`[data-date="${dateStr}"]`);
      if (cell) {
        const eventsContainer = cell.querySelector('.calendar-events');
        if (eventsContainer && !eventsContainer.querySelector('.calendar-event-dot.holiday')) {
          const dot = document.createElement('span');
          dot.className = 'calendar-event-dot holiday';
          dot.title = h.title;
          eventsContainer.appendChild(dot);
        }

        if (!cell.querySelector('.holiday-badge')) {
          const badge = document.createElement('div');
          badge.className = 'holiday-badge';
          badge.textContent = h.title;
          badge.title = h.title;
          cell.appendChild(badge);
        }
      }
    });

    // 2. Render Shabbat parashot in the grid cells (Saturdays)
    parashot.forEach(p => {
      const dateStr = p.date.split('T')[0];
      const cell = grid.querySelector(`[data-date="${dateStr}"]`);
      if (cell) {
        const eventsContainer = cell.querySelector('.calendar-events');
        if (eventsContainer && !eventsContainer.querySelector('.calendar-event-dot.shabbat')) {
          const dot = document.createElement('span');
          dot.className = 'calendar-event-dot shabbat';
          dot.title = `Parashat ${p.title}`;
          eventsContainer.appendChild(dot);
        }

        if (!cell.querySelector('.shabbat-badge')) {
          const badge = document.createElement('div');
          badge.className = 'shabbat-badge';
          badge.textContent = p.title.replace('Parashat ', '');
          badge.title = `Parashat ${p.title}`;
          cell.appendChild(badge);
        }
      }
    });

    // 3. Render Yahrzeits for the community members
    const yahrzeits = DataStore.getYahrzeits();
    yahrzeits.forEach(y => {
      const parts = y.gregorianDate.split('-');
      if (parts.length === 3) {
        const yYear = parseInt(parts[0], 10);
        const yMonth = parseInt(parts[1], 10) - 1; // 0-indexed month
        if (yMonth === month && yYear === year) {
          const cell = grid.querySelector(`[data-date="${y.gregorianDate}"]`);
          if (cell) {
            const badge = document.createElement('div');
            badge.className = 'yahrzeit-badge';
            badge.innerHTML = `<i class="ph ph-candle"></i> ${escapeHtml(y.deceasedName)}`;
            badge.title = `Yahrzeit de ${y.deceasedName} (${y.relation})`;
            cell.appendChild(badge);
          }
        }
      }
    });

    // 3b. Render custom community events
    const customEvents = DataStore.getCustomEvents();
    customEvents.forEach(ev => {
      const parts = ev.date.split('-');
      if (parts.length === 3) {
        const evMonth = parseInt(parts[1], 10) - 1;
        const evYear = parseInt(parts[0], 10);
        if (evMonth === month && evYear === year) {
          const cell = grid.querySelector(`[data-date="${ev.date}"]`);
          if (cell) {
            const badge = document.createElement('div');
            badge.className = 'custom-event-badge';
            badge.innerHTML = `<i class="ph ph-calendar-plus"></i> ${escapeHtml(ev.title)}`;
            badge.title = ev.description || ev.title;
            cell.appendChild(badge);
          }
        }
      }
    });

    // 4. Update Holidays list on the right panel
    const holidaysList = document.getElementById('holidays-list');
    if (holidaysList) {
      const thisMonthHolidays = holidays.filter(h => {
        const d = new Date(h.date);
        return d.getMonth() === month && d.getFullYear() === year;
      });

      if (thisMonthHolidays.length === 0) {
        holidaysList.innerHTML = '<p class="empty-text">No hay festividades este mes.</p>';
      } else {
        holidaysList.innerHTML = thisMonthHolidays.map(h => `
          <li class="list-item">
            <div class="item-icon"><i class="ph ph-star"></i></div>
            <div class="item-content">
              <div class="item-title">${escapeHtml(h.title)}</div>
              <div class="item-desc">${escapeHtml(h.hebrew || '')}</div>
            </div>
            <div class="item-meta">
              <div style="font-size:13px;">${formatDateShort(h.date)}</div>
            </div>
          </li>`).join('');
      }
    }

    // 5. Update Shabbat info card on the right panel
    const shabbatInfo = document.getElementById('shabbat-info');
    if (shabbatInfo) {
      const [parasha, candles, havdalah] = await Promise.all([
        HebrewCalendar.getParasha(),
        HebrewCalendar.getCandleLighting(),
        HebrewCalendar.getHavdalah()
      ]);

      let infoHtml = '';
      if (parasha) {
        infoHtml += `<div class="shabbat-detail"><strong>Parashá:</strong> ${escapeHtml(parasha.title)}</div>`;
        if (parasha.hebrew) infoHtml += `<div class="shabbat-detail shabbat-hebrew">${escapeHtml(parasha.hebrew)}</div>`;
      }
      if (candles) {
        const time = new Date(candles.date).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
        infoHtml += `<div class="shabbat-detail"><i class="ph ph-candle"></i> <strong>Encendido de velas:</strong> ${time}</div>`;
      }
      if (havdalah) {
        const time = new Date(havdalah.date).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
        infoHtml += `<div class="shabbat-detail"><i class="ph ph-moon-stars"></i> <strong>Havdalá:</strong> ${time}</div>`;
      }

      shabbatInfo.innerHTML = infoHtml || '<p class="empty-text">Información de Shabat no disponible.</p>';
    }
  } catch (e) {
    console.warn('Error loading calendar data:', e);
  }
}


// ------------------------------------------------------------
// 9e. Yahrzeits
// ------------------------------------------------------------
function initYahrzeits() {
  renderYahrzeitCards();

  const addBtn = document.getElementById('btn-add-yahrzeit');
  if (addBtn) addBtn.addEventListener('click', openYahrzeitModal);
}

function renderYahrzeitCards() {
  const container = document.getElementById('yahrzeits-container');
  if (!container) return;

  const yahrzeits = DataStore.getYahrzeits();
  const members   = DataStore.getMembers();

  if (yahrzeits.length === 0) {
    container.innerHTML = '<p class="empty-text">No hay yahrzeits registrados. Agrega el primero.</p>';
    return;
  }

  const sorted = [...yahrzeits]
    .map(y => ({ ...y, _days: daysUntil(y.gregorianDate) }))
    .sort((a, b) => a._days - b._days);

  container.innerHTML = sorted.map(y => {
    const member = members.find(m => m.id === y.memberId);
    const isUpcoming = y._days >= 0 && y._days <= 30;
    const cardClass = isUpcoming ? 'yahrzeit-card upcoming' : 'yahrzeit-card';
    const badge = y._days < 0
      ? `<span class="badge-tag badge-neutral">Pasado</span>`
      : y._days === 0
        ? `<span class="badge-tag badge-primary">Hoy</span>`
        : y._days <= 7
          ? `<span class="badge-tag badge-warning">Faltan ${y._days} días</span>`
          : `<span class="badge-tag badge-neutral">Faltan ${y._days} días</span>`;

    return `
      <div class="${cardClass}">
        <div class="yahrzeit-card-header">
          <div>
            <h4 class="yahrzeit-name"><i class="ph ph-candle"></i> ${escapeHtml(y.deceasedName)}</h4>
            <p class="yahrzeit-hebrew">${escapeHtml(y.hebrewName)}</p>
          </div>
          ${badge}
        </div>
        <div class="yahrzeit-card-body">
          <div class="yahrzeit-detail"><strong>Relación:</strong> ${escapeHtml(y.relation)}</div>
          <div class="yahrzeit-detail"><strong>Fecha:</strong> ${formatDate(y.gregorianDate)}</div>
          ${member ? `<div class="yahrzeit-detail"><strong>Familia:</strong> ${escapeHtml(member.name)}</div>` : ''}
        </div>
        <div class="yahrzeit-card-actions" style="display:flex; justify-content:flex-end; gap:8px;">
          <button class="btn-small-icon" title="Copiar Recordatorio de Yahrzeit" onclick="copyYahrzeitReminder('${y.id}')" style="cursor:pointer;"><i class="ph ph-copy"></i></button>
          <button class="btn-small-icon" title="Eliminar" onclick="deleteYahrzeit('${y.id}')" style="cursor:pointer;"><i class="ph ph-trash"></i></button>
        </div>
      </div>`;
  }).join('');
}

function openYahrzeitModal() {
  const members = DataStore.getMembers();
  const memberOptions = members.map(m => `<option value="${m.id}">${escapeHtml(m.name)}</option>`).join('');

  const bodyHtml = `
    <div class="form-grid">
      <div class="form-group">
        <label for="modal-yah-name">Nombre del Fallecido</label>
        <input type="text" id="modal-yah-name" class="form-input" placeholder="Nombre completo">
      </div>
      <div class="form-group">
        <label for="modal-yah-hebrew">Nombre Hebreo</label>
        <input type="text" id="modal-yah-hebrew" class="form-input" placeholder="Ej: Yitzjak ben Avraham">
      </div>
      <div class="form-group">
        <label for="modal-yah-relation">Relación</label>
        <select id="modal-yah-relation" class="form-input">
          <option value="Padre">Padre</option>
          <option value="Madre">Madre</option>
          <option value="Abuelo">Abuelo</option>
          <option value="Abuela">Abuela</option>
          <option value="Esposo">Esposo</option>
          <option value="Esposa">Esposa</option>
          <option value="Hijo">Hijo</option>
          <option value="Hija">Hija</option>
          <option value="Hermano">Hermano</option>
          <option value="Hermana">Hermana</option>
          <option value="Tío">Tío</option>
          <option value="Tía">Tía</option>
          <option value="Otro">Otro</option>
        </select>
      </div>
      <div class="form-group">
        <label for="modal-yah-date">Fecha Gregoriana</label>
        <input type="date" id="modal-yah-date" class="form-input">
      </div>
      <div class="form-group form-group-full">
        <label for="modal-yah-member">Miembro Asociado</label>
        <select id="modal-yah-member" class="form-input">${memberOptions}</select>
      </div>
    </div>`;

  openModal('Nuevo Yahrzeit', bodyHtml, () => {
    const deceasedName = document.getElementById('modal-yah-name')?.value.trim();
    const hebrewName   = document.getElementById('modal-yah-hebrew')?.value.trim();
    const relation     = document.getElementById('modal-yah-relation')?.value;
    const gregorianDate = document.getElementById('modal-yah-date')?.value;
    const memberId     = document.getElementById('modal-yah-member')?.value;

    if (!deceasedName || !gregorianDate) {
      showToast('Nombre y fecha son obligatorios', 'error');
      return;
    }

    const yahrzeits = DataStore.getYahrzeits();
    yahrzeits.push({ id: generateId(), deceasedName, hebrewName, relation, gregorianDate, memberId });
    DataStore.saveYahrzeits(yahrzeits);
    DataStore.addLog(`Agregó el Yahrzeit de ${deceasedName}`);
    closeModal();
    showToast('Yahrzeit agregado correctamente');
    renderYahrzeitCards();
  });
}

function deleteYahrzeit(id) {
  const toDelete = DataStore.getYahrzeits().find(y => y.id === id);
  const nameStr = toDelete ? toDelete.deceasedName : id;
  confirmModal('Eliminar Yahrzeit', `¿Estás seguro de que deseas eliminar el Yahrzeit de <strong>${escapeHtml(nameStr)}</strong>?`, () => {
    const yahrzeits = DataStore.getYahrzeits().filter(y => y.id !== id);
    DataStore.saveYahrzeits(yahrzeits);
    DataStore.addLog(`Eliminó el Yahrzeit de ${nameStr}`);
    showToast('Yahrzeit eliminado', 'info');
    renderYahrzeitCards();
  });
}


// ------------------------------------------------------------
// 9f. Communications
// ------------------------------------------------------------
function initCommunications() {
  renderSentMessages();

  const sendBtn = document.getElementById('btn-send-message');
  if (sendBtn) {
    sendBtn.addEventListener('click', () => {
      const recipients = document.getElementById('comm-recipients')?.value.trim();
      const subject    = document.getElementById('comm-subject')?.value.trim();
      const body       = document.getElementById('comm-message')?.value.trim();

      if (!recipients || !subject || !body) {
        showToast('Por favor completa todos los campos', 'error');
        return;
      }

      const messages = DataStore.getMessages();
      messages.push({
        id: generateId(),
        recipients, subject, body,
        sentAt: new Date().toISOString()
      });
      DataStore.saveMessages(messages);

      // Clear form
      const recipientsEl = document.getElementById('comm-recipients');
      const subjectEl    = document.getElementById('comm-subject');
      const messageEl    = document.getElementById('comm-message');
      if (recipientsEl) recipientsEl.value = '';
      if (subjectEl)    subjectEl.value = '';
      if (messageEl)    messageEl.value = '';

      showToast('Mensaje enviado correctamente');
      renderSentMessages();
    });
  }
}

function renderSentMessages() {
  const listEl = document.getElementById('sent-messages-list');
  if (!listEl) return;

  const messages = DataStore.getMessages();
  if (messages.length === 0) {
    listEl.innerHTML = '<p class="empty-text">No hay mensajes enviados.</p>';
    return;
  }

  const sorted = [...messages].sort((a, b) => new Date(b.sentAt) - new Date(a.sentAt));
  listEl.innerHTML = sorted.map(m => `
    <li class="list-item">
      <div class="item-icon"><i class="ph ph-envelope"></i></div>
      <div class="item-content">
        <div class="item-title">${escapeHtml(m.subject)}</div>
        <div class="item-desc"><i class="ph ph-users"></i> ${escapeHtml(m.recipients)}</div>
      </div>
      <div class="item-meta">
        <div style="font-size:13px;">${formatDate(m.sentAt)}</div>
      </div>
    </li>`).join('');
}


// ------------------------------------------------------------
// 9g. Kids (Parashat HaShavua para Niños)
// ------------------------------------------------------------
function initKids() {
  const nameEl      = document.getElementById('kids-parasha-name');
  const summaryEl   = document.getElementById('kids-parasha-summary');
  const questionsEl = document.getElementById('kids-parasha-questions');
  const activityEl  = document.getElementById('kids-parasha-activity');
  const sendBtn     = document.getElementById('btn-send-kids');
  const selectEl    = document.getElementById('kids-parasha-select');

  const keys = Object.keys(PARASHOT_DATA);
  if (selectEl) {
    selectEl.innerHTML = keys.map(k => `<option value="${k}">${k}</option>`).join('');
  }

  // Default fallback
  let matchedKey = 'Noach';
  let actualParashaName = '';

  HebrewCalendar.getParasha().then(parasha => {
    if (parasha) {
      const parashaName = parasha.title;
      actualParashaName = parashaName;
      const found = keys.find(k => parashaName.toLowerCase().includes(k.toLowerCase()));
      if (found) matchedKey = found;
    }
    
    if (selectEl) selectEl.value = matchedKey;
    updateKidsView(matchedKey, actualParashaName);
  }).catch(() => {
    if (selectEl) selectEl.value = matchedKey;
    updateKidsView(matchedKey, '');
  });

  if (selectEl) {
    selectEl.addEventListener('change', (e) => {
      updateKidsView(e.target.value, actualParashaName);
    });
  }

  function updateKidsView(key, activeName) {
    renderKidsContent(key, summaryEl, questionsEl, activityEl);
    initTrivia(key);
    if (nameEl) {
      const isActive = activeName && activeName.toLowerCase().includes(key.toLowerCase());
      nameEl.innerHTML = `${escapeHtml(key)} ${isActive ? '<span style="font-size:14px;background:var(--success-bg);color:var(--success);padding:4px 8px;border-radius:10px;margin-left:8px;font-weight:600;font-family:\'Inter\',sans-serif;">Esta Semana</span>' : '<span style="font-size:14px;background:var(--info-bg);color:var(--info);padding:4px 8px;border-radius:10px;margin-left:8px;font-weight:600;font-family:\'Inter\',sans-serif;">Explorando</span>'}`;
    }
  }

  if (sendBtn) {
    sendBtn.addEventListener('click', () => {
      showToast('¡Contenido enviado a las familias con niños!', 'success');
    });
  }
}

function renderKidsContent(key, summaryEl, questionsEl, activityEl) {
  const data = PARASHOT_DATA[key];
  if (!data) return;

  if (summaryEl) summaryEl.textContent = data.summary_kids;

  if (questionsEl) {
    questionsEl.innerHTML = data.questions.map((q, i) => `
      <div class="kids-question">
        <span class="kids-question-num">${i + 1}</span>
        <span>${escapeHtml(q)}</span>
      </div>`).join('');
  }

  if (activityEl) activityEl.textContent = data.activity;

  // Dynamically update images
  const imgEl = document.getElementById('kids-parasha-img');
  const activityImgEl = document.getElementById('kids-activity-img');
  if (imgEl && data.illustration) imgEl.src = data.illustration;
  if (activityImgEl && data.coloring) activityImgEl.src = data.coloring;

  // Render Parents Theater Script
  const scriptEl = document.getElementById('kids-parasha-script');
  if (scriptEl) {
    let playData = PLAY_SCRIPTS[key];
    if (!playData) {
      const summaryText = data.summary_kids || '';
      const activityText = data.activity || '';
      const startText = summaryText ? (summaryText.charAt(0).toLowerCase() + summaryText.slice(1)) : '';
      playData = {
        cast: 'Narrador, Papá/Mamá Guía, Niño/a Preguntón/a',
        dialogue: [
          { p: 'Narrador', d: `La familia está sentada a la mesa de Shabat conversando sobre la Parashá ${key}.` },
          { p: 'Niño/a', d: `¡Papá, Mamá! Cuéntenme, ¿de qué se trató la lectura de la Torá esta semana?` },
          { p: 'Papá/Mamá', d: `¡Claro! Esta semana aprendimos que ${startText}` },
          { p: 'Niño/a', d: `¡Qué gran enseñanza! ¿Y cómo podemos aplicarlo en nuestra vida diaria?` },
          { p: 'Papá/Mamá', d: `Podemos empezar con la actividad de hoy: ${activityText}. ¡La haremos todos juntos!` },
          { p: 'Narrador', d: `Todos sonríen, se dan un fuerte abrazo y dicen juntos: ¡Shabat Shalom!` }
        ]
      };
    }
    const castHtml = `<p style="margin-bottom:8px; font-weight:600; color:var(--text-main);"><strong>Personajes:</strong> <span style="font-weight:normal; color:var(--text-muted);">${escapeHtml(playData.cast)}</span></p>`;
    const dialogueHtml = playData.dialogue.map(line => `
      <div style="margin-bottom:6px; font-size:13px; line-height:1.5;">
        <span style="font-weight:600; color:#D97706; text-transform:uppercase; font-size:11px; display:inline-block; min-width:85px; vertical-align:top;">${escapeHtml(line.p)}:</span>
        <span style="color:var(--text-muted); display:inline-block; width:calc(100% - 95px); vertical-align:top;">"${escapeHtml(line.d)}"</span>
      </div>
    `).join('');
    scriptEl.innerHTML = castHtml + dialogueHtml;
  }
}


// ------------------------------------------------------------
// 9h. Shorashim (Raíces / Árbol Familiar)
// ------------------------------------------------------------
function initShorashim() {
  const members = DataStore.getMembers();
  const select = document.getElementById('shorashim-member-select');
  if (!select) return;

  // Populate select dropdown
  select.innerHTML = members.map(m => `<option value="${m.id}">${escapeHtml(m.name)}</option>`).join('');

  // Handle selection change
  select.addEventListener('change', (e) => {
    renderShorashimTree(e.target.value);
  });

  // Export GEDCOM button
  const exportBtn = document.getElementById('btn-export-gedcom');
  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      exportMemberGedcom(select.value);
    });
  }

  // Initial render with first member
  if (members.length > 0) {
    select.value = members[0].id;
    renderShorashimTree(members[0].id);
  }
}

function renderShorashimTree(memberId) {
  const members = DataStore.getMembers();
  const focusMember = members.find(m => m.id === memberId);
  if (!focusMember) return;

  // Find relatives
  const spouse = focusMember.spouseId ? members.find(m => m.id === focusMember.spouseId) : null;
  const father = focusMember.fatherId ? members.find(m => m.id === focusMember.fatherId) : null;
  const mother = focusMember.motherId ? members.find(m => m.id === focusMember.motherId) : null;
  const children = members.filter(m => m.fatherId === memberId || m.motherId === memberId);

  // Helper to render a node
  const renderNodeHtml = (member, label, placeholder) => {
    if (!member) {
      return `
        <div class="tree-node empty" style="border: 2px dashed var(--border-color); border-radius:12px; padding:16px; min-width:180px; text-align:center; color:var(--text-muted); font-size:13px; background:var(--bg-main);">
          <div>${placeholder}</div>
          <div style="font-size:11px; margin-top:4px;">Sin registrar</div>
        </div>`;
    }
    const initials = member.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
    return `
      <div class="tree-node" style="border: 1px solid var(--border-color); border-radius:12px; padding:16px; min-width:180px; text-align:center; background:var(--bg-surface); box-shadow:var(--shadow-sm); position:relative;">
        <span style="position:absolute; top:-10px; left:50%; transform:translateX(-50%); background:var(--primary); color:white; font-size:9px; padding:2px 8px; border-radius:10px; font-weight:600; text-transform:uppercase;">${label}</span>
        <div style="display:flex; flex-direction:column; align-items:center; gap:8px; margin-top:4px;">
          <div class="member-avatar" style="width:32px; height:32px; font-size:12px;">${initials}</div>
          <div style="font-weight:600; font-size:13px; color:var(--text-main); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; max-width:160px;">${escapeHtml(member.name)}</div>
          <div style="font-size:11px; color:var(--text-muted);">${escapeHtml(member.family)}</div>
          <button class="btn-link" style="font-size:11px; padding:0; margin-top:4px;" onclick="shorashimFocus('${member.id}')">Hacer Foco</button>
        </div>
      </div>`;
  };

  // Render Focus node (highlighted)
  const initialsFocus = focusMember.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  const focusNodeHtml = `
    <div class="tree-node focus-node" style="border: 2px solid var(--accent); border-radius:12px; padding:20px; min-width:200px; text-align:center; background:var(--bg-surface); box-shadow:var(--shadow-md); position:relative;">
      <span style="position:absolute; top:-10px; left:50%; transform:translateX(-50%); background:var(--accent); color:var(--sidebar-bg); font-size:10px; padding:2px 10px; border-radius:10px; font-weight:700; text-transform:uppercase;">Miembro Foco</span>
      <div style="display:flex; flex-direction:column; align-items:center; gap:8px; margin-top:4px;">
        <div class="member-avatar" style="width:40px; height:40px; font-size:14px; background:linear-gradient(135deg, var(--accent), var(--accent-hover)); color:var(--sidebar-bg); font-weight:700;">${initialsFocus}</div>
        <div style="font-weight:700; font-size:14px; color:var(--primary); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; max-width:180px;">${escapeHtml(focusMember.name)}</div>
        <div style="font-size:12px; color:var(--text-muted);">${escapeHtml(focusMember.family)}</div>
      </div>
    </div>`;

  // Inject parents
  const fatherEl = document.getElementById('node-father');
  const motherEl = document.getElementById('node-mother');
  if (fatherEl) fatherEl.innerHTML = renderNodeHtml(father, 'Padre', 'Agregar Padre');
  if (motherEl) motherEl.innerHTML = renderNodeHtml(mother, 'Madre', 'Agregar Madre');

  // Inject focus & spouse
  const focusEl = document.getElementById('node-focus');
  const spouseEl = document.getElementById('node-spouse');
  if (focusEl) focusEl.innerHTML = focusNodeHtml;
  if (spouseEl) spouseEl.innerHTML = renderNodeHtml(spouse, 'Cónyuge', 'Agregar Cónyuge');

  // Show relation link or hide if no spouse
  const relationLink = document.getElementById('tree-relation-link');
  if (relationLink) {
    relationLink.style.display = spouse ? 'block' : 'none';
  }
  if (spouseEl) {
    spouseEl.style.display = spouse ? 'block' : 'none';
  }

  // Inject children
  const childrenEl = document.getElementById('nodes-children');
  if (childrenEl) {
    if (children.length === 0) {
      childrenEl.innerHTML = `
        <div class="tree-node empty" style="border: 2px dashed var(--border-color); border-radius:12px; padding:16px; min-width:180px; text-align:center; color:var(--text-muted); font-size:13px; background:var(--bg-main);">
          <div>Hijos</div>
          <div style="font-size:11px; margin-top:4px;">Sin hijos registrados</div>
        </div>`;
    } else {
      childrenEl.innerHTML = children.map(c => renderNodeHtml(c, 'Hijo/a', '')).join('');
    }
  }

  // Update Genealogy Links
  const linkMyHeritage = document.getElementById('link-myheritage');
  const linkGeni = document.getElementById('link-geni');
  const linkFamilySearch = document.getElementById('link-familysearch');

  const names = focusMember.name.split(' ');
  const firstName = names[0] || '';
  const lastName = names.slice(1).join(' ') || '';

  if (linkMyHeritage) linkMyHeritage.href = `https://www.myheritage.es/research?action=query&formId=1&qname=Name+FN.${encodeURIComponent(firstName)}+LN.${encodeURIComponent(lastName)}`;
  if (linkGeni) linkGeni.href = `https://www.geni.com/search?query=${encodeURIComponent(focusMember.name)}`;
  if (linkFamilySearch) linkFamilySearch.href = `https://www.familysearch.org/search/record/results?q.givenName=${encodeURIComponent(firstName)}&q.surname=${encodeURIComponent(lastName)}`;

  setTimeout(drawTreeConnectors, 50);
}

// Global click handler to change tree focus
window.shorashimFocus = function(memberId) {
  const select = document.getElementById('shorashim-member-select');
  if (select) {
    select.value = memberId;
    renderShorashimTree(memberId);
  }
};

function exportMemberGedcom(memberId) {
  const members = DataStore.getMembers();
  const focusMember = members.find(m => m.id === memberId);
  if (!focusMember) return;

  const relatedIds = new Set([focusMember.id]);
  if (focusMember.spouseId) relatedIds.add(focusMember.spouseId);
  if (focusMember.fatherId) relatedIds.add(focusMember.fatherId);
  if (focusMember.motherId) relatedIds.add(focusMember.motherId);
  
  members.forEach(m => {
    if (m.fatherId === focusMember.id || m.motherId === focusMember.id) {
      relatedIds.add(m.id);
    }
  });

  const relatedMembers = members.filter(m => relatedIds.has(m.id));

  let ged = [];
  ged.push('0 HEAD');
  ged.push('1 CHAR UTF-8');
  ged.push('1 SOUR KehilaAdmin');
  ged.push('2 VERS 2.0');
  ged.push('1 GEDC');
  ged.push('2 VERS 5.5.1');
  ged.push('2 FORM LINEAGE-LINKED');

  relatedMembers.forEach(m => {
    const names = m.name.split(' ');
    const first = names[0] || '';
    const last = names.slice(1).join(' ') || '';
    
    ged.push(`0 @I${m.id}@ INDI`);
    ged.push(`1 NAME ${first} /${last}/`);
    ged.push(`2 GIVN ${first}`);
    ged.push(`2 SURN ${last}`);
    
    if (m.email) ged.push(`1 EMAIL ${m.email}`);
    if (m.phone) ged.push(`1 PHON ${m.phone}`);
    
    if (m.fatherId || m.motherId) {
      const famcId = m.fatherId && m.motherId 
        ? `F_${m.fatherId}_${m.motherId}`
        : m.fatherId ? `F_${m.fatherId}_X` : `F_X_${m.motherId}`;
      ged.push(`1 FAMC @${famcId}@`);
    }
    if (m.spouseId) {
      const famsId = m.id < m.spouseId ? `F_${m.id}_${m.spouseId}` : `F_${m.spouseId}_${m.id}`;
      ged.push(`1 FAMS @${famsId}@`);
    }
  });

  const families = new Set();
  
  relatedMembers.forEach(m => {
    if (m.spouseId) {
      const famId = m.id < m.spouseId ? `F_${m.id}_${m.spouseId}` : `F_${m.spouseId}_${m.id}`;
      if (!families.has(famId)) {
        families.add(famId);
        const husband = m.id < m.spouseId ? m : members.find(x => x.id === m.spouseId);
        const wife = m.id < m.spouseId ? members.find(x => x.id === m.spouseId) : m;
        
        ged.push(`0 @${famId}@ FAM`);
        if (husband) ged.push(`1 HUSB @I${husband.id}@`);
        if (wife) ged.push(`1 WIFE @I${wife.id}@`);
        
        const coupleChildren = members.filter(c => 
          (c.fatherId === husband?.id && c.motherId === wife?.id) ||
          (husband && c.fatherId === husband.id && !c.motherId) ||
          (wife && c.motherId === wife.id && !c.fatherId)
        );
        coupleChildren.forEach(c => {
          ged.push(`1 CHIL @I${c.id}@`);
        });
      }
    }
  });

  if (focusMember.fatherId || focusMember.motherId) {
    const famId = focusMember.fatherId && focusMember.motherId 
      ? `F_${focusMember.fatherId}_${focusMember.motherId}`
      : focusMember.fatherId ? `F_${focusMember.fatherId}_X` : `F_X_${focusMember.motherId}`;
    
    if (!families.has(famId)) {
      families.add(famId);
      ged.push(`0 @${famId}@ FAM`);
      if (focusMember.fatherId) ged.push(`1 HUSB @I${focusMember.fatherId}@`);
      if (focusMember.motherId) ged.push(`1 WIFE @I${focusMember.motherId}@`);
      ged.push(`1 CHIL @I${focusMember.id}@`);
      
      members.forEach(m => {
        if (m.id !== focusMember.id) {
          const matchesFather = focusMember.fatherId && m.fatherId === focusMember.fatherId;
          const matchesMother = focusMember.motherId && m.motherId === focusMember.motherId;
          if (matchesFather || matchesMother) {
            ged.push(`1 CHIL @I${m.id}@`);
          }
        }
      });
    }
  }

  ged.push('0 TRLR');
  
  const content = ged.join('\n');
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `arbol_shorashim_${focusMember.name.toLowerCase().replace(/\s+/g, '_')}.ged`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast('Archivo GEDCOM exportado');
}

// ------------------------------------------------------------
// CSV Export & Download Helpers
// ------------------------------------------------------------
function downloadCSV(filename, headers, rows) {
  const escapeCSVCell = (cell) => {
    const str = String(cell);
    if (str.includes(',') || str.includes('"') || str.includes('\n')) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  const csvContent = [
    headers.map(escapeCSVCell).join(','),
    ...rows.map(row => row.map(escapeCSVCell).join(','))
  ].join('\n');

  const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  showToast('Archivo CSV descargado correctamente');
}

function exportMembersToCSV() {
  const members = getFilteredMembers();
  if (members.length === 0) {
    showToast('No hay miembros para exportar', 'warning');
    return;
  }

  const headers = ['ID', 'Nombre', 'Familia', 'Email', 'Teléfono', 'Estado', 'Fecha Registro', 'Cónyuge ID', 'Padre ID', 'Madre ID'];
  const rows = members.map(m => [
    m.id,
    m.name,
    m.family,
    m.email || '',
    m.phone || '',
    m.status === 'active' ? 'Activo' : 'Inactivo',
    m.joinDate || '',
    m.spouseId || '',
    m.fatherId || '',
    m.motherId || ''
  ]);

  downloadCSV('miembros_kehila.csv', headers, rows);
}

function exportTransactionsToCSV() {
  const donations = DataStore.getDonations();
  const typeFilter = state.financeFilter || 'all';
  let filtered = donations;
  if (typeFilter !== 'all') {
    filtered = donations.filter(d => d.type === typeFilter);
  }

  if (filtered.length === 0) {
    showToast('No hay transacciones para exportar', 'warning');
    return;
  }

  const headers = ['ID', 'ID Miembro', 'Nombre Miembro', 'Monto ($)', 'Tipo', 'Fecha', 'Notas'];
  const rows = filtered.map(d => [
    d.id,
    d.memberId,
    d.memberName,
    d.amount,
    d.type,
    d.date,
    d.notes || ''
  ]);

  downloadCSV('transacciones_kehila.csv', headers, rows);
}

// ------------------------------------------------------------
// Kids Interactive Trivia Engine
// ------------------------------------------------------------
const triviaState = {
  questions: [],
  currentIdx: 0,
  score: 0,
  selectedAnswer: null
};

function initTrivia(parashaKey) {
  const triviaBody = document.getElementById('trivia-body');
  if (!triviaBody) return;

  const customQuestions = TRIVIA_DATA[parashaKey];
  triviaState.questions = customQuestions ? customQuestions : TRIVIA_FALLBACK;
  triviaState.currentIdx = 0;
  triviaState.score = 0;
  triviaState.selectedAnswer = null;

  renderTriviaQuestion();
}

function renderTriviaQuestion() {
  const triviaBody = document.getElementById('trivia-body');
  if (!triviaBody) return;

  const currentIdx = triviaState.currentIdx;
  const questions = triviaState.questions;

  if (currentIdx >= questions.length) {
    triviaBody.innerHTML = `
      <div style="text-align:center; padding:12px 0;">
        <div style="font-size:48px; margin-bottom:12px;">🏆</div>
        <h4 style="margin-bottom:8px; font-size:16px; color:var(--text-main);">¡Completado!</h4>
        <p style="font-size:13px; color:var(--text-muted); margin-bottom:20px;">
          Respondiste correctamente <strong>${triviaState.score}</strong> de <strong>${questions.length}</strong> preguntas.
        </p>
        <button class="btn-primary" style="width:100%; justify-content:center; background:#F59E0B; border:none;" onclick="resetTriviaGame()">Jugar de nuevo</button>
      </div>`;
    return;
  }

  const qObj = questions[currentIdx];
  triviaState.selectedAnswer = null;

  triviaBody.innerHTML = `
    <div>
      <div style="display:flex; justify-content:space-between; font-size:11px; color:var(--text-muted); font-weight:600; text-transform:uppercase; margin-bottom:12px;">
        <span>Pregunta ${currentIdx + 1} de ${questions.length}</span>
        <span>Aciertos: ${triviaState.score}</span>
      </div>
      <p style="font-weight:600; font-size:14px; color:var(--text-main); margin-bottom:16px; line-height:1.4;">
        ${escapeHtml(qObj.q)}
      </p>
      <div style="display:flex; flex-direction:column; gap:10px;" id="trivia-options">
        ${qObj.a.map((option, idx) => `
          <button class="btn-secondary trivia-opt-btn" style="text-align:left; justify-content:flex-start; width:100%; padding:12px 16px; font-weight:500; font-size:13px;" data-idx="${idx}">
            ${escapeHtml(option)}
          </button>
        `).join('')}
      </div>
      <div id="trivia-feedback" style="margin-top:16px; min-height:24px; font-weight:600; font-size:13px; text-align:center;"></div>
      <button class="btn-primary" id="trivia-next-btn" style="width:100%; justify-content:center; margin-top:16px; background:#F59E0B; border:none; display:none;">
        Siguiente <i class="ph ph-arrow-right"></i>
      </button>
    </div>`;

  const optionBtns = triviaBody.querySelectorAll('.trivia-opt-btn');
  optionBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      if (triviaState.selectedAnswer !== null) return;
      
      const chosenIdx = parseInt(e.currentTarget.getAttribute('data-idx'), 10);
      triviaState.selectedAnswer = chosenIdx;
      
      const correctIdx = qObj.c;
      const feedbackEl = document.getElementById('trivia-feedback');
      const nextBtn = document.getElementById('trivia-next-btn');

      optionBtns.forEach((b, bIdx) => {
        if (bIdx === correctIdx) {
          b.style.background = '#C6F6D5';
          b.style.color = '#22543D';
          b.style.borderColor = '#38A169';
        } else if (bIdx === chosenIdx) {
          b.style.background = '#FED7D7';
          b.style.color = '#742A2A';
          b.style.borderColor = '#E53E3E';
        } else {
          b.style.opacity = '0.6';
        }
      });

      if (chosenIdx === correctIdx) {
        triviaState.score++;
        if (feedbackEl) feedbackEl.innerHTML = '<span style="color:#38A169;">¡Excelente! 🎉 Respuesta correcta.</span>';
      } else {
        if (feedbackEl) feedbackEl.innerHTML = `<span style="color:#E53E3E;">¡Oops! La respuesta correcta era: ${escapeHtml(qObj.a[correctIdx])}</span>`;
      }

      if (nextBtn) nextBtn.style.display = 'flex';
    });
  });

  const nextBtn = triviaBody.querySelector('#trivia-next-btn');
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      triviaState.currentIdx++;
      renderTriviaQuestion();
    });
  }
}

window.resetTriviaGame = function() {
  const selectEl = document.getElementById('kids-parasha-select');
  const activeKey = selectEl ? selectEl.value : 'Bereshit';
  initTrivia(activeKey);
};

// ------------------------------------------------------------
// Shorashim SVG Dynamic Connectors
// ------------------------------------------------------------
function drawTreeConnectors() {
  const svg = document.getElementById('tree-connections');
  const visualizer = document.querySelector('.tree-visualizer');
  if (!svg || !visualizer) return;

  svg.innerHTML = '';
  const visRect = visualizer.getBoundingClientRect();

  const getCenterTop = (el) => {
    if (!el || el.offsetParent === null) return null;
    const r = el.getBoundingClientRect();
    return { x: r.left + r.width / 2 - visRect.left, y: r.top - visRect.top };
  };

  const getCenterBottom = (el) => {
    if (!el || el.offsetParent === null) return null;
    const r = el.getBoundingClientRect();
    return { x: r.left + r.width / 2 - visRect.left, y: r.top + r.height - visRect.top };
  };

  const getCenterLeft = (el) => {
    if (!el || el.offsetParent === null) return null;
    const r = el.getBoundingClientRect();
    return { x: r.left - visRect.left, y: r.top + r.height / 2 - visRect.top };
  };

  const getCenterRight = (el) => {
    if (!el || el.offsetParent === null) return null;
    const r = el.getBoundingClientRect();
    return { x: r.left + r.width - visRect.left, y: r.top + r.height / 2 - visRect.top };
  };

  const drawLine = (p1, p2, color = 'var(--border-color)', isDashed = false) => {
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    const midY = (p1.y + p2.y) / 2;
    const d = `M ${p1.x} ${p1.y} C ${p1.x} ${midY}, ${p2.x} ${midY}, ${p2.x} ${p2.y}`;
    line.setAttribute('d', d);
    line.setAttribute('stroke', color);
    line.setAttribute('stroke-width', '2');
    line.setAttribute('fill', 'none');
    if (isDashed) {
      line.setAttribute('stroke-dasharray', '4,4');
    }
    svg.appendChild(line);
  };

  const fatherNode = document.querySelector('#node-father .tree-node:not(.empty)');
  const motherNode = document.querySelector('#node-mother .tree-node:not(.empty)');
  const focusNode = document.querySelector('#node-focus .tree-node');
  const spouseNode = document.querySelector('#node-spouse .tree-node:not(.empty)');
  const relationLink = document.getElementById('tree-relation-link');
  const childrenNodes = document.querySelectorAll('#nodes-children .tree-node:not(.empty)');

  const focusTop = getCenterTop(focusNode);

  // 1. Connect Parents to Focus Node
  if (fatherNode) {
    const fatherBottom = getCenterBottom(fatherNode);
    if (fatherBottom && focusTop) drawLine(fatherBottom, focusTop);
  }
  if (motherNode) {
    const motherBottom = getCenterBottom(motherNode);
    if (motherBottom && focusTop) drawLine(motherBottom, focusTop);
  }

  // 2. Connect Focus Node to Spouse
  if (spouseNode && focusNode) {
    const focusRight = getCenterRight(focusNode);
    const spouseLeft = getCenterLeft(spouseNode);
    if (focusRight && spouseLeft) {
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', focusRight.x);
      line.setAttribute('y1', focusRight.y);
      line.setAttribute('x2', spouseLeft.x);
      line.setAttribute('y2', spouseLeft.y);
      line.setAttribute('stroke', 'var(--accent)');
      line.setAttribute('stroke-width', '2');
      line.setAttribute('stroke-dasharray', '4,4');
      svg.appendChild(line);
    }
  }

  // 3. Connect parents/focus to children
  let parentConnectorPoint = null;
  if (spouseNode && relationLink && relationLink.style.display !== 'none') {
    parentConnectorPoint = getCenterBottom(relationLink);
  } else if (focusNode) {
    parentConnectorPoint = getCenterBottom(focusNode);
  }

  if (parentConnectorPoint && childrenNodes.length > 0) {
    childrenNodes.forEach(child => {
      const childTop = getCenterTop(child);
      if (childTop) {
        drawLine(parentConnectorPoint, childTop, 'var(--border-color)', false);
      }
    });
  }
}

// Window resize handler for Shorashim SVG paths
if (!window.hasTreeResizeListener) {
  window.addEventListener('resize', () => {
    if (state.currentView === 'shorashim') {
      drawTreeConnectors();
    }
  });
  window.hasTreeResizeListener = true;
}

// ------------------------------------------------------------
// Global New Record Handler
// ------------------------------------------------------------
function openGlobalNewRecordModal() {
  const bodyHtml = `
    <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:16px; padding:8px 0; text-align:center;">
      <button class="btn-secondary" onclick="triggerGlobalNewRecord('member')" style="display:flex; flex-direction:column; align-items:center; justify-content:center; gap:12px; padding:24px 16px; border-radius:12px; height:120px; cursor:pointer;">
        <i class="ph ph-user-plus" style="font-size:32px; color:var(--info);"></i>
        <span style="font-weight:600; font-size:13px; color:var(--text-main);">Nuevo Miembro</span>
      </button>
      <button class="btn-secondary" onclick="triggerGlobalNewRecord('donation')" style="display:flex; flex-direction:column; align-items:center; justify-content:center; gap:12px; padding:24px 16px; border-radius:12px; height:120px; cursor:pointer;">
        <i class="ph ph-hand-heart" style="font-size:32px; color:var(--accent);"></i>
        <span style="font-weight:600; font-size:13px; color:var(--text-main);">Nueva Donación</span>
      </button>
      <button class="btn-secondary" onclick="triggerGlobalNewRecord('yahrzeit')" style="display:flex; flex-direction:column; align-items:center; justify-content:center; gap:12px; padding:24px 16px; border-radius:12px; height:120px; cursor:pointer;">
        <i class="ph ph-candle" style="font-size:32px; color:#FF6347;"></i>
        <span style="font-weight:600; font-size:13px; color:var(--text-main);">Nuevo Yahrzeit</span>
      </button>
    </div>`;

  openModal('Crear Nuevo Registro', bodyHtml, null);
}

window.triggerGlobalNewRecord = function(type) {
  closeModal();
  setTimeout(() => {
    if (type === 'member') {
      openMemberModal();
    } else if (type === 'donation') {
      openDonationModal();
    } else if (type === 'yahrzeit') {
      openYahrzeitModal();
    }
  }, 100);
};

// ------------------------------------------------------------
// Admin / User Profiles Management
// ------------------------------------------------------------
function initAdmin() {
  const addUserBtn = document.getElementById('btn-add-user');
  if (addUserBtn) {
    addUserBtn.addEventListener('click', () => openUserModal());
  }
  renderAdminUsers();
}

function renderAdminUsers() {
  const tableBody = document.getElementById('admin-users-table-body');
  const countEl = document.getElementById('admin-user-count');
  if (!tableBody) return;

  const users = DataStore.getUsers();
  if (countEl) countEl.textContent = `${users.length} ${users.length === 1 ? 'usuario' : 'usuarios'}`;

  if (users.length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="6" style="text-align:center; padding:32px; color:var(--text-muted);">
          No hay perfiles de usuario registrados.
        </td>
      </tr>`;
    return;
  }

  tableBody.innerHTML = users.map(u => `
    <tr>
      <td>
        <div style="display:flex; align-items:center; gap:10px;">
          <div class="avatar-sm" style="background:rgba(212,175,55,0.1); color:var(--accent); font-weight:600; width:32px; height:32px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:12px; flex-shrink:0;">
            ${escapeHtml(u.avatar)}
          </div>
          <span style="font-weight:600; color:var(--text-main);">@${escapeHtml(u.username)}</span>
        </div>
      </td>
      <td>${escapeHtml(u.name)}</td>
      <td>${escapeHtml(u.email)}</td>
      <td>
        <span class="badge" style="background:var(--bg-main); border:1px solid var(--border-color); color:var(--text-main); font-size:11px; padding:4px 8px; border-radius:8px; font-weight:500;">
          ${escapeHtml(u.role)}
        </span>
      </td>
      <td>
        <span class="badge ${u.status === 'active' ? 'status-active' : 'status-inactive'}">
          ${u.status === 'active' ? 'Activo' : 'Inactivo'}
        </span>
      </td>
      <td>
        <div style="display:flex; gap:8px;">
          <button class="btn-icon-sm" onclick="editUserProfile(${u.id})" title="Editar" style="padding:6px; border:1px solid var(--border-color); border-radius:8px; background:var(--bg-surface); cursor:pointer;">
            <i class="ph ph-pencil"></i>
          </button>
          <button class="btn-icon-sm btn-delete" onclick="deleteUserProfile(${u.id})" title="Borrar" style="padding:6px; border:1px solid var(--border-color); border-radius:8px; background:var(--bg-surface); color:var(--danger); cursor:pointer;">
            <i class="ph ph-trash"></i>
          </button>
        </div>
      </td>
    </tr>
  `).join('');
}

window.editUserProfile = function(id) {
  openUserModal(id);
};

window.deleteUserProfile = function(id) {
  const users = DataStore.getUsers();
  const u = users.find(x => x.id === id);
  if (!u) return;

  if (confirm(`¿Estás seguro de que deseas eliminar el perfil del usuario @${u.username}?`)) {
    const updated = users.filter(x => x.id !== id);
    DataStore.saveUsers(updated);
    renderAdminUsers();
    showToast('Perfil de usuario eliminado', 'success');
  }
};

function openUserModal(userId = null) {
  let user = null;
  if (userId !== null) {
    user = DataStore.getUsers().find(u => u.id === userId);
  }

  const title = user ? 'Editar Perfil de Usuario' : 'Nuevo Perfil de Usuario';
  const bodyHtml = `
    <form id="form-user-profile" onsubmit="event.preventDefault(); saveUserProfile(${user ? user.id : 'null'});" style="display:flex; flex-direction:column; gap:16px; padding:8px 0;">
      <div class="form-group" style="display:flex; flex-direction:column; gap:6px;">
        <label style="font-weight:600; color:var(--text-main); font-size:13px;">Nombre Completo</label>
        <input type="text" class="text-input" id="user-name-input" value="${user ? escapeHtml(user.name) : ''}" required style="width:100%;">
      </div>
      <div class="form-group" style="display:flex; flex-direction:column; gap:6px;">
        <label style="font-weight:600; color:var(--text-main); font-size:13px;">Nombre de Usuario</label>
        <div style="position:relative; display:flex; align-items:center;">
          <span style="position:absolute; left:12px; color:var(--text-muted); font-weight:600; font-size:14px;">@</span>
          <input type="text" class="text-input" id="user-username-input" value="${user ? escapeHtml(user.username) : ''}" required style="width:100%; padding-left:26px;" placeholder="ejemplo">
        </div>
      </div>
      <div class="form-group" style="display:flex; flex-direction:column; gap:6px;">
        <label style="font-weight:600; color:var(--text-main); font-size:13px;">Correo Electrónico</label>
        <input type="email" class="text-input" id="user-email-input" value="${user ? escapeHtml(user.email) : ''}" required style="width:100%;">
      </div>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px;">
        <div class="form-group" style="display:flex; flex-direction:column; gap:6px;">
          <label style="font-weight:600; color:var(--text-main); font-size:13px;">Rol / Cargo</label>
          <select class="select-input" id="user-role-select" style="width:100%;">
            <option value="Administrador" ${user && user.role === 'Administrador' ? 'selected' : ''}>Administrador</option>
            <option value="Rabino / Educador" ${user && user.role === 'Rabino / Educador' ? 'selected' : ''}>Rabino / Educador</option>
            <option value="Tesorero" ${user && user.role === 'Tesorero' ? 'selected' : ''}>Tesorero</option>
            <option value="Voluntario" ${user && user.role === 'Voluntario' ? 'selected' : ''}>Voluntario</option>
          </select>
        </div>
        <div class="form-group" style="display:flex; flex-direction:column; gap:6px;">
          <label style="font-weight:600; color:var(--text-main); font-size:13px;">Estado</label>
          <select class="select-input" id="user-status-select" style="width:100%;">
            <option value="active" ${user && user.status === 'active' ? 'selected' : ''}>Activo</option>
            <option value="inactive" ${user && user.status === 'inactive' ? 'selected' : ''}>Inactivo</option>
          </select>
        </div>
      </div>
      <div style="margin-top:16px; display:flex; gap:12px; justify-content:flex-end;">
        <button type="button" class="btn-secondary" onclick="closeModal()">Cancelar</button>
        <button type="submit" class="btn-primary">Guardar Perfil</button>
      </div>
    </form>`;

  openModal(title, bodyHtml, null);
}

window.saveUserProfile = function(id) {
  const name = document.getElementById('user-name-input').value.trim();
  const username = document.getElementById('user-username-input').value.trim().toLowerCase().replace(/[^a-z0-9_]/g, '');
  const email = document.getElementById('user-email-input').value.trim();
  const role = document.getElementById('user-role-select').value;
  const status = document.getElementById('user-status-select').value;

  if (!name || !username || !email) {
    showToast('Por favor, completa todos los campos requeridos', 'warning');
    return;
  }

  const users = DataStore.getUsers();

  const exists = users.find(u => u.username === username && u.id !== id);
  if (exists) {
    showToast('El nombre de usuario ya está en uso', 'warning');
    return;
  }

  const initials = name.split(' ').filter(Boolean).map(x => x[0]).join('').substring(0, 2).toUpperCase() || 'US';

  if (id !== null) {
    const idx = users.findIndex(u => u.id === id);
    if (idx !== -1) {
      users[idx] = { ...users[idx], name, username, email, role, status, avatar: initials };
    }
  } else {
    const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
    users.push({ id: newId, name, username, email, role, status, avatar: initials });
  }

  DataStore.saveUsers(users);
  closeModal();
  renderAdminUsers();
  showToast('Perfil de usuario guardado con éxito', 'success');
};

// ------------------------------------------------------------
// Internal Admin - Active Session Display & Switching
// ------------------------------------------------------------
function updateActiveUserProfileDisplay() {
  const user = DataStore.getCurrentUser();
  const avatarEl = document.getElementById('current-user-avatar');
  const nameEl = document.getElementById('current-user-name');
  const roleEl = document.getElementById('current-user-role');
  if (avatarEl) avatarEl.textContent = user.avatar || 'AD';
  if (nameEl) nameEl.textContent = user.name || 'Admin';
  if (roleEl) roleEl.textContent = user.role || 'Administrador';
}

function openSwitchUserModal() {
  const users = DataStore.getUsers();
  const bodyHtml = `
    <div style="display:flex; flex-direction:column; gap:12px; padding: 8px 0;">
      <p style="font-size:13px; color:var(--text-muted); margin-bottom:8px;">Selecciona el perfil de usuario con el que deseas trabajar en esta sesión:</p>
      <div style="display:flex; flex-direction:column; gap:8px; max-height: 300px; overflow-y: auto;">
        ${users.map(u => `
          <button class="btn-secondary" onclick="switchActiveUser(${u.id})" style="display:flex; align-items:center; gap:12px; width:100%; text-align:left; padding:12px 16px; justify-content:flex-start; border-radius:10px; cursor:pointer;">
            <div style="width:32px; height:32px; border-radius:50%; background:rgba(212,175,55,0.1); color:var(--accent); display:flex; align-items:center; justify-content:center; font-weight:600; font-size:12px; flex-shrink:0;">
              ${escapeHtml(u.avatar)}
            </div>
            <div style="flex:1;">
              <div style="font-weight:600; color:var(--text-main); font-size:13px;">${escapeHtml(u.name)}</div>
              <div style="font-size:11px; color:var(--text-muted);">@${escapeHtml(u.username)} • ${escapeHtml(u.role)}</div>
            </div>
            <i class="ph ph-caret-right" style="color:var(--text-muted);"></i>
          </button>
        `).join('')}
      </div>
    </div>`;
  openModal('Cambiar de Usuario Staff', bodyHtml, null);
}

window.switchActiveUser = function(userId) {
  const user = DataStore.getUsers().find(u => u.id === userId);
  if (user) {
    DataStore.setCurrentUser(user);
    DataStore.addLog(`Cambió de usuario activo a @${user.username}`);
    updateActiveUserProfileDisplay();
    closeModal();
    showToast(`Sesión activa: @${user.username}`);
    renderView(state.currentView);
  }
};

// ------------------------------------------------------------
// Internal Admin - Tasks Management
// ------------------------------------------------------------
function renderDashboardTasks() {
  const listEl = document.getElementById('dashboard-tasks-list');
  if (!listEl) return;

  const currentUser = DataStore.getCurrentUser();
  const allTasks = DataStore.getTasks();
  const myTasks = allTasks.filter(t => t.assignedTo === currentUser.username && t.status === 'pending');

  if (myTasks.length === 0) {
    listEl.innerHTML = `
      <li style="display:flex; flex-direction:column; align-items:center; padding:24px 16px; text-align:center; color:var(--text-muted); gap:8px;">
        <i class="ph ph-checks" style="font-size:32px; color:var(--success);"></i>
        <div style="font-size:13px; font-weight:500;">¡Al día! No tienes tareas pendientes.</div>
      </li>`;
    return;
  }

  listEl.innerHTML = myTasks.map(t => `
    <li class="list-item" style="padding: 12px 16px; border: 1px solid var(--border-color); border-radius: 10px; background: var(--bg-surface); display:flex; align-items:center; gap:12px; margin-bottom:8px;">
      <button onclick="completeDashboardTask('${t.id}')" title="Marcar como Completada" style="border:1px solid var(--border-color); width:20px; height:20px; border-radius:50%; background:none; cursor:pointer; display:flex; align-items:center; justify-content:center; color:var(--success); flex-shrink:0;">
        <i class="ph ph-check" style="font-size:12px; opacity:0; hover:opacity:1;"></i>
      </button>
      <div style="flex:1;">
        <div style="font-weight:600; font-size:13px; color:var(--text-main);">${escapeHtml(t.title)}</div>
        <div style="font-size:11px; color:var(--text-muted); margin-top:2px;">${escapeHtml(t.description)}</div>
      </div>
      <div style="font-size:11px; font-weight:600; color:var(--danger); background:rgba(239,68,68,0.05); padding:4px 8px; border-radius:8px; flex-shrink:0;">
        Vence: ${formatDateShort(t.dueDate)}
      </div>
    </li>
  `).join('');
}

function openDashboardAddTaskModal() {
  const users = DataStore.getUsers();
  const userOptions = users.map(u => `<option value="${u.username}">@${escapeHtml(u.username)} (${escapeHtml(u.role)})</option>`).join('');

  const bodyHtml = `
    <form id="form-add-task" onsubmit="event.preventDefault(); saveDashboardTask();" style="display:flex; flex-direction:column; gap:16px; padding:8px 0;">
      <div class="form-group" style="display:flex; flex-direction:column; gap:6px;">
        <label style="font-weight:600; color:var(--text-main); font-size:13px;">Título de la Tarea</label>
        <input type="text" class="text-input" id="task-title-input" required placeholder="Ej: Llamar a la familia Stern" style="width:100%;">
      </div>
      <div class="form-group" style="display:flex; flex-direction:column; gap:6px;">
        <label style="font-weight:600; color:var(--text-main); font-size:13px;">Descripción / Notas</label>
        <textarea class="text-input" id="task-desc-input" rows="3" placeholder="Detalles de la tarea..." style="width:100%; height:auto; resize:vertical; font-family:inherit; padding:10px;"></textarea>
      </div>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px;">
        <div class="form-group" style="display:flex; flex-direction:column; gap:6px;">
          <label style="font-weight:600; color:var(--text-main); font-size:13px;">Asignar a</label>
          <select class="select-input" id="task-assignee-select" style="width:100%;">${userOptions}</select>
        </div>
        <div class="form-group" style="display:flex; flex-direction:column; gap:6px;">
          <label style="font-weight:600; color:var(--text-main); font-size:13px;">Fecha Límite</label>
          <input type="date" class="text-input" id="task-due-input" required style="width:100%;">
        </div>
      </div>
      <div style="margin-top:16px; display:flex; gap:12px; justify-content:flex-end;">
        <button type="button" class="btn-secondary" onclick="closeModal()">Cancelar</button>
        <button type="submit" class="btn-primary">Crear Tarea</button>
      </div>
    </form>`;

  openModal('Nueva Tarea Interna', bodyHtml, null);
  
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dueInput = document.getElementById('task-due-input');
  if (dueInput) dueInput.value = tomorrow.toISOString().split('T')[0];
}

window.saveDashboardTask = function() {
  const title = document.getElementById('task-title-input').value.trim();
  const description = document.getElementById('task-desc-input').value.trim();
  const assignedTo = document.getElementById('task-assignee-select').value;
  const dueDate = document.getElementById('task-due-input').value;

  if (!title || !dueDate) {
    showToast('Por favor, completa los campos requeridos', 'warning');
    return;
  }

  const tasks = DataStore.getTasks();
  tasks.push({
    id: generateId(),
    title,
    description,
    assignedTo,
    dueDate,
    status: 'pending',
    createdAt: new Date().toISOString()
  });

  DataStore.saveTasks(tasks);
  DataStore.addLog(`Asignó la tarea "${title}" a @${assignedTo}`);
  closeModal();
  renderDashboardTasks();
  showToast('Tarea interna creada y asignada', 'success');
};

window.completeDashboardTask = function(taskId) {
  const tasks = DataStore.getTasks();
  const t = tasks.find(x => x.id === taskId);
  if (t) {
    t.status = 'completed';
    DataStore.saveTasks(tasks);
    DataStore.addLog(`Completó la tarea "${t.title}"`);
    renderDashboardTasks();
    showToast('¡Tarea completada! Buen trabajo', 'success');
  }
};

// ------------------------------------------------------------
// Internal Admin - Billing Alerts (Cuotas Vencidas)
// ------------------------------------------------------------
function renderBillingAlerts() {
  const alertsEl = document.getElementById('dashboard-billing-alerts');
  if (!alertsEl) return;

  const members = DataStore.getMembers().filter(m => m.status === 'active');
  const donations = DataStore.getDonations();
  const currentYear = new Date().getFullYear();

  const paidMemberIds = new Set(
    donations
      .filter(d => d.type === 'Cuota Mensual' && new Date(d.date).getFullYear() === currentYear)
      .map(d => d.memberId)
  );

  const unpaidMembers = members.filter(m => !paidMemberIds.has(m.id));

  if (unpaidMembers.length === 0) {
    alertsEl.innerHTML = `
      <div style="background:rgba(34,197,94,0.05); border:1px solid rgba(34,197,94,0.2); border-radius:12px; padding:16px; text-align:center; color:#166534; font-size:13px; font-weight:500; display:flex; align-items:center; justify-content:center; gap:8px;">
        <i class="ph ph-check-circle" style="font-size:20px;"></i>
        <span>Todas las familias activas están al día con sus cuotas de ${currentYear}.</span>
      </div>`;
    return;
  }

  alertsEl.innerHTML = `
    <div style="background:rgba(239,68,68,0.05); border:1px solid rgba(239,68,68,0.2); border-radius:12px; padding:14px; color:#991B1B; font-size:12px; font-weight:600; display:flex; align-items:center; gap:8px; margin-bottom:12px;">
      <i class="ph ph-warning-circle" style="font-size:18px; color:var(--danger);"></i>
      <span>Se detectaron ${unpaidMembers.length} familias con cuotas de ${currentYear} pendientes.</span>
    </div>
    <div style="display:flex; flex-direction:column; gap:8px; max-height:220px; overflow-y:auto; padding-right:4px;">
      ${unpaidMembers.map(m => `
        <div style="display:flex; justify-content:space-between; align-items:center; padding:10px 12px; border:1px solid var(--border-color); border-radius:8px; background:var(--bg-surface);">
          <div>
            <div style="font-weight:600; font-size:12px; color:var(--text-main);">${escapeHtml(m.name)}</div>
            <div style="font-size:10px; color:var(--text-muted); margin-top:2px;">${escapeHtml(m.phone || 'Sin teléfono')}</div>
          </div>
          <button class="btn-secondary" onclick="copyBillingReminderTemplate('${m.id}')" title="Copiar Mensaje de Cobro" style="padding:6px; font-size:11px; display:flex; align-items:center; gap:4px; height:auto; width:auto; border-radius:8px; cursor:pointer; border-color:var(--border-color);">
            <i class="ph ph-copy" style="font-size:13px;"></i> Recordatorio
          </button>
        </div>
      `).join('')}
    </div>`;
}

// ------------------------------------------------------------
// Internal Admin - Message Templates Copy Helpers
// ------------------------------------------------------------
window.copyMemberContact = function(memberId) {
  const m = DataStore.getMembers().find(x => x.id === memberId);
  if (!m) return;

  const text = `Ficha de Contacto - Kehilá:\nNombre: ${m.name}\nFamilia: ${m.family}\nTeléfono: ${m.phone || 'N/A'}\nEmail: ${m.email || 'N/A'}\nEstado: ${m.status === 'active' ? 'Activo' : 'Inactivo'}`;
  navigator.clipboard.writeText(text).then(() => {
    showToast('Datos de contacto copiados al portapapeles');
  });
};

window.copyThankYouTemplate = function(donationId) {
  const d = DataStore.getDonations().find(x => x.id === donationId);
  if (!d) return;

  const text = `Estimado/a ${d.memberName},\n\nLe escribimos en nombre de la administración de la Kehilá para expresarle nuestro más sincero agradecimiento por su contribución de ${formatCurrency(d.amount)} en concepto de "${d.type}"${d.notes ? ' (' + d.notes + ')' : ''} registrada el ${formatDate(d.date)}.\n\nSu generoso apoyo nos ayuda a continuar fortaleciendo la vida comunitaria y espiritual de nuestra congregación.\n\nQue reciba abundantes bendiciones. ¡Shabat Shalom!\n\nAtentamente,\nStaff de KehiláAdmin`;
  navigator.clipboard.writeText(text).then(() => {
    showToast('Mensaje de agradecimiento copiado');
  });
};

window.copyYahrzeitReminder = function(yahrzeitId) {
  const y = DataStore.getYahrzeits().find(x => x.id === yahrzeitId);
  const m = DataStore.getMembers().find(x => x.id === y.memberId);
  if (!y) return;

  const text = `Estimado/a ${m ? m.name : 'miembro de la comunidad'},\n\nLe escribimos de parte de la Kehilá para recordarle que el próximo ${formatDate(y.gregorianDate)} se conmemora el Yahrzeit de su recordado/a ${y.relation.toLowerCase()}, ${y.deceasedName} (${y.hebrewName || 'Z"L'}).\n\nLe recordamos la importancia de encender la vela de Yahrzeit la víspera de esta fecha al atardecer y rezar en su memoria. Si lo desea, puede asistir a los rezos del Minyán en la sinagoga para recitar el Kadish.\n\nQue su alma repose en paz y su memoria sea para bendición.\n\nAtentamente,\nStaff de KehiláAdmin`;
  navigator.clipboard.writeText(text).then(() => {
    showToast('Recordatorio de Yahrzeit copiado');
  });
};

window.copyBillingReminderTemplate = function(memberId) {
  const m = DataStore.getMembers().find(x => x.id === memberId);
  if (!m) return;

  const currentYear = new Date().getFullYear();
  const text = `Estimado/a ${m.name},\n\nEsperamos que se encuentre muy bien.\n\nLe escribimos de forma cordial desde el área de Tesorería de la Kehilá para comentarle que no registramos su aportación correspondiente a la Cuota Mensual/Anual de Membresía del año ${currentYear}.\n\nPara nosotros es de suma importancia contar con su apoyo regular para poder mantener los servicios, el templo y las actividades educativas de nuestra hermosa comunidad.\n\nSi ya realizó su depósito, le agradeceríamos nos envíe el comprobante de pago para actualizar nuestros registros. De lo contrario, quedamos a su entera disposición para coordinar el pago.\n\nMuchas gracias por su compromiso y apoyo constante.\n\nAtentamente,\nÁrea de Tesorería - KehiláAdmin`;
  navigator.clipboard.writeText(text).then(() => {
    showToast('Recordatorio de cobro copiado');
  });
};

// ------------------------------------------------------------
// Internal Admin - Pestañas y Auditoría de Actividad
// ------------------------------------------------------------
window.switchAdminTab = function(tabName) {
  const usersTab = document.getElementById('admin-users-tab-content');
  const logsTab = document.getElementById('admin-logs-tab-content');
  const usersBtn = document.getElementById('tab-btn-users');
  const logsBtn = document.getElementById('tab-btn-logs');
  const addUserBtn = document.getElementById('btn-add-user');

  if (!usersTab || !logsTab || !usersBtn || !logsBtn) return;

  if (tabName === 'users') {
    usersTab.style.display = 'block';
    logsTab.style.display = 'none';
    if (addUserBtn) addUserBtn.style.display = 'block';

    usersBtn.classList.add('active');
    usersBtn.style.color = 'var(--accent)';
    usersBtn.style.borderBottom = '3px solid var(--accent)';

    logsBtn.classList.remove('active');
    logsBtn.style.color = 'var(--text-muted)';
    logsBtn.style.borderBottom = '3px solid transparent';
    
    renderAdminUsers();
  } else {
    usersTab.style.display = 'none';
    logsTab.style.display = 'block';
    if (addUserBtn) addUserBtn.style.display = 'none';

    logsBtn.classList.add('active');
    logsBtn.style.color = 'var(--accent)';
    logsBtn.style.borderBottom = '3px solid var(--accent)';

    usersBtn.classList.remove('active');
    usersBtn.style.color = 'var(--text-muted)';
    usersBtn.style.borderBottom = '3px solid transparent';
    
    renderAdminLogs();
  }
};

function renderAdminLogs() {
  const tbody = document.getElementById('admin-logs-table-body');
  const clearBtn = document.getElementById('btn-clear-logs');
  if (!tbody) return;

  if (clearBtn && !clearBtn.hasListener) {
    clearBtn.addEventListener('click', () => clearAdminLogs());
    clearBtn.hasListener = true;
  }

  const logs = DataStore.getLogs();
  if (logs.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="3" style="text-align:center; padding:32px; color:var(--text-muted);">
          No hay registros de actividad recientes.
        </td>
      </tr>`;
    return;
  }

  tbody.innerHTML = logs.map(log => {
    const dateObj = new Date(log.timestamp);
    const timeStr = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' ' + dateObj.toLocaleDateString([], { day: '2-digit', month: '2-digit' });
    
    return `
      <tr>
        <td style="font-size:12px; color:var(--text-muted); white-space:nowrap; vertical-align:top; font-weight:500;">
          ${timeStr}
        </td>
        <td style="font-weight:600; font-size:13px; color:var(--text-main); vertical-align:top; white-space:nowrap;">
          @${escapeHtml(log.username)}
        </td>
        <td style="font-size:13px; color:var(--text-muted); line-height:1.4;">
          ${escapeHtml(log.action)}
        </td>
      </tr>`;
  }).join('');
}

function clearAdminLogs() {
  confirmModal('Limpiar Registro', '¿Estás seguro de que deseas limpiar el historial de auditoría? Esta acción no afectará a los miembros ni a las finanzas.', () => {
    DataStore.saveLogs([]);
    renderAdminLogs();
    showToast('Historial de actividad limpiado');
  });
}


// ============================================================
// NEW FEATURES v3.0
// ============================================================

// ------------------------------------------------------------
// Data Backup & Restore
// ------------------------------------------------------------
function exportAllData() {
  const data = {};
  const keys = ['members', 'donations', 'yahrzeits', 'messages', 'users', 'tasks', 'logs', 'theme', 'current_user', 'dismissed_notifications', 'custom_events'];
  keys.forEach(k => {
    const val = localStorage.getItem('kehila_' + k);
    if (val) data[k] = JSON.parse(val);
  });
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `kehila_backup_${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
  DataStore.addLog('Exportó una copia de seguridad de los datos');
  showToast('Copia de seguridad descargada correctamente');
}

function importAllData() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';
  input.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target.result);
        const validKeys = ['members', 'donations', 'yahrzeits', 'messages', 'users', 'tasks', 'logs', 'theme', 'current_user', 'dismissed_notifications', 'custom_events'];
        Object.keys(data).forEach(k => {
          if (validKeys.includes(k)) {
            localStorage.setItem('kehila_' + k, JSON.stringify(data[k]));
          }
        });
        DataStore.addLog('Restauró datos desde una copia de seguridad');
        showToast('Datos restaurados correctamente. Recargando...', 'success');
        setTimeout(() => location.reload(), 1500);
      } catch (err) {
        showToast('Error: El archivo no es un backup válido', 'error');
      }
    };
    reader.readAsText(file);
  });
  input.click();
}

// ------------------------------------------------------------
// Global Search
// ------------------------------------------------------------
function initGlobalSearch() {
  const searchInput = document.querySelector('.search-bar input');
  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.trim().toLowerCase();
    let dropdown = document.getElementById('global-search-dropdown');
    if (dropdown) dropdown.remove();
    if (query.length < 2) return;

    const results = [];

    DataStore.getMembers().forEach(m => {
      if (m.name.toLowerCase().includes(query) || m.family.toLowerCase().includes(query) || m.email.toLowerCase().includes(query)) {
        results.push({ type: 'Miembro', icon: 'ph-user', label: m.name, sub: m.family, view: 'members' });
      }
    });

    DataStore.getDonations().forEach(d => {
      if (d.memberName.toLowerCase().includes(query) || d.type.toLowerCase().includes(query) || (d.notes && d.notes.toLowerCase().includes(query))) {
        results.push({ type: 'Finanza', icon: 'ph-coins', label: `${d.memberName} — ${formatCurrency(d.amount)}`, sub: `${d.type} · ${formatDateShort(d.date)}`, view: 'finances' });
      }
    });

    DataStore.getYahrzeits().forEach(y => {
      if (y.deceasedName.toLowerCase().includes(query) || (y.hebrewName && y.hebrewName.toLowerCase().includes(query))) {
        results.push({ type: 'Yahrzeit', icon: 'ph-candle', label: y.deceasedName, sub: y.hebrewName || y.relation, view: 'yahrzeits' });
      }
    });

    DataStore.getMessages().forEach(msg => {
      if (msg.subject.toLowerCase().includes(query) || msg.body.toLowerCase().includes(query)) {
        results.push({ type: 'Mensaje', icon: 'ph-envelope', label: msg.subject, sub: msg.recipients, view: 'communications' });
      }
    });

    if (results.length === 0) return;

    dropdown = document.createElement('div');
    dropdown.id = 'global-search-dropdown';
    dropdown.className = 'global-search-dropdown';
    dropdown.innerHTML = results.slice(0, 8).map(r => {
      let badgeStyle = 'background:var(--bg-main); color:var(--text-muted);';
      if (r.type === 'Miembro') badgeStyle = 'background:var(--info-bg); color:var(--info);';
      else if (r.type === 'Finanza') badgeStyle = 'background:var(--success-bg); color:var(--success);';
      else if (r.type === 'Yahrzeit') badgeStyle = 'background:var(--danger-bg); color:var(--danger);';
      else if (r.type === 'Mensaje') badgeStyle = 'background:var(--warning-bg); color:var(--warning);';
      
      return `
        <div class="search-result-item" data-view="${r.view}">
          <div class="result-icon">
            <i class="ph ${r.icon}"></i>
          </div>
          <div class="result-info">
            <div class="result-name">${escapeHtml(r.label)}</div>
            <div class="result-detail">${escapeHtml(r.sub)}</div>
          </div>
          <span class="result-type-badge" style="${badgeStyle}">${escapeHtml(r.type)}</span>
        </div>
      `;
    }).join('');

    searchInput.parentElement.style.position = 'relative';
    searchInput.parentElement.appendChild(dropdown);

    dropdown.querySelectorAll('.search-result-item').forEach(item => {
      item.addEventListener('click', () => {
        const view = item.getAttribute('data-view');
        searchInput.value = '';
        dropdown.remove();
        document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
        const navTarget = document.querySelector(`.nav-item[data-view="${view}"]`);
        if (navTarget) navTarget.classList.add('active');
        renderView(view);
      });
    });
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-bar')) {
      const dd = document.getElementById('global-search-dropdown');
      if (dd) dd.remove();
    }
  });
}

// ------------------------------------------------------------
// Member Donation History
// ------------------------------------------------------------
window.showMemberDonationHistory = function(memberId) {
  const member = DataStore.getMembers().find(m => m.id === memberId);
  const donations = DataStore.getDonations().filter(d => d.memberId === memberId).sort((a,b) => new Date(b.date) - new Date(a.date));
  if (!member) return;

  const total = donations.reduce((s, d) => s + d.amount, 0);
  let bodyHtml = '';
  if (donations.length === 0) {
    bodyHtml = '<p style="text-align:center;color:var(--text-muted);padding:16px;">No hay aportes registrados para este miembro.</p>';
  } else {
    bodyHtml = `
      <div style="background:rgba(212,175,55,0.05);border:1px solid rgba(212,175,55,0.2);border-radius:10px;padding:12px 16px;margin-bottom:16px;display:flex;justify-content:space-between;align-items:center;">
        <span style="font-weight:600;font-size:14px;color:var(--text-main);">Total acumulado</span>
        <span style="font-weight:700;font-size:18px;color:var(--accent);">${formatCurrency(total)}</span>
      </div>
      <div style="max-height:300px;overflow-y:auto;display:flex;flex-direction:column;gap:8px;">
        ${donations.map(d => `
          <div style="display:flex;justify-content:space-between;align-items:center;padding:10px 12px;border:1px solid var(--border-color);border-radius:8px;">
            <div>
              <div style="font-weight:600;font-size:13px;color:var(--text-main);">${escapeHtml(d.type)}</div>
              <div style="font-size:11px;color:var(--text-muted);margin-top:2px;">${formatDate(d.date)}${d.notes ? ' · ' + escapeHtml(d.notes) : ''}</div>
            </div>
            <span style="font-weight:700;font-size:14px;color:var(--success);">${formatCurrency(d.amount)}</span>
          </div>
        `).join('')}
      </div>
    `;
  }

  if (member.notes) {
    bodyHtml += `
      <div style="margin-top:16px;padding:12px;background:rgba(49,130,206,0.05);border:1px solid rgba(49,130,206,0.15);border-radius:10px;">
        <div style="font-weight:600;font-size:12px;color:var(--info);margin-bottom:6px;display:flex;align-items:center;gap:6px;"><i class="ph ph-note-pencil"></i> Notas Internas</div>
        <p style="font-size:13px;color:var(--text-muted);line-height:1.5;margin:0;">${escapeHtml(member.notes)}</p>
      </div>
    `;
  }

  openModal(`Historial de Aportes — ${escapeHtml(member.name)}`, bodyHtml, null);
};

// ------------------------------------------------------------
// Custom Calendar Events
// ------------------------------------------------------------
function openCustomEventModal() {
  const bodyHtml = `
    <div class="form-grid">
      <div class="form-group">
        <label for="modal-event-title">Título del Evento</label>
        <input type="text" id="modal-event-title" class="form-input" placeholder="Ej: Cena Comunitaria de Pésaj">
      </div>
      <div class="form-group">
        <label for="modal-event-date">Fecha</label>
        <input type="date" id="modal-event-date" class="form-input" value="${new Date().toISOString().split('T')[0]}">
      </div>
      <div class="form-group form-group-full">
        <label for="modal-event-desc">Descripción (opcional)</label>
        <textarea id="modal-event-desc" class="form-input" rows="2" placeholder="Detalles del evento..." style="resize:vertical;"></textarea>
      </div>
    </div>
  `;

  openModal('Nuevo Evento Comunitario', bodyHtml, () => {
    const title = document.getElementById('modal-event-title')?.value.trim();
    const date = document.getElementById('modal-event-date')?.value;
    const description = document.getElementById('modal-event-desc')?.value.trim();

    if (!title || !date) {
      showToast('El título y la fecha son obligatorios', 'error');
      return;
    }

    const events = DataStore.getCustomEvents();
    events.push({ id: generateId(), title, date, description });
    DataStore.saveCustomEvents(events);
    DataStore.addLog(`Creó el evento comunitario: ${title}`);
    closeModal();
    showToast('Evento creado correctamente');
    renderCalendarGrid();
    loadCalendarData();
  });
}

// ------------------------------------------------------------
// Sidebar Toggle
// ------------------------------------------------------------
function initSidebarToggle() {
  const btn = document.getElementById('sidebar-toggle');
  const sidebar = document.querySelector('.sidebar');
  if (!btn || !sidebar) return;

  btn.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
  });
}

// ------------------------------------------------------------
// Print Report
// ------------------------------------------------------------
function printReport(viewName) {
  document.body.classList.add('printing');
  document.body.setAttribute('data-print-view', viewName);
  window.print();
  setTimeout(() => {
    document.body.classList.remove('printing');
    document.body.removeAttribute('data-print-view');
  }, 500);
}
