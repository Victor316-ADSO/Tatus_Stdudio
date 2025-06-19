

function loadGallery() {
    console.log(`[loadGallery] Cargando galería con filtro: ${currentFilter}`);

    fetch(`/Tatus_Studio/php/get_gallery.php?filter=${currentFilter}`)
        .then(response => {
            if (!response.ok) {
                console.error('[loadGallery] Error en la respuesta del servidor:', response.status);
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log(`[loadGallery] Datos recibidos:`, data);

            const container = document.getElementById('gallery-container');
            container.innerHTML = '';

            if (!Array.isArray(data)) {
                console.warn('[loadGallery] La respuesta no es un array:', data);
                return;
            }

            if (data.length === 0) {
                console.info('[loadGallery] No se encontraron elementos para el filtro:', currentFilter);
                container.innerHTML = '<p style="text-align:center; padding: 1rem;">No hay resultados para este filtro.</p>';
                return;
            }

            data.forEach(item => {
                const div = document.createElement('div');
                div.className = 'gallery-item';
                div.innerHTML = `
                    <img src="${item.thumbnail_url || item.image_url}" alt="${item.title}" onclick='showGalleryModal(${JSON.stringify(item)})'>
                `;
                container.appendChild(div);
            });
        })
        .catch(error => {
            console.error('[loadGallery] Fallo al cargar la galería:', error);
        });
}

function showGalleryModal(item) {
    console.log('[showGalleryModal] Mostrando modal para:', item);

    const modal = document.getElementById('gallery-modal');
    const image = document.getElementById('modal-image');
    const info = document.getElementById('image-info');

    image.src = item.image_url;
    image.style.display = 'block';

    info.innerHTML = `
        <div style="text-align: center; padding: 2rem;">
            <h3>${item.title}</h3>
            <p><strong>Artista:</strong> ${item.artist_name}</p>
            <p><strong>Categoría:</strong> ${item.tattoo_style}</p>
            <p>${item.description || 'Este impresionante trabajo muestra el estilo único del artista.'}</p>
        </div>
    `;

    modal.style.display = 'block';
}
window.showGalleryModal = showGalleryModal;

function setupGalleryFilters() {
    console.log('[setupGalleryFilters] Configurando filtros de galería');

    const filterButtons = document.querySelectorAll('.filter-btn');

    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            console.log(`[setupGalleryFilters] Filtro seleccionado: ${this.getAttribute('data-filter')}`);
            
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            currentFilter = this.getAttribute('data-filter');
            loadGallery();
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('[DOMContentLoaded] Inicializando galería');
    setupGalleryFilters();
    loadGallery();
});


