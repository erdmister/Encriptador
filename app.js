// ** FUNCIONES PRINCIPALES ** //
function procesarTexto(texto, operacion) {
    const conversiones = {
        'cifrar': {
            'e': 'enter',
            'i': 'imes',
            'a': 'ai',
            'o': 'ober',
            'u': 'ufat'
        },
        'descifrar': {
            'enter': 'e',
            'imes': 'i',
            'ai': 'a',
            'ober': 'o',
            'ufat': 'u'
        }
    };

    // Validar el texto
    if (!validarTexto(texto)) {
        alert("No se permite texto en mayúsculas, ni acentos ni caracteres especiales");
        return;
    }

    let textoArea = texto;
    for (let clave in conversiones[operacion]) {
        const regex = new RegExp(clave, 'g');
        textoArea = textoArea.replaceAll(regex, conversiones[operacion][clave]);
    }

    document.querySelector('.salidaTexto').innerText = textoArea;
    if (textoArea.trim() === '') {
        ocultarBotonCopiar(); // Oculta el botón de copiar si no hay texto
    } else {
        mostrarBotonCopiar(); // Muestra el botón de copiar si hay texto
    }
}

// Función para validar el texto
function validarTexto(texto) {
    return /^[^A-ZÁÉÍÓÚÑ@#$%^&*(),.\s]*$/.test(texto);
}

// Cifrar
function cifrarTexto() {
    var texto = document.getElementById("textoIn").value.trim();
    if (texto === '') {
        mostrarNotificacion("No has escrito nada");
        return;
    }
    procesarTexto(texto, 'cifrar');
}

// Descifrar
function descifrarTexto() {
    var texto = document.getElementById("textoIn").value.trim();
    if (texto === '') {
        mostrarNotificacion("No has escrito nada");
        return;
    }
    procesarTexto(texto, 'descifrar');
}

// Copiar
function copiarTexto() {
    var textoCopiado = document.querySelector(".salidaTexto").innerText;
    navigator.clipboard.writeText(textoCopiado);
    mostrarNotificacion("Traducción copiada");
}

// ** OTRAS FUNCIONES ** //
function mostrarNotificacion(mensaje) {
    var notificacion = document.getElementById("alerta");
    notificacion.innerText = mensaje;
    notificacion.style.display = "block";
    setTimeout(function () {
        notificacion.style.display = "none";
    }, 2000);
}

function limpiarCaja() {
    document.getElementById("textoIn").value = "";
    document.querySelector('.salidaTexto').innerText = "Resultado";
    ocultarBotonCopiar();
}


// Función para mostrar el botón de copiar
function mostrarBotonCopiar() {
    var botonCopiar = document.querySelector(".copiar");
    botonCopiar.style.display = "block";
}

// Función para ocultar el botón de copiar
function ocultarBotonCopiar() {
    var botonCopiar = document.querySelector(".copiar");
    botonCopiar.style.display = "none";
}

// Función para verificar si se debe mostrar u ocultar el botón de copiar
function verificarTexto() {
    var texto = document.getElementById("textoIn").value.trim();
    if (texto === '') {
        ocultarBotonCopiar();
    } 
}

// Agregar evento input al textarea
document.getElementById("textoIn").addEventListener("input", verificarTexto);

//Dark-mode
document.addEventListener('DOMContentLoaded', function() {
    darkMode();
});

function darkMode() {
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)');

    function updateDarkMode() {
        if (prefersDarkMode.matches) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }

    updateDarkMode(); // Llamar a la función para establecer el modo oscuro inicialmente

    prefersDarkMode.addEventListener('change', function() {
        updateDarkMode(); // Llamar a la función cuando cambien las preferencias de color
    });

    const darkModeButton = document.querySelector('.dark-mode-boton');

    darkModeButton.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
    });
}
