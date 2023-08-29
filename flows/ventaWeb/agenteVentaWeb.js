const { addKeyword } = require("@bot-whatsapp/bot");

const flowAgente = addKeyword(["agente web","Agente web","AGENTE WEB"])
  .addAnswer(
   "Estamos desviando tu conversación a nuestro agente de venta web"
  )
  .addAnswer("Ingrese su dni para poder identificarlo", 
  { capture: true },
  // Guardar en variable el dni
  async (ctx) => {
    const dni = ctx.event.message.body
    console.log("Generando grupo venta web con dni: ", dni)
    return dni
  }
  )
  .addAction(async (ctx, { provider }) => {
    const nanoid = await import('nanoid')
    const ID_GROUP = nanoid.nanoid(5)
    const refProvider = await provider.getInstance()
    await refProvider.groupCreate(`Siglo 21 Maquinas y Herramientas WEB - ${ID_GROUP}`,  [
        // Agregar el número del agente
    ])
  })
  .addAnswer('Te hemos agregado a un grupo con un asesor para resolver tus dudas. ¡Gracias!')

module.exports = flowAgente;