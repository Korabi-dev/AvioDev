const { random } = require("mathjs")

module.exports = {
    run: async(client, message, args) => {
        const doc = await client.models.boxes.findOne({user: message.author.id})
        let to = 1
        if(args[0] && !isNaN(args[0])) to = Number(args[0])
        if(!doc) return message.reply(client.embed("Error", `You need ${to} more mystery box(es).`))
        if(doc){
            if(doc.amount < to && message.isOwner == false)return message.reply(client.embed("Error", `You need ${to - doc.amount} more mystery box(es).`))
        const money = Math.floor(random(2000, 10000) * to);
        doc.amount = doc.amount - to
        await doc.save()
            const economy = await client.models.economy.findOne({user: message.author.id})
            if(economy){
                economy.bank = economy.bank + money
                await economy.save()
            } else {
            const newd = new client.models.economy({
            bank: money,
            user: message.author.id
            })
            await newd.save()
            }
            message.reply(client.embed("Mystery Box Used", `You have recieved $${money} from this mystery box`))
        }
    }
}