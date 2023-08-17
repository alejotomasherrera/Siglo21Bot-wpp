const { addKeyword } = require("@bot-whatsapp/bot");

const principalWeb = addKeyword(["venta web"])
  .addAnswer(
    "Estas en el chat de atención al cliente de venta web."
  )
  .addAnswer([
    "¿Cómo podemos ayudarte? 🤔",
    "",
    "Productos 🛒: 'producto'",
    "Metodos de envio y entrega 🚚: 'envios'",
    "Medios de pago 💳:'pagos'",
    "Contacto 📞: 'contacto'",
    "Ubiacion 🗺️: 'ubicacion'",
    "Contactar agente 📞👤: 'agente web'",
    "Finalizar chat 📝👋",
    "Si deseas volver al menu de areas ingresa: volver"
  ])
  .addAnswer("¡Ingrese el texto que se encuentra entre comillas! ⌨️: ");

module.exports = principalWeb;
