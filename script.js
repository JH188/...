let intentosNo = 0;

const maxIntentos = 3;

const btnSi = document.getElementById("btnSi");
const btnNo = document.getElementById("btnNo");
const mensajeNo = document.getElementById("mensajeNo");


// ==============================
// EMOJIS
// ==============================

const emojiCarita = "\uD83E\uDD7A";
const emojiLlorando = "\uD83D\uDE2D";
const emojiTriste = "\uD83D\uDE14";
const emojiSonrisa = "\uD83D\uDE0A";
const emojiBrillo = "\u2728";
const emojiCalendario = "\uD83D\uDCC5";
const emojiReloj = "\uD83D\uDD52";
const emojiTimido = "\uD83E\uDD2D";
const emojiOjos = "\uD83D\uDC40";


// ==============================
// BOTÓN SÍ
// ==============================

btnSi.addEventListener("click", function () {

    mostrarPantalla(2);

});


// ==============================
// BOTÓN NO
// ==============================

btnNo.addEventListener(
    "mouseenter",
    moverNo
);


btnNo.addEventListener(
    "touchstart",
    function (e) {

        if (intentosNo < maxIntentos) {

            e.preventDefault();

            moverNo();

        }

    }
);


btnNo.addEventListener(
    "click",
    function () {

        if (intentosNo >= maxIntentos) {

            mostrarPantalla("No");

        }

    }
);


// ==============================
// MOVER BOTÓN NO
// ==============================

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
        zona.clientWidth -
        btnNo.offsetWidth;


    const maxY =
        zona.clientHeight -
        btnNo.offsetHeight;


    const x =
        Math.random() *
        Math.max(0, maxX);


    const y =
        Math.random() *
        Math.max(0, maxY);


    btnNo.style.position =
        "absolute";


    btnNo.style.left =
        x + "px";


    btnNo.style.top =
        y + "px";


    const mensajes = [

        "¿Segura? " +
        emojiCarita,

        "Casi jajaja " +
        emojiLlorando,

        "Ya, último intento " +
        emojiTriste

    ];


    mensajeNo.innerText =
        mensajes[intentosNo - 1];

}


// ==============================
// CAMBIAR PANTALLAS
// ==============================

function mostrarPantalla(numero) {

    const pantallas =
        document.querySelectorAll(
            ".pantalla"
        );


    pantallas.forEach(
        function (pantalla) {

            pantalla.classList.remove(
                "activa"
            );

        }
    );


    let id;


    if (numero === "No") {

        id = "pantallaNo";

    } else {

        id =
            "pantalla" +
            numero;

    }


    document
        .getElementById(id)
        .classList.add("activa");


    // REINICIAR SI VUELVE AL INICIO
    if (numero === 1) {

        intentosNo = 0;


        btnNo.style.position =
            "relative";

        btnNo.style.left =
            "auto";

        btnNo.style.top =
            "auto";


        mensajeNo.innerText =
            "";

    }


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


// ==============================
// CONFIRMAR FECHA Y HORA
// ==============================

function confirmarFecha() {

    const fecha =
        document.getElementById(
            "fecha"
        ).value;


    const hora =
        document.getElementById(
            "hora"
        ).value;


    const error =
        document.getElementById(
            "error"
        );


    if (!fecha) {

        error.innerText =
            "Escoge un día " +
            emojiCarita;

        return;

    }


    if (!hora) {

        error.innerText =
            "Escoge una hora " +
            emojiSonrisa;

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


// ==============================
// CONVERTIR FECHA
// ==============================

function convertirFecha(fecha) {

    const partes =
        fecha.split("-");


    const nuevaFecha =
        new Date(
            Number(partes[0]),
            Number(partes[1]) - 1,
            Number(partes[2])
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


// ==============================
// ENVIAR A WHATSAPP
// ==============================

function enviarWhatsApp() {

    const fecha =
        document.getElementById(
            "fechaFinal"
        ).innerText;


    const hora =
        document.getElementById(
            "horaFinal"
        ).innerText;


    const sonrisa =
        String.fromCodePoint(
            0x1F60A
        );


    const carita =
        String.fromCodePoint(
            0x1F97A
        );


    const brillo =
        String.fromCodePoint(
            0x2728
        );


    const calendario =
        String.fromCodePoint(
            0x1F4C5
        );


    const reloj =
        String.fromCodePoint(
            0x1F552
        );


    const timido =
        String.fromCodePoint(
            0x1F92D
        );


    const ojos =
        String.fromCodePoint(
            0x1F440
        );


    const mensaje =

        "Holis, Jonathan " +
        sonrisa +

        "\n\n" +

        "Ya elegí para nuestra salida " +
        carita +
        brillo +

        "\n\n" +

        calendario +
        " Día: " +
        fecha +

        "\n" +

        reloj +
        " Hora: " +
        hora +

        "\n\n" +

        "Entonces ya tenemos plan " +
        timido +

        "\n\n" +

        "Ahora queda de tu parte la sorpresa " +
        ojos +
        brillo +

        "\n\n" +

        "Nos vemos ese día " +
        sonrisa;


    const numero =
        "51944200967";


    const parametros =
        new URLSearchParams();


    parametros.set(
        "phone",
        numero
    );


    parametros.set(
        "text",
        mensaje
    );


    const url =
        "https://api.whatsapp.com/send?" +
        parametros.toString();


    window.open(
        url,
        "_blank"
    );

}
