const { Util } = require("discord.js");
module.exports = {
botpermissions: ["MANAGE_EMOJIS"],
 guildOnly: true,
  run: async (client, message, args) => {
   var emojis = [];
    for (const emoji of args) {
      const parsed = Util.parseEmoji(emoji);
      if (parsed.id) {
        const extention = parsed.animated ? ".gif" : ".png";
        const url = `https://cdn.discordapp.com/emojis/${parsed.id + extention}`;
        const emoji = await message.guild.emojis.create(url, parsed.name);
        emojis.push(`${emoji} - \`${parsed.name}\``);
      }
    }
    if(emojis.length == 1) {
message.reply(client.embed("Success", `Saved ${emojis[0]}`))
    } else if (emojis.length > 1) {
      message.reply(client.embed("Success", `Saved:\n${emojis.join("\n")}`))
    } else if(emojis.length < 1){
      message.reply(client.embed("Error", "Please provide 1 or more emojis to use this command."))
    }
  }, 
};
