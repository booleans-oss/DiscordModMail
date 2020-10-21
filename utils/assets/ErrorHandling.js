const fs = require('fs')
const verif = async function () {
    let mandatory_modules = ["discord.js", "Dotenv"];
    await Promise.all(mandatory_modules.map(module => { if(!isModuleInstalled(module)) throw new Error(`${module} n'a pas été installé.`) }))
}

function isModuleInstalled(name) {
    try {
        require.resolve(name);
        return true;
    } catch(e){

    }
    return false;
}

module.exports = verif;