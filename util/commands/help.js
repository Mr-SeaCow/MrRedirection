function formMessage(header, body) {
  let msg = [header];
  let key_body = Object.keys(body);
  for (let i = 0; i < key_body.length; i++) {
    let tempHeader = upperCase(key_body[i])
    msg.push(`**${tempHeader}**`);
    let obj = body[key_body[i]];
    let key_i = Object.keys(obj);
    msg.push('```JSON');
    for (let a = 0; a < key_i.length; a++) {
      let temp = obj[key_i[a]];
      msg.push(` ${temp.name}: "${temp.description}"`);
    }
    msg.push('```');
  }
  return msg
}

function upperCase(string) {
  let args = string.split(' ')
  for (let i = 0; i < args.length; i++) {
    args[i] = args[i].substring(0, 1).toUpperCase() + args[i].substring(1).toLowerCase();
  }
  return args.join(' ')
}
module.exports.run = (client, message, permLvl, prefix) => {
  let header = `To use a command in ${message.guild.name}, use \`${prefix}command\`.\n\n` +
    `__**Available commands in ${message.guild.name}**__\n`
  let body = {}

  client.commands.forEach(x => {
    let i = x.info
    if (i.authLevel <= permLvl && i.category.toLowerCase() !== 'hidden' && client.servers[message.guild.id].blacklistedCategory.search(i.category)) {
      if (!body[i.category]) {
        body[i.category] = {
          [i.name]: {
            name: i.name,
            description: i.description
          }
        }
      }
      else {
        body[i.category][i.name] = {
          name: i.name,
          description: i.description
        }
      }
    }
  })
  message.author.send(formMessage(header, body), { split: true }).then(() => {
      require('../module/report.js').report(client, message, Date.now());
    })
    .catch(() => {
      message.channel.send('Seems like I\'m not able to direct message you.')
    })
}

module.exports.info = {
  category: 'hidden',
  name: 'help',
  description: '',
  authLevel: 1
}
