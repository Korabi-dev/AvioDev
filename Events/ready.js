module.exports={
    name: "ready",
    once: true,
    run: async function(client){
    client.user.setActivity(`${client.prefix}help | ${client.prefix}help <command>`)
    client.channels.cache.forEach(channel => {
      if(channel.isText()) {
      channel.stopTyping()
      }})
    }
  }