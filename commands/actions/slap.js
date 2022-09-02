const Neko = require("neko-love");
const nekoclient = new Neko.Client();
const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");
module.exports = {
	name: "slap",
	description: "Slap someone =0",
	options: [
		{
			name: "user",
			type: ApplicationCommandOptionType.User,
			description: "The user you want to slap",
			required: false,
		},
		{
			name: "text",
			type: ApplicationCommandOptionType.String,
			description: "The... text string you want to slap? (Don't use with user)",
			required: false,
		},
	],
	run: async (client, interaction, args) => {
		var slapembed = new EmbedBuilder()
			.setTimestamp()
			.setColor(require("../../ranCol").lightCol());

		if (interaction.options.get("user")) {
			if (interaction.options.get("user").user == interaction.user) {
				slapembed.setTitle(
					`${interaction.member.displayName} just slapped themselves...`
				);
			} else {
				slapembed.setTitle(
					`${interaction.member.displayName} just slapped ${
						interaction.options.get("user").member.displayName
					} >:)`
				);
			}
		} else if (interaction.options.getString("text")) {
			slapembed.setTitle(
				`${
					interaction.member.displayName
				} just slapped ${interaction.options.getString("text")}`
			);
		} else {
			slapembed.setTitle(
				`${interaction.member.displayName} just slapped air...`
			);
		}

		nekoclient
			.slap()
			.then((url) => {
				slapembed.setImage(url);
				return interaction.followUp({ embeds: [slapembed] });
			})
			.catch((err) => {
				console.log(err);
				return interaction.followUp({
					embeds: [
						{
							color: 13584458,
							description: "Whoops! There was an error.",
						},
					],
				});
			});
	},
};
