
module.exports = {
    guild: true,
    run: async(client, message, args) => {
        const player = client.manager.players.get(message.guild.id);
        if (!player) return message.reply(client.embed("Error", "Im not playing any music."));
      await  player.setEQ([
            { band: 0, gain: 0.3 }
        ])
        message.reply(client.embed("Music System", `Set boost. Enjoy!`))
        
    }}