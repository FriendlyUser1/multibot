const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("reverse")
		.setDescription("Reverse a string")
		.addStringOption((o) =>
			o
				.setName("message")
				.setDescription("The message")
				.setRequired(true)
				.setMaxLength(1000)
		),

	async execute(interaction) {
		interaction.reply({
			embeds: [
				{
					title: "Reversed message:",
					description: interaction.options
						.getString("message")
						.split("")
						.reverse()
						.join(""),
					timestamp: new Date().toISOString(),
					color: require("../../ranCol").lightCol(),
				},
			],
		});
	},
};
