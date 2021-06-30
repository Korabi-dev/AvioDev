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
const config = require("../src/config.json")
const mongoose = require("mongoose")

client.owners = ["638476135457357849", "764901658303922247", "705843647287132200"]
client.models = require("../Utils/models")
client.timeouts = new discord.Collection()
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

client.manager.init("855057364032684092")
  client.on("raw",(d) => {client.manager.updateVoiceState(d)});

  client.manager.on("nodeConnect", (node) =>
  console.log(`Node ${node.options.identifier} has been connected.`)
);

client.manager.on("nodeError", (node, error) =>
  console.log(`Node: ${node.options.identifier} had an error || ${error.message}`)
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
    console.log(`Loaded Event: ${event.name}`)
}
}
mongoose.connect(config.mongoose, {useNewUrlParser: true, useUnifiedTopology: true,}) .then(() => {console.log("Connected to database.");});




async() => {
    const connection = await mongoose.connect(config.mongoose, {useNewUrlParser: true, useUnifiedTopology: true,}) .then(() => {console.log("Connected to database.");});
const adminUtil = connection.db.admin()
 const result = adminUtil.ping() 
 client.mongoping = result
}
client.login(config.token).then(callback => {
    client.loadCommands()
    client.loadEvents()
    console.log("Client is logged in!")
})
