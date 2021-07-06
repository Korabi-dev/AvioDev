const { exec } = require("child_process")
module.exports = {
    owner: true,
    run: async(client, message, args) => {
        await exec("git pull", (err, stdout, stderr) => {
            if(err) return message.reply(client.embed("Shell FeedBack", `\`\`\`shell\n${err}\n\`\`\``))
            if(stdout) return message.reply(client.embed("Shell FeedBack", `\`\`\`shell\n${stdout}\n\`\`\``))
            if(stderr) return message.reply(client.embed("Shell FeedBack", `\`\`\`shell\n${stderr}\n\`\`\``))
        })
    }
}