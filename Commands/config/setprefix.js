const models = require("../../Utils/models")
module.exports = {
    permissions: ["MANAGE_GUILD"],
    run: async(client, message, args) => {
         if(!args[0]) return message.reply(client.embed("Error", "You didnt provide a prefix to set."))
            const data = await models.prefix.findOne({guild: message.guild.id})
if(data){
    data.prefix = args[0]
    data.mod = message.author.id
    data.modtag = message.author.tag
    await data.save().then(promise => {
        const embed = client.embed(`Prefix Set`, `Successfully set the prefix for ${message.guild.name} to ${args[0]}`)
        if(args.all.includes("--force")) embed.setFooter("Set by bot developer.")
        message.reply(embed)
    })  
} else {
    const newdata = new models.prefix({
        guild: message.guild.id,
        prefix: args[0],
        mod: message.author.id,
        modtag: message.author.tag
    })
    await newdata.save().then(promise => {
        const embed = client.embed(`Prefix Set`, `Successfully set the prefix for ${message.guild.name} to ${args[0]}`)
        if(args.all.includes("--force")) embed.setFooter("Set by bot developer.")
        message.reply(embed)
    })
}
        }
    }
