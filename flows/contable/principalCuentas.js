const { addKeyword } = require("@bot-whatsapp/bot");

const principalWeb = addKeyword([
  "cuentas"
])
  .addAnswer("Estás en el chat de cuentas")
  .addAnswer([
    "¿Cómo podemos ayudarte? 🛠️",
    "",
    "Estado de mi cuenta corriente: 'estado' 💰",
    "solicitar cuenta corriente: 'solicitar cuenta'",
    "Contactar agente 📞👤: 'Agente Contable' 👥",
    "Finalizar chat 📝👋 solamente saluda!",
    "Si desea volver al menu de areas ingrese: volver"
  ])
  .addAnswer("¡Indica la opcion con su palabra! ⌨️");

module.exports = principalWeb;
