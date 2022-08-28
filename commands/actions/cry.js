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
					embeds:
						[{
							color: require("../../ranCol").lightCol(), image: { url: url.toString() }, timestamp: Date.now()
						}]
				})
			})
			.catch((err) => {
				console.log(err);
				interaction.followUp({
					embeds: [{
						color: "#cf484a", description: "Whoops! There was an error."
					}],
				});
			});
	},
};
