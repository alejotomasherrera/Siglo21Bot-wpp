const { addKeyword } = require("@bot-whatsapp/bot");
const { getCuenta } = require("../../api/cuentas.service");
const { readFileSync } = require("fs");
const { join } = require("path");
const delay = (ms) => new Promise((res) => setTimeout(res, ms));
const principalCuentas = require("./principalCuentas");
/**
 * Recuperamos el prompt "TECNICO"
 */
const getPrompt = async () => {
  const pathPromp = join(process.cwd(), "promps");
  const text = readFileSync(join(pathPromp, ""), "utf-8");
  return text;
};

/**
 * Exportamos
 * @param {*} chatgptClass
 * @returns
 */

module.exports = {
  estadoCuenta: (chatgptClass) => {
    return addKeyword(["estado"], {
      sensitive: true,
    }).addAnswer(
      "Ingrese el DNI correspondiente a la cuenta corriente (Si desea salir ingrese 'cuentas'): ",
      { capture: true },
      async (ctx, { endFlow, flowDynamic, fallBack }) => {
        dniCliente = ctx.body;

        if (dniCliente.toLowerCase() === "cuentas") {
          await flowDynamic(principalCuentas);
        }

        await fallBack("Consultando en la base de datos... ⏳");

        const cuenta = await getCuenta(dniCliente);
        if (!cuenta) {
          await fallBack(
            "No se encontró la cuenta corriente Por favor, intente nuevamente. ❌"
          );
        } else {
          const mensaje = cuenta.data
            .map(
              (i) =>
                `*Nombre:* ${i.attributes.nombreCliente}\n*dni:* ${i.attributes.dni}\n*correo:* ${i.attributes.correo}\n*estadoCuenta:* ${i.attributes.estadoCuenta}\n`
            )
            .join("\n");
          console.log(mensaje);

          await fallBack(mensaje);
          await delay(3000);
          await fallBack(
            "¿Desea realizar otra consulta de estado de cuenta corriente? (Si desea salir ingrese 'cuentas')"
          );
        }
      }
    );
  },
};
