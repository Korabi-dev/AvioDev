module.exports = {
    timeout: 10000,
    run: async(client, message, args) => {
        var user = message.mentions?.users?.first()
        if(!user) return message.reply(client.embed("Error", `You need to provide a user.`))
        if(!args[1]) return message.reply(client.embed("Error", `You must provide an item.`))
        const d = await client.models.economy.findOne({user: message.author.id})
        const d1 = await client.models.economy.findOne({user: user.id})
        if(d && d1){
            let item = d.backpack.filter(obj => {
                return obj.name.toLowerCase() == args[1].toLowerCase()
            })
            item = item[0]
            if(!item) return message.reply(client.embed("Error", "You do not have this item in your backpack."))
            let hasitems = d1.backpack.filter(o => {
                return o.name.toLowerCase() == args[1].toLowerCase()
            })
            if(hasitems.length > 0) return message.reply(client.embed("Error", `This user already owns that item.`))
            if(d.passive == true && message.isOwner == false ) return message.reply(client.embed("Error", "You are in passive mode.")) 
            if(d1.passive == true && message.isOwner == false ) return message.reply(client.embed("Error", "This user is in passive mode."))
            if(message.isOwner == false){
                d.backpack.remove(Item)
            }
            d1.backpack.push(item)
            await d.save()
            await d1.save()
            return message.reply(client.embed("Success", `You successfully gave ${user} 1x ${item.name}`))
        } else if(d && !d1){
            let item = d.backpack.filter(obj => {
                return obj.name.toLowerCase() == args[1].toLowerCase()
            })
            item = item[0]
            if(!item) return message.reply(client.embed("Error", "You do not have this item in your backpack."))
            if(user.bot) return message.reply(client.embed("Error", "You can not give items to a bot."))
            if(d.passive == true && message.isOwner == false) return message.reply(client.embed("Error", "You are in passive mode."))
            if(message.isOwner == false){
                d.backpack.remove(item)
            }
            const newd = new client.models.economy({
                user: user.id,
                passive: false, 
                multiply: 1,
                backpack: [item],
                wallet: 0,
                bank: 0,
            })
            await d.save()
            await newd.save()
            return message.reply(client.embed(`Success`, `You successfully gave ${user} 1x ${item}.`))
        }
    }
}