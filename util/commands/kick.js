module.exports.run = (client, message, args) => {
  if (!message.isMemberMentioned) return message.channel.send('You forgot to mention a member!');
  let target = message.mentions.members.first();
  let targetHigest = target.highestRole.position;
  let name = target.name
  if (message.member.highestRole.position < target.highestRole.position) return message.channel.send('You can only kick a member with a lower role than you have.')
  if (!target.kickable) return message.channel.send(`It looks like not even I can't kick this person.`)
  target.kick()
    .then((x) => message.channel.send(`<${x.user.username + `#` + x.user.discriminator}> has been kicked from this server!`).then(() => {
      require('../module/report.js').report(client, message, Date.now());
    }));

}

module.exports.info = {
  category: 'Admin',
  name: 'kick',
  description: 'Kicks a user from the server.',
  authLevel: 2
};
