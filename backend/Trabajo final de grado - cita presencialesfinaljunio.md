## **UNIVERSIDAD REY JUAN CARLOS** 

**Grado en Ingeniería Informática Curso Académico 2025 / 2026** 

## **Trabajo Fin de Grado** 

**Desarrollo de un bot para la gestión de citas presenciales en empresas de servicios** 

**Autor:** Ivanna Gonzales **Tutores:** Juan Manuel Vara Mesa 

## RESUMEN 

Este trabajo de fin de grado presenta el diseño e implementación de una solución software orientada a la automatización de la gestión de citas presenciales en empresas de servicios. La propuesta se apoya en una arquitectura backend que integra persistencia de datos, mensajería instantánea, procesamiento de lenguaje natural e inteligencia artificial con el fin de facilitar la comunicación con el usuario y reducir la intervención manual en tareas repetitivas. 

La solución desarrollada permite partir de incidencias almacenadas en una base de datos y establecer un flujo conversacional con el cliente a través de WhatsApp. Durante dicho flujo, el sistema propone fechas disponibles, interpreta respuestas expresadas en lenguaje natural y, cuando resulta necesario, mantiene la conversación para completar la información pendiente. De este modo, la aplicación es capaz de adaptar la interacción a distintas situaciones habituales en la gestión de citas. 

El resultado obtenido es un sistema modular y extensible que centraliza el tratamiento de incidencias, la comunicación con el usuario y la validación de disponibilidad temporal. En conjunto, la propuesta persigue mejorar la eficiencia del proceso de concertación de citas y ofrecer una experiencia de uso más ágil y coherente. 

Título del PFC 

Página 2 de 53 

AGRADECIMIENTOS 

El presente proyecto supone el final de un camino y el comienzo …ddddddd 

ddddddrdefrewf 

Título del PFC 

Página 3 de 53 

Índice 

|**CAPÍTULO 1 - INTRODUCCIÓN .............................................................................................................. 7**|
|---|
|1.1 MOTIVACIÓN......................................................................................................................................... 7|
|1.2 OBJETIVOS............................................................................................................................................. 7|
|1.3 MÉTODO DE TRABAJO.............................................................................................................................. 8|
|1.4 MEDIOS HARDWARE Y SOFTWARE............................................................................................................ 11|
|1.5 ESTRUCTURA DE LA MEMORIA................................................................................................................. 11|
|**CAPÍTULO 2 ESTADO DEL ARTE ........................................................................................................... 13**|
|2.1 PLATAFORMAS DE MENSAJERÍA YAPIS DE COMUNICACIÓN............................................................................ 13|
|_2.1.1_<br>_WhatsApp Business API ...................................................................................................... 13_|
|_2.1.2_<br>_Modelo de conversación y tipos de mensajes ..................................................................... 14_|
|_2.1.3_<br>_Integración con Facebook Developers ................................................................................ 14_|
|_2.1.4_<br>_Seguridad, autenticación y buenas prácticas ..................................................................... 15_|
|_2.1.5_<br>_Impacto de WhatsApp Business en la atención al cliente ................................................... 15_|
|2.2 TECNOLOGÍAS DE BACKEND Y PROCESAMIENTO........................................................................................... 15|
|_2.2.1_<br>_Node.js ................................................................................................................................ 15_|
|_2.2.2_<br>_Características técnicas principales: (Esto no se si ponerlo) ............................................... 15_|
|_2.2.3_<br>_Razones de su elección para este proyecto ......................................................................... 15_|
|_2.2.4_<br>_Base de datos MongoDB .................................................................................................... 16_|
|2.3 INTELIGENCIA ARTIFICIAL........................................................................................................................ 16|
|_2.3.1_<br>_ChatGPT y el API de OpenAI ................................................................................................ 16_|
|2.4 LIBRERÍADUCKLING............................................................................................................................... 18|
|_2.4.1_<br>_Desafíos en el reconocimiento de fechas coloquiales ......................................................... 18_|
|_2.4.2_<br>_Funcionamiento Técnico de Duckling ................................................................................. 18_|
|_2.4.3_<br>_Enfoque manual vs Duckling ............................................................................................... 18_|
|2.5 DOCKER.............................................................................................................................................. 18|
|_2.5.1_<br>_Ventajas de utilizar Docker ................................................................................................. 19_|
|2.6 MICROSOFTAZURE............................................................................................................................... 19|
|_2.6.1_<br>_Azure en este proyecto ....................................................................................................... 20_|
|_2.6.2_<br>_Ventajas de Azure ............................................................................................................... 20_|
|_2.6.3_<br>_Grupo de recursos y organización ....................................................................................... 20_|
|_2.6.4_<br>_Relación con Dockera .......................................................................................................... 20_|
|**CAPÍTULO 3 SOLUCIÓN TECNOLÓGICA ............................................................................................... 21**|
|3.1 VISIÓN GENERAL DE LA SOLUCIÓN............................................................................................................. 22|
|3.2 ESTRUCTURA INTERNA DEL BACKEND......................................................................................................... 22|
|3.3 FLUJO FUNCIONAL DEL SISTEMA............................................................................................................... 23|
|_3.3.1_<br>_Fase de activación .............................................................................................................. 23_|
|_3.3.2_<br>_Fase conversacional ............................................................................................................ 23_|
|_3.3.3_<br>_Fase conversacional ............................................................................................................ 24_|
|3.4 COMPONENTES PRINCIPALES DEL BACKEND................................................................................................ 25|
|_3.4.1_<br>_WhatsAppController ........................................................................................................... 25_|
|_3.4.2_<br>_CoordinadorCita .................................................................................................................. 25_|
|_3.4.3_<br>_IniciarConversacionCita ...................................................................................................... 25_|
|_3.4.4_<br>_ProcesarRespuestaCita ....................................................................................................... 25_|
|_3.4.5_<br>_GestorConversacion ............................................................................................................ 25_|
|_3.4.6_<br>_GestorFechas ...................................................................................................................... 25_|
|_3.4.7_<br>_GestorMensajes .................................................................................................................. 26_|
|_3.4.8_<br>_IncidenciaService ................................................................................................................ 26_|
|_3.4.9_<br>_MensajeService ................................................................................................................... 26_|
|_3.4.10_<br>_FechaParseadaService .................................................................................................. 26_|
|3.5 MODELO DE DATOS............................................................................................................................... 26|
|3.6 INTEGRACIÓN CON SERVICIOS EXTERNOS.................................................................................................... 27|
|3.7 IMPLEMENTACIÓN DE LA SOLUCIÓN.......................................................................................................... 27|
|_3.7.1_<br>_Integración con Meta y WhatsApp Business ...................................................................... 27_|
|_3.7.2_<br>_Tratamiento temporal con Duckling ................................................................................... 29_|



Título del PFC 

Página 4 de 53 

Índice 

||_3.7.3_<br>_Envío de mensajes y continuidad conversacional ............................................................... 30_|
|---|---|
||_3.7.4_<br>_Despliegue de la aplicación ................................................................................................ 30_|
||_3.7.5_<br>_Relación entre implementación y arquitectura .................................................................. 33_|
||3.8 DECISIONES DE DISEÑO ADOPTADAS.......................................................................................................... 33|
||3.9 CONSIDERACIONES SOBRE LA IMPLEMENTACIÓN................................................................................. 34|
|**CAPÍTULO 4 VALIDACIÓN DE LA SOLUCIÓN ........................................................................................ 35**||
||4.1 CRITERIOS DE VALIDACIÓN...................................................................................................................... 35|
||_4.1.1_<br>_Eficiencia ............................................................................................................................. 35_|
||_4.1.2_<br>_Grado de cumplimiento ...................................................................................................... 36_|
||_4.1.3_<br>_Robustez conversacional .................................................................................................... 36_|
||_4.1.4_<br>_Adecuación de las reglas de negocio .................................................................................. 37_|
||4.2 CASO DE ESTUDIO1: ACEPTACIÓN DE LA PROPUESTA INICIAL......................................................................... 37|
||_4.2.1_<br>_Definición ............................................................................................................................ 37_|
||_4.2.2_<br>_Ejecución ............................................................................................................................. 37_|
||_4.2.3_<br>_Resultados .......................................................................................................................... 37_|
||4.3 CASO DE ESTUDIO2:RESPUESTA CON INFORMACIÓN INCOMPLETA................................................................. 38|
||_4.3.1_<br>_Definición ............................................................................................................................ 38_|
||_4.3.2_<br>_Ejecución ............................................................................................................................. 38_|
||_4.3.3_<br>_Resultados .......................................................................................................................... 38_|
||4.4 CASO DE ESTUDIO3:RECONSTRUCCIÓN DE LA FECHA A PARTIR DE VARIOS MENSAJES.......................................... 39|
||_4.4.1_<br>_Definición ............................................................................................................................ 39_|
||_4.4.2_<br>_Ejecución ............................................................................................................................. 39_|
||_4.4.3_<br>_Resultados .......................................................................................................................... 39_|
||4.5 CASO DE ESTUDIO4: RECHAZO DE LA PROPUESTA INICIAL Y CONTINUACIÓN DEL FLUJO........................................ 39|
||_4.5.1_<br>_Definición ............................................................................................................................ 39_|
||_4.5.2_<br>_Ejecución ............................................................................................................................. 40_|
||_4.5.3_<br>_Resultados .......................................................................................................................... 40_|
||4.6 VALIDACIÓN MEDIANTE CASOS DE USO CONVERSACIONALES.......................................................................... 40|
||_4.6.1_<br>_Caso de uso 1: modificación de la hora manteniendo el mismo día ................................... 40_|
||_4.6.2_<br>_Caso de uso 2: modificación del día manteniendo la hora previa ...................................... 40_|
||_4.6.3_<br>_Caso de uso 3: petición incompleta y solicitud del dato faltante ........................................ 41_|
||_4.6.4_<br>_Caso de uso 4: Validación del horario permitido ................................................................ 41_|
||_4.6.5_<br>_Caso de uso 5: exclusión de fines de semana ...................................................................... 41_|
||4.7 ANÁLISIS DE LOS RESULTADOS.................................................................................................................. 41|
|**DESARROLLO DEL CASO DE ESTUDIO .................................................................................................. 43**||
||4.8 ESPECIFICACIÓN DEREQUISITOS............................................................................................................... 43|
|**CAPÍTULO 5 CONCLUSIONES Y TRABAJOS FUTUROS ........................................................................... 44**||
||5.1 ANÁLISIS DE LA CONSECUCIÓN DE OBJETIVOS.............................................................................................. 45|
||5.2 ESTIMACIÓN DE ESFUERZOS.................................................................................................................... 45|
||5.3 FUTUROSTRABAJOS.............................................................................................................................. 46|
|**CAPÍTULO 6 BIBLIOGRAFÍA Y LUGARES DE INTERNET .......................................................................... 47**||
|**1.**|**BIBLIOGRAFÍA ........................................................................................................................... 47**|
||6.1 BIBLIOGRAFÍA....................................................................................................................................... 49|
||6.2 LUGARES DEINTERNET........................................................................................................................... 51|
|**CAPÍTULO 7 APÉNDICES ...................................................................................................................... 52**||
||7.1 APÉNDICEI: TABLA DESIGLAS................................................................................................................. 53|



Título del PFC 

Página 5 de 53 

Índice 

## **No se encuentran elementos de tabla de ilustraciones.** 

Título del PFC 

Página 6 de 53 

Introducción 

## Ca ítulo 1 - Introducción p 

En este capítulo se presenta el planteamiento y la justificación de este trabajo, una breve explicación de los objetivos propuestos, su ejecución en fases, los resultados esperados, los medios hardware y software necesarios, así como el método de trabajo aplicado. Por último, se describe la estructura que organiza la memoria de este Trabajo de Fin de Grado. 

El objetivo es desarrollar un Bot que, a partir de la información de una incidencia registrada en un base de datos, contacte con el usuario para concertar una cita presencial y registre los datos de la cita concertada en el sistema. 

## **1.1 Motivación** 

Descripción del contexto y la situación que desembocan en el desarrollo del presente TFG. Descripción del problema a resolver, etc. anticipando mínimamente cómo se propone abordarlo, resolverlo o minimizar su impacto. 

Actualmente, muchas empresas enfrentan dificultades para gestionar eficazmente las incidencias que requieren atención presencial. La coordinación de citas con clientes suele implicar múltiples llamadas, correos y tiempos de espera, lo que genera ineficiencias y baja satisfacción. Este trabajo de final de grado surge como respuesta a esa necesidad, proponiendo una solución automatizada que permita leer incidencias desde una base de datos, proponer fechas de cita, notificar al cliente vía WhatsApp y en caso de rechazarlo, facilitar la reprogramación mediante un gestor virtual basado en inteligencia artificial. El objetivo es minimizar el impacto de la gestión manual y mejorar la experiencia del cliente. 

## **1.2 Objetivos** 

El objetivo principal de este proyecto es desarrollar una aplicación inteligente para la gestión automatizada de citas derivadas de incidencias registradas 

1. Objetivo parcial 1: Diseñar un sistema capaz de leer y procesar incidencias desde una base de datos 

2. Objetivo parcial 2: Integrar una solución tecnológica de mensajería que permita notificar al cliente de manera automática 

3. Objetivo parcial 3: Implementar un sistema de reprogramación de citas guiado por inteligencia artificial 

4. Objetivo parcial 4: Validar la funcionalidad del sistema mediante un caso de estudio real 

Título del PFC 

Página 7 de 53 

Introducción 

## **1.3 Método de trabajo** 

Para lograr los objetivos propuestos, la metodología seguida se basa en la división del proyecto en cuatro fases principales, cada una con una meta específica que permite estructurar el desarrollo de forma ordenada y establecer puntos de control para validar el progreso. 

Se trata de una metodología similar a la conocida Waterfall (en cascada), caracterizada por un flujo descendente y lineal, ideal para proyectos con un objetivo claro desde el inicio. Esta estructura facilita la planificación y ejecución del sistema propuesto, que integra un chatbot basado en ChatGPT, comunicación mediante la plataforma Meta/Facebook, y almacenamiento de incidencias en una base de datos. 

De este modo, y como se puede observar en la Figura 2, el desarrollo se establece en las siguientes fases: 

**FASE 1. Análisis:** Una fase inicial centrada en investigar las tecnologías relacionadas y las tecnologías principales del proyecto: WhatsApp Business API, Node.js, MongoDB e Inteligencia Artificial (ChatGPT). Esta fase se subdivide en varias tareas: 

