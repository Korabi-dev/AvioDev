const models = require("../../Utils/models")
module.exports = {
    guild: true,
    run: async(client, message, args) => {
        var reason = "No Reason."
        if(args[0]) reason = args.all
        const data = await models.afk.findOne({guild: message.guild.id, user: message.author.id})

        if(data){
         if(data.afk == false){
                data.afk = true
                data.reason = reason
                await data.save().then(promise => {
                  message.reply(client.embed("AFK", `Set Your AFK Status: ${reason}`))
                })
            }
        }else{
            const newdata = new models.afk({
                guild: message.guild.id,
                user: message.author.id,
                afk: true,
                reason: reason
            })
            await newdata.save().then(promise => {
                message.reply(client.embed("AFK", `Set Your AFK Status: ${reason}`))
            })
        }

    }
}