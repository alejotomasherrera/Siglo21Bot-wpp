const { addKeyword } = require("@bot-whatsapp/bot");

/**
 * Esto se ejeuta cunado la persona escruibe "AGENTE"
 */
const flowDespedida = addKeyword(["7","gracias"]).addAnswer(
  "Gracias por contactar a Siglo 21 Máquinas y Herramientas. Estoy aquí para ayudarte en cualquier momento. ¡Que tengas un excelente día!"
);
// Fijar como cerrar el flujo de conversacion
module.exports = flowDespedida;
