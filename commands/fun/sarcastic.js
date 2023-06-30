const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("sarcastic")
		.setDescription("Makes your message sArCaStIc")
		.addStringOption((o) =>
			o
				.setName("text")
				.setDescription("The text to be made sArCaStIc")
				.setMaxLength(1000)
				.setRequired(true)
		),

	async execute(interaction) {
		let strOp = interaction.options.getString("text").split(""),
			str = "";

		for (let i = 0; i < strOp.length; i++)
			str += i % 2 === 0 ? strOp[i].toLowerCase() : strOp[i].toUpperCase();

		interaction.reply(str);
	},
};
