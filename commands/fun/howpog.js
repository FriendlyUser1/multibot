const { MessageEmbed } = require("discord.js")
module.exports = {
	name: "howpog",
	description: "Test how pog you (or another member) are",
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

		var pogPercent = Math.floor(Math.random() * 100) + 1;
		var embed = new MessageEmbed()
			.setTitle("pog-o-matic 4000")
			.setDescription(
				`**${target} is ${pogPercent}% pog! ${pogPercent > 99
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
					? "PURPLE"
					: pogPercent > 75
						? "GREEN"
						: pogPercent > 40
							? "ORANGE"
							: pogPercent > 0
								? "RED"
								: "BLACK"
			)
			.setTimestamp()

		return interaction.followUp({
			embeds: [embed]
		})
	},
};
