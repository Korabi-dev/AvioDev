module.exports = {
    timeout: 10000,
    run: async(client, message, args) => {
        var user = message.mentions?.users?.first()
        if(!user) return message.reply(client.embed("Error", `You need to provide a user.`))
        if(!args[1] || isNaN(args[1])) return message.reply(client.embed("Error", `You must provide a valid amount.`))
        const d = await client.models.economy.findOne({user: message.author.id})
        const d1 = await client.models.economy.findOne({user: user.id})
        if(d && d1){
            if(d.passive == true && message.isOwner == false ) return message.reply(client.embed("Error", "You are in passive mode.")) 
            if(d1.passive == true && message.isOwner == false ) return message.reply(client.embed("Error", "This user is in passive mode."))
            const num = Number(args[1])
            if((d.wallet - num) < 0 && message.isOwner == false) return message.reply(client.embed("Error", "You dont have enough money to perform this action."))
            if(message.isOwner == false){
                d.wallet = d.wallet - num
            }
            d1.wallet = d1.wallet + num
            await d1.save()
            await d.save()
            return message.reply(client.embed(`Success`, `You successfully gave ${user} $${num}.`))
        } else if(d && !d1){
            if(user.bot) return message.reply(client.embed("Error", "You can not give money to a bot."))
            const num = Number(args[1])
            if(d.passive == true && message.isOwner == false) return message.reply(client.embed("Error", "You are in passive mode."))  
            if((d.wallet - num) < 0 && message.isOwner == false) return message.reply(client.embed("Error", "You dont have enough money to perform this action."))
            if(message.isOwner == false){
                d.wallet = d.wallet - num
            }
            const newd = new client.models.economy({
                user: user.id,
                passive: false, 
                multiply: 1,
                backpack: [],
                wallet: num,
                bank: 0,
            })
            await d.save()
            await newd.save()
            return message.reply(client.embed(`Success`, `You successfully gave ${user} $${num}.`))
        }
    }
}