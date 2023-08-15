const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");

const principalWeb = addKeyword([EVENTS.WELCOME])
  .addAnswer(
    "¡Hola! 👋 Somos *Siglo 21 Máquinas y Herramientas*🛠️🌱",
    "Expertos en productos de fuerza, jardinería, construcción y más. Mi nombre es Don Carlos ¿En qué puedo ayudarte? 🛒🚚💳"
  )
  .addAnswer([
    "Dirigete al sector que solicites en las siguientes opciones:",
    "",
    "Servicio de alquiler: 'alquileres'",
    "Servicio técnico: 'servicio tecnico'",
    "cuentas corrientes: 'cuentas'",
    "venta web: 'venta web'",
    "Finalizar chat 📝👋",
  ])
  .addAnswer("¡Indica el número de opción! ⌨️");

module.exports = principalWeb;