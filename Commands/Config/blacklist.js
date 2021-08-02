module.exports = {
    permissions: ["ADMINISTRATOR"],
    run: async(client, message, args) => {
        const options = ["ban", "kick", "mute", "warn"]
        if(!args[0]) return message.reply(client.embed("Error", `Invalid syntax, correct syntax: \`${message.guild.prefix}blacklist <add/remove/toggle/list> [word] [action]\``))
        args[0] = args[0].toLowerCase()
        if(args[0] == "add" || args[0] == "remove"){
            if(!args[1]) return message.reply(client.embed("Error", `Invalid syntax, correct syntax: \`${message.guild.prefix}blacklist <add/remove/toggle/list> <word> <action>\``))
            args[1] = args[1].toLowerCase()
        }
        if(args[0] == "add"){
        if(!args[2])return message.reply(client.embed("Error", `Invalid syntax, correct syntax: \`${message.guild.prefix}blacklist <add/remove/toggle/list> [word] [action]\``))
        args[2] = args[2].toLowerCase()
        }
        if(args[0] !== "add" && args[0] !== "remove" && args[0] !== "toggle" && args[0] !== "list") return message.reply(client.embed("Error", `Invalid argument "${args[0]}", Valid Arguments: \`add\`, \`remove\`, \`actions\`, \`toggle\`, \`list\`.`))
        if(args[0] == "add" && !options.includes(args[2])) return message.reply(client.embed(`Error`, `Invalid argument "${args[2]}", Valid Arguments: \`ban\`, \`kick\`, \`mute\`, \`warn\`.`))
        const doc = await client.models.words.findOne({guild: message.guild.id})
        if(args[0] == "toggle"){
            if(!doc){
                const newd = new client.models.words({
                    guild: message.guild.id
                })
                await newd.save()
                return message.reply(client.embed("Toggled", `This system ws toggled to \`true\``))
            } else {
                const t = !doc.enabled
                doc.enabled = t
                await doc.save()
                return message.reply(client.embed("Toggled", `This system ws toggled to \`${t}\``))
            }
        }
        if(args[0] == "add"){
            const word = args[1]
            const action = args[2]
            const words = [{word: word, action: action}]
            const def = process.env.def.split(",")
            def.forEach(e => {
                words.push({word: e, action: "ban"})
            })
            if(!doc){
                const newd = new client.models.words({
                    guild: message.guild.id,
                    words: words
                })
                await newd.save()
                if(def.includes(word)) return message.reply(client.embed("Default Word", `This word is a default word that you can't mess with, it is already in place.`))
                message.reply(client.embed("Word Blcklisted", `You blacklisted the word \`${word}\` with action \`${action}\``))
            } else {
                if(def.includes(word)) return message.reply(client.embed("Default Word", `This word is a default word that you can't mess with, it is already in place.`))
                let inc = doc.words.filter(w => {
                    return w.word.toLowerCase() == word
                })
                if(inc[0]) return message.reply(client.embed("Error", "This word is already blacklisted."))
                doc.words.push({word: word, action: action})
                await doc.save()
                message.reply(client.embed("Word Blcklisted", `You blacklisted the word \`${word}\` with action \`${action}\``))
            }
        }
        if(args[0] == "remove"){
            const word = args[1]
            const def = process.env.def.split(",")
           if(def.includes(word)) return message.reply(client.embed("Default Word", `This word is a default word that you can't mess with, it is already in place.`))
           if(!doc) return message.reply(client.embed("Error", `\`${word}\` is not a blacklisted word.`))
           const inc = doc.words.filter(w => {
               return w.word.toLowerCase() == word
           })
           if(!inc[0])return message.reply(client.embed("Error", `\`${word}\` is not a blacklisted word.`))
           doc.words.remove(inc[0])
           await doc.save()
           message.reply(client.embed("Success", `\`${word}\` is no longer a blacklisted word.`))
        }
        if(args[0] == "list"){
            if(!doc) return message.reply(client.embed("Blacklisted words", "There is no blacklisted words for this server."))
            const words = []
            const def = process.env.def.split(",")
            doc.words.forEach(w => {
                if(!def.includes(w.word)){
                words.push({word: w.word, action: w.action})
                }
            })
            if(!words[0]) return message.reply(client.embed("Blacklisted words", "There is no blacklisted words for this server."))
            const embed = client.embed("Blacklisted words", `${message.guild.name} has ${words.length} blacklisted words.`)
            words.forEach(w => {
                embed.addField(`\`${w.word}\``, w.action)
            })
            message.reply(embed)
        }
    }
}