const { splitMessage } = require("discord.js")
module.exports = {
    timeout: 10000,
    run: async(client, message,args) => {
        const items = []
            client.shop.forEach(item => {
                if(!item.hide){
                items.push(`\`\`\`\nItem Name: ${item.name}\nItem Description: ${item.description}\nItem Price: ${item.price}\nItem Multiplier: ${item.multiplier}\n\`\`\``)
            }})
            if(items.length < 1) return message.reply(client.embed("Shop", `No items to show.`))
        let split = splitMessage(items.join("\n"))
        let index = 1
        let all = split.length
        split.forEach(async(msgg) => {
          await message.reply(client.embed(`Shop (${index}/${all})`, msgg))
        });
    }
}