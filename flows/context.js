const { addKeyword } = require("@bot-whatsapp/bot");
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
    flowFormasDeEntrega: (chatgptClass) => {
      return addKeyword("3", {
        sensitive: true,
      })
        .addAction(async (ctx, { flowDynamic, provider }) => {
          await flowDynamic("Consultando información sobre formas de entrega...");
  
          const jid = ctx.key.remoteJid;
          const refProvider = await provider.getInstance();
  
          await refProvider.presenceSubscribe(jid);
          await delay(500);
  
          await refProvider.sendPresenceUpdate('composing', jid);
  
          const data = await getPrompt();
  
          await chatgptClass.handleMsgChatGPT(data); // ¡Diciéndole actúa!
  
          await flowDynamic("Las formas de entrega disponibles son:\n" +
            "1. Retiro únicamente por nuestra sucursal en Neuquén.\n" +
            "2. Envío sin cargo: Ofrecemos envío gratuito para compras a partir de $10,000 en un radio de hasta 20 km. El plazo de entrega es de 72 horas.\n" +
            "3. Envío a larga distancia (hasta 20 km y más de 20 kg): Si tu compra supera los 20 km en distancia o pesa más de 20 kg, ofrecemos opciones de envío a larga distancia. Los costos y detalles específicos se proporcionarán al momento de la compra.\n" +
            "4. Envío a larga distancia y peso (más de 20 kg): ViaCargo y Cruz del sur.");
        })
        .addAnswer(
          `Tienes otra pregunta o duda?`,
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