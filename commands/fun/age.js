const request = require("request");
module.exports = {
	name: "ageguess",
	description: "I will try to guess your age from your name!",
	options: [
		{
			name: "name",
			type: "STRING",
			description: "The name of the person you want to find the age of",
			required: true,
		}
	],
	run: async (client, interaction, args) => {
		request(
			`https://api.agify.io/?name=${interaction.options.getString("name").split(" ").join("%20")}`,
			{ json: true },
			(err, res, body) => {
				if (err) {
					console.log(err);
					return interaction.followUp({
						embeds: [{
							color: "#cf484a", description: "Whoops! There was an error."
						}]
					});
				}

				if (!body.age || body.age == null) {
					var age = Math.floor(Math.random() * 100);
				} else {
					var age = body.age;
				}

				return interaction.followUp({
					embeds: [{
						color: require("../../ranCol").lightCol(), title: `My guess:`, fields: [{ name: `Name: ${body.name}`, value: `**Age: ${age}**` }], timestamp: Date.now()
					}]
				});
			}
		);
	},
};
