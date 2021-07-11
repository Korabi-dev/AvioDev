const { random } = require("mathjs")

module.exports = {
    timeout: 20000,
    run: async(client, message, args) =>{
        var user = message.mentions?.users?.first()
        if(!user) return message.reply(client.embed("Error", `You need to provide a user.`))
        const d1 = await client.models.economy.findOne({user: message.author.id})
        if(d1){
            if(d1.passive == true && message.isOwner == false ) return message.reply(client.embed("Error", "You are in passive mode.")) 
            if(d1.wallet < 500 && message.isOwner == false) return message.reply(client.embed("Error", "You need to have $500+ to rob someone.")) 
        }else {
            const newd = new client.models.economy({
                user: message.author.id,
                wallet: 0,
                bank: 0,
                passive: false,
                multiply: 1
            })
            await newd.save()
            return message.reply(client.embed("Error", "You need to have $500+ to rob someone.")) 
        }
        const d = await client.models.economy.findOne({user: user.id})
        if(d){
        if(d.passive == true && message.isOwner == false) return message.reply(client.embed("Error", "This user is in passive mode."))    
        if(d.wallet < 500) return message.reply(client.embed("Error", "This user does not have $500+ in their wallet, it isn't worth robbing them.")) 
        const p = Math.floor(random(500, d.wallet / 2))
        const con = Math.floor(random(500, d1.wallet / 2))
        const chance = Math.floor(random(0, 100))
        if(chance < 51 && message.isOwner == false) {
            d1.wallet = d1.wallet - con
            d.wallet = d.wallet + con
            await d.save()
            await d1.save()
            return message.reply(client.embed("Caught!", `You got caught and had to pay the user you were trying to rob $${con}`))
        } else if(chance >= 50 || message.isOwner == true) {
            d.wallet = d.wallet - p
            d1.wallet = d1.wallet + p
            await d.save()
            await d1.save()
            return message.reply(client.embed("Robbed!", `You sucessfully robbed <@${d.user}> out of $${p}`))
        }
        }else {
            return message.reply(client.embed("Error", "This user does not have $500+ in their wallet, it isn't worth robbing them.")) 
        }
    }
}