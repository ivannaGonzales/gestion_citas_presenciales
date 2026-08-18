import { FechaTipoHelper } from "../helpers/FechaTipoHelper.js";

function crearRespuestaDuckling({ body, grain, values }) {
    return [{
        body,
        dim: "time",
        value: {
            value: values[0],
            values: values.map((value) => ({ value, grain }))
        }
    }];
}

describe("FechaTipoHelper.extraerFechaTipo", () => {
    test("clasifica 'el 3 de agosto' como dia", () => {
        const data = crearRespuestaDuckling({
            body: "el 3 de agosto",
            grain: "day",
            values: ["2026-08-03T00:00:00.000+02:00"]
        });

        expect(FechaTipoHelper.extraerFechaTipo(data).tipo).toBe("dia");
    });

    test("clasifica 'a las 11 de la mañana' como hora", () => {
        const data = crearRespuestaDuckling({
            body: "a las 11 de la mañana",
            grain: "hour",
            values: [
                "2026-08-02T11:00:00.000+02:00",
                "2026-08-03T11:00:00.000+02:00"
            ]
        });

        expect(FechaTipoHelper.extraerFechaTipo(data).tipo).toBe("hora");
    });

    test("clasifica dia y hora juntos como fecha_completa", () => {
        const data = crearRespuestaDuckling({
            body: "el 12 de agosto a las 11 de la mañana",
            grain: "hour",
            values: [
                "2026-08-12T11:00:00.000+02:00",
                "2026-08-12T23:00:00.000+02:00",
                "2027-08-12T11:00:00.000+02:00"
            ]
        });

        expect(FechaTipoHelper.extraerFechaTipo(data).tipo).toBe("fecha_completa");
    });

    test("selecciona las 09:00 cuando el usuario indica de la mañana", () => {
        const data = crearRespuestaDuckling({
            body: "a las 9",
            grain: "hour",
            values: [
                "2026-08-02T21:00:00.000+02:00",
                "2026-08-03T09:00:00.000+02:00",
                "2026-08-03T21:00:00.000+02:00"
            ]
        });

        const resultado = FechaTipoHelper.extraerFechaTipo(
            data,
            "No, perdona, mejor a las 9 de la mañana"
        );

        expect(resultado).toEqual({
            fecha: "2026-08-03T09:00:00.000+02:00",
            tipo: "hora"
        });
    });
});