- **Estudio del envío de mensajes:** Tarea centrada en investigar la API oficial de WhatsApp Business, su origen, funcionamiento, limitaciones y requisitos (como la verificación empresarial y el uso de Facebook Developer). El objetivo es comprender como enviar mensajes automatizados, gestionar plantillas y recibir respuestas del cliente. Una de las alternativas evaluadas fue Twilio, se descartó por diversas restricciones, la tenencia de un teléfono de Estados Unidos, y la necesidad de contar una licencia de empresa 

- **Estudio del entorno Node.js y MongoDB:** Tarea cuyo propósito es analizar las tecnologías base del backend. Se estudia cómo Node.js gestiona peticiones, cómo se estructura un servidor y cómo MongoDB almacena y consulta incidencias. El objetivo es saber construir un backend funcional capaz de leer incidencias, generar propuestas de citas y registrar interacciones. 

- **Estudio de la integración con ChatGPT:** Tarea centrada en comprender cómo funciona la API de ChatGPT 

**FASE 2. Solución técnica:** Una vez completada la fase de análisis y estudiadas las tecnologías comentadas anteriormente -WhatsApp Business API/Meta, Node.js, Mongodb e Inteligencia Artificial mediante ChatGPT-, en esta fase se lleva a cabo el diseño e implementación de la solución tecnológica. El objetivo es construir, procesar sus mensajes y almacenar las incidencias con la hora de cita acordada. 

- **Integración de la plataforma de mensajería con el backend:** En primer lugar, se desarrolla el módulo encargado de recibir y enviar mensajes entre usuarios y el chatbot. Para ello, se considera el entorno de desarrollo en Node.js y se habilita la integración con la API de Meta/WhatsApp Business. Este proceso incluye: 

   - Configuración de la aplicación en Facebook Developer 

   - Actuación del webhook para enviar y recibir mensajes del usuario final 

   - Validación de tokens y parámetros de seguridad exigidos por Meta 

Título del PFC 

Página 8 de 53 

Introducción 

   - Implementación de los endpoints necesarios para gestionar mensajes, plantillas y respuestas automáticas. 

- **Integración del backend con la inteligencia artificial y la base de datos:** Una vez implementado el primer módulo de comunicación con Meta, se desarrolla el segundo bloque tecnológico, encargado de procesar los mensajes mediante ChatGPT y registrar las incidencias en la base de datos. Este bloque incluye 

   - Implementación de las llamadas a la API de Chatgpt, permitiendo interpretar la conversación del usuario y generar respuestas coherentes 

   - Diseño del modelo de datos en MongoDB, definiendo la estructura para almacenar incidencias, mensajes, usuarios, etc … 

   - Desarrollo de las funciones para crear, consultar y actualizar registros en la base de datos 

   - Integración completa entre los tres componentes: backend, inteligencia artificial y almacenamiento. 

**FASE 3. Validación de la solución:** En esta fase se da por completado el desarrollo de los distintos módulos tecnológicos, comentados anteriormente, se procede a validar su funcionamiento mediante pruebas basadas en situaciones reales de uso. El objetivo es que la solución implementada funciona de manera correcta, alineada con los requisitos comentados anteriormente. La validación se lleva a cabo reproduciendo distintas conversaciones con el usuario final y el chatbot, evaluando tanto la capacidad del sistema para procesar mensajes como su habilidad para registrar incidencia y generar respuestas adecuadas. 

- Validación del flujo de mensajería vía WhatsApp. En primer lugar, se comprueba el correcto funcionamiento del flujo de comunicación entre la plataforma de mensajería y el backend 

   1. La recepción y envió de mensajes por parte del webhook configurado en Meta 

   2. La correcta interpretación del contenido recibido en el servidor Node.js 

- Validación del procesamiento mediante ChatGPT. Una vez verificada la comunicación básica, se evalúa la capacidad del chatbot para interpretar el mensaje del usuario y responder mensajes utilizando el API de ChatGPT. 

   1. Variaciones en el lenguaje del usuario 

   2. Comprobación de la coherencia, claridad y adecuación de las respuestas generadas 

- Validación del registro de incidencias en MongoDB. Para ello se generan conversaciones que incluyen incidencias reales comprobando: 

   1. La manera correcta de almacenar los datos provistos por los usuarios finales (fechas, conversaciones, usuarios, etc …) 

- Validación integral del sistema. Finalmente, se realizan pruebas completas que abarcan todo el flujo del sistema 

Título del PFC 

Página 9 de 53 

Introducción 

1. El backend lee una incidencia 

2. El backend envía una propuesta con la fecha inicial 

3. WhatsApp envía la información 

4. El usuario envía un mensaje desde WhatsApp/Facebook 

5. Meta envía el mensaje al backend 

6. El backend lo procesa y consulta ChatGPT 

7. ChatGPT genera una respuesta 

8. El backend envía la respuesta al usuario final 

9. Si procede, se guarda la incidencia con la fecha prevista del usuario 

**FASE 4. Memoria:** La última fase del proyecto consiste en la elaboración de la memoria, en la que se documenta de forma estructurada todo el trabajo realizado durante el desarrollo del proyecto. Una vez validados los distintos módulos tecnológicos y comprobado el correcto funcionamiento del chatbot, se procede a recopilar, organizar y presentar la información necesaria para presentar la memoria del proyecto 

La memoria actúa como el documento final que integra tanto los aspectos teóricos como los prácticos del proyecto, y se convierte en el elemento clave para evaluar el Trabajo de Fin de Grado. Para su elaboración se siguen los siguientes pasos: 

- Documentación del análisis inicial: Se recoge la siguiente información 

   - Estudio y decisión del uso de tecnologías principales: WhatsApp Business API/Meta, Node.js, MongoDB y ChatGPT. 

   - La justificación de la elección tecnológica y la definición de los requisitos funcionales del sistema. 

- Descripción detallada de la solución tecnológica. Se documenta el diseño e implementación del sistema, explicando 

   - La arquitectura general del chatbot 

   - El funcionamiento del backend en Node.js. 

   - La integración con la API de Meta para la recepción y envío de mensajes. 

   - El uso de la API de ChatGPT para el procesamiento del lenguaje natural. 

   - El diseño de la base de datos en MongoDB y la estructura de las incidencias almacenadas. 

- Registro del proceso de validación. En este apartado se describen las pruebas realizadas durante la fase de validación, detallando: 

   - Los escenarios y resultados de diferentes casos de uso 

Título del PFC 

Página 10 de 53 

Introducción 

## **1.4 Medios hardware y software** 

Este proyecto ha sido desarrollado principalmente en un ordenador portátil que cuenta con las siguientes especificaciones 

- Sistema Operativo: macOS 

   - Versión: macOs Sequoia 

- Procesador: Apple M2 

- Memoria: 8 GB 

- Almacenamiento: 245 GB 

Software utilizado para el desarrollo del proyecto 

- Visual Studio Code 

- Node.js (versión LTS) 

- MongoDB Atlas 

- Meta Developer (WhatsApp Business API) 

- OpenAI API (ChatGPT) 

- Postman 

- Git y GitHub 

- Microsoft Word para Microsoft 365 

## **1.5 Estructura de la memoria** 

La presente memoria está organizada en cuatro capítulos principales, cada uno de los cuales aborda una parte esencial del desarrollo del proyecto. A continuación, se adelanta brevemente el contenido de cada uno de ellos, ofreciendo una visión general de la estructura del documento. 

- El presente **Capítulo 1** describe el contexto general del Trabajo Final de Grado, describe el problema que se quiere revolver, da una pincelada inicial de la creación de un chatbot capaz de comunicarse a través de la plataforma Meta/WhatsApp y modificar incidencias en una base de datos. Se exponen los objetivos del proyecto, la motivación, el método de trabajo seguido y los medios software y hardware utilizados durante el desarrollo. 

- El **Capítulo 2** recoge los conocimientos necesarios para abordar el proyecto. Se describen las tecnologías principales analizadas anteriormente. 

   - El API de WhatsApp Business/Meta para el envío y recepción de mensajes 

   - El entorno de Node.js y su papel como backend en la aplicación 

   - La base de datos MongoDB y su uso para modificar incidencias. 

   - La integración con ChatGPT para poder interactuar con el cliente final 

Título del PFC 

Página 11 de 53 

Introducción 

- El **Capítulo 3** describe el proceso completo de implementación del chatbot. Se detalla la arquitectura del sistema, la integración con la API de Meta, la comunicación con ChatGPT, el diseño de la base de datos y el funcionamiento del backend 

- El **Capítulo 4** presenta las conclusiones finales derivadas del proyecto, evaluando los objetivos y reflexionando las decisiones técnicas y funcionales. 

Título del PFC 

Página 12 de 53 

Introducción 

## Ca ítulo 2 Estado del arte p 

Este capítulo tiene como propósito general describir y explicar las tecnologías utilizadas en el proyecto final de grado, desarrollo de un chatbot orientado a gestión de citas presenciales. Su objetivo es ofrecer una visión organizada de los elementos que hacen posible su funcionamiento dentro del proyecto. Dado que el sistema integra diversos componentes resueltos esencial presentar estos elementos de manera estructurada y coherente, permitiendo al lector comprender con claridad como se relacionan e interactúan entre sí. 

Tras situar al lector en un primer contexto general del primer capítulo, este capítulo introduce cada una de las tecnologías y herramientas utilizadas, no solo describiéndolas, si no también justificando su elección en función de las necesidades del proyecto. Finalmente, se ofrece una visión general de otras soluciones y herramientas existentes que cubren parcialmente las funcionalidades abordadas en este proyecto. 

Este análisis comparativo permite entender mejor el posicionamiento y el valor diferencial de la solución desarrollada 

## **2.1 Plataformas de mensajería y APIs de comunicación** 

En la actualidad, la comunicación instantánea se ha convertido en un elemento esencial tanto para los usuarios como para las empresas. Las plataformas de mensajería han dejado de ser simples herramientas de conversación para transformarse en canales estratégicos de interacción y atención al cliente 

## _**2.1.1 WhatsApp Business API**_ 

El API de WhatsApp Business, parte del ecosistema Meta, diseñado para que las empresas puedan automatizar el envío y recepción de mensajes y respuestas automáticas de sus clientes. Su funcionamiento se basa en un sistema de webhooks que notifican al servidor cada vez que un cliente envía un mensaje, y un webhook que permite enviar mensajes al cliente  [1] 

Entre sus principales características destacan: 

- Automatización de mensajes mediante plantillas aprobadas por Meta, que garantizan el cumplimiento con las políticas de la plataforma 

- Recepción de mensajes y envío de mensajes a través de un sistema de webhooks, lo que posibilita una integración en tiempo real con los sistemas internos de la empresa 

- Creación de una cuenta empresarial verificada, requisito para el uso del servicio y la gestión de los canales oficiales de comunicación. 

Su elección frente a alternativas como Twilio se justifica por: 

- La ausencia de requisitos adicionales como números físicos de Estados Unidos 

Título del PFC 

Página 13 de 53 

Introducción 

- Permite una integración directa con el ecosistema Meta, simplificando el proceso de configuración y despliegue 

- Proporciona un mayor control sobre la configuración y la gestión del fuljo de mensajes, lo cual resulta crucial para mantener la consistencia comunicativa y la trazabilidad de las conversaciones 

- Ausencia de la necesidad de tener una empresa reglamentaria 

- Dispone de una documentación oficial extensa y clara, lo que facilita el desarrollo, la implementación y el mantenimiento de soluciones basadas en esta tecnología. 

Por todo lo anterior, la API de WhatsApp Business se consideró la opción más adecuada para implementar un sistema de mensajería automatizada orientado a la atención al cliente y la optimización de los procesos comunicativos empresariales. 

## _**2.1.2 Modelo de conversación y tipos de mensajes**_ 

La documentación oficial de WhatsApp Business Plataform indica que existen dos tipos principales de conversación. 

- Conversaciones de sesión de 24 horas: Mensajes libres que la empresa puede enviar sin necesidad de plantilla, siempre que la última interacción venga del cliente dentro de un periodo 24 horas. [2] 

- Conversaciones basadas en plantillas: Fuera de esa ventana, cualquier mensaje debe enviarse mediante plantillas aprobadas por Meta, que pueden indicar variables personalizadas personalizadas y componentes interactivos como botones o listas [2] 

Esto permite a las empresas diseñar flujos de comunicación más estructurados, controlando el uso de plantillas y respetando las políticas de calidad y privacidad de WhatsApp 

## _**2.1.3 Integración con Facebook Developers**_ 

Para usar la WhatsApp Business API es necesario: 

- Crear una aplicación empresarial en Meta for Developers 

- Vincular esa App con un número de WhatsApp Business y con una cuenta empresarial verificada en Meta Business Suite. 

- Generar un token de acceso (temporal o permanente), en el caso del proyecto será permanente, configurar un webhook para recibir notificaciones de mensajes [Meta, 2025b]. [3] 

Este proceso permite a las empresas integrar la API de WhatsApp con sus propios sistemas de backend, automatizando la recepción y envío de mensajes de forma segura y conforme a las políticas de Meta. [3] 

Título del PFC 

Página 14 de 53 

Introducción 

## _**2.1.4 Seguridad, autenticación y buenas prácticas**_ 

La documentación de WhatsApp Business Cloud API detalla protocolos de autenticación, formatos de mensajes y gestión de errores. 

- Usar tokens de acceso permanentes generados desde Usuarios del Sistema en Meta Business Suite, para evitar interrupciones del servicio. [3] 

- Seguir las pautas de privacidad de datos y cumplimiento normativo, por ejemplo, no enviar mensajes de SPAM o engañosos. [4] 

Estas buenas prácticas reducen el riesgo de bloqueos de cuenta y mejorar experiencia de usuario 

## _**2.1.5 Impacto de WhatsApp Business en la atención al cliente**_ 

La API de WhatsApp Business se ha convertido en una herramienta clave para la atención al cliente y la comunicación empresarial, permitiendo a las empresas ofrecer respuestas rápidas, personalizadas y escalables. Diversas guías y análisis técnicos destacan que el uso de WhatsApp como canal oficial mejora la tasa de apertura de mensajes y la interacción con el cliente, comparado con otros canales tradicionales como el correo electrónico [5] 

Para empresas que buscan implementar soluciones de mensajería automatizada, WhatsApp Business API ofrece una combinación de facilidad de integración, soporte oficial y amplia documentación, lo que la convierte en una opción muy competitiva frente a otras plataformas de mensajería o servicios SMS [5] 

## **2.2 Tecnologías de backend y procesamiento** 

Para gestionar la lógica del chatbot, procesar mensajes y coordinar la comunicación entre los diferentes módulos, se requiere una tecnología robusta, escalable y ampliamente utilizada en el desarrollo de aplicaciones web. 

## _**2.2.1 Node.js**_ 

Node.js es un entorno de ejecución Javascript de código abierto, multiplataforma que permite crear servidores, aplicaciones web y herramientas de línea de comandos utilizando un modelo de E/S no bloqueante y orientada a eventos [6] 

