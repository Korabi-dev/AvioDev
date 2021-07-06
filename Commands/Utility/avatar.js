module.exports = {
    aliases: ["av"],
    run: async(client, message, args) => {
        let user = message.mentions?.users?.first()
        if(!user) user = message.author
        message.reply(client.embed(`${user.username}'s Avatar`).setImage(user.displayAvatarURL({ dynamic: true, size: 256 })))
    }
}