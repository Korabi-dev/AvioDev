const { MessageActionRow, MessageButton } = require("discord-buttons")

module.exports = {
    botpermissions: ["MANAGE_CHANNELS"],
    run: async(client, message, args) => {
        var id = 0
        const idmanager = await client.models.guildtickets.findOne({guild: message.guild.id})
        const allowed = []
        if(idmanager){
            id = idmanager.current + 1
            idmanager.current = idmanager.current + 1
            await idmanager.save()
            idmanager.allowed.forEach(obj => {
                allowed.push(obj)
            })
        } else {
            const newidmanager = new client.models.guildtickets({
                guild: message.guild.id,
                current: 0,
                allowed: []
            })
            await newidmanager.save()
        }
        const over = [
            {
              id: message.author.id,
              allow: ['VIEW_CHANNEL', "SEND_MESSAGES"],
           },
           {
               id: message.guild.roles.everyone.id,
               deny: ["VIEW_CHANNEL"]
           }
         ]
         allowed.forEach(element => {
             over.push({id: element, allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "MANAGE_MESSAGES"]})
         })
       const channel = await message.guild.channels.create(`Ticket-${id}`, {type: "text", topic: `A ticket created to help ${message.author.tag}`,  permissionOverwrites: over})
       await channel.send(`${message.author}`, {embed: {
           title: "Ticket!",
           description: "Please use the below commands accordingly:\n`close` - Closes the ticket.\n`open` - Re-opens the ticket.\n`delete` - Deleted the ticket.",
           color: client.maincolor
       }})
        const newdata = new client.models.ticket({
            guild: message.guild.id,
            channel: channel.id,
            user: message.author.id,
            messages: [],
            id: id
        })
        await newdata.save()
        message.react("✔️")
    }
}