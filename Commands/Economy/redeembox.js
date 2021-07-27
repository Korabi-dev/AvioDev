module.exports = {
    run: async(client, message, args) => {
        const doc = await client.models.boxes.findOne({user: message.author.id})
        const votes = await client.models.votes.findOne({user: message.author.id})
        if(doc && votes){
            const need = doc.last + 2
            if(need > votes.votes.length && message.isOwner == false) return message.reply(client.embed("Error", `You need ${need - votes.votes.length} more vote(s) to use this command.`))
            doc.last = doc.last + 2
            doc.amount = doc.amount + 1
            doc.total = doc.total + 1
            await doc.save()
            message.reply(client.embed("Success", "You have redeemed 1 mystery box"))
        }
        if(!votes) return message.reply(client.embed("Error", "You need 2 more votes to use this command."))
        if(!doc){
            if(2 > votes.votes.length && message.isOwner == false) return message.reply(client.embed("Error", `You need ${2 - votes.votes.length} more vote(s) to use this command.`))
            const newd = new client.models.boxes({user: message.author.id, amount: 1, total: 1})
            await newd.save()
            message.reply(client.embed("Success", "You have redeemed 1 mystery box"))
        }
    }
}