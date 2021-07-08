module.exports = {
    permissions: ["MANAGE_GUILD"],
    run: async(client, message, args) => {
        const options = ["antijoin", "antiswear", "antilink", "antispam", "toggle"]
        const options2 = ["`antijoin`, ", "`antiswear`, ", "`antilink`, ", "`antispam`, ", "`toggle.`"]
        if(!args[0]) return message.reply(client.embed("Error", `Invalid usage, valid usage: \`${message.guild.prefix}automod <Option>\``))
        if(args[0].toLowerCase() == "options") return message.reply(client.embed("Options", `${options2.join("")}`))
        if(!options.includes(args[0].toLowerCase())) return message.reply(client.embed("Error", `Invalid Option Provided, run: \`${message.guild.prefix}automod options\` to see the valid options`))
        const d = await client.models.automod.findOne({guild: message.guild.id})
        if(d){
            if(args[0].toLowerCase() == "toggle"){
                const de = !d.enabled
                d.enabled = de
                await d.save()
                return message.reply(client.embed(`Succes`, `\`automod-${args[0].toLowerCase()}\` was toggled to \`${de}\``))
            }
            const b = !d.features.includes(args[0].toLowerCase())
            if(!d.features.includes(args[0].toLowerCase())){
                d.features.push(args[0].toLowerCase())
            } else {
                d.features.remove(args[0].toLowerCase())
            }
            await d.save()
            return message.reply(client.embed(`Succes`, `\`automod-${args[0].toLowerCase()}\` was toggled to \`${b}\``))
        } else {
            if(args[0].toLowerCase() == "toggle"){
                const newd = new client.models.automod({
                    guild: message.guild.id,
                    enabled: true,
                    features: []
                })
                await newd.save()
                return message.reply(client.embed(`Succes`, `\`automod-toggle\` was toggled to \`true\``))
            } else {
                const newd = new client.models.automod({
                    guild: message.guild.id,
                    enabled: true,
                    features: [args[0].toLowerCase()]
                })
                await newd.save()
                return message.reply(client.embed(`Succes`, `\`automod-${args[0].toLowerCase()}\` was toggled to \`true\``))
            }
        }
    }
}
