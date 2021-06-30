module.exports = {
    guild: true,
    run: async(client, message, args) => {
        const data = await client.models.suggestions.findOne({guild: message.guild.id})
        args[0] = args[0].replace("#", "")
        if(!args[0] || isNaN(args[0])) return message.reply(client.embed("Error", "You need to provide a **valid** suggestion id."))
        if(data){
            const suggestion = await client.models.suggestion.findOne({guild: message.guild.id, id: Number(args[0])})
            if(suggestion){
                message.reply(client.embed("Suggestion Info", `${suggestion.suggestion}`).addField("Status:", `\`\`\`${suggestion.status}\`\`\``, false).addField("ID:", `\`\`\`#${suggestion.id}\`\`\``,false).setFooter(`Suggested By: ${suggestion.author}`))
            }else {
                return message.reply(client.embed("Error", "You need to provide a **valid** suggestion id."))
            }
        }else{
        return message.reply(client.embed("Error", "The suggestion server for this server is not set up."))
        }
    }
}