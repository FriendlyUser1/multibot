const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("server")
		.setDescription("Join the multibot support server!"),

	async execute(interaction) {
		interaction.reply({
			embeds: [
				{
					color: 9757884,
					title: "Multibot Support",
					URL: `https://discord.gg/txXN8aWXMZ`,
					description: `https://discord.gg/txXN8aWXMZ`,
					timestamp: new Date().toISOString(),
				},
			],
			ephemeral: true,
		});
	},
};
