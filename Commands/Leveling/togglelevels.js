module.exports = {
    permissions: ["MANAGE_GUILD"],
    run: async(client, message, args) =>{
        const d = await client.models.guildlevels.findOne({guild: message.guild.id})
        if(d){
            const toggle = !d.enabled
            d.enabled = toggle
            await d.save()
            message.reply(client.embed("Success", `Toggled level system to \`${toggle}\``))
        } else {
            message.reply(client.embed("Error", "Server not found in database, please try again in 5 seconds."))
        }
    }
}