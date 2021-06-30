module.exports = {
    owner: true, 
    run: async(client, message, args) => {
        if(!args[0]) return message.reply(client.embed("Error", "Please provide something for me to say."))
        if(args.all.toLowerCase().includes("--noreply")){
            return message.channel.send(args.all.replace("{guild}", message.guild.name).replace("{author}", message.author).replace("{author.id}", message.author.id).replace("--noreply", ""))
        }
        message.reply(args.all.replace("{guild}", message.guild.name).replace("{author}", message.author).replace("{author.id}", message.author.id))
    }
}