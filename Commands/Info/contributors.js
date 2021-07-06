const fetch = require("node-fetch");
const config = require("../../src/config.json")
module.exports = {
    run: async(client, message, args) => {
        var contributors = await (
            await fetch("https://api.github.com/repos/Korabi-dev/AvioDev/contributors", {
              method: "GET",
              headers: {
                Authorization: config.apiToken,
              },
            })
          ).json();
          contributors = contributors.map(
            (contributor) =>
              new Object({
                name: contributor.login,
                value: `[${contributor.login}'s GitHub Profile](${contributor.html_url})`,
                inline: true,
              })
          );
              message.reply(client.embed(`${client.user.username}'s Github Contributors`, `All the people that have made ${client.user.username} possible!`).addFields(contributors))
    }
}