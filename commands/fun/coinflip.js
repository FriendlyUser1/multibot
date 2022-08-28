module.exports = {
	name: "coinflip",
	description: "Flips a coin",
	run: async (client, interaction, args) => {
		var ans = ["Heads!", "Tails!"];
		return interaction.followUp({
			embeds: [{
				color: require("../../ranCol").lightCol(),
				title: "Coinflip...", timestamp: Date.now(),
				description: `**${Math.random() < 0.5 ? "Heads!" : "Tails!"}**`
			}]
		});
	},
};
