module.exports = {
    guild: true,
    permissions: ["MANAGE_MESSAGES"],
    aliases: ["delwarn", "clearwarn", "clrwarn", "deletewarning", "deletewarn"],
    run: async(client, message, args) => {
        let user = message.mentions.users.first()
        let id = args[1]?.replace("#", "")
        if(!user) return message.reply(client.embed("Error", "You must provide a user"))
        if(!id || isNaN(id)) return message.reply(client.embed("Error", "You must provide a warning case/id."))
        const data = await client.models.warnings.findOne({guild: message.guild.id, user: user.id})
        if(data){
           if(data.warns.length < 1) return message.reply(client.embed(`Clean.`, `${user} Has no active warnings.`))
          const warns = []
          let reason = ''
          let mod = ""
          data.warns.forEach(warn => {
          if(warn.id != Number(id)) {
              warns.push(warn)
          } else {
            reason = warn.reason
            mod = warn.moderator
          }
          })
          data.warns = warns
          await data.save()
          return message.reply(client.embed("Success", `Removed Warning:\n\nID: #${id}\nReason: ${reason}\nModerator: ${mod}`))
        } else {
            return message.reply(client.embed(`Clean.`, `${user} Has no active warnings.`))
        }
    }
}