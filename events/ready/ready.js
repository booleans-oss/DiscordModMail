const EventBase = require('../../utils/assets/EventBase');
module.exports = class ReadyEvent extends EventBase {
    constructor() {
        super('ready');
    }
    async run(client) {
      console.log(`Connecté sur ${client.user.tag}`)
    }
  };