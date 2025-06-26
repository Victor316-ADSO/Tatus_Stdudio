// Datos de los artistas


// Variables globales
let appointments = JSON.parse(localStorage.getItem('appointments')) || [];
let waitingList = JSON.parse(localStorage.getItem('waitingList')) || [];
let currentFilter = 'all';
let artists = []; // al inicio del script

// Inicialización cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupNavigation();
    loadArtists();
    loadGallery();
    setupForms();
    setupModals();
    setupGalleryFilters();
    populateArtistSelects();
    setMinDate();
}

function showGalleryModal(imageUrl, title) {
    const modal = document.getElementById('gallery-modal');
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');

    if (modal && modalImage && modalTitle) {
        modalImage.src = imageUrl;
        modalTitle.textContent = title;
        modal.style.display = 'block';
    } else {
        console.error("❌ Elementos del modal no encontrados");
    }
}

// Configuración de navegación
function setupNavigation() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle menú móvil
    mobileMenu.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });

    // Cerrar menú al hacer click en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
        });
    });

    // Scroll suave para enlaces internos
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                scrollToSection(targetId);
            }
        });
    });
}

// Función para scroll suave
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const elementPosition = element.offsetTop - headerHeight;
        
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    }
}

// Cargar artistas


document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("appointment-form-reserva").addEventListener("submit", function(e) {
    e.preventDefault();

    const form = this;
    const formData = new FormData(form);

    console.log("⏳ Enviando formulario...");
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    fetch("/Tatus_Studio/php/submit_appointment.php", {
      method: "POST",
      body: formData
    })
    .then(response => {
      console.log("📡 Respuesta recibida:", response);
      if (!response.ok) {
        throw new Error("Respuesta no OK del servidor");
      }
      return response.text();
    })
    .then(data => {
      console.log("✅ Respuesta del servidor:", data);
      alert("Cita enviada con éxito");
      form.reset();
    })
    .catch(error => {
      console.error("❌ Error al enviar el formulario:", error);
      alert("Error al enviar el formulario. Revisa la consola.");
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
    
    fetch("./php/get_artists.php")
        .then(response => {
           
            return response.json();
        })
        .then(data => {
            

            const container = document.getElementById("artists-container");

            if (!Array.isArray(data)) {
                console.error("❌ Error: El formato de los datos no es un arreglo:", data);
                container.innerHTML = "<p>Error al cargar artistas.</p>";
                return;
            }

            if (data.length === 0) {
                console.warn("⚠️ No se encontraron artistas activos.");
                container.innerHTML = "<p>No hay artistas activos disponibles.</p>";
                return;
            }

            data.forEach(artist => {
                

                const card = document.createElement("div");
                card.className = "artist-card";
                card.innerHTML = `
                    <img src="${artist.profile_image || 'default.jpg'}" alt="${artist.name}">
                    <div class="info">
                        <h3>${artist.name}</h3>
                        <p><strong>${artist.specialty}</strong></p>
                        <p>${artist.experience_years} años de experiencia</p>
                    </div>
                `;
                card.addEventListener("click", () => {
                    
                    showArtistModal(artist);
                });
                container.appendChild(card);
            });
        })
        .catch(error => {
            console.error("🔥 Error al obtener los artistas:", error);
            document.getElementById("artists-container").innerHTML = "<p>Error al cargar artistas.</p>";
        });
});

   async function loadArtists() {
    
    try {
        const response = await fetch("./php/get_artists.php");
       
        if (!response.ok) throw new Error("Error HTTP: " + response.status);
        const artists = await response.json();
        
        displayArtists(artists); // Puedes dejar esto si quieres mostrar de inmediato
        return artists; // ✅ Devuelve los artistas
    } catch (error) {
        console.error("🔥 Error al obtener los artistas:", error);
        return []; // ✅ Devuelve array vacío para evitar más errores
    }
}

    function createArtistCard(artist) {
    const card = document.createElement('div');
    card.className = 'artist-card';

    const image = document.createElement('img');
    image.src = artist.profile_image || 'default.jpg'; // Usa tu imagen local o un placeholder si no tienes una
    image.alt = artist.name;

    const name = document.createElement('h3');
    name.textContent = artist.name;

    const specialty = document.createElement('p');
    specialty.innerHTML = `<strong>Especialidad:</strong> ${artist.specialty}`;

    const experience = document.createElement('p');
    experience.innerHTML = `<strong>Años de experiencia:</strong> ${artist.experience_years}`;

    const bio = document.createElement('p');
    bio.textContent = artist.bio;

    card.appendChild(image);
    card.appendChild(name);
    card.appendChild(specialty);
    card.appendChild(experience);
    card.appendChild(bio);

    return card;
}


function showArtistModal(artist) {
    

    const modal = document.getElementById("artistModal");
    document.getElementById("modal-name").innerText = artist.name;
    document.getElementById("modal-specialty").innerText = artist.specialty;
    document.getElementById("modal-bio").innerText = artist.bio || "Sin biografía disponible.";
    document.getElementById("modal-image").src = artist.profile_image || 'default.jpg';
    document.getElementById("modal-link").href = artist.portfolio_url || "#";
    modal.style.display = "flex";
}

function closeModal() {
    
    document.getElementById("artistModal").style.display = "none";
}





// Función para cargar y mostrar los artistas
async function initializeApp() {
    setupNavigation();
    const artists = await loadArtists(); // ✅ Ahora obtiene el array correcto
    loadGallery();
    setupForms();
    setupModals();
    setupGalleryFilters();
    populateArtistSelects(artists);
    setMinDate();
    displayArtists(artists); // ✅ Aquí se puede usar sin error
}


// Función para mostrar los artistas en el DOM
function displayArtists(artists) {
    const container = document.getElementById('artists-container');
    container.innerHTML = '';

    artists.forEach(artist => {
        const artistCard = createArtistCard(artist);
        container.appendChild(artistCard);
    });
}

// Función para poblar los selects de artistas
function populateArtistSelects(artists) {
    const selects = ['artist-select', 'wait-artist'];

    selects.forEach(selectId => {
        const select = document.getElementById(selectId);
        if (select) {
            select.innerHTML = ''; // Limpiar opciones existentes
            artists.forEach(artist => {
                const option = document.createElement('option');
                option.value = artist.id;
                option.textContent = `${artist.name} - ${artist.specialty}`;
                select.appendChild(option);
            });
        }
    });
}

async function initializeApp() {
   
    try {
        const response = await fetch('./php/get_artists.php');
        const artists = await response.json(); // <-- Define artists aquí
        
        populateArtistSelects(artists); // <-- Úsalo aquí
    } catch (error) {
        console.error("❌ Error al cargar artistas:", error);
    }
}


// Llama initializeApp cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initializeApp);



// Cargar galería

// Configurar filtros de galería
function setupGalleryFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remover clase active de todos los botones
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Agregar clase active al botón clickeado
            this.classList.add('active');
            
            // Actualizar filtro actual
            currentFilter = this.getAttribute('data-filter');
            
            // Recargar galería
            loadGallery();
        });
    });
}

