import { crearWhatsAppConfig } from "./WhatsAppConfigFactory.js";
import { crearClientesWhatsApp } from "./WhatsAppClientFactory.js";
import { crearCoordinadorCita } from "./WhatsAppServiceFactory.js";

const clientesWhatsApp = crearClientesWhatsApp();

export const coordinadorCita = crearCoordinadorCita(clientesWhatsApp);
export const whatsappConfig = crearWhatsAppConfig();
