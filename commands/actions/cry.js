const { EmbedBuilder } = require("discord.js");
const Neko = require("neko-love");
const nekoclient = new Neko.Client();
module.exports = {
	name: "cry",
	description: "Cry :(",
	run: async (client, interaction, args) => {
		nekoclient
			.cry()
			.then((url) => {
				interaction.followUp({
					embeds: [
						{
							color: require("../../ranCol").lightCol(),
							image: { url: url },
							timestamp: new Date().toISOString(),
						},
					],
				});
			})
			.catch((err) => {
				console.log(err);
				interaction.followUp({
					embeds: [
						{
							color: 13584458,
							description: "Whoops! There was an error.",
						},
					],
				});
			});
	},
};
