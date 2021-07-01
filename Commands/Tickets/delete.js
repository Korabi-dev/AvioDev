module.exports = {
    aliases: ["ticket-delete", "del-ticket", "ticket-del", "delete-ticket"],
    botpermissions: ["MANAGE_CHANNELS"],
run: async(client, message, args) => {
    const data = await client.models.ticket.findOne({guild: message.guild.id, channel: message.channel.id})
    if(data){
        message.reply(client.embed("Success", "This ticket will be deleted in 5 seconds."))
        setTimeout(async() => {
            await client.models.ticket.findOneAndDelete({guild: message.guild.id, channel: message.channel.id})
           await message.channel.delete()
        }, 5000);
    } else {
return message.reply(client.embed("Error", "You can only use this command in a ticket."))
    }
}
}