## _**2.2.2 Características técnicas principales: (Esto no se si ponerlo)**_ 

- Event Loop: Permite operaciones I/O no bloqueantes con un solo hilo mediante fase (timers, I/O polling, check, close callbacks) 

- Motor v8: Compilación Just-In-Time de JavaScript a código máquina para alto rendimiento 

- Libuv: Biblioteca C multiplataforma para operaciones asíncronas de red y archivos 

## _**2.2.3 Razones de su elección para este proyecto**_ 

- Alta concurrencia: Maneja cientos de mensajes de WhatsApp simultáneos sin degradación 

Título del PFC 

Página 15 de 53 

Introducción 

- Integración nativas con APIs: Librerías oficiales para WhatsApp Business API y OpenAI GPT 

## _**2.2.4 Base de datos MongoDB**_ 

MongoDB es una base de datos NoSQL orientada a documentos que permite almacenar datos en formato JSON [6]. 

En este proyecto MongoDB almacena: 

- Información de clientes 

- Historial de mensajes 

- Citas programadas 

MongoDB se utiliza por: 

- Su capacidad de escalado y su facilidad de integración con Node.js lo convierte en una buena solución para este proyecto. 

- Su flexibilidad para almacenar datos no estructurados 

- Facilidad de Integración con Node.js mediante librerías como Mongoose [7] 

- Capacidad para escalar y gestionar grandes volúmenes de datos, aunque en este proyecto no ha sido necesario finalmente 

## **2.3 Inteligencia artificial** 

La principal característica diferenciadora del sistema en este proyecto radica en su capacidad para interpretar los mensajes del usuario y producir respuestas coherentes y contextualizadas mediante el uso de lenguaje natural 

## _**2.3.1 ChatGPT y el API de OpenAI**_ 

ChatGPT es un modelo de lenguaje basado en Inteligencia Artificial (LLM)capaz de comprender texto, interpretar la respuesta y generar respuestas naturales. Los modelos de ChatGPT pertenecen a la familia de Large Language Models (LLM), entrenados con grandes cantidades de datos para realizar tareas como conversación, análisis de texto, clasificación, extracción de información y asistencia automatizada. Su integración en el proyecto permite: [8] 

- Analizar mensajes enviados por los usuarios 

- Generar respuestas personalizadas y coherentes 

- Integración fácil y rápida con el proyecto 

- El modelo elegido es un modelo gratuito a diferencia de otros 

El API de OpenAI facilita esta integración mediante peticiones HTTP que envían el mensaje del usuario y recibe la respuesta generada por el modelo [9] 

## _2.3.1.1 Modelos LLM_ 

Título del PFC 

Página 16 de 53 

Introducción 

Los LLM son modelos de inteligencia artificial capaces de comprender y generar texto de forma natural, similar a una persona, entrenados con enormes cantidades de texto de libros, webs, artículos y código. Se usan para responder preguntas, redactar textos, resumir documentos, traducir idiomas, generar código, y en asistentes conversacionales o herramientas de productividad 

## _2.3.1.2 Tokenización_ 

Los tokens son los componentes básicos del texto que procesan los modelos de OpenAI. Pueden ser tan cortos como un solo carácter o tan largos como una palabra completa. Los espacios, puntuación y palabras parciales contribuyen al conteo de tokens. [10] 

Cuando envías texto a la API, el modelo lo divide en tokens, los procesa internamente y genera nuevos tokens como respuesta. Luego, esos tokens se convierten otra vez en texto legible. En modelos avanzados también intervienen tokens de razonamiento y tokens en caché que optimizan el proceso. 

En una interacción con un modelo de la IA intervienen varios tipos de token: 

- Tokens de entrada, que son los que envía el usuario 

- Tokens de salida, que son los que genera IA como respuesta. 

- Tokens de caché, que son partes del historial reutilizadas sin volver a procesarse 

- Tokens de razonamiento, que algunos modelos usan internamente para realizar pasos de pensamiento antes de producirse la respuesta final. 

## _2.3.1.3 Límites y precios de tokens_ 

En el proyecto se ha utilizado el modelo gpt-5.4, por ser el modelo más económico, los tokens de entrada tienen un valor de 0.20$, los tokens de caché 0.02$ y los tokens de salida 1.25$. 

El límite del modelo consta de: 

- 400,000 context window 

- 128,000 max output tokens 

- Agosto 21, 2025 Knowledge 

- Reasoning token support [11] 

## _2.3.1.4 Ventana de contexto_ 

La ventana de contexto de un modelo de lenguaje de gran tamaño LLM, es la cantidad de texto, en tokens, que el modelo puede considerar en cualquier momento. Una ventana de contexto más grande permite que un modelo de IA procese entradas más largas e incorpore una mayor cantidad de información en cada salida de respuesta. [12] 

Cuánto mayor es esta ventana, más información puede procesar el modelo en una sola interacción. Cuando una instrucción o conversación supera esa capacidad, es necesario recortar o resumirlo para que el modelo pueda contestar a la interacción. 

En general, ampliar la ventana de contexto tiene muchas ventajas, mayor precisión, respuestas más coherentes y conversaciones más largas. Sin embargo, esta mejora tiene sus costes: requiere más potencia computacional, incrementa el coste y el largo de la ventana de contexto depende de los modelos. 

- _2.3.1.5 Prompt_ 

Título del PFC 

Página 17 de 53 

Introducción 

En la Inteligencia Artificial, un prompt es la instrucción o pregunta que se le da a un modelo para que genere una respuesta o realice una tarea concreta 

El prompt indica el objetivo, por ejemplo, explicar, resumir, generar código, etc. Aporta contexto rol, tema, público objetivo, nivel de detalle, tono (formal, sencillo, técnico, etc.) y define el formato deseado y puede incluir límites. 

Por ejemplo, no es lo mismo escribir “Háblame de Internet” que “Explica qué es Internet para un estudiante de 13 años, en no más de 100 palabras y con un ejemplo cotidiano”. El segundo es un prompt más trabajado y típico de lo que se recomienda en guías de uso de IA. [13] 

## **2.4 Librería Duckling** 

Duckling, desarrollado por Meta AI Research, es una herramienta diseñada para transformar texto escrito en datos estructurados. Su función principal es detectar y extraer entidades dentro de un mensaje, como cantidades, intervalos de tiempo y distancias [14]. En este proyecto se utiliza específicamente para el reconocimiento y normalización de fechas expresadas en lenguaje natural. 

## _**2.4.1 Desafíos en el reconocimiento de fechas coloquiales**_ 

Los usuarios expresan fechas de formas muy diversas y ambiguas: 

- “El lunes que viene” 

- “Dentro de dos semanas” 

- “El próximo viernes a primera hora” 

Estas expresiones deben convertirse en formato ISO 8601 para procesamiento determinístico 

## _**2.4.2 Funcionamiento Técnico de Duckling**_ 

Duckling utiliza un motor lingüístico basado en reglas declarativas que analiza el texto e identifica referencias temporales. 

- Entrada: “El lunes que viene” 

- Salida: “2026-04-07T00:00:00.000Z” 

El resultado incluye: fecha exacta según reference-time, hora por defecto y zona horaria normalizada 

## _**2.4.3 Enfoque manual vs Duckling**_ 

Un parser manual cubre los casos de uso básicos, pero falla con expresiones complejas como “pasado mañana a las tres y pico”. Duckling maneja patrones lingüísticos con una buena precisión??? 

El código nativo requiere semanas de desarrollo continuo y genera excepciones inmanejables. Mientras que, Duckling se integra fácilmente mediante servidor HTTP ligero. 

## **2.5 Docker** 

Docker es una plataforma que permite empaquetar aplicaciones en contenedores, incluyendo todo lo necesario para su ejecución. Esto garantiza que el software funcione correctamente en nuestro entorno 

Título del PFC 

Página 18 de 53 

Introducción 

de producción. En este proyecto, Docker ha sido especialmente útil para ejecutar Duckling, ya que esta herramienta no se puede instalar directamente mediante Node.js. Gracias a Docker se puede desplegar Duckling como un servicio. 

En este proyecto, Docker se utiliza principalmente para desplegar Duckling, ya que: 

- Duckling está desarrollado en Haskell, lenguaje no soportado por los planes gratuitos que ofrece Microsoft Azure 

Gracias a Docker, Duckling se ejecuta como un servicio independiente accesible mediante peticiones HTTP desde el backend principal - 107 

Docker es una plataforma que permite empaquetar aplicaciones en contenedores ligeros, incluyendo código fuente, runtime, librerías del sistema y dependencias garantizando que el software funcione de manera idéntica en cualquier entorno[b]. Esta portabilidad elimina el clásico problema “funciona en mi máquina”, al crear imágenes inmutables que encapsulan todo lo necesario para la ejecución. 

En este proyecto, Docker ha sido especialmente útil para ejecutar Duckling, ya que esta herramienta Haskell no puede instalarse directamente en el stack tecnológico principal. Gracias a Docker, Duckling se despliega como un microservicio HTTP independiente, accesible vía peticiones REST desde el backend principal. 

## _**2.5.1 Ventajas de utilizar Docker**_ 

Docker proporciona un aislamiento perfecto entre tecnologías incompatibles, permitiendo la coexistencia de Node.js y Haskell en el mismo sistema, sin problemas entre ambos lenguajes. Cada contenedor mantiene su propio runtime, gestor de paquetes y modelo de memoria, eliminando conflictos de dependencias que harían inviable la integración directa. 

## **2.6 Microsoft Azure** 

Microsoft azufre es la plataforma de computación en la nube de Microsoft. Ofrece un conjunto amplio de servicios para desarrollar, desplegar, administrar y supervisar aplicaciones, bases de datos, redes, inteligencia artificial en entornos cloud [15]. Una de sus principales ventajas es que permite trabajare con distintos modelos de servicio, lo que facilita adaptar la infraestructura a las necesidades concretas de cada proyecto. 

En términos generales, Azure se utiliza para alojar aplicaciones de forma escalable y segura, sin necesidad de mantener una infraestructura física propia. Además, integra herramientas de administración como Azure Portal, una consola web unificada que permite gestionar recursos, suscripciones, configuraciones y paneles de supervisión desde un único entorno [16] 

Título del PFC 

Página 19 de 53 

Introducción 

## _**2.6.1 Azure en este proyecto**_ 

Para este proyecto, se ha elegido Microsoft Azure como plataforma de despliegue por su estabilidad, su facilidad de administración y su compatibilidad con servicios en contenedores. Esto resulta especialmente útil porque la solución está formada por dos componentes independientes: el proyecto principal, encargado de la gestión de citas presenciales, y Duckling, que se despliega como servicio separado para procesar texto en lenguaje natural. 

Esta separación permite que cada parte del sistema cumpla una función concreta sin interferir con la otra. El backend principal se encarga de la lógica de negocio, mientras que Duckling actúa como un servicio auxiliar especializado en la interpretación de fechas expresadas en lenguaje natural. Esta organización mejora el modularidad, simplifica el mantenimiento y facilita futuras ampliaciones del sistema. 

## _**2.6.2 Ventajas de Azure**_ 

Azure ofrece una serie de   ventajas relevantes para un proyecto de estas características. En primer lugar, proporciona escalabilidad, lo que permite ajustar recursos según la demanda del sistema. En segundo lugar, facilita la supervisión y el control, gracias a herramientas como Azure Monitor, que permite recopilar métricas, analizar registros y configurar alertas [17]. 

Otra ventaja importante es la integración con múltiples servicios. Azure incluye opciones para contenedores, bases de datos, almacenamiento, monitorización y automatización, lo que lo convierte en una plataforma flexible para arquitecturas modernas. Además, al tratarse de un entorno cloud administrado, reduce la carga   operativa asociada al mantenimiento de servidores físicos o a la configuración manual de infraestructura 

## _**2.6.3 Grupo de recursos y organización**_ 

En Azure, los recursos pueden agruparse dentro de un grupo de recursos, que actúa como contenedor lógico para administrar elementos relacionados [18]. En este proyecto, tanto el backend principal como el servicio Duckling se encuentra dentro del mismo grupo de recursos, lo que facilita su organización, seguimiento y gestión centralizada. 

Esta decisión aparta ventajas prácticas, ya que permite mantener una visión unificada de todos los componentes del sistema y simplifica tareas como despliegues, cambios de configuración o revisiones del estado del entorno. También resulta útil para estructurar mejor el proyecto desde el punto de   vista de la administración cloud. 

## _**2.6.4 Relación con Dockera**_ 

Azure y Docker se complementan en este proyecto. Docker permite empaquetar Duckling en un contenedor con todo lo necesario para su ejecución, mientras que Azure proporciona el entorno donde ese contenedor puede desplegarse y estar disponible como servicio. Gracias a esta combinación, Duckling puede ejecutarse de forma independiente y comunicarse con el backend mediante peticiones HTTP, sin necesidad de integrarlo directamente en el mismo entorno de ejecución. 

Título del PFC 

Página 20 de 53 

Desarrollo del Caso de Estudio 

## Ca ítulo 3 Solución tecnoló ica p g 

**Figura 1.** Arquitectura simplificada de la aplicación 

En este capítulo se presenta la solución tecnológica desarrollada para automatizar la gestión de citas presenciales a partir de incidencias abiertas y su tratamiento conversacional mediante WhatsApp. Para ello, se describe en primer lugar la arquitectura general del sistema, así como las tecnologías empleadas. A continuación, se detalla el funcionamiento interno de la solución, los componentes principales que la formas, el modelo de datos y la integración con los servicios externos necesarios para su ejecución. 

La solución implementada se apoya en un backend desarrollado en Node.js, utilizando Express como framework para la exposición de servicios HTTP y MongoDB, a través de Mongoose, como sistema de persistencia. Sobre esta base se ha construido una arquitectura modular orientada a objetos, en la que se han separado claramente las responsabilidades de coordinación, lógica de negocio, acceso a datos e integración externa. 

Además, la herramienta incorpora varios servicios complementarios. Por un lado, se integra con la API de WhatsApp Business, utilizada como canal de comunicación con el cliente. Por otro lado, emplea un servicio de análisis para interpretar fechas expresadas en lenguaje natural. Finalmente, se apoya en OpenAI para generar respuestas contextuales cuando la conversación no aporta todavía suficiente información para fijar la cita. 

A diferencia de otros sistemas conversacionales en los que el usuario inicia el contacto, en esta solución el flujo arranca desde el propio backend. Cuando el sistema detecta una incidencia activa, recupera su información, calcula una fecha disponible y envía automáticamente su primer mensaje al cliente mediante WhatsApp. A partir de ese punto, el usuario responde y el sistema procesa la conversación hasta confirmar o reajustar la cita. 

