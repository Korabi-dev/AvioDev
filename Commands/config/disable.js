module.exports = {
    permissions: ["MANAGE_GUILD"],
    run: async(client, message, args) => {
        const immune = ["help", "enable", "disable"]
        if(!args[0]) return message.reply(client.embed("Error", "You need to provide a command to disable."))
        const commandName = args[0].toLowerCase()
        var command =
        client.commands.get(commandName) 
        if(!command){
        command = client.commands.find((cmd) => cmd.aliases?.includes(commandName));
        }
       
        const aliases = [];
            client.commands.forEach((cmm) =>
              cmm.aliases?.forEach((alias) => aliases.push(alias))
            );
            const best = [...client.commands.map((c) => c.name), ...aliases].filter(
                (c) =>
                  require("leven")(commandName.toLowerCase(), c.toLowerCase()) <
                  c.length * 0.4
              );

              if(best[0] && !command){
                  command = client.commands.get(best[0]) || client.commands.find((cmd) => cmd.aliases?.includes(best[0]));
              }
        
        if(!command) {
            return message.reply(client.embed("Error", "Invalid Command."), {mention: true})
             } else {
               
                if(immune.includes(command.name)) return message.reply(client.embed("Error", "This command can not be disabled."))
                const data = await client.models.disable.findOne({guild: message.guild.id})
                if(data){
                    if (data.disabled.includes(commandName)) return message.reply(client.embed("Error", "This command is already disabled."))
                    data.disabled.push(commandName)
                    await data.save()
                    return message.reply(client.embed("Success", `The command \`${commandName}\` was disabled.`))
                } else {
                    const newd = new client.models.disable({
                        guild: message.guild.id,
                        disabled: [commandName]
                    })
                    await newd.save()
                    return message.reply(client.embed("Success", `The command \`${commandName}\` was disabled.`))
                }












             }
    }
}