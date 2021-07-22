const moment = require("moment")
module.exports={
    name: "ready",
    once: true,
    run: async(client) =>{
    client.user.setActivity(`${client.prefix}help | ${client.prefix}help <command>`)
    client.channels.cache.forEach(channel => {
      if(channel.isText()) {
      channel.stopTyping()
      }})

      const doc = await client.models.restarts.findOne({active: true})
      let id = 0
      if(!doc){
        const newd = new client.models.restarts({
          active: true,
          last: Date.now(),
          restarts: 0
        })
        await newd.save()
      } else {
        id = doc.restarts + 1
        doc.restarts = id
        doc.last = Date.now()
        await doc.save()
      }
      var currentdate = new Date(); 
      const formatted = currentdate.getDate() + "/"
      + (currentdate.getMonth()+1)  + "/" 
      + currentdate.getFullYear() + " @ "  
      + currentdate.getHours() + ":"  
      + currentdate.getMinutes() + ":" 
      + currentdate.getSeconds();
  const channel = client.channels.cache.get("867789902367031346")      
  channel.send(client.embed(`Restart #${id}`, `Avio has restarted at the time of ${formatted}, and now is at ${id} restarts.`))
  console.log(`${client.user.tag} has logged in with a ping of ${client.ws.ping} miliseconds, at the time of ${formatted}.`)
    }
  }