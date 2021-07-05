module.exports = {
    owner: true,
    run: async(client, message, args) => {
        let user = args[0]
        if(!user) return message.reply(client.embed("Error", "You must provide a user/guild ID."))

        const d = await client.models.blacklist.findOne({user: user});

        if(d){
            if(d.active == true) return message.reply(client.embed("Error", "This ID is already in the blacklisted database."))
            d.active = true
        await d.save()
        return message.reply(client.embed("Success", `ID \`${user}\` Was Added To The Blacklisted DataBase`))
        } else {
            const newd = new client.models.blacklist({
                user: user,
                active: true
            })
            await newd.save()
            return message.reply(client.embed("Success", `ID \`${user}\` Was Added To The Blacklisted DataBase`))
        }
    }
}
