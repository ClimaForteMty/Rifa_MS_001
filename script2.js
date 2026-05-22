const boletosContainer =
    document.getElementById('boletosContainer');

const boletoSeleccionado =
    document.getElementById('boletoSeleccionado');

const formReserva =
    document.getElementById('formReserva');

const mensaje =
    document.getElementById('mensaje');

const boletosDisponibles =
    document.getElementById('boletosDisponibles');

const TOTAL_BOLETOS = 100;

const API_URL =
    'https://script.google.com/macros/s/AKfycbxrStUpgUiz6oeP9Brncj9xfEb1JlG1dXvMGwK4fSXrqasOXMigHr-ng9qVuUWhCoSMEg/exec';

let boletosOcupados = [];

let boletoActual = null;



async function cargarBoletos() {

    try {

        const response = await fetch(API_URL);

        const data = await response.json();

        boletosOcupados =
            data.map(item => Number(item.boleto));

        generarBoletos();

    } catch(error) {

        console.error(
            'Error cargando boletos:',
            error
        );

        boletosOcupados = [];

        generarBoletos();

    }

}



function generarBoletos() {

    boletosContainer.innerHTML = '';

    for (let i = 1; i <= TOTAL_BOLETOS; i++) {

        const boton =
            document.createElement('button');

        boton.classList.add('boleto');

        boton.textContent =
            i.toString().padStart(2, '0');

        if (boletosOcupados.includes(i)) {

            boton.classList.add('ocupado');

            boton.disabled = true;

        } else {

            boton.classList.add('disponible');

            boton.addEventListener(
                'click',
                () => seleccionarBoleto(i, boton)
            );

        }

        boletosContainer.appendChild(boton);

    }

    actualizarDisponibles();

}



function seleccionarBoleto(numero, boton) {

    document
        .querySelectorAll('.boleto')
        .forEach(btn => {

            btn.classList.remove('seleccionado');

        });

    boton.classList.add('seleccionado');

    boletoActual = numero;

    boletoSeleccionado.value = numero;

}



function actualizarDisponibles() {

    const disponibles =
        TOTAL_BOLETOS - boletosOcupados.length;

    boletosDisponibles.textContent =
        `${ disponibles } de ${ TOTAL_BOLETOS } `;

}



formReserva.addEventListener(
    'submit',
    async function(e) {

        e.preventDefault();

        const nombre =
            document.getElementById('nombre').value;

        const telefono =
            document.getElementById('telefono').value;

        if (!boletoActual) {

            mensaje.innerHTML =
                '⚠️ Debes seleccionar un boleto';

            return;

        }

        try {

            await fetch(API_URL, {

                method: 'POST',

                body: JSON.stringify({
                    boleto: boletoActual,
                    nombre: nombre,
                    telefono: telefono
                })

            });

            mensaje.innerHTML = `
                ✅ Boleto #${ boletoActual }
                reservado correctamente.
            `;

            formReserva.reset();

            boletoSeleccionado.value = '';

            boletoActual = null;

            cargarBoletos();

        } catch(error) {

            console.error(error);

            mensaje.innerHTML =
                '❌ Error guardando boleto';

        }

    }
);


cargarBoletos();


