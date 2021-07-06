module.exports = {
    permissions: ["MANAGE_GUILD"],
    run: async(client, message, args) => {
        if(!args[0] || !args[1]) return message.reply(client.embed("Error", `Invalid usage, correct usage: \`${message.guild.prefix}cc-edit <commandName> <response>\``))
        const commandName = args[0].toLowerCase()
        if(client.commands.get(commandName)) return message.reply(client.embed(`Error`, `\`${commandName}\` can not be edited because it is a default command.`))
        const d = await client.models.cc.findOne({guild: message.guild.id, command: commandName})
        if(d) {
            d.response = args.slice(1).join(" ").replace("{serverName}", message.guild.name).replace("{serverID}", message.guild.id)
            await d.save()
            message.reply(client.embed("Success", `Command \`${commandName}\` was edited.`))
        }
        if(!d) return message.reply(client.embed("Error", `This command does not exist.`))

    }
}