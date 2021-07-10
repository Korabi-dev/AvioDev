module.exports = {
    timeout: 10000,
    aliases: ["bal"],
    run: async(client, message, args) => {
        var user = message.mentions?.users?.first()
        if(!user) user = message.author
        const d = await client.models.economy.findOne({user: user.id})
        if(d){
            message.reply(client.embed(`${user.tag}'s Balance`, `**Bank:** $${d.bank}\n**Wallet:** $${d.wallet}\n**Multiplier:** x${d.multiply}`))
        } else {
            message.reply(client.embed(`${user.tag}'s Balance`, `**Bank:** $0\n**Wallet:** $0\n**Multiplier:** x1`))
        }
    }
}