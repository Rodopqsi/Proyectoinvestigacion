const formularioPago = document.getElementById('formulario-pago');
const numeroTarjeta = document.getElementById('numero-tarjeta');
const nombreTitular = document.getElementById('nombre-titular');
const fechaVencimiento = document.getElementById('fecha-vencimiento');

const cvv = document.getElementById('cvv');

formularioPago.addEventListener('submit', (event) => {
    event.preventDefault(); // Evita el envío por defecto

    if (validarFormulario()) {
        alert('Pago procesado correctamente');
        console.log('Formulario válido. Procesando pago...');
    } else {
        alert('Formulario inválido. Por favor, revise los datos.');
        console.log('Formulario inválido. Por favor, revise los datos.');
    }
});

function validarFormulario() {
    // Validar número de tarjeta (Luhn)
    if (!luhnCheck(numeroTarjeta.value)) {
        alert('Número de tarjeta inválido');
        return false;
    }

    // Validar fecha de vencimiento
    const [mes, anio] = fechaVencimiento.value.split('/');
    if (!mes || !anio || isNaN(mes) || isNaN(anio) || mes < 1 || mes > 12) {
        alert('Fecha de vencimiento inválida');
        return false;
    }

    // Validar CVV
    if (cvv.value.length !== 3 || isNaN(cvv.value)) {
        alert('Código de seguridad inválido');
        return false;
    }

    return true;
}

function luhnCheck(value) {
    // Algoritmo de Luhn para validar números de tarjeta
    let nCheck = 0, bEven = false;
    value = value.replace(/\D/g, ""); // Elimina caracteres no numéricos

    for (let n = value.length - 1; n >= 0; n--) {
        let cDigit = value.charAt(n),
            nDigit = parseInt(cDigit, 10);

        if (bEven) {
            if ((nDigit *= 2) > 9) nDigit -= 9;
        }

        nCheck += nDigit;
        bEven = !bEven;
    }

    return (nCheck % 10) === 0;
}





