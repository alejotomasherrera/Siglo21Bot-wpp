const { addKeyword } = require("@bot-whatsapp/bot");

const flowDespedida = addKeyword(["chau", "gracias","finalizar chat","adios","hasta luego"], {
  sensitive: true,
  onlyContainsKeyword: true,
  })
  .addAnswer(
    "Gracias por contactar a Siglo 21 Máquinas y Herramientas. Estoy aquí para ayudarte en cualquier momento. ¡Que tengas un excelente día!"
  )
  .addAnswer(
    "Para mejorar nuestro servicio, te invitamos a calificar tu experiencia con nosotros. Por favor, indícanos como, insatisfecho, regular, satisfecho, muy satisfecho o excelente.",
    { capture: true },
    async (ctx, { fallBack, endFlow }) => {
      if (ctx.body === 'insatisfecho' || ctx.body === 'regular' || ctx.body === 'satisfecho' || ctx.body === 'muy satisfecho' || ctx.body === 'excelente') {
        await fallBack("Ingresa una breve descripcion de la calificacion recibida:")
        if (ctx.body !== 0) {
          descripcion = ctx.body;
          await fallBack("Gracias por tu calificacion. ¡Que tengas un excelente día!")
          return endFlow();
        }

      } else {
        await fallBack("Por favor, ingresa una calificacion valida:")
      }
      await endFlow();
    }
  );

module.exports = flowDespedida;
