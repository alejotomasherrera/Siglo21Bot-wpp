const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");

const flowPrincipal = addKeyword([EVENTS.WELCOME])
  .addAnswer(
    "¡Hola! 👋 Somos *Siglo 21 Máquinas y Herramientas*🛠️🌱",
    "Expertos en productos de fuerza, jardinería, construcción y más. Mi nombre es Don Carlos ¿En qué puedo ayudarte? 🛒🚚💳"
  )
  .addAnswer([
    "¿Cómo podemos ayudarte?",
    "",
    "1. Ayuda con productos 🛒",
    "2. Metodos de envio y entrega 🚚",
    "3. Medios de pago 💳",
    "4. Asesoramiento 🤝",
    "5. Contacto y ubicación 📞🗺️",
    "6. Contactar agente 📞👤",
    "7. Finalizar chat 📝👋",
  ])
  .addAnswer("¡Indica el número de opción! ⌨️");

module.exports = flowPrincipal;