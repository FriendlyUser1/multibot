const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("info")
		.setDescription("Information about multibot"),

	async execute(interaction) {
		interaction.reply({
			embeds: [
				{
					description: `
Hi! I'm multibot, nice to meet you.
I was created by chihirofujisaki0449
with the \`discord.js v14\` library
and currently I have ${interaction.client.commands.size} commands.
`,
					title: "About me :)",
					color: require("../../ranCol").lightCol(),
					timestamp: new Date().toISOString(),
				},
			],
		});
	},
};
