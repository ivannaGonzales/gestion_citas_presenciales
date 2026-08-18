import dotenv from "dotenv";

dotenv.config();

export function crearWhatsAppConfig() {
    return {
        verifyToken: process.env.WHATSAPP_VERIFY_TOKEN || "access_token"
    };
}

