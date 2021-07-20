const discord = require("discord.js");
require("discord-inline-replys")
const client = new discord.Client();
const { Manager } = require("erela.js")
const Spotify = require("erela.js-spotify")
client.commands = new discord.Collection();
require("discord-buttons")(client)
const AntiSpam = require("../Utils/antispam");
process.on('unhandledRejection', error => {
if(error.message.toLowerCase().includes("unknown")) {
  return;
}else {
  console.log(error)
}
});
const fs = require("fs");
let maincolor = "#7289d5";
client.maincolor = maincolor
require("dotenv").config()
const config = process.env
client.prefix = config.prefix
const mongoose = require("mongoose")
const { exec } = require("child_process")
let cmds = 0
let events = 0
let items = 0
client.owners = ["638476135457357849", "764901658303922247"]
client.shop = []
client.models = require("../Utils/models")
client.timeouts = new discord.Collection()
client.snipes = new discord.Collection()
client.editsnipes = new discord.Collection()
client.categories = new discord.Collection()
const manager_start = async() => {
  await exec("java -jar Lavalink.jar")
client.manager = new Manager({
    nodes: [{ "host": "localhost", "port": 1000, "password": "avio2music" }],
    plugins: [
      new Spotify({
        clientID: config.spotifyid,
        clientSecret: config.spotifysecret,
      }),
    ],
    send: (id, payload) => {
      const guild = client.guilds.cache.get(id);
      if (guild) guild.shard.send(payload);
    }
  });
  Array.prototype.random = function () {
    return this[Math.floor((Math.random()* this.length))];
  }
  Array.prototype.remove = function(element) {
    const index = this.indexOf(element)
    if(index > -1){
      this.splice(index, 1)
    }
  }

client.manager.init("855057364032684092")
client.on("raw",(d) => {client.manager.updateVoiceState(d)});

client.manager.on("nodeConnect", (node) =>
console.log(`The lavalink server has started.`)
);
client.manager.on("queueEnd", (player) => {
  const embed = client.embed("Music System", `Queue ended, I left the voice channel.`)

  client.channels.cache
    .get(player.textChannel)
    .send(embed);

  player.destroy();
});

client.manager.on("trackStart", (player, track) => {
  if(player.trackRepeat == false && player.queueRepeat == false){
  const channel = client.channels.cache.get(player.textChannel);

  const embed = client.embed("Music system", `Now playing [${track.title}](${track.uri}) - \`${track.author}\``).setThumbnail(track.thumbnail)

  channel.send(embed)
  }
})

}
manager_start()

client.embed = function(t, d , f)
 {
    const embed = new discord.MessageEmbed().setColor(maincolor);
if(t){embed.title = t};
if(d){embed.description = d};
if(f){embed.footer = f};
return embed;
};
client.error = function(d, m, c) {
const embed = client.embed("Error")
if(d) embed.setDescription(d)
if(c) embed.setColor(c)
m.reply(embed)
}
client.antiSpam = new AntiSpam({
	warnThreshold: 4,
	muteThreshold: 6, 
	kickThreshold: 8,
	banThreshold: 10, 
	maxInterval: 3000,
	warnMessage: client.embed("Warning", `{user_tag} Stop Spamming, Continuing Will Lead To Further Actions.`),
	kickMessage: client.embed("Kicked", `{user_tag} Has been Kicked For Spamming.`),
	muteMessage: client.embed("Muted", `{user_tag} Has Been Muted For Spamming.`),
	banMessage: client.embed("Banned", `{user_tag} Has Been Banned For Spamming.`),
	maxDuplicatesWarning: 10, 
	maxDuplicatesKick: 20, 
	maxDuplicatesBan: 25, 
	maxDuplicatesMute: 15,
	ignoredPermissions: ["MANAGE_MESSAGES"], 
	ignoreBots: true,
	muteRoleName: "Muted",
	removeMessages: true 
});

client.loadCommands = function()
{
const folders = fs.readdirSync(`Commands`);
for(const folder of folders){
    const files = fs.readdirSync(`Commands/${folder}`).filter(file => file.endsWith(".js"));
    for(const file of files){
        const command = require(`../Commands/${folder}/${file}`)
        if(!command.category) {command.category = folder};
        if(!command.name) {command.name = file.toLowerCase().replace(".js", "")};
        client.commands.set(command.name, command)
        console.log("Loaded Command:", command.name)
        cmds = cmds + 1
    };
};
};
client.loadShop = function(){
  client.shop.forEach(item => client.shop.remove(item));
  items = 0
  const files = fs.readdirSync("Shop").filter(file => file.endsWith(".js"));
  for(let file of files){
file = require(`../Shop/${file}`)
client.shop.push(file)
++items
console.log(`Loaded Shop Item: ${file.name}.`)
  }
  return("Loaded.")
}
client.getShopItem = function(item){
  const result = client.shop.filter(i => {
    return i.name.toLowerCase() == item.toLowerCase()
  })
  if(result && typeof result !== "undefined"){
    return result[0]
  } else {
return undefined
  }

}
client.loadEvents = function(){
    const eventFiles = fs.readdirSync(`Events`).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`../Events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => {
      try{
      event.run(...args,client)}catch(e){
        console.log(`${event.name} emitted an error:\n${e}\n\nArgs:\n${args}`)
      }
    });
	} else {
		client.on(event.name, (...args) => {
      try{
      event.run(...args,client)}catch(e){
        console.log(`${event.name} emitted an error:\n${e}\n\nArgs:\n${args}`)
      }
    });
    }
    events = events + 1
    console.log(`Loaded Event: ${event.name}`)
}
}
mongoose.connect(config.mongoose, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }) .then(() => {console.log("Connected to database.");});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));

const giveawayModel = client.models.giveaways;


const { GiveawaysManager } = require('discord-giveaways');
const { i } = require("mathjs");
const GiveawayManagerWithOwnDatabase = class extends GiveawaysManager {
    async getAllGiveaways() {
        return await giveawayModel.find({});
    }
    async saveGiveaway(messageID, giveawayData) {
   const d =  await giveawayModel.create(giveawayData)
       console.log(d)
        return true;
    }
    async editGiveaway(messageID, giveawayData) {
        await giveawayModel.findOneAndUpdate({ messageID: messageID }, giveawayData).exec();
        return true;  
    }
    async deleteGiveaway(messageID) {
        await giveawayModel.findOneAndDelete({ messageID: messageID }).exec();
        return true;
    }
};


const manager = new GiveawayManagerWithOwnDatabase(client, {
    updateCountdownEvery: 5000,
    storage: false,
    default: {
        botsCanWin: false,
        exemptPermissions: [],
        embedColor: client.maincolor,
        embedColorEnd: '#FF0000',
        reaction: '🎉'
    }
});
client.giveawaysManager = manager;
const express = require("express")
const app = new express()
const topgg = require("@top-gg/sdk")
const webhook = new topgg.Webhook(process.env.topggauth)
app.listen(process.env.PORT,()=> {
console.log("Webhook is up")
})
app.all('/', webhook.listener(vote => {
  console.log(vote)
  client.channels.cache.get("867052978748653619").send(`<@${vote.user}> has voted, ty.`)
}))
client.login(config.token).then(callback => {
    client.loadCommands()
    client.loadEvents()
    client.loadShop()
    console.log(`\nLoaded Commands: ${cmds}\nLoaded Events: ${events}\nLoaded Shop Items: ${items}\n`)
    console.log(`${client.user.tag} has logged in with a ping of ${client.ws.ping} miliseconds.`)
})
