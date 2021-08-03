module.exports = {
    run: async(client, message, args) => {
        if(!args[0]) return message.reply(client.embed("Error", `Invalid syntax, correct syntax: \`${message.guild.prefix}embed <Title> | [Description] | [Footer] | [Color]\``))
        const embed = client.embed()
        const input = args.all.split("|")
        if(input[0]) embed.setTitle(input[0].trim())
        if(input[1]) embed.setDescription(input[1].trim())
        if(input[2]) embed.setFooter(input[2].trim())
        if(input[3]) embed.setColor(input[3].trim().toUpperCase())
        message.channel.send(embed)
    }
}