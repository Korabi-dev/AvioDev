module.exports = {
    name: "messageUpdate",
    run: async(oldm, newm, client) => {
        if(oldm == newm) return;
        if(newm.author.bor) return;
        client.editsnipes.set(newm.channel.id, oldm)
    }
}