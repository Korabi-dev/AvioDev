module.exports = {
    run: async(client, message, args) =>{
        const docs = await client.models.economy.find({})
        const lb = await docs.sort((a,b) => (b.wallet + b.bank) - (a.wallet + a.bank))
        const embed = client.embed()
        let index = 0
        lb.forEach(user => {
            if(index <= 10 && index <= lb.length && (user.bank + user.wallet) > 0){
            ++index
            embed.addField(`\`${client.users.cache.get(user.user).username || "Unknown User"}\``, `$${user.bank + user.wallet}`)
            }
        })
        embed.setTitle(`Top ${index} Economy Users`)
        message.reply(embed)
    }
}