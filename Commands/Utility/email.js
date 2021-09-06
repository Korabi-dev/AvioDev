const nodemailer = require("nodemailer")
require("dotenv").config()
module.exports = {
    owner: true,
    timeout: 60000,
    run: async(client, message, args) => {
        if(!args[0] || !args[1]) return message.reply(client.embed("Error!", `Invalid syntax, valid syntax: \`${message.guild.prefix}email <reciever> <content>\``))
    let email = args[0]
    let text = args.slice(1).join(" ")
    const info = {
        service: 'gmail',
          auth: {
        user: process.env.email_user,
        pass: process.env.email_pass
      }
    }
    var transporter = nodemailer.createTransport(info);

var mailOptions = {
  from: process.env.email_user,
  to: email,
  subject: `Email From Discord User ${message.author.tag}`,
  html: text
};
transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    message.reply(client.embed("Error!", `No e-mail was sent to ${email}\n${error}`))
  } else {
    message.reply(client.embed("Success!", `E-mail sent to ${email} successfully`))
  }
});
    }
}