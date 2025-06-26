<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ink Dreams - Estudio de Tatuajes</title>
    <link rel="stylesheet" href="./css/styles.css">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
</head>
<body>
<!-- Header -->
<header class="header">
    <nav class="navbar">
        <div class="nav-container">
            <div class="nav-logo">
                <img src="img/logo.png" alt="Ink Dreams Logo" class="logo-img">
                <h2>INK DREAMS</h2>
            </div>
            <ul class="nav-menu" id="nav-menu">
                <li class="nav-item">
                    <a href="#inicio" class="nav-link">Inicio</a>
                </li>
                <li class="nav-item">
                    <a href="#artistas" class="nav-link">Artistas</a>
                </li>
                <li class="nav-item">
                    <a href="#galeria" class="nav-link">Galería</a>
                </li>
                <li class="nav-item">
                    <a href="#citas" class="nav-link">Citas</a>
                </li>
                <li class="nav-item">
                    <a href="#lista-espera" class="nav-link">Lista de Espera</a>
                </li>
                <li class="nav-item">
                    <a href="#contacto" class="nav-link">Contacto</a>
                </li>
            </ul>
            <div class="nav-toggle" id="mobile-menu">
                <span class="bar"></span>
                <span class="bar"></span>
                <span class="bar"></span>
            </div>
        </div>
    </nav>
</header>

    <!-- Hero Section -->
    <section id="inicio" class="hero">
        <div class="hero-content">
            <h1>INK DREAMS</h1>
            <p>Donde el arte se encuentra con la piel</p>
            <div class="hero-buttons">
                <button class="btn btn-primary" onclick="scrollToSection('citas')">Reservar Cita</button>
                <button class="btn btn-secondary" onclick="scrollToSection('galeria')">Ver Trabajos</button>
            </div>
        </div>
    </section>

    <!-- Servicios -->
    <section class="services">
        <div class="container">
            <h2>Nuestros Servicios</h2>
            <div class="services-grid">
                <div class="service-card">
                    <i class="fas fa-paint-brush"></i>
                    <h3>Diseños Personalizados</h3>
                    <p>Creamos diseños únicos adaptados a tu visión y estilo personal.</p>
                </div>
                <div class="service-card">
                    <i class="fas fa-comments"></i>
                    <h3>Consultas Gratuitas</h3>
                    <p>Consultas sin costo para discutir tus ideas y planificar tu tatuaje perfecto.</p>
                </div>
                <div class="service-card">
                    <i class="fas fa-magic"></i>
                    <h3>Cover-ups</h3>
                    <p>Transformamos tatuajes antiguos en nuevas obras de arte.</p>
                </div>
                <div class="service-card">
                    <i class="fas fa-heart"></i>
                    <h3>Retoques</h3>
                    <p>Retoques gratuitos durante el primer año para mantener tu tatuaje perfecto.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Artistas -->
    <section id="artistas" class="artists">
        <div class="container">
            <h2>Nuestros Artistas</h2>
            <div class="artists-grid" id="artists-container">
                <!-- Los artistas se cargarán dinámicamente con JavaScript -->
            </div>
        </div>
    </section>
    


    <!-- Galería -->
    <section id="galeria" class="gallery">
        <div class="container">
            <h2>Galería de Trabajos</h2>
            <div class="gallery-filters">
                <button class="filter-btn active" data-filter="all">Todos</button>
                <button class="filter-btn" data-filter="realismo">Realismo</button>
                <button class="filter-btn" data-filter="tradicional">Tradicional</button>
                <button class="filter-btn" data-filter="geometrico">Geométrico</button>
                <button class="filter-btn" data-filter="acuarela">Acuarela</button>
            </div>
            <div class="gallery-grid" id="gallery-container">
                <!-- Las imágenes se cargarán dinámicamente -->
            </div>
        </div>
    </section>

    <div id="gallery-modal" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:#000000cc; z-index:1000;">
    <div style="margin: 5% auto; background:white; padding:1rem; max-width:600px; border-radius:10px; position:relative;">
        <span onclick="document.getElementById('gallery-modal').style.display='none'" style="position:absolute;top:10px;right:20px;cursor:pointer;">&times;</span>
        <img id="modal-image" style="max-width:100%; display:none; margin-bottom:1rem;">
        <div id="image-info"></div>
    </div>
