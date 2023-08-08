const { addKeyword } = require("@bot-whatsapp/bot");
const flowVolverPrincipal = require("./flowVolverPrincipal");

/**
 * Exportamos
 * @param {*} chatgptClass
 * @returns
 */
module.exports = {
  flowFormasDeEntrega: (chatgptClass) => {
    return addKeyword("2", {
      sensitive: true,
    })
      .addAnswer(
        "🚚 Formas de entrega 📦\n\n1️⃣ Retiro únicamente por sucursal de Neuquén. 🏬\n\n2️⃣ Envío sin cargo a partir de $10.000 hasta 20 km (Plazo de entrega 72 hs) 🚛\n\n3️⃣ Envío que supere los 20 km y hasta 20 kg: lo enviamos por medio del Correo Argentino con cobro en destino 📬\n\n4️⃣ Envío que supere los 20 km y más de 20 kg: lo enviamos por transporte (via cargo - cruz del sur) 🚚"
      )
      .addAnswer(
        `Necesitas más información o tienes alguna pregunta sobre las formas de entrega? Si deseas volver al menu de venta web ingresa: volver`,
        { capture: true },
        async (ctx, { fallBack }) => {
          if (!ctx.body.toLowerCase().includes("volver")) {
            const textFromAI = await chatgptClass.handleMsgChatGPT(ctx.body);
            await fallBack(textFromAI.text);
          }
        }
      );
  },
};
