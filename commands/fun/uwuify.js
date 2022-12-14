const { ApplicationCommandOptionType } = require("discord.js");
module.exports = {
	name: "uwuify",
	description: "UwUifies your message!",
	options: [
		{
			name: "text",
			type: ApplicationCommandOptionType.String,
			description: "The text to become uwuified",
			required: true,
		},
	],
	run: async (client, interaction, args) => {
		let s = interaction.options.getString("text");
		s = s.replace(/(?:l|r)/gi, "w");
		s = s.replace(/!+/g, " >w< ");
		s = Math.random() < 0.25 ? `${s.charAt(0)}-${s}` : s;
		interaction.followUp({
			embeds: [
				{
					color: require("../../ranCol").lightCol(),
					timestamp: new Date().toISOString(),
					description: s,
				},
			],
		});
	},
};
