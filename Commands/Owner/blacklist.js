module.exports = {
    owner: true,
    run: async(client, message, args) => {
        let user = args[0]
        if(!user) return message.reply(client.embed("Error", "You must provide a user."))

        const d = await client.models.blacklist.findOne({user: user});

        if(d){
            if(d.active == true) return message.reply(client.embed("Error", "This user is already blacklisted."))
            d.active = true
        await d.save()
        return message.reply(client.embed("Success", `ID \`${user}\` Was Added To The Blacklist DataBase`))
        } else {
            const newd = new client.models.blacklist({
                user: user,
                active: true
            })
            await newd.save()
            return message.reply(client.embed("Success", `ID \`${user}\` Was Added To The Blacklist DataBase`))
        }
    }
}
