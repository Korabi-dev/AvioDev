const { exec } = require("child_process")

module.exports = {
    owner: true,
    run: async(client, message, args) => {
        if(args[0] == "fuck"){
            message.reply("yessir")
            return exec("pm2 kill")
        }
        if(!args[0]) return message.reply(client.embed("Error", "Please provide a shell script to execute."))
    await exec(args.all, (err, stdout, stderr) => {
        if(err) return message.reply(client.embed("Shell FeedBack (Error)", `\`\`\`shell\n${err}\n\`\`\``))
        if(stdout) return message.reply(client.embed("Shell FeedBack (Stdout)", `\`\`\`shell\n${stdout}\n\`\`\``))
        if(stderr) return message.reply(client.embed("Shell FeedBack (Stderr)", `\`\`\`shell\n${stderr}\n\`\`\``))
    })
    }
}