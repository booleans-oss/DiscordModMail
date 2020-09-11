const Discord = require('discord.js');
    require('dotenv').config()
    const Bot = require("./utils/assets/BotBase");
    const path = require('path');
    const bot = new Bot();
    
    (async () => {
        await bot.login(process.env.TOKEN_BOT);
        await bot.chargementCommand();
        await bot.chargementEvent(bot);
      })();