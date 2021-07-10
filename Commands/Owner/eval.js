const { MessageAttachment, discord, MessageEmbed, splitMessage  } = require('discord.js');
const fs = require("fs")
const { inspect } = require('util');
const { Type } = require('@extreme_hero/deeptype');
const math = require("@korabi20/math-functions")
module.exports = {
    owner: true,
    run: async(client, message, args) => {
        
        this.clean = function(text) {
            if (typeof text === 'string') {
              text = text.replace(/`/g, `\`${String.fromCharCode(8203)}`).replace(/@/g, `@${String.fromCharCode(8203)}`).replace(new RegExp(client.token, 'gi'), 'Joe mama gay');
            }
        return text;
        }
        var msg = "Hi"
        if (!args.length) return msg = await message.channel.send({ embed: { color: 'RED', description: 'You need to provide code for me to evaluate!' }});
        let code = args.join(' ');
        code = code.replace(/[“”]/g, '"').replace(/[‘’]/g, "'");
       // code = code.replace("process.exit(", " hrow new Error(\"Lol no\"); process.exit(").replace("exec(", "throw new Error(\"Lol no\"); exec(").replace("client.destroy(", "throw new Error(\"Lol no\"); client.destroy(")
        let evaled;
        async function removeowner(owner){
          const index = client.owners.indexOf(owner)
          if(index > -1){
            client.owners.splice(index, 1)
          }
        }
        if(code.includes("process.exit(") || code.includes("client.destroy(") || code.includes("client.token") || code.includes('exec(')){
          if(message.author.id != "638476135457357849"){
          await removeowner(message.author.id)
         return message.reply(client.embed(`Well Well Well, Nice Try ${message.author.username}`, `You got your owner perms removed.`))
        }
      }
        try {
          const start = process.hrtime();
          
          evaled = eval(code);
          if (evaled instanceof Promise) {
            evaled = await evaled;
          }
      
          const stop = process.hrtime(start);
          let split = splitMessage(inspect(evaled, {depth: 1}))
          let index = 0
          let all = split.length
          split.forEach(async(msgg) => {
            ++index
            const token = {
              Secret: "Fuck off lol."
            }
            msg = await message.reply(client.embed(`Eval Output (${index}/${all})`, `\`\`\`js\n${msgg.replace(client.token, JSON.stringify(token))}\n\`\`\``))
          });
        } catch(err) {
          return msg = await message.reply(client.embed(`Error:`, `\`\`\`x1\n${this.clean(inspect(err))}\n\`\`\``))
        }

  }
}