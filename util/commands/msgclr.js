module.exports.run = (client, message, args) => {
  if (!args[0] || isNaN(args[0])) return message.channel.send('Please provide the number of messages to delete!');
  if (Number(args[0]) < 2 || Number(args[0]) > 100) return message.channel.send('Please provide the number between 2-100');
  message.channel.fetchMessages({ limit: Number(args[0]) })
    .then((list) => {
      message.channel.bulkDelete(list, true).then(() => {
        require('../module/report.js').report(client, message, Date.now());
      })
    })
    .catch(console.error)
};

module.exports.info = {
  category: 'Admin',
  name: 'msgclr',
  description: 'Deletes the designated amount of message from a channel.',
  authLevel: 2
};
