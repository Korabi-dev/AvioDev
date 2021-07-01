module.exports = {
    botpermissions: ["MANAGE_CHANNELS"],
    aliases:["ticket-reopen", "reopen-ticket"],
    run: async(client, message, args) => {
        const data = await client.models.ticket.findOne({guild: message.guild.id, channel: message.channel.id})
        if(data){
            await message.channel.updateOverwrite(data.user, {VIEW_CHANNEL: true, SEND_MESSAGES: true})
            await message.reply(client.embed("Success", "This ticket was re-opened."))
        }else{
        return message.reply(client.embed("Error", "You can only use this command in a ticket."))   
        } 
    }
}