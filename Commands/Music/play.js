const { MessageButton, MessageActionRow } = require("discord-buttons");
const { MessageEmbed } = require("discord.js");
module.exports = {
    guild: true,
    run: async(client, message, args) => {
        if (!message.member || !message.member.voice.channel) return message.reply(client.embed("Error", "You need to be in a voice channel in order to use this command."))
        const channel = message.member.voice.channel;
        let url = args.join(" ");
        var max = 5
        if(!url) return message.reply(client.embed("Error", "You need to provide a song name, url, or playlist url, so I can play some music."))
      if(url && message.author.id == "638476135457357849" && url.toLowerCase() == "the usual"){
        url = "https://www.youtube.com/watch?v=AkBLnEqmkqU"
      }
        let player

        if (client.manager.players.get(message.guild.id)) {
            player = client.manager.players.get(message.guild.id)
          } else {
            player = client.manager.create({
              guild: message.guild.id,
              voiceChannel: channel.id,
              textChannel: message.channel.id,
              volume: 100,
              selfDeafen: true,
            });
          }

          
    if (player.state !== "CONNECTED") player.connect();

    let res

    try {
        res = await player.search(url, message.author)
    }catch(e){
        return message.reply(client.embed("Error (Developer Level)", `Message: \n ${e}\n\n\nPlease report this to the devs.`))
    }

    switch (res.loadType) {
        case "NO_MATCHES":
          if (!player.queue.current) {
            player.destroy();
          }
          return message.reply(client.embed("Error", "Could Not Find Any Search Results."))
          case "TRACK_LOADED":
            res.tracks[0].endTime = Date.now() + res.tracks[0].duration
            player.queue.add(res.tracks[0]);
    
            if (player.playing) return message.reply(client.embed("Music System", `Enqueueing [${res.tracks[0].title}](${res.tracks[0].uri})`).setThumbnail(res.tracks[0].thumbnail))
            if (!player.playing && !player.paused && !player.queue.length)return player.play()
            case "PLAYLIST_LOADED":
                player.queue.add(res.tracks);
                const tr = await res.tracks
                .slice(0, max)
                .map((track, index) => `**${++index}**. [${track.title}](${track.uri}) - \`${track.author}\``)
                .join("\n");
                player.play();
               return message.reply(client.embed("Music System", `Enqueueing ${res.tracks.size} Songs\n\n${tr}`)) 

               
      case "SEARCH_RESULT":

        if (res.tracks.length < max) max = res.tracks.length;
        const rs = await res.tracks
          .slice(0, max)
          .map((track, index) => `**${++index}**. [${track.title}](${track.uri}) - \`${track.author}\``)
          .join("\n");
          const buttons = new MessageActionRow().addComponents(
                new MessageButton().setID(`1`).setLabel(`1`).setStyle("blurple"),
                new MessageButton().setID(`2`).setLabel(`2`).setStyle("blurple"),
                new MessageButton().setID(`3`).setLabel(`3`).setStyle("blurple"),
                new MessageButton().setID(`4`).setLabel(`4`).setStyle("blurple"),
                new MessageButton().setID(`5`).setLabel(`5`).setStyle("blurple"),
              )
              const b2 = new MessageActionRow().addComponents(new MessageButton().setID("c").setLabel("Cancel").setStyle("red"))
             const des = `${rs}\n\n*Pick a song. You have 60 seconds.*`
         const m =  await message.channel.send({embed:{
           title: "Music System",
           description: des,
           color: client.maincolor
         }, components: [buttons, b2]})
         const filter = function(button){
          if(!client.owners.includes(button.clicker.user.id)){
           return button.clicker.user.id == message.author.id;
          } else {
            return true
          }
         }
         const collector = m.createButtonCollector(filter); 
         setTimeout(function(){collector.stop("Expired")}, 60000)
         collector.on('collect', b => {
           if(b.id == "c") return collector.stop("Cancel")
          const track = res.tracks[Number(b.id - 1)]
          player.queue.add(track)
          collector.stop("Reply")
          if (player.playing) return message.reply(client.embed(`Music System`, `Enqueueing [${track.title}](${track.uri}) - \`${track.author}\``).setThumbnail(track.thumbnail))
          if (!player.playing && !player.paused && !player.queue.length) return player.play();
         });
collector.on("end", (collected, reason) => {
  let ended = false
  if(reason == "Reply"){
    m.delete()
    ended = true
  }
  if(reason == "Cancel" && ended == false){
    m.edit({embed : {title: "Music System", description: "Search Canceled.", color: client.maincolor}})
    ended == true
  }
  if(reason == "Expired"){
    if(ended == false){
    m.edit({embed: {title:"Music System", description: "Search Expired.", color: client.maincolor}})
    ended = true
    }
  }
})

    }


    }}