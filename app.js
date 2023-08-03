require("dotenv").config();
const { createBot, createProvider, createFlow } = require("@bot-whatsapp/bot");
const QRPortalWeb = require("@bot-whatsapp/portal");
const BaileysProvider = require("@bot-whatsapp/provider/baileys");
const MockAdapter = require("@bot-whatsapp/database/mock");

/**
 * ChatGPT
 */
const ChatGPTClass = require("./chatgpt.class");
const chatGPT = new ChatGPTClass();

/**
 * Flows
 */
const flowPrincipal = require("./flows/flowPrincipal");
const { flowReparacion } = require("./flows/flowReparacion");
const { flowOfertas } = require("./flows/flowOfertas");
//Flow formasdeentrega 3
const { flowFormasDeEntrega } = require("./flows/flowFormasdeEntrega");
//Flow garantias 4

//Flow mediosdepago 5
const { flowMediosDePago } = require("./flows/flowMediosDePago");
//Flow asesoramientoencompra 6

//Flow informaciondecontactoyubicacion 7
const { flowContactoUbicacion } = require("./flows/flowContactoUbicacion");
//Flow promocionesydescuentos 8
//Flow agente 9
const flowAgente = require("./flows/flowAgente");
//Flow despedida 10
const flowDespedida = require("./flows/flowDespedida");

/**
 * Funcion principal
 */
const main = async () => {
  const adapterDB = new MockAdapter();

  const adapterFlow = createFlow([
    flowPrincipal,
    //FlowReparacion 1
    flowReparacion(chatGPT),
    //Flow productos 2
    //Formas de entrega/envio 3
    flowFormasDeEntrega(chatGPT),
    //Garantias 4
    //Medios de pago 5
    flowMediosDePago(chatGPT),
    //Asesoramiento en compra 6
    //Informacion de contacto y ubicacion 7
    flowContactoUbicacion(chatGPT),
    //Promociones y descuentos 8
    flowOfertas(chatGPT),
    // Flow agente 9
    flowAgente,
    //Flow despedida 10
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
