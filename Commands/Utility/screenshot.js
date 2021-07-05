const Screenshoter = require("discord-screenshot");
var Filter = require("bad-words")
Filter = new Filter()
module.exports = {
    run: async(client, message, args) => {
        Filter.addWords("hentai", "gore", "stripper", "daddy", "cum", "sugarbaby")
        if(Filter.isProfane(args[0]) && !message.channel.nsfw) return message.reply(client.embed("Error", "You can not screenshot nsfw sites."))
        if(!args[0]) return message.reply(client.embed("Error", "Please provide a link"))
        const result = await Screenshoter.screenshot(args[0])
        message.reply(result)
    }
}