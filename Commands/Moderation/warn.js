module.exports = {
    guild: true,
    permissions: ["MANAGE_MESSAGES"],
    run: async(client, message, args) => {
        let user = message.mentions.users.first()
        let reason = "No Reason."
        if(!user) return message.reply(client.embed("Error", "You must provide a user to warn."))
        if(args[1]) reason = args.slice(1).join(" ")
        const data = await client.models.warnings.findOne({user: user.id, guild: message.guild.id })
        let id = 0
        if(data){
            id = data.current + 1
            data.current = data.current + 1
            data.warns.push({moderator: message.author.tag, reason: reason, id: id})
            await data.save()
            return message.reply(client.embed("Success", `Warning Logged for ${user} | Reason: ${reason} | Case ID: #${id}.`))
        } else {
            const newd = new client.models.warnings({
                user: user.id,
                guild: message.guild.id,
                warns: [{moderator: message.author.tag, reason: reason, id: 0}],
                current: 0
            })
            await newd.save()
            return message.reply(client.embed("Success", `Warning Logged for ${user} | Reason: ${reason} | Case ID: #0.`))
        }

    }
}