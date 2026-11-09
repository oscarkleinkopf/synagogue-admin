import { attendanceHistoryHtml } from './lib/attendance-view.js';

const STAFF_TOKEN_KEY = 'kehila_staff_api_token';

let staffSession = null;

function staffHeaders(extra = {}) {
    const headers = { ...extra };
    if (staffSession?.kind === 'token' && staffSession.token) {
        headers.Authorization = `Bearer ${staffSession.token}`;
    }
    return headers;
}

function staffFetch(url, options = {}) {
    return fetch(url, {
        ...options,
        credentials: 'include',
        headers: staffHeaders(options.headers),
    });
}

function setStaffLoginError(message) {
    const errorEl = document.getElementById('staff-login-error');
    if (!errorEl) return;
    if (message) {
        errorEl.hidden = false;
        errorEl.textContent = message;
    } else {
        errorEl.hidden = true;
        errorEl.textContent = '';
    }
}

function renderStaffAuthPanel() {
    const loginForm = document.getElementById('staff-login-form');
    const sessionEl = document.getElementById('staff-session');
    const nameEl = document.getElementById('current-user-name');
    const roleEl = document.getElementById('current-user-role');
    const avatarEl = document.getElementById('current-user-avatar');

    if (staffSession) {
        if (loginForm) loginForm.hidden = true;
        if (sessionEl) sessionEl.hidden = false;
        if (nameEl) {
            nameEl.textContent = staffSession.name || staffSession.email || 'Staff';
        }
        if (roleEl) roleEl.textContent = staffSession.kind === 'token' ? 'Token de staff' : 'Staff';
        if (avatarEl) {
            const label = staffSession.name || staffSession.email || 'ST';
            avatarEl.textContent = label.slice(0, 2).toUpperCase();
        }
    } else {
        if (loginForm) loginForm.hidden = false;
        if (sessionEl) sessionEl.hidden = true;
        if (nameEl) nameEl.textContent = 'Sin sesión';
        if (roleEl) roleEl.textContent = 'Requiere staff';
        if (avatarEl) avatarEl.textContent = '--';
    }
}

async function restoreStaffSession() {
    const storedToken = sessionStorage.getItem(STAFF_TOKEN_KEY);
    if (storedToken) {
        staffSession = { kind: 'token', token: storedToken, name: 'Staff' };
        renderStaffAuthPanel();
        return;
    }

    try {
        const res = await staffFetch('/api/auth/me');
        if (!res.ok) {
            staffSession = null;
            renderStaffAuthPanel();
            return;
        }
        const profile = await res.json();
        staffSession = {
            kind: 'identity',
            email: profile.email,
            name: profile.name || profile.email,
        };
    } catch {
        staffSession = null;
    }
    renderStaffAuthPanel();
}

async function loginWithIdentity(email, password) {
    const res = await staffFetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });
    if (res.status === 403) {
        throw new Error('Esta cuenta no tiene rol de staff.');
    }
    if (!res.ok) {
        throw new Error('No se pudo iniciar sesión. Revisa las credenciales o usa un token de staff.');
    }
    const profile = await res.json();
    sessionStorage.removeItem(STAFF_TOKEN_KEY);
    staffSession = {
        kind: 'identity',
        email: profile.email,
        name: profile.name || profile.email,
    };
}

function loginWithStaffToken(token) {
    const value = String(token || '').trim();
    if (!value) {
        throw new Error('Ingresa un token de staff.');
    }
    sessionStorage.setItem(STAFF_TOKEN_KEY, value);
    staffSession = { kind: 'token', token: value, name: 'Staff' };
}

async function logoutStaff() {
    sessionStorage.removeItem(STAFF_TOKEN_KEY);
    try {
        await staffFetch('/api/auth/logout', { method: 'POST' });
    } catch {
        // Local session is cleared even if Identity logout fails.
    }
    staffSession = null;
}

function initStaffAuth() {
    const loginForm = document.getElementById('staff-login-form');
    const tokenToggle = document.getElementById('staff-token-toggle');
    const tokenRow = document.getElementById('staff-token-row');
    const tokenSubmit = document.getElementById('staff-token-submit');
    const logoutBtn = document.getElementById('staff-logout');

    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            setStaffLoginError('');
            const email = document.getElementById('staff-email')?.value || '';
            const password = document.getElementById('staff-password')?.value || '';
            try {
                await loginWithIdentity(email, password);
                renderStaffAuthPanel();
                if (state.currentView === 'kids') loadAttendance();
            } catch (err) {
                setStaffLoginError(err.message);
            }
        });
    }

    if (tokenToggle && tokenRow) {
        tokenToggle.addEventListener('click', () => {
            tokenRow.hidden = !tokenRow.hidden;
        });
    }

    if (tokenSubmit) {
        tokenSubmit.addEventListener('click', () => {
            setStaffLoginError('');
            try {
                loginWithStaffToken(document.getElementById('staff-token')?.value || '');
                renderStaffAuthPanel();
                if (state.currentView === 'kids') loadAttendance();
            } catch (err) {
                setStaffLoginError(err.message);
            }
        });
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', async () => {
            await logoutStaff();
            renderStaffAuthPanel();
            attendanceCache = [];
            if (state.currentView === 'kids') {
                renderAttendanceHistory();
                drawAttendanceChart();
            }
        });
    }
}

