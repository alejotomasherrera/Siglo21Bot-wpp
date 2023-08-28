const { addKeyword } = require("@bot-whatsapp/bot");
const { getReparacion } = require("../../api/reparacion.service");
const { readFileSync } = require("fs");
const { join } = require("path");
const { delay } = require("@adiwajshing/baileys");
const prinicipalServicioTecnico = require("./principalServicioTecnico");

/**
 * Exportamos
 * @param {*} chatgptClass
 * @returns
 */

module.exports = {
  reparacion: (chatgptClass) => {
    return addKeyword("estado reparacion", {
      sensitive: true,
    }).addAnswer(
      "Ingrese el numero de orden de servicio (Si desea salir ingrese 'servicio tecnico'): ",
      { capture: true },
      async (ctx, { endFlow, flowDynamic, fallBack }) => {
        idRef = ctx.body;
        
        if (idRef.toLowerCase() === "servicio tecnico") {
          await flowDynamic(prinicipalServicioTecnico)
          return;
        }

        await fallBack("Consultando en la base de datos... ⏳");

        const reparacion = await getReparacion(idRef);

        if (!reparacion) {
          await fallBack(
            "No se encontró el numero de orden de servicio. Por favor, intente nuevamente. ❌"
          );
        } else {
          const nombreProducto = reparacion.data.attributes.nombreProducto;
          const estado = reparacion.data.attributes.estado;
          const descripcionReparacion =
            reparacion.data.attributes.descripcionReparacion;
          const nombreCliente = reparacion.data.attributes.nombreCliente;

          let estadoMensaje = estado;
          if (estado === "reparado") {
            estadoMensaje = `${estado} ✅`;
          } else if (estado === "en reparacion") {
            estadoMensaje = `${estado} ⏳`;
          } else if (estado === "no reparado") {
            estadoMensaje = `${estado} ❌`;
          }

          const mensaje = `Información de la reparación:
              Nombre Producto: ${nombreProducto}
              Estado: ${estadoMensaje}
              Descripción de la Reparación: ${descripcionReparacion}
              Nombre del Cliente: ${nombreCliente}`;

          await flowDynamic(mensaje);
          await delay(3000);
          await fallBack(
            "¿Desea realizar otra consulta de estado de tu reparacion? (Si desea salir ingrese 'servicio tecnico')"
          );
        }
      }
    );
  },
};

