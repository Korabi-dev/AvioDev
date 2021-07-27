module.exports = {
    name: "messageUpdate",
    run: async(oldm, newm, client) => {
        if(oldm == newm) return;
        if(newm.author.bot) return;
        client.editsnipes.set(newm.channel.id, oldm)
    }
}