function boot() {
    initStaffAuth();
    renderStaffAuthPanel();
    restoreStaffSession().then(() => {
        if (state.currentView === 'kids') loadAttendance();
    });
    initNavigation();
    renderView(state.currentView);
}

// Mock Data
const mockYahrzeits = [
    { name: "Isaac Cohen", relation: "Padre de David Cohen", date: "15 Mayo 2026", days: 4, type: "primary" },
    { name: "Sarah Levy", relation: "Madre de Raquel Levy", date: "18 Mayo 2026", days: 7, type: "warning" },
    { name: "Abraham Goldstein", relation: "Abuelo de J. Goldstein", date: "22 Mayo 2026", days: 11, type: "neutral" }
];

const mockServices = [
    { title: "Kabbalat Shabbat", time: "Viernes, 19:30 hrs", location: "Santuario Principal", tag: "Shabbat" },
    { title: "Shacharit", time: "Sábado, 09:00 hrs", location: "Santuario Principal", tag: "Shabbat" },
    { title: "Clase de Torá", time: "Martes, 20:00 hrs", location: "Biblioteca", tag: "Estudio" }
];

const mockMembers = [
    { id: 1, name: "David Cohen", family: "Familia Cohen", email: "david.cohen@email.com", phone: "+1 555-0101", status: "active" },
    { id: 2, name: "Raquel Levy", family: "Familia Levy", email: "raquel.l@email.com", phone: "+1 555-0102", status: "active" },
    { id: 3, name: "Moisés Rosenberg", family: "Familia Rosenberg", email: "moises@email.com", phone: "+1 555-0103", status: "inactive" },
    { id: 4, name: "Rebeca Stern", family: "Familia Stern", email: "r.stern@email.com", phone: "+1 555-0104", status: "active" },
    { id: 5, name: "Aarón Kaplan", family: "Familia Kaplan", email: "aaron.k@email.com", phone: "+1 555-0105", status: "active" }
];

// App State
const state = {
    currentView: 'dashboard'
};

// DOM Elements
const viewContainer = document.getElementById('view-container');
const navItems = document.querySelectorAll('.nav-item');

// Initialization
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
} else {
    boot();
}

// Navigation Logic
function initNavigation() {
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const view = e.currentTarget.getAttribute('data-view');
            
            if (view && view !== state.currentView) {
                // Update active state in sidebar
                navItems.forEach(nav => nav.classList.remove('active'));
                e.currentTarget.classList.add('active');
                
                // Render new view
                renderView(view);
            }
        });
    });
}

// View Renderer
function renderView(viewName) {
    state.currentView = viewName;
    
    // Smooth transition
    viewContainer.style.opacity = 0;
    
    setTimeout(() => {
        // Find the template
        const templateId = `view-${viewName}`;
        const template = document.getElementById(templateId);
        
        if (template) {
            // Clone template content
            const content = template.content.cloneNode(true);
            viewContainer.innerHTML = '';
            viewContainer.appendChild(content);
            
            // Initialize specific view logic
            if (viewName === 'dashboard') {
                initDashboard();
            } else if (viewName === 'members') {
                initMembers();
            } else if (viewName === 'kids') {
                initKidsView();
            }
        } else {
            // Fallback for unimplemented views
            viewContainer.innerHTML = `
                <div class="view-header">
                    <h2 class="view-title">Vista en Desarrollo</h2>
                    <p class="view-subtitle">El módulo "${viewName}" estará disponible próximamente.</p>
                </div>
            `;
        }
        
        viewContainer.style.opacity = 1;
    }, 150);
}

