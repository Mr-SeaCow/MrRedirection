const fs = require('fs');
module.exports = (client, guild, botSettings) => {
  switch (client.user.id) {
    case "505867658386997268":
      {
        botSettings.servers[guild.id] = {
          "prefix": "!"
        };
        fs.writeFileSync('../Bot/config/botsettings.json', JSON.stringify(botSettings, null, 4));
        client.servers = botSettings.servers;
        break;
      }
  }
  fs.writeFileSync('../Bot/config/botsettings.json', JSON.stringify(botSettings, null, 4));
};
