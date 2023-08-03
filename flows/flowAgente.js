const { addKeyword } = require("@bot-whatsapp/bot");

const flowAgente = addKeyword(["agente","9"]) // Cambiamos "AGENTE" por "AGENTE, 9"
  .addAnswer(
   "Estamos desviando tu conversación a nuestro agente"
  )
  .addAction(async (ctx, { provider }) => {
    const nanoid = await import('nanoid')
    const ID_GROUP = nanoid.nanoid(5)
    const refProvider = await provider.getInstance()
    await refProvider.groupCreate(`Siglo 21 Herramientas y Repuestos Support (${ID_GROUP})`, [
        `${ctx.from}@s.whatsapp.net`
        // Agregar el número del agente
    ])
  })
  .addAnswer('Te hemos agregado a un grupo con un asesor para resolver tus dudas. ¡Gracias!')

module.exports = flowAgente;
