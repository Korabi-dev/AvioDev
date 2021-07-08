module.exports = {
    permissions: ["MANAGE_GUILD"],
    botpermissions: ["MANAGE_NICKNAMES"],
    run: async(client, message, args) =>{
     message.guild.members.cache.forEach(m => {
            if(m.presence){
            if(m.presence.activities[0]){
            if(m.presence.activities[0].type == "CUSTOM_STATUS"){
            if(m.presence.activities[0].state){
            if(m.presence.activities[0].state.includes(".gg/")){
            m.setNickname(`zzzz Dehoisted ${m.user.username}`, `${message.author.username} used dehoist.`).catch(e => {return;})
            }
            }
            }
            }
            }
            });
            message.reply(client.embed("Dehoist", `Completed.`))
    }
}