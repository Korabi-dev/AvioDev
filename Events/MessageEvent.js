const mongoose = require("mongoose")
let { profile } = require("../Utils/models")
const models = require("../Utils/models")
module.exports = {
    name: "message",
    run: async(message, client) => {
       let prefix =  client.prefix
       message.guild.prefix = client.prefix
       var canrun = true
        if(message.guild){
       const newp = await models.prefix.findOne({guild: message.guild.id})
       if(newp){
         prefix = newp.prefix
         message.guild.prefix = newp.prefix
       }
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

message.author.addMoney = async function(type, amount){
    if(!type || !amount || typeof(type) != "string" || typeof(amount) != "number") throw new SyntaxError("message.author.addMoney, Invalid arguments.")
   type = type.toLowerCase()
    const data = await profile.findOne({user: message.author.id})
    if(data){
             if(type == "bank"){
                 data.bank = data.bank + amount
                 return await data.save()
             } else if(type == "wallet"){
                 data.wallet = data.wallet + amount
                 return await data.save()
             }
    } else {
        let wallet = 0
        let bank = 0
        if(type == "wallet"){
            wallet = amount
        }else if(type == "bank"){
            bank = amount
        }
        const newdata = new profile({
            user: message.author.id,
            wallet: wallet,
            bank: bank,
            level: 0,
            xp: 0,
            needed: 69
           });
return await newdata.save()

    }

}

message.author.removeMoney = async function(type, amount){
    if(!type || !amount || typeof(type) != "string" || typeof(amount) != "number") throw new SyntaxError("message.author.removeMoney, Invalid arguments.")
   type = type.toLowerCase()
    const data = await profile.findOne({user: message.author.id})
    if(data){
             if(type == "bank"){
                 data.bank = data.bank - amount
                 return await data.save()
             } else if(type == "wallet"){
                 data.wallet = data.wallet - amount
                 return await data.save()
             }
    } else {
        let wallet = 0
        let bank = 0
        if(type == "wallet"){
            wallet = 0 -amount
        }else if(type == "bank"){
            bank = 0 - amount
        }
        const newdata = new profile({
            user: message.author.id,
            wallet: wallet,
            bank: bank,
            level: 0,
            xp: 0,
            needed: 69
           });
return await newdata.save()

    }

}

message.author.setMoney = async function(type, amount){
    if(!type || !amount || typeof(type) != "string" || typeof(amount) != "number") throw new SyntaxError("message.author.setMoney, Invalid arguments.")
   type = type.toLowerCase()
    const data = await profile.findOne({user: message.author.id})
    if(data){
             if(type == "bank"){
                 data.bank = amount
                 return await data.save()
             } else if(type == "wallet"){
                 data.wallet =  amount
                 return await data.save()
             }
    } else {
        let wallet = 0
        let bank = 0
        if(type == "wallet"){
            wallet = amount
        }else if(type == "bank"){
            bank = amount
        }
        const newdata = new profile({
            user: message.author.id,
            wallet: wallet,
            bank: bank,
            level: 0,
            xp: 0,
            needed: 69
           });
return await newdata.save()
}
}
      
message.author.getMoney = async function(type){
    if(!type ||  typeof(type) != "string") throw new SyntaxError("message.author.getMoney, Invalid arguments.")
   type = type.toLowerCase()
    const data = await profile.findOne({user: message.author.id})
    if(data){
             if(type == "bank"){
                 return data.bank
             } else if(type == "wallet"){
                return data.wallet
             }
    } else {
        let wallet = 0
        let bank = 0
        const newdata = new profile({
            user: message.author.id,
            wallet: wallet,
            bank: bank,
            level: 0,
            xp: 0,
            needed: 69
           });
await newdata.save()
return 0
}
}

message.author.getLevelInfo = async function(type){
    if(!type ||  typeof(type) != "string") throw new SyntaxError("message.author.getLevelInfo, Invalid arguments.")
   type = type.toLowerCase()
    const data = await profile.findOne({user: message.author.id})
    if(data){
             if(type == "xp"){
                 return data.xp
             } else if(type == "level"){
                return data.level
             }else if(type == "needed"){
                 return data.level
             }
    } else {
        const newdata = new profile({
            user: message.author.id,
            wallet: 0,
            bank: 0,
            level: 0,
            xp: 0,
            needed: 69
           });
await newdata.save()
if(type == "xp"){
    return 0
} else if(type == "level"){
   return 0
}else if(type == "needed"){
    return 69
}
}
}

message.author.setLevelInfo = async function(type, set){
    //if(!type || !set) throw new SyntaxError("message.author.setLevelInfo, Invalid arguments.")
   type = type.toLowerCase()
    const data = await profile.findOne({user: message.author.id})
    if(data){
             if(type == "xp"){
                 data.xp = set
                 return await data.save()
             } else if(type == "level"){
                 data.level = set
                return await data.save()
             }else if(type == "needed"){
                  data.needed = set
                 return await data.save()
             }
    } else {
        const xp = 0
        const level = 0
        const needed = 69

        if(type == "xp"){
            xp = set
        } else if(type == "level"){
            level = set
        }else if(type == "needed"){
            needed = set
        }
        const newdata = new profile({
            user: message.author.id,
            wallet: 0,
            bank: 0,
            level: level,
            xp: xp,
            needed: needed
           });
return await newdata.save()
}
}

message.author.addLevelInfo = async function(type, set){
    if(!type ||  typeof(type) != "string" || !set || typeof(set) != "number") throw new SyntaxError("message.author.addLevelInfo, Invalid arguments.")
   type = type.toLowerCase()
    const data = await profile.findOne({user: message.author.id})
    if(data){
             if(type == "xp"){
                 data.xp = data.xp + set
                 return await data.save()
             } else if(type == "level"){
                 data.level = data.level + set
                return await data.save()
             }else if(type == "needed"){
                  data.needed = data.needed + set
                 return await data.save()
             }
    } else {
        const xp = 0
        const level = 0
        const needed = 69

        if(type == "xp"){
            xp = set
        } else if(type == "level"){
            level = set
        }else if(type == "needed"){
            needed = set
        }
        const newdata = new profile({
            user: message.author.id,
            wallet: 0,
            bank: 0,
            level: level,
            xp: xp,
            needed: needed
           });
return await newdata.save()
}
}

message.author.removeLevelInfo = async function(type, set){
    if(!type ||  typeof(type) != "string" || !set || typeof(set) != "number") throw new SyntaxError("message.author.addLevelInfo, Invalid arguments.")
   type = type.toLowerCase()
    const data = await profile.findOne({user: message.author.id})
    if(data){
             if(type == "xp"){
                 data.xp = data.xp - set
                 return await data.save()
             } else if(type == "level"){
                 data.level = data.level - set
                return await data.save()
             }else if(type == "needed"){
                  data.needed = data.needed - set
                 return await data.save()
             }
    } else {
        const xp = 0
        const level = 0
        const needed = 69

        if(type == "xp"){
            xp = set
        } else if(type == "level"){
            level = set
        }else if(type == "needed"){
            needed = set
        }
        const newdata = new profile({
            user: message.author.id,
            wallet: 0,
            bank: 0,
            level:0- level,
            xp:0- xp,
            needed:0- needed
           });
return await newdata.save()
}
}


global.addUserMoney = async function(user, type, amount){
if(!user || !type || !amount) return new Error("Invalid args.")
const data = await profile.findOne({user: user})
if(data){
type = type.toLowerCase()
if(type == "bank"){
    data.bank = data.bank + amount
    return await data.save()
}else if(type == "wallet"){
    data.bank = data.wallet + amount
    return await data.save()
}
} else{
    return new Error("User not found.")
}
}


global.removeUserMoney = async function(user, type, amount){
    if(!user || !type || !amount) return new Error("Invalid args.")
    const data = await profile.findOne({user: user})
    if(data){
    type = type.toLowerCase()
    if(type == "bank"){
        data.bank = data.bank - amount
        return await data.save()
    }else if(type == "wallet"){
        data.bank = data.wallet - amount
        return await data.save()
    }
    } else{
        return new Error("User not found.")
    }
    }

    global.setUserMoney = async function(user, type, amount){
        if(!user || !type || !amount) return new Error("Invalid args.")
        const data = await profile.findOne({user: user})
        if(data){
        type = type.toLowerCase()
        if(type == "bank"){
            data.bank = amount
            return await data.save()
        }else if(type == "wallet"){
            data.bank =  amount
            return await data.save()
        }
        } else{
            return new Error("User not found.")
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
            } else {
              
                if(command.guild && !message.guild){
                    stop()
                    return message.reply(client.embed("Error", "You can't use this command in dms."))
                } else {
                   
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
                    try{
                        if(canrun == true){
                   await command.run(client, message, args)
                   stop()
                        }
                    }catch(e){
                        const channel = client.channels.cache.get("860961529390039050")
                        const embed = client.embed("Error", ` Message:\n\`\`\`js\n${require("util").inspect(e)}\`\`\`\nCommand: \`\`\`${command.name}\`\`\`\nUser: \`\`\`${message.author.tag}\`\`\`\nUser ID: \`\`\`${message.author.id}\`\`\`\nDev | Owner: \`\`\`${message.isOwner ? "Yes" : "No"}\`\`\`\nGuild: \`\`\`${message.guild}\`\`\`\nGuild ID: \`\`\`${message.guild.id}\`\`\` `).setTimestamp()
                        channel.send(embed)
                        message.reply(client.embed("Error (Developer Level)", `Error:\n\n\`\`\`js\n${require("util").inspect(e)}\n\`\`\`\n\nCommand: ${command.name}`).setFooter("Please report this to a developer."))
                    }
                    const data = await profile.findOne({user: message.author.id})
                    if(data){
                        
                        data.xp = data.xp + 10
                        await data.save()
                        if(data.xp >= data.needed){
                        data.level = data.level + 1
                        data.xp = 0
                        data.needed = data.needed * 2
                        await data.save().then(promise => {
                            message.mentionReply(client.embed("Level Up!", `Congratulations! You have leveled up to level ${data.level}.`))
                        })
                        }
                    } else {
                        const newdata = new profile({
                            user: message.author.id,
                            wallet: 0,
                            bank: 0,
                            level:0,
                            xp:10,
                            needed:69
                           });
                await newdata.save().then(promise => {
                    message.mentionReply(client.embed("New User!", `Hello! Looks like it is your first time using ${client.user.username}, We thank you very much for using our bot it's really awesome! <3`))
                })
                    }

                }
            }
        }
    }
}