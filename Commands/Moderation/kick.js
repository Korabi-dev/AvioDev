module.exports = {
    permissions: ["BAN_MEMBERS"],
    botpermissions: ["BAN_MEMBERS"],
    run: async(client, message, args) => {
        var reason = "No Reason."
        if(args[1]) reason = args.slice(1).join(" ")

        var target = message.mentions.members.first()
        if(!target){
            if(!args[0]) return message.reply(client.embed("Error", `You didn't provide a user to ban.`))
              const user = message.guild.members.cache.get(args[0])
              if(!user) {
                  message.reply(client.embed("Error", "This user does not exist, or is not in the server."))
              }else if(user){
                  if(user.permissions.has("MANAGE_MESSAGES")) return message.reply(client.embed("Error", "You cannot kick a moderator."))
                  user.kick({reason: reason}).then(usr => {
                      message.reply(client.embed("Success!", `Kicked user ${usr.tag}`))
                  }).catch(e => {
                      message.reply(client.embed("Error", "Could Not Kick This User."))
                  })
              }
               } else if(target) {
                if(target.permissions.has("MANAGE_MESSAGES")) return message.reply(client.embed("Error", "You cannot kick a moderator."))
                target.kick({reason: reason}).then(usr => {
                    message.reply(client.embed("Success!", `Kicked user ${usr.tag}`))
                }).catch(e => {
                    message.reply(client.embed("Error", "Could Not Kick This User."))
                })
        }

    }
}