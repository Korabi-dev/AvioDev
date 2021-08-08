const fetch = require("node-fetch");
module.exports = {
  run: async (client, message, args) => {
    if (!args[0]) return message.reply(client.embed("Error", "You haven't specified a country"));
    fetch(`https://disease.sh/v3/covid-19/countries/${args.all}`)
      .then((info) => info.json())
      .then((json) => {
        if (json.country == "undefined") {
          message.reply(client.embed("Error", "That country either does not exist or data isn't being collected there."))
        }
        if(json.message){
            if(json.message == "Country not found or doesn't have any cases"){
                return message.reply(client.embed("Error", "That country either does not exist or there is no cases there."))
            }
        }
        const e = client
          .embed(`Covid Statistics For: ${json.country}`)
          .setThumbnail(json.countryInfo.flag)
          .addField(`Total Cases:`, `${json.cases}`, true)
          .addField(`Total Cases Today:`, `${json.todayCases} (${Math.floor((json.todayCases / json.cases) * 100)}%)`, true)
          .addField(`Total Active Cases:`, `${json.active} (${Math.floor((json.active / json.cases) * 100)}%)`, true)
          .addField(`Total Healed:`, `${json.recovered} (${Math.floor((json.recovered / json.cases) * 100)}%)`, true)
          .addField(`Total Deaths:`, `${json.deaths} (${Math.floor((json.deaths / json.cases) * 100)}%)`, true)
          .addField(`Total Deaths Today:`, `${json.todayDeaths} (${Math.floor((json.todayDeaths / json.todayCases) * 100)}%)`, true)
         .addField(`Total Tests:`, `${json.tests}`, true)
         .addField(`Total Critical Conditions:`, `${json.critical} (${Math.floor((json.critical / json.active) * 100)}%)`, true)
        message.reply(e)
      });
  }
}