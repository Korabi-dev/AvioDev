
module.exports = {
    guild: true,
    run: async(client, message, args) => {
        if (!message.member || !message.member.voice.channel) return message.reply(client.embed("Error", "You need to be in a voice channel in order to use this command."))
        const player = client.manager.players.get(message.guild.id)
        if (!player) return message.reply(client.embed("Error", "Im not playing any music."))
        if(!args[0] || isNaN(args[0])) return message.reply(client.embed("Error", "You didn't provide a valid volume."))
        var vol = Number(args[0])
        if(vol > 100) vol = 100
        if(vol < 1) vol = 1
       await player.setVolume(vol)
        message.reply(client.embed("Music System", `Set the music volume to ${vol}`))
    }}