// Configurar formularios
function setupForms() {
    // Formulario de citas
    

   document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('appointment-form');
  const artistSelect = document.getElementById('artist-select');

  // Cargar artistas
  fetch('./php/get_artists.php')
    .then(res => res.json())
    .then(data => {
      artistSelect.innerHTML = '<option value="">Selecciona un artista</option>';
      data.forEach(artist => {
        const option = document.createElement('option');
        option.value = artist.id;
        option.textContent = `${artist.first_name} ${artist.last_name}`;
        artistSelect.appendChild(option);
      });
    })
    .catch(() => {
      artistSelect.innerHTML = '<option value="">Error al cargar</option>';
    });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData(form);

    const clientData = {
      first_name: formData.get('first_name'),
      last_name: formData.get('last_name'),
      email: formData.get('email'),
      phone: formData.get('phone')
    };

    // Paso 1: Crear cliente
    fetch('./php/client_handler.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(clientData)
    })
    .then(res => res.json())
    .then(clientRes => {
      if (!clientRes.success) {
        alert('❌ Error al registrar cliente: ' + clientRes.error);
        return;
      }

      const clientId = clientRes.client_id;
      formData.append('client_id', clientId);

      // Paso 2: Enviar cita
      return fetch('./php/appointment_handler.php', {
        method: 'POST',
        body: formData
      });
    })
    .then(res => res?.json())
    .then(data => {
      if (!data) return;
      if (data.success) {
        alert('✅ Cita registrada correctamente.');
        form.reset();
      } else {
        alert('❌ Error al registrar cita: ' + data.error);
      }
    })
    .catch(err => {
      console.error(err);
      alert('❌ Error de red o del servidor.');
    });
  });
});













    // Formulario de lista de espera
    const waitingListForm = document.getElementById('waiting-list-form');
    waitingListForm.addEventListener('submit', handleWaitingListSubmit);

    // Formulario de contacto
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', handleContactSubmit);
}

