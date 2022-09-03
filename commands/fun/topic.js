const request = require("request");
module.exports = {
	name: "topic",
	description: "Gives a random conversation starter/topic",
	run: async (client, interaction, args) => {
		request(
			`https://friendlyuser1.github.io/apis/randomtopic/randomtopic.json`,
			{ json: true },
			(err, res, body) => {
				if (err) {
					console.log(err);
					return interaction.followUp({
						embeds: [
							{
								color: 13584458,
								description: "Whoops! There was an error.",
							},
						],
					});
				}

				var foundTopic = "";

				foundTopic =
					body.topics[Math.floor(Math.random() * body.topics.length)];

				return interaction.followUp({
					embeds: [
						{
							color: require("../../ranCol").lightCol(),
							timestamp: new Date().toISOString(),
							description: foundTopic,
						},
					],
				});
			}
		);
	},
};
