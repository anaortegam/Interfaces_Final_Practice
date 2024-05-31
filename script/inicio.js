document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('enviarComentarioButton').addEventListener('click', function () {
        EnviarComen(); //llama a la función para enviar comentarios
    });
});

document.addEventListener('DOMContentLoaded', function() {
    let promocionesLink = document.querySelector('a[href="#promociones"]');
    promocionesLink.addEventListener('click', function() {
        cerrarMenu();
    });

    document.getElementById('btn-menu-open').addEventListener('click', function() {
        abrirMenu();
    });

    document.getElementById('btn-menu-close').addEventListener('click', function() {
        cerrarMenu();
    });
});

function abrirMenu() {
    //abre el menú de hamburguesa en modo móvil o tablet
    var containerMenu = document.querySelector('.container-menu');
    containerMenu.style.opacity = 1;
    containerMenu.style.visibility = 'visible';
}

function cerrarMenu() {
    //cierra el menú de hamburguesa en modo móvil o tablet
    var containerMenu = document.querySelector('.container-menu');
    containerMenu.style.opacity = 0;
    containerMenu.style.visibility = 'hidden';

    var btnMenuOpen = document.getElementById('btn-menu-open');
    var btnMenuClose = document.getElementById('btn-menu-close');
    
    if (btnMenuOpen.checked) {
        btnMenuOpen.checked = false;
    }
    
    if (btnMenuClose.checked) {
        btnMenuClose.checked = false;
    }
}

function EnviarComen(){
    let comentario = document.getElementById("comentarios").value;
    
    // Comprueba si el comentario está vacío
    if (comentario.trim() === "") {
        alert("El comentario no puede estar vacío.");
        return;
    }
    //Se cargan los comentarios guardados y se añade el nuevo con su fecha
    let comentarios = JSON.parse(localStorage.getItem("comentarios")) || [];
    let fecha = new Date();
    let fechaFormateada = fecha.getDate() + "/" + (fecha.getMonth() + 1) + "/" + fecha.getFullYear();
    comentarios.push({texto: comentario, fecha: fechaFormateada});
    localStorage.setItem("comentarios", JSON.stringify(comentarios));
    
    document.getElementById("comentarios").value = "";
    alert("Se ha enviado su comentario.");

    mostrarComentarios();
}
function limpiarCamposRegistro(){
    //Se borran los datos de los campos
    document.getElementById("dni_r").value = "";
    document.getElementById("email_r").value = "";
    document.getElementById("nombre_r").value = "";
    document.getElementById("fecha_r").value = "";
    document.getElementById("contrasena_r").value = "";
    document.getElementById("conf_contrasena_r").value = "";
}
function mostrarComentarios() {
    //muestra las reseñas con un ícono y la fecha
    let comentarios = JSON.parse(localStorage.getItem("comentarios")) || [];
    let contenedorComentarios = document.getElementById("comentariosGuardados");
    contenedorComentarios.innerHTML = '';
    for (let i = 0; i < comentarios.length; i++) {
        contenedorComentarios.innerHTML += '<p><img src="images/img/perfil.png" class="icono-usuario">' + comentarios[i].texto + '<span class="fecha-comentario">' + comentarios[i].fecha + '</span></p>';
    }
}

window.onload = mostrarComentarios;

document.addEventListener('DOMContentLoaded', (event) => {
    //slider para el modo móvil
    const btnLeft = document.querySelector(".btn-left"),
          btnRight = document.querySelector(".btn-right"),
          slider = document.querySelector("#slider"),
          sliderSection = document.querySelectorAll(".slider-section");

    btnLeft.addEventListener("click", e => moveToLeft())
    btnRight.addEventListener("click", e => moveToRight())

    let operacion = 0,
        counter = 0,
        widthImg = 30 / sliderSection.length;

    function moveToRight() {
        if (counter >= sliderSection.length-1) {
            counter = 0;
            operacion = 0;
            slider.style.transform = `translate(-${operacion}%)`;
            slider.style.transition = "none";
            return;
        } 
        counter++;
        operacion = operacion + widthImg;
        slider.style.transform = `translate(-${operacion}%)`;
        slider.style.transition = "all ease .6s"
        
    }  

    function moveToLeft() {
        counter--;
        if (counter < 0 ) {
            counter = sliderSection.length-1;
            operacion = widthImg * (sliderSection.length-1)
            slider.style.transform = `translate(-${operacion}%)`;
            slider.style.transition = "none";
            return;
        } 
        operacion = operacion - widthImg;
        slider.style.transform = `translate(-${operacion}%)`;
        slider.style.transition = "all ease .6s"       
    };  

});