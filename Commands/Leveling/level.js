module.exports = {
    name: "level",
    category: "Leveling",
    owner: false,
    guild: false,
    run: async(client, message, args) => {
    const level = await message.author.getLevelInfo("level")    
    const xp = await message.author.getLevelInfo("xp")

    message.mentionReply(client.embed("Level Info", `⬆️ Level: ${level}\n\n🔄 Xp: ${xp}`))
    }
}