const { SlashCommandBuilder } = require("discord.js");
const { makeConverter } = require("../../conversionHandler");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("hex")
		.setDescription("Converts between text and hexadecimal")
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
					"Hexadecimal",
					interaction.options.getString("process"),
					interaction.options.getString("message"),
					(s) => Buffer.from(s).toString("hex"),
					(s) => Buffer.from(s, "hex").toString()
				),
			],
		});
	},
};
