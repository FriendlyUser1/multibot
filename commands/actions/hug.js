const ainasepics = require("ainasepics");
const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");
module.exports = {
	name: "hug",
	description: "Hug someone :D",
	options: [
		{
			name: "user",
			type: ApplicationCommandOptionType.User,
			description: "The user you want to hug",
			required: false,
		},
		{
			name: "text",
			type: ApplicationCommandOptionType.String,
			description: "The... text string you want to hug? (Don't use with user)",
			required: false,
		},
	],
	run: async (client, interaction, args) => {
		var hugembed = new EmbedBuilder()
			.setTimestamp()
			.setColor(require("../../ranCol").lightCol());

		if (interaction.options.get("user")) {
			if (interaction.options.get("user").user == interaction.user) {
				hugembed.setTitle(
					`${interaction.member.displayName} just hugged themselves...`
				);
			} else {
				hugembed.setTitle(
					`${interaction.member.displayName} just hugged ${
						interaction.options.get("user").member.displayName
					} :D`
				);
			}
		} else if (interaction.options.getString("text")) {
			hugembed.setTitle(
				`${
					interaction.member.displayName
				} just hugged ${interaction.options.getString("text")}`
			);
		} else {
			hugembed.setTitle(`${interaction.member.displayName} just hugged air :(`);
		}

		ainasepics
			.get("hug")
			.then((data) => {
				hugembed.setImage(data.url);
				return interaction.followUp({ embeds: [hugembed] });
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
