const { addKeyword } = require("@bot-whatsapp/bot");

const prinicipalServicioTecnico = addKeyword([
  "servicio tecnico"
])
  .addAnswer("Estás en el chat de servicio técnico")
  .addAnswer([
    "¿Cómo podemos ayudarte? 🛠️",
    "",
    "Estado de tu reparación: 'estado reparacion' 🛠️",
    "¿Quieres arreglar tu maquina?: 'info' ℹ️",
    "Información sobre garantía: 'garantia' 📜",
    "Solicitar un servicio técnico: 'solicitar' 📞",
    "Contactar agente 📞👤: 'agente tecnico' 👥",
    "Finalizar chat 📝👋 solamente saluda!",
    "Si desea volver al menu de areas ingrese: volver"
  ])
  .addAnswer("¡Indica la opcion con la palabra que esta entre comillas! ⌨️");

module.exports = prinicipalServicioTecnico;
