const { addKeyword } = require("@bot-whatsapp/bot");
const { getUser, getTicket } = require("../../api/reparacion.service");
const { readFileSync } = require("fs");
const { join } = require("path");
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

/**
 * Recuperamos el prompt "TECNICO"
 */
const getPrompt = async () => {
  const pathPromp = join(process.cwd(), "promps");
  const text = readFileSync(join(pathPromp, "01_TECNICO.txt"), "utf-8");
  return text;
};

/**
 * Exportamos
 * @param {*} chatgptClass
 * @returns
 */
module.exports = {
  productos: (chatgptClass) => {
    return addKeyword("productos", {
      sensitive: true,
    })
      .addAction(async (ctx, { endFlow, flowDynamic, provider }) => {})
      .addAnswer(
        `¿Necesitas más información o tienes alguna pregunta sobre el contacto y la ubicación? Si deseas volver al menú tecnico ingresa: servicio tecnico`,
        { capture: true },
        async (ctx, { fallBack }) => {
          // ctx.body = es lo que la peronsa escribe!!

          if (!ctx.body.toLowerCase().includes("venta web", "volver")) {
            const textFromAI = await chatgptClass.handleMsgChatGPT(ctx.body);
            await fallBack(textFromAI.text);
          }
        }
      );
  },
};
