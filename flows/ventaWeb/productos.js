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
  const text = readFileSync(join(pathPromp, "01_PRODUCTOSBD.txt"), "utf-8");
  return text;
};

module.exports = {
  flowMediosDePago: (chatgptClass) => {
    return addKeyword("producto", {
      onlyContainsKeyword: true,
    })
      .addAnswer("Ingrese el nombre del producto a buscar: ", {
        capture: true,
        })
      .addAnswer(
        ``,
        { capture: true },
        async (ctx, { fallBack }) => {
          if (!ctx.body.toLowerCase().includes("volver")) {
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