Título del PFC 

Página 21 de 53 

Desarrollo del Caso de Estudio 

## **3.1 Visión general de la solución** 

La solución propuesta se organiza alrededor de una arquitectura modular por capas. Esta organización facilita el mantenimiento del código, reduce el acoplamiento entre componentes y mejora la trazabilidad del flujo funcional, puesto que cada módulo asume una responsabilidad concreta dentro del proceso de gestión de citas. 

De forma general, la arquitectura se compone de los siguientes bloques: 

- Una capa de entrada, formada por rutas y controladores HTTP 

- Una capa de coordinación, encargada de orquestar el flujo principal del sistema 

- Una capa de aplicación y lógica de negocio, compuesta por casos de uso, servicios y gestores especializados 

- Una capa de integración externa, que encapsula la comunicación con WhatsApp, parser de fechas y OpenAI 

- Una capa de persistencia, basada en modelos y repositorios 

La Figura 1 muestra una visión simplificada de la arquitectura. En ella puede observarse que el flujo parte de una incidencia activa almacenada en la base de datos. A partir de dicha incidencia, el backend consulta la información disponible, calcula una propuesta temporal coherente con las restricciones del sistema, construye el mensaje inicial y lo envía a través de WhatsApp Business. Posteriormente, la respuesta del usuario desencadena el procesamiento conversacional, que puede concluir con la confirmación de la cita o con la solicitud de información adicional cuando los datos recibidos todavía no son suficientes. 

**Figura 2.** Diagrama UML de clases 

## **3.2 Estructura interna del backend** 

El diagrama UML de la Figura 2 organiza la solución en varios bloques claramente diferenciados. En primer lugar, se distinguen las operaciones de cita, donde una clase abstracta `OperacionCita` sirve como base para `IniciarConversacionCita` y `ProcesarRespuestaCita`. En segundo lugar, aparecen los gestores, responsables de coordinar tareas transversales del flujo. En tercer lugar, los servicios encapsulan la lógica de acceso y tratamiento de datos. A ellos se suman los clientes de integración, el dominio y la persistencia, que completan la estructura interna del sistema.

La entrada principal del backend se encuentra en `WhatsAppController`, que recibe tanto la petición de envío del primer mensaje como las respuestas procedentes del webhook de WhatsApp. Este controlador se limita a extraer la información relevante de la petición HTTP y delegar la lógica del negocio en `CoordinadorCita`, evitando que la capa de presentación concentre responsabilidades de dominio. De esta forma, la comunicación con Meta queda separada de las reglas que gobiernan el negocio de las citas.

`CoordinadorCita` actúa como punto de coordinación del flujo principal y centraliza dos operaciones funcionales: `IniciarConversacionCita` y `ProcesarRespuestaCita`. La primera operación se encarga de arrancar la conversación a partir de una incidencia activa no resuelta. La segunda representa el núcleo conversacional del sistema y procesa la respuesta del cliente, guardando el historial, interpretando la información temporal contenida en el mensaje y decidiendo si la cita puede registrarse o si debe continuar la conversación. Esta organización permite que el flujo general se entienda como una secuencia lógica de pasos, en lugar de como una acumulación de llamadas dispersas entre módulos.

La estructura interna del backend se apoya, por tanto, en una cadena de responsabilidades bien delimitada. En términos generales, el sistema sigue este recorrido:

1. El controlador recibe una petición o una respuesta de WhatsApp.
2. El coordinador identifica qué operación debe ejecutarse.
3. La operación concreta orquesta el trabajo con los gestores y servicios necesarios.
4. Los gestores aplican la lógica del flujo, como el tratamiento de la conversación, la búsqueda de disponibilidad o la preparación de mensajes personalizados.
5. Los servicios acceden a la persistencia o a datos de dominio.
6. Los clientes encapsulan la comunicación con servicios externos.

Esta estructura evita que una sola clase concentre demasiada lógica y hace posible que cada parte del sistema tenga una función clara. A nivel práctico, el resultado es un backend más legible, más fácil de probar y más sencillo de extender. Por ejemplo, si en el futuro se quisiera modificar la manera en que se interpretan las fechas, únicamente sería necesario actuar sobre la parte encargada de esa responsabilidad, sin alterar el resto del flujo conversacional.

La composición de estas dependencias no se realiza de forma dispersa, sino desde un punto de configuración central situado en la capa de infraestructura. A través de este ensamblado se crean los repositorios, después los servicios, a continuación los gestores y, por último, los casos de uso y el coordinador general. Este enfoque permite que el resto de la aplicación reciba dependencias ya preparadas, lo que favorece una arquitectura más limpia y facilita los cambios futuros en cualquiera de las piezas del sistema.

Por debajo de estas operaciones se sitúan varias clases de apoyo:

- `IncidenciaService`, encargado de consultar y actualizar incidencias

- `GestorConversacion`, responsable de almacenar los mensajes, recuperar el contexto y preparar el texto necesario para la interacción con la IA

- `FechaParseadaService`, orientado a interpretar expresiones temporales extraídas del lenguaje natural

- `MensajeService`, centrado en el acceso a los mensajes asociados a cada incidencia

- `GestorFechas`, que resuelve la disponibilidad y la reconstrucción temporal de la cita

- `GestorMensajes`, que construye y envía mensajes hacia WhatsApp

- `UsuarioService`, que recupera datos básicos del usuario para personalizar determinadas comunicaciones

- `FacebookClient`, `ParserClient` e `IAClient`, que encapsulan las integraciones externas necesarias para la solución

En el nivel de dominio, la figura también incorpora la clase `Incidencia`, que representa la entidad principal del flujo, y la clase `Usuario`, utilizada como apoyo para consultar datos de contacto y personalización. En el nivel de persistencia aparecen los repositorios asociados a cada modelo, que actúan como capa de acceso a la base de datos. Esta organización permite que cada elemento del sistema tenga una responsabilidad bien delimitada y que las dependencias entre capas queden claramente reflejadas.

La relación estructural entre estos componentes se representa mediante el diagrama UML de la Figura 2. Esta representación permite entender cómo el controlador delega en el coordinador, cómo el coordinador deriva el flujo hacia las operaciones principales y cómo estas se apoyan en servicios, gestores y clientes de integración para completar la funcionalidad del sistema.

## **3.3 Flujo funcional del sistema** 

El comportamiento del sistema puede dividirse en dos grandes fases: una fase de activación y una fase conversacional. Esta división permite separar la generación automática de la primera propuesta de cita del tratamiento posterior de las respuestas del usuario, lo que simplifica tanto la implementación como la validación del comportamiento global. 

## _**3.3.1 Fase de activación**_ 

La fase de activación comienza cuando la aplicación ejecuta `IniciarConversacionCita`. Esta operación consulta una incidencia activa no resuelta mediante `IncidenciaService`. Una vez localizada, solicita a `GestorFechas` una franja horaria disponible y, con esa información, ordena a `GestorMensajes` el envío de una propuesta de cita al usuario mediante WhatsApp. 

Este primer mensaje se envía como una plantilla de negocio a través de la API de WhatsApp Business. En él se informa al usuario de la propuesta generada por la aplicación y se le solicita una respuesta. En el flujo planteado, dicha respuesta puede consistir en la aceptación o rechazo de la propuesta inicial, o bien en una reformulación de la disponibilidad temporal. 

## _**3.3.2 Fase conversacional**_ 

La fase conversacional comienza cuando el usuario responde al mensaje recibido. El webhook entrega esa respuesta a la aplicación y `WhatsAppController` extrae dos datos fundamentales: el teléfono del remitente y el contenido del mensaje. A continuación, delega el procesamiento en `CoordinadorCita`, que transfiere la ejecución a `ProcesarRespuestaCita`. 

Título del PFC 

Página 23 de 53 

Desarrollo del Caso de Estudio 

Esta operación desarrolla el núcleo del sistema. En primer lugar, `GestorConversacion` guarda el mensaje del usuario y lo asocia a la incidencia correspondiente. En segundo lugar, `GestorFechas` intenta interpretar si la respuesta contiene una fecha válida. En tercer lugar, la aplicación decide entre dos caminos: 

- Si la información es suficiente, actualiza la incidencia con la nueva cita. 

- Si la información es insuficiente, reconstruye el contexto de la conversación y solicita una nueva respuesta a la capa de IA, que posteriormente se envía al usuario por WhatsApp. 

La Figura 3 muestra de forma visual este flujo conversacional. 

**Figura 3.** Diagrama de flujo 

## _**3.3.3 Continuidad conversacional**_ 

La principal ventaja de este enfoque es que el sistema no se limita a almacenar datos, sino que mantiene una conversación orientada a un objetivo concreto: obtener una fecha completa para registrar la cita presencial asociada a la incidencia. Esta continuidad permite que el usuario responda de forma natural, con mensajes parciales o con correcciones posteriores, sin obligarle a estructurar la información exactamente igual que lo haría un formulario tradicional. 

## **3.4 Componentes principales del backend** 

## _**3.4.1 WhatsAppController**_ 

WhatsAppController constituye la puerta de entrada del sistema. Gestiona la verificación del webhook, la recepción de mensajes entrantes y el disparo del flujo inicial de envío de la propuesta. Su principal objetivo es desacoplar la capa HTTP de la lógica del negocio. 

## _**3.4.2 CoordinadorCita**_ 

CoordinadorCita actúa como intermediario entre la capa de entrada y la operación del flujo principal. Esta clase no concentra toda la lógica del negocio, sino que se limita a coordinar dos acciones clave: iniciar la conversación y procesar la respuesta del usuario. 

## _**3.4.3 IniciarConversacionCita**_ 

IniciarConversacionCita representa la operación encargada de arrancar la conversación. Internamente consulta una incidencia activa, solicita una fecha disponible y ordena el envío de la propuesta al cliente. Esta clase modela la idea de que el proceso parte de una necesidad detectada por el sistema y no de una petición manual del usuario. 

## _**3.4.4 ProcesarRespuestaCita**_ 

ProcesarRespuestaCita es la operación más importante del backend. Su contenido consiste en guardar la respuesta del cliente, analizar su contenido temporal y decidir si ya puede registrarse una cita o si debe mantenerse la conversación. Para ello coordina el acceso al historial de mensajes, la interpretación de fechas y la generación de nuevas respuestas conversacionales. 

## _**3.4.5 GestorConversacion**_ 

`GestorConversacion` es el componente encargado de administrar la conversación desde el punto de vista del flujo. Su función consiste en guardar los mensajes del usuario, asociarlos a la incidencia correspondiente y reconstruir el contexto textual del diálogo cuando este resulta necesario para continuar la interacción. A diferencia de un servicio de entidad puro, esta clase actúa como gestor operativo del flujo conversacional, ya que coordina el uso de varios servicios de negocio. 

## _**3.4.6 GestorFechas**_ 

`GestorFechas` concentra la lógica operativa relacionada con la disponibilidad y la reconstrucción temporal. Por un lado, busca franjas horarias libres dentro de una ventana temporal dada. Por otro, intenta reconstruir una fecha completa a partir del historial conversacional, combinando día y hora cuando el usuario los ha proporcionado en mensajes distintos. Esta clase también contempla respuestas de tipo `button` y `text`, lo que resulta especialmente útil en la interacción inicial de aceptación o rechazo de la cita propuesta. 

## _**3.4.7 GestorMensajes**_ 

`GestorMensajes` centraliza la construcción y envío de mensajes a través de WhatsApp. Distingue entre mensajes de plantilla y mensajes de texto libre, encapsulando la creación del payload necesario para la API externa y permitiendo que el resto del backend se concentre en decidir qué debe comunicarse. Esta separación facilita mantener una interfaz homogénea de comunicación independientemente del tipo de respuesta que se envíe al usuario. Además, este gestor se apoya en `UsuarioService` para recuperar datos básicos del cliente, como su nombre, y así personalizar algunas comunicaciones de salida. 

## _**3.4.8 IncidenciaService**_ 

`IncidenciaService` encapsula la lógica relacionada con la entidad principal del sistema: la incidencia. Entre sus funciones destacan la búsqueda de incidencias activas, la obtención del motivo asociado a una conversación y la actualización de la cita cuando ya se ha obtenido una fecha suficiente. En este proyecto, la incidencia se utiliza como referencia principal para articular el resto de entidades y mensajes de la conversación. 

## _**3.4.9 MensajeService**_ 

`MensajeService` se encarga de las operaciones asociadas a la entidad `Mensaje`. Su responsabilidad principal consiste en crear y recuperar mensajes vinculados a una incidencia concreta, sirviendo como capa de acceso especializada a esta parte del modelo. Además, cada mensaje puede incorporar información temporal parseada en formato normalizado, lo que permite conservar la trazabilidad entre el texto recibido y la fecha inferida. 

## _**3.4.10 FechaParseadaService**_ 

`FechaParseadaService` se encarga de transformar la salida obtenida desde Duckling en una estructura temporal utilizable por la aplicación. Su función consiste en normalizar la respuesta técnica del parser, identificar el tipo de información temporal recibida y devolver una representación coherente con el modelo interno del sistema. De este modo, la aplicación puede diferenciar si el usuario ha proporcionado un día, una hora o una fecha completa, sin acoplar la lógica de negocio a la forma concreta de la respuesta del servicio externo. 

FechaTipoHelper distingue si la respuesta contiene: 

- Solo un dia, es decir, la fecha solo contiene el día. Por ejemplo: El 13 de agosto. 

- Solo una hora, es decir, la fecha solo contiene la hora. Por ejemplo: A las 3 de la tarde 

- Fecha_completa, contiene tanto la fecha como la hora. Por ejemplo: El 13 de agosto a las 3 de la tarde. 

Esta distinción resulta esencial para decidir si la cita puede registrarse o si la conversación debe continuar. 

**Figura 4.** Modelo de datos 

## **3.5 Modelo de datos** 

La Figura 4 recoge el modelo de datos utilizado por la solución y resume los elementos que intervienen en la gestión de una cita presencial. El diseño parte de una estructura reducida y orientada al flujo real de la aplicación, evitando separar en colecciones distintas aquellos datos que pertenecen de forma natural al mismo contexto conversacional. Por este motivo, la información temporal detectada a partir de un mensaje no se modela como una entidad independiente, sino como un subdocumento embebido dentro del propio `Mensaje` mediante el campo `fecha_parseada`. De esta manera se conserva, en un único documento, tanto el texto original del usuario como la interpretación realizada por el sistema.

El modelo se organiza en torno a tres elementos principales. En primer lugar, `Usuario` identifica a la persona que participa en la conversación y permite asociar su información básica con el proceso de gestión de citas. En segundo lugar, `Incidencia` representa el caso operativo sobre el que gira toda la conversación; concentra los datos relevantes del proceso, como el teléfono de contacto, el motivo, la fecha final acordada y el estado de resolución. Finalmente, `Mensaje` recoge cada intercambio entre el sistema y el usuario, preservando el historial de la conversación y facilitando la recuperación del contexto cuando sea necesario continuar o reinterpretar el flujo.

