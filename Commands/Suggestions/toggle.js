module.exports = {
    guild: true,
    permissions: ["MANAGE_GUILD"],
    run: async(client, message, args) => {
        const data = await client.models.suggestions.findOne({guild: message.guild.id})
        if(data){
            if(data.enabled == true){
                data.enabled = false
                await data.save()
                message.reply(client.embed("Success!", "The suggestion system for this server is now disabled."))
            } else {
                data.enabled = true
                await data.save()
                message.reply(client.embed("Success!", "The suggestion system for this server is now enabled."))
            }
        } else{
            return message.reply(client.embed("Error", "The suggestion server for this server is not set up."))
        }
    }
}