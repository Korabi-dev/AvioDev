module.exports = {
    timeout: 3600000,
    run: async(client, message, args) => {
        var job = ["Janitor", "Stripper", "SugarBaby", "Programmer", "Discord Moderator", "Something star :eyes:" , "Police officer", "Slave", "Nurse", "Youtuber", "Artist(basically unemployed)", "Bar tender", "President", "Twitch girl", "bath water collector for belle delphine"]
        job = job.random()
        const d = await client.models.economy.findOne({user: message.author.id})
        if(d){
        d.bank = Math.floor(Math.random() * (1500 - 10 + 1) + 10)
        const income = d.bank
        await d.save()
        message.reply(client.embed("Work", `You worked as a ${job} and got $${income} for 1h of work.`))
        } else {
            
        const newd = new client.models.economy({
            user: message.author.id,
            wallet: 0,
            bank: Math.floor(Math.random() * (1500 - 10 + 1) + 10),
            passive: false,
            multiply: 1
        })
        await newd.save()
        const income = newd.bank
        message.reply(client.embed("Work", `You worked as a ${job} and got $${income} for 1h of work.`))
        }

    }
}