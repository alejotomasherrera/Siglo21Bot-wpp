const { addKeyword } = require("@bot-whatsapp/bot");

const flowAgente = addKeyword(["agente contable"]) // Cambiamos "AGENTE" por "AGENTE, 9"
  .addAnswer(
   "Estamos desviando tu conversación a nuestro agente contable."
  )
  .addAnswer("Ingrese su dni para poder identificarlo", { capture: true })
  // Guardar en variable el dni
  
  .addAction(async (ctx, { provider }) => {
    const nanoid = await import('nanoid')
    const ID_GROUP = nanoid.nanoid(5)
    const refProvider = await provider.getInstance()
    await refProvider.groupCreate(`Siglo 21 - Area contable - ${ID_GROUP}`, [
        // Agregar el número del agente
    ])
  })
  .addAnswer('Te hemos agregado a un grupo con un asesor para resolver tus dudas. ¡Gracias!')

module.exports = flowAgente;