// Manejar envío de formulario de citas
function handleAppointmentSubmit(e) {
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
        status: 'pendiente',
        createdAt: new Date().toISOString()
    };

    // Validar disponibilidad
    if (isTimeSlotAvailable(appointment.appointmentDate, appointment.appointmentTime, appointment.artistSelect)) {
        appointments.push(appointment);
        localStorage.setItem('appointments', JSON.stringify(appointments));
        
        showNotification('¡Cita solicitada exitosamente! Te contactaremos pronto para confirmar.', 'success');
        e.target.reset();
    } else {
        showNotification('Lo sentimos, ese horario ya no está disponible. Por favor selecciona otro.', 'error');
    }
}

// Manejar envío de formulario de lista de espera
function handleWaitingListSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const waitingListEntry = {
        id: Date.now(),
        waitName: formData.get('waitName'),
        waitEmail: formData.get('waitEmail'),
        waitPhone: formData.get('waitPhone'),
        waitArtist: formData.get('waitArtist'),
        urgency: formData.get('urgency'),
        waitDescription: formData.get('waitDescription'),
        createdAt: new Date().toISOString()
    };

    waitingList.push(waitingListEntry);
    localStorage.setItem('waitingList', JSON.stringify(waitingList));
    
    showNotification('¡Te has unido a la lista de espera! Te contactaremos cuando se abra un espacio.', 'success');
    e.target.reset();
}

// Manejar envío de formulario de contacto
function handleContactSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const contact = {
        id: Date.now(),
        contactName: formData.get('contactName'),
        contactEmail: formData.get('contactEmail'),
        contactSubject: formData.get('contactSubject'),
        contactMessage: formData.get('contactMessage'),
        createdAt: new Date().toISOString()
    };

    // Simular envío
    showNotification('¡Mensaje enviado exitosamente! Te responderemos pronto.', 'success');
    e.target.reset();
}

// Verificar disponibilidad de horario
function isTimeSlotAvailable(date, time, artistId) {
    return !appointments.some(appointment => 
        appointment.appointmentDate === date && 
        appointment.appointmentTime === time && 
        appointment.artistSelect === artistId &&
        appointment.status !== 'cancelada'
    );
}

// Poblar selects de artistas


// Establecer fecha mínima para citas
function setMinDate() {
    const dateInput = document.getElementById('appointment-date');
    if (dateInput) {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        dateInput.min = tomorrow.toISOString().split('T')[0];
    }
}

// Configurar modales
function setupModals() {
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close');

    // Cerrar modal al hacer click en X
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            modal.style.display = 'none';
        });
    });

    // Cerrar modal al hacer click fuera
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.style.display = 'none';
            }
        });
    });
}

// Mostrar notificaciones
function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = `notification ${type}`;
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 4000);
}

// Funciones auxiliares para botones de acción
function bookWithArtist(artistId) {
    document.getElementById('artist-modal').style.display = 'none';
    scrollToSection('citas');
    
    // Pre-seleccionar artista
    const artistSelect = document.getElementById('artist-select');
    artistSelect.value = artistId;
}

function joinWaitingListForArtist(artistId) {
    document.getElementById('artist-modal').style.display = 'none';
    scrollToSection('lista-espera');
    
    // Pre-seleccionar artista
    const waitArtistSelect = document.getElementById('wait-artist');
    waitArtistSelect.value = artistId;
}

// Funciones de administración (para uso futuro)
function getAppointments() {
    return appointments;
}

function getWaitingList() {
    return waitingList;
}

function updateAppointmentStatus(appointmentId, status) {
    const appointment = appointments.find(apt => apt.id === appointmentId);
    if (appointment) {
        appointment.status = status;
        localStorage.setItem('appointments', JSON.stringify(appointments));
        return true;
    }
    return false;
}

// Animaciones de scroll
function handleScrollAnimations() {
    const elements = document.querySelectorAll('.service-card, .artist-card, .testimonial-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    });

    elements.forEach(element => {
        observer.observe(element);
    });
}

// Inicializar animaciones cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(handleScrollAnimations, 100);
});

// Función para limpiar datos (para desarrollo)
function clearAllData() {
    localStorage.removeItem('appointments');
    localStorage.removeItem('waitingList');
    appointments = [];
    waitingList = [];
    showNotification('Todos los datos han sido limpiados.', 'success');
}