</div>

    <!-- Sistema de Citas -->
 <section id="citas" class="appointments">
  <div class="container">
    <h2>Reservar Cita</h2>
    <form id="appointment-form-reserva" class="appointment-form">
      <!-- Datos del cliente -->
      <div class="form-group">
        <label for="first-name">Nombre:</label>
        <input type="text" id="first-name" name="first_name" required>
      </div>

      <div class="form-group">
        <label for="last-name">Apellido:</label>
        <input type="text" id="last-name" name="last_name" required>
      </div>

      <div class="form-group">
        <label for="client-email">Email:</label>
        <input type="email" id="client-email" name="email" required>
      </div>

      <div class="form-group">
        <label for="client-phone">Teléfono:</label>
        <input type="tel" id="client-phone" name="phone" required>
      </div>

      <!-- Selección de artista -->
      <div class="form-group">
        <label for="artist-select">Artista Preferido:</label>
        <select id="artist-select" name="artist_id" required>
          <option value="">Cargando artistas...</option>
        </select>
      </div>

      <!-- Fecha y hora -->
      <div class="form-group">
        <label for="appointment-date">Fecha:</label>
        <input type="date" id="appointment-date" name="appointment_date" required>
      </div>

      <div class="form-group">
        <label for="appointment-time">Hora:</label>
        <select id="appointment-time" name="appointment_time" required>
          <option value="">Seleccionar hora</option>
          <option value="10:00:00">10:00 AM</option>
          <option value="11:00:00">11:00 AM</option>
          <option value="12:00:00">12:00 PM</option>
          <option value="13:00:00">1:00 PM</option>
          <option value="14:00:00">2:00 PM</option>
          <option value="15:00:00">3:00 PM</option>
          <option value="16:00:00">4:00 PM</option>
          <option value="17:00:00">5:00 PM</option>
        </select>
      </div>

      <!-- Información del tatuaje -->
      <div class="form-group">
        <label for="tattoo-description">Descripción del Tatuaje:</label>
        <textarea id="tattoo-description" name="tattoo_description" rows="4" required></textarea>
      </div>

      <!-- Campos ocultos -->
      <input type="hidden" name="status" value="pending">
      <input type="hidden" name="duration_hours" value="2.0">
      <input type="hidden" name="deposit_amount" value="50.00">
      <input type="hidden" name="deposit_paid" value="0">

      <button type="submit" class="btn btn-primary">Solicitar Cita</button>
    </form>
  </div>
