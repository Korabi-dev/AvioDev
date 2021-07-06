const ftl = require("findthelyrics");
const { splitMessage } = require("discord.js")
module.exports = {
    run: async(client, message, args) => {
        if(!args[0]) return message.reply(client.embed("Error", "You must provide a song."))

       ftl.find(args.all, async(err, response) => {
           if(err) return message.reply(client.embed("Error", "Song not found"))
           let split = splitMessage(response)
           let index = 0
           let all = split.length
           split.forEach(async(msgg) => {
               if(msgg.length > 1){
             ++index
         message.reply(client.embed(`Lyrics ${index}/${all}`, msgg))
               }
           });
       })
    }
}