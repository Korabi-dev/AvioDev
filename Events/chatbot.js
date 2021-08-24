const axios = require("axios")
module.exports = {
    name: "message",
    run: async(message, client) => {
        const data = await client.models.chatbot.findOne({guild: message.guild.id})
        if(!data || message.author.bot) return;
        if(data.enabled == true && data.channel == message.channel.id){
            var reply = {message: "beep boop beep boop *robot go stupid*"}
            try{
                const { data } = await axios.get(`https://api.affiliateplus.xyz/api/chatbot?message=${message.content.trim()}&botname=${client.user.username}&ownername=Korabi&user=${message.author.id}`)
                reply = data
            }catch(e){
                console.log(e)
                reply = {message: "beep boop beep boop *robot go stupid*"}
            }
            message.noMentionReply(reply.message)
        }
    }
}