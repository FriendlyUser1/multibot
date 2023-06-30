const { SlashCommandBuilder } = require("discord.js");
const { makeConverter } = require("../../conversionHandler");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("binary")
		.setDescription("Converts between text and binary")
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
				.setMaxLength(400)
		),

	async execute(interaction) {
		const encode = (str) =>
			str
				.trim()
				.split("")
				.map((s) =>
					("00000000" + s.charCodeAt().toString(2)).split("").slice(-8).join("")
				)
				.join(" ");

		const decode = (s) =>
			s
				.trim()
				.split(" ")
				.map((le) => String.fromCharCode(parseInt(le, 2)))
				.join("");

		interaction.reply({
			embeds: [
				makeConverter(
					"Binary",
					interaction.options.getString("process"),
					interaction.options.getString("message"),
					encode,
					decode
				),
			],
		});
	},
};
