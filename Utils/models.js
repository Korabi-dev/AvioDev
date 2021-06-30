let { Schema, model } = require("mongoose");

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