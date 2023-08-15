const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");

const principalWeb = addKeyword(["alquileres"])
  .addAnswer(
    "Estas en el area de alquileres, ¿Que deseas hacer?",
  )
  .addAnswer([
    ""
  ])
  .addAnswer("¡Indica el número de opción! ⌨️");

module.exports = principalWeb;