const { addKeyword } = require("@bot-whatsapp/bot");
const { readFileSync } = require("fs");
const { join } = require("path");
const delay = (ms) => new Promise((res =>  setTimeout(res, ms)))

/**
 * Recuperamos el prompt "TECNICO"
 */
const getPrompt = async () => {
  const pathPromp = join(process.cwd(), "promps");
  const text = readFileSync(join(pathPromp, "03_FORMASDEENTREGA.txt"), "utf-8");
  return text;
};

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
      .addAnswer("🚚 Formas de entrega 📦\n\n1️⃣ Retiro únicamente por sucursal de Neuquén. 🏬\n\n2️⃣ Envío sin cargo a partir de $10.000 hasta 20 km (Plazo de entrega 72 hs) 🚛\n\n3️⃣ Envío que supere los 20 km y hasta 20 kg: lo enviamos por medio del Correo Argentino con cobro en destino 📬\n\n4️⃣ Envío que supere los 20 km y más de 20 kg: lo enviamos por transporte (via cargo - cruz del sur) 🚚")
      .addAnswer(
        `Tienes otra pregunta o duda?`,
        { capture: true },
        async (ctx, { fallBack }) => {
          if (!ctx.body.toLowerCase().includes('ofertas')) {
            const textFromAI = await chatgptClass.handleMsgChatGPT(ctx.body);
            await fallBack(textFromAI.text);
          }
        }
      );
  },
  };