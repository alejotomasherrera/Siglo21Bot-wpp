const { addKeyword } = require("@bot-whatsapp/bot");

const principalWeb = addKeyword(["venta web"])
  .addAnswer(
    "Estas en el chat de atención al cliente de la web de la empresa. 🏢"
  )
  .addAnswer([
    "¿Cómo podemos ayudarte? Ingrese el texto que se encuentra entre comillas",
    "",
    "Productos 🛒: 'producto'",
    "Metodos de envio y entrega 🚚: 'envios'",
    "Medios de pago 💳:'pagos'",
    "Contacto y ubicación 📞🗺️: 'contacto'",
    "Contactar agente 📞👤: 'agente web'",
    "Finalizar chat 📝👋",
    "Si deseas volver al menu de areas ingresa: volver"
  ])
  .addAnswer("¡Indica la opcion con su palabra! ⌨️");

module.exports = principalWeb;
