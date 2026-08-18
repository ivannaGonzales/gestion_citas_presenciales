import { Constantes } from "../constantes/Constantes.js";

function normalizarBody(body) {
    if (typeof body === "string") {
        try {

            return normalizarBody(JSON.parse(body));
        } catch {
            return null;
        }
    }


    return body;
}

function obtenerMensajeWhatsApp(body) {
    const payload = normalizarBody(body);
    return payload?.entry?.[0]?.changes?.[0]?.value?.messages?.[0] ?? null;
}

const getMessageUserData = async (body) => {
    const mensaje = obtenerMensajeWhatsApp(body);

    if (!mensaje) {
        return null;
    }

    const payload = normalizarBody(body);
    const value = payload?.entry?.[0]?.changes?.[0]?.value;
    const telefono = value?.contacts?.[0]?.wa_id ?? mensaje.from ?? null;


    if (mensaje.type === Constantes.TIPO_MENSAJE_TEXT) {
        return {
            tipo: Constantes.TIPO_MENSAJE_TEXT,
            texto: mensaje.text?.body ?? null,
            telefono
        };
    }

    if (mensaje.type === Constantes.TIPO_MENSAJE_BUTTON) {
        return {
            tipo: Constantes.TIPO_MENSAJE_BUTTON,
            texto: mensaje.button?.text ?? null,
            telefono
        };
    }

    return null;
};

const getTextUser = async (body) => {
    return getMessageUserData(body);
};

/*
const getTextUser = async (body) => {
    const type = body.entry[0].changes[0].value.messages[0].type
    if (type === "text") {
        return body.entry[0].changes[0].value.messages[0].text.body

    } else if (type == "button") {
        return body.entry[0].changes[0].value.messages[0].button.text
    }
}*/

export {
    getMessageUserData,
    getTextUser,
    normalizarBody
};
