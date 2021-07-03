module.exports = {
    run: async(client, message, args) => {
        if(!args[0]) return message.reply(client.embed("Error", "You must provide a question."))
        const responses = [
            "OH, HELL NAH",
            "No lmao",
            "No",
            "HELL YEA",
            "Yes lol",
            "Yes",
            "OH YEAA *moaning intensifies*",
            "NO GOD PLEASE NO",
            "YES PLEASE"
        ]
        var response = responses.random()

        message.reply(client.embed("8ball", `Your Question:\n\`\`\`${args.slice(0).join(" ")}\`\`\`\n\nMy response:\n\`\`\`${response}\`\`\``))
    }
}