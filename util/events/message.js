const _settings = require('../../config/botsettings.json');

function pLevel(client, message) {
  // This function checks the permission level of the Author
  let owner = _settings.ownerID;
  if (message.author.id == owner) return 4;
  if (message.author.id == message.guild.ownerID) return 3;
  let guild = client.guilds.find((x) => x.id === message.guild.id);
  let member = guild.members.find((x) => x.id === message.author.id);
  if (member.hasPermission('ADMINISTRATOR')) return 2;
  return 1;
}

module.exports = (client, message) => {
  if (message.author.id === client.user.id) return; // Prevents the bot from activating another cmd
  require('../module/blacklisted.js')(client, message)
  let settings = client.servers; // Grabs the server settings from the bot
  let prefix = settings[message.guild.id].prefix; // Grabs the server settings from the bot
  if (message.channel.id == '355080569132023810' && (message.content.search(/www.gifyourgame.com/i) != -1)) {
    message.delete(1000)
    message.reply('Post your gifs in the new <#546411077521506304> channel , thank you.').then((x) => x.delete(5000))
  }
  if (message.channel.id == '546411077521506304' && (message.content.search(/www.gifyourgame.com/i) == -1)) {
    message.delete()
    message.reply('Please keep normal chatter out of this channel, thank you.').then((x) => x.delete(5000))
  }
  if (!message.content.startsWith(prefix) && !message.content.startsWith('!prefix')) return; // Checks if message begins with the prefix
  if (message.content.startsWith(`${prefix}rs`) && message.author.id === _settings.ownerID) return message.channel.send('Restarting myself...').then(() => process.exit(0));
  let args = message.content.split(' '); // Splits the message contents into an array
  let cmd = client.commands.get(args.shift() // Removes the command from the array
    .substr(prefix.length).toLowerCase()); // Removes the prefix from the command

  if (!cmd) return; // Checks if the cmd exists

  let permLevel = pLevel(client, message); // Gets the permission level of the author

  if (cmd.info.name === 'help') {
    return cmd.run(client, message, permLevel, prefix); // Runs the help command with permissionLevel passed
  }
  if (cmd.info.category == client.servers[message.guild.id].blacklistedCategory) return;
  if (permLevel < cmd.info.authLevel) return message.channel.send('Seems like your permission level is too low to use this command.'); // Is the author allowed to use this command?
  cmd.run(client, message, args); // Activates the command

};
