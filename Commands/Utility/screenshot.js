const Screenshoter = require("discord-screenshot");
module.exports = {
    run: async(client, message, args) => {
        if(!args[0]) return message.reply(client.embed("Error", "Please provide a link"))
        const result = await Screenshoter.screenshot(args[0])
        message.reply(result)
    }
}