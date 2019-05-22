const { Decrypt } = require('../module/Encryption.js');
module.exports.run = (client, message, args) => {
  let val = Decrypt(args.join(' '));
  message.channel.send(val);
  require('../module/report.js').report(client, message, Date.now());
};

module.exports.info = {
  category: 'Admin',
  name: 'decrypt',
  description: 'TEMPLATE',
  authLevel: 4
};
