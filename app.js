require("dotenv").config();
const { createBot, createProvider, createFlow } = require("@bot-whatsapp/bot");
const QRPortalWeb = require("@bot-whatsapp/portal");
const BaileysProvider = require("@bot-whatsapp/provider/baileys");
const MockAdapter = require("@bot-whatsapp/database/mock");
const { readFileSync } = require("fs");
const { join } = require("path");
/**
 * ChatGPT
 */
const ChatGPTClass = require("./chatgpt.class");
const chatGPT = new ChatGPTClass();

// Generar promp al inicio del chat

const getPrompt = async (fileName) => {
  const pathPromp = join(process.cwd(), "promps");
  const text = readFileSync(join(pathPromp, fileName), "utf-8");
  return text;
};


//Mejorar a un for que carge todos los promps
(async () => {
  fileName = "05_CONTACTOYUBICACION.txt"
  let data = await getPrompt(fileName);

  await chatGPT.init();
  
  chatGPT.handleMsgChatGPT(data);
  console.log("ChatGPT ready and essential prompt are processed!");
})();

/**
 * Flows
 */

const flowPrincipal = require("./flows/flowPrincipal");
const { flowReparacion } = require("./flows/flowReparacion");
const { flowOfertas } = require("./flows/flowOfertas");
//Flow formasdeentrega 2
const { flowFormasDeEntrega } = require("./flows/flowFormasdeEntrega");
//Flow mediosdepago 3
const { flowMediosDePago } = require("./flows/flowMediosDePago");
//Flow asesoramientoencompra 4

//Flow informaciondecontactoyubicacion 5
const { flowContactoUbicacion } = require("./flows/flowContactoUbicacion");
//Flow promocionesydescuentos 6

//Flow agente 7
const flowAgente = require("./flows/flowAgente");
//Flow despedida 8
const flowDespedida = require("./flows/flowDespedida");

/**
 * Funcion principal
 */
const main = async () => {
  const adapterDB = new MockAdapter();

  const adapterFlow = createFlow([
    flowPrincipal,
    //FlowReparacion X
    flowReparacion(chatGPT),
    //Flow productos 1
    //Formas de entrega/envio 2
    flowFormasDeEntrega(chatGPT),
    //Medios de pago 3
    flowMediosDePago(chatGPT),
    //Asesoramiento en compra 4
    //Informacion de contacto y ubicacion 5
    flowContactoUbicacion(chatGPT),
    // Flow agente 6
    flowAgente,
    //Flow despedida 7
    flowDespedida,
  ]);

  const adapterProvider = createProvider(BaileysProvider);

  createBot({
    flow: adapterFlow,
    provider: adapterProvider,
    database: adapterDB,
  });

  QRPortalWeb();
};

main();
