module.exports = {
    permissions: ["MANAGE_GUILD"],
    run: async(client, message, args) => {
        var role = message.mentions?.roles?.first()?.id
        if(!role && !args[0])return message.reply(client.embed("Error", "you must mention a role/role id."))
        if(!role){
            role = message.guild.roles.cache.find(r => r.id == args[0] || r.name.toLowerCase() == args[0].toLowerCase())?.id
        }
        if(!role)return message.reply(client.embed("Error", "you must mention a valid role/role id."))

        const idmanager = await client.models.guildtickets.findOne({guild: message.guild.id})
        const allowed = []
        if(idmanager){
           idmanager.allowed.push(role)
           await idmanager.save()
        } else {
            const newidmanager = new client.models.guildtickets({
                guild: message.guild.id,
                current: 0,
                allowed: [role]
            })
            await newidmanager.save()
        }
        message.reply(client.embed("Success", `Role with ID \`${role}\` was added to the helpers list.`))
    }
}