Desde un punto de vista funcional, la relación entre estas entidades refleja la lógica del negocio. Un usuario puede disponer de una única incidencia activa para el proceso de cita, y dicha incidencia agrupa todos los mensajes intercambiados hasta la resolución del caso. A su vez, cada mensaje puede contener o no una fecha interpretada, dependiendo de si Duckling ha sido capaz de detectar una expresión temporal válida. Esta estructura permite mantener la trazabilidad completa de la conversación sin introducir redundancias innecesarias.

En términos de diseño, el esquema presenta varias ventajas. En primer lugar, reduce la duplicidad de datos al centralizar la conversación en la entidad `Mensaje`. En segundo lugar, mejora la mantenibilidad, ya que la información temporal interpretada queda asociada al mensaje concreto que la originó. En tercer lugar, facilita la comprensión del modelo porque cada entidad cumple una función claramente delimitada: `Usuario` identifica, `Incidencia` organiza y `Mensaje` registra la interacción. Por tanto, el modelo representa de forma fiel la lógica de negocio y proporciona una base clara para la implementación del backend.

### **3.5.1 Notación del modelo**

Para interpretar correctamente la figura, conviene aclarar la notación empleada. La marca `PK` identifica la clave primaria de cada entidad, es decir, el atributo que permite distinguir de forma única cada registro. En MongoDB esta función la cumple habitualmente el campo interno `_id`, que actúa como identificador principal del documento.

La marca `FK` indica una clave foránea o referencia a otro documento. En este proyecto, se utiliza para enlazar `Incidencia` con `Usuario` y `Mensaje` con `Incidencia`, de forma que las colecciones puedan relacionarse sin replicar información. Cuando un atributo aparece marcado como `UQ`, significa que su valor debe ser único en toda la colección. Esta restricción se aplica, por ejemplo, al campo que identifica la relación entre usuario e incidencia, ya que la lógica de negocio establece que un usuario solo puede tener una incidencia asociada.

La indicación `nullable` señala que el campo puede quedar vacío cuando todavía no existe un valor válido. Este caso se da, por ejemplo, en la fecha parseada de un mensaje, ya que no todos los mensajes contienen una expresión temporal reconocible. En cuanto a las cardinalidades, la notación `1` representa una instancia obligatoria; `0..1` indica que la relación puede no existir o existir una sola vez; `0..*` significa que la relación puede no tener elementos o contener varios; y `1..*` expresa que debe existir al menos una instancia relacionada. Estas cardinalidades permiten describir con precisión si la relación es uno a uno, uno a muchos u opcional.

Por último, el modelo distingue entre referencias y subdocumentos embebidos. Una referencia se representa mediante un `ObjectId` que apunta a otro documento de una colección distinta, mientras que un subdocumento embebido se almacena dentro del documento principal. En este proyecto, `fecha_parseada` se modela como un subdocumento embebido dentro de `Mensaje`, porque pertenece al propio contenido conversacional y no requiere una persistencia independiente.

## **3.6 Integración con servicios externos** 

La solución requiere integrarse con varios servicios externos, encapsulados mediante clientes específicos para evitar acoplar la lógica del negocio a detalles de infraestructura. Esta estrategia permite aislar el comportamiento dependiente de proveedores concretos y facilita la sustitución o evolución de dichos servicios en el futuro. 

`FacebookClient` se encarga de la comunicación con la API de WhatsApp Business de Meta. Toda salida del sistema hacia el usuario pasa por este componente, tanto en forma de plantilla inicial como en forma de mensajes de texto entre la aplicación y el usuario. 

`ParserClient` conecta con Duckling, herramienta especializada en la detección de entidades temporales dentro de texto libre. Gracias a este componente, la aplicación puede interpretar respuestas naturales del usuario como “mañana”, “el martes” o “a las cinco”. 

`IAClient` encapsula la comunicación con OpenAI y se emplea cuando todavía no existe suficiente información para cerrar la cita. Su función es generar respuestas de seguimiento que permitan continuar la conversación hasta completar los datos necesarios, manteniendo un tono coherente con el propósito operativo del sistema. 

## **3.7 Implementación de la solución** 

Además del diseño arquitectónico y del modelo de datos, la solución requirió la implementación de varios componentes técnicos que permiten su funcionamiento. Entre ellos destacan la integración con Meta y WhatsApp Business, el tratamiento temporal con Duckling, la lógica de envío de mensajes y el despliegue del backend sobre la infraestructura utilizada en el proyecto. 

## _**3.7.1 Integración con Meta y WhatsApp Business**_ 

La aplicación desarrollada se integra con las APIs oficiales de WhatsApp Business para posibilitar el envío y la recepción automática de mensajes. Esta integración se realiza a través del ecosistema de Meta for Developers, que permite conectar la solución con la WhatsApp Business Platform, orientada a empresas que necesitan gestionar conversaciones con clientes a gran escala. 

De entre los servicios ofrecidos por esta plataforma, en el proyecto se emplean principalmente dos componentes: la WhatsApp Cloud API, utilizada para el intercambio de mensajes, y la WhatsApp Business Management API, empleada para la configuración y administración de los activos asociados a la cuenta. 

Título del PFC 

Página 27 de 53 

Desarrollo del Caso de Estudio 

empresarial. Para poder hacer uso de estas APIs es necesario disponer de un porfolio empresarial, una cuenta de WhatsApp Business y un número de teléfono empresarial vinculado al servicio. 

El proceso comienza con la creación de una cuenta en Meta for Developers, desde la cual se genera el porfolio empresarial. Este porfolio permite agrupar y administrar desde una misma interfaz los activos de negocio, como páginas, cuentas publicitarias o cuentas de mensajería, centralizando su gestión en un único entorno. En el proyecto, dicho porfolio se ha creado bajo el nombre “Concierto de citas”, tal como se muestra en la Figura 5. 

Una vez creado el porfolio empresarial, se procede a la creación de una aplicación de tipo empresarial asociada a dicho entorno. Esta aplicación constituye el punto de conexión entre el backend desarrollado y los servicios de mensajería de Meta, como puede observarse en la Figura 6. Durante este proceso, Meta permite añadir los productos necesarios para la comunicación automatizada, entre ellos WhatsApp y Webhooks. 

La integración con WhatsApp permite enviar y recibir mensajes mediante la plataforma oficial, mientras que la integración con Webhooks facilita la recepción de eventos desde Meta en el backend. Para ello, la aplicación implementa dos operaciones principales: una encargada de verificar el token de validación y otra destinada a recibir mensajes entrantes. Esta segunda operación actúa como punto de entrada para los eventos enviados por Meta cuando un usuario responde a una conversación activa. 

Como se puede observar en la Figura 7, en el apartado de URL de devolución de llamada se ha configurado la dirección pública donde reside el endpoint encargado de recibir los mensajes del webhook. De este modo, cuando un usuario interactúa con la cuenta de WhatsApp Business, Meta notifica al backend a través de dicha URL, permitiendo procesar la respuesta y continuar con el flujo conversacional definido por la aplicación. 

**Figura 5.** Portfolio Empresarial 

Título del PFC 

Página 28 de 53 

Desarrollo del Caso de Estudio 

**==> picture [122 x 10] intentionally omitted <==**

**----- Start of picture text -----**<br>
Figura 6. Aplicación empresarial<br>**----- End of picture text -----**<br>


**Figura 7.** Configuración Webhook 

**Figura 8.** LLamada a Duckling 

## _**3.7.2 Tratamiento temporal con Duckling**_ 

Otro componente fundamental de la implementación es el tratamiento de fechas en lenguaje natural mediante Duckling, herramienta desarrollada originalmente por Facebook para el reconocimiento de expresiones temporales. 

La integración se realiza a través de `ParserClient`, que envía el texto del usuario al servicio de parsing temporal. La salida obtenida se procesa posteriormente en `FechaTipoHelper` y `FechaParseadaService`, que transforman la respuesta técnica del parser en una estructura útil para la aplicación. 

Esto permite distinguir si el usuario ha proporcionado solo un día, solo una hora o una fecha completa. Desde el punto de vista funcional, esta implementación aporta una gran ventaja: el sistema no obliga al usuario a rellenar formularios rígidos, sino que le permite expresarse en lenguaje natural. 

Como se puede observar en la Figura 8, es la llamada que se hace con la librería Duckling. 

Título del PFC 

Página 29 de 53 

Desarrollo del Caso de Estudio 

**Figura 9.** Plantilla inicio conversación 

## _**3.7.3 Envío de mensajes y continuidad conversacional**_ 

La implementación del envío de mensajes se apoya en dos niveles. En primer lugar, `GestorMensajes` construye los mensajes que deben enviarse al usuario, tanto en formato plantilla como en formato texto. En segundo lugar, `FacebookClient` los transmite a la API de WhatsApp Business. 

En el flujo implementado, la aplicación envía inicialmente una plantilla de propuesta de cita. El usuario puede aceptar, rechazar o responder con nueva información. A partir de ese momento, el backend continúa la conversación utilizando mensajes dinámicos, ya sea como respuestas generadas por la IA o como resultado de la lógica interna del sistema. Este comportamiento es especialmente relevante porque el sistema distingue entre mensajes de tipo `button` y mensajes de tipo `text`, lo que permite tratar de forma diferente una aceptación directa y una respuesta libre del usuario. 

**Figura 10.** Recursos de Azure Microsoft 

## _**3.7.4 Despliegue de la aplicación**_ 

Para este proyecto se ha decidido realizar el despliegue en Microsoft Azure. El proyecto está compuesto por dos componentes independientes. El proyecto principal encargado de gestionar las citas presenciales y la librería Duckling utilizada para interpretar el lenguaje natural del usuario y convertirlo en datos estructurados. Dado que ambos elementos forman parte esencial del funcionamiento de la aplicación, se ha optado por desplegarlos por separado dentro del mismo entorno Azure. 

Para organizar los recursos, se ha creado un grupo de recursos específico, como se puede ver en la Figura 10, donde se agrupan todos los servicios necesarios para el proyecto. Dentro de este grupo se encuentran los elementos destinados al despliegue del backend principal 

~~a~~ ese e 

Título del PFC 

Página 30 de 53 

Desarrollo del Caso de Estudio 

**Figura 11.** Propiedades de la aplicación web gestión de citas presenciales 

**Figura 12.** Plan de la gestion de citas presenciales 

## _3.7.4.1 El proyecto principal_ 

El proyecto principal contiene el App service llamado “gestión-citas presenciales” y el Plan de App Service llamado “gestión-citas-presenciales”. Como se puede observar en la Figura 11 podemos observar las propiedades del App Service de gestión de citas presenciales, el modelo de publicación es de tipo Código, la aplicación se va a ejecutar en el lenguaje de programación Node de versión 22 LTS, el dominio se ha elegido el que se ha propuesto por defecto, el sistema operativo es de tipo Linux y el tipo de plan del Hosting “gestión-citas-presenciales” que define la capacidad y características del entorno de ejecución, es el plan que se proporciona ya que es gratis por eso se ha elegido suficiente para las necesidades actuales de desarrollo y pruebas. Como se puede ver en la Figura 12, el plan elegido es el plan Basic B1, el cual está diseñado para aplicaciones con bajo o moderado tráfico que necesitan recursos dedicados, pero no requieren características avanzadas como escalado automático o administración avanzada del tráfico [19]. Las siguientes características del plan Basic B1: 

- 1 vCPU dedicada: A diferencia del plan gratuito, aquí la CPU no se comparte con otras aplicaciones. Esto signfica mayor estabilidad, tiempos de respuesta más predecibles y menos riesgo de throttling o pausas. 

- Memoria RAM: 1.75 GB de RAM, adecuada para APIs medianas, aplicaciones con carga moderada, servicios que requieren más memoria que el plan gratuito y contenedores Docker ligero o mediano. Comparado con el plan F1 (1 GB), este plan ofrece más margen para procesos simultáneos y cargas más pesadas. 

Título del PFC 

Página 31 de 53 

Desarrollo del Caso de Estudio 

- Almacenamiento remoto: 10 GB de almacenamiento, este espacio se utiliza para archivos temporales, logs, contenidos estáticos y configuración persistentes, esto es una mejora significativa respecto al plan gratuito 

- Recursos dedicados, es decir, la infraestructura no se comparte con otros clientes de Azure [20] 

- Soporte para certificados SSL/TLS para conexiones seguras HTTPS. 

- Adecuado para aplicaciones web y APIs con tráfico bajo o moderado 

- Coste: 0.018 USD por hora y 13.14 USD al mes, es un coste muy bajo para un entorno con recursos dedicados, SLA y capacidad de escalar. 

- Escalado: Hasta 3 instancias. El plan permite escalar horizontalmente la aplicación hasta 3 instancias manuales. Esto significa que puedes ejecutar en varios servidores a la vez para soportar más tráfico, mejorar la disponibilidad y repartir carga. No incluye escalado automático (eso llega en los planes Estándar y superiores), pero sí permite escalar manualmente. 

- SLA (Acuerdo de Nivel de Servicio): 99.95% de disponibilidad garantizada. Azure se compromete a que tu aplicación estará disponible prácticamente todo el tiempo. Esto es importante para aplicaciones en producción donde la disponibilidad es crítica. El plan gratuito no ofrece SLA, por lo que esta es mejora clave. 

**Figura 13.** Propiedades de la aplicación web Duckling 

## _3.7.4.2 Librería Duckling_ 

Utilizada para interpretar el lenguaje natural del usuario y convertirlo en datos estructurados. Este despliegue se encuentra dentro del grupo de recursos informados anteriormente, la librería Duckling, se ha desplegado como un servicio independiente dentro del mismo grupo de recursos, permitiendo que el 

Título del PFC 

Página 32 de 53 

Desarrollo del Caso de Estudio 

backend principal pueda comunicarse con ella mediante peticiones HTTP y obtener las interpretaciones del lenguaje natural necesarias para el procesamiento de citas. Las propiedades de la aplicación se pueden ver Figura 13 

Como se ha comentado en el apartado anterior, una de las propiedades de la aplicación web del proyecto es que se ha desplegado con el lenguaje de programación de Node, y el código de la librería Duckling está en el lenguaje de Hashkell, por lo tanto, el plan gratuito que proporciona Azure ofrece un limitado lenguajes de programación, entre ellos, no se encuentra el lenguaje de programación Hashkell,. 

