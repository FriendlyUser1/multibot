module.exports = {
	name: "coinflip",
	description: "Flips a coin",
	run: async (client, interaction, args) => {
		return interaction.followUp({
			embeds: [
				{
					color: require("../../ranCol").lightCol(),
					title: "Coinflip...",
					timestamp: new Date().toISOString(),
					description: `**${Math.random() < 0.5 ? "Heads!" : "Tails!"}**`,
				},
			],
		});
	},
};
