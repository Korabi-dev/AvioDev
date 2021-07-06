module.exports={
    name: "voiceStateUpdate",
    run: async(old,newc,client)=>{
      const { guild } = old
 
      if(guild.me.voice?.channel?.members.size < 2){
        const player = client.manager.players.get(guild.id)
        if(!player) return;
 
        const channel = guild.channels.cache.get(player.textChannel)
        
        channel.send(client.embed("Music System", `Nobody is listening in the voice channel, so I left.`))

        await player.destroy()
      }
    }
 }