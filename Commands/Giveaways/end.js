module.exports = {
    run: async(client, message, args) => {
        if(!message.member.hasPermission('MANAGE_MESSAGES') && !message.member.roles.cache.some((r) => r.name.toLowerCase() == "giveaways")){
            return message.reply(client.embed("Error", "You need the `Manage Messages` permission or a role with the name of `Giveaways` to use this command."))
        }
            if(!args[0]) return message.reply(client.embed("Error", `You need to specify a valid message id.`))

            let giveaway = client.giveawaysManager.giveaways.find((g) => g.messageID == args[0] && g.guildID == message.guild.id);

            if(!giveaway) return message.reply(client.embed("Error", `Giveaway with an ID of \`${args[0]}\` does not exist.`))
        
            client.giveawaysManager.edit(giveaway.messageID, {
                setEndTimestamp: Date.now() 
            })
            .then(() => {
                message.react("✅")
            })
            .catch((e) => {
                if(e.startsWith(`Giveaway with message ID ${giveaway.messageID} is already ended.`)){
                    message.reply(client.embed("Error", "This giveaway is already ended."))
                } else {
                    throw e
                }
            });
    }
}