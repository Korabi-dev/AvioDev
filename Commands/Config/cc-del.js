module.exports = {
    permissions: ["MANAGE_GUILD"],
    run: async(client, message, args) => {
        if(!args[0]) return message.reply(client.embed("Error", `Invalid usage, correct usage: \`${message.guild.prefix}cc-del <commandName>\``))
        const commandName = args[0].toLowerCase()
        if(client.commands.get(commandName)) return message.reply(client.embed(`Error`, `\`${commandName}\` can not be deleted because it is a default command.`))
        const d = await client.models.cc.findOne({guild: message.guild.id, command: commandName})
        if(d) {
            await client.models.cc.findOneAndDelete({guild: message.guild.id, command: commandName})
            message.reply(client.embed("Success", `Command \`${commandName}\` was deleted.`))
        }
        if(!d) return message.reply(client.embed("Error", `This command does not exist.`))

    }
}