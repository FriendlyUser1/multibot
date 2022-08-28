module.exports = {
	name: "roll",
	description: "Rolls a dice",
	options: [
		{
			name: "sides",
			type: "INTEGER",
			description: "How many sides the dice has (default: 6)",
			required: false
		},
		{
			name: "rolls",
			type: "INTEGER",
			description: "How many times you want to roll the dice (max: 10)",
			required: false
		},
	],
	run: async (client, interaction, args) => {
		var sides = interaction.options.getInteger("sides") ? interaction.options.getInteger("sides") : 6,
			rolls = interaction.options.getInteger("rolls") ? interaction.options.getInteger("rolls") : 1,
			results;

		if (rolls > 10 || rolls < 1) {
			return interaction.followUp({
				embeds: [{ color: "#fc434c", description: "You can only roll 0-10 times at once!", timestamp: Date.now() }]
			})
		}

		if (rolls > 1) {
			var rollsArr = [];
			for (var i = 0; i < rolls; i++) {
				rollsArr.push(1 + Math.floor(Math.random() * sides));
			}

			results = (rollsArr.join(", "));
		} else {
			results = (1 + Math.floor(Math.random() * sides));
		}

		try {
			interaction.followUp({
				embeds: [{
					color: require("../../ranCol").lightCol(), description: results.toString(), timestamp: Date.now()
				}],
			});
		} catch {
			(err) => {
				console.log(err);
				interaction.followUp({
					embeds: [{
						color: "#cf484a", description: "Whoops! There was an error.", timestamp: Date.now()
					}],
				});
			}
		}
	},
};
