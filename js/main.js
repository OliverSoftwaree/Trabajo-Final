$(document).ready(function() {
    // 1. Inicializar Tooltips de Bootstrap
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    });

    // 2. Filtros de Categoría animacion
    $('.filtro-btn').click(function() {
        var categoria = $(this).attr('data-filter');
        $('.filtro-btn').removeClass('active');
        $(this).addClass('active');

        if (categoria == "todos") {
            $('.paquete').fadeIn(500);
        } else {
            $('.paquete').hide();
            $('.paquete.' + categoria).fadeIn(500);
        }
    });

    // 3. ÚNICO MANEJO DEL FORMULARIO 
    $('#formRegistro').on('submit', function(e) {
        e.preventDefault();
        
        const btn = $(this).find('button');
        const originalText = btn.html();
        const nombre = $('#nombre').val();
        const destino = $('#destinoRegistro option:selected').text();

        // Efecto de carga profesional
        btn.html('<i class="fas fa-spinner fa-spin me-2"></i> Verificando disponibilidad...');
        btn.prop('disabled', true);

        setTimeout(() => {
            // Mensaje final 
            alert(`¡Registro Exitoso, ${nombre}!\n\nTu expedición a "${destino}" ha sido reservada.\nUn guía NOMAD revisará tu perfil y te contactará pronto.`);
            
            // Resetear formulario y botón
            btn.html(originalText);
            btn.prop('disabled', false);
            this.reset();
            
            // Limpiar estilos de validación
            $(this).find('input').css({'border-color': '', 'box-shadow': ''});
        }, 2000);
    });

    // 4. Validación de Email 
    $('#email').on('keyup', function() {
        const email = $(this).val();
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (regex.test(email)) {
            $(this).css({'border-color': '#2d5a27', 'box-shadow': '0 0 5px rgba(45, 90, 39, 0.5)'});
        } else {
            $(this).css({'border-color': '#dc3545', 'box-shadow': '0 0 5px rgba(220, 53, 69, 0.5)'});
        }
    });
});

// 5. Control del Navbar al hacer Scroll
$(window).scroll(function() {
    if ($(this).scrollTop() > 50) {
        $('.navbar').addClass('navbar-scrolled shadow-lg');
    } else {
        $('.navbar').removeClass('navbar-scrolled shadow-lg');
    }
});

// 6. Animación de aparición de paquetes
function animarScroll() {
    $('.paquete').each(function() {
        var posicionElemento = $(this).offset().top;
        var posicionPantalla = $(window).scrollTop() + $(window).height() - 100;

        if (posicionPantalla > posicionElemento) {
            $(this).addClass('aparecer');
        }
    });
}
$(window).on('scroll load', animarScroll);

// 7. Texto Dinámico en el Hero
const palabras = ["Inexplorado", "Salvaje", "Auténtico", "Legendario"];
let i = 0;
setInterval(function() {
    $('#texto-dinamico').fadeOut(400, function() {
        $(this).text(palabras[i]).fadeIn(400);
        i = (i + 1) % palabras.length;
    });
}, 3000);