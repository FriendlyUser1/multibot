const { ApplicationCommandOptionType } = require("discord.js");
module.exports = {
	name: "reverse",
	description: "reverses a message",
	options: [
		{
			name: "message",
			type: ApplicationCommandOptionType.String,
			description: "The string you want to be reversed",
			required: true,
		},
	],
	run: async (client, interaction, args) => {
		var splitString = interaction.options.getString("message").split("");
		var reverseArray = splitString.reverse();
		var joinArray = reverseArray.join("");
		interaction.followUp({
			embeds: [
				{
					title: "Reversed message:",
					description: joinArray,
					timestamp: new Date().toISOString(),
					color: require("../../ranCol").lightCol(),
				},
			],
		});
	},
};