El despliegue se ha hecho de una forma diferente, ya que el modelo de publicación de la aplicación web no es de tipo “Código” como el proyecto principal, sino que es de tipo “Contenedor”, entonces para crear la imagen del contenedor se ha utilizado Docker, para poder empaquetar la imagen. 

Ahora Azure ofrece otro tipo de planes porque con el gratuito no se puede desplegar el contenedor de Duckling. Entonces se va a comentar las características del plan B1. El plan B1 es el primer nivel de pago dentro de Azure App Service. Está pensado para aplicaciones que necesitan más estabilidad, recursos dedicados y disponibilidad garantizada, pero sin llegar al coste de los planes Standard o Premium. 

## _**3.7.5 Relación entre implementación y arquitectura**_ 

La implementación práctica de Meta, Duckling y el envío de mensajes confirma la coherencia de la arquitectura propuesta. Los clientes de integración encapsulan la dependencia respecto a servicios externos, mientras que las operaciones, gestores y servicios mantienen la lógica del negocio dentro del backend. 

Esta decisión permite conservar una separación clara entre: 

- Infraestructura de mensajería 

- Procesamiento temporal 

- Lógica conversacional 

- Persistencia 

En consecuencia, la solución resulta más mantenible y sencilla de ampliar en el futuro 

## **3.8 Decisiones de diseño adoptadas** 

La solución adoptada responde a varias decisiones orientadas a mejorar la claridad, la mantenibilidad y la capacidad de evolución del sistema. 

En primer lugar, se ha optado por una separación explícita entre entrada, coordinación, operaciones del flujo, gestores, servicios de negocio y clientes externos. Esta división permite comprender rápidamente qué parte del sistema se responsabiliza de cada tarea. 

En segundo lugar, se ha estructurado el flujo en torno a dos operaciones funcionales: iniciar conversación y procesar la respuesta. Esta decisión simplifica tanto la implementación como la explicación del comportamiento de la aplicación. 

En tercer lugar, se ha distinguido entre gestores del flujo y servicios de negocio. Los gestores resuelven tareas operativas transversales, como la administración del contexto conversacional, la reconstrucción de fechas o la preparación de mensajes, mientras que los servicios se centran en la lógica vinculada a entidades concretas y a la persistencia de las mismas. 

En cuarto lugar, se ha simplificado el modelo de datos para alinearlo con la lógica real del sistema. La entidad `Incidencia` pasa a ser la referencia principal del flujo, mientras que los mensajes y las fechas interpretadas se vinculan directamente a dicha incidencia. 

Por último, se ha buscado que la inteligencia artificial actúe como apoyo conversacional y no como sustituto de la lógica del negocio. Las decisiones sobre cuándo registrar una cita o cuándo continuar preguntando siguen perteneciendo a la aplicación. 

## **3.9 Consideraciones sobre la implementación**

Además de la arquitectura y el modelo de datos, el proyecto incorpora una serie de decisiones de implementación que resultan relevantes desde el punto de vista de la mantenibilidad y la claridad del código.

En primer lugar, el backend se organiza mediante clases con responsabilidades bien delimitadas. Los casos de uso recogen la secuencia principal de ejecución, los gestores agrupan tareas operativas transversales, los servicios encapsulan el acceso a datos y los clientes aíslan la comunicación con sistemas externos. Esta separación permite localizar con facilidad dónde se realiza cada tipo de tarea y reduce la complejidad de cada componente individual.

En segundo lugar, la solución utiliza entidades de dominio ligeras para representar la información principal del negocio. La clase `Incidencia` concentra los datos esenciales de la cita, mientras que los mensajes almacenan el contenido intercambiado con el usuario y la información temporal detectada en la conversación. Esta decisión favorece un código más legible y evita duplicar información en varias estructuras innecesarias.

En tercer lugar, el código contempla distintos niveles de validación. Por un lado, se verifica que exista una incidencia activa antes de iniciar el flujo de conversación. Por otro, se comprueba si la respuesta del usuario contiene información temporal suficiente para registrar una cita. Cuando la información es incompleta, el sistema mantiene la conversación abierta y solicita el dato restante en lugar de forzar una respuesta artificial.

En cuarto lugar, la implementación se apoya en dependencias externas como Meta, Duckling y OpenAI, pero el acceso a estos servicios queda centralizado a través de clientes específicos. Esto permite que el resto del sistema trabaje con una interfaz más estable y que los cambios en un proveedor concreto tengan un impacto limitado sobre el código interno.

Por último, se ha prestado atención a la consistencia terminológica del proyecto. Los nombres de clases, métodos y apartados de la memoria intentan reflejar con fidelidad el comportamiento real del sistema, de manera que la documentación y el código mantengan una relación coherente y comprensible para un lector externo.

Título del PFC 

Página 34 de 53 

Desarrollo del Caso de Estudio 

## Ca ítulo 4 Validación de la solución p 

Una vez implementada la solución propuesta, resulta necesario someterla a un proceso de validación que permita comprobar su correcto funcionamiento en escenarios representativos de uso real. La finalidad de este capítulo es verificar que el sistema desarrollado cumple con los objetivos definidos durante el diseño e implementación, y que responde de forma adecuada antes distintas situaciones que pueden producirse durante la gestión de citas presenciales a través de WhatsApp. 

La solución desarrollada no se limita únicamente al envío y recepción de mensajes, sino que integra varias responsabilidades dentro de un mismo flujo: la localización de incidencias activas, la búsqueda de fechas disponibles, la comunicación con el usuario, el procesamiento de respuestas en lenguaje natural la interpretación de información temporal y la actualización final de la cita en la base de datos. Debido a esta combinación de componentes, la validación debe contemplar tanto el comportamiento funcional del sistema como su capacidad para mantener una interacción coherente con el usuario. 

Para llevar a cabo esta validación se plantean varios casos de estudio que reflejan situaciones habituales dentro del contexto de uso de la aplicación. A través de ellos se analiza el comportamiento del sistema ante respuestas directas, mensajes incompletos, información repartida en varias intervenciones y situaciones en las que la propuesta inicial no es aceptada. De este modo, no solo se comprueba que el flujo ideal funciona correctamente, sino también que la solución es capaz de adaptarse a interacciones menos estructuradas, algo especialmente relevante en aplicaciones conversacionales. 

## **4.1 Criterios de validación** 

Con el fin de estandarizar el proceso de validación, se establecen una serie de criterios con los que evaluar los distintos casos de estudio expuestos a lo largo de este apartado. 

Estos criterios permiten valorar la solución implementada desde la siguiente perspectiva: por un lado, su rendimiento técnico y, por otro, su capacidad real para resolver el problema para el que ha sido diseñada. 

## _**4.1.1 Eficiencia**_ 

Este criterio se basa en medir el tiempo que tarda el sistema en completar las operaciones principales asociadas al flujo de gestión de una cita. En el contexto de este proyecto, la eficiencia no debe entenderse únicamente como rapidez computacional, sino también como reducción del esfuerzo operativo que sería necesario si el mismo proceso tuviera que realizarse manualmente. 

Las operaciones cuya eficiencia resulta más relevante son, principalmente dos. La primera es la generación y envío de una propuesta inicial de cita, que implica localizar una incidencia activa, buscar una fecha disponible y remitir el mensaje correspondiente al usuario, que incluye la recepción del mensaje, su almacenamiento, la interpretación de la información temporal contenida en él, en función del resultado, la actualización de la cita o la generación de un nuevo mensaje de sentimiento 

Título del PFC 

Página 35 de 53 

Desarrollo del Caso de Estudio 

La medición del tiempo puede realizarse desde que se activa la operación correspondiente hasta que el sistema completa su efecto final. En el caso del inicio de conversación, el proceso concluye cuando la propuesta ha sido generada y enviada. En el caso del procesamiento de respuestas, la operación termina cuando la cita queda registrada o cuando se emite la respuesta adicional solicitando la información que falta. 

Para valorar este criterio, se pueden tomar como referencia tiempos manuales equivalentes. Dichos tiempos representarían el esfuerzo que supondría para un operador humano revisar la incidencia, consultar disponibilidad, interpretar la respuesta del usuario y actualizar la cita en el sistema. A partir de esta comparación, el proceso podrá considerarse eficiente si mejora el tiempo manual de referencia, muy eficiente si reduce dicho tiempo al menos la mitad y altamente eficiente si lo rebaja a menos de una tercera parte. 

## _**4.1.2 Grado de cumplimiento**_ 

Este criterio hace referencia al nivel en que la solución alcanza los resultados funcionales esperados en cada caso de estudio. En otras palabras, no basta con que el sistema procese mensajes con rapidez, sino también debe hacerlo correctamente, recorriendo los pasos que le corresponden y alcanzando el estado final adecuado en función de la información recibida. 

Para poder medir este aspecto de forma ordenada, cada caso de estudio puede descomponerse en una serie de hitos funcionales. Algunos de estos hitos pueden ser, por ejemplo, detectar correctamente la incidencia activa, generar una fecha disponible válida almacenar el mensaje del usuario, interpretar el contenido temporal de su respuesta, conversar el contexto conversacional, generar una respuesta de seguimiento coherente o actualizar finalmente la cita en la base de datos. 

Una vez definidos los hitos esperados para cada caso, el grado de cumplimiento se obtiene mediante la relación entre el número de hitos alcanzados correctamente o actualizar finalmente la cita en la base de datos. 

Una vez definidos los hitos esperados para cada caso, el grado de cumplimiento se obtiene mediante la relación entre el número de hitos alcanzados correctamente y el total de hitos previstos. Este criterio permite valorar la calidad real del comportamiento del sistema y no solo su capacidad de ejecución técnica. 

## _**4.1.3 Robustez conversacional**_ 

Dado que la solución se apoya en una interacción en lenguaje natural con el usuario, resulta conveniente incorporar un criterio específico que valore la capacidad del sistema para desenvolverse en conversaciones que no siempre siguen una estructura rígida o previsible. 

En este proyecto, la robustez conversacional se relaciona con la capacidad del sistema para mantener el contexto entre mensajes, si interpreta correctamente respuestas parciales o corecciones posteriores y si solicita únicamente la información que falta sin obligar al usuario a repetir datos ya aportados. 

La robustez conversacional es especialmente importante en este proyecto, ya que el comportamiento real de los usuarios no siempre coincide con una secuencia ideal. El usuario puede aceptar directamente una propuesta, rechazarla, corregir solo una parte de la fecha, indicar primero el día y después la hora o 

Título del PFC 

Página 36 de 53 

Desarrollo del Caso de Estudio 

proponer valores que no cumplen las restricciones horarias. En consecuencia, la solución debe mostrar un comportamiento flexible y coherente ante estas situaciones. 

## _**4.1.4 Adecuación de las reglas de negocio**_ 

Además de interpretar correctamente los mensajes, el sistema debe respetar las restricciones funcionales definidas para la asignación de citas. En este proyecto, las principales restricciones son que las citas pueden programarse dentro del horario comprendido entre las 8:00 y las 20:00, y que no deben situarse en fin de semana. Este criterio permite comprobar que la solución no se limita a extraer fechas del lenguaje natural, sino que además valida que dichas fechas sean coherentes con las condiciones operativas del servicio 

## **4.2 Caso de estudio 1: Aceptación de la propuesta inicial** 

El primer caso de estudio corresponde al escenario más simple y favorable para el sistema. En él, la aplicación genera una propuesta de cita y el usuario la acepta directamente sin necesidad de modificarla ni aportar información adicional. 

## _**4.2.1 Definición**_ 

El proceso comienza cuando el sistema detecta una incidencia activa pendiente de gestión. A partir de dicha incidencia, se ejecuta la lógica encargada de buscar una fecha disponible dentro del rango permitido. Una vez localizada una franja válida, la aplicación genera una propuesta inicial y la envía al usuario a través de WhatsApp. 

En este escenario, el usuario responde afirmativamente a la propuesta recibida. Como consecuencia, el sistema interpreta la respuesta como una aceptación directa y procede a actualizar la cita de la incidencia con la fecha previamente sugerida. El flujo concluye sin necesidad de nuevas interacciones. 

En este caso permite validar el comportamiento base del sistema y comprobar la correcta integración entre la búsqueda de disponibilidad, la mensajería saliente, la recepción de respuestas y la actualización final de la base de datos 

## _**4.2.2 Ejecución**_ 

Para ejecutar este caso, se parte de una incidencia activa asociada a un usuario con número de teléfono válido. Se activa el proceso de inicio de conversación, que recupera la incidencia, consulta las fechas ocupadas y selecciona una nueva franja disponible. Posteriormente, el sistema envía la propuesta inicial al usuario. 

A continuación, se simula la recepción de una respuesta afirmativa. El sistema registra el mensaje entrante, lo asocia a la incidencia correspondiente e interpreta que la propuesta ha sido aceptada. Finalmente, actualiza la cita y concluye el flujo 

## _**4.2.3 Resultados**_ 

El resultado esperado es que el sistema complete correctamente el flujo principal sin necesidad de intervención manual adicional. Para ello, debe localizar la incidencia activa, generar una fecha válida, 

Título del PFC 

Página 37 de 53 

Desarrollo del Caso de Estudio 

enviar el mensaje inicial, registrar la respuesta del usuario e interpretar correctamente que se trata de una aceptación. Si todo ello ocurre de forma correcta, la cita queda actualizada en la base de datos y el caso puede darse por resuelto. 

## **4.3 Caso de estudio 2: respuesta con información incompleta** 

El segundo caso de estudio se centra en una situación en la que el usuario no acepta directamente la propuesta inicial, sino que proporciona solo una parte de la información necesaria para fijar la cita. 

## _**4.3.1 Definición**_ 

En este escenario, el sistema envía una propuesta inicial al usuario y este responde indicando solo una referencia temporal parcial, como por ejemplo un día concreto sin especificar la hora. La solución debe detectar que la información recibida todavía no es suficiente para formalizar una cita completa. 

En lugar de cerrar el proceso o generar un error, la aplicación debe registrar el mensaje, conservar la parte válida de la información aportada y continuar la conversación solicitando únicamente el dato que falta. Este caso valida la capacidad del sistema para gestionar respuestas incompletas manteniendo una interacción coherente. 

## _**4.3.2 Ejecución**_ 

La ejecución comienza con el envío de la propuesta inicial por parte del sistema. Después, el usuario responde con un mensaje que contiene únicamente el día deseado. El sistema guarda el mensaje, intenta reconstruir la fecha y comprueba que todavía falta la hora. 

A partir de esta situación, la aplicación genera una respuesta de seguimiento solicitando el dato pendiente y la envía al usuario. El flujo permanece abierto hasta que se complete la información 

## _**4.3.3 Resultados**_ 

