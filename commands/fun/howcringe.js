const { MessageEmbed } = require("discord.js")
module.exports = {
	name: "howcringe",
	description: "Test how cringe someone/something is!",
	options: [
		{
			name: "user",
			type: "USER",
			description: "The user you want to rate",
			required: false,

		},
		{
			name: "text",
			type: "STRING",
			description: "The... text string you want to rate? (Don't use with user)",
			required: false,
		}
	],
	run: async (client, interaction, args) => {
		var target;

		if (interaction.options.get("user")) {
			target = interaction.options.get("user").member.displayName;
		} else if (interaction.options.getString("text")) {
			target = interaction.options.getString("text")
		} else {
			return interaction.followUp({
				embeds: [{ color: "#cf484a", description: "You need *something* to rate!" }]
			})
		}

		var cringPercent = Math.floor(Math.random() * 100) + 1;
		var embed = new MessageEmbed()
			.setTitle("Cringe-o-matic 4000")
			.setDescription(
				`**${target} is ${cringPercent}% cringe! ${cringPercent > 99
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
					? "BLACK"
					: cringPercent > 75
						? "RED"
						: cringPercent > 40
							? "ORANGE"
							: cringPercent > 0
								? "GREEN"
								: "PURPLE"
			)
			.setTimestamp()

		return interaction.followUp({
			embeds: [embed]
		})
	},
};
