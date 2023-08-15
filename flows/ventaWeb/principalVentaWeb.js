const { addKeyword } = require("@bot-whatsapp/bot");

const principalWeb = addKeyword(["venta web"])
  .addAnswer(
    "Estas en el chat de atención al cliente de la web de la empresa. 🏢\n\n"
  )
  .addAnswer([
    "¿Cómo podemos ayudarte?",
    "",
    "Ayuda con productos 🛒: 'producto'",
    "Metodos de envio y entrega 🚚: 'envios'",
    "Medios de pago 💳:'pagos'",
    "Asesoramiento 🤝: 'asesoramiento'",
    "Contacto y ubicación 📞🗺️: 'contacto'",
    "Contactar agente 📞👤: 'agente web'",
    "Finalizar chat 📝👋",
  ])
  .addAnswer("¡Indica el número de opción! ⌨️");

module.exports = principalWeb;