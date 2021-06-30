module.exports = {
    permissions: ["MANAGE_GUILD"],
    guild: true,
    run: async(client, message, args) => {
        const status = "Denied."
        args[0] = args[0].replace("#", "")
        if(!args[0] || isNaN(args[0])) return message.reply(client.embed("Error", "You need to provide a **valid** suggestion id."))
        const data = await client.models.suggestions.findOne({guild: message.guild.id})
        if(data){
            const suggestion = await client.models.suggestion.findOne({guild: message.guild.id, id: Number(args[0])})
            if(suggestion){
                suggestion.status = status
                await suggestion.save()
                const channel = await message.guild.channels.cache.get(suggestion.channel)
                if(channel){
                    const m = await channel.messages.fetch(suggestion.message).catch(e => {
                        message.react("❌")
                        message.reply(client.embed("Partial Success", `Set suggestion status to ${status}, but could not find suggestion message to edit`))
                    })
                    if(m){
                        await m.reactions.removeAll().catch(e => {return;})
                    await m.edit("\u200b", client.embed("New suggestion", `${suggestion.suggestion}`).addField("Status:", `\`\`\`${status}\`\`\``, false).addField("ID:", `\`\`\`#${suggestion.id}\`\`\``,false).setFooter(`Suggested By: ${suggestion.author}`))
                message.react("✅")   
                }
                } else {
                    message.react("❌")
                    message.reply(client.embed("Partial Success", `Set suggestion status to ${status}, but could not find suggestion message channel so it could not be edited.`))
                }
            } else {
                return message.reply(client.embed("Error", "You need to provide a **valid** suggestion id."))
            }
        } else {
            return message.reply(client.embed("Error", "The suggestion server for this server is not set up."))
        }
    }
}