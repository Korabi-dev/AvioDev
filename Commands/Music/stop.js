  
module.exports = {
    aliases: ['leave', "end"],
    guild: true,
    run: async(client, message, args) => {
        if (!message.member || !message.member.voice.channel) return message.reply(client.embed("Error", "You need to be in a voice channel in order to use this command."))
        const player = client.manager.players.get(message.guild.id)
        if (!player) return message.reply(client.embed("Error", "Im not playing any music."))
    await player.destroy()
        message.channel.send(client.embed("Music System", "Deleted the queue, and left the channel."))
    }}