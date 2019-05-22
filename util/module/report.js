module.exports.report = (client, message, time, error, blacklisted) => {
    if (blacklisted) {
        let blaclistedChannel = client.channels.find((x) => x.id === '511771570256216065');
        blaclistedChannel.send(`\`${message.author.username} said a bad word!\` ~~${blacklisted}~~`);
    }
    else if (!error) {
        let log = client.channels.find((x) => x.id === '489315833353469963');
        log.send(`\`"${message.content}" Took ${time - message.createdAt} MS.\``);
    }
};
