const { addKeyword } = require("@bot-whatsapp/bot");
const { readFileSync } = require("fs");
const { join } = require("path");
/**
 * Exportamos
 * @param {*} chatgptClass
 * @returns
 */

const getPrompt = async () => {
  const pathPromp = join(process.cwd(), "promps");
  const text = readFileSync(join(pathPromp, "garantias.txt"), "utf-8");
  return text;
};

module.exports = {
  garantias: (chatgptClass) => {
    return addKeyword("garantia", {
      sensitive: true,
      onlyContainsKeyword: true,
    })
      .addAnswer(
        "📢 Garantías: Todos los productos tienen 6 meses de garantía en el local directamente. Debes traerlo o enviarlo según sea el caso. 🛍️"
      )
      .addAnswer(
        `¿Necesitas más información o tienes alguna pregunta sobre el contacto y la ubicación? Si deseas volver al menú tecnico ingresa: servicio tecnico`,
        { capture: true },
        async (ctx, { fallBack }) => {
          if (!ctx.body.toLowerCase().includes("servicio tecnico", "volver")) {
            const data = await getPrompt();
            await chatgptClass.handleMsgChatGPT(data);
            const textFromAI = await chatgptClass.handleMsgChatGPT(ctx.body);
            await fallBack(textFromAI.text);
          }
        }
      );
  },
};
