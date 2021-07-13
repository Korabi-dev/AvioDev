module.exports = {
    run: async(client, message, args) => {
        var user = message.mentions?.users?.first()
        if(!user) user = message.author
        const d = await client.models.levels.findOne({user: user.id, guild: message.guild.id})
        if(d){
            const embed = client.embed(`Level info for ${user.tag}`, `**Level:** ${d.level || "0"}\n**XP:** ${d.xp || "0"}\n**Multiplier:** x${d.multiplier || "0"}`)
            message.reply(embed)
        } else {
            const embed = client.embed(`Level info for ${user.tag}`, `**Level:** 0\n**XP:** 0\n**Multiplier:** x1`)
        }
    }
}