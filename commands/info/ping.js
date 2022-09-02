const { EmbedBuilder } = require("discord.js");
module.exports = {
	name: "ping",
	description: "Replies with 'Pong!'",
	run: async (client, interaction, args) => {
		return interaction.followUp({
			embeds: [
				{
					color: 9757884,
					description: `**Pong - ${client.ws.ping}**ms!`,
					timestamp: new Date().toISOString(),
				},
			],
		});
	},
};
