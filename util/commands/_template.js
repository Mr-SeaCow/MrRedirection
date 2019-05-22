module.exports.run = (client, message, args) => {
  require('../module/report.js').report(client, message, Date.now());
};

module.exports.info = {
  category: 'TEMPLATE',
  name: 'template',
  description: 'TEMPLATE',
  authLevel: 99999
};
