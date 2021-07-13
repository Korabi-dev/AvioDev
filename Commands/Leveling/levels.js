module.exports = {
    run: async(client, message, args) => {
        const docs = await client.models.levels.find({guild: message.guild.id})
        const lb = await docs.sort((a, b) => b.level - a.level)
        const embed = client.embed()
        var index = 0
        lb.forEach(user => {
            if(index <= 10 && user.level > 0 && index <= lb.length){
                ++index
            embed.addField(`\`${client.users.cache.get(user.user).username || "Unknown User"}\``, user.level)
            }
        })
        embed.setDescription(`Top ${index} users for ${message.guild.username}`)
        return message.reply(embed)
    }
}