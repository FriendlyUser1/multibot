const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");
module.exports = {
	name: "howcringe",
	description: "Test how cringe someone/something is!",
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

		var cringPercent = Math.floor(Math.random() * 100) + 1;
		var embed = new EmbedBuilder()
			.setTitle("Cringe-o-matic 4000")
			.setDescription(
				`**${target} is ${cringPercent}% cringe! ${
					cringPercent > 99
						? "🥴"
						: cringPercent > 90
						? "😔"
						: cringPercent > 75
						? "😩"
						: cringPercent > 50
						? "😕"
						: cringPercent > 25
						? "🥸"
						: cringPercent > 10
						? "🥺"
						: cringPercent > 0
						? "😉"
						: "😳"
				} **`
			)
			.setColor(
				cringPercent > 99
					? 3066993
					: cringPercent > 75
					? 15548997
					: cringPercent > 40
					? 15105570
					: cringPercent > 0
					? 5763719
					: 10181046
			)
			.setTimestamp();

		return interaction.followUp({
			embeds: [embed],
		});
	},
};
