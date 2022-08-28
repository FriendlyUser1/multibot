module.exports = {
	name: "echo",
	description: "Echoes a message given",
	options: [
		{
			name: "message",
			type: "STRING",
			description: "The text string you want echoed",
			required: true,
		}
	],
	run: async (client, interaction, args) => {
		interaction.followUp({ content: `${interaction.options.getString("message")}`, allowedMentions: { parse: [] } });
	},
};
