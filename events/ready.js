module.exports = class {
    constructor(client) {
      this.client = client;
    }
    async run(client) {
      console.log(`Connecté sur ${client.user.tag}`)
    }
  };