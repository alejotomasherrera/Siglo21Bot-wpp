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
  const text = readFileSync(join(pathPromp, ""), "utf-8");
  return text;
};

module.exports = {
  informacionServicioTecnico: (chatgptClass) => {
    return addKeyword("info", {
      sensitive: true,
      onlyContainsKeyword: true,
    })
      .addAnswer(
        "¡Somos especializados en los productos de Husqvarna! 😊🛠️\n\nContamos con un amplio stock de repuestos y accesorios para tu máquina. 🛒🔧\n\nTambién ofrecemos servicio técnico de Bosch, Lusqtoff, Total Herramientas y Generadores Kohler. 🛠️💼"
      )

      .addAnswer(
        `¿Necesitas más información o tienes alguna pregunta sobre el servicio tecnico? Si deseas volver al menú tecnico ingresa: servicio tecnico`,
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
