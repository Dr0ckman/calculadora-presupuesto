let gastos = [] // Woops, variables globales!
// let contador = 1;

function agregarGasto() {
    let nombreGasto = String(document.getElementById("gasto-input").value);
    let valorGasto = Number(document.getElementById("valor-gasto-input").value);

    if (nombreGasto !== "" && valorGasto !== 0) { // Sólo agrega los gastos si ambos campos tienen datos
        gastos.push({ nombreGasto: nombreGasto, valorGasto: valorGasto }); // Agrega los datos de los campos al array
        console.log(gastos[0].nombreGasto);
        console.log(gastos[0].valorGasto);
        let bodyTabla = (document.querySelector("#tabla-gastos > tbody")); // Crea una fila en la tabla para insertar los datos
        let filaTabla = bodyTabla.appendChild(document.createElement("tr"));
        let datoTabla = filaTabla.appendChild(document.createElement("td"));


        datoTabla.innerHTML = gastos[gastos.length - 1].nombreGasto; // Inserta el nombre del gasto del último elemento del array
        datoTabla = filaTabla.appendChild(document.createElement("td"));
        datoTabla.innerHTML = "$" + gastos[gastos.length - 1].valorGasto; // Inserta el valor del gasto del último elemento del array
        datoTabla = filaTabla.appendChild(document.createElement("td")).appendChild(document.createElement("i")); // Inserta el ícono dentro del <td> anterior
        datoTabla.classList.add("fa-solid", "fa-trash", "btn"); // Agrega clases al tag <i>
        datoTabla.setAttribute("onClick", "borrarGasto(this)");

        asignarIDTablaGastos();
        calcularSaldo();
    }
}


// Encontrar cuál es el id del tr que contiene al botón presionado. Con eso borrarlo del array y la tabla. 
// Disminuir el contador en uno.

function encontrarID(e) { // Pasa el evento y busca el ID del tr más cercano
    let ID = e.closest("tr").id;
    let valorGasto = e.parentElement.previousElementSibling;
    let nombreGasto = valorGasto.previousElementSibling;
    valorGasto = valorGasto.innerHTML;
    nombreGasto = nombreGasto.innerHTML;
    console.log(nombreGasto, valorGasto);
    return [ID, nombreGasto, valorGasto];
}

function borrarGasto(e) { // Borra registro de la tabla y el array. Luego reasigna todos los ID en el front y recalcula el saldo
    let ID = encontrarID(e)[0];
    let index = ID.replace("item-", "");
    console.log("Indice: " + index);
    let gasto = document.getElementById(ID);
    console.log(gasto);
    gasto.remove();
    console.log("Array antes de borrar: ");
    for (const gasto of gastos) {
        console.log(gasto.nombreGasto);
        console.log(gasto.valorGasto);
    }

    // Borrar del array:
    gastos.splice(index, 1);

    console.log("Array después de borrar: ");
    for (const gasto of gastos) {
        console.log(gasto.nombreGasto);
        console.log(gasto.valorGasto);
    }
    // Reasignar item-n a elementos de la tabla cuando se borre un elemento:
    asignarIDTablaGastos();
    calcularSaldo();
}

function asignarIDTablaGastos() {
    let tabla = document.getElementById("tabla-gastos");
    for (let i = 0, fila; fila = tabla.rows[i]; i++) {
        fila.setAttribute("id", "item-" + String(Number(i) - 1));
    }
}

function calcularSaldo() { // Calcula el saldo y actualiza la tabla de presupuestos
    let presupuesto = document.getElementById("presupuesto-input").value; // Dato del campo presupuesto
    let sumaGastos = 0; // Suma total de los gastos

    for (const gasto of gastos) {
        sumaGastos += gasto.valorGasto;
    }

    if (presupuesto == "") { // Si el campo está vacío, asigna 0 a presupuesto
        presupuesto = 0;

    }
    else if (presupuesto < 0) {
        throw console.error("Número negativo");
    }

    let saldo = presupuesto - sumaGastos; // Calcula el saldo
    actualizarTablaPresupuesto(presupuesto, sumaGastos, saldo)
}

function actualizarTablaPresupuesto(presupuesto, sumaGastos, saldo) { // Actualiza la tabla de presupuestos
    if (presupuesto == "") { // Cambia el valor de presupuesto en la tabla a 0
        document.getElementById("valor-presupuesto").innerHTML = "$0";
    }
    else if (presupuesto > 0) { // Cambia el valor de presupuesto en la tabla
        document.getElementById("valor-presupuesto").innerHTML = "$" + presupuesto;
    }

    document.getElementById("valor-saldo").innerHTML = "$" + saldo;
    document.getElementById("valor-gasto").innerHTML = "$" + sumaGastos;
};
