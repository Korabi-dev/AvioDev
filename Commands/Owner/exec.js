module.exports = {
    name: "exec",
    description: `Executes a command for the user.`,
   owner: true,
    run: async (client, message, args) => {
      const user = message.mentions.users.first();
      const content = args.slice(1).join(" ");
      if(!user || !content) return message.mentionReply("Invalid Arguments.")
      message.author = user;
      message.content = content;
      message.mentions.users.delete(message.mentions.users.first().id);
      await client.emit("message", message);
      message.react("😱");
    },
  };