import * as chrono from "chrono-node";

function interpretarFecha(frase) {
    const fecha = chrono.parseDate(frase);

    if (!fecha || isNaN(fecha.getTime())) {
        return "Fecha no reconocida";
    }

    return fecha.toISOString().slice(0, 16).replace("T", " ");
}

console.log(interpretarFecha("mañana a las 5"));
console.log(interpretarFecha("el 17 de mayo a las 3"));
console.log(interpretarFecha("dentro de dos semanas a las 10 de la mañana"));
console.log(interpretarFecha("el próximo lunes a las 8 de la noche"));
console.log(interpretarFecha("el 25 de diciembre a las 12 del mediodía"));
