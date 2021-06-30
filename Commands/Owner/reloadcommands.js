module.exports = {
  name: "reloadcommands",
  owner: true,
  run: async (client, message, args) => {
 await client.reloadCommands().then(promise => {
     message.mentionReply("Reloaded All Commands!")
 })
},
};