const { addKeyword } = require("@bot-whatsapp/bot");
const { getUser, getTicket } = require("../api/users.service");
const { readFileSync } = require("fs");
const { join } = require("path");
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

/**
 * Recuperamos el prompt "TECNICO"
 */
const getPrompt = async () => {
  const pathPromp = join(process.cwd(), "promps");
  const text = readFileSync(join(pathPromp, "04_MEDIOSDEPAGO.txt"), "utf-8");
  return text;
};

/**
 * Exportamos
 * @param {*} chatgptClass
 * @returns
 */

module.exports = {
  flowMediosDePago: (chatgptClass) => {
    return addKeyword("3", {
      sensitive: true,
    })
      .addAnswer(
        "💳 Medios de pago 💰\n\n1️⃣ Tarjetas de crédito: Disponibles con 3 cuotas en adelante con interés 💳\n\n2️⃣ Transf.: Realiza una transferencia bancaria para pagar tus compras 🏦\n\n3️⃣ Depósito: También puedes hacer un depósito en nuestras cuentas para pagar 💼\n\n4️⃣ Mercado pago: Utiliza tu cuenta de Mercado Pago para una transacción segura 🔄"
      )
      .addAnswer(
        `Necesitas más información o tienes alguna pregunta sobre los medios de pago?`,
        { capture: true },
        async (ctx, { fallBack }) => {
          if (!ctx.body.toLowerCase().includes("ofertas")) {
            const textFromAI = await chatgptClass.handleMsgChatGPT(ctx.body);
            await fallBack(textFromAI.text);
          }
        }
      );
  },
};
