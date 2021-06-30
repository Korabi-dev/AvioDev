const ms = require("ms")

module.exports = {
    guild: true,
    run: async(client, message, args) => {
        if (!message.member || !message.member.voice.channel) return message.reply(client.embed("Error", "You need to be in a voice channel in order to use this command."))
        const player = client.manager.players.get(message.guild.id)
        if (!player) return message.reply(client.embed("Error", "Im not playing any music."))
        const queue = player.queue
        const embed = client.embed("Queue")
       embed.addField("Track:" , `\`\`\`${queue.current.title}\`\`\``, true)
        embed.addField("Requested By:", `\`\`\`${queue.current.requester.tag}\`\`\``, true)
        embed.addField("Author:", `\`\`\`${queue.current.author}\`\`\``, true)
        if(player.paused == true && player.playing == false){
            embed.addField("Status:", `\`\`\`Paused\`\`\``, true)
        }
        if(player.paused == false && player.playing == true){
            embed.addField("Status:", `\`\`\`Playing\`\`\``, true)
        }  
        embed.addField("Time:", `\`\`\`${ms(queue.duration, {long: true})}\`\`\``, true)
        embed.addField("Songs Left:", `\`\`\`${queue.totalSize}\`\`\``, true)
        embed.setThumbnail(queue.current.thumbnail)
        message.reply(embed)
    }}