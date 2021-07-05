const Screenshoter = require("discord-screenshot");
module.exports = {
    run: async(client, message, args) => {
        if( !message.channel.nsfw) return message.reply(client.embed("Error", "You can not screenshot in non-nsfw channels."))
        if(!args[0]) return message.reply(client.embed("Error", "Please provide a link"))
        const result = await Screenshoter.screenshot(args[0])
        message.reply(result)
    }
}