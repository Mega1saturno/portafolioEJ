document.addEventListener('DOMContentLoaded', function() {
    // --- Lógica del Formulario (Conservada) ---
    const form = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const nombre = document.getElementById('nombre').value;
            const servicio = document.getElementById('servicio').value;
            const email = document.getElementById('email').value;

            formMessage.style.color = 'var(--color-secundario)'; 
            formMessage.innerHTML = `¡Gracias, **${nombre}**! Tu solicitud para el servicio de **${servicio}** ha sido recibida. Te responderé al correo ${email} en breve.`;
            
            form.reset();
            formMessage.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // --- Lógica del Lightbox (Visor de Insignias y Certificados) ---
    const lightbox = document.getElementById('lightbox');
    const lightboxContentContainer = document.getElementById('lightbox-content-container');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxIframe = document.getElementById('lightbox-iframe');
    const closeBtn = document.getElementById('close-btn');

    // Función para mostrar el lightbox y configurar el contenido (Imagen o Certificado/Iframe)
    function showLightbox(type, content) {
        // 1. Reiniciar el estado
        lightboxImg.style.display = 'none';
        lightboxIframe.style.display = 'none';
        lightboxContentContainer.classList.remove('iframe-mode');

        // 2. Configurar el contenido y el modo
        if (type === 'image') {
            lightboxImg.src = content;
            lightboxImg.style.display = 'block';
            lightboxIframe.src = ''; // Limpiar el iframe por si acaso

        } else if (type === 'certificate') {
            lightboxIframe.src = content;
            lightboxIframe.style.display = 'block';
            lightboxContentContainer.classList.add('iframe-mode'); // Activa el tamaño grande en CSS
            lightboxImg.src = ''; // Limpiar la imagen
        }

        // 3. Mostrar el lightbox
        lightbox.style.display = 'flex';
    }

    // 1. Manejar el clic en las Insignias (Imágenes)
    const insigniaImgs = document.querySelectorAll('.insignia-img');
    insigniaImgs.forEach(img => {
        img.addEventListener('click', function() {
            showLightbox('image', this.src);
        });
    });

    // 2. Manejar el clic en los enlaces de Certificado
    const certificateBtns = document.querySelectorAll('.btn-open-certificate');
    certificateBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault(); // CLAVE: EVITA ABRIR UNA NUEVA PESTAÑA
            
            const certificateUrl = this.getAttribute('data-certificate-url');
            
            // Revisa si hay un enlace configurado
            if (certificateUrl) { 
                showLightbox('certificate', certificateUrl);
            } else {
                alert('No se encontró la URL del certificado.');
            }
        });
    });

    // 3. Manejar el cierre (Conservado)
    closeBtn.addEventListener('click', function() {
        lightbox.style.display = 'none';
        lightboxIframe.src = ''; // Limpiar el iframe al cerrar 
    });
    
    lightbox.addEventListener('click', function(e) {
        if (e.target.id === 'lightbox') {
            lightbox.style.display = 'none';
            lightboxIframe.src = ''; 
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.style.display === 'flex') {
            lightbox.style.display = 'none';
            lightboxIframe.src = ''; 
        }
    });
});