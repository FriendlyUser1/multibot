const { SlashCommandBuilder } = require("discord.js");
const ainasepics = require("ainasepics");

module.exports = {
	data: new SlashCommandBuilder().setName("laugh").setDescription("laugh :p"),

	async execute(interaction, errorembed) {
		ainasepics
			.get("laugh")
			.then((res) => {
				interaction.reply({
					embeds: [
						{
							title: ":p",
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
