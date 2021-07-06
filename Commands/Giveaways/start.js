const ms = require("ms")
module.exports = {
    run: async(client, message, args) => {
        if(!message.member.hasPermission('MANAGE_MESSAGES') && !message.member.roles.cache.some((r) => r.name.toLowerCase() == "giveaways")){
            return message.reply(client.embed("Error", "You need the `Manage Messages` permission or a role with the name of `Giveaways` to use this command."))
        }
        const channel = message.mentions?.channels?.first();
        if(!args[1] || !args[2] || !args[3] || isNaN(args[2]) || !channel) return message.reply(client.embed("Error",`Wrong usage, correct usage is: \`\`\`${message.guild.prefix}start <channel> <Time> <WinnerCount> <Prize>\`\`\``))

        client.giveawaysManager.start(channel, {
            time: ms(args[1]),
            winnerCount: parseInt(args[2]),
            prize: args.slice(3).join(' '),
            hostedBy: message.author,
            messages: { 
                giveaway: "🎉**GIVEAWAY**🎉",
                giveawayEnded: "🎉**GIVEAWAY ENDED**🎉",
                timeRemaining: "Time remaining: **{duration}**!",
                inviteToParticipate: "React with 🎉 to join!",
                winMessage: "Congratulations, {winners}! You have won **{prize}**!",
                embedFooter: `${client.user.username} Giveway system`,
                noWinner: "Giveaway cancelled, no participations.",
                hostedBy: "Hosted by: {user}",
                winners: "Winner(s)",
                endedAt: "Ended at",
                units: {
                    seconds: "seconds",
                    minutes: "minutes",
                    hours: "hours",
                    days: "days",
                    pluralS: false
                }
            }
        }).then(data => {
            message.react("✅")
        })

    }
}