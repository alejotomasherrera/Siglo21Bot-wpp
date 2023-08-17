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

// Generar promp al inicio del chat

/**
 * Flows
 */

const principal = require("./flows/principal");
const volverPrincipal = require("./flows/volverPrincipal");
const despedida = require("./flows/despedida");
//venta web
const agenteVentaWeb = require("./flows/ventaWeb/agenteVentaWeb");
const { productos } = require("./flows/ventaWeb/productos");
const { contactoUbicacion } = require("./flows/ventaWeb/contactoUbicacion");
const { formasdeEntrega } = require("./flows/ventaWeb/formasdeEntrega");
const { mediosDePago } = require("./flows/ventaWeb/mediosDePago");
const principalVentaWeb = require("./flows/ventaWeb/principalVentaWeb");

//servicioTecnico
const principalServicioTecnico = require("./flows/servicioTecnico/principalServicioTecnico");
const {
  informacionServicioTecnico,
} = require("./flows/servicioTecnico/informacionServicioTecnico");
const { reparacion } = require("./flows/servicioTecnico/reparacion");
const agenteServicioTecnico = require("./flows/servicioTecnico/agenteServicioTecnico");
const { garantias } = require("./flows/servicioTecnico/garantias");

//Contable
const agenteContable = require("./flows/contable/agenteContable");
const { estadoCuenta } = require("./flows/contable/estadoCuenta");
const {
  solicitudCuentaCorriente,
} = require("./flows/contable/solicitudCuentaCorriente");
const principalContable = require("./flows/contable/principalContable");

/**
 * Funcion principal
 */
const main = async () => {
  const adapterDB = new MockAdapter();

  const adapterFlow = createFlow([
    principal,
    volverPrincipal,
    despedida,
    //Venta Web
    agenteVentaWeb,
    productos(chatGPT),
    contactoUbicacion(chatGPT),
    formasdeEntrega(chatGPT),
    mediosDePago(chatGPT),
    principalVentaWeb,
    //ServicioTecnico
    principalServicioTecnico,
    informacionServicioTecnico(chatGPT),
    reparacion(chatGPT),
    agenteServicioTecnico,
    garantias(chatGPT),
    //Contable
    agenteContable,
    estadoCuenta(chatGPT),
    solicitudCuentaCorriente(chatGPT),
    principalContable,
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
