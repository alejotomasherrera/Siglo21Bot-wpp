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

          const textIA = await chatgptClass.handleMsgChatGPT(data); // ¡Diciéndole actúa!
          await flowDynamic(textIA.text);
          
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