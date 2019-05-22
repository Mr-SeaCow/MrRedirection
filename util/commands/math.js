const wolfram = require('wolfram').createClient('97K5GX-7HH4TGL28P');
//const browserless = require('browserless')
module.exports.run = (client, message, args) => {
  wolfram.query(args.join(' '), function(err, result) {
    if (err) throw err
    let embed = {
      embed: {}
    }
    for (let i = 0; i < result.length; i++) {
      if (result[i].primary === true) {
        embed.embed = {
          color: 6234471,
          author: {
            name: result[i].title,
          },
          description: result[i].subpods[0].value.replace(/integral/gi, '∫'),
          timestamp: new Date()
        }
      }
      else {
        embed.embed.image = {
          url: result[1].subpods[0].image
        }
      }
    }
    message.channel.send(embed);
  })
  require('../module/report.js').report(client, message, Date.now());
};

module.exports.info = {
  category: 'Miscellaneous',
  name: 'math',
  description: 'Evaluates math expressions.',
  authLevel: 4
};
