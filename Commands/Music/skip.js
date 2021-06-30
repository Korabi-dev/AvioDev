module.exports = {
    guild: true,
    run: async(client, message, args) => {
        const player = client.manager.players.get(message.guild.id);
        if (!player) return message.reply(client.embed("Error", "Im not playing any music."));
await player.stop()
}}