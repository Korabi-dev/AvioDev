module.exports = {
    botpermissions: ["MANAGE_CHANNELS"],
    aliases:["ticket-close", "cls-ticket", "ticket-cls", "close-ticket"],
    run: async(client, message, args) => {
        const data = await client.models.ticket.findOne({guild: message.guild.id, channel: message.channel.id})
        if(data){
            await message.channel.updateOverwrite(data.user, {VIEW_CHANNEL: false, SEND_MESSAGES: false})
            await message.reply(client.embed("Success", "This ticket was closed."))
        }else{
        return message.reply(client.embed("Error", "You can only use this command in a ticket."))   
        } 
    }
}