Se considera que el caso ha sido resuelto correctamente cuando el sistema conversa el dato parcial recibido y solicita solo la información que falta, sin perder el contexto ni exigir al usuario que repita la fecha completa desde el principio. Este resultado demuestra una gestión adecuada del estado conversacional y una correcta coordinación entre los módulos de almacenamiento, interpretación temporal y generación de respuestas. 

Título del PFC 

Página 38 de 53 

Desarrollo del Caso de Estudio 

## **4.4 Caso de estudio 3: reconstrucción de la fecha a partir de varios mensajes** 

El tercer caso de estudio profundiza en una situación habitual en sistemas de mensajería: la información necesaria para completar la cita se distribuye en varios mensajes consecutivos. 

## _**4.4.1 Definición**_ 

En este escenario, el usuario comunica una parte de la fecha en un primer mensaje y el resto en una intervención posterior. Por ejemplo, puede indicar primero el día y después la hora. El sistema debe ser capaz de almacenar ambos mensajes, relacionarlos con la misma incidencia y reconstruir una fecha final completa a partir de la información recibida. 

Este caso resuelto especialmente relevante porque permite comprobar que el sistema no trata los mensajes como elementos aislados, sino como partes de una misma conversación con continuidad contextual. 

## _**4.4.2 Ejecución**_ 

Se parte de una conversación activa con el usuario. En un primer momento, este proporciona solo una parte de la fecha. El sistema registra el mensaje, intenta resolver la cita y detecta que todavía no es posible. Posteriormente, el usuario aporta el dato restante. El sistema vuelve a registrar el mensaje, recupera el historial conversacional y combina la información de ambas intervenciones. 

Una vez reconstruida una fecha completa, la aplicación actualiza la cita asociada a la incidencia y cierra el flujo. 

## _**4.4.3 Resultados**_ 

El caso se considera satisfactorio cuando el sistema consigue mantener el contexto entre mesnajes y combinar correctamente la información distribuida en varios mensajes. Este comportamiento demuestra que la solución puede adaptarse a una interacción más natural, en la que el usuario no siempre proporciona todos los datos de una sola vez. 

## **4.5 Caso de estudio 4: Rechazo de la propuesta inicial y continuación del flujo** 

El cuarto caso de estudio analiza la capacidad del sistema para continuar la conversación cuando el usuario no acepta la propuesta inicialmente ofrecida. 

## _**4.5.1 Definición**_ 

En esta situación, el sistema propone una cita, pero el usuario responde negativamente. A partir de ese momento, la solución no debe cerrar el flujo ni registrar una fecha inválida. Por el contrario, debe mantener la conversación abierta y permitir que el usuario proponga una nueva disponibilidad. 

Este caso es importante porque refleja una situación muy probable en un contexto real, donde no siempre la primera propuesta coincide con la disponibilidad del usuario. 

Título del PFC 

Página 39 de 53 

Desarrollo del Caso de Estudio 

## _**4.5.2 Ejecución**_ 

Tras el envío de la propuesta inicial, se procesa una respuesta negativa. El sistema registra, la interpreta como rechazo de la propuesta anterior y continúa el intercambio conversacional. En mensajes posteriores, el usaurio aporta una nueva alternativa temporal, ya sea completa o parcial. La aplicación almacena nuevas respuestas, reconstruye la cita si es posible y actualiza finalmente la incidencia cuando dispone de una fecha válida. 

## _**4.5.3 Resultados**_ 

El resultado esperado es que la negativa inicial no interrumpa el flujo y que el sistema reconduzca la conversación hasta la obtención de una nueva cita válida. Este comportamiento confirma que la solución puede adaptarse a cambios en la interacción sin perder coherencia ni control del estado conversacional. 

## **4.6 Validación mediante casos de uso conversacionales** 

Además de los casos de estudio generales presentados anteriormente, se han considerado distintos casos de uso conversacionales específicos con el objetivo de validar situaciones reales de interacción con el sistema. Estas pruebas permiten comprobar no solo que la aplicación funciona con el flujo principal, sino también que interpreta adecuadamente correcciones, cambios parciales y restricciones del dominio. En cada caso, la respuesta del sistema debe ser coherente con el estado de la incidencia, mantener la continuidad del diálogo y devolver al usuario un mensaje claro sobre el siguiente paso del proceso. 

## _**4.6.1 Caso de uso 1: modificación de la hora manteniendo el mismo día**_ 

En este caso, el usuario proporciona primero una fecha completa y, a continuación, corrige únicamente la hora: 

- Quiero una cita el 12 de agosto a las 11:00 

- No, perdona, mejor a las 9 de la mañana 

El sistema debe interpretar que el segundo mensaje modifica solo la hora y que el día indicado en el primer mensaje sigue siendo válido. En consecuencia, la cita final debe quedar fijada para el 12 de agosto a las 9:00. 

Este caso valida la capacidad del sistema para conversar parte de la información previa y permitir correcciones parciales sin necesidad de reiniciar la conversación. 

En WhatsApp, el sistema debe responder reconociendo la corrección y manteniendo el contexto de la cita previamente indicada. En la base de datos debe almacenarse el nuevo mensaje asociado a la misma incidencia y conservarse la fecha interpretada resultante en el mensaje correspondiente, de forma que el historial refleje tanto la propuesta inicial como la modificación posterior.

## _**4.6.2 Caso de uso 2: modificación del día manteniendo la hora previa**_ 

En este escenario, el usuario corrige el día, pero no menciona de nuevo la hora: 

- Quiero una cita el 12 de agosto a las 3 de la tarde. 

- No, perdona, mejor el día 13 de agosto. 

La solución debe interpretar que la hora indicada en el primer mensaje continúa siendo válida y que únicamente debe modificarse el día. El resultado esperado es, por tanto, una cita para el 13 de agosto a las 15:00. 

Este caso demuestra que el sistema es capaz de reconstruir una nueva fecha a partir de una corrección parcial sin obligar al usuario a repetir información ya proporcionada. 

En WhatsApp, la respuesta esperada es una confirmación de la nueva fecha calculada a partir del día corregido, manteniendo la hora previa como referencia. En MongoDB debe quedar registrado el mensaje de corrección vinculado a la incidencia, junto con la fecha interpretada resultante y la actualización coherente del estado de la cita si el flujo ya la considera válida.

Título del PFC 

Página 40 de 53 

Desarrollo del Caso de Estudio 

## _**4.6.3 Caso de uso 3: petición incompleta y solicitud del dato faltante**_ 

Otro caso validado corresponde a una petición inicialmente incompleta por parte del usuario: 

Quiero una cita el 12 de agosto 

En esta situación, el sistema debe detectar que se dispone el día, pero no de la hora. En lugar de asumir una hora por defecto o de considerar la petición inválida, debe continuar la conversación con una pregunta de seguimiento, por ejemplo: 

- Me podrías indicar también la hora? 

Si el usuario responde después: 

Sí, a las 3 de la tarde. 

El sistema debe combinar ambos mensajes y reconstruir una cita válida para el 12 de agosto a las 

15:00. 

Este caso valida la capacidad de la solución para tratar entradas parciales y completar progresivamente la información necesaria. 

En WhatsApp, el sistema debe devolver una pregunta de seguimiento solicitando la información que falta, en este caso la hora. En la base de datos debe conservarse el primer mensaje del usuario, dejando constancia de la información parcial detectada; cuando llegue la segunda respuesta, ambos mensajes quedarán asociados a la misma incidencia y la fecha completa podrá reconstruirse a partir de la conversación.

## _**4.6.4 Caso de uso 4: Validación del horario permitido**_ 

Además de interpretar correctamente el contenido conversacional, la solución debe aplicar las reglas de negocio relacionadas con la disponibilidad temporal. En este proyecto, las citas únicamente pueden fijarse dentro del horario comprendido entre las 08:00 y las 20:00 

Por tanto, el sistema debe validar que cualquier cita reconstruida o propuesta se sitúe dentro de dicho intervalo. Si el usuario solicita una hora fuera de ese rango, la aplicación debe detectarlo y responder adecuadamente, indicando que la hora propuesta no es válida o solicitando una nueva alternativa compatible. 

Este caso permite comprobar que la lógica de negocio se aplica de forma efectriva sobre la información temporal extraída de la conversación. 

En WhatsApp, el sistema debe rechazar la propuesta fuera del horario permitido e indicar al usuario que debe elegir otra franja válida. En la base de datos debe guardarse el intento, pero la incidencia no debe quedar cerrada ni registrar una fecha definitiva si la hora propuesta no cumple las restricciones operativas.

## _**4.6.5 Caso de uso 5: exclusión de fines de semana**_ 

Otra regla de negocio relevante es la exclusión de sábados y domingos como días válidos para la asignación de citas. Aunque el usuario exprese correctamente una fecha completa, el sistema no debe aceptar ni generar citas que recaigan en fin de semana. 

La validación de este caso permite confirmar que la solución no solo interpreta fechas desde el punto de vista lingüístico, sino que además filtra aquellas que incumplen las condiciones operativas definidas por el sistema. 

En WhatsApp, el sistema debe informar de que los fines de semana no están disponibles para citas y pedir una nueva fecha. En MongoDB debe conservarse el mensaje recibido y la fecha detectada, si existe, pero sin actualizar la incidencia con una cita definitiva al tratarse de un día no permitido.

## _**4.6.6 Caso de uso 6: propuesta de una fecha ya reservada**_

En este caso, el usuario propone una fecha y una hora que ya se encuentran ocupadas por otra cita registrada en el sistema. La conversación puede presentarse de la siguiente forma:

- Quiero una cita el 14 de agosto a las 10:00

El sistema debe interpretar la fecha solicitada y comprobar su disponibilidad antes de confirmarla. Si la fecha ya está reservada, la aplicación no debe asignarla como cita definitiva. En su lugar, debe informar al usuario de que ese horario no está disponible y solicitar una nueva propuesta compatible con la agenda.

La respuesta esperada del sistema en esta situación debe ser clara y operativa, por ejemplo:

- Lo siento, esa fecha ya no está disponible. ¿Podrías indicarme otra fecha u hora para tu cita?

Este caso de uso valida la capacidad de la solución para contrastar la intención del usuario con el estado real de la agenda, evitando solapamientos y garantizando la consistencia de las citas almacenadas.

En WhatsApp, la respuesta debe dejar claro que el hueco solicitado ya está ocupado y solicitar una alternativa distinta. En la base de datos se registra el mensaje del usuario y la fecha propuesta, pero no debe asignarse como cita confirmada mientras esa franja siga ocupada por otra incidencia.

## **4.7 Análisis de los resultados** 

El análisis conjunto de los casos de uso de estudio conversacionales permite extraer una valoración global del comportamiento de la solución desarrollada. En primer lugar, puede afirmarse que la validación 

Título del PFC 

Página 41 de 53 

Desarrollo del Caso de Estudio 

cubre tanto el flujo ideal de funcionamiento como diferentes escenarios alternativos que reflejan interacciones plausibles en un contexto real de uso. 

Desde el punto de vista de la eficiencia, la solución ofrece una mejora clara frente a una gestión manual del mismo proceso. Automatizar la detección de incidencias activas, la búsqueda de disponibilidad, el envío de propuestas y el procesamiento de respuestas reduce de forma notable el tiempo operativo necesario y evita tareas repetitivas de bajo valor añadido. Esta mejora no solo beneficia la rapidez individual de cada conversación, sino también la capacidad del sistema para atender múltiples interacciones de forma simultánea. 

En cuanto al grado de cumplimiento, los casos analizados permiten comprobar si la solución ejecuta correctamente las funciones esperadas en cada situación. No se evalúa únicamente si el sistema responde, sino si responde del modo adecuado en función del estado conversacional, de la información aportada por el usuario y de las restricciones definidas por el dominio. 

Por otra parte, la robustez conversacional constituye uno de los aspectos más relevantes del proyecto. La posibilidad de conversar el contexto, combinar información procedente de distintos mensajes, interpretar correcciones parciales y pedir solo los datos que faltan demuestra que la solución no se limita a procesar mensajes aislados, sino que gestiona conversaciones con continuidad lógica. 

Finalmente, la validación de las reglas de negocio, como el horario permitido entre las 08:00 y las 20:00 y la exclusión de fines de semana, confirma que la aplicación no solo entiende el lenguaje natural, sino que además filtra y valida las citas conforma a las condiciones reales de funcionamiento del servicio. En conjunto, los resultados obtenidos permiten concluir que la solución desarrollada constituye una base sólida para la automatización de la gestión de citas presenciales mediante WhatsApp. El sistema integra correctamente la persistencia de datos, la lógica conversacional, la interpretación de fechas y validación de restricciones operativas, ofreciendo un comportamiento cohertente, flexible y funcionalmete adecuado para un entorno real. 

Título del PFC 

Página 42 de 53 

Desarrollo del Caso de Estudio 

## Desarrollo del Caso de Estudio 

En este capítulo blablablá https://help.openai.com/es-419/articles/4936856-what-are-tokens-and-how-to-countthem 

## **4.8 Especificación de Requisitos** 

Título del PFC 

Página 43 de 53 

**Conclusiones y Futuros Trabajos** 

## Capítulo 5 Conclusiones Traba os Futuros y j 

En este capítulo blablabla 

Título del PFC 

Página 44 de 53 

**Conclusiones y Futuros Trabajos** 

## **5.1 Análisis de la consecución de objetivos** 

Al comenzar este proyecto fin de carrera se fijó como objetivo 0… 

Aquí se debe hacer un análisis de la consecución de objetivos y las conclusiones a las que se llega 

A nivel personal, este proyecto me ha aportado …. 

## **5.2 Estimación de esfuerzos** 

Para realizar un correcto desarrollo de un proyecto es imprescindible hacer una buena planificación de las tareas a realizar, establecer un orden cronológico y asignar una duración a cada una de ellas. 

Aunque esta planificación y sus estimaciones no sean del todo ajustadas, hacerla inicialmente tiene diferentes ventajas, entre las que se pueden destacar: 

- Asegurar el proceso de desarrollo, estableciendo los recursos y el tiempo necesario para su finalización. 

- Establecer plazos de tiempo fiables para cada una de las fases del proyecto. 

- Controlar el proceso e identificar desviaciones y retardos en las fechas de entrega. 

- Facilitar la toma de decisiones. 

Para planificar el proyecto, se dividió en varias etapas que se han ido desarrollando de manera secuencial (ver sección 1.4). Hay que tener en cuenta que la carga lectiva de un proyecto fin de carrera es de 15 créditos, que en términos de tiempo, equivale a 600 horas de trabajo (40 horas por crédito). Para el cómputo total de horas dedicadas al proyecto en la planificación inicial, se consideró una media aproximada de 4 horas por día contabilizado. Inicialmente se estableció como fecha de comienzo el día 7 de noviembre y como fecha límite para la entrega el último día de junio. 

