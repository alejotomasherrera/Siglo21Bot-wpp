const { addKeyword } = require("@bot-whatsapp/bot");
const { readFileSync } = require("fs");
const { join } = require("path");

/**
 * Exportamos
 * @param {*} chatgptClass
 * @returns
 */

const getPrompt = async () => {
  const pathPromp = join(process.cwd(), "/flows/servicioTecnico/promps");
  const text = readFileSync(join(pathPromp, "garantias.txt"), "utf-8");
  return text;
};

module.exports = {
    solicitarServicioTecnico: (chatgptClass) => {
    return addKeyword("solicitar", {
      sensitive: true,
      onlyContainsKeyword: true,
    })
    .addAnswer(
        "¡Estamos aquí para ayudarte en todo momento! Si necesitas solicitar un servicio técnico, te extendemos una cálida bienvenida a nuestra central en Neuquén Capital.\n\nEstamos ubicados en la calle Teodoro Planas 1445. Nuestro equipo de mecánicos estará encantado de realizar un análisis exhaustivo de tu máquina antes de comenzar cualquier trabajo. 🛠️🛍️\n\nNo dudes en contactarnos si tienes preguntas o necesitas más asistencia. ¡Esperamos recibirte con los brazos abiertos y ofrecerte el mejor servicio posible!"
    )
    
      .addAnswer(
        `¿Necesitas más información o tienes alguna pregunta sobre servicio tecnico? Si deseas volver al menú tecnico ingresa: servicio tecnico`,
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