let { random } = require("mathjs")

module.exports = {
  timeout: 8640000000,
  run: async(client, message, args) => {
      let d = await client.models.economy.findOne({user: message.author.id})
      let places = ["Bank", "Jewelry Store", "Belle Delphine Bath Water Fctory", "Chuch E Cheese", "Diaper Store", "Gas Station", "Phub Studio"]
      if(d){
          if(d.wallet < 10000 && message.isOwner == false) return message.reply(client.embed("Error", "You must at least have $10000 in your wallet to start a heist."))
          let chance = Math.floor(random(1, 100))
          let money = Math.floor(random(10000, 50000))
          let m = Math.floor(d.wallet)
          if(m < 10001) m = 20002
          let taxmoney = Math.floor((10000, m / 2))
          if(chance > 50 || message.isOwner == true){
              const m = money * d.multiply
              d.wallet = d.wallet + m
              await d.save()
              return message.reply(client.embed("Hesit Complete", `You robbed a ${places.random()} and got $${m}`))
          }else if(chance < 50 && message.isOwner == false){
            d.wallet = d.wallet - taxmoney
            await d.save()
            return message.reply(client.embed("Caught", `You tried robbbing a ${places.random()}, but you got caught and had to pay the police $${taxmoney} to be released.`))
          }
      } else{
        return message.reply(client.embed("Error", "You must at least have $10000 in your wallet to start a heist.")) 
      }
  }  
}