module.exports = {
    permissions: ["MANAGE_GUILD"],
    botpermissions: ["MANAGE_NICKNAMES"],
    run: async(client, message, args) =>{
     message.guild.members.cache.forEach(m => {
            if(m.nickname && m.nickname.toLowerCase() == `zzzz dehoisted ${m.user.username.toLowerCase()}`){
                m.setNickname(m.user.username, `${message.author.username} used rehoist.`)
            }
            });
            message.reply(client.embed("Rehoist", `Completed.`))
    }
}