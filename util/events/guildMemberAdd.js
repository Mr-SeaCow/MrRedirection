module.exports = (client, member, botSettings) => {
  switch (client.user.id) {
    case "505867658386997268":
      {
        let guild = member.guild;
        if (!botSettings.servers[guild.id].nmr) return;

        let roleID = botSettings.servers[guild.id].nmr;
        let role = guild.roles.find((x) => x.id === roleID);

        member.addRole(role);

        break;
      }
  }
};
