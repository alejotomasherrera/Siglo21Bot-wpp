require("dotenv").config();

class ChatGPTClass {
  queue = [];
  optionsGPT = {
    model: "gpt-3.5-turbo",
    message: [
      {
        "role": "asistentechat",
        "text": "eres un asistente de chat llamado don Carlos para la empresa siglo21 que resuelve dudas a clientes de todo argentina",
      }
    ],
  };
  openai = undefined;

  constructor() {}

  /**
   * Esta funciona inicializa
   */
  init = async () => {
    const { ChatGPTAPI } = await import("chatgpt");
    this.openai = new ChatGPTAPI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  };

  /**
   * Manejador de los mensajes
   * sun funcion es enviar un mensaje a wahtsapp
   * @param {*} ctx
   */
  handleMsgChatGPT = async (body) => {
    const interaccionChatGPT = await this.openai.sendMessage(body, {
      conversationId: !this.queue.length
        ? undefined
        : this.queue[this.queue.length - 1].conversationId,
      parentMessageId: !this.queue.length
        ? undefined
        : this.queue[this.queue.length - 1].id,
    });

    this.queue.push(interaccionChatGPT);
    return interaccionChatGPT;
  };
}

module.exports = ChatGPTClass;