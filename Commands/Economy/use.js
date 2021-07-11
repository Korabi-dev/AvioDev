module.exports = {
    timeout: 20000,
    run: async(client, message, args) => {
        if(!args[0]) return message.reply(client.embed("Errror", "You must provide an item to use."))
        const d = await client.models.economy.findOne({user: message.author.id})
        if(d){
            if(d.backpack.length < 1)return message.reply(client.embed("Errror", "Your backpack is empty."))
            let item = d.backpack.filter(o => {
                return o.name.toLowerCase() == args[0].toLowerCase()
            })
            if(item[0]){
                item = item[0]
                d.backpack.remove(item)
                d.multiply = item.multiplier + d.multiply
                await d.save()
                return message.reply(client.embed("Item used", `You used a ${item.name} for a multiplier of +${item.multiplier}.`))
            }else {
                return message.reply(client.embed("Errror", "That item is not in your backpack."))
            }
        }
    }
}