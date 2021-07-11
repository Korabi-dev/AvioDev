module.exports = {
    timeout: 86400000,
    run: async(client, message, args) => {
        const d = await client.models.economy.findOne({user: message.author.id})
        if(d){
            const sw = !d.passive
            d.passive = sw
            await d.save()
            return message.reply(client.embed("Success", `Passive mode was toggled to \`${sw}\`.`))
        }
    }
}