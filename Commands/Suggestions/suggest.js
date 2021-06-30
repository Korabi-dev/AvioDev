module.exports = {
    guild: true,
    botpermissions: ["ADD_REACTIONS"],
    run: async(client, message, args) => {
        const data = await client.models.suggestions.findOne({guild: message.guild.id})
        if(data){
            if(data.enabled == false) return message.reply(client.embed("Error", "Suggestions are disabled for this server."))
            if(!args[0]) return message.reply(client.embed("Error", "You need to provide a suggestion."))
            const channel = message.guild.channels.cache.get(data.channel)
            if(!channel) return message.reply(client.embed("Error", "Could not find suggestion channel."))
            const idh = await client.models.suggestionidhandler.findOne({guild: message.guild.id})
            if(idh){
                const id = idh.current + 1
             const m = await channel.send(client.embed("New suggestion", `${args.all}`).addField("Status:", "```Pending```", false).addField("ID:", `\`\`\`#${id}\`\`\``,false).setFooter(`Suggested By: ${message.author.tag}`)) 
             m.react("✅")
                m.react("❌")
                const sdata = new client.models.suggestion({
                    guild: message.guild.id,
                    message: m.id,
                    channel: channel.id,
                    status: "Pending", 
                    author: message.author.tag,
                    id: id,
                    suggestion: args.all
                })
                await sdata.save()
                idh.current = id
                await idh.save()
                message.react("✅")
            } else {
                const id = 0  
                const m = await channel.send(client.embed("New suggestion").addField("Suggestion:", `${args.all}`, true).addField("Status:", "```Pending```", false).addField("ID:", `\`\`\`#${id}\`\`\``,false).setFooter(`Suggested By: ${message.author.tag}`)) 
                m.react("✅")
                m.react("❌")

                const newd = new client.models.suggestionidhandler({
                    guild: message.guild.id,
                    current: 0
                })
             await newd.save()
                const sdata = new client.models.suggestion({
                    guild: message.guild.id,
                    message: m.id,
                    channel: channel.id,
                    status: "Pending", 
                    author: message.author.tag,
                    id: 0,
                    suggestion: args.all
                })
                await sdata.save()
                message.react("✅")
            }
        } else {
            return message.reply(client.embed("Error", "The suggestion server for this server is not set up."))
        }

    }
}