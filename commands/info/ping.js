module.exports = {
	name: "ping",
	description: "Replies with 'Pong!'",
	run: async (client, interaction, args) => {
		return interaction.followUp({
			embeds: [{ color: "#94e4bc", description: `**Pong - ${client.ws.ping}**ms!`, timestamp: Date.now() }],
		});
	},
};
