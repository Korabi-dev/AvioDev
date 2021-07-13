const { splitMessage } = require("discord.js")
module.exports = {
    timeout: 10000,
    run: async(client, message, args) => {
        const d = await client.models.economy.findOne({user: message.author.id})
        if(d){
            const items = []
            d.backpack.forEach(item => {
                item = client.getShopItem(item.name) || item
                items.push(`\`\`\`\nItem Name: ${item.name}\nItem Description: ${item.description}\nItem Price: ${item.price}\nItem Multiplier: ${item.multiplier}\n\`\`\``)
            })
            if(items.length < 1) return message.reply(client.embed("BackPack", `Your packpack is empty.`))
            let split = splitMessage(items.join("\n"))
            let index = 1
            let all = split.length
            split.forEach(async(msgg) => {
              await message.reply(client.embed(`Backpack (${index}/${all})`, msgg))
            });
        }
    }
}