const Neko = require("neko-love");
const nekoclient = new Neko.Client();
const { MessageEmbed } = require("discord.js")
module.exports = {
	name: "pat",
	description: "Pat someone :)",
	options: [
		{
			name: "user",
			type: "USER",
			description: "The user you want to pat",
			required: false,

		},
		{
			name: "text",
			type: "STRING",
			description: "The... text string you want to pat? (Don't use with user)",
			required: false,
		}
	],
	run: async (client, interaction, args) => {

		var patembed = new MessageEmbed()
			.setTimestamp()
			.setColor(require("../../ranCol").lightCol())

		if (interaction.options.get("user")) {
			if (interaction.options.get("user").user == interaction.user) {
				patembed.setTitle(`${interaction.member.displayName} just patted themselves...`)
			} else {
				patembed.setTitle(`${interaction.member.displayName} just patted ${interaction.options.get("user").member.displayName} :)`)
			}
		} else if (interaction.options.getString("text")) {
			patembed.setTitle(`${interaction.member.displayName} just patted ${interaction.options.getString("text")}`)
		} else {
			patembed.setTitle(`${interaction.member.displayName} just patted air :(`)
		}

		nekoclient
			.pat()
			.then((url) => {
				patembed.setImage(url)
				return interaction.followUp({ embeds: [patembed] })
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
