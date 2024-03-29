const { SlashCommandBuilder } = require("discord.js");
require("dotenv").config();

module.exports = {
	data: new SlashCommandBuilder()
		.setName("suggest")
		.setDescription("Suggest a feature to be added to multibot!")
		.addStringOption((o) =>
			o
				.setName("suggestion")
				.setDescription("Your suggestion")
				.setRequired(true)
				.setMaxLength(1000)
		),

	async execute(interaction) {
		const suggestionChannel = interaction.client.channels.cache.get(
			process.env.SUGGESTIONCHANNEL
		);

		suggestionChannel.send(
			`**New suggestion from "${interaction.user.username}" (id: ${
				interaction.user.id
			})\nin server "${interaction.guild.name}" (id: ${
				interaction.guild.id
			})**\n\nSuggestion: "${interaction.options.getString("suggestion")}"`
		);

		interaction.reply({
			embeds: [
				{
					title: "Sent!",
					description: "Thank you for helping make multibot better :)",
					color: require("../../ranCol").lightCol(),
					timestamp: new Date().toISOString(),
				},
			],
			ephemeral: true,
		});
	},
};
