var userinfo = require('github-userinfo');
module.exports = {
    run: async(client, message, args) => {
        if(!args[0]) return message.reply(client.embed("Error", "Please Provide a Username."))
       userinfo.get(args[0], async(err, info) => {
           if(err) return message.reply(client.embed("Error", "Invalid Username Provided."))
           const embed = client.embed(`Github Info For ${info.login}`)
           embed.setThumbnail(info.avatar_url)
           embed.setDescription(`Name: [${info.name}](https://github.com/${info.login}/)\n\nID: ${info.id}\n\nBio: ${info.bio}\n\nType: ${info.type}\n\nAdmin: ${info.site_admin}\n\nLocation: ${info.location}\n\nRepos: ${info.public_repos}\n\nGists: ${info.public_gists}\n\nFollowers: ${info.followers}\n\nFollowing: ${info.following}`)
            message.reply(embed)
       })
    }
}