module.exports = {
    aliases: ["inv"],
    run: async(client, message, args) => {
        message.reply(client.embed("Invite me", `[Click here to invite me!](https://discord.com/api/oauth2/authorize?client_id=736933259178541177&permissions=8&scope=bot)`))
    }
}