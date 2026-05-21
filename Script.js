// JavaScript source code
const boletosContainer = document.getElementById('boletosContainer');

function generarBoletos() {

    boletosContainer.innerHTML = '';

    for (let i = 1; i <= TOTAL_BOLETOS; i++) {

        const boton = document.createElement('button');

        boton.classList.add('boleto');

        boton.textContent = i.toString().padStart(2, '0');

        if (boletosOcupados.includes(i)) {
            boton.classList.add('ocupado');
            boton.disabled = true;
        } else {
            boton.classList.add('disponible');

            boton.addEventListener('click', () => seleccionarBoleto(i, boton));
        }

        boletosContainer.appendChild(boton);
    }

    actualizarDisponibles();
}

function seleccionarBoleto(numero, boton) {

    document.querySelectorAll('.boleto').forEach(btn => {
        btn.classList.remove('seleccionado');
    });

    boton.classList.add('seleccionado');

    boletoActual = numero;

    boletoSeleccionado.value = numero;
}

function actualizarDisponibles() {

    const disponibles = TOTAL_BOLETOS - boletosOcupados.length;

    boletosDisponibles.textContent = `${disponibles} de ${TOTAL_BOLETOS}`;
}

formReserva.addEventListener('submit', function (e) {

    e.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const telefono = document.getElementById('telefono').value;

    if (!boletoActual) {
        mensaje.innerHTML = '?? Debes seleccionar un boleto';
        return;
    }

    boletosOcupados.push(boletoActual);

    generarBoletos();

    mensaje.innerHTML = `
        ? Boleto #${boletoActual} reservado correctamente para ${nombre}.<br><br>
        En breve validaremos tu comprobante de pago.
    `;

    formReserva.reset();

    boletoSeleccionado.value = '';

    boletoActual = null;
});

generarBoletos();
