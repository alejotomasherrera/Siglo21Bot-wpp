const { addKeyword } = require("@bot-whatsapp/bot");
const { getProducto } = require("../../api/productos.service");
const { readFileSync } = require("fs");
const { join } = require("path");
const { delay } = require("@adiwajshing/baileys");
const principalVentaWeb = require("./principalVentaWeb");
const agenteVentaWeb = require("./agenteVentaWeb");
const despedida = require("../despedida");

/**
 * Exportamos
 * @param {*} chatgptClass
 * @returns
 */

module.exports = {
  productos: (chatgptClass) => {
    return addKeyword(["productos", "producto"], {
      sensitive: true,
    }).addAnswer(
      "Ingrese el nombre del producto a buscar (Si desea volver ingrese 'venta web'): ",
      { capture: true },
      async (ctx, { endFlow, flowDynamic, fallBack }) => {
        nombreProducto = ctx.body;

        if (nombreProducto.toLowerCase() === "venta web") {
          await flowDynamic(principalVentaWeb);
          return;
        }

        await fallBack("Consultando en la base de datos... ⏳");

        const producto = await getProducto(nombreProducto);
        if (!producto) {
          await fallBack(
            "No se encontró el nombre del producto. Por favor, intente nuevamente. ❌"
          );
        } else {
          // Si el stock es menor a 3, desviar a agenteWeb

          const mensaje = producto.data
            .map(
              (i) =>
                `*Nombre:* ${i.attributes.nombre}\n*Precio:* $${i.attributes.precio}\n*Descripción:* ${i.attributes.descripcion}\n*Stock:* ${i.attributes.stock}\n`
            )
            .join("\n");
          console.log(mensaje);
          if (mensaje.stock <= 3) {
            fallBack(
              "Estamos desviando tu conversación a nuestro agente, ya que el stock del producto es bajo!."
            );
            await delay(3000);
            await flowDynamic(agenteVentaWeb);
            await flowDynamic(despedida);
            return;
          }

          await flowDynamic(mensaje);
          await delay(3000);
          await fallBack(
            "¿Desea realizar otra consulta de productos? (Si desea salir ingrese 'venta web')"
          );
        }
      }
    );
  },
};
