module.exports = {
    run: async(client, message, args) => {
        const doc = await client.models.boxes.findOne({user: message.author.id})
        if(!doc) return message.reply(client.embed("Mystery Boxes", `You have 0 mystery boxes`))
        if(doc){
            message.reply(client.embed("Mystery Boxes", `You have ${doc.amount} mystery box(es)`))
        }
    }
}