module.exports = {
    run: async(client, message, args) => {
        if(!args[0]) return;
        message.reply(args.all)
    }
}