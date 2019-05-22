const xl = require('excel4node');
const constants = require('../module/constants.js');
const steamApi = require('../module/steamApi.js');
const lifetimeStats = require('../module/lifetimeStats.js');
const gunStats = require('../module/gunStats.js');


module.exports.run = (client, message, args) => {
  if (args[0]) {

    steamApi.run(args[0], (res) => {
      if (res == 'private') return message.channel.send('Seems like this user\'s game data is private.')
      console.log(res.playerstats.steamID)
      let wb = new xl.Workbook();
      let ws = wb.addWorksheet('Lifetime Stats');
      let ws2 = wb.addWorksheet('Gun Stats');

      let bodyStyles = constants.getBodyStyles(wb);
      let format = constants.format

      lifetimeStats.run(wb, ws, res.playerstats.stats, bodyStyles, format)
      gunStats.run(wb, ws2, res.playerstats.stats, bodyStyles, format)

      wb.write('Excel.xlsx', function(err, stats) {
        if (err) {
          console.error(err);
        }
        else {
          message.channel.send({
            files: [{
              attachment: '../Bot/Excel.xlsx',
              name: `${args[0]}_stats.xlsx`
            }]

          })
        }
      });
    })
  }

  require('../module/report.js').report(client, message, Date.now());
};

module.exports.info = {
  category: 'CSGO',
  name: 'cs',
  description: 'Gets the user\'s CSGO stats',
  authLevel: 1
};
