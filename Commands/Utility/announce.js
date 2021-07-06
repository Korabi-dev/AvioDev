module.exports = {
    permissions: ["MANAGE_GUILD"],
    run: async(client, message, args) => {
        const channel = message.mentions?.channels?.first()
        if(!channel || !args[0] || !args[1]) return message.reply(client.embed("Error", `Invalid usage, correct usage is: \`${message.guild.prefix}announce <channel> <message>\``))
        const msg = args.slice(1).join(" ")
        channel.send(client.embed("Announcement!", `${msg}`).setFooter(`Announcement by: ${message.author.tag}`)).then(p => {
            message.react("✅")
        }).catch(e => {
            message.reply(client.embed("Error", "I can't send messages in that channel."))
        })
    }
}