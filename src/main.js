const discord = require("discord.js");
require("discord-inline-replys")
const client = new discord.Client({ws: {intents: discord.Intents.ALL}});
const { Manager } = require("erela.js")
const Spotify = require("erela.js-spotify")
client.commands = new discord.Collection();
require("discord-buttons")(client)
const fs = require("fs");
let maincolor = "#7289d5";
client.maincolor = maincolor
client.prefix = "!"
const config = require("../src/config.json")
const mongoose = require("mongoose")
const { exec } = require("child_process")
let cmds = 0
let events = 0
client.owners = ["638476135457357849", "764901658303922247", "705843647287132200"]
client.models = require("../Utils/models")
client.timeouts = new discord.Collection()
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

client.reloadCommands = async function(){
   client.commands.map(cmd => {
       client.commands.delete(cmd.name)
   })
   const folders = fs.readdirSync(`Commands`);
   for(const folder of folders){
       const files = fs.readdirSync(`Commands/${folder}`).filter(file => file.endsWith(".js"));
       for(const file of files){
           const command = require(`../Commands/${folder}/${file}`)
           if(!command.category) {command.category = folder};
           if(!command.name) {command.name = file.toLowerCase().replace(".js", "")};
           client.commands.set(command.name, command)
           console.log("Reloaded Command:", command.name)
       };
}
}

client.loadEvents = function(){
    const eventFiles = fs.readdirSync(`Events`).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`../Events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.run(...args,client));
	} else {
		client.on(event.name, (...args) => event.run(...args,client));
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

client.login(config.token).then(callback => {
    client.loadCommands()
    client.loadEvents()
    console.log(`There are ${cmds} commands, and ${events} events that have been loaded.`)
    console.log("Client is logged in!")
})
