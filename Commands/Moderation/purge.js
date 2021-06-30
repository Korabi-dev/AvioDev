module.exports = {
  owner: false,
    guild: true,
    permissions: ["MANAGE_MESSAGES"],
    botpermissions: ["MANAGE_MESSAGES"],
    run: async(client, message, args) => {
       if(!args[0]) return message.reply(client.embed("Error", "You didn't provide any arguments."))
       if(isNaN(args[0]) || Number(args[0]) > 100 || Number(args[0]) < 2) return message.reply(client.embed("Invalid Arguments", "You need to provide a number between 2 and 100."))
        message.delete()
        message.channel.bulkDelete(Number(args[0]), true)
    }
}