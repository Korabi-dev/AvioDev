const {exec} = require('child_process');
module.exports = {
    owner: true,
    run: async(client, message, args) => {
     await message.reply(client.embed("Restarting.."))
    if(!args[0]) args[0] = "0"
   await exec(`pm2 reload ${args[0]} --force`, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    })
        
}
}