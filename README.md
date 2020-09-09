<div align="center">
  <img alt="ReDoc logo" src="https://www.pngfind.com/pngs/b/102-1026997_jeffy-discordjs-discord-js-logo-hd-png-download.png" width="400px" />

  **Discord.js Bot ModMail**

  [![Build Status](https://travis-ci.org/Redocly/redoc.svg?branch=master)](https://github.com/booleans-oss/discord-doc/) [![Coverage Status](https://coveralls.io/repos/Redocly/redoc/badge.svg?branch=master&service=github)](https://github.com/booleans-oss/discord-doc/) [![dependencies Status](https://david-dm.org/Redocly/redoc/status.svg)](https://github.com/booleans-oss/discord-doc/) [![devDependencies Status](https://david-dm.org/Redocly/redoc/dev-status.svg)](https://github.com/booleans-oss/discord-doc/) [![npm](http://img.shields.io/npm/v/redoc.svg)](https://www.npmjs.com/package/discord.js) [![License](https://img.shields.io/npm/l/redoc.svg)](https://github.com/booleans-oss/discord-doc/blob/master/LICENSE)


</div>

**This is README for `1.0.0` version of this bot (@discord.js based).**


[<img alt="Deploy to Github" src="http://i.imgur.com/YZmaqk3.png" height="60px">](https://github.com/booleans-oss/discord-doc/) [<img alt="Customization services" src="http://i.imgur.com/c4sUF7M.png" height="60px">](https://github.com/booleans-oss/discord-doc/)

## Features 🛠
- Extremely easy use
- Only events to download
- Up to date documentation
- Seemless actions
- Neat **interactive** documentation <br>
- Code samples support <br>
- Fully customizable

## Roadmap 🏁
  - [x] ~~[README Update](https://github.com/booleans-oss/DiscordModMail)~~
  - [x] ~~fully optimized~~

## Releases 🔴
**Important:** this version 1.x.x is the first version. As time goes by, further releases would be done. Branches would be created to separate the releases:
- 1.0.x, e.g. `v1.0.2-beta.15`: https://github.com/booleans-oss/DiscordModMail
- `next` release: https://github.com/booleans-oss/DiscordModMail

## Deployment 🌱

### 1. Install the repo
Install using [git](https://github.com/booleans-oss/DiscordModMail):

    git clone git@github.com:booleans-oss/DiscordModMail.git

### 2. Depedencies installation
Install using [npm](https://docs.npmjs.com/getting-started/what-is-npm):

    npm i

or using [yarn](https://yarnpkg.com);

### 3. Setup the information
Change the ID's and Token inside the **.env** file to assure that the bot works.
``GUILD_ID`` = ID of the guild the bot is in.
``CHANNEL_STAFF`` = ID of the staff channel (where tickets will be posted)
``ROLE_STAFF`` = ID of the staff role (role needed to approve or refused a ticket)
``TOKEN_BOT`` = Bot's token

### 3. Starting the project
Using internal implemented script

    npm run start

or using [node](https://nodejs.com);

    node src/index.js


### 4. Enjoy :smile:

## Choice 💡

You need to choose between ModMail and TicketChannel. You can't have the two folders. 
**ModMail** is when the user only writes in the DM and the messages will appear in the STAFF channel.
**TicketChannel** is the same principle of ModMail but the bot will create a channel for each ticket approved where the user's message will be sent.

-----------
## Development
see [CONTRIBUTING.md](.github/CONTRIBUTING.md)
