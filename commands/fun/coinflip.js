const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("coinflip")
		.setDescription("Flips a coin"),
	async execute(interaction) {
		interaction.reply(Math.random() < 0.5 ? "Heads!" : "Tails!");
	},
};
