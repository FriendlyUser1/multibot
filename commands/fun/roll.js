const { ApplicationCommandOptionType } = require("discord.js");
module.exports = {
	name: "roll",
	description: "Rolls a dice",
	options: [
		{
			name: "sides",
			type: ApplicationCommandOptionType.Integer,
			description: "How many sides the dice has (default: 6)",
			required: false,
		},
		{
			name: "rolls",
			type: ApplicationCommandOptionType.Integer,
			description: "How many times you want to roll the dice (max: 10)",
			required: false,
		},
	],
	run: async (client, interaction, args) => {
		var sides = interaction.options.getInteger("sides")
				? interaction.options.getInteger("sides")
				: 6,
			rolls = interaction.options.getInteger("rolls")
				? interaction.options.getInteger("rolls")
				: 1,
			results;

		if (rolls > 10 || rolls < 1) {
			return interaction.followUp({
				embeds: [
					{
						color: 13584458,
						description: "You can only roll 0-10 times at once!",
						timestamp: new Date().toISOString(),
					},
				],
			});
		}

		if (rolls > 1) {
			var rollsArr = [];
			for (var i = 0; i < rolls; i++) {
				rollsArr.push(1 + Math.floor(Math.random() * sides));
			}

			results = rollsArr.join(", ");
		} else {
			results = 1 + Math.floor(Math.random() * sides);
		}

		try {
			interaction.followUp({
				embeds: [
					{
						color: require("../../ranCol").lightCol(),
						description: results.toString(),
						timestamp: new Date().toISOString(),
					},
				],
			});
		} catch {
			(err) => {
				console.log(err);
				interaction.followUp({
					embeds: [
						{
							color: 13584458,
							description: "Whoops! There was an error.",
							timestamp: new Date().toISOString(),
						},
					],
				});
			};
		}
	},
};