Antes de comenzar con el desarrollo del proyecto se construyó una Estructura de Descomposición del Trabajo (EDT) para identificar mejor las tareas a llevar a cabo en él. Dicha estructura se muestra en la 

**==> picture [424 x 229] intentionally omitted <==**

**----- Start of picture text -----**<br>
:<br>Módulo de M2DAT-DB para el modelado<br>de BDs objeto -relacionales en SQL :2003<br>(búsqueda bibliográfica inicial)Estudios previos Revisión bibliográfica Desarrollo del módulo OR de SQL:2003 Casos de estudio Terminación dela memoria<br>Conceptos  MIDAS y  DSL para el modelado de  Transformación  Casos de estudio  Casos de estudio<br>teóricos M2DAT BDORs en SQL:2003 de modelos generales de jerarquías<br>Sintaxis  Sintaxis  Validación de  Reglas de  Decisiones de<br>abstracta concreta modelos transformación diseño<br>Búsqueda bibliográfica  Definición del  Construcción del  Personalización  Búsqueda  Implementación  Búsqueda  Reglas de  Búsqueda  Definición del  Integración de<br>sobre Eclipse, EMF y  metamodelo de  editor gráfico  del editor  bibliográfica sobre  de restricciones  bibliográfica  transformación  bibliográfica  metamodelo de  decisiones en<br>SQL:2003 SQL:2003 con EMF gráfico  OCL y Epsilon en EVL sobre ATL ATL sobre AMW anotación las reglas ATL<br>Soo<br>Figura 14. EDT del Proyecto blablblab<br>**----- End of picture text -----**<br>


Título del PFC 

Página 45 de 53 

**Conclusiones y Futuros Trabajos** 

## **5.3 Futuros Trabajos** 

Una vez finalizado el presente proyecto fin de carrera, se puede considerar una serie de mejoras y ampliaciones sobre el trabajo desarrollado. 

> ~~[ee]~~ Aquí se debe contar qué cosas se podrían mejorar y cómo. 

Título del PFC 

Página 46 de 53 

Bibliografía y Lugares de Internet 

## Capítulo 6 Biblio rafía Lu ares de Internet g y g 

En este capítulo blablablá 

## **1. Bibliografía** 

- [1]  Meta, «About the WhatsApp Business Platform,» 2024. [En línea]. Available: https://developers.facebook.com/documentation/businessmessaging/whatsapp/about-the-platform. 

- [2]  I. Meta Platforms, «Business Messaging – WhatsApp Templates Overview,» Meta Platforms, Inc, [En línea]. Available: 

   - https://developers.facebook.com/documentation/businessmessaging/whatsapp/templates/overview. [Último acceso: 4 Abril 2026]. 

- [3]  I. Meta Platforms, «Business Messaging – WhatsApp Get Started,» Meta Platforms, Inc, [En línea]. Available: https://developers.facebook.com/documentation/businessmessaging/whatsapp/get-started. [Último acceso: 4 Abril 2026]. 

- [4]  I. Meta Platforms, «Business Messaging – WhatsApp Policy Enforcement,» Meta for Developers, [En línea]. Available: https://developers.facebook.com/documentation/businessmessaging/whatsapp/policy-enforcement. [Último acceso: 5 Abril 2026]. 

- [5]  P. González, «Qué es la API de WhatsApp y cómo usarla en tu negocio,» Brevo, 17 Abril 2025. [En línea]. Available: https://www.brevo.com/es/blog/apiwhatsapp-business/. [Último acceso: 5 Abril 2026]. 

- [6]  I. MongoDB, «MongoDB Documentation,» MongoDB, Inc, 2026. [En línea]. Available: https://www.mongodb.com/es/docs/. [Último acceso: 10 Marzo 2026]. 

- [7]  I. MongoDB, «MongoDB Node.js Driver Documentation,» MongoDB, Inc, 2026. [En línea]. Available: https://www.mongodb.com/es/docs/drivers/node/current/. [Último acceso: 10 Marzo 2026]. 

- [8]  OpenAI, «Conceptos clave a comprender al trabajar con la API de OpenAI,» OpenAI, 2026. [En línea]. Available: https://developers.openai.com/api/docs/concepts. [Último acceso: 10 marzo 2026]. 

- [9]  OpenAI, «OpenAI API Reference,» OpenAI, 2026. [En línea]. Available: https://developers.openai.com/api/reference/overview. [Último acceso: 11 Marzo 2026]. 

Título del PFC 

Página 47 de 53 

Bibliografía y Lugares de Internet 

- [10] OpenAI, «¿Qué son los tokens y cómo contarlos?,» OpenAI Help Center, 2026. [En línea]. Available: https://help.openai.com/es-419/articles/4936856-what-aretokens-and-how-to-count-them. [Último acceso: 26 marzo 2026]. 

- [11] OpenAI, «GPT-5.4 nano Model,» OpenAI Developers, 2026. [En línea]. Available: https://developers.openai.com/api/docs/models/gpt-5.4-nano. [Último acceso: 26 Marzo 2026]. 

- [12] D. Bergmann, «¿Qué es una ventana de contexto?,» IBM, 2026. [En línea]. Available: https://www.ibm.com/es-es/think/topics/context-window. [Último acceso: 27 Marzo 2026]. 

- [13] Repsol, «Qué es un prompt: para qué sirve y ejemplos,» Repsol S.A., 25 Noviembre 2025. [En línea]. Available: https://www.repsol.com/es/energiaavanzar/innovacion/que-es-un-prompt/index.cshtml. [Último acceso: 27 Marzo 2026]. 

- [14] I. Facebook / Meta Platforms, «Duckling,» Meta Platforms, Inc, [En línea]. Available: https://github.com/facebook/duckling. [Último acceso: 5 Abril 2026]. 

- [15] Microsoft, «¿Qué hace Azure?,» Microsoft, [En línea]. Available: https://azure.microsoft.com/es-es/resources/cloud-computing-dictionary/what-isazure. [Último acceso: 7 Abril 2026]. 

- [16] Microsoft, «Azure portal documentation,» Microsoft, [En línea]. Available: https://learn.microsoft.com/en-us/azure/azure-portal/. [Último acceso: 7 Abril 2026]. 

- [17] Microsoft, «Azure Monitor overview,» Microsoft, 24 Febrero 2026. [En línea]. Available: https://learn.microsoft.com/en-us/azure/azuremonitor/fundamentals/overview. [Último acceso: 7 Abril 2026]. 

- [18] Microsoft, «Uso del portal de Azure y Azure Resource Manager para administrar grupos de recursos,» Microsoft, 06 Marzo 2026. [En línea]. Available: https://learn.microsoft.com/es-es/azure/azure-resourcemanager/management/manage-resource-groups-portal. [Último acceso: 7 Abril 2026]. 

- [19] M. Azure, «Precios de Azure App Service,» 10 06 2026. [En línea]. Available: https://azure.microsoft.com/en-us/pricing/details/app-service/windows/. 

- [20] F. OpenJS, «About Node.js,» Fundación OpenJS, 2026. [En línea]. Available: https://nodejs.org/en/about. [Último acceso: 10 Marzo 2026]. 

- [21] U. Revista, «¿Qué es un LLM o Large Language Model en IA?,» Universidad Internacional de La Rioja, 2026. [En línea]. Available: https://www.unir.net/revista/ingenieria/que-es-un-llm/. [Último acceso: 30 Marzo 2026]. 

- [22] M. Azure, «¿Qué son los modelos de lenguaje grandes (LLM)?,» Microsoft Corporation, [En línea]. Available: https://azure.microsoft.com/eses/resources/cloud-computing-dictionary/what-are-large-language-models-llms. [Último acceso: 30 Marzo 2026]. 

Título del PFC 

Página 48 de 53 

Bibliografía y Lugares de Internet 

## **6.1 Bibliografía** 

Atzeni, P., Ceri, S., Paraboschi, S. y Torlone R., _Database Systems. Concepts, Languages and Architectures._ McGrawHill, 1999. 

Chen, P.P. _The Entity-Relationship Model – Toward a Unified View of Data_ . ACM Transactions on Database Systems, Vol. 1, No. 1. Marzo 1976, pp. 9-36, 1976. 

- OMG. _MDA Guide Version 1.0._ Document number omg/2003-05-01. Ed.: Miller, J. y Mukerji, J.http://www.omg.com/mda, 2003. 

Bibliografía 

- [1] 

- [1]  Meta, «About the WhatsApp Business Platform,» 2024. [En línea]. Available: https://developers.facebook.com/documentation/businessmessaging/whatsapp/about-the-platform. 

- [2]  I. Meta Platforms, «Business Messaging – WhatsApp Templates Overview,» Meta Platforms, Inc, [En línea]. Available: 

   - https://developers.facebook.com/documentation/businessmessaging/whatsapp/templates/overview. [Último acceso: 4 Abril 2026]. 

- [3]  I. Meta Platforms, «Business Messaging – WhatsApp Get Started,» Meta Platforms, Inc, [En línea]. Available: https://developers.facebook.com/documentation/businessmessaging/whatsapp/get-started. [Último acceso: 4 Abril 2026]. 

- [4]  I. Meta Platforms, «Business Messaging – WhatsApp Policy Enforcement,» Meta for Developers, [En línea]. Available: 

   - https://developers.facebook.com/documentation/businessmessaging/whatsapp/policy-enforcement. [Último acceso: 5 Abril 2026]. 

- [5]  P. González, «Qué es la API de WhatsApp y cómo usarla en tu negocio,» Brevo, 17 Abril 2025. [En línea]. Available: https://www.brevo.com/es/blog/apiwhatsapp-business/. [Último acceso: 5 Abril 2026]. 

- [6]  I. MongoDB, «MongoDB Documentation,» MongoDB, Inc, 2026. [En línea]. Available: https://www.mongodb.com/es/docs/. [Último acceso: 10 Marzo 2026]. 

- [7]  I. MongoDB, «MongoDB Node.js Driver Documentation,» MongoDB, Inc, 2026. [En línea]. Available: https://www.mongodb.com/es/docs/drivers/node/current/. [Último acceso: 10 Marzo 2026]. 

- [8]  OpenAI, «Conceptos clave a comprender al trabajar con la API de OpenAI,» OpenAI, 2026. [En línea]. Available: https://developers.openai.com/api/docs/concepts. [Último acceso: 10 marzo 2026]. 

- [9]  OpenAI, «OpenAI API Reference,» OpenAI, 2026. [En línea]. Available: https://developers.openai.com/api/reference/overview. [Último acceso: 11 Marzo 2026]. 

- [10] OpenAI, «¿Qué son los tokens y cómo contarlos?,» OpenAI Help Center, 2026. [En línea]. Available: https://help.openai.com/es-419/articles/4936856-what-aretokens-and-how-to-count-them. [Último acceso: 26 marzo 2026]. 

- [11] OpenAI, «GPT-5.4 nano Model,» OpenAI Developers, 2026. [En línea]. Available: https://developers.openai.com/api/docs/models/gpt-5.4-nano. [Último acceso: 26 Marzo 2026]. 

- [12] D. Bergmann, «¿Qué es una ventana de contexto?,» IBM, 2026. [En línea]. Available: https://www.ibm.com/es-es/think/topics/context-window. [Último acceso: 27 Marzo 2026]. 

Título del PFC 

Página 49 de 53 

Bibliografía y Lugares de Internet 

- [13] Repsol, «Qué es un prompt: para qué sirve y ejemplos,» Repsol S.A., 25 Noviembre 2025. [En línea]. Available: https://www.repsol.com/es/energiaavanzar/innovacion/que-es-un-prompt/index.cshtml. [Último acceso: 27 Marzo 2026]. 

- [14] I. Facebook / Meta Platforms, «Duckling,» Meta Platforms, Inc, [En línea]. Available: https://github.com/facebook/duckling. [Último acceso: 5 Abril 2026]. 

- [15] Microsoft, «¿Qué hace Azure?,» Microsoft, [En línea]. Available: https://azure.microsoft.com/es-es/resources/cloud-computing-dictionary/what-isazure. [Último acceso: 7 Abril 2026]. 

- [16] Microsoft, «Azure portal documentation,» Microsoft, [En línea]. Available: https://learn.microsoft.com/en-us/azure/azure-portal/. [Último acceso: 7 Abril 2026]. 

- [17] Microsoft, «Azure Monitor overview,» Microsoft, 24 Febrero 2026. [En línea]. Available: https://learn.microsoft.com/en-us/azure/azuremonitor/fundamentals/overview. [Último acceso: 7 Abril 2026]. 

- [18] Microsoft, «Uso del portal de Azure y Azure Resource Manager para administrar grupos de recursos,» Microsoft, 06 Marzo 2026. [En línea]. Available: https://learn.microsoft.com/es-es/azure/azure-resourcemanager/management/manage-resource-groups-portal. [Último acceso: 7 Abril 2026]. 

- [19] M. Azure, «Precios de Azure App Service,» 10 06 2026. [En línea]. Available: https://azure.microsoft.com/en-us/pricing/details/app-service/windows/. 

- [20] F. OpenJS, «About Node.js,» Fundación OpenJS, 2026. [En línea]. Available: https://nodejs.org/en/about. [Último acceso: 10 Marzo 2026]. 

- [21] U. Revista, «¿Qué es un LLM o Large Language Model en IA?,» Universidad Internacional de La Rioja, 2026. [En línea]. Available: https://www.unir.net/revista/ingenieria/que-es-un-llm/. [Último acceso: 30 Marzo 2026]. 

- [22] M. Azure, «¿Qué son los modelos de lenguaje grandes (LLM)?,» Microsoft Corporation, [En línea]. Available: https://azure.microsoft.com/eses/resources/cloud-computing-dictionary/what-are-large-language-models-llms. [Último acceso: 30 Marzo 2026]. 

Título del PFC 

Página 50 de 53 

Bibliografía y Lugares de Internet 

## **6.2 Lugares de Internet** 

Purdue Online Writing Art. (n.d.). APA Formatting and Style Guide. Recuperado Noviembre 15, 2017, desde https://owl.purdue.edu/owl/research_and_citation/apa_style/apa_formatting_and_style_guide/general_form at.html. 

University of Waikato (2019). APA Referencing. Recuperado Noviembre 15, 2017, desde - - https://www.waikato.ac.nz/__data/assets/pdf_file/0014/236120/apa quick guide.pdf 

Título del PFC 

Página 51 de 53 

**Apéndices** 

## Capítulo 7 A éndices p 

En este capítulo blabalbl 

Título del PFC 

Página 52 de 53 

**Apéndices** 

## **7.1 Apéndice I: Tabla de Siglas** 

**SIGLAS DESCRIPCIÓN** AST Abstract Syntax Tree ATL ATLAS Transformation Language 

Título del PFC 

Página 53 de 53 
