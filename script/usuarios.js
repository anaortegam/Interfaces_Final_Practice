// Abre el menú de la barra de nacegación
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('btn-menu-open').addEventListener('click', function() {
        abrirMenu();
    });

    document.getElementById('btn-menu-close').addEventListener('click', function() {
        cerrarMenu();
    });
});

function abrirMenu() {
    var containerMenu = document.querySelector('.container-menu');
    containerMenu.style.opacity = 1;
    containerMenu.style.visibility = 'visible';
}

function cerrarMenu() {
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

// Lista de usuarios
let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

function buscarUsuario(email) {
    // Buscar usuario por email
    const usuario = usuarios.find((usuario) => usuario.email == email);
    return usuario;
}

function validarRegistro() {
    // Obtener datos del formulario
    const dni = document.getElementById('dni_r').value;
    const nombre = document.getElementById('nombre_r').value;
    const contraseña = document.getElementById('contrasena_r').value;
    const conf_contraseña = document.getElementById('conf_contrasena_r').value;
    const email = document.getElementById('email_r').value;
    const fecha = document.getElementById('fecha_r').value;

    // Validar DNI
    const dniRegex = /^[0-9]{8}[A-Za-z]$/;
    if (!dniRegex.test(dni)) {
        alert('Formato de DNI inválido');
        return false;
    }

    // Validar nombre y apellido
    if (nombre == '') {
        alert('Por favor, ingrese su nombre y apellido');
        return false;
    }
    // Validar fecha de nacimiento
    const fechaRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/([12][0-9]{3})$/;
    if(!fechaRegex.test(fecha)){
        alert('Formato de la fecha inválido');
        return false;
    }
    // Validar correo electrónico
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        alert('Formato de correo electrónico inválido');
        return false;
    }
    // Buscar usuario por email
    if (buscarUsuario(email)) {
        alert('Ya existe un usuario con ese correo electrónico');
        return false;
    }
    // Validar contraseña
    if (contraseña == '') {
        alert('Por favor, ingrese una contraseña');
        return false;
    }
    // Validar confirmación de contraseña
    if(contraseña != conf_contraseña){
        alert('Las contraseñas no coinciden');
        return false;
    }
    
    // Crear objeto de usuario
    const usuario = {
        dni: dni,
        nombre: nombre,
        contraseña: contraseña,
        email: email,
        fecha: fecha,
        nPedidos: 0,
    };

    // Añadir usuario a la lista
    usuarios.push(usuario);

    // Guardar lista de usuarios en LocalStorage
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    alert('Formulario enviado correctamente');
    window.location = 'inicio.html';
    return true;
}

function validarLogin(){
    const email = document.getElementById('email_l').value;
    const contraseña = document.getElementById('contrasena_l').value;

    // Buscar usuario por nombre
    const usuario = buscarUsuario(email);
    
    // Si no se encuentra el usuario, mostrar una alerta
    if (!usuario) {
        alert('Usuario no encontrado');
        return false;
    }
    
    // Validar contraseña
    if (usuario.contraseña != contraseña) {
        alert('Contraseña incorrecta');
        return false;
    }

    // Guardar usuario en LocalStorage
    localStorage.setItem('usuario', JSON.stringify(usuario));

    alert('Login correcto');
    window.location = 'inicio.html';
    return true;
}

// Arreglo del footer
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname == "/login.html"){
        let footer = document.getElementsByClassName('footer');
        if (footer.length > 0) {
            footer[0].style.position = "fixed";
        } else {
            console.error("No se encontró ningún elemento con la clase 'footer'.");
        }
    }
});

function inicio(){
    window.location.href = "inicio.html";
}

function register(){
    window.location.href = "register.html";
}