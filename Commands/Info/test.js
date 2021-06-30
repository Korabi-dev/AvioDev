const { MessageButton, MessageActionRow } = require("discord-buttons");
module.exports = {
    name: "testb",
    run: async(client, message, args) => {
        const buttons = new MessageActionRow().addComponents( 
            new MessageButton().setLabel("Yes").setID("green").setStyle("green"),
            new MessageButton().setLabel("No").setID("red").setStyle("red")
            )
     let m = await message.channel.send("Do you want to test?",{
        components: [buttons]
      });

     const filter = (button) => button.clicker.user.id === message.author.id;
     const collector = m.createButtonCollector(filter); //collector for 5 seconds
     
     collector.on('collect', b => {
b.reply.send(`You clicked the ${b.id} button`)
collector.stop("EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE")
 m.edit(`Testing complete, ${message.author}`, {components: null})
     });
    }
}