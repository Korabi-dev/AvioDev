const translate = require("@iamtraction/google-translate")
const isoConv = require("iso-language-converter")
module.exports = {
  owner: false,
    guild: false,
    run: async(client, message, args) => {
        if(args.all.length < 1){
            return message.reply(client.embed("Error", "Please provide something to translate."))
        }
        const translated = await translate(args.all, {to: "en"})
        if(!translated){
            return message.reply(client.embed("API Error", "The API is currently experiencing issues, please try again later."))
        } else {
            const iso = isoConv(translated.from.language.iso, {from: 1, to: 'label'})
            return message.reply(client.embed("Translation", `Input Text:\n${args.all}\n\nTranslated Text:\n${translated.text}`).setFooter(`Translated From ${iso}`))
        }

    }
}