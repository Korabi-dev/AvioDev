const { MessageAttachment, discord, MessageEmbed, splitMessage  } = require('discord.js');
const fs = require("fs")
const { inspect } = require('util');
const { Type } = require('@extreme_hero/deeptype');


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
        let evaled;
        try {
          const start = process.hrtime();
          evaled = eval(code);
          if (evaled instanceof Promise) {
            evaled = await evaled;
          }
    
          const stop = process.hrtime(start);
          let split = splitMessage(inspect(evaled, {depth: 1}))
          const response = [
            `\`\`\`js\n${split[0]}\n\`\`\``
          ]
           msg = await message.reply(client.embed("Eval Output:", `${response[0]}`));
          
        } catch(err) {
          return msg = await message.reply(client.embed(`Error:`, `\`\`\`x1\n${this.clean(err)}\n\`\`\``))
        }
        await msg.react("❌")

        const filter = (reaction, user) => {
            return ['❌'].includes(reaction.emoji.name) && user.id === message.author.id;
        };
        
        msg.awaitReactions(filter, { max: 1, errors: ['time'] })
            .then(collected => {
                const reaction = collected.first();
         if(reaction.emoji.name === '❌'){
                    message.delete()
                    msg.delete()
                }
            })
            .catch(collected => {
                return;
            });
    
    
    
}
}