// Exportar funciones para uso global
window.scrollToSection = scrollToSection;
window.showArtistModal = showArtistModal;
window.showGalleryModal = showGalleryModal;
window.bookWithArtist = bookWithArtist;
window.joinWaitingListForArtist = joinWaitingListForArtist;



// Función para debug - mostrar estadísticas
function showStats() {
    
    // Estadísticas por artista
    const appointmentsByArtist = {};
    appointments.forEach(apt => {
        const artistName = artists.find(a => a.id == apt.artistSelect)?.name || 'Desconocido';
        appointmentsByArtist[artistName] = (appointmentsByArtist[artistName] || 0) + 1;
    });
    
    
}

// Función para exportar datos
function exportData() {
    const data = {
        appointments: appointments,
        waitingList: waitingList,
        exportDate: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `ink-dreams-data-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
}

// Función para importar datos
function importData(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            if (data.appointments) {
                appointments = data.appointments;
                localStorage.setItem('appointments', JSON.stringify(appointments));
            }
            if (data.waitingList) {
                waitingList = data.waitingList;
                localStorage.setItem('waitingList', JSON.stringify(waitingList));
            }
            showNotification('Datos importados exitosamente', 'success');
        } catch (error) {
            showNotification('Error al importar datos', 'error');
            console.error('Error importing data:', error);
        }
    };
    reader.readAsText(file);
}

// Validación de formularios mejorada
function validateAppointmentForm(formData) {
    const errors = [];
    
    if (!formData.get('clientName') || formData.get('clientName').length < 2) {
        errors.push('El nombre debe tener al menos 2 caracteres');
    }
    
    const email = formData.get('clientEmail');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        errors.push('Por favor ingresa un email válido');
    }
    
    const phone = formData.get('clientPhone');
    const phoneRegex = /^[\d\s\-\+$$$$]{10,}$/;
    if (!phone || !phoneRegex.test(phone)) {
        errors.push('Por favor ingresa un teléfono válido');
    }
    
    const appointmentDate = new Date(formData.get('appointmentDate'));
    const today = new Date();
    if (appointmentDate <= today) {
        errors.push('La fecha de la cita debe ser futura');
    }
    
    if (!formData.get('tattooDescription') || formData.get('tattooDescription').length < 10) {
        errors.push('La descripción del tatuaje debe tener al menos 10 caracteres');
    }
    
    return errors;
}

// Mejorar el manejo de envío de formulario de citas
function handleAppointmentSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const errors = validateAppointmentForm(formData);
    
    if (errors.length > 0) {
        showNotification(errors.join('. '), 'error');
        return;
    }
    
    const appointment = {
        id: Date.now(),
        clientName: formData.get('clientName'),
        clientEmail: formData.get('clientEmail'),
        clientPhone: formData.get('clientPhone'),
        artistSelect: formData.get('artistSelect'),
        appointmentDate: formData.get('appointmentDate'),
        appointmentTime: formData.get('appointmentTime'),
        tattooDescription: formData.get('tattooDescription'),
        status: 'pendiente',
        createdAt: new Date().toISOString()
    };

    // Validar disponibilidad
    if (isTimeSlotAvailable(appointment.appointmentDate, appointment.appointmentTime, appointment.artistSelect)) {
        appointments.push(appointment);
        localStorage.setItem('appointments', JSON.stringify(appointments));
        
        showNotification('¡Cita solicitada exitosamente! Te contactaremos pronto para confirmar.', 'success');
        e.target.reset();
        
        // Enviar email de confirmación (simulado)
        sendConfirmationEmail(appointment);
    } else {
        showNotification('Lo sentimos, ese horario ya no está disponible. Por favor selecciona otro.', 'error');
    }
}

// Simular envío de email de confirmación
function sendConfirmationEmail(appointment) {
    
    
    // En una implementación real, aquí se haría la llamada al servidor
    // para enviar el email de confirmación
}

// Función para generar horarios disponibles dinámicamente
function generateAvailableTimeSlots(date, artistId) {
    const baseSlots = [
        '10:00', '11:00', '12:00', '13:00', 
        '14:00', '15:00', '16:00', '17:00'
    ];
    
    // Filtrar horarios ya ocupados
    const occupiedSlots = appointments
        .filter(apt => 
            apt.appointmentDate === date && 
            apt.artistSelect == artistId &&
            apt.status !== 'cancelada'
        )
        .map(apt => apt.appointmentTime);
    
    return baseSlots.filter(slot => !occupiedSlots.includes(slot));
}

// Actualizar horarios disponibles cuando cambie la fecha o artista
function updateAvailableTimeSlots() {
    const dateInput = document.getElementById('appointment-date');
    const artistSelect = document.getElementById('artist-select');
    const timeSelect = document.getElementById('appointment-time');
    
    if (!dateInput.value || !artistSelect.value) {
        return;
    }
    
    const availableSlots = generateAvailableTimeSlots(dateInput.value, artistSelect.value);
    
    // Limpiar opciones actuales (excepto la primera)
    timeSelect.innerHTML = '<option value="">Seleccionar hora</option>';
    
    // Agregar horarios disponibles
    availableSlots.forEach(slot => {
        const option = document.createElement('option');
        option.value = slot;
        option.textContent = slot;
        timeSelect.appendChild(option);
    });
    
    if (availableSlots.length === 0) {
        const option = document.createElement('option');
        option.value = '';
        option.textContent = 'No hay horarios disponibles';
        option.disabled = true;
        timeSelect.appendChild(option);
    }
}

// Agregar event listeners para actualización dinámica de horarios
document.addEventListener('DOMContentLoaded', function() {
    const dateInput = document.getElementById('appointment-date');
    const artistSelect = document.getElementById('artist-select');
    
    if (dateInput && artistSelect) {
        dateInput.addEventListener('change', updateAvailableTimeSlots);
        artistSelect.addEventListener('change', updateAvailableTimeSlots);
    }
});

// Función para mostrar información del artista seleccionado
function showArtistInfo(artistId) {
    const artist = artists.find(a => a.id == artistId);
    const infoDiv = document.getElementById('selected-artist-info');
    
    if (artist && infoDiv) {
        infoDiv.innerHTML = `
            <div class="artist-quick-info">
                <h4>${artist.name}</h4>
                <p><strong>Especialidad:</strong> ${artist.specialty}</p>
                <p><strong>Disponibilidad:</strong> ${artist.availability}</p>
                <p><strong>Experiencia:</strong> ${artist.experience}</p>
            </div>
        `;
        infoDiv.style.display = 'block';
    } else if (infoDiv) {
        infoDiv.style.display = 'none';
    }
}

// Función para calcular estimación de precio
function calculatePriceEstimate(description, artistId) {
    // Precios base por hora por artista
    const hourlyRates = {
        1: 150, // Alex Rivera
        2: 160, // Sophia Chen  
        3: 140, // Marcus Johnson
        4: 155, // Elena Rodriguez
        5: 145  // David Kim
    };
    
    const baseRate = hourlyRates[artistId] || 150;
    
    // Estimar horas basado en descripción
    let estimatedHours = 2; // Base
    
    if (description.toLowerCase().includes('pequeño') || description.toLowerCase().includes('mini')) {
        estimatedHours = 1;
    } else if (description.toLowerCase().includes('grande') || description.toLowerCase().includes('manga')) {
        estimatedHours = 6;
    } else if (description.toLowerCase().includes('espalda completa')) {
        estimatedHours = 12;
    }
    
    const estimatedCost = baseRate * estimatedHours;
    
    return {
        hours: estimatedHours,
        rate: baseRate,
        total: estimatedCost,
        deposit: 50
    };
}

// Mostrar estimación de precio
function showPriceEstimate() {
    const description = document.getElementById('tattoo-description').value;
    const artistId = document.getElementById('artist-select').value;
    
    if (description && artistId) {
        const estimate = calculatePriceEstimate(description, artistId);
        const estimateDiv = document.getElementById('price-estimate');
        
        if (estimateDiv) {
            estimateDiv.innerHTML = `
                <div class="price-estimate">
                    <h4>Estimación de Precio</h4>
                    <p><strong>Horas estimadas:</strong> ${estimate.hours}</p>
                    <p><strong>Tarifa por hora:</strong> $${estimate.rate}</p>
                    <p><strong>Total estimado:</strong> $${estimate.total}</p>
                    <p><strong>Depósito requerido:</strong> $${estimate.deposit}</p>
                    <small>*Esta es solo una estimación. El precio final se determinará en la consulta.</small>
                </div>
            `;
            estimateDiv.style.display = 'block';
        }
    }
}

// Funciones de utilidad adicionales
window.showStats = showStats;
window.exportData = exportData;
window.importData = importData;
window.clearAllData = clearAllData;
window.updateAvailableTimeSlots = updateAvailableTimeSlots;
window.showArtistInfo = showArtistInfo;
window.showPriceEstimate = showPriceEstimate;

