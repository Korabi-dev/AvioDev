const { ECHILD } = require("constants")
const mongoose = require("mongoose")
const ms = require("ms")
let { profile } = require("../Utils/models")
const models = require("../Utils/models")
module.exports = {
    name: "message",
    run: async(message, client) => {
        require("dotenv").config()
        if(message.isOwner == false && client.user.id == "855057364032684092") return;
         const economy = await client.models.economy.findOne({user: message.author.id})
         if(economy && !message.author.bot){
             if(economy.bank < 0) economy.bank = 0
             if(economy.wallet < 0) economy.wallet = 0
             await economy.save()
         }
        if(!economy && !message.author.bot){
            const newe = new client.models.economy({
                user: message.author.id,
                passive: false,
                bank: 0,
                wallet: 0,
                multiply: 1,
                backpack: []
            })
            await newe.save()
        }
        try{
       let prefix = process.env.prefix
       message.guild.prefix = prefix
       var canrun = true
        if(message.guild){
       const newp = await models.prefix.findOne({guild: message.guild.id})
       if(newp){
         prefix = newp.prefix
         message.guild.prefix = newp.prefix
       }
    }
}catch(e){
    return;
}
    if(client.user.id == "855057364032684092"){
        prefix = "!"
        message.guild.prefix = "!"

    }
   
        if(message.author.bot || !message.content.startsWith(prefix) || message.content == prefix || !message.guild.me.hasPermission("SEND_MESSAGES") || !message.channel.permissionsFor(message.guild.me).has("SEND_MESSAGES")) return;
        let rg = /[a-zA-Z]/g;
        let str = String(message.content)
        let b = rg.test(str)
        if(b == false) return;
        message.isOwner = false
        message.author.isBlacklisted = false
if(client.owners.includes(message.author.id)){
    message.isOwner = true
}
 function start(){
     message.channel.startTyping()
 }
 function stop(){
    message.channel.stopTyping()
 }
 async function run(command){
    try{
   await command.run(client, message, args)
   stop()
    }catch(e){
        try {
        const channel = client.channels.cache.get("860961529390039050")
        const embed = client.embed("Error", ` Message:\n\`\`\`js\n${require("util").inspect(e)}\`\`\`\nCommand: \`\`\`${command.name}\`\`\`\nUser: \`\`\`${message.author.tag}\`\`\`\nUser ID: \`\`\`${message.author.id}\`\`\`\nDev | Owner: \`\`\`${message.isOwner ? "Yes" : "No"}\`\`\`\nGuild: \`\`\`${message.guild}\`\`\`\nGuild ID: \`\`\`${message.guild.id}\`\`\` `).setTimestamp()
        channel.send(embed)
        message.reply(client.embed("Error (Developer Level)", `Error:\n\n\`\`\`js\n${require("util").inspect(e)}\n\`\`\`\n\nCommand: ${command.name}`).setFooter("Please report this to a developer."))
        }catch(err) {
            console.error(e)
        }
    }
 }
    

        message.reply = function(content, options = {}){
         if(!options.mention){
             return message.noMentionReply(content)
         }   
         if(options.mention){
             return message.mentionReply(content)
         }
        }

        message.error = function(d, c) {
            const embed = client.embed("Error")
            if(d) embed.setDescription(d)
            if(c) embed.setColor(c)
            message.reply(embed)
            }

let [commandName, ...args] = message.content
        .slice(prefix.length)
        .trim()
        .split(/ +/);
      commandName = commandName.toLowerCase()
      args.clean = message.cleanContent.slice(prefix.length + commandName.length);
      args.all = message.cleanContent.replace(`${prefix}${commandName}`, "")
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
              
              if(!command){
                  const d = await client.models.cc.findOne({command: commandName.toLowerCase(), guild: message.guild.id})
                  if(d){
                      canrun = false
                      return message.reply(d.response)
                  }
              }
        if(!command) {
            return message.reply(client.embed("Error", "Invalid Command."), {mention: true})
             } else {
                 start()
                const d = await client.models.blacklist.findOne({user: message.author.id})
                if(d && message.isOwner == false){
                    stop()
                    if(d.active == true) return message.reply(client.embed("Error", `You are blacklisted from using ${client.user.username}.`).setColor("RED"))
                } 
                const d2 = await client.models.blacklist.findOne({user: message.guild.id})
                if(d2 &&!message.isOwner){
                    stop()
                    if(d2.active == true) return message.reply(client.embed("Error", `${message.guild.name} is blacklisted.`).setColor("RED"))
                }
                const d3 = await client.models.disable.findOne({guild: message.guild.id})
                if(d3){
                    stop()
                    if(d3.disabled.includes(commandName)) return message.reply(client.embed("Error", `This command is disabled in ${message.guild.name}`))
                }
            if(command.owner && message.isOwner == false) {
                stop()
                return message.reply(client.embed("This command is owner only."))
            } 
              
                if(command.guild && !message.guild){
                    stop()
                    return message.reply(client.embed("Error", "You can't use this command in dms."))
                }
                

                    if(command.permissions){
                        command.permissions.forEach(perm => {
                            if(!message.member.hasPermission(perm) && !message.isOwner) {
                                if(canrun == true){
                        canrun = false  
                        stop()
                            message.reply(client.embed("Missing Permissions", `You need the \`${perm.replace("_", " ")}\` permission to use this command.`)) }}
                        })
                    }
                    if(command.botpermissions){
                        command.botpermissions.forEach(perm => {
                            if(!message.guild.me.hasPermission(perm)) {
                                if(canrun == true){
                                canrun = false
                                stop()
                              return   message.reply(client.embed("Missing Permissions", `I need the \`${perm.replace("_", " ")}\` permission for this command to work.`))
                            }}
                        })
                    }
                    if(command.timeout){
                        const d = await client.models.timeouts.findOne({user: message.author.id})
                        if(d){
                            let exists = false
                            if(d.commands.length < 1) exists = false
                            d.commands.forEach(com=> {
                                if(com.name == command.name) exists = true
                            })
                           if(exists == true){
                            d.commands.forEach(async(c) => {
                                if(canrun == true){
                                if(c.name == command.name){
                                    const time = c.timeout + c.last
                                    if(Date.now() >= time){
                                        d.commands.remove(c)
                                        await d.save()
                                        run(command)
                                        d.commands.push({name: command.name, timeout: command.timeout, last: Date.now()})
                                      return await d.save()
                                    } else{
                                        if(!message.isOwner){
                                        canrun = false
                                        return message.reply(client.embed("Error", `This command is on cooldown you can use it in ${ms(time - Date.now(), {long: true})}`))
                                        } else {
                                            canrun = false
                                            run(command)
                                        }
                                    }
                                }
                                }
                            })
                            
                    } else {
                        run(command)
                         d.commands.push({name: command.name, timeout: command.timeout, last: Date.now()})
                        return await d.save()
                    }
    
                        } else {
                            const newd = new client.models.timeouts({
                                user: message.author.id,
                                commands: [{name: command.name, timeout: command.timeout, last: Date.now()}]
                            })
                            await newd.save()
                            if(canrun ==true){
                                canrun = false
                                return await run(command)
                            }
                        }
               } else {
                   if(canrun ==true){
                   run(command)
                   }
               }
                }//command = true
            }
        }
    