module.exports = {
    permissions: ["MANAGE_CHANNELS"],
    run: async(client, message, args) => {
        if(!args[0]) return message.reply(client.embed("Error", "You need to provide a channel"))
        let channel = message.mentions?.channels?.first() || message.guild.channels.cache.get(args[0])
        if(!channel) return message.reply(client.embed("Error", "You need to provide a valid channel"))
        const data = await client.models.chatbot.findOne({guild: message.guild.id})
        if(!data){
            const newd = new client.models.chatbot({
                guild: message.guild.id,
                enabled: true,
                channel: channel.id

            })
            await newd.save()
        } else {
            data.channel = channel.id
            await data.save()
        }
        message.reply(client.embed("Success", `${channel} was saved as the chatbot channel`))
    }
}