// Dashboard Initialization
function initDashboard() {
    const yahrzeitList = document.getElementById('yahrzeit-list');
    const servicesList = document.getElementById('services-list');
    
    // Render Yahrzeits
    if (yahrzeitList) {
        yahrzeitList.innerHTML = mockYahrzeits.map(y => `
            <li class="list-item">
                <div class="item-icon"><i class="ph ph-candle"></i></div>
                <div class="item-content">
                    <div class="item-title">${y.name}</div>
                    <div class="item-desc">${y.relation}</div>
                </div>
                <div class="item-meta">
                    <div style="font-weight: 500; font-size: 14px;">${y.date}</div>
                    <span class="badge-tag badge-${y.type}">Faltan ${y.days} días</span>
                </div>
            </li>
        `).join('');
    }
    
    // Render Services
    if (servicesList) {
        servicesList.innerHTML = mockServices.map(s => `
            <li class="list-item">
                <div class="item-icon"><i class="ph ph-book-open"></i></div>
                <div class="item-content">
                    <div class="item-title">${s.title}</div>
                    <div class="item-desc"><i class="ph ph-map-pin"></i> ${s.location}</div>
                </div>
                <div class="item-meta">
                    <div style="font-weight: 500; font-size: 14px; margin-bottom: 4px;">${s.time}</div>
                    <span class="badge-tag badge-primary">${s.tag}</span>
                </div>
            </li>
        `).join('');
    }
}

// Members Initialization
function initMembers() {
    const membersTableBody = document.getElementById('members-table-body');
    
    if (membersTableBody) {
        membersTableBody.innerHTML = mockMembers.map(m => {
            const initials = m.name.split(' ').map(n => n[0]).join('').substring(0, 2);
            const statusHtml = m.status === 'active' 
                ? `<div class="status-indicator"><div class="status-dot active"></div>Activo</div>`
                : `<div class="status-indicator"><div class="status-dot inactive"></div>Inactivo</div>`;
                
            return `
                <tr>
                    <td>
                        <div class="member-cell">
                            <div class="member-avatar">${initials}</div>
                            <div>
                                <div class="member-name">${m.name}</div>
                                <div class="member-email">${m.email}</div>
                            </div>
                        </div>
                    </td>
                    <td>${m.family}</td>
                    <td>${m.phone}</td>
                    <td>${statusHtml}</td>
                    <td>
                        <div class="action-buttons">
                            <button class="btn-small-icon" title="Editar"><i class="ph ph-pencil-simple"></i></button>
                            <button class="btn-small-icon" title="Ver Perfil"><i class="ph ph-eye"></i></button>
                        </div>
                    </td>
                </tr>
            `;
        }).join('');
    }
}

// Kids View Initialization (Shabat Infantil Asistencia)
let attendanceCount = 0;
let attendanceCache = [];

function initKidsView() {
    const minusBtn = document.getElementById('att-minus');
    const plusBtn = document.getElementById('att-plus');
    const countDisplay = document.getElementById('att-count-display');
    const saveBtn = document.getElementById('btn-save-attendance');
    const dateInput = document.getElementById('att-date');

    // Default value of date input to today
    if (dateInput) {
        const today = new Date();
        const y = today.getFullYear();
        const m = String(today.getMonth() + 1).padStart(2, '0');
        const d = String(today.getDate()).padStart(2, '0');
        dateInput.value = `${y}-${m}-${d}`;
    }

    attendanceCount = 0;
    if (countDisplay) countDisplay.textContent = '0';

    if (minusBtn) {
        minusBtn.onclick = () => {
            if (attendanceCount > 0) {
                attendanceCount--;
                if (countDisplay) countDisplay.textContent = attendanceCount;
            }
        };
    }

    if (plusBtn) {
        plusBtn.onclick = () => {
            attendanceCount++;
            if (countDisplay) countDisplay.textContent = attendanceCount;
        };
    }

    if (saveBtn) {
        saveBtn.onclick = saveAttendanceRecord;
    }

    loadAttendance();
}

async function loadAttendance() {
    const container = document.getElementById('attendance-history-list');

    if (!staffSession) {
        attendanceCache = [];
        if (container) {
            container.textContent = 'Inicia sesión con una cuenta de staff para ver y registrar asistencia.';
        }
        drawAttendanceChart();
        return;
    }

    try {
        const res = await staffFetch('/api/attendance');
        if (res.status === 401 || res.status === 403) {
            staffSession = null;
            sessionStorage.removeItem(STAFF_TOKEN_KEY);
            renderStaffAuthPanel();
            attendanceCache = [];
            if (container) {
                container.textContent = 'Inicia sesión con una cuenta de staff para ver y registrar asistencia.';
            }
            drawAttendanceChart();
            return;
        }
        if (!res.ok) throw new Error('No se pudo cargar la asistencia');
        const rows = await res.json();
        attendanceCache = rows.map(r => ({
            date: typeof r.event_date === 'string' ? r.event_date.slice(0, 10) : r.event_date,
            count: r.count,
            notes: r.notes || '',
            parasha: r.parasha || ''
        })).slice(-12);
        localStorage.setItem('shabat_attendance_admin', JSON.stringify(attendanceCache));
    } catch (err) {
        console.warn("Usando respaldo local:", err);
        try {
            attendanceCache = JSON.parse(localStorage.getItem('shabat_attendance_admin') || '[]');
        } catch {
            attendanceCache = [];
        }
    }

    renderAttendanceHistory();
    drawAttendanceChart();
}

