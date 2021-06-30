module.exports = {
    guild: true,
    aliases: ["clearwarns", "clrwarnings", "clrwarns"],
    permissions: ['MANAGE_MESSAGES'],
    run: async(client, message, args) => {
        let user = message.mentions.users.first()
        if(!user) return message.reply(client.embed("Error", "You must provide a user"))
        const data = await client.models.warnings.findOne({guild: message.guild.id, user: user.id})
        if(data){
           if(data.warns.length < 1) return message.reply(client.embed(`Clean.`, `${user} Has no active warnings.`))
           const total = data.warns.length;
           data.warns = []
           await data.save()
           return message.reply(client.embed("Success!", `Cleared ${total} warnings for ${user}.`))
        } else {
            return message.reply(client.embed(`Clean.`, `${user} Has no active warnings.`))
        }

    }
}