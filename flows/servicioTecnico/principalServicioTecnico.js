const { addKeyword } = require("@bot-whatsapp/bot");

const principalWeb = addKeyword([
  "servicio tecnico"
])
  .addAnswer("Estás en el chat de servicio técnico")
  .addAnswer([
    "¿Cómo podemos ayudarte? 🛠️",
    "",
    "Estado de tu reparación: 'estado reparacion' 🛠️",
    "Información sobre servicio técnico: 'info' ℹ️",
    "Información sobre garantía: 'garantia' 📜",
    "Solicitar un servicio técnico: 'solicitar' 📞",
    "Contactar agente 📞👤: 'agente tecnico' 👥",
    "Finalizar chat 📝👋 solamente saluda!",
    "Si desea volver al menu de areas ingrese: volver"
  ])
  .addAnswer("¡Indica el número de opción! ⌨️");

module.exports = principalWeb;
