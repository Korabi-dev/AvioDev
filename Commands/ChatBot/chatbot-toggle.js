module.exports = {
    permissions: ["MANAGE_GUILD"],
    run: async(client, message, args) => {
        const data = await client.models.chatbot.findOne({guild: message.guild.id})
        if(!data)return message.reply(client.embed("Error", `Chat bot system not set, please use \`${message.guild.prefix}chatbot-setchannel <channel>\` to set the system up.`))
        const en = !data.enabled
        data.enabled = en
        await data.save()
        message.reply(client.embed(`Success`, `\`Chatbot-Toggle\` was set to \`${en}\``))
    }
}