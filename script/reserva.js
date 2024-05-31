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
document.addEventListener('DOMContentLoaded', function() {   
    //lista de los meses del años
    let monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September','October', 'November', 'December'];

    //variables 
    let currentDate = new Date();
    let currentDay = currentDate.getDate();
    let monthNumber = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();
    let selectedDayElement;

    let dates = document.getElementById('dates');
    let month = document.getElementById('month');
    let year = document.getElementById('year');

    let prevMonthDOM = document.getElementById('prev-month');
    let nextMonthDOM = document.getElementById('next-month');

    month.textContent = monthNames[monthNumber];
    year.textContent = currentYear.toString();

    prevMonthDOM.addEventListener('click', ()=>lastMonth());
    nextMonthDOM.addEventListener('click', ()=>nextMonth());



    const writeMonth = (month) => {
        //muestra el mes del calendario. Para ello tiene que calcular los días totales del mes
        let today = new Date();
        today.setHours(0, 0, 0, 0); 
    
        for(let i = startDay(); i>0;i--){
            dates.innerHTML += ` <div class="calendar__date calendar__item calendar__last-days">
                ${getTotalDays(monthNumber-1)-(i-1)}
            </div>`;
        }
        //si el día es posterior al día actual no se puede seleccionar y se mostrará en negro
        for(let i=1; i<=getTotalDays(month); i++){
            let date = new Date(currentYear, monthNumber, i);
            if (date < today) {
                dates.innerHTML += ` <div class="calendar__date calendar__item calendar__past">${i}</div>`;
            } else {
                dates.innerHTML += ` <div class="calendar__date calendar__item" onclick="selectDay(this, ${i})">${i}</div>`;
            }
        }
    }
    
    window.selectDay = (element, day) => {
        //si se selecciona un día se le camvbia el estilo
        selectedDay = day;
        if(selectedDayElement) {
            selectedDayElement.classList.remove('calendar__today');  // Restablecer el estilo del día anteriormente seleccionado
        }
        selectedDayElement = element;
        selectedDayElement.classList.add('calendar__today');  // Cambiar el estilo del día seleccionado
    }
    const getTotalDays = month => {
        //se obtienen los días de cada mes en función de la posicion de en la que están en la lista.
        //también se comprueba si el año es bisiesto
        if(month === -1) month = 11;

        if (month == 0 || month == 2 || month == 4 || month == 6 || month == 7 || month == 9 || month == 11) {
            return  31;

        } else if (month == 3 || month == 5 || month == 8 || month == 10) {
            return 30;

        } else {

            return isLeap() ? 29:28;
        }
    }

    const isLeap = () => {
        return ((currentYear % 100 !==0) && (currentYear % 4 === 0) || (currentYear % 400 === 0));
    }

    const startDay = () => {
        let start = new Date(currentYear, monthNumber, 1);
        return ((start.getDay()-1) === -1) ? 6 : start.getDay()-1;
    }

    const lastMonth = () => {
        if(monthNumber !== 0){
            monthNumber--;
        }else{
            monthNumber = 11;
            currentYear--;
        }

        setNewDate();
    }

    const nextMonth = () => {
        if(monthNumber !== 11){
            monthNumber++;
        }else{
            monthNumber = 0;
            currentYear++;
        }

        setNewDate();
    }

    const setNewDate = () => {
        currentDate.setFullYear(currentYear,monthNumber,currentDay);
        month.textContent = monthNames[monthNumber];
        year.textContent = currentYear.toString();
        dates.textContent = '';
        writeMonth(monthNumber);
    }
    let restauranteSeleccionado = null;
    let mapa = L.map('mapa').setView([40.435518, -3.710789], 13); // Se crea un mapa con las coordenadas de Madrid

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
    }).addTo(mapa);

    //Hemos añadidio runos restaurantes obteniendo sus posiciones desde google maps
    let restaurantes = [
        { nombre: 'Av. de Euskadi, 1, 28917 Leganés, Madrid', latitud: 40.359575250820996,  longitud: -3.776685816751896 },
        { nombre: 'Prta del Sol, 3, 28013 Madrid', latitud: 40.41963580625915,   longitud: -3.7033209114436487 },
        { nombre: 'C.Gran Vía, 49, 28013 Madrid', latitud: 40.42238276179494,   longitud: -3.7070186674687218 },
        { nombre: 'C.Gran Vía, 65, 28013 Madrid', latitud: 40.423924601114805,   longitud: -3.7103402164944153 },
        { nombre: 'C. de José Ortega y Gasset, 29, 28006 Madrid', latitud: 40.43175659907796,   longitud: -3.6827956635984176 },
        { nombre: 'C. Arcipreste de Hita, 10, 28015 Madrid', latitud: 40.43479864801328,   longitud: -3.717068182866537 },
        { nombre: 'Gta. de Quevedo, 9, 28015 Madrid', latitud: 40.43509409269184,   longitud: -3.7038707657357297 },
        { nombre: 'C. de Julián Romea, 4, 28003 Madrid', latitud: 40.44447378630017,   longitud:  -3.7129925099290815 },
        { nombre: 'C. de Clara del Rey, 59, 28002 Madrid', latitud: 40.44739786757195,   longitud:  -3.6682523239509504 },
        { nombre: 'C. de Orense, 16, 28020 Madrid', latitud: 40.45137828498305,   longitud:  -3.6952192376457247 },
        { nombre: 'C. de Bravo Murillo, 109, 28020 Madrid', latitud: 40.450433,   longitud:   -3.704199 },
        { nombre: 'P.º de la Castellana, 280, 28046 Madrid', latitud: 40.477215,   longitud:  -3.686300 },
        { nombre: 'C. del Padre Damián, 38, 28036 Madrid', latitud: 40.45995749403936,   longitud:  -3.6851066450101837 },
        { nombre: 'C/ del Mirador de la Reina, 107, 28035 Madrid', latitud: 40.497370,  longitud:  -3.723495 },
        { nombre: 'Cam. de la Zarzuela, 15, 28023 Madrid', latitud: 40.470637,   longitud:  -3.785155 },
        { nombre: 'C. Fresa, 2, 28222 Majadahonda, Madrid', latitud: 40.460973,   longitud:  -3.872359 },
        { nombre: 'C. Gran Vía, 2, 28220 Majadahonda, Madrid', latitud: 40.472987 ,   longitud:  -3.870986 },
        { nombre: 'C. Matemáticos, 8, 28222 Majadahonda, Madrid', latitud: 40.494139,    longitud:  -3.895705 },
        { nombre: 'CC Heron City, C. Juan Ramón Jiménez,  Las Rozas de Madrid, Madrid', latitud: 40.520765,   longitud:  -3.897421 },
        { nombre: 'C. Camilo José Cela, 24, 28232 Las Rozas de Madrid, Madrid', latitud:40.527811,    longitud:  -3.890555 },
        { nombre: 'Centro Comercial, Ctra. de La Coruña, 28232 Las Rozas de Madrid, Madrid', latitud: 40.530159,   longitud:  -3.884718 },
        { nombre: 'Av del Manzanares, 210, 28026 Madrid', latitud: 40.394019,   longitud:  -3.702164 },
        { nombre: 'C. del Conde de Cartagena, 18, 28007 Madrid', latitud: 40.40975598583692,   longitud:   -3.673515544699876 },
        { nombre: 'Rda. de Valencia, 8, 28012 Madrid', latitud: 40.408158834151045,   longitud:  -3.701382989085357 },
        { nombre: 'Pl. Canovas del Castillo, 5, 28014 Madrid', latitud: 40.416965,   longitud:  -3.695088 },
        { nombre: 'C. de Alcalá, 474, 28027 Madrid', latitud: 40.442923312164886,   longitud: -3.6328853232195697 },
        { nombre: 'O. Planetocio, Av. Juan Carlos I, 46, C.C, 28400 Collado Villalba, Madrid', latitud: 40.640677004716856,   longitud:  -4.01831473042606},
        {nombre: 'C. Isabel II, 1, 28660 Boadilla del Monte, Madrid', latitud: 40.40845614083459,   longitud:  -3.88070181694461},
    ];
    let direcciones = [];
    
    function limpiarCampos() {
    document.getElementById("nombre").value = "";
    document.getElementById("telefono").value = "";
    document.getElementById("direccion").value = "";
    document.getElementById("email").value = "";
    document.getElementById("hora").value = "";
    document.getElementById("numeroPersonas").value = "";
    document.getElementById("numeroPersonas").style.border = "2px solid white";
    document.getElementById("hora").style.border = "2px solid white";
    document.getElementById("nombre").style.border = "2px solid white";
    document.getElementById("telefono").style.border = "2px solid white";
    document.getElementById("email").style.border = "2px solid white";
    document.getElementById("direccion").style.border = "2px solid white";
    }
    document.getElementById('enviar').addEventListener('click', function (event) {
        event.preventDefault();
        EnviarReserva();
    });
    document.getElementById("boton_cercano").addEventListener("click", function() {
        //si se pulsa este botón se obtiene la dirección del usuario y se calcula el restaurante más cercano
        navigator.geolocation.getCurrentPosition(function(position) {
            let latitudUsuario = position.coords.latitude;
            let longitudUsuario = position.coords.longitude;

            let restauranteMasCercano = null;
            let distanciaMinima = Infinity;
            for (let i = 0; i < restaurantes.length; i++) {
                let restaurante = restaurantes[i];
                let distancia = mapa.distance([latitudUsuario, longitudUsuario], [restaurante.latitud, restaurante.longitud]);
                if (distancia < distanciaMinima) {
                    restauranteMasCercano = restaurante;
                    distanciaMinima = distancia;
                }
            }

            if (restauranteMasCercano) {
                restauranteSeleccionado = restauranteMasCercano
                L.marker([restauranteMasCercano.latitud, restauranteMasCercano.longitud]).addTo(mapa)
                    .bindPopup(restauranteMasCercano.nombre)
                    .openPopup();
            }
        });
    });
    for (let i = 0; i < restaurantes.length; i++) {
        let restaurante = restaurantes[i];
        direcciones.push(restaurante.nombre)
        L.marker([restaurante.latitud, restaurante.longitud]).addTo(mapa)
            .bindPopup(restaurante.nombre)
            .on('click', function() {
                restauranteSeleccionado = restaurante;
            })
    }
    const EnviarReserva = () => {
        //Si todos los datos son correctos se envía la reserva
        if ( verificarformatoDireccion() === false || verificarformatoNumeroPersonas() == false || verificarformatoHora() === false||verificarformatoNombre() === false || verificarformatoTelefono() === false|| verificarformatoEmail() === false    ){
            return;
        };

        let fecha = selectedDayElement ? selectedDayElement.innerText : null;
        if (!fecha) {
            alert("Por favor, selecciona una fecha en el calendario.");
            return;
        }
        let reserva = {
            nombre: document.getElementById("nombre").value.trim(), // Elimina espacios al final
            telefono: document.getElementById("telefono").value,
            email: document.getElementById("email").value,
            direccion: restauranteSeleccionado ? restauranteSeleccionado.nombre : document.getElementById("direccion").value,
            NumeroPerosnas: document.getElementById("numeroPersonas").value,
            hora: document.getElementById("hora").value,
            fecha: fecha 
        };


        let reservas = JSON.parse(localStorage.getItem("reservas")) || [];


        reservas.push(reserva);

        localStorage.setItem("reservas", JSON.stringify(reservas));

        limpiarCampos();
        window.location.href = "reserva_finalizada.html";
    }

    function verificarformatoEmail(){
        let email = document.getElementById("email").value;
        let expresion = /\w+@\w+\.+[a-z]/;// Expresión regular para el correo
        if (email === "") {
            document.getElementById("email").style.border = "2px solid red";
            alert("El campo email esta vacio");
            return false;
        } else if (!expresion.test(email)) {
            document.getElementById("email").style.border = "2px solid red";
            alert("El email no es valido");
            return false;
        } else {
            document.getElementById("email").style.border = "2px solid green";
            return true;
        }
    }
    function verificarformatoTelefono(){
        let telefono = document.getElementById("telefono").value;
        let expresion = /^[0-9]{9}$/; // Expresión regular para el telefono
        if (telefono === "") {
            document.getElementById("telefono").style.border = "2px solid red";
            alert("El campo telefono esta vacio");
            return false;
        } else if (!expresion.test(telefono)) {
            document.getElementById("telefono").style.border = "2px solid red";
            alert("El telefono no es valido");
            return false;
        } else {
            document.getElementById("telefono").style.border = "2px solid green";
            return true;
        }
    }
    function verificarformatoNombre(){
        let nombre = document.getElementById("nombre").value;
        let regexNombre = /^[a-zA-Z\s]*$/; // Expresión regular para nombres que solo contienen letras y espacios
        if (nombre === "") {
            document.getElementById("nombre").style.border = "2px solid red";
            alert("El campo nombre esta vacio");
            return false;
        } else if (!regexNombre.test(nombre)) {
            document.getElementById("nombre").style.border = "2px solid red";
            alert("El nombre solo debe contener letras y espacios");
            return false;
        } else {
            document.getElementById("nombre").style.border = "2px solid green";
            return true;
        }
    }
    function verificarformatoDireccion(){
        //Si se introduce una direccion solo puede ser una de las que está en el mapa
        if (restauranteSeleccionado){
            return true
        }
        let direccion = document.getElementById("direccion").value;
        if (direcciones.includes(direccion)) {
            return true;
        }
        alert("No tenemos ningun restaurante en esa dirección.");
            return false
    }
    function verificarformatoHora(){
        let hora = document.getElementById("hora").value;
        let regexHora = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/; // Expresión regular para horas en formato HH:MM
        if (hora === "") {
            document.getElementById("hora").style.border = "2px solid red";
            alert("El campo hora esta vacio");
            return false;
        } else if (!regexHora.test(hora)) {
            document.getElementById("hora").style.border = "2px solid red";
            alert("La hora debe tener el formato HH:MM");
            return false;
        } else {
            document.getElementById("hora").style.border = "2px solid green";
            return true;
        }
    }
    function verificarformatoNumeroPersonas(){
        let numeroPersonas = document.getElementById("numeroPersonas").value;
        let regexNumero = /^[0-9]+$/; // Expresión regular para números
        if (numeroPersonas === "") {
            document.getElementById("numeroPersonas").style.border = "2px solid red";
            alert("El campo número de personas esta vacio");
            return false;
        } else if (!regexNumero.test(numeroPersonas)) {
            document.getElementById("numeroPersonas").style.border = "2px solid red";
            alert("El número de personas debe ser un número");
            return false;
        } else {
            document.getElementById("numeroPersonas").style.border = "2px solid green";
            return true;
        }
    }
    window.EnviarReserva = EnviarReserva;    
    writeMonth(monthNumber);
});

