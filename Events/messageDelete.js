module.exports = {
    name: "messageDelete",
    run: async(message, client) => {
        if(message.author.bor) return;
        client.snipes.set(message.channel.id, message)
    }
}