const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");

const principalWeb = addKeyword([EVENTS.WELCOME])
  .addAnswer(
    "¡Hola! 👋 Soy Don Carlos, el asistente de *Siglo 21 Máquinas y Herramientas* 🛠️🌱",
    "Expertos en productos de fuerza, máquinas, herramientas, construcción y más. 🛒🚚💳"
  )
  .addAnswer([
    "Dirígete al sector que solicites en las siguientes opciones:",
    "",
    "*Servicio de alquiler*: 'alquileres' 🛠️🏗️",
    "*Servicio técnico/Garantias*: 'servicio tecnico' 🔧",
    "*Cuentas corrientes*: 'cuentas' 💰",
    "*Venta web*: 'venta web' 🛒💻",
    "*Finalizar chat* 📝👋 solo di gracias!",
    "",
    "¡Indica la opcion con su palabra! ⌨️"

  ])

module.exports = principalWeb;