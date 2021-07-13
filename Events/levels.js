module.exports = {
    name: "message",
    run: async(message, client) => {
        if(message.author.bot) return;
        var canrun = true
        const d1 = await client.models.guildlevels.findOne({guild: message.guild.id})
        if(d1){
            if(d1.enabled == false) canrun = false
        }else if(!d1){
            const newd1 = new client.models.guildlevels({
                guild: message.guild.id,
                enabled: true
            })
            await newd1.save()
        }
if(canrun == true){
        const d = await client.models.levels.findOne({user: message.author.id, guild: message.guild.id})
        if(d){
            d.xp = d.xp + d.multiplier * 10
            await d.save()
            if(d.needed <= d.xp){
                d.level = d.level + 1
                d.xp = 0
                d.needed = d.needed * 1.5
                await d.save()
               return message.mentionReply(client.embed("Congratulations", `You have leveled up to level ${d.level}!`))
            }
        } else {
            const newd = new client.models.levels({
                user: message.author.id,
                guild: message.guild.id,
                level: 0,
                xp: 0,
                needed: 69,
                multiplier: 1
            })
            await newd.save()
        }
    }
}
}