let intentosNo = 0;

const maxIntentos = 3;

const btnSi = document.getElementById("btnSi");
const btnNo = document.getElementById("btnNo");
const mensajeNo = document.getElementById("mensajeNo");


// BOTÓN SÍ

btnSi.addEventListener("click", function () {

    mostrarPantalla(2);

});


// BOTÓN NO

btnNo.addEventListener("mouseenter", moverNo);

btnNo.addEventListener("touchstart", function (e) {

    if (intentosNo < maxIntentos) {

        e.preventDefault();

        moverNo();

    }

});

btnNo.addEventListener("click", function () {

    if (intentosNo >= maxIntentos) {

        mostrarPantalla("No");

    }

});


function moverNo() {

    if (intentosNo >= maxIntentos) {

        btnNo.style.position = "relative";
        btnNo.style.left = "auto";
        btnNo.style.top = "auto";

        mensajeNo.innerText =
            "Ya, ahora sí te dejo jajaja";

        return;
    }

    intentosNo++;

    const zona =
        document.querySelector(".botones");


    const maxX =
        zona.clientWidth - btnNo.offsetWidth;

    const maxY =
        zona.clientHeight - btnNo.offsetHeight;


    const x =
        Math.random() * Math.max(0, maxX);

    const y =
        Math.random() * Math.max(0, maxY);


    btnNo.style.position = "absolute";

    btnNo.style.left = x + "px";

    btnNo.style.top = y + "px";


    const mensajes = [
        "¿Segura?",
        "Casi jajaja",
        "Ya, último intento"
    ];


    mensajeNo.innerText =
        mensajes[intentosNo - 1];

}


// CAMBIAR PANTALLAS

function mostrarPantalla(numero) {

    const pantallas =
        document.querySelectorAll(".pantalla");


    pantallas.forEach(function (pantalla) {

        pantalla.classList.remove("activa");

    });


    let id;


    if (numero === "No") {

        id = "pantallaNo";

    } else {

        id = "pantalla" + numero;

    }


    document
        .getElementById(id)
        .classList.add("activa");


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


// EVITAR FECHAS ANTERIORES A HOY

const fechaInput =
    document.getElementById("fecha");

const hoy =
    new Date();

const año =
    hoy.getFullYear();

const mes =
    String(hoy.getMonth() + 1)
        .padStart(2, "0");

const dia =
    String(hoy.getDate())
        .padStart(2, "0");


fechaInput.min = "2026-10-12";

read;


// CONFIRMAR

function confirmarFecha() {

    const fecha =
        document.getElementById("fecha").value;

    const hora =
        document.getElementById("hora").value;

    const error =
        document.getElementById("error");


    if (!fecha) {

        error.innerText =
            "Escoge un día.";

        return;

    }


    if (!hora) {

        error.innerText =
            "Escoge una hora.";

        return;

    }


    error.innerText = "";


    document.getElementById(
        "fechaFinal"
    ).innerText =
        convertirFecha(fecha);


    document.getElementById(
        "horaFinal"
    ).innerText =
        hora;


    mostrarPantalla(4);

}


// CONVERTIR FECHA

function convertirFecha(fecha) {

    const partes =
        fecha.split("-");


    const nuevaFecha =
        new Date(
            partes[0],
            partes[1] - 1,
            partes[2]
        );


    return nuevaFecha.toLocaleDateString(
        "es-PE",
        {
            weekday: "long",
            day: "numeric",
            month: "long"
        }
    );

}
function enviarWhatsApp() {

    const fecha =
        document.getElementById("fechaFinal").innerText;

    const hora =
        document.getElementById("horaFinal").innerText;

    const mensaje =
`Hola 😊

Ya elegí para nuestra salida.

Día: ${fecha}
Hora: ${hora}

Así que ya tenemos plan ☺️.
Ahora queda de tu parte la sorpresa 👀`;

    const numero = "51944200967";

    const url =
        "https://wa.me/" +
        numero +
        "?text=" +
        encodeURIComponent(mensaje);

    window.open(url, "_blank");
}