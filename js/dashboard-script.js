// Variables globales
let currentUser = null;
let appointments = JSON.parse(localStorage.getItem('appointments')) || [];
let waitingList = JSON.parse(localStorage.getItem('waitingList')) || [];
let artists = JSON.parse(localStorage.getItem('artists')) || [
    {
        id: 1,
        name: "Alex Rivera",
        specialty: "Realismo en Blanco y Negro",
        experience: 8,
        rate: 150,
        bio: "Especialista en tatuajes hiperrealistas en blanco y negro.",
        instagram: "@alex_tattoos",
        availability: "Martes - Sábado",
        active: true
    },
    {
        id: 2,
        name: "Sophia Chen",
        specialty: "Tradicional Japonés",
        experience: 12,
        rate: 160,
        bio: "Maestra del arte del tatuaje tradicional japonés.",
        instagram: "@sophia_ink",
        availability: "Lunes - Viernes",
        active: true
    },
    {
        id: 3,
        name: "Marcus Johnson",
        specialty: "Neo Tradicional",
        experience: 5,
        rate: 140,
        bio: "Artista especializado en estilo neo-tradicional.",
        instagram: "@marcus_tattoo",
        availability: "Miércoles - Domingo",
        active: true
    }
];

let calendar = null;
let currentSection = 'overview';

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    initializeDashboard();
});

function initializeDashboard() {
    setupEventListeners();
    checkAuthentication();
}

// Configurar event listeners
function setupEventListeners() {
    // Login form
    document.getElementById('login-form').addEventListener('submit', handleLogin);
    
    // Logout button
    document.getElementById('logout-btn').addEventListener('click', handleLogout);
    
    // Navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', handleNavigation);
    });
    
    // Sidebar toggle
    document.querySelector('.sidebar-toggle').addEventListener('click', toggleSidebar);
    
    // Modal close buttons
    document.querySelectorAll('.close').forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            closeModal(modal.id);
        });
    });
    
    // Forms
    setupForms();
    
    // Filters
    setupFilters();
}

// Autenticación
function checkAuthentication() {
    const savedUser = localStorage.getItem('dashboardUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        showDashboard();
    } else {
        showLogin();
    }
}

function handleLogin(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get('username');
    const password = formData.get('password');

    fetch('/Tatus_Stdudio/php/credenciales/login_validate.php.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            currentUser = data.user;
            localStorage.setItem('dashboardUser', JSON.stringify(currentUser));
            showDashboard();
            showNotification('Bienvenido al dashboard', 'success');
        } else {
            showNotification(data.message || 'Error al iniciar sesión', 'error');
        }
    })
    .catch(error => {
        console.error('Error en login:', error);
        showNotification('Error del servidor. Intenta más tarde.', 'error');
    });
}


function handleLogout() {
    currentUser = null;
    localStorage.removeItem('dashboardUser');
    showLogin();
    showNotification('Sesión cerrada correctamente', 'success');
}

function showLogin() {
    document.getElementById('login-screen').classList.remove('hidden');
    document.getElementById('dashboard-main').classList.add('hidden');
}

function showDashboard() {
    document.getElementById('login-screen').classList.add('hidden');
    document.getElementById('dashboard-main').classList.remove('hidden');
    loadDashboardData();
}

// Navegación
function handleNavigation(e) {
    e.preventDefault();
    const section = this.getAttribute('data-section');
    showSection(section);
    
    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    this.classList.add('active');
    
    // Update page title
    const titles = {
        'overview': 'Resumen',
        'appointments': 'Gestión de Citas',
        'waiting-list': 'Lista de Espera',
        'calendar': 'Calendario',
        'artists': 'Gestión de Artistas',
        'clients': 'Base de Clientes',
        'reports': 'Reportes y Estadísticas',
        'settings': 'Configuración'
    };
    
    document.getElementById('page-title').textContent = titles[section] || section;
}

function showSection(section) {
    currentSection = section;
    
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(sec => {
        sec.classList.remove('active');
    });
    
    // Show selected section
    const targetSection = document.getElementById(`${section}-section`);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Load section-specific data
    switch(section) {
        case 'overview':
            loadOverviewData();
            break;
        case 'appointments':
            loadAppointmentsData();
            break;
        case 'waiting-list':
            loadWaitingListData();
            break;
        case 'calendar':
            loadCalendar();
            break;
        case 'artists':
            loadArtistsData();
            break;
        case 'clients':
            loadClientsData();
            break;
        case 'reports':
            loadReportsData();
            break;
        case 'settings':
            loadSettingsData();
            break;
    }
}

