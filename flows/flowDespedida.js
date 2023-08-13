const { addKeyword } = require("@bot-whatsapp/bot");

/**
 * Esto se ejeuta cunado la persona escruibe "AGENTE"
 */
const flowDespedida = addKeyword(["7", "gracias"])
  .addAnswer(
    "Gracias por contactar a Siglo 21 Máquinas y Herramientas. Estoy aquí para ayudarte en cualquier momento. ¡Que tengas un excelente día!"
  )
  .addAnswer(
    "Para mejorar nuestro servicio, te invitamos a calificar tu experiencia con nosotros. Por favor, indícanos en una escala del 1 al 5, donde 1 es muy insatisfactorio y 5 es muy satisfactorio, ¿cómo calificarías la atención recibida?",
    { capture: true },
    async (ctx, { fallBack }) => {
      if (ctx.body < 1 || ctx.body > 5) {
        await fallBack("Por favor, ingresa un número del 1 al 5.");
      } else {
        await fallBack(
          "Ingresa una breve descripcion de la calificacion recibida:"
        );
        // guardar descripcion en la base de datos
        descripcion = ctx.body;
        await fallBack(
          "Muchas gracias por tu tiempo, ¡que tengas un excelente día!"
        );
      }
    }
  );
// Fijar como cerrar el flujo de conversacion
module.exports = flowDespedida;
