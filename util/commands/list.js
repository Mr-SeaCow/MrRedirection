module.exports.run = (client, message, args) => {
  let target = (!args[0] ? message.author.id : args[0].replace('<@', '').replace('>', ''))
  let l = client.rlStorage[target];
  let lKeys = Object.keys(l);
  let newl = {};
  for (let i = 0; i < lKeys.length; i++) {
    if (lKeys[i].indexOf('lookup') != -1) {
      newl[lKeys[i].replace('lookup', '')] = l[lKeys[i]];
    }
  }
  message.channel.send(JSON.stringify(newl, null, 1), { code: 'JSON' });
  require('../module/report.js').report(client, message, Date.now());
};

module.exports.info = {
  category: 'Rocket League',
  name: 'list',
  description: 'Lists a players !rl presets.',
  authLevel: 1
};
