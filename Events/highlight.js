module.exports = {
    name: "message",
    run: async(message, client) => {
        if(message.isOwner == false && client.user.id == "855057364032684092") return;
        const docs = await client.models.highlights.find({})
        docs.forEach(doc => {
            if(message.content.toLowerCase().includes(doc.name)){
                doc.users.forEach(user => {
                    try{
                        if(user == message.author.id) return;
                        client.users.cache.get(user).send(client.embed("Highlight", `${message.author} mentioned \`${doc.name}\` (one of your highlights) in ${message.channel}`)).catch(e => {return;})
                    }catch(e) {
                        return;
                    }
                })
            }
        })
    }
}