function toggleSidebar() {
    document.querySelector('.sidebar').classList.toggle('active');
}

// Cargar datos del dashboard
function loadDashboardData() {
    updateStats();
    loadOverviewData();
    populateArtistSelects();
}

function updateStats() {
    const totalAppointments = appointments.length;
    const pendingAppointments = appointments.filter(apt => apt.status === 'pendiente').length;
    const waitingListCount = waitingList.length;
    const monthlyRevenue = calculateMonthlyRevenue();
    
    document.getElementById('total-appointments').textContent = totalAppointments;
    document.getElementById('pending-appointments').textContent = pendingAppointments;
    document.getElementById('waiting-list-count').textContent = waitingListCount;
    document.getElementById('monthly-revenue').textContent = `$${monthlyRevenue}`;
}

function calculateMonthlyRevenue() {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    return appointments
        .filter(apt => {
            const aptDate = new Date(apt.appointmentDate);
            return aptDate.getMonth() === currentMonth && 
                   aptDate.getFullYear() === currentYear &&
                   apt.status === 'completada';
        })
        .reduce((total, apt) => total + (apt.finalPrice || apt.estimatedPrice || 150), 0);
}

// Sección Overview
function loadOverviewData() {
    loadTodayAppointments();
    loadRecentActivity();
    loadPopularArtists();
}

function loadTodayAppointments() {
    const today = new Date().toISOString().split('T')[0];
    const todayAppointments = appointments.filter(apt => apt.appointmentDate === today);
    
    const container = document.getElementById('today-appointments');
    container.innerHTML = '';
    
    if (todayAppointments.length === 0) {
        container.innerHTML = '<p class="text-center text-gray-500">No hay citas para hoy</p>';
        return;
    }
    
    todayAppointments.forEach(apt => {
        const artist = artists.find(a => a.id == apt.artistSelect);
        const appointmentElement = document.createElement('div');
        appointmentElement.className = 'appointment-item';
        appointmentElement.innerHTML = `
            <h4>${apt.clientName}</h4>
            <p><strong>Artista:</strong> ${artist ? artist.name : 'No asignado'}</p>
            <p><strong>Hora:</strong> ${apt.appointmentTime}</p>
            <p><strong>Estado:</strong> <span class="status-badge status-${apt.status}">${apt.status}</span></p>
        `;
        container.appendChild(appointmentElement);
    });
}

function loadRecentActivity() {
    const container = document.getElementById('recent-activity');
    container.innerHTML = '';
    
    // Combinar citas y lista de espera para actividad reciente
    const recentItems = [
        ...appointments.slice(-5).map(apt => ({
            type: 'appointment',
            text: `Nueva cita: ${apt.clientName}`,
            time: new Date(apt.createdAt).toLocaleDateString()
        })),
        ...waitingList.slice(-3).map(wait => ({
            type: 'waiting',
            text: `Lista de espera: ${wait.waitName}`,
            time: new Date(wait.createdAt).toLocaleDateString()
        }))
    ].sort((a, b) => new Date(b.time) - new Date(a.time)).slice(0, 5);
    
    recentItems.forEach(item => {
        const activityElement = document.createElement('div');
        activityElement.className = 'activity-item';
        activityElement.innerHTML = `
            <h4>${item.text}</h4>
            <p>${item.time}</p>
        `;
        container.appendChild(activityElement);
    });
}

function loadPopularArtists() {
    const container = document.getElementById('popular-artists');
    container.innerHTML = '';
    
    // Contar citas por artista
    const artistStats = {};
    appointments.forEach(apt => {
        const artistId = apt.artistSelect;
        artistStats[artistId] = (artistStats[artistId] || 0) + 1;
    });
    
    // Ordenar por popularidad
    const sortedArtists = Object.entries(artistStats)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 3);
    
    sortedArtists.forEach(([artistId, count]) => {
        const artist = artists.find(a => a.id == artistId);
        if (artist) {
            const artistElement = document.createElement('div');
            artistElement.className = 'artist-stat-item';
            artistElement.innerHTML = `
                <span class="name">${artist.name}</span>
                <span class="count">${count}</span>
            `;
            container.appendChild(artistElement);
        }
    });
}

// Sección Appointments
function loadAppointmentsData() {
    populateAppointmentsTable();
    populateArtistFilter();
}

