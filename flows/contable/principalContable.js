const { addKeyword } = require("@bot-whatsapp/bot");

const principalWeb = addKeyword([
  "cuentas"
])
  .addAnswer("Estás en el chat de servicio técnico")
  .addAnswer([
    "¿Cómo podemos ayudarte? 🛠️",
    "",
    "Estado de mi cuenta corriente: 'estado' 💰",
    "solicitar cuenta corriente: 'solicitar cuenta'",
    "Contactar agente 📞👤: 'agente contable' 👥",
    "Finalizar chat 📝👋 solamente saluda!",
    "Si desea volver al menu de areas ingrese: volver"
  ])
  .addAnswer("¡Indica el número de opción! ⌨️");

module.exports = principalWeb;
