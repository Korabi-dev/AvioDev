module.exports = {
    run: async(client, message, args) => {
        const m = client.snipes.get(message.channel.id)
        if(!m) return message.reply(client.embed("Error", "There is nothing to snipe."))
        message.reply(client.embed().setAuthor(m.author.tag, m.author.avatarURL({dynamic: true})).setDescription(m.content))
    }
}