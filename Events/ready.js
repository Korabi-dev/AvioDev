module.exports={
    name: "ready",
    once: true,
    run: async function(client){
    client.user.setActivity("V2 Is Coming! Hype!")
    }
  }