const { addKeyword } = require("@bot-whatsapp/bot");
const { readFileSync } = require("fs");
const { join } = require("path");
const principalWeb = require("./principalVentaWeb");

/**
 * Exportamos
 * @param {*} chatgptClass
 * @returns
 */

const getPrompt = async () => {
  const pathPromp = join(process.cwd(), "/flows/ventaWeb/promps");
  const text = readFileSync(join(pathPromp, "03_MEDIOSDEPAGO.txt"), "utf-8");
  return text;
};

module.exports = {
  mediosDePago: (chatgptClass) => {
    return addKeyword(["pagos","Pagos","PAGOS"], {
      onlyContainsKeyword: true,
    })
      .addAnswer(
        "💳 Medios de pago 💰\n\n1️⃣ Tarjetas de crédito: Disponibles con 3 cuotas en adelante con interés 💳\n\n2️⃣ Transf.: Realiza una transferencia bancaria para pagar tus compras 🏦\n\n3️⃣ Depósito: También puedes hacer un depósito en nuestras cuentas para pagar 💼\n\n4️⃣ Mercado pago: Utiliza tu cuenta de Mercado Pago para una transacción segura 🔄"
      )
      .addAnswer(
        `Necesitas más información o tienes alguna pregunta sobre los medios de pago? Si deseas volver al menu de venta web ingresa: venta web`,
        { capture: true },
        async (ctx, { fallBack, flowDynamic }) => {
          if (!ctx.body.toLowerCase().includes("venta web","volver","Volver","Venta web","VENTA WEB","VOLVER")) {
            const data = await getPrompt();
            await chatgptClass.handleMsgChatGPT(data); //Dicinedole actua!!
            const textFromAI = await chatgptClass.handleMsgChatGPT(ctx.body);
            await fallBack(textFromAI.text);
            await fallBack("Si deseas volver al menu de venta web ingresa: venta web")
          }
        }
      );
  },
};