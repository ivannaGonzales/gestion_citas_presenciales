import { GestorFechas } from "../gestor/GestorFechas.js";

function crearGestorConMensajes(mensajes) {
    const consulta = Promise.resolve(mensajes);
    consulta.sort = () => consulta;

    return new GestorFechas({
        mensajeService: {
            obtenerMensajesPorIncidencia: () => consulta
        }
    });
}

describe("GestorFechas.resolverFechaConversacional", () => {
    test.each([
        ["dia", "2026-08-12T00:00:00.000Z"],
        ["hora", "2026-08-02T11:00:00.000Z"]
    ])("devuelve null cuando solo se informa %s", async (tipo, fecha) => {
        const gestor = crearGestorConMensajes([
            { fecha_parseada: { tipo, fecha: new Date(fecha) } }
        ]);

        await expect(gestor.resolverFechaConversacional({
            incidenciaId: "incidencia-1",
            respuesta: "respuesta parcial"
        })).resolves.toBeNull();
    });

    test("combina el dia y la hora cuando ambos fueron informados", async () => {
        const gestor = crearGestorConMensajes([
            {
                fecha_parseada: {
                    tipo: "dia",
                    fecha: new Date("2026-08-12T00:00:00.000Z")
                }
            },
            {
                fecha_parseada: {
                    tipo: "hora",
                    fecha: new Date("2026-08-02T11:00:00.000Z")
                }
            }
        ]);

        const resultado = await gestor.resolverFechaConversacional({
            incidenciaId: "incidencia-1",
            respuesta: "a las 13"
        });

        expect(resultado).not.toBeNull();
        expect(resultado).toContain("2026-08-12T13:00:00.000");
    });

    test("conserva el dia y sustituye la hora cuando el usuario la corrige", async () => {
        const gestor = crearGestorConMensajes([
            {
                fecha_parseada: {
                    tipo: "fecha_completa",
                    fecha: new Date("2026-08-12T09:00:00.000Z")
                }
            },
            {
                fecha_parseada: {
                    tipo: "hora",
                    fecha: new Date("2026-08-02T07:00:00.000Z")
                }
            }
        ]);

        const resultado = await gestor.resolverFechaConversacional({
            incidenciaId: "incidencia-1",
            respuesta: "No, perdona, mejor a las 9 de la mañana"
        });

        expect(resultado).toContain("2026-08-12T09:00:00.000");
    });

    test("conserva la hora y sustituye el dia cuando el usuario lo corrige", async () => {
        const gestor = crearGestorConMensajes([
            {
                fecha_parseada: {
                    tipo: "fecha_completa",
                    fecha: new Date("2026-08-12T13:00:00.000Z")
                }
            },
            {
                fecha_parseada: {
                    tipo: "dia",
                    fecha: new Date("2026-08-12T22:00:00.000Z")
                }
            }
        ]);

        const resultado = await gestor.resolverFechaConversacional({
            incidenciaId: "incidencia-1",
            respuesta: "No, mejor el día 13 de agosto"
        });

        expect(resultado).toContain("2026-08-13T15:00:00.000");
    });
});
