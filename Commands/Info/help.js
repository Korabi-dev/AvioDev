const { MessageEmbed } = require("discord.js")
const fs = require("fs")
module.exports = {
    owner: false,
    run: async(client, message, args) => {
      var total = 0
     client.commands.map(cmd => {
       if(!cmd.hide && !cmd.owner){
         ++total
       }
     })
      var specific = false
      if(args[0]) specific = true
      if(specific == false){
  let info = []
  let owner = []
 let economy = []
  let utility = []
  let music = []
  let leveling = []
  let moderation = []
  let suggestions = []
  let tickets = []
  client.commands.map(cmd => {
      if(!cmd.hide){
      let c = cmd.category.toLowerCase()
      if(c == "info"){
          info.push(`\`${cmd.name}\``)
      }else if(c == "owner"){
          if (message.isOwner == true){
              owner.push(`\`${cmd.name}\``)
          }
      }else if(c =="economy"){
          economy.push(`\`${cmd.name}\``)
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
          }
      }
  })

  const embed = client.embed(`${client.user.username} Commands List!`, `${client.user.username} currently has **${total}** public commands.`).setFooter("Thanks For Using Avio V2 Beta!").setTimestamp()
  if(owner.length && message.isOwner == true){
    const dev = owner.join(", ")
    embed.addField("🛠️ Developer:",dev)
  }
const i = info.join(", ")
const ec = economy.join(", ")
const ut = utility.join(", ")
const msu = music.join(", ")
const lvl = leveling.join(", ")
const md = moderation.join(", ")
const sg = suggestions.join(", ")
const tc = tickets.join(", ")
if(info.length > 0){
  embed.addField("ℹ️ Info:", i)
}
if(moderation.length > 0){
  embed.addField("🛡️ Moderation:", md)
}
if(economy.length > 0){
embed.addField("💰 Economy:", ec)
}
if(leveling.length > 0){
  embed.addField("⬆️ Leveling:", lvl)
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

if(economy.length < 1 && owner.length < 1 && info.length < 1){
    return message.noMentionReply(client.embed("Error", "No commands found."))
}
message.noMentionReply(embed)
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