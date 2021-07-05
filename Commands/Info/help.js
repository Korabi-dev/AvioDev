module.exports = {
    owner: false,
    run: async(client, message, args) => {
      var total = 0
      var devc = 0
      
     client.commands.map(cmd => {
       if(!cmd.hide && !cmd.owner){
         ++total
       } else if(cmd.owner){
        ++devc
       }
     })
      var specific = false
      if(args[0]) specific = true
      if(specific == false){
  let info = []
  let owner = []
  let utility = []
  let music = []
  let leveling = []
  let moderation = []
  let suggestions = []
  let tickets = []
  let fun = []
  let giveaways = []
  let all = []
  let config = []
  client.commands.map(cmd => {
    all.push(cmd)
      if(!cmd.hide){
      let c = cmd.category.toLowerCase()
      if(c == "info"){
          info.push(`\`${cmd.name}\``)
      }else if(c == "owner"){
          if (message.isOwner == true){
              owner.push(`\`${cmd.name}\``)
          }
         } else if(c == "utility"){
        utility.push(`\`${cmd.name}\``)
      }else if(c == "music"){
        music.push(`\`${cmd.name}\``)
      } else if(c == "leveling"){
    leveling.push(`\`${cmd.name}\``)
      }else if(c == "moderation"){
        moderation.push(`\`${cmd.name}\``)
      } else if(c == "suggestions"){
    suggestions.push(`\`${cmd.name}\``)
      }else if(c == "tickets"){
        tickets.push(`\`${cmd.name}\``)
          }else if(c == "fun"){
            fun.push(`\`${cmd.name}\``)
              }else if(c == "giveaways"){
                giveaways.push(`\`${cmd.name}\``)
                  }else if(c == "config"){
                    config.push(`\`${cmd.name}\``)
                      }
      }
  })

  const embed = client.embed(`${client.user.username} Commands List!`, `${client.user.username} currently has **${total}** public commands. [Check out the github repository](https://github.com/Korabi-dev/AvioDev)`).setFooter(`Thanks for using ${client.user.username}! Use ${message.guild.prefix}help <command> to get help with a specific command.`)
  if(owner.length && message.isOwner == true){
    embed.setDescription(`${client.user.username} currently has **${total}** public commands, and **${total + devc}** total commands. [Check out the github repository](https://github.com/Korabi-dev/AvioDev)`)
    const dev = owner.join(", ")
    embed.addField("🛠️ Developer:",dev)
  }
const i = info.join(", ")
const ut = utility.join(", ")
const msu = music.join(", ")
const lvl = leveling.join(", ")
const md = moderation.join(", ")
const sg = suggestions.join(", ")
const tc = tickets.join(", ")
const fn = fun.join(", ")
const gv = giveaways.join(", ")
const cg = config.join(", ")
if(info.length > 0){
  embed.addField("ℹ️ Info:", i)
}
if(moderation.length > 0){
  embed.addField("🛡️ Moderation:", md)
}
if(fun.length > 0){
  embed.addField("🎡 Fun:", fn)
}
if(giveaways.length > 0){
  embed.addField("🎉 Giveaways:", gv)
}
if(suggestions.length > 0){
  embed.addField("📝 Suggestions:", sg)
}
if(tickets.length > 0){
  embed.addField("🎫 Tickets:", tc)
}
if(music.length > 0){
    embed.addField("🎤 Music:", msu)
}
if(utility.length > 0){
    embed.addField("🔨 Utility:", ut)
}
if(config.length > 0){
  embed.addField("⚙️ Configuration:", cg)
}
if(leveling.length > 0){
  embed.addField("⬆️ Leveling:", lvl)
}
if(all.length < 1){
    return message.reply(client.embed("Error", "No commands found."))
}
message.reply(embed)
      } else{
        const commandName = args[0].toLowerCase()
        var command =
        client.commands.get(commandName) 
        if(!command){
        command = client.commands.find((cmd) => cmd.aliases?.includes(commandName));
        }
       
        const aliases = [];
            client.commands.forEach((cmm) =>
              cmm.aliases?.forEach((alias) => aliases.push(alias))
            );
            const best = [...client.commands.map((c) => c.name), ...aliases].filter(
                (c) =>
                  require("leven")(commandName.toLowerCase(), c.toLowerCase()) <
                  c.length * 0.4
              );

              if(best[0] && !command){
                  command = client.commands.get(best[0]) || client.commands.find((cmd) => cmd.aliases?.includes(best[0]));
              }
        
        if(!command) {
            return message.reply(client.embed("Error", "Invalid Command."), {mention: true})
             } else {
              return message.reply(client.embed(`Command Info, ${command.name}`, `Aliases: ${command.aliases ? `[${command.aliases.join(", ")}]` : "None"}\nCategory: ${command.category ? `[${command.category}]`: "None"}\nOwner Locked: ${command.owner ? "True" : "False"}\nGuild Only: ${command.guild ? "True" : "False"}`))
             }



      }
    }
}