const EventBase = require('../../utils/assets/EventBase');
module.exports = class MessageEvent extends EventBase {
    constructor() {
        super('message');
    }
    async run(client, message) {
      if (message.author.bot) return;
      if(message.channel.type === "dm") {
        let options = process.env.MODMAILTYPE;
        if(options.toLowerCase() == "dm") client.emit("modmaildm", message);
        else client.emit("modmailchannel", message)
      }
    }
  };  