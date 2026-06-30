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
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    renderView(state.currentView);
});

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