async function saveAttendanceRecord() {
    const dateInput = document.getElementById('att-date');
    const notesInput = document.getElementById('att-notes');
    const dateVal = dateInput ? dateInput.value : '';
    const notes = notesInput ? notesInput.value : '';

    if (!staffSession) {
        alert('Inicia sesión con una cuenta de staff para registrar asistencia.');
        return;
    }

    if (!dateVal || attendanceCount <= 0) {
        alert('Por favor, ingresa una fecha y cantidad de niños mayor a 0.');
        return;
    }

    const record = {
        date: dateVal,
        count: attendanceCount,
        notes: notes,
        parasha: 'Noaj' // Se asume Noaj por defecto o dinámica
    };

    try {
        const res = await staffFetch('/api/attendance', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(record)
        });
        if (res.status === 401 || res.status === 403) {
            alert('No autorizado. Inicia sesión como staff e inténtalo de nuevo.');
            return;
        }
        if (!res.ok) throw new Error('Error al guardar');
        alert('✅ Registro guardado exitosamente.');
        
        // Reset count
        attendanceCount = 0;
        const countDisplay = document.getElementById('att-count-display');
        if (countDisplay) countDisplay.textContent = '0';
        if (notesInput) notesInput.value = '';

        await loadAttendance();
    } catch (err) {
        alert('⚠️ Error al conectar con el servidor. Se guardará localmente.');
        attendanceCache.push(record);
        while (attendanceCache.length > 12) attendanceCache.shift();
        localStorage.setItem('shabat_attendance_admin', JSON.stringify(attendanceCache));
        
        // Reset count
        attendanceCount = 0;
        const countDisplay = document.getElementById('att-count-display');
        if (countDisplay) countDisplay.textContent = '0';
        if (notesInput) notesInput.value = '';

        renderAttendanceHistory();
        drawAttendanceChart();
    }
}

function renderAttendanceHistory() {
    const container = document.getElementById('attendance-history-list');
    if (!container) return;

    container.innerHTML = attendanceHistoryHtml(attendanceCache);
}

function drawAttendanceChart() {
    const canvas = document.getElementById('attendance-chart-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    // Configurar dimensiones
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = 180;
    const W = canvas.width;
    const H = canvas.height;

    ctx.clearRect(0, 0, W, H);

    if (attendanceCache.length === 0) {
        ctx.fillStyle = '#94a3b8';
        ctx.font = '13px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Sin datos de asistencia', W / 2, H / 2);
        return;
    }

    const maxCount = Math.max(...attendanceCache.map(r => r.count), 10);
    const startX = 30;
    const chartW = W - startX - 10;
    const chartH = H - 30;

    // Grid lines
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 3; i++) {
        const y = 10 + (chartH / 3) * i;
        ctx.beginPath();
        ctx.moveTo(startX, y);
        ctx.lineTo(W - 10, y);
        ctx.stroke();

        ctx.fillStyle = '#94a3b8';
        ctx.font = '10px Inter';
        ctx.textAlign = 'right';
        ctx.fillText(Math.round(maxCount - (maxCount / 3) * i), startX - 6, y + 3);
    }

    // Dibujar barras
    const barWidth = Math.min(28, chartW / attendanceCache.length - 8);
    attendanceCache.forEach((r, i) => {
        const barH = (r.count / maxCount) * chartH;
        const x = startX + i * (chartW / attendanceCache.length) + 4;
        const y = 10 + chartH - barH;

        // Barra con gradiente
        const grad = ctx.createLinearGradient(x, y, x, y + barH);
        grad.addColorStop(0, '#D4AF37'); // Accent color of synagogue-admin
        grad.addColorStop(1, '#92400E');
        ctx.fillStyle = grad;
        
        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, barH, [4, 4, 0, 0]);
        ctx.fill();

        // Valor
        ctx.fillStyle = '#1f2937';
        ctx.font = 'bold 10px Inter';
        ctx.textAlign = 'center';
        ctx.fillText(r.count, x + barWidth / 2, y - 4);

        // Etiqueta de fecha
        const dateParts = r.date.split('-');
        const dateLabel = dateParts.length === 3 ? `${dateParts[2]}/${dateParts[1]}` : r.date;
        ctx.fillStyle = '#6b7280';
        ctx.font = '9px Inter';
        ctx.fillText(dateLabel, x + barWidth / 2, H - 6);
    });
}
