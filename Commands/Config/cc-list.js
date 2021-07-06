module.exports = {
    permissions: ["MANAGE_GUILD"],
    run: async(client, message, args) => {
       
        const d = await client.models.cc.find({guild: message.guild.id})
        if(d && d.length > 0) {
            var fields = d.map(data => 
                new Object({
                name: data.command,
                value: data.response,
                inline: true
                })
                )
                message.reply(client.embed("Custom Commands List").addFields(fields))
        }
        if(!d || d.length < 1) return message.reply(client.embed("Error", `No custom commands were found.`))
    }
}