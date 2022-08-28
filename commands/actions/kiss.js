const Neko = require("neko-love");
const nekoclient = new Neko.Client();
const { MessageEmbed } = require("discord.js")
module.exports = {
	name: "kiss",
	description: "Kiss someone 😳",
	options: [
		{
			name: "user",
			type: "USER",
			description: "The user you want to kiss",
			required: false,

		},
		{
			name: "text",
			type: "STRING",
			description: "The... text string you want to kiss? (Don't use with user)",
			required: false,
		}
	],
	run: async (client, interaction, args) => {
		var kissembed = new MessageEmbed()
			.setTimestamp()
			.setColor(require("../../ranCol").lightCol())

		if (interaction.options.get("user")) {
			if (interaction.options.get("user").user == interaction.user) {
				kissembed.setTitle(`${interaction.member.displayName} just kissed themselves...`)
			} else {
				kissembed.setTitle(`${interaction.member.displayName} just kissed ${interaction.options.get("user").member.displayName} <3`)
			}
		} else if (interaction.options.getString("text")) {
			kissembed.setTitle(`${interaction.member.displayName} just kissed ${interaction.options.getString("text")}`)
		} else {
			kissembed.setTitle(`${interaction.member.displayName} just kissed air :(`)
		}

		nekoclient
			.kiss()
			.then((url) => {
				kissembed.setImage(url)
				return interaction.followUp({ embeds: [kissembed] })
			})
			.catch((err) => {
				console.log(err);
				return interaction.followUp({
					embeds: [{
						color: "#cf484a", description: "Whoops! There was an error."
					}]
				});
			});
	},
};
