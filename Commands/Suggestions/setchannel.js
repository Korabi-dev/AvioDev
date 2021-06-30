module.exports = {
    permissions: ['MANAGE_GUILD'],
    guild: true,
    run: async(client, message, args) => {
        const channel = message.mentions.channels.first()
        if(!channel){
            return message.reply(client.embed("Error", "You need to provide a channel for this command to work"))
        }
        const data = await client.models.suggestions.findOne({guild: message.guild.id})
        if(data){
            data.channel = channel.id
            data.enabled = true
            await data.save()
            message.reply(client.embed("Success!", `Set the suggestion channel to ${channel}!`))
        } else {
            const newdata = new client.models.suggestions({
                guild: message.guild.id,
                enabled: true,
                channel: channel.id
            })
            await newdata.save()
            message.reply(client.embed("Success!", `Set the suggestion channel to ${channel}!`))
        }
    }
}