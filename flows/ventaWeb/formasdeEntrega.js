const { addKeyword } = require("@bot-whatsapp/bot");
const { readFileSync } = require("fs");
const { join } = require("path");

/**
 * Exportamos
 * @param {*} chatgptClass
 * @returns
 */

const getPrompt = async () => {
  const pathPromp = join(process.cwd(), "/flows/ventaWeb/promps");
  const text = readFileSync(join(pathPromp, "02_FORMASDEENTREGA.txt"), "utf-8");
  return text;
};

module.exports = {
  formasdeEntrega: (chatgptClass) => {
    return addKeyword(["envios","Envios","ENVIO","envio"], {
      sensitive: true,
      onlyContainsKeyword: true
    })
      .addAnswer(
        "¡Genial! Aquí te presentamos nuestras formas de entrega disponibles 🚚🌟:\n\n" +
          "1. **Retiro en Sucursal (Neuquén):** 🏢\n" +
          "¡Puedes venir a nuestra sucursal en Neuquén y llevarte tu pedido en persona! Nuestro equipo estará encantado de atenderte.\n\n" +
          "2. **Envío Gratis (dentro de 20 km) - Entrega en 72 hs:** 🎁🚛\n" +
          "Si tu compra supera los $10.000 y estás dentro de 20 km, ¡el envío es gratis! Te llegará en aproximadamente 72 horas.\n\n" +
          "3. **Envío por Correo Argentino (más de 20 km y hasta 20 kg) - Pago en Destino:** 📦\n" +
          "Para pedidos más lejanos o que pesen hasta 20 kg, utilizamos Correo Argentino. El pago se hace al momento de la entrega.\n\n" +
          "4. **Envío por Transporte (más de 20 km y más de 20 kg):** 🚛📦\n" +
          "Si tu pedido es más grande, lo enviaremos con servicios de transporte como Via Cargo o Cruz del Sur. ¡La seguridad es nuestra prioridad!\n\n"
      )
      .addAnswer(
        "¿Necesitas más información o tienes alguna pregunta sobre las formas de entrega? Si deseas volver al menú de venta web, ingresa: 'venta web'",
        { capture: true },
        async (ctx, { fallBack }) => {
          if (!ctx.body.toLowerCase().includes("venta web","volver")) {
            //send prompt to gpt
            const data = await getPrompt();
            await chatgptClass.handleMsgChatGPT(data); //Dicinedole actua!!
            const textFromAI = await chatgptClass.handleMsgChatGPT(ctx.body);
            await fallBack(textFromAI.text);
          }
        }
      );
  },
};