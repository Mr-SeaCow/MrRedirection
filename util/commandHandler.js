const fs = require('fs');
module.exports = (client) => {

  fs.readdir('./util/commands/', (err, files) => {
    if (err) return console.log(err);
    let commands = files.filter(f => f.split('.').pop() === 'js');
    if (commands.length <= 0) return;

    commands.forEach((f, i) => {
      let cmds = require(`./commands/${f}`);
      client.commandStorage[cmds.info.category + i] = {
        category: cmds.info.category,
        command: cmds.info.name,
        description: cmds.info.description,
        authLevel: cmds.info.authLevel
      };
      client.commands.set(cmds.info.name, cmds);
    });
  })

}
