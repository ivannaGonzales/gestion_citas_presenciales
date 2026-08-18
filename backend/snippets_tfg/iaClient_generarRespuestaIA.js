    async getRespuestaIA(mensajes, telefono, motivo) {
        const respuestaChatGPT = await this.generarRespuestaIA(mensajes, motivo)
        this.gestorMensajes.enviarRespuestaIA(telefono, respuestaChatGPT);
        return respuestaChatGPT;
    }

    /**
     * Genera una respuesta de IA para la gestión de citas
     * Esta función coordina con el gestor de citas para obtener respuestas personalizadas
     * basadas en el motivo de la consulta
     * @param {String} mensaje Respuesta del usuario 
     * @param {String} motivo Motivo de la cita
     * @returns Respuesta de la IA
     */
    async generarRespuestaIA(mensajes, motivo) {
        try {
            const apikey = process.env.API_KEY;
            const openai = new OpenAI({
                apiKey: apikey
            });


            const prompt_inicial = `
                Eres un gestor de citas presenciales. Tu tarea es:
                1. Preguntar al usuario por un día y una hora para la cita
                2. Si el usuario solo responde con el día, debes insistir en que también proporcione la hora exacta antes de continuar
                3. No te repitas si ya te dieron el dato
                4. Este es un ${motivo} y debes adaptar tu respuesta específicamente para este tipo de cita
                5. Si el usuario corrige el día pero no menciona la hora, asume que la hora anterior sigue siendo válida

            `;

            var response = await openai.chat.completions.create({
                model: 'gpt-5',
                messages: [
                    { "role": "system", "content": prompt_inicial },
                    { "role": "user", "content": mensajes }
                ]
            });
            return response.choices[0].message.content

        } catch (error) {
            throw new Error('Error al generar respuesta de la IA ' + error);
        }
