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
  const text = readFileSync(
    join(pathPromp, ""),
    "utf-8"
  );
  return text;
};

module.exports = {
  solicitudCuentaCorriente: (chatgptClass) => {
      return addKeyword(["solicitar cuenta","Solicitar cuenta"], {
        sensitive: true,
        onlyContainsKeyword: true,
      })
        .addAnswer(
          ""
        )
        .addAnswer(
          `¿Necesitas más información o tienes alguna pregunta sobre los requisitos de cuenta corriente? Si deseas volver al menú tecnico ingresa: cuentas`,
          { capture: true },
          async (ctx, { fallBack }) => {
            if (!ctx.body.toLowerCase().includes("cuentas","volver")) {
              const data = await getPrompt();
              await chatgptClass.handleMsgChatGPT(data);
              const textFromAI = await chatgptClass.handleMsgChatGPT(ctx.body);
              await fallBack(textFromAI.text);
            }
          }
        );
    },
  };
  