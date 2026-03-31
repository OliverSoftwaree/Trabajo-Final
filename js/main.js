$(document).ready(function() {
    // 1. Inicializar Tooltips de Bootstrap
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle=\"tooltip\"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    });

    // 2. Filtros de Categoría
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

    // 3. Manejo del Formulario de Registro
    $('#formRegistro').on('submit', function(e) {
        e.preventDefault();
        
        const nombre = $('#nombre').val();
        const descripcionNomad = "NOMAD representa la pasión por descubrir lo inexplorado con seguridad y respeto por la naturaleza. Al registrarte, dejas de ser un turista para convertirte en un expedicionario.";

        alert("¡Registro Exitoso, " + nombre + "!\n\n" + descripcionNomad + "\n\nUn asesor te contactará para coordinar tu viaje.");
        
        this.reset();
    });
});

$(window).scroll(function() {
    if ($(this).scrollTop() > 50) {
        $('.navbar').addClass('navbar-scrolled shadow-lg');
    } else {
        $('.navbar').removeClass('navbar-scrolled shadow-lg');
    }
});

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

$('#formRegistro').submit(function(e) {
    e.preventDefault();
    let btn = $(this).find('button');
    let originalText = btn.html();

    // Efecto de carga
    btn.html('<i class=\"fas fa-spinner fa-spin\"></i> Procesando ruta...');
    btn.prop('disabled', true);

    setTimeout(() => {
        alert("¡Expedición confirmada!\n\nHas dado el primer paso para salir de la rutina. Un guía NOMAD revisará tu perfil.");
        btn.html(originalText);
        btn.prop('disabled', false);
        this.reset();
    }, 2000);
});

const palabras = ["Inexplorado", "Salvaje", "Auténtico", "Legendario"];
let i = 0;

setInterval(function() {
    $('#texto-dinamico').fadeOut(400, function() {
        $(this).text(palabras[i]).fadeIn(400);
        i = (i + 1) % palabras.length;
    });
}, 3000);


// Validación de Email en tiempo real
$('#email').on('keyup', function() {
    const email = $(this).val();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (regex.test(email)) {
        $(this).css('border-color', '#2d5a27').css('box-shadow', '0 0 5px rgba(45, 90, 39, 0.5)');
    } else {
        $(this).css('border-color', '#dc3545').css('box-shadow', '0 0 5px rgba(220, 53, 69, 0.5)');
    }
});

// Efecto de botón "Cargando" al registrar
$('#formRegistro').submit(function(e) {
    e.preventDefault();
    const btn = $(this).find('button');
    const originalText = btn.html();

    btn.html('<i class="fas fa-spinner fa-spin me-2"></i> Verificando disponibilidad...');
    btn.prop('disabled', true);

    setTimeout(() => {
        const nombre = $('#nombre').val();
        alert(`¡Expedición confirmada para ${nombre}!\n\nUn guía NOMAD revisará tu solicitud.`);
        btn.html(originalText);
        btn.prop('disabled', false);
        this.reset();
        $(this).find('input').css('border-color', '').css('box-shadow', ''); // Limpiar estilos de validación
    }, 2000);
});