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
    informacionServicioTecnico: (chatgptClass) => {
      return addKeyword("info", {
        sensitive: true,
        onlyContainsKeyword: true,
      })
        .addAnswer(
          "Agregar informacion sobre marcas que se reparan y ubicacion del servicio tecnico"
        )
        .addAnswer(
          `¿Necesitas más información o tienes alguna pregunta sobre el contacto y la ubicación? Si deseas volver al menú tecnico ingresa: servicio tecnico`,
          { capture: true },
          async (ctx, { fallBack }) => {
            if (!ctx.body.toLowerCase().includes("servicio tecnico")) {
              const data = await getPrompt();
              await chatgptClass.handleMsgChatGPT(data);
              const textFromAI = await chatgptClass.handleMsgChatGPT(ctx.body);
              await fallBack(textFromAI.text);
            }
          }
        );
    },
  };
  