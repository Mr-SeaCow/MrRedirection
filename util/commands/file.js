const FileNames = ['rlStorage', 'commandStorage', 'ranksOld', 'ranks'];
const fileFunc = (file) => { return `../../data/${file}.json` };

module.exports.run = (client, message, args) => {
  if (isNaN(args[0])) return message.channel.send('Please enter a number!');
  if (FileNames.length < args[0]) return message.channel.send('That file does not exist.');
  let file = require(fileFunc(FileNames[Number(args[0]) - 1]));
  message.channel.send(JSON.stringify(file, null, 4), { code: 'JSON', split: true });

  require('../module/report.js').report(client, message, Date.now());
};

module.exports.info = {
  category: 'Admin',
  name: 'file',
  description: 'Displays a JSON file.',
  authLevel: 4
};
