module.exports = {
    owner: true,
    run: async(client, message, args) => {
        const channel_id = "741222883522773023"
        const channel = client.channels.cache.get(channel_id)
        if(!channel) return message.reply(client.embed("Error","Could not find required channel with id: " + channel_id))
        if(!args[0]) return message.reply(client.embed("Error", `Invalid syntax, valid syntax: \`${message.guild.prefix}update <Description> | [Color] | [Title] | [Footer] | [Reaction]\``))
        const input = args.all.split("|")
        const embed = client.embed("Update" , "Avio Is being updated").setFooter(`Update by ${message.author.tag}`)
        if(input[0]) embed.setDescription(input[0].trim())
        if(input[1]) embed.setColor(input[1].trim().toUpperCase())
        if(input[2]) embed.setTitle(input[2].trim())
        if(input[3]) embed.setFooter(input[3].trim())
        message.delete()
        const m = await channel.send("@everyone,", embed)
        if(input[4]) m.react(input[4].trim())
    }
}