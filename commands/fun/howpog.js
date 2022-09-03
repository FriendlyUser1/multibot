const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");
module.exports = {
	name: "howpog",
	description: "Test how pog you (or another member) are",
	options: [
		{
			name: "user",
			type: ApplicationCommandOptionType.User,
			description: "The user you want to rate",
			required: false,
		},
		{
			name: "text",
			type: ApplicationCommandOptionType.String,
			description: "The... text string you want to rate? (Don't use with user)",
			required: false,
		},
	],
	run: async (client, interaction, args) => {
		var target;

		if (interaction.options.get("user")) {
			target = interaction.options.get("user").member.displayName;
		} else if (interaction.options.getString("text")) {
			target = interaction.options.getString("text");
		} else {
			return interaction.followUp({
				embeds: [
					{ color: 13584458, description: "You need *something* to rate!" },
				],
			});
		}

		var pogPercent = Math.floor(Math.random() * 100) + 1;
		var embed = new EmbedBuilder()
			.setTitle("pog-o-matic 4000")
			.setDescription(
				`**${target} is ${pogPercent}% pog! ${
					pogPercent > 99
						? "😳"
						: pogPercent > 90
						? "😉"
						: pogPercent > 75
						? "🥵"
						: pogPercent > 40
						? "😩"
						: pogPercent > 25
						? "😕"
						: pogPercent > 10
						? "🥺"
						: pogPercent > 0
						? "😔"
						: "🥴"
				} **`
			)
			.setColor(
				pogPercent > 99
					? 10181046
					: pogPercent > 75
					? 3066993
					: pogPercent > 40
					? 15105570
					: pogPercent > 0
					? 15548997
					: 2303786
			)
			.setTimestamp();

		return interaction.followUp({
			embeds: [embed],
		});
	},
};
