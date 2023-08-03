const { addKeyword } = require("@bot-whatsapp/bot");
const { getUser, getTicket } = require("../api/users.service");
const { readFileSync } = require("fs");
const { join } = require("path");
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

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
  flowContactoUbicacion: (chatgptClass) => {
    return addKeyword("7", {
      sensitive: true,
    })
      .addAction(async (ctx, { flowDynamic, provider }) => {
        await flowDynamic("Consultando información de contacto y ubicación...");

        const jid = ctx.key.remoteJid;
        const refProvider = await provider.getInstance();

        await refProvider.presenceSubscribe(jid);
        await delay(500);

        await refProvider.sendPresenceUpdate("composing", jid);

        const data = await getPrompt("07_CONTACTOUBICACION.txt");

        await chatgptClass.handleMsgChatGPT(data); // ¡Diciéndole actúa!

        await flowDynamic(
          "Estamos aquí para ayudarte. Contáctanos:\n" +
            "Ventas Web / Marketing\n" +
            "- Tel: +54 9 299 422 9156\n" +
            "- Email: ventasonline@siglo21myh.com.ar\n\n" +
            "Cotizaciones / Presupuestos\n" +
            "- Tel: +54 9 299 594-7950\n" +
            "- Email: cotizaciones@siglo21myh.com.ar\n\n" +
            "Repuestos\n" +
            "- Neuquén:\n" +
            "  Tel: +54 9 299 405-3248\n\n" +
            "- Cipolletti:\n" +
            "  Tel: +54 9 299 622-3938\n\n" +
            "Alquileres / Garantías\n" +
            "- Tel: +54 9 299 511-3720\n\n" +
            "Reparaciones / Servicio Técnico\n" +
            "- Tel: +54 9 299 577-2751\n"
        );
      })
      .addAnswer(
        `Necesitas más información o tienes alguna pregunta sobre el contacto y la ubicación?`,
        { capture: true },
        async (ctx, { fallBack }) => {
          if (!ctx.body.toLowerCase().includes("ofertas")) {
            const textFromAI = await chatgptClass.handleMsgChatGPT(ctx.body);
            await fallBack(textFromAI.text);
          }
        }
      );
  },
};
