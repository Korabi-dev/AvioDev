module.exports = {
    guild: true,
    aliases: ["warns"],
    permissions: ["MANAGE_MESSAGES"],
     run: async(client, message, embed) => {
        let user = message.mentions.users.first()
        if(!user) return message.reply(client.embed("Error", "You must provide a user"))
        const data = await client.models.warnings.findOne({guild: message.guild.id, user: user.id})
        if(data){
            const warnings = [];
            let index = 0
            data.warns.forEach(obj => {
                ++index
                warnings.push(`**${index}. ID: #${obj.id} | Moderator: ${obj.moderator}**\n${obj.reason}`)
            })
            if(warnings.length < 1) return message.reply(client.embed(`Clean.`, `${user} Has no active warnings.`))
            if(warnings.length > 0){
                return message.reply(client.embed(` ${warnings.length} Warnings For ${user.tag}`, `${warnings.join("\n")}`))
            }
        } else {
            return message.reply(client.embed(`Clean.`, `${user} Has no active warnings.`))
        }
     }
}