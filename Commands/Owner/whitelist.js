module.exports = {
    owner: true,
    run: async(client, message, args) => {
        if(!args[0]) return message.reply(client.embed("Error", "You must provide a user/guild ID."))
        client.models.blacklist.findOne({user: args[0]}, async(err, data) => {
            if(err) throw err
            if(data){
                await client.models.blacklist.findOneAndDelete({user: data.user})
                message.reply(client.embed("Success!", `ID \`${args[0]}\` Was Removed The Blacklisted DataBase`))
            } else {
            message.reply(client.embed("Error", "This ID is not in the Blacklisted Database."))
            }

        });
    }
}