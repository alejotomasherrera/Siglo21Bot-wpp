const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");

const flowPrincipal = addKeyword(["volver"])
  .addAnswer([
    "¿Cómo podemos ayudarte?",
    "",
    "1. Ayuda con productos 🛒",
    "2. Entrega/envío 🚚",
    "3. Medios de pago 💳",
    "4. Asesoramiento 🤝",
    "5. Contacto y ubicación 📞🗺️",
    "6. Contactar agente 📞👤",
    "7. Finalizar chat 📝👋",
  ])
  .addAnswer("¡Indica el número de opción! ⌨️");

module.exports = flowPrincipal;