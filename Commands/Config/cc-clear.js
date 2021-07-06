module.exports = {
    permissions: ["MANAGE_GUILD"],
    run: async(client, message, args) => {
       
        const d = await client.models.cc.find({guild: message.guild.id})
        if(d && d.length > 0) {
                d.forEach(async(cmd) => {
                 await client.models.cc.findOneAndDelete({guild: message.guild.id, command: cmd.command})
                });
                message.reply(client.embed("Success", `All custom commands were deleted.`))
        }
        if(!d || d.length < 1) return message.reply(client.embed("Error", `No custom commands were found.`))
    }
}