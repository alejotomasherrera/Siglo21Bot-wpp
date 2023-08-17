const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");

const flowPrincipal = addKeyword(["volver","Volver","VOLVER"])
  .addAnswer([
    "Dirigete al sector que solicites en las siguientes opciones:",
    "",
    "*Servicio de alquiler*: 'alquileres' 🛠️🏗️",
    "*Servicio técnico*: 'servicio tecnico' 🔧👨‍🔧",
    "*Cuentas corrientes*: 'cuentas' 💰💼",
    "*Venta web*: 'venta web' 🛒💻",
    "*Finalizar chat* 📝👋 solo di gracias!",
  ])
  .addAnswer("¡Indica la opcion con su palabra! ⌨️");

module.exports = flowPrincipal;