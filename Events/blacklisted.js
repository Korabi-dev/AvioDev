module.exports = {
    name: "message",
    run: async(message, client) => {
        if(message.isOwner == false && client.user.id == "855057364032684092") return;
        if(message.author.bot ) return;
       var canrun = true
        const doc = await client.models.words.findOne({guild: message.guild.id})
        const def = process.env.def.split(",")
        const content = message.content.toLowerCase().replace(/ /g,'')
    def.forEach(async(w) => {
        if(content.includes(w.toLowerCase())){
            canrun = false
           message.delete() 
             await message.guild.members.ban(message.author.id, {reason: `Using a blacklisted word. (${w.word})`}).catch(e => {return;}).then(u => {
            message.channel.send(client.embed("Banned", `${message.author.tag} was banned because of using a default blacklisted word.`))
             })
        }
    })
        if(doc){
  doc.words.forEach(async(w) => {
        if(content.includes(w.word.toLowerCase())){
            message.delete()
            if(message.member.hasPermission("MANAGE_MESSAGES")){
                return canrun = false
            }
                if(canrun == true){
                    if(w.action == "ban"){
                        await message.guild.members.ban(message.author.id, {reason: `Using a blacklisted word. (${w.word})`}).catch(e => {return;}).then(u => {
                            message.channel.send(client.embed("Banned", `${message.author.tag} was banned because of using a blacklisted word.`))
                            
                        })
                    } else if(w.action == "kick"){
                        await message.member.kick(`Using a blacklisted word. (${w.word})`).catch(e => {return;}).then(u => {
                            message.channel.send(client.embed("Kicked", `${message.author.tag} was kicked because of using a blacklisted word.`))
                        })
                    } else if(w.action == "warn"){
                        message.author.send(client.embed(`Blacklisted word`, `Please do not use "${w.word}" in any messages you send in ${message.guild.name}`)).catch(e => {
                            message.channel.send(`<@${message.author.id}>,`, client.embed(`Blacklisted word`, `Please do not use that word in any messages you send in ${message.guild.name}`))
                        })
                    }else if(w.action == "mute"){
                        const m = message.guild.roles.cache.find(r => r.name.toLowerCase().includes("muted"))
                        if(!m) return canrun = false;
                        message.member.roles.cache.forEach(r => {
                            message.member.roles.remove(r).catch(e => {return;})
                        })
                        message.member.roles.add(m).catch(e => {
                            message.channel.send(client.embed("Error", "Could not mute " + message.author.tag))
                        }).then(r => {
                            message.channel.send(client.embed("Muted", `${message.author.tag} was muted because of using a blacklisted word.`))
                        })
                    }
                }
                }
            })
        }
       
    }
}