module.exports = {
    name: "error",
    run: async(err, client) => {
        const id = "857261873677991936"
        const channel = client.channels.cache.get(id)

        channel.send(client.embed("Error:", err))
    }
}