const { evaluate, random } = require("mathjs")

module.exports = {
    timeout: 86400000,
    run: async(client, message, args) =>{ 
        const d = await client.models.economy.findOne({user: message.author.id})
        if(d){
         const income = Math.floor(random(1000,15000) * d.multiply)
         d.bank = d.bank + income
         await d.save()
         message.reply(client.embed("Daily Money", `Today you got $${income}, all of it was placed into your bank account.`))  
        } else {
            const income = Math.floor(random(1000, 15000))
            const newd = new client.models.economy({
                user: message.author.id,
                wallet: 0,
                bank: income,
                passive: false,
                multiply: 1,
                backpack: []
            })
            await newd.save()
            message.reply(client.embed("Daily Money", `Today you got $${income}, all of it was placed into your bank account.`))  
        }
     }
}