const { SlashCommandBuilder } = require("discord.js");
const ainasepics = require("ainasepics");

module.exports = {
	data: new SlashCommandBuilder().setName("cry").setDescription("Cry :("),

	async execute(interaction, errorembed) {
		ainasepics
			.get("cry")
			.then((res) => {
				interaction.reply({
					embeds: [
						{
							title: ":(",
							color: require("../../ranCol").lightCol(),
							image: { url: res.url },
							timestamp: new Date().toISOString(),
						},
					],
				});
			})
			.catch((err) => {
				console.error(err);
				interaction.reply({
					embeds: [errorembed],
					ephemeral: true,
				});
			});
	},
};
