const { Encrypt } = require('../module/Encryption.js');
module.exports.run = (client, message, args) => {
  let val = Encrypt(args.join(' '));
  message.channel.send(val);
  require('../module/report.js').report(client, message, Date.now());
};

module.exports.info = {
  category: 'Admin',
  name: 'encrypt',
  description: 'TEMPLATE',
  authLevel: 4
};
