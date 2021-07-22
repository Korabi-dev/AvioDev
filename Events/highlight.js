module.exports = {
    name: "message",
    run: async(message, client) => {
        if(message.isOwner == false && client.user.id == "855057364032684092") return;
        if(message.author.bot) return;
        const docs = await client.models.highlights.find({})
        docs.forEach(doc => {
            if(message.content.toLowerCase().includes(doc.name)){
                doc.users.forEach(user => {
                    try{
                        if(user == message.author.id) return;
                        if(!message.guild.members.cache.get(user)) return;
                        client.users.cache.get(user).send(client.embed("Highlight", `${message.author.tag} mentioned [${doc.name}](${message.url}) in ${message.channel}\n\nChannel: ${message.channel.name}\nServer: ${message.guild.name}\nMessage ID: ${message.id}\nMessage Contents: ${message.content}`)).catch(e => {return;})
                    }catch(e) {
                        return;
                    }
                })
            }
        })
    }
}