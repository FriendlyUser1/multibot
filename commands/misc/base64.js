const { SlashCommandBuilder } = require("discord.js");
const { makeConverter } = require("../../conversionHandler");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("base64")
		.setDescription("Converts between text and base64")
		.addStringOption((o) =>
			o
				.setName("process")
				.setDescription("Specify whether you want to encode or decode")
				.setRequired(true)
				.addChoices(
					{ name: "encode", value: "En" },
					{ name: "decode", value: "De" }
				)
		)
		.addStringOption((o) =>
			o
				.setName("message")
				.setDescription("The string to encode/decode")
				.setRequired(true)
				.setMaxLength(1000)
		),

	async execute(interaction) {
		interaction.reply({
			embeds: [
				makeConverter(
					"Base64",
					interaction.options.getString("process"),
					interaction.options.getString("message"),
					(s) => Buffer.from(s).toString("base64"),
					(s) => Buffer.from(s, "base64").toString()
				),
			],
		});
	},
};
