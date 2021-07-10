module.exports = {
    timeout: 10000,
    aliases: ["with"],
    run: async(client, message, args) => {
        if(!args[0]) return message.reply(client.embed("Error", `You need to provide an amount.`))
        if(isNaN(args[0]) && args[0].toLowerCase() !== "all" || args[0] == "0") return message.reply(client.embed("Error", `You need to provide a valid amount.`))
        args[0] = String(args[0])
        const d = await client.models.economy.findOne({user: message.author.id})
        if(d){
            if(d.bank < 1) return message.reply(client.embed("Error", "Your bank account is empty."))
           if(args[0].toLowerCase() == "all") args[0] = d.bank
            args[0] = Number(args[0])
            if(args[0] > d.bank) return message.reply(client.embed("Error", `You need ${args[0] - d.bank} more money to perform this action.`))
            d.bank = d.bank - args[0]
            d.wallet = d.wallet + args[0]
            await d.save()
            return message.reply(client.embed("Sucess", `Withdrew $${args[0]} from your bank and placed it in your wallet.`))
        } else {
            const newd = new client.models.economy({
                user: message.author.id,
                wallet: 0,
                bank: 0,
                passive: false,
                multiply: 1,
                backpack: []
            })
            await newd.save()
            return message.reply(client.embed("Error", `You need ${args[0]} more money to perform this action.`))
        }
    }
}