function populateAppointmentsTable(filteredAppointments = null) {
    const tbody = document.getElementById('appointments-table-body');
    tbody.innerHTML = '';
    
    const appointmentsToShow = filteredAppointments || appointments;
    
    appointmentsToShow.forEach(apt => {
        const artist = artists.find(a => a.id == apt.artistSelect);
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>#${apt.id}</td>
            <td>
                <div>
                    <strong>${apt.clientName}</strong><br>
                    <small>${apt.clientEmail}</small>
                </div>
            </td>
            <td>${artist ? artist.name : 'No asignado'}</td>
            <td>${new Date(apt.appointmentDate).toLocaleDateString()}</td>
            <td>${apt.appointmentTime}</td>
            <td><span class="status-badge status-${apt.status}">${apt.status}</span></td>
            <td>
                <div class="action-buttons">
                    <button class="action-btn btn-primary" onclick="editAppointment(${apt.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn btn-success" onclick="confirmAppointment(${apt.id})">
                        <i class="fas fa-check"></i>
                    </button>
                    <button class="action-btn btn-danger" onclick="cancelAppointment(${apt.id})">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function populateArtistFilter() {
    const select = document.getElementById('artist-filter');
    select.innerHTML = '<option value="all">Todos</option>';
    
    artists.forEach(artist => {
        const option = document.createElement('option');
        option.value = artist.id;
        option.textContent = artist.name;
        select.appendChild(option);
    });
}

// Sección Waiting List
function loadWaitingListData() {
    populateWaitingListTable();
}

function populateWaitingListTable() {
    const tbody = document.getElementById('waiting-list-table-body');
    tbody.innerHTML = '';
    
    waitingList.forEach(wait => {
        const artist = artists.find(a => a.id == wait.waitArtist);
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>#${wait.id}</td>
            <td>
                <div>
                    <strong>${wait.waitName}</strong><br>
                    <small>${wait.waitEmail}</small>
                </div>
            </td>
            <td>${artist ? artist.name : 'No especificado'}</td>
            <td>
                <span class="status-badge status-${wait.urgency}">
                    ${wait.urgency === 'asap' ? 'Urgente' : 
                      wait.urgency === 'month' ? 'Un mes' : 'Flexible'}
                </span>
            </td>
            <td>${new Date(wait.createdAt).toLocaleDateString()}</td>
            <td>
                <div class="action-buttons">
                    <button class="action-btn btn-primary" onclick="contactWaitingClient(${wait.id})">
                        <i class="fas fa-phone"></i>
                    </button>
                    <button class="action-btn btn-success" onclick="convertToAppointment(${wait.id})">
                        <i class="fas fa-calendar-plus"></i>
                    </button>
                    <button class="action-btn btn-danger" onclick="removeFromWaitingList(${wait.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Sección Calendar
function loadCalendar() {
    if (calendar) {
        calendar.destroy();
    }
    
    const calendarEl = document.getElementById('calendar');
    calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        locale: 'es',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        events: appointments.map(apt => {
            const artist = artists.find(a => a.id == apt.artistSelect);
            return {
                id: apt.id,
                title: `${apt.clientName} - ${artist ? artist.name : 'Sin artista'}`,
                start: `${apt.appointmentDate}T${apt.appointmentTime}:00`,
                backgroundColor: getStatusColor(apt.status),
                borderColor: getStatusColor(apt.status)
            };
        }),
        eventClick: function(info) {
            const appointmentId = info.event.id;
            editAppointment(appointmentId);
        },
        dateClick: function(info) {
            showNewAppointmentModal(info.dateStr);
        }
    });
    
    calendar.render();
}

function getStatusColor(status) {
    const colors = {
        'pendiente': '#f59e0b',
        'confirmada': '#10b981',
        'completada': '#3b82f6',
        'cancelada': '#ef4444'
    };
    return colors[status] || '#6b7280';
}

// Sección Artists
function loadArtistsData() {
    populateArtistsCards();
}

function populateArtistsCards() {
    const container = document.getElementById('artists-cards-container');
    container.innerHTML = '';
    
    artists.forEach(artist => {
        const appointmentCount = appointments.filter(apt => apt.artistSelect == artist.id).length;
        const completedCount = appointments.filter(apt => apt.artistSelect == artist.id && apt.status === 'completada').length;
        const revenue = appointments
            .filter(apt => apt.artistSelect == artist.id && apt.status === 'completada')
            .reduce((total, apt) => total + (apt.finalPrice || apt.estimatedPrice || artist.rate), 0);
        
        const card = document.createElement('div');
        card.className = 'artist-admin-card';
        card.innerHTML = `
            <h3>${artist.name}</h3>
            <p class="artist-specialty">${artist.specialty}</p>
            <p><strong>Experiencia:</strong> ${artist.experience} años</p>
            <p><strong>Tarifa:</strong> $${artist.rate}/hora</p>
            <p><strong>Disponibilidad:</strong> ${artist.availability}</p>
            
            <div class="artist-stats">
                <div class="artist-stat">
                    <div class="number">${appointmentCount}</div>
                    <div class="label">Total Citas</div>
                </div>
                <div class="artist-stat">
                    <div class="number">${completedCount}</div>
                    <div class="label">Completadas</div>
                </div>
                <div class="artist-stat">
                    <div class="number">$${revenue}</div>
                    <div class="label">Ingresos</div>
                </div>
                <div class="artist-stat">
                    <div class="number">${artist.active ? 'Activo' : 'Inactivo'}</div>
                    <div class="label">Estado</div>
                </div>
            </div>
            
            <div class="action-buttons" style="margin-top: 1rem;">
                <button class="btn btn-primary btn-sm" onclick="editArtist(${artist.id})">
                    <i class="fas fa-edit"></i> Editar
                </button>
                <button class="btn btn-${artist.active ? 'warning' : 'success'} btn-sm" onclick="toggleArtistStatus(${artist.id})">
                    <i class="fas fa-${artist.active ? 'pause' : 'play'}"></i> 
                    ${artist.active ? 'Desactivar' : 'Activar'}
                </button>
            </div>
        `;
        container.appendChild(card);
    });
}

// Sección Clients
function loadClientsData() {
    populateClientsTable();
}

function populateClientsTable() {
    const tbody = document.getElementById('clients-table-body');
    tbody.innerHTML = '';
    
    // Agrupar citas por cliente
    const clientsMap = {};
    appointments.forEach(apt => {
        const key = apt.clientEmail;
        if (!clientsMap[key]) {
            clientsMap[key] = {
                name: apt.clientName,
                email: apt.clientEmail,
                phone: apt.clientPhone,
                appointments: []
            };
        }
        clientsMap[key].appointments.push(apt);
    });
    
    Object.values(clientsMap).forEach(client => {
        const lastAppointment = client.appointments
            .sort((a, b) => new Date(b.appointmentDate) - new Date(a.appointmentDate))[0];
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <div>
                    <strong>${client.name}</strong>
                </div>
            </td>
            <td>${client.email}</td>
            <td>${client.phone}</td>
            <td>${client.appointments.length}</td>
            <td>${lastAppointment ? new Date(lastAppointment.appointmentDate).toLocaleDateString() : 'N/A'}</td>
            <td>
                <div class="action-buttons">
                    <button class="action-btn btn-primary" onclick="viewClientHistory('${client.email}')">
                        <i class="fas fa-history"></i>
                    </button>
                    <button class="action-btn btn-success" onclick="createAppointmentForClient('${client.email}')">
                        <i class="fas fa-calendar-plus"></i>
                    </button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Sección Reports
function loadReportsData() {
    loadRevenueChart();
    loadArtistChart();
    loadPopularStyles();
    loadPopularTimes();
}

function loadRevenueChart() {
    const ctx = document.getElementById('revenue-chart').getContext('2d');
    
    // Datos de ejemplo para los últimos 6 meses
    const months = [];
    const revenues = [];
    
    for (let i = 5; i >= 0; i--) {
        const date = new Date();
        date.setMonth(date.getMonth() - i);
        months.push(date.toLocaleDateString('es', { month: 'short', year: 'numeric' }));
        
        // Calcular ingresos del mes
        const monthRevenue = appointments
            .filter(apt => {
                const aptDate = new Date(apt.appointmentDate);
                return aptDate.getMonth() === date.getMonth() && 
                       aptDate.getFullYear() === date.getFullYear() &&
                       apt.status === 'completada';
            })
            .reduce((total, apt) => total + (apt.finalPrice || apt.estimatedPrice || 150), 0);
        
        revenues.push(monthRevenue);
    }
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: months,
            datasets: [{
                label: 'Ingresos ($)',
                data: revenues,
                borderColor: '#dc2626',
                backgroundColor: 'rgba(220, 38, 38, 0.1)',
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function loadArtistChart() {
    const ctx = document.getElementById('artist-chart').getContext('2d');
    
    const artistData = artists.map(artist => {
        const count = appointments.filter(apt => apt.artistSelect == artist.id).length;
        return {
            name: artist.name,
            count: count
        };
    });
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: artistData.map(a => a.name),
            datasets: [{
                data: artistData.map(a => a.count),
                backgroundColor: [
                    '#dc2626',
                    '#f59e0b',
                    '#10b981',
                    '#3b82f6',
                    '#8b5cf6'
                ]
            }]
        },
        options: {
            responsive: true
        }
    });
}

function loadPopularStyles() {
    const container = document.getElementById('popular-styles');
    container.innerHTML = '';
    
    // Analizar descripciones para encontrar estilos populares
    const styles = {};
    appointments.forEach(apt => {
        const description = apt.tattooDescription.toLowerCase();
        if (description.includes('realismo') || description.includes('realista')) {
            styles['Realismo'] = (styles['Realismo'] || 0) + 1;
        }
        if (description.includes('tradicional')) {
            styles['Tradicional'] = (styles['Tradicional'] || 0) + 1;
        }
        if (description.includes('geometrico') || description.includes('geométrico')) {
            styles['Geométrico'] = (styles['Geométrico'] || 0) + 1;
        }
        if (description.includes('acuarela')) {
            styles['Acuarela'] = (styles['Acuarela'] || 0) + 1;
        }
        if (description.includes('blackwork') || description.includes('negro')) {
            styles['Blackwork'] = (styles['Blackwork'] || 0) + 1;
        }
    });
    
    Object.entries(styles)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 5)
        .forEach(([style, count]) => {
            const item = document.createElement('div');
            item.className = 'artist-stat-item';
            item.innerHTML = `
                <span class="name">${style}</span>
                <span class="count">${count}</span>
            `;
            container.appendChild(item);
        });
}

function loadPopularTimes() {
    const container = document.getElementById('popular-times');
    container.innerHTML = '';
    
    const times = {};
    appointments.forEach(apt => {
        const time = apt.appointmentTime;
        times[time] = (times[time] || 0) + 1;
    });
    
    Object.entries(times)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 5)
        .forEach(([time, count]) => {
            const item = document.createElement('div');
            item.className = 'artist-stat-item';
            item.innerHTML = `
                <span class="name">${time}</span>
                <span class="count">${count}</span>
            `;
            container.appendChild(item);
        });
}

// Sección Settings
function loadSettingsData() {
    // Los datos de configuración se cargan desde el HTML
    setupSettingsForms();
}

function setupSettingsForms() {
    document.getElementById('studio-info-form').addEventListener('submit', function(e) {
        e.preventDefault();
        showNotification('Información del estudio guardada', 'success');
    });
    
    document.getElementById('hours-form').addEventListener('submit', function(e) {
        e.preventDefault();
        showNotification('Horarios guardados', 'success');
    });
    
    document.getElementById('pricing-form').addEventListener('submit', function(e) {
        e.preventDefault();
        showNotification('Configuración de precios guardada', 'success');
    });
    
    document.getElementById('notifications-form').addEventListener('submit', function(e) {
        e.preventDefault();
        showNotification('Configuración de notificaciones guardada', 'success');
    });
}

// Configurar formularios
function setupForms() {
    // New appointment form
    document.getElementById('new-appointment-form').addEventListener('submit', handleNewAppointment);
    
    // Edit appointment form
    document.getElementById('edit-appointment-form').addEventListener('submit', handleEditAppointment);
    
    // New artist form
    document.getElementById('new-artist-form').addEventListener('submit', handleNewArtist);
}

function handleNewAppointment(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    const appointment = {
        id: Date.now(),
        clientName: formData.get('clientName'),
        clientEmail: formData.get('clientEmail'),
        clientPhone: formData.get('clientPhone'),
        artistSelect: formData.get('artistSelect'),
        appointmentDate: formData.get('appointmentDate'),
        appointmentTime: formData.get('appointmentTime'),
        tattooDescription: formData.get('tattooDescription'),
        status: formData.get('status') || 'pendiente',
        estimatedPrice: formData.get('estimatedPrice') || 150,
        createdAt: new Date().toISOString()
    };
    
    appointments.push(appointment);
    localStorage.setItem('appointments', JSON.stringify(appointments));
    
    closeModal('new-appointment-modal');
    showNotification('Cita creada exitosamente', 'success');
    
    if (currentSection === 'appointments') {
        loadAppointmentsData();
    }
    if (currentSection === 'calendar') {
        loadCalendar();
    }
    updateStats();
}

function handleEditAppointment(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const appointmentId = formData.get('appointmentId');
    
    const appointmentIndex = appointments.findIndex(apt => apt.id == appointmentId);
    if (appointmentIndex !== -1) {
        appointments[appointmentIndex] = {
            ...appointments[appointmentIndex],
            clientName: formData.get('clientName'),
            clientEmail: formData.get('clientEmail'),
            clientPhone: formData.get('clientPhone'),
            artistSelect: formData.get('artistSelect'),
            appointmentDate: formData.get('appointmentDate'),
            appointmentTime: formData.get('appointmentTime'),
            tattooDescription: formData.get('tattooDescription'),
            status: formData.get('status'),
            finalPrice: formData.get('finalPrice') || appointments[appointmentIndex].estimatedPrice
        };
        
        localStorage.setItem('appointments', JSON.stringify(appointments));
        
        closeModal('edit-appointment-modal');
        showNotification('Cita actualizada exitosamente', 'success');
        
        if (currentSection === 'appointments') {
            loadAppointmentsData();
        }
        if (currentSection === 'calendar') {
            loadCalendar();
        }
        updateStats();
    }
}

function handleNewArtist(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    const artist = {
        id: Date.now(),
        name: formData.get('artistName'),
        specialty: formData.get('artistSpecialty'),
        experience: parseInt(formData.get('artistExperience')),
        rate: parseInt(formData.get('artistRate')),
        bio: formData.get('artistBio'),
        instagram: formData.get('artistInstagram'),
        availability: formData.get('artistAvailability'),
        active: true
    };
    
    artists.push(artist);
    localStorage.setItem('artists', JSON.stringify(artists));
    
    closeModal('new-artist-modal');
    showNotification('Artista creado exitosamente', 'success');
    
    if (currentSection === 'artists') {
        loadArtistsData();
    }
    populateArtistSelects();
}

// Configurar filtros
function setupFilters() {
    document.getElementById('status-filter').addEventListener('change', applyFilters);
    document.getElementById('artist-filter').addEventListener('change', applyFilters);
    document.getElementById('date-filter').addEventListener('change', applyFilters);
}

function applyFilters() {
    const statusFilter = document.getElementById('status-filter').value;
    const artistFilter = document.getElementById('artist-filter').value;
    const dateFilter = document.getElementById('date-filter').value;
    
    let filteredAppointments = appointments;
    
    if (statusFilter !== 'all') {
        filteredAppointments = filteredAppointments.filter(apt => apt.status === statusFilter);
    }
    
    if (artistFilter !== 'all') {
        filteredAppointments = filteredAppointments.filter(apt => apt.artistSelect == artistFilter);
    }
    
    if (dateFilter) {
        filteredAppointments = filteredAppointments.filter(apt => apt.appointmentDate === dateFilter);
    }
    
    populateAppointmentsTable(filteredAppointments);
}

function clearFilters() {
    document.getElementById('status-filter').value = 'all';
    document.getElementById('artist-filter').value = 'all';
    document.getElementById('date-filter').value = '';
    populateAppointmentsTable();
}

// Funciones de utilidad
function populateArtistSelects() {
    const selects = document.querySelectorAll('select[name="artistSelect"]');
    selects.forEach(select => {
        const currentValue = select.value;
        select.innerHTML = '<option value="">Seleccionar artista</option>';
        
        artists.filter(artist => artist.active).forEach(artist => {
            const option = document.createElement('option');
            option.value = artist.id;
            option.textContent = `${artist.name} - ${artist.specialty}`;
            select.appendChild(option);
        });
        
        if (currentValue) {
            select.value = currentValue;
        }
    });
}

// Funciones de acción
function showNewAppointmentModal(date = null) {
    const modal = document.getElementById('new-appointment-modal');
    const form = document.getElementById('new-appointment-form');
    
    form.reset();
    populateArtistSelects();
    
    if (date) {
        form.querySelector('input[name="appointmentDate"]').value = date;
    }
    
    modal.style.display = 'block';
}

function editAppointment(appointmentId) {
    const appointment = appointments.find(apt => apt.id == appointmentId);
    if (!appointment) return;
    
    const modal = document.getElementById('edit-appointment-modal');
    const form = document.getElementById('edit-appointment-form');
    
    // Llenar el formulario con los datos existentes
    form.querySelector('input[name="appointmentId"]').value = appointment.id;
    form.querySelector('input[name="clientName"]').value = appointment.clientName;
    form.querySelector('input[name="clientEmail"]').value = appointment.clientEmail;
    form.querySelector('input[name="clientPhone"]').value = appointment.clientPhone;
    form.querySelector('select[name="artistSelect"]').value = appointment.artistSelect;
    form.querySelector('input[name="appointmentDate"]').value = appointment.appointmentDate;
    form.querySelector('select[name="appointmentTime"]').value = appointment.appointmentTime;
    form.querySelector('textarea[name="tattooDescription"]').value = appointment.tattooDescription;
    form.querySelector('select[name="status"]').value = appointment.status;
    form.querySelector('input[name="finalPrice"]').value = appointment.finalPrice || appointment.estimatedPrice || '';
    
    populateArtistSelects();
    modal.style.display = 'block';
}

function confirmAppointment(appointmentId) {
    const appointment = appointments.find(apt => apt.id == appointmentId);
    if (appointment) {
        appointment.status = 'confirmada';
        localStorage.setItem('appointments', JSON.stringify(appointments));
        showNotification('Cita confirmada', 'success');
        
        if (currentSection === 'appointments') {
            loadAppointmentsData();
        }
        updateStats();
    }
}

function cancelAppointment(appointmentId) {
    if (confirm('¿Estás seguro de que quieres cancelar esta cita?')) {
        const appointment = appointments.find(apt => apt.id == appointmentId);
        if (appointment) {
            appointment.status = 'cancelada';
            localStorage.setItem('appointments', JSON.stringify(appointments));
            showNotification('Cita cancelada', 'success');
            
            if (currentSection === 'appointments') {
                loadAppointmentsData();
            }
            updateStats();
        }
    }
}

function contactWaitingClient(waitId) {
    const client = waitingList.find(w => w.id == waitId);
    if (client) {
        showNotification(`Contactando a ${client.waitName} - ${client.waitPhone}`, 'success');
    }
}

function convertToAppointment(waitId) {
    const waitingClient = waitingList.find(w => w.id == waitId);
    if (!waitingClient) return;
    
    // Crear nueva cita basada en la lista de espera
    const appointment = {
        id: Date.now(),
        clientName: waitingClient.waitName,
        clientEmail: waitingClient.waitEmail,
        clientPhone: waitingClient.waitPhone,
        artistSelect: waitingClient.waitArtist,
        appointmentDate: '',
        appointmentTime: '',
        tattooDescription: waitingClient.waitDescription,
        status: 'pendiente',
        estimatedPrice: 150,
        createdAt: new Date().toISOString()
    };
    
    // Remover de lista de espera
    const waitIndex = waitingList.findIndex(w => w.id == waitId);
    waitingList.splice(waitIndex, 1);
    localStorage.setItem('waitingList', JSON.stringify(waitingList));
    
    // Mostrar modal para completar la cita
    showNewAppointmentModal();
    
    // Pre-llenar algunos campos
    const form = document.getElementById('new-appointment-form');
    form.querySelector('input[name="clientName"]').value = appointment.clientName;
    form.querySelector('input[name="clientEmail"]').value = appointment.clientEmail;
    form.querySelector('input[name="clientPhone"]').value = appointment.clientPhone;
    form.querySelector('select[name="artistSelect"]').value = appointment.artistSelect;
    form.querySelector('textarea[name="tattooDescription"]').value = appointment.tattooDescription;
    
    showNotification('Cliente movido a citas. Complete los detalles.', 'success');
    
    if (currentSection === 'waiting-list') {
        loadWaitingListData();
    }
    updateStats();
}

function removeFromWaitingList(waitId) {
    if (confirm('¿Estás seguro de que quieres remover este cliente de la lista de espera?')) {
        const waitIndex = waitingList.findIndex(w => w.id == waitId);
        if (waitIndex !== -1) {
            waitingList.splice(waitIndex, 1);
            localStorage.setItem('waitingList', JSON.stringify(waitingList));
            showNotification('Cliente removido de la lista de espera', 'success');
            
            if (currentSection === 'waiting-list') {
                loadWaitingListData();
            }
            updateStats();
        }
    }
}

function showNewArtistModal() {
    const modal = document.getElementById('new-artist-modal');
    const form = document.getElementById('new-artist-form');
    form.reset();
    modal.style.display = 'block';
}

function editArtist(artistId) {
    const artist = artists.find(a => a.id == artistId);
    if (!artist) return;
    
    showNotification('Función de edición de artista en desarrollo', 'warning');
}

function toggleArtistStatus(artistId) {
    const artist = artists.find(a => a.id == artistId);
    if (artist) {
        artist.active = !artist.active;
        localStorage.setItem('artists', JSON.stringify(artists));
        showNotification(`Artista ${artist.active ? 'activado' : 'desactivado'}`, 'success');
        
        if (currentSection === 'artists') {
            loadArtistsData();
        }
        populateArtistSelects();
    }
}

function viewClientHistory(clientEmail) {
    const clientAppointments = appointments.filter(apt => apt.clientEmail === clientEmail);
    showNotification(`${clientAppointments.length} citas encontradas para este cliente`, 'success');
}

function createAppointmentForClient(clientEmail) {
    const client = appointments.find(apt => apt.clientEmail === clientEmail);
    if (client) {
        showNewAppointmentModal();
        
        // Pre-llenar datos del cliente
        const form = document.getElementById('new-appointment-form');
        form.querySelector('input[name="clientName"]').value = client.clientName;
        form.querySelector('input[name="clientEmail"]').value = client.clientEmail;
        form.querySelector('input[name="clientPhone"]').value = client.clientPhone;
    }
}

// Funciones de exportación
function exportAppointments() {
    const data = appointments.map(apt => {
        const artist = artists.find(a => a.id == apt.artistSelect);
        return {
            ID: apt.id,
            Cliente: apt.clientName,
            Email: apt.clientEmail,
            Teléfono: apt.clientPhone,
            Artista: artist ? artist.name : 'No asignado',
            Fecha: apt.appointmentDate,
            Hora: apt.appointmentTime,
            Estado: apt.status,
            Descripción: apt.tattooDescription,
            Precio: apt.finalPrice || apt.estimatedPrice || 0
        };
    });
    
    downloadCSV(data, 'citas.csv');
}

function exportWaitingList() {
    const data = waitingList.map(wait => {
        const artist = artists.find(a => a.id == wait.waitArtist);
        return {
            ID: wait.id,
            Cliente: wait.waitName,
            Email: wait.waitEmail,
            Teléfono: wait.waitPhone,
            'Artista Preferido': artist ? artist.name : 'No especificado',
            Urgencia: wait.urgency,
            'Fecha de Registro': new Date(wait.createdAt).toLocaleDateString(),
            Descripción: wait.waitDescription
        };
    });
    
    downloadCSV(data, 'lista-espera.csv');
}

function exportClients() {
    const clientsMap = {};
    appointments.forEach(apt => {
        const key = apt.clientEmail;
        if (!clientsMap[key]) {
            clientsMap[key] = {
                Nombre: apt.clientName,
                Email: apt.clientEmail,
                Teléfono: apt.clientPhone,
                'Total Citas': 0,
                'Última Cita': ''
            };
        }
        clientsMap[key]['Total Citas']++;
        if (!clientsMap[key]['Última Cita'] || new Date(apt.appointmentDate) > new Date(clientsMap[key]['Última Cita'])) {
            clientsMap[key]['Última Cita'] = apt.appointmentDate;
        }
    });
    
    downloadCSV(Object.values(clientsMap), 'clientes.csv');
}

function downloadCSV(data, filename) {
    if (data.length === 0) {
        showNotification('No hay datos para exportar', 'warning');
        return;
    }
    
    const headers = Object.keys(data[0]);
    const csvContent = [
        headers.join(','),
        ...data.map(row => headers.map(header => `"${row[header] || ''}"`).join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showNotification('Archivo exportado exitosamente', 'success');
}

// Funciones de modal
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Funciones de notificación
function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification-toast');
    notification.textContent = message;
    notification.className = `notification-toast ${type}`;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 4000);
}

// Funciones globales para uso en HTML
window.showNewAppointmentModal = showNewAppointmentModal;
window.editAppointment = editAppointment;
window.confirmAppointment = confirmAppointment;
window.cancelAppointment = cancelAppointment;
window.contactWaitingClient = contactWaitingClient;
window.convertToAppointment = convertToAppointment;
window.removeFromWaitingList = removeFromWaitingList;
window.showNewArtistModal = showNewArtistModal;
window.editArtist = editArtist;
window.toggleArtistStatus = toggleArtistStatus;
window.viewClientHistory = viewClientHistory;
window.createAppointmentForClient = createAppointmentForClient;
window.exportAppointments = exportAppointments;
window.exportWaitingList = exportWaitingList;
window.exportClients = exportClients;
window.closeModal = closeModal;
window.clearFilters = clearFilters;

// Inicializar cuando se carga la página
