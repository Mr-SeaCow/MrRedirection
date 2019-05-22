module.exports.run = (client, message, args) => {
  if (!message.isMemberMentioned) return message.channel.send('You forgot to mention a member!');
  let target = message.mentions.members.first();

  if (!target.bannable) return message.channel.send(`It looks like not even I can't ban this person.`);
  target.ban()
    .then((x) => message.channel.send(`<${x.user.username + `#` + x.user.discriminator}> has been banned from this server!`).then(() => {
      require('../module/report.js').report(client, message, Date.now());
    }));
  require('../module/report.js').report(client, message, Date.now());
};

module.exports.info = {
  category: 'Admin',
  name: 'ban',
  description: 'Bans a user from the guild.',
  authLevel: 3
};
