const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("roll")
		.setDescription("Roll dice")
		.addIntegerOption((o) =>
			o
				.setName("sides")
				.setDescription("How many sides the die has: default is 6")
				.setMaxValue(9999)
				.setMinValue(2)
		)
		.addIntegerOption((o) =>
			o
				.setName("rolls")
				.setDescription("How many times to roll the die: default is 1")
				.setMaxValue(10)
				.setMinValue(1)
		),

	async execute(interaction, errorembed) {
		const sides = interaction.options.getInteger("sides") ?? 6,
			rolls = interaction.options.getInteger("rolls") ?? 1;

		let results = [];

		for (let i = 0; i < rolls; i++)
			results.push(1 + Math.floor(Math.random() * sides));

		try {
			interaction.reply({
				embeds: [
					{
						color: require("../../ranCol").lightCol(),
						description: results.join(", "),
						timestamp: new Date().toISOString(),
					},
				],
			});
		} catch (err) {
			console.error(err);
			interaction.reply({
				embeds: [errorembed],
				ephemeral: true,
			});
		}
	},
};
