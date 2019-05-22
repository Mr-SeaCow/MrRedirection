const botSettings = require('../../config/botsettings.json');
const fs = require('fs');
module.exports.run = (client, message, args) => {

  if (!args[0]) return message.channel.send('You are missing a role id.');
  if (!message.guild.roles.find((x) => x.id === args[0])) return message.channel.send('You did not provide a sufficient role id.');
  botSettings.servers[message.guild.id]['nmr'] = String(args[0]);
  fs.writeFileSync('../Bot/config/botsettings.json', JSON.stringify(botSettings, null, 4));
  client.servers = botSettings.servers;
  require('../module/report.js').report(client, message, Date.now());

};

module.exports.info = {
  category: 'Admin',
  name: 'nmr',
  description: 'Gives a new member a role upon joining.',
  authLevel: 3
};
