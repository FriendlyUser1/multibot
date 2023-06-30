const { SlashCommandBuilder } = require("discord.js");
require("dotenv").config();

module.exports = {
	data: new SlashCommandBuilder()
		.setName("bugreport")
		.setDescription("Report bugs/glitches in multibot")
		.addStringOption((o) =>
			o
				.setName("issue")
				.setDescription("The bug/issue to report")
				.setRequired(true)
				.setMaxLength(1000)
		),

	async execute(interaction) {
		const reportChannel = interaction.client.channels.cache.get(
			process.env.REPORTCHANNEL
		);

		reportChannel.send(
			`**New report from "${interaction.user.username}" (id: ${
				interaction.user.id
			})\nin server "${interaction.guild.name}" (id: ${
				interaction.guild.id
			})**\n\nReport: "${interaction.options.getString("issue")}"`
		);

		interaction.reply({
			embeds: [
				{
					title: "Sent!",
					description: "Thank you for sending a report :)",
					color: require("../../ranCol").lightCol(),
					timestamp: new Date().toISOString(),
				},
			],
			ephemeral: true,
		});
	},
};
