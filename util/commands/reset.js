module.exports.run = (client, message, args) => {
  let guild = message.guild
  guild.fetchMembers().then((members) => {
    members.members.map((x) => {
      message.guild.fetchMember(x.user.id).then((x) => {
        x.setNickname('').then().catch((err) => { console.log(err) })
      })
      console.log('Finished');
    })
    /*
    for (let i = 0; i < keys.length; i++) {
      console.log(keys[i])
      message.guild.fetchMember(keys[i]).then((x) => {
        console.log(x)
        x.setNickname('').then((a) => console.log(a)).catch((err) => { console.log(err) })
      })
    }
    */
  })

}

module.exports.info = {
  category: 'Admin',
  name: 'reset',
  description: 'Kicks a user from the server.',
  authLevel: 3
};
