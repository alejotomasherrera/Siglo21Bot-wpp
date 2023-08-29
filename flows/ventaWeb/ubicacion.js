const { addKeyword } = require("@bot-whatsapp/bot");
const { readFileSync } = require("fs");
const { join } = require("path");
/**
 * Exportamos
 * @param {*} chatgptClass
 * @returns
 */

const getPrompt = async () => {
  const pathPromp = join(process.cwd(), "/flows/ventaWeb/promps");
  const text = readFileSync(
    join(pathPromp, "05_CONTACTOYUBICACION.txt"),
    "utf-8"
  );
  return text;
};

module.exports = {
  ubicacion: (chatgptClass) => {
    return addKeyword(
      ["ubicacion", "Ubicacion", "ubicaciones", "Ubicaciones"],
      {
        sensitive: true,
        onlyContainsKeyword: true,
      }
    )
      .addAnswer(
        "🏢 **Sucursales**\n\n" +
          "📍 Neuquén:\n" +
          "- Ubicación: [T.Planas 1445 – Neuquén, Argentina](https://www.google.com/maps/@-38.9590795,-68.0799321,16z?entry=ttu)\n" +
          "- Horario de la sucursal: Lunes a Viernes de 9:00 a 19hs. Sábados de 9:00 a 13hs.\n\n" +
          "📍 Cipolletti:\n" +
          "- Ubicación: [P. Alvear 60 – Cipolletti, Argentina](https://www.google.com/maps/@-38.9453353,-68.0049258,16z?entry=ttu)\n" +
          "- Horario de la sucursal: Lunes a Viernes de 9:00 a 18hs. Sábados de 9:00 a 13hs."
      )
      .addAnswer(
        `¿Necesitas más información o tienes alguna pregunta sobre la ubicacion? Si deseas volver al menu ingresa: venta web`,
        { capture: true },
        async (ctx, { fallBack }) => {
          if (!ctx.body.toLowerCase().includes(["venta web", "volver"])) {
            const data = await getPrompt();
            await chatgptClass.handleMsgChatGPT(data);
            const textFromAI = await chatgptClass.handleMsgChatGPT(ctx.body);
            await fallBack(textFromAI.text);
          }
        }
      );
  },
};
