const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");

const flowPrincipal = addKeyword(["menu", "Menu", "MENU", "Menú", "menú", "MENÚ"])
  .addAnswer([
    "Dirigete al sector que solicites en las siguientes opciones:",
    "",
    "Servicio de alquiler: 'alquileres'",
    "Servicio técnico: 'servicio'",
    "cuentas corrientes: 'cuentas'",
    "venta web: 'venta web'",
    "Contactar agente 📞👤: 'agente'",
    "Finalizar chat 📝👋",
  ])
  .addAnswer("¡Indica el número de opción! ⌨️");

module.exports = flowPrincipal;