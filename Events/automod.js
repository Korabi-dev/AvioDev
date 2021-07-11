const Filter = require("bad-words")
const f = new Filter()
module.exports = {
    name: "message",
    run: async(message, client) => {
        if(message.author.bot || message.isOwner == true) return;
       const d = await client.models.automod.findOne({guild: message.guild.id})
       if(d){
           if(d.enabled == true){
               if(d.features.includes("antispam")) client.antiSpam.message(message).catch(e => {return;})
               if(d.features.includes("antiswear")){
                if(f.isProfane(message.content)){
                    message.delete().catch(e => {return;})
                    message.channel.send(client.embed("Warning", `${message.author.tag} swearing is not allowed in ${message.guild.name}.`)).catch(e => {return;})
                }
               }
               if(d.features.includes("antilink")){
                    if(message.content.toLowerCase().replace(" ", "").includes("discord.gg/")){
                     message.delete().catch(e => {return;})
                    message.channel.send(client.embed("Warning", `${message.author.tag} sending links is not allowed in ${message.guild.name}`)).catch(e => {return;})
                    }
                }
               }
           }
       }
    }
