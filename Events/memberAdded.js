module.exports = {
    name: "guildMemberAdd",
    run: async(member, client) => {
        const d = await client.models.automod.findOne({guild: member.guild.id})
        if(d){
            if(d.features.includes("antijoin")){
                await member.send(client.embed("Kicked", `You can not join ${member.guild.name} because anti join is enabled, please try again later.`)).catch(e => e)
               await member.kick().catch(e => e)
            }
        }
    }
}