module.exports = class {
    constructor (client) {
      this.client = client;
    }
    async run (client, message) {
      if (message.author.bot) return;
      if(message.channel.type === "dm") {
        let options = process.env.MODMAILTYPE;
        if(options.toLowerCase() == "dm") {
          client.emit("modmaildm");
        }
        else {
          client.emit("modmailchannel")
        }
      }
    }
  };  