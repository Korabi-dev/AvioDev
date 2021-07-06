module.exports = {
    run: async(client, message, args) => {
        const choices = ["rock", "paper", "scissors"]
        const botchoices = ["rock", "paper", "scissors"]
        if(!args[0]) return message.reply(client.embed("Error", `You must provide a choice, say \`${message.guild.prefix}rpc choices\` to get the valid choices.`))
        if(args[0].toLowerCase() == "choices") return message.reply(client.embed("Choices", `Rock | Paper | Scissors`))
        if(!choices.includes(args[0]?.toLowerCase())) return message.reply(client.embed("Error", `Invalid usage, correct usage is: \`${message.guild.prefix}rpc <Choice>\``))
      const us = args[0].toLowerCase()
        const c = botchoices.random()
        const embed = client.embed().setDescription(`You picked \`${us}\` and I picked \`${c}\``)
        if(c == "rock"){
            if(us == c){
                embed.setTitle("Draw!")
            }
            if(us == "paper"){
                embed.setTitle("You Win!")
            }
            if(us == "scissors" ) {
                embed.setTitle("I Win!")
            }
        } else if(c == "scissors"){
            if(us == c){
                embed.setTitle("Draw!")
            }
            if(us == "rock" ){
                embed.setTitle("You Win!")
            }
            if(us == "paper" ){
                embed.setTitle("I Win!")
            }
        } else if(c == "paper"){
            if(us == c){
                embed.setTitle("Draw!")
            }
            if(us == "rock" ){
                embed.setTitle("I Win!")
            }
            if(us == "scrissors") {
                embed.setTitle("You Win!")
            }
        }
        return message.reply(embed)
    }
}