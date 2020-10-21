(async () => {
    const verif = await require('./utils/assets/ErrorHandling')();
    const Bot = require("./utils/assets/BotBase");
    const bot = new Bot();
    await bot._setup();
      })();