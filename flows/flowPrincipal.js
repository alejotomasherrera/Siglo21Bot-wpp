const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");

const flowPrincipal = addKeyword(EVENTS.WELCOME)
  .addAnswer(
    "¡Hola! 👋 Somos *Siglo 21 Máquinas y Herramientas* 🛠️🌱",
    "Expertos en productos de fuerza, jardinería, construcción y más. ¿En qué puedo ayudarte? 🛒🚚💳"
  )
  .addAnswer([
    "¿Cómo podemos ayudarte?",
    "",
    "1. Ver estado reparación 🛠️",
    "2. Ayuda con productos 🛒",
    "3. Entrega/envío 🚚",
    "4. Garantías 🔒",
    "5. Medios de pago 💳",
    "6. Asesoramiento 🤝",
    "7. Contacto y ubicación 📞🗺️",
    "8. Promociones 🎉",
    "9. Contactar agente 📞👤",
    "10. Finalizar chat 📝👋",
    // Cotizaciones
  ])
  .addAnswer("¡Indica el número de opción! ⌨️");

module.exports = flowPrincipal;
