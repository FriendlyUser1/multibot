const Neko = require("neko-love");
const nekoclient = new Neko.Client();
const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");
module.exports = {
	name: "punch",
	description: "Punch someone >:)",
	options: [
		{
			name: "user",
			type: ApplicationCommandOptionType.User,
			description: "The user you want to punch",
			required: false,
		},
		{
			name: "text",
			type: ApplicationCommandOptionType.String,
			description:
				"The... text string you want to punch? (Don't use with user)",
			required: false,
		},
	],
	run: async (client, interaction, args) => {
		var punchembed = new EmbedBuilder()
			.setTimestamp()
			.setColor(require("../../ranCol").lightCol());

		if (interaction.options.get("user")) {
			if (interaction.options.get("user").user == interaction.user) {
				punchembed.setTitle(
					`${interaction.member.displayName} just punched themselves...`
				);
			} else {
				punchembed.setTitle(
					`${interaction.member.displayName} just punched ${
						interaction.options.get("user").member.displayName
					} >:)`
				);
			}
		} else if (interaction.options.getString("text")) {
			punchembed.setTitle(
				`${
					interaction.member.displayName
				} just punched ${interaction.options.getString("text")}`
			);
		} else {
			punchembed.setTitle(
				`${interaction.member.displayName} just punched air...`
			);
		}

		nekoclient
			.punch()
			.then((url) => {
				punchembed.setImage(url);
				return interaction.followUp({ embeds: [punchembed] });
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
