const { RichPresenceAssets } = require("discord.js");

module.exports = {
    name: "serverinfo",
    guild: true,
    run: async(client, message, args) => {
        let members = message.guild.members.cache.size
        let online = 0
        
        message.guild.members.cache.forEach(member => {
            if(member.presence.status == "online"){
                online += 1
            }
        });
        let dnd = 0
        message.guild.members.cache.forEach(member => {
            if(member.presence.status == "dnd"){
                dnd += 1
            }
        });

        let offline = 0
        message.guild.members.cache.forEach(member => {
            if(member.presence.status == "offline"){
                offline += 1
            }
        });
        let idle = 0
        message.guild.members.cache.forEach(member => {
            if(member.presence.status == "idle"){
                idle += 1
            }
        });


        const embed = client.embed("Server Info")

        embed.addField("🫂 Members:", `Total: ${members}\nOnline: ${online}\nDo Not Disturb: ${dnd}\nIdle: ${idle}\nOffline: ${offline}`, true)
        embed.addField(`🔼 Boosts:`, `Total Boosts: ${message.guild.premiumSubscriptionCount}\nBoost Level: ${message.guild.premiumTier}`, true)

        let roles = []
        let totalroles = 0
        message.guild.roles.cache.forEach(role => {
            if(role != message.guild.roles.everyone){
                if(totalroles < 21){
                roles.push(role)
                totalroles += 1
                }
            }
        })
        if(totalroles > 0){
            roles = roles.join(", ")
            if(roles.length >= 20){
                embed.addField(`🟢 Roles[${totalroles}]`, `${roles}`)
            }else{
        embed.addField(`🟢 Roles[${totalroles}]:`, `${roles}`)
            }
        }
embed.addField(`🏆 Acknowlogements`, `Server Verified: ${message.guild.verified}\nServer Partnered: ${message.guild.partnered}`, true)
embed.addField(`🗺️ Region:`, `${message.guild.region}`, true) 
embed.addField("👑 Owner:", `${message.guild.owner}`, true)
        message.reply(embed)
    }
}