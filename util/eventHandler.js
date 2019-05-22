const reqEvent = (event) => require(`./events/${event}.js`);
module.exports = (client, settings) => {

  client.on('ready', () => { reqEvent('ready')(client, settings) });
  client.on('message', (message) => { reqEvent('message')(client, message) });
  client.on('guildCreate', (guild) => { reqEvent('guildCreate')(client, guild, settings) });
  client.on('guildMemberAdd', (member) => { reqEvent('guildMemberAdd')(client, member, settings) });
  client.on('voiceStateUpdate', (oldMember, newMember) => { reqEvent('voiceStateUpdate')(client, oldMember, newMember, settings) });
  /*
    client.on('reconnecting', () => {reqEvent('reconnecting')(client)});
    client.on('disconnect', () => {reqEvent('disconnect')(client)});
    client.on('guildMemberAdd', (member) => {reqEvent('guildMemberAdd')(member)});
    client.on('guildMemberRemove', (member) => {reqEvent('guildMemberRemove')(member)});
    client.on('guildBanAdd', (member) => {reqEvent('guildBanAdd')(member)});
    client.on('guildBanRemove', (member) => {reqEvent('guildBanRemove')(member)});
  */
};
