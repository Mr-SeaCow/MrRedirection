const asciiLetters = require('../../data/asciiLetters.json');
const H = Object.keys(asciiLetters["A"]).length;
console.log(H)
let L = 20;

//console.log(f)
module.exports.run = (client, message, args) => {

  if (!args[0]) return message.channel.send('Please specify a message.')

  let combArgs = args.join(' ')
  if (require('../module/blacklisted.js')(client, message) === true) return message.channel.send('Please abstain from explicit language.')
  message.channel.send(buildMessage(combArgs), { code: true })
  require('../module/report.js').report(client, message, Date.now());
};

function buildMessage(Text) {
  let str = ''

  for (let height = 0; height < H; height++) {
    for (let l = 0; l < Text.length; l++) {
      if (Text[l] !== ' ') {
        if (asciiLetters[Text[l].toUpperCase()]) {
          str = str + asciiLetters[Text[l].toUpperCase()][height]
        }
        else {
          str = str + asciiLetters['?'][height]
        }
      }
      else {
        str = str + '    '
      }
    }
    if (height !== H - 1) {
      str = str + '\n'
    }
  }
  return str
}

module.exports.info = {
  category: 'Miscellaneous',
  name: 'ascii',
  description: 'TEMPLATE',
  authLevel: 1
};
