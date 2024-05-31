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
document.addEventListener("DOMContentLoaded", function() {
    var paso1 = document.getElementById('paso1');
    var menu_infantil = document.getElementById('menu_infantil')


    var volver = document.getElementById('volver');
    var tituloinf = document.getElementById('titulo-apartado-inf');
    

    // Función para mostrar el paso correspondiente.
    function mostrarPaso1(event) {
        event.preventDefault();
        paso1.classList.add('mostrar');
        menu_infantil.classList.remove('mostrar');
    }

    // Función para mostrar el menu infantil.
    function mostrarMenuInfantil(event) {
        event.preventDefault();
        paso1.classList.remove('mostrar'); 
        menu_infantil.classList.add('mostrar');
    }

    volver.addEventListener('click', mostrarPaso1);
    tituloinf.addEventListener('click',mostrarMenuInfantil);

});



document.addEventListener("DOMContentLoaded", function() {
    var questions = document.querySelectorAll("#foodForm .pregunta");
    var currentQuestionIndex = 0;

    document.getElementById("nextButton").addEventListener("click", function() {
        // Oculta la pregunta actual
        questions[currentQuestionIndex].style.display = "none";

        // Incrementa el índice de la pregunta actual
        currentQuestionIndex++;

        // Si hay una siguiente pregunta, muéstrala
        if (currentQuestionIndex < questions.length) {
            questions[currentQuestionIndex].style.display = "block";
        } else {
            // Si no hay una siguiente pregunta, muestra el botón "Recomendar"
            document.getElementById("nextButton").style.display = "none";
            document.getElementById("recommendButton").style.display = "block";
        }
    });

    document.getElementById("recommendButton").addEventListener("click", function() {
        recommendDish();
        // Restablece el índice de la pregunta actual a 0
        currentQuestionIndex = 0;
        // Muestra la primera pregunta
        questions[currentQuestionIndex].style.display = "block";
        // Oculta el botón "Recomendar" y muestra el botón "Siguiente"
        document.getElementById("recommendButton").style.display = "none";
        document.getElementById("nextButton").style.display = "block";
    });

});

function recommendDish() {
    // Obtiene los valores de las respuestas
    var HoradeComer = document.getElementById("HoradeComer").value;
    var Hambre = document.getElementById("Hambre").value;
    var Queso = document.getElementById("Queso").value;
    var Picante = document.getElementById("Picante").value;
    var BBQ = document.getElementById("BBQ").value;
    var Chocolate = document.getElementById("Chocolate").value;
    var Hamburguesas = document.getElementById("Hamburguesas").value;
    var Tarta = document.getElementById("Tarta").value;
    var Pescado = document.getElementById("Pescado").value;
    var Vegetariano = document.getElementById("Vegetariano").value;
    var dishName;
    var dishImageSrc;

    // Recomienda un plato según las respuestas
    if (HoradeComer == "Desayuno" || HoradeComer == "Merienda") {
        if (Chocolate == "yes") {
            if (Tarta == "yes"){
                dishName = "Choco&Caramel";
                dishImageSrc = "images/img/tartaa.png";
            }
            else{
                dishName = "Tortitas";
                dishImageSrc = "images/img/tortitas.png";
            }
        } 
        else {
            dishName = "Fundy OClock";
            dishImageSrc = "images/img/oclock.png";
        }
    } else if (HoradeComer == "Comida" || HoradeComer == "Cena") {
        if (Vegetariano=="yes"){
            dishName = "Vegan Burguer";
            dishImageSrc = "images/img/VEGAN.jpg";
        }
        else{
            if (Hambre == "yes") {
                if (Hamburguesas == "burgers") {
                    if (BBQ == "yes") {
                        dishName = "Chicken BBQ";
                        dishImageSrc = "images/img/BBQ.png";
                    } else {
                        if (Queso == "yes") {
                            dishName = "La Burratisima";
                            dishImageSrc = "images/img/BURRATA.png";
                        } else {
                            dishName = "Vegan Burguer";
                            dishImageSrc = "images/img/VEGAN.jpg";
                        }
                    }
                } else {
                    if (BBQ == "yes") {
                        dishName = "Kentucky";
                        dishImageSrc = "images/img/kentucky.jpg";
                    } else {
                        if (Queso == "yes") {
                            dishName = "Cubano";
                        dishImageSrc = "images/img/cubano.jpg";
                        } else {
                            if (Pescado=="yes"){
                                dishName = "Salmon";
                                dishImageSrc = "images/img/salmon.png";
                            }
                            else{
                                if (Picante == "yes") {
                                    dishName = "Cacho Power";
                                    dishImageSrc = "images/img/cachopower.jpg";
                                } else {
                                    dishName = "Pastrami";
                                    dishImageSrc = "images/img/pastrami.jpg";
                                }
                            }
                        }
                    }
                }
            } else {
                if (Picante == "yes") {
                    dishName = "Alitas";
                    dishImageSrc = "alitas.png";
                } else {
                    if (Queso == "yes") {
                        dishName = "Nachos";
                        dishImageSrc = "nachos.jpg";
                    } else {
                        dishName = "Quesadilla";
                        dishImageSrc = "quesadilla.jpg";
                    }
                }
            }
        }
    }
    // Muestra el nombre y la imagen del plato
    document.getElementById("dishImage").src = dishImageSrc;
    document.getElementById("dishName").textContent = dishName;

    // Oculta el formulario y muestra la imagen y el nombre del plato
    document.getElementById("foodForm").style.display = "none";
    document.getElementById("dishDisplay").style.display = "block";
    document.getElementById("dishName").style.display = "block";
    document.getElementById("dishImage").style.display = "block";

    // Muestra el formulario y oculta la imagen y el nombre del plato después de 10 segundos
    setTimeout(function() {
        document.getElementById("foodForm").style.display = "block";
        document.getElementById("dishDisplay").style.display = "none";
        document.getElementById("dishName").style.display = "none";
        document.getElementById("dishImage").style.display = "none";
    }, 10000);
}


