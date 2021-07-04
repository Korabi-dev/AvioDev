let { Schema, model, mongoose } = require("mongoose");

let schema = Schema({
 user: String,
 wallet: Number,
 bank: Number,
 level: Number,
 xp: Number,
 needed: Number
});

exports.profile = model("profile", schema);

schema = Schema({
    guild: String,
    prefix: String,
    mod: String,
    modtag: String
})

exports.prefix = model("prefix", schema)

schema = Schema({
    guild: String,
    user: String,
    reason: String,
    afk: Boolean
})

exports.afk = model("afk", schema)


schema = Schema({
    guild: String,
    channel: String,
    enabled: Boolean
})

exports.suggestions = model("suggestions", schema)



schema = Schema({
    guild: String,
    current: Number
})

exports.suggestionidhandler = model("suggestionidhandler", schema)



schema = Schema({
guild: String,
   id: Number,
   channel: String,
   message: String,
   status: String,
   author: String,
   suggestion: String
})

exports.suggestion = model("suggestion", schema)

schema = Schema({
    user: String,
    active: Boolean
})

exports.blacklist = model("blacklist", schema)

schema = Schema({
    user: String,
    warns: Array,
    guild: String,
    current: Number
})

exports.warnings = model("warnings", schema)



schema = Schema({
    user: String,
    channel: String,
    guild: String,
    messages: Array,
    id: Number
})

exports.ticket = model("ticket", schema)


schema = Schema({
    guild: String,
    current: Number,
    allowed: Array
})

exports.guildtickets = model("guildtickets", schema)

Schema({
    messageID: String,
    channelID: String,
    guildID: String,
    startAt: Number,
    endAt: Number,
    ended: Boolean,
    winnerCount: Number,
    prize: String,
    messages: {
        giveaway: String,
        giveawayEnded: String,
        inviteToParticipate: String,
        timeRemaining: String,
        winMessage: String,
        embedFooter: String,
        noWinner: String,
        winners: String,
        endedAt: String,
        hostedBy: String,
        units: {
            seconds: String,
            minutes: String,
            hours: String,
            days: String,
            pluralS: Boolean,
        },
    },
    hostedBy: String,
    winnerIDs: [String],
    reaction: Schema.Types.Mixed,
    botsCanWin: Boolean,
    embedColor: Schema.Types.Mixed,
    embedColorEnd: Schema.Types.Mixed,
    exemptPermissions: [],
    exemptMembers: String,
    bonusEntries: String,
    extraData: Schema.Types.Mixed,
    lastChance: {
        enabled: Boolean,
        content: String,
        threshold: Number,
        embedColor: Schema.Types.Mixed
    }
});

exports.giveaways = model("giveaways", schema)