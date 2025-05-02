import moment from "moment-timezone";

function obtenerDiaEncontrado(texto) {
    const diasDeLaSemana = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
    const diaEncontrado = diasDeLaSemana.find(dia => texto.toLowerCase().includes(dia));
    if (!diaEncontrado) {
        throw new Error("No se encontró un día de la semana en el texto.");
    }
    return diaEncontrado;
}

function cambiarEspañolAIngles(diaSemana) {
    const mapearDia = {
        "domingo": "Sunday",
        "lunes": "Monday",
        "martes": "Tuesday",
        "miércoles": "Wednesday",
        "jueves": "Thursday",
        "viernes": "Friday",
        "sábado": "Saturday"
    };
    const diaNormalizado = diaSemana.toLowerCase();

    // Retornar el valor mapeado o lanzar un error si no existe
    if (mapearDia[diaNormalizado]) {
        return mapearDia[diaNormalizado];
    } else {
        throw new Error("El día ingresado no es válido.");
    }
}

function obtenerFecha(texto, zonaHoraria) {
    let diaEncontrado = obtenerDiaEncontrado(texto);

    // Obtiene la fecha actual
    const fechaHoy = moment.tz(zonaHoraria);

    diaEncontrado = cambiarEspañolAIngles(diaEncontrado);

    // Configura la fecha objetivo
    let fechaObjetivo = fechaHoy.clone().day(diaEncontrado);

    // Si ya pasó este día en la semana, ajusta para el próximo
    if (fechaObjetivo.isBefore(fechaHoy)) {
        fechaObjetivo.add(7, "days");
    }
    return fechaObjetivo;
}

function obtenerHora(texto) {
    // Extrae la hora del texto (ej. "3 de la tarde")
    const horaRegex = /(\d{1,2})\s?(de la tarde|de la mañana|p\.?m\.?|a\.?m\.?)/i;
    const coincidenciaHora = texto.match(horaRegex);

    if (!coincidenciaHora) {
        throw new Error("No se encontró una hora válida en el texto.");
    }
    let hora = parseInt(coincidenciaHora[1], 10);

    const periodo = coincidenciaHora[2].toLowerCase();

    if (periodo.includes("tarde") || periodo.includes("p.m")) {
        hora += 12;
    }
    return hora;
}

/*
* Se encarga de obtener la primera fecha
* que se ofrecerá al cliente
* por defecto: Siguiente día del día actual
* OJO que aquí tengo que ver si es el día viernes tiene que devolver el lunes
 */
function obtenerFechaCitaInicial() {
    // Obtener la fecha actual
    const fechaHoy = moment();

    // Calcular el día siguiente
    const diaSiguiente = fechaHoy.add(1, "days");

    // Verificar si el día siguiente es viernes, sábado o domingo
    if (diaSiguiente.day() === 5) { // Viernes
        diaSiguiente.add(3, "days"); // Mover al lunes
    } else if (diaSiguiente.day() === 6) { // Sábado
        diaSiguiente.add(2, "days"); // Mover al lunes
    } else if (diaSiguiente.day() === 0) { // Domingo
        diaSiguiente.add(1, "days"); // Mover al lunes
    }

    // Retornar un objeto con la fecha y hora
    return {
        fecha: diaSiguiente.format("YYYY-MM-DD"),
        hora: '15:00'
    };
}

function convertirAISO8601(texto, zonaHoraria) {

    const fecha = obtenerFecha(texto, zonaHoraria);

    const hora = obtenerHora(texto);

    // Configura la hora en la fecha
    fecha.hour(hora).minute(0).second(0);

    // Convertir a la zona horaria local y devolver el formato ISO 8601
    return fecha.tz(zonaHoraria).format(); // Esto asegura que la hora sea local
}

function convertirFechaISO(fechaTexto, zonaHoraria) {
    let fecha = moment.tz(fechaTexto, "YYYY-MM-DD", zonaHoraria);

    return fecha.format("YYYY-MM-DDTHH:mm:ss.SSSZ");
}

export {
    convertirAISO8601, obtenerFechaCitaInicial
};

// Ejemplo de uso
const texto = "He agendado una cita para el cliente el Martes a las 3 de la tarde";
const zonaHoraria = "Europe/Madrid"; // Usamos la zona horaria correcta

const fechaActual = convertirFechaISO('2025-04-11', 'Central European Time');
console.log('fechaActual ', fechaActual)
