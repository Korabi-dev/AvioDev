const o = require("javascript-obfuscator")
const { MessageAttachment } = require("discord.js")
module.exports = {
    run: async(client, message, args) => {
        if(!args[0]) return message.reply(client.embed("Error", "You need to provide some javascript code to obfuscate."))
        var obv = {}
        obv._obfuscatedCode = "Error"
        try{
        obv = await o.obfuscate(args.all)
        } catch(e){
            obv = {}
            obv._obfuscatedCode = `Error: ${e}`
        }
        if(obv._obfuscatedCode.length > 4000){
            const code = new MessageAttachment(Buffer.from(obv._obfuscatedCode, "utf-8")).setName("Obfuscated Output.txt")
            return message.reply(code)
        } else {
            message.reply(client.embed("Obfuscator Output:", `\`\`\`js\n${obv._obfuscatedCode}\n\`\`\``))
        }
    }
}