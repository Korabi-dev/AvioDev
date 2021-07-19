module.exports = {
    run: async(client, message, args) => {
        const subcommands = ["add", "create", "remove", "delete", "subcommands", "list"]
        if(!args[0]) return message.error(`You need to provide a subcommand say \`${message.guild.prefix}highlights subcommands\` to view all valid subcommands.`)
        args[0] = args[0].toLowerCase()
        if(!subcommands.includes(args[0])) return message.error(`You need to provide a **valid** subcommand say \`${message.guild.prefix}highlights subcommands\` to view all valid subcommands.`)
        const option = args[0]
        if(option != "list" && option !="subcommands"){
        if(!args[1]) return message.error("You need to provide a highlight name.")
    }
    if(args[1]){
        args[1] = args[1].toLowerCase()
    }
        const doc = await client.models.highlights.findOne({name: args[1]})
        if(option == "add" || option == "create"){
            if(!doc){
                const newdoc = new client.models.highlights({
                    name: args[1],
                    users: [message.author.id]
                })
                await newdoc.save()
                return message.reply(client.embed("Success", `The highlight \`${args[1]}\` was added to your highlights.`))
            } else {
                if(doc.users.includes(message.author.id)){
                return message.error("This highlight is already in your highlights.")
                }else {
                doc.users.push(message.author.id)
                await doc.save()
                return message.reply(client.embed("Success", `The highlight \`${args[1]}\` was added to your highlights.`))
                }
            }
        } else if(option == "remove" || option == "delete") {
            if(!doc){
                return message.error("This highlight is not in your highlights.")
            } else {
                doc.users.remove(message.author.id)
                await doc.save()
                return message.reply(client.embed("Success", `The highlight \`${args[1]}\` was removed from your highlights.`))
            }
        } else if(option == "list"){
            const docs = await client.models.highlights.find({})
            const highlights = docs.filter(d => {
                return d.users.includes(message.author.id)
            })
        let display = []
        highlights.forEach(h => {
            display.push(h.name)
        })
        display = display.sort()
        if(display.length < 1){
            return message.error("You dont have any highlights")
        }else {
            message.reply(client.embed("Your highlights", `\`${display.join("`\n")}\``))
        }
        } else if(option == "subcommands"){
            subcommands.remove("subcommands")
            message.reply(client.embed("Subcommands", `\`${subcommands.join("`, `")}\`.`))
        }
        }
}