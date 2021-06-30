module.exports = {
    run: async(client, message, args) => {
        let wallet = await message.author.getMoney("wallet")
        let bank = await message.author.getMoney("bank")
        const embed = client.embed("User Balance", `👛 Wallet: ${wallet}\n🏦 Bank: ${bank}`)
        message.noMentionReply(embed)
    }
}