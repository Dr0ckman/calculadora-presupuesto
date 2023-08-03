let gastos = [] // Woops, variables globales!
let contador = 1;

function agregarGasto() {
    let gasto = String(document.getElementById("gasto-input").value);
    let valorGasto = Number(document.getElementById("valor-gasto-input").value);

    if (gasto !== "" && valorGasto !== 0) { // Sólo agrega los gastos si ambos campos tienen datos
        gastos.push([gasto, valorGasto]); // Agrega los datos de los campos al array
        console.log(gastos);
        let bodyTabla = (document.querySelector("#tabla-gastos > tbody")); // Crea una fila en la tabla para insertar los datos
        let filaTabla = bodyTabla.appendChild(document.createElement("tr"));
        let datoTabla = filaTabla.appendChild(document.createElement("td"));

        filaTabla.setAttribute("id", "item-" + contador);
        contador++;
        datoTabla.innerHTML = gastos[gastos.length - 1][0]; // Inserta el nombre del gasto
        datoTabla = filaTabla.appendChild(document.createElement("td"));
        datoTabla.innerHTML = "$" + gastos[gastos.length - 1][1]; // Inserta el valor del gasto
        datoTabla = filaTabla.appendChild(document.createElement("td")).appendChild(document.createElement("i")); // Inserta el ícono dentro del <td> anterior
        datoTabla.classList.add("fa-solid", "fa-trash", "btn"); // Agrega clases al tag <i>
        datoTabla.setAttribute("onClick", "borrarGasto(this)");

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

function borrarGasto(e) { // TODO: USAR encontrarID para borrar el array
    let ID = encontrarID(e); 
    let gasto = document.getElementById(ID);
    console.log(gasto);
    gasto.remove();
    // Borrar del array:
    
    contador--
}


function calcularSaldo() { // Calcula el saldo y actualiza la tabla de presupuestos
    let presupuesto = document.getElementById("presupuesto-input").value; // Dato del campo presupuesto
    let sumaGastos = 0; // Suma total de los gastos

    for (const gasto of gastos) {
        sumaGastos += Number(gasto[1]);
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
