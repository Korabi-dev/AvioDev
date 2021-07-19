const models = require("../Utils/models")
module.exports = {
    name: "message",
    run: async(message, client) => {
        if(message.isOwner == false && client.user.id == "855057364032684092") return;
    if(message.mentions.users.first()){
    message.mentions.users.forEach(async(user) => {
        if(message.guild){
        if(user.id != message.author.id){
        const data = await models.afk.findOne({guild: message.guild.id, user: user.id})
        if(data){
            if(data.afk == true){
                await message.reply(client.embed("AFK", `${user} is AFK: ${data.reason}`))
            }
        }
   }
}
    })
}
if(message.guild){
    const doc = await models.afk.findOne({guild: message.guild.id, user: message.author.id})
    if(doc){
        if(doc.afk == true){
            doc.afk = false
            await doc.save().then(promise => {
                message.reply(client.embed("AFK", "Welcome Back, Your AFK Status Has Been Removed."))
            })
        }
    }
}
    }
}