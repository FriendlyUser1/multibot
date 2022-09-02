const request = require("request");
const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");
module.exports = {
	name: "urban",
	description:
		"Gets definitions from Urban Dictionary (nsfw channel required) (default: random word/term)",
	options: [
		{
			name: "word",
			type: ApplicationCommandOptionType.String,
			description: "Word or term you want to define",
			required: false,
		},
	],
	run: async (client, interaction, args) => {
		function removeBrackets(str) {
			var regex = /([\[\]])/g;
			return str.replace(regex, "");
		}

		if (!interaction.channel.nsfw)
			return interaction.followUp({
				embeds: [
					{
						color: 13584458,
						description:
							"The urban command needs to be used in an nsfw channel!",
					},
				],
			});

		if (!interaction.options.getString("word")) {
			request(
				"https://api.urbandictionary.com/v0/random",
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

					var givenArray = body.list,
						correctIndex,
						json;
					givenArray.forEach((element, index) => {
						if (element.definition.length < 3500) correctIndex = index;
					});
					json = givenArray[correctIndex];
					var embed = new EmbedBuilder()
						.setTitle(removeBrackets(json.word.toString()))
						.setURL(json.permalink.toString())
						.setDescription(
							`Definition: ${removeBrackets(
								json.definition
							)}\n\nExample: ${removeBrackets(json.example)}`
						)
						.setColor(require("../../ranCol").lightCol())
						.setTimestamp();
					return interaction.followUp({ embeds: [embed] });
				}
			);
		} else {
			request(
				`https://api.urbandictionary.com/v0/define?page=1&term=${interaction.options.getString(
					"word"
				)}`,
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

					var givenArray = body.list,
						correctIndex,
						json;
					givenArray.forEach((element, index) => {
						if (element.definition.length < 3800) correctIndex = index;
					});
					json = givenArray[correctIndex];

					var embed = new EmbedBuilder()
						.setTitle(removeBrackets(json.word.toString()))
						.setURL(json.permalink.toString())
						.setDescription(
							`Definition: ${removeBrackets(
								json.definition
							)}\n\nExample: ${removeBrackets(json.example)}`
						)
						.setColor(require("../../ranCol").lightCol())
						.setTimestamp();
					return interaction.followUp({ embeds: [embed] });
				}
			);
		}
	},
};
