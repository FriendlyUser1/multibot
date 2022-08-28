const jokemanager = require("discord-jokes");
module.exports = {
	name: "joke",
	description: "Tells a joke",
	run: async (client, interaction, args) => {
		jokemanager.getRandomDadJoke(function (joke) {
			return interaction.followUp({
				embeds: [
					{
						color: require("../../ranCol").lightCol(),
						description: "**" + joke + "**",
						timestamp: Date.now(),
					},
				],
			});
		});
	},
};