</section>



    <!-- Lista de Espera -->

    <section id="lista-espera" class="waiting-list">
        <div class="container">
            <div class="header-section">
                <h2>Lista de Espera Actual</h2>
                <p class="subtitle">Consulta tu posición y los próximos disponibles</p>
            </div>

            <div class="stats-container">
                <div class="stat-card">
                    <div class="stat-number" id="totalWaiting">0</div>
                    <div class="stat-label">En Lista de Espera</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number" id="avgWaitTime">0</div>
                    <div class="stat-label">Días Promedio de Espera</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number" id="nextAvailable">0</div>
                    <div class="stat-label">Próximas Citas Disponibles</div>
                </div>
            </div>

            <div class="filter-section">
                <div class="filter-container">
                    <select id="artistFilter" class="filter-select">
                        <option value="">Todos los artistas</option>
                        <option value="1">Carlos Mendez</option>
                        <option value="2">Ana Rodriguez</option>
                        <option value="3">Miguel Torres</option>
                        <option value="4">Sofia Herrera</option>
                    </select>
                    <select id="styleFilter" class="filter-select">
                        <option value="">Todos los estilos</option>
                        <option value="realismo">Realismo</option>
                        <option value="tradicional">Tradicional</option>
                        <option value="geometrico">Geométrico</option>
                        <option value="blackwork">Blackwork</option>
                        <option value="acuarela">Acuarela</option>
                    </select>
                </div>
            </div>

            <div class="table-container">
                <table id="waitingListTable" class="waiting-table">
                    <thead>
                        <tr>
                            <th>Posición</th>
                            <th>Artista</th>
                            <th>Estilo</th>
                            <th>Tamaño</th>
                            <th>Ubicación</th>
                            <th>Fecha Estimada</th>
                            <th>Estado</th>
                            <th>Sesiones</th>
                        </tr>
                    </thead>
                    <tbody id="tableBody">
                        <!-- Los datos se cargarán dinámicamente -->
                    </tbody>
                </table>
            </div>

            <div class="info-section">
                <div class="info-card">
                    <h3>¿Cómo funciona la lista de espera?</h3>
                    <ul>
                        <li>Las posiciones se actualizan en tiempo real</li>
                        <li>Te contactaremos cuando sea tu turno</li>
                        <li>Tienes 48 horas para confirmar tu cita</li>
                        <li>Los tiempos son estimados y pueden variar</li>
                    </ul>
                </div>
                <div class="info-card">
                    <h3>Estados de la lista</h3>
                    <div class="status-legend">
                        <div class="legend-item">
                            <span class="status-badge status-pending">Pendiente</span>
                            <span>Esperando confirmación</span>
                        </div>
                        <div class="legend-item">
                            <span class="status-badge status-confirmed">Confirmado</span>
                            <span>Cita programada</span>
                        </div>
                        <div class="legend-item">
                            <span class="status-badge status-in_progress">En Proceso</span>
                            <span>Tatuaje en progreso</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>



    <section class="testimonials">
        <div class="container">
            <h2>Lo que Dicen Nuestros Clientes</h2>
            <div class="testimonials-grid">
                <div class="testimonial-card">
                    <div class="stars">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                    </div>
                    <p>"Increíble trabajo y atención al detalle. Mi tatuaje quedó mejor de lo que imaginé."</p>
                    <h4>- María González</h4>
                </div>
                <div class="testimonial-card">
                    <div class="stars">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                    </div>
                    <p>"Profesionales, limpios y muy talentosos. Definitivamente regresaré."</p>
                    <h4>- Carlos Rodríguez</h4>
                </div>
                <div class="testimonial-card">
                    <div class="stars">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                    </div>
                    <p>"El mejor estudio de la ciudad. Artistas increíbles y ambiente muy profesional."</p>
                    <h4>- Ana Martínez</h4>
                </div>
            </div>
        </div>
    </section>

    <!-- Contacto -->
    <section id="contacto" class="contact">
        <div class="container">
            <h2>Contacto</h2>
            <div class="contact-container">
                <div class="contact-info">
                    <h3>Información del Estudio</h3>
                    <div class="contact-item">
                        <i class="fas fa-map-marker-alt"></i>
                        <div>
                            <h4>Dirección</h4>
                            <p>Calle del Arte 123<br>Ciudad Tinta, CT 12345</p>
                        </div>
                    </div>
                    <div class="contact-item">
                        <i class="fas fa-phone"></i>
                        <div>
                            <h4>Teléfono</h4>
                            <p>(555) 123-4567</p>
                        </div>
                    </div>
                    <div class="contact-item">
                        <i class="fas fa-envelope"></i>
                        <div>
                            <h4>Email</h4>
                            <p>info@inkdreams.com</p>
                        </div>
                    </div>
                    <div class="contact-item">
                        <i class="fas fa-clock"></i>
                        <div>
                            <h4>Horarios</h4>
                            <p>Lun - Sáb: 11:00 AM - 8:00 PM<br>Dom: Cerrado</p>
                        </div>
                    </div>
                    <div class="social-links">
                        <a href="#"><i class="fab fa-instagram"></i></a>
                        <a href="#"><i class="fab fa-facebook"></i></a>
                        <a href="#"><i class="fab fa-twitter"></i></a>
                    </div>
                </div>
                
                <form id="contact-form" class="contact-form">
                    <div class="form-group">
                        <label for="contact-name">Nombre:</label>
                        <input type="text" id="contact-name" name="contactName" required>
                    </div>
                    <div class="form-group">
                        <label for="contact-email">Email:</label>
                        <input type="email" id="contact-email" name="contactEmail" required>
                    </div>
                    <div class="form-group">
                        <label for="contact-subject">Asunto:</label>
                        <select id="contact-subject" name="contactSubject" required>
                            <option value="">Seleccionar asunto</option>
                            <option value="general">Consulta General</option>
                            <option value="appointment">Pregunta sobre Cita</option>
                            <option value="pricing">Información de Precios</option>
                            <option value="aftercare">Cuidados Post-Tatuaje</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="contact-message">Mensaje:</label>
                        <textarea id="contact-message" name="contactMessage" rows="5" required></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary">Enviar Mensaje</button>
                </form>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <h3>INK DREAMS</h3>
                    <p>Estudio de tatuajes premium dedicado a convertir tu visión en arte sobre la piel.</p>
                </div>
                <div class="footer-section">
                    <h4>Enlaces Rápidos</h4>
                    <ul>
                        <li><a href="#inicio">Inicio</a></li>
                        <li><a href="#artistas">Artistas</a></li>
                        <li><a href="#galeria">Galería</a></li>
                        <li><a href="#citas">Citas</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h4>Servicios</h4>
                    <ul>
                        <li>Diseños Personalizados</li>
                        <li>Consultas</li>
                        <li>Retoques</li>
                        <li>Cover-ups</li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h4>Contacto</h4>
                    <p>Calle del Arte 123<br>Ciudad Tinta, CT 12345<br>(555) 123-4567</p>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2024 Ink Dreams. Todos los derechos reservados.</p>
            </div>
        </div>
    </footer>

    <!-- Modal para detalles de artista -->
    <div id="artist-modal" class="modal">
        <div class="modal-content">
            <span class="close">&times;</span>
            <div id="artist-details"></div>
        </div>
    </div>

    <!-- Modal para galería -->
    <div id="gallery-modal" class="modal">
        <div class="modal-content">
            <span class="close">&times;</span>
            <img id="modal-image" src="./img/placeholder.svg" alt="">
            <div id="image-info"></div>
        </div>
    </div>

    <!-- Notificaciones -->
    <div id="notification" class="notification"></div>

    <script src="./js/script.js"></script>
    <script src="./js/main.js"></script>
</body>
</html>
<script>
    
</script>