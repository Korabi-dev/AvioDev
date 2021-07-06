module.exports = {
    run: async(client, message, args) => {
        const r = ["1", "2", "3", "4", "5", "6"]
        message.reply(client.embed("Dice", `You rolled a number ${r.random()}`))
    }
}