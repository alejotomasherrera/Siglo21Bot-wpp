const { addKeyword } = require("@bot-whatsapp/bot");
const { getUser, getTicket } = require("../api/users.service");
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
    flowMediosDePago: (chatgptClass) => {
      return addKeyword("5", {
        sensitive: true,
      })
        .addAction(async (ctx, { flowDynamic, provider }) => {
          await flowDynamic("Consultando información sobre los medios de pago disponibles...");
  
          const jid = ctx.key.remoteJid;
          const refProvider = await provider.getInstance();
  
          await refProvider.presenceSubscribe(jid);
          await delay(500);
  
          await refProvider.sendPresenceUpdate('composing', jid);
  
          const data = await getPrompt("05_MEDIOSDEPAGO.txt");
  
          await chatgptClass.handleMsgChatGPT(data); // ¡Diciéndole actúa!
  
          await flowDynamic("Estos son los medios de pago disponibles:\n" +
            "**Visa**\n" +
            "- Ahora 3\n" +
            "  3 cuotas\n" +
            "- Ahora 6\n" +
            "  6 cuotas\n" +
            "- Ahora 12\n" +
            "  12 cuotas\n" +
            "- Ahora 18\n" +
            "  18 cuotas\n" +
            "- Ahora 24\n" +
            "  24 cuotas\n" +
            // Repite lo mismo para Mastercard, Cabal y Tarjeta Naranja
            "**PRECIOS VÁLIDOS ÚNICAMENTE PARA VENTA WEB Y TELEFÓNICA\nNO APLICAN AL LOCAL DE VENTA**");
        })
        .addAnswer(
          `Necesitas más información o tienes alguna pregunta sobre los medios de pago?`,
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
  