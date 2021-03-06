const Filter = require("bad-words")
const f = new Filter()
module.exports = {
    name: "message",
    run: async(message, client) => {
        if(message.isOwner == false && client.user.id == "855057364032684092") return;
        if(message.author.bot || message.isOwner == true || !message.guild) return;
       const d = await client.models.automod.findOne({guild: message.guild.id})
       if(d){
           if(d.enabled == true){
               if(d.features.includes("antispam")) client.antiSpam.message(message).catch(e => {return;})
               if(d.features.includes("antiswear")){
                if(f.isProfane(message.content.toLowerCase().replace(/ /g,''))){
                    message.delete().catch(e => {return;})
                    message.channel.send(client.embed("Warning", `${message.author.tag} swearing is not allowed in ${message.guild.name}.`)).catch(e => {return;})
                }
               }
               if(d.features.includes("antilink")){
                    if(message.content.toLowerCase().replace(/ /g,'').includes("discord.gg/")){
                     message.delete().catch(e => {return;})
                    message.channel.send(client.embed("Warning", `${message.author.tag} sending links is not allowed in ${message.guild.name}`)).catch(e => {return;})
                    }
                }
               }
           }
       }
    }
