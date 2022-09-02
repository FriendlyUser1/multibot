const { ApplicationCommandOptionType } = require("discord.js");
module.exports = {
	name: "base64",
	description: "Converts text to and from base64",
	options: [
		{
			name: "process",
			type: ApplicationCommandOptionType.String,
			description:
				"Specify whether you want to encode to base64 or decode from base64",
			required: true,
			choices: [
				{
					name: "encode",
					value: "encode",
				},
				{
					name: "decode",
					value: "decode",
				},
			],
		},
		{
			name: "message",
			type: ApplicationCommandOptionType.String,
			description: "The string you want to encode/decode",
			required: true,
		},
	],
	run: async (client, interaction, args) => {
		var message = interaction.options.getString("message");

		if (interaction.options.getString("process") == "encode") {
			return interaction.followUp({
				embeds: [
					{
						title: "Encoded to Base64:",
						description:
							Buffer.from(message).toString("base64").length > 4000
								? "Error: encoded message is too long to display"
								: Buffer.from(message).toString("base64"),
						timestamp: new Date().toISOString(),
						color: require("../../ranCol").lightCol(),
					},
				],
			});
		}

		return interaction.followUp({
			embeds: [
				{
					title: "Decoded from Base64:",
					description: Buffer.from(message, "base64").toString(),
					timestamp: new Date().toISOString(),
					color: require("../../ranCol").lightCol(),
				},
			],
		});
	},
};
