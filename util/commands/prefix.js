const botSettings = require('../../config/botsettings.json');
const fs = require('fs');
module.exports.run = (client, message, args) => {

  if (!args[0]) return message.channel.send('You are missing a prefix.');
  botSettings.servers[message.guild.id].prefix = args[0];
  fs.writeFileSync('../Bot/config/botsettings.json', JSON.stringify(botSettings, null, 4));
  client.servers = botSettings.servers;
  require('../module/report.js').report(client, message, Date.now());
};

module.exports.info = {
  category: 'Admin',
  name: 'prefix',
  description: 'Changes the command prefix.',
  authLevel: 3
};
