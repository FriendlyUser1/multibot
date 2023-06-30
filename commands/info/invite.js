const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("invite")
		.setDescription("Invite multibot to your server!"),

	async execute(interaction) {
		interaction.reply({
			embeds: [
				{
					title: "Invite me to your server!",
					url: "https://discord.com/api/oauth2/authorize?client_id=887065505561706527&permissions=3072&scope=applications.commands%20bot",
					color: 9757884,
					timestamp: new Date().toISOString(),
				},
			],
			ephemeral: true,
		});
	},
};
