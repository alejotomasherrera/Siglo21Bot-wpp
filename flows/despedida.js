const fs = require("fs");

const { addKeyword } = require("@bot-whatsapp/bot");

const flowDespedida = addKeyword(
  ["chau", "gracias", "finalizar chat", "adios", "hasta luego"],
  {
    sensitive: true,
    onlyContainsKeyword: true,
  }
)
  .addAnswer(
    "Gracias por contactar a Siglo 21 Máquinas y Herramientas. Estoy aquí para ayudarte en cualquier momento. ¡Que tengas un excelente día!"
  )
  .addAnswer(
    "Para mejorar nuestro servicio, te invitamos a calificar tu experiencia con nosotros. Por favor, ingresa una calificacion del 1 al 5, siendo 1 insatisfecho y 5 excelente:",
    { capture: true },
    async (ctx, { fallBack }) => {
      // Guardar calificacion y verificar que se encuesntre entre 1 y 5 en un archivo csv, agregar la fecha tambien
      if (
        ctx.body === "1" ||
        ctx.body === "2" ||
        ctx.body === "3" ||
        ctx.body === "4" ||
        ctx.body === "5"
      ) {
        const date = new Date();
        const dateStr = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
        const calificacion = ctx.body;
        // Guardar dateStr y calificacion en un archivo csv
        fs.appendFile(
          "../info_encuestas.csv",
          `${dateStr},${calificacion},`,
          function (err) {
            if (err) throw err;
            console.log("Saved!");
          }
        );
      } else {
        await fallBack("Por favor ingresa una calificacion valida entre 1 y 5: ");
      }
    }
  )
  //Agregar opcionalmente si quiere agregar un comentario sin la fecha en el archivo ../info_encuesta.csv en archivo csv
  .addAnswer(
    "Si deseas agregar un comentario, por favor ingresalo a continuación:",
    { capture: true },
    async (ctx, { fallBack, endFlow }) => {
      const descripcion = ctx.body
      // Guardar comentario en un archivo csv
      fs.appendFile("../info_encuestas.csv", `,${descripcion}\n`,function (err) {
        if (err) throw err;
        console.log("Saved comment!");
      });
      await endFlow(
        "Gracias por tu comentario! Lo valoramos mucho para mejorar! *CHAT FINALIZADO*"
      );
    }
  );

module.exports = flowDespedida;
