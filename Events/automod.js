const Filter = require("bad-words")
const f = new Filter()
module.exports = {
    name: "message",
    run: async(message, client) => {
        if(message.author.bot) return;
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
                function url(string) {
                    var res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
                    return (res !== null)
                  };
                if(url(message.content.replace(" ", "").toLowerCase())){
                    message.delete().catch(e => {return;})
                    message.channel.send(client.embed("Warning", `${message.author.tag} sending links is not allowed in ${message.guild.name}.`)).catch(e => {return;})
                } else {
                    if(message.content.toLowerCase().replace(" ", "").includes("discord.gg/")){
                     message.delete().catch(e => {return;})
                    message.channel.send(client.embed("Warning", `${message.author.tag} sending links is not allowed in ${message.guild.name}.`)).catch(e => {return;})
                    }
                }
               }
           }
       }
    }
}