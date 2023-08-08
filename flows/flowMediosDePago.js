const { addKeyword } = require("@bot-whatsapp/bot");

/**
 * Exportamos
 * @param {*} chatgptClass
 * @returns
 */

module.exports = {
  flowMediosDePago: (chatgptClass) => {
    return addKeyword("3", {
      sensitive: true,
      onlyContainsKeyword: true,
    })
      .addAnswer(
        "💳 Medios de pago 💰\n\n1️⃣ Tarjetas de crédito: Disponibles con 3 cuotas en adelante con interés 💳\n\n2️⃣ Transf.: Realiza una transferencia bancaria para pagar tus compras 🏦\n\n3️⃣ Depósito: También puedes hacer un depósito en nuestras cuentas para pagar 💼\n\n4️⃣ Mercado pago: Utiliza tu cuenta de Mercado Pago para una transacción segura 🔄"
      )
      .addAnswer(
        `Necesitas más información o tienes alguna pregunta sobre los medios de pago? Si deseas volver al menu de venta web ingresa: volver`,
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