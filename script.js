/* =========================================
   CONVERSOR DE MONEDA
========================================= */

const currency = document.getElementById("currency");

const amount = document.getElementById("amount");

const exchangeRate =
    document.getElementById("exchangeRate");

const result =
    document.getElementById("result");

const convertButton =
    document.getElementById("convertButton");

const refreshRate =
    document.getElementById("refreshRate");


/*
    Cotizaciones de ejemplo.

    Podés cambiar estos valores
    cuando quieras.
*/

const rates = {

    USD: 1250,

    EUR: 1450,

    BRL: 230,

    UYU: 31,

    CLP: 1.35

};


/* =========================================
   FORMATEAR PESOS ARGENTINOS
========================================= */

function formatARS(value) {

    return new Intl.NumberFormat(
        "es-AR",
        {
            style: "currency",
            currency: "ARS",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }
    ).format(value);

}


/* =========================================
   CONVERTIR
========================================= */

function convertCurrency() {

    const amountValue =
        Number(amount.value);

    const rateValue =
        Number(exchangeRate.value);


    if (
        !Number.isFinite(amountValue) ||
        amountValue < 0
    ) {

        result.textContent = "$ 0,00";

        return;

    }


    if (
        !Number.isFinite(rateValue) ||
        rateValue <= 0
    ) {

        result.textContent = "$ 0,00";

        return;

    }


    const converted =
        amountValue * rateValue;


    result.textContent =
        formatARS(converted);

}


/* =========================================
   CAMBIO DE MONEDA
========================================= */

currency.addEventListener(
    "change",
    function () {

        const selectedCurrency =
            currency.value;


        exchangeRate.value =
            rates[selectedCurrency];


        convertCurrency();

    }
);


/* =========================================
   EVENTOS CONVERSOR
========================================= */

amount.addEventListener(
    "input",
    convertCurrency
);


exchangeRate.addEventListener(
    "input",
    convertCurrency
);


convertButton.addEventListener(
    "click",
    convertCurrency
);


/* =========================================
   RESTABLECER COTIZACIÓN
========================================= */

refreshRate.addEventListener(
    "click",
    function () {

        const selectedCurrency =
            currency.value;


        exchangeRate.value =
            rates[selectedCurrency];


        convertCurrency();

    }
);


/* =========================================
   SISTEMA DE NOTAS
========================================= */

const addNoteButton =
    document.getElementById(
        "addNoteButton"
    );

const notesContainer =
    document.getElementById(
        "notesContainer"
    );

const emptyNotes =
    document.getElementById(
        "emptyNotes"
    );


const noteModal =
    document.getElementById(
        "noteModal"
    );

const closeModal =
    document.getElementById(
        "closeModal"
    );

const cancelNote =
    document.getElementById(
        "cancelNote"
    );

const saveNote =
    document.getElementById(
        "saveNote"
    );

const noteTitle =
    document.getElementById(
        "noteTitle"
    );

const noteText =
    document.getElementById(
        "noteText"
    );


/* =========================================
   ABRIR MODAL
========================================= */

function openModal() {

    noteModal.classList.add(
        "active"
    );

    noteTitle.focus();

}


/* =========================================
   CERRAR MODAL
========================================= */

function closeNoteModal() {

    noteModal.classList.remove(
        "active"
    );

    noteTitle.value = "";

    noteText.value = "";

}


/* =========================================
   BOTÓN AGREGAR NOTA
========================================= */

addNoteButton.addEventListener(
    "click",
    openModal
);


closeModal.addEventListener(
    "click",
    closeNoteModal
);


cancelNote.addEventListener(
    "click",
    closeNoteModal
);


/* =========================================
   CREAR NOTA
========================================= */

function createNote(
    title,
    text
) {

    /*
        Creamos dinámicamente
        la tarjeta.
    */

    const note =
        document.createElement(
            "article"
        );


    note.className =
        "note note-yellow";


    note.innerHTML = `

        <div class="note-pin">
            📌
        </div>

        <div class="note-content">

            <h3>
                ${escapeHTML(title)}
            </h3>

            <p>
                ${escapeHTML(text)}
            </p>

            <small>
                🗓️ ${getCurrentDate()}
            </small>

        </div>

        <div class="note-actions">

            <button
                class="menu-button"
                title="Opciones"
            >
                ⋮
            </button>

            <button
                class="delete-button"
                title="Eliminar"
            >
                🗑
            </button>

        </div>

    `;


    /*
        Insertamos la nota
        antes del mensaje vacío.
    */

    notesContainer.insertBefore(
        note,
        emptyNotes
    );


    /*
        Activamos botón eliminar.
    */

    const deleteButton =
        note.querySelector(
            ".delete-button"
        );


    deleteButton.addEventListener(
        "click",
        function () {

            note.remove();

            checkEmptyNotes();

        }
    );


    /*
        Ocultamos mensaje vacío.
    */

    emptyNotes.style.display =
        "none";

}


/* =========================================
   GUARDAR NOTA
========================================= */

saveNote.addEventListener(
    "click",
    function () {

        const title =
            noteTitle.value.trim();

        const text =
            noteText.value.trim();


        if (!title) {

            alert(
                "Escribí un título para la nota."
            );

            noteTitle.focus();

            return;

        }


        if (!text) {

            alert(
                "Escribí el contenido de la nota."
            );

            noteText.focus();

            return;

        }


        createNote(
            title,
            text
        );


        closeNoteModal();

    }
);


/* =========================================
   ELIMINAR NOTAS EXISTENTES
========================================= */

document
    .querySelectorAll(
        ".delete-button"
    )
    .forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const note =
                        button.closest(
                            ".note"
                        );


                    if (note) {

                        note.remove();

                        checkEmptyNotes();

                    }

                }
            );

        }
    );


/* =========================================
   COMPROBAR SI NO HAY NOTAS
========================================= */

function checkEmptyNotes() {

    const notes =
        notesContainer.querySelectorAll(
            ".note"
        );


    if (notes.length === 0) {

        emptyNotes.style.display =
            "flex";

    }

}


/* =========================================
   FECHA ACTUAL
========================================= */

function getCurrentDate() {

    const now =
        new Date();


    const date =
        now.toLocaleDateString(
            "es-AR"
        );


    const time =
        now.toLocaleTimeString(
            "es-AR",
            {
                hour: "2-digit",
                minute: "2-digit"
            }
        );


    return `${date} - ${time}`;

}


/* =========================================
   SEGURIDAD PARA TEXTO DE USUARIO
========================================= */

function escapeHTML(text) {

    const div =
        document.createElement(
            "div"
        );


    div.textContent = text;


    return div.innerHTML;

}


/* =========================================
   CERRAR MODAL HACIENDO CLICK AFUERA
========================================= */

noteModal.addEventListener(
    "click",
    function (event) {

        if (
            event.target ===
            noteModal
        ) {

            closeNoteModal();

        }

    }
);


/* =========================================
   ESC PARA CERRAR
========================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape" &&
            noteModal.classList.contains(
                "active"
            )
        ) {

            closeNoteModal();

        }

    }
);


/* =========================================
   ENTER / CTRL + ENTER
========================================= */

noteText.addEventListener(
    "keydown",
    function (event) {

        if (
            event.ctrlKey &&
            event.key === "Enter"
        ) {

            saveNote.click();

        }

    }
);


/* =========================================
   CONVERSIÓN INICIAL
========================================= */

convertCurrency();