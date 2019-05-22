module.exports.run = (client, message, args) => {
  message.channel.send({
    embed: {
      color: 6234471,
      author: {
        name: message.guild.name
      },
      thumbnail: {
        url: message.guild.iconURL
      },
      fields: [{
        name: 'Member Count',
        value: message.guild.memberCount
      }],
      timestamp: new Date()
    }
  });
  require('../module/report.js').report(client, message, Date.now());
};

module.exports.info = {
  category: 'Information',
  name: 'serverinfo',
  description: 'Displays information about the Discord server.',
  authLevel: 0
};
