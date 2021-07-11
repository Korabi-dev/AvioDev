module.exports = {
    timeout: 20000,
    run: async(client, message, args) => {
        if(!args[0]) return message.reply(client.embed("Error", "You need to provide an item to purchase"))
        const item = client.getShopItem(args[0])
        if(!item) return message.reply(client.embed("Error", "Item not found."))
        const d = await client.models.economy.findOne({user: message.author.id})
        if(d){
            const has = d.backpack.filter(i => {
                return i.name.toLowerCase() == args[0].toLowerCase()
            })
            if(has.length > 0) return message.reply(client.embed("Error", "You already own this item."))
            if(d.wallet < item.price && message.isOwner == false) return message.reply("Error", `You need $${item.price - d.wallet} more money to buy this.`)
            d.wallet = d.wallet - item.price
            d.backpack.push(item)
        await d.save()
        return message.reply(client.embed(`Bought Item`, `\`\`\`\nItem Name: ${item.name}\nItem Description: ${item.description}\nItem Price: ${item.price}\nItem Multiplier: ${item.multiplier}\n\`\`\``))
        }
    }
}