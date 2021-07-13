module.exports = {
    permissions: ["MANAGE_CHANNELS"],
    run: async(client, message, args) => {
        if(!args[0]) return message.reply(client.embed("Error", "You need to provide a slowmode."))
        if(isNaN(args[0])) return message.reply(client.embed("Error", `You must provide a number in seconds.`))
       await message.channel.setRateLimitPerUser(Number(args[0])).then(promise => {
           message.reply(client.embed("Success", `Set the slowmode to ${args[0]} seconds.`))
       }) 
    }       
}