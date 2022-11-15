module.exports = {
	name: "server",
	description: "An invite to the support server",
	run: async (client, interaction, args) => {
		return interaction.followUp({
			embeds: [
				{
					color: 9757884,
					title: "Multibot Support",
					URL: `https://discord.gg/txXN8aWXMZ`,
					description: `https://discord.gg/txXN8aWXMZ`,
					timestamp: new Date().toISOString(),
				},
			],
		});
	},
};
