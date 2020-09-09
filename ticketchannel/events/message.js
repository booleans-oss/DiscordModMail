module.exports = class {
    constructor (client) {
      this.client = client;
    }
    async run (client, message) {
      if (message.author.bot) return;
      if(message.channel.type === "dm") {
        client.emit("messageprivee")
      }
    }
  };  