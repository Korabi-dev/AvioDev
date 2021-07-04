const { evaluate } = require("mathjs")

module.exports = {
    run: async(client, message, args) => {
        if(!args[0]) return message.reply(client.embed("Error", "You must provide some arguments."))
        let e = "Error"
        try{
         e = evaluate(args.all)
    } catch(e) {
        return message.reply(client.embed("Error", "This equasion is invalid."))
    }
        message.reply(client.embed("Result",`Equasion:\`\`\`js\n${args.slice(0).join("")}\`\`\`\nResult:\`\`\`js\n${e}\`\`\``))
    }
}