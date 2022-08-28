const request = require("request");
const { MessageEmbed } = require("discord.js");

module.exports = {
	name: "define",
	description: "Defines a word",
	options: [
		{
			name: "word",
			type: "STRING",
			description: "The work you want to be defined",
			required: true,
		},
	],
	run: async (client, interaction, args) => {
		function capitaliseFirstLetter(string) {
			return string.toString().charAt(0).toUpperCase() + string.slice(1);
		}

		function getDefExa(arr) {
			var newArr = [];
			if (arr[0].definition) {
				newArr.push(`1) ${arr[0].definition}`);
				var counter = 2;
			} else {
				var counter = 1;
			}

			if (arr[0].example) {
				newArr.push(`\n"${arr[0].example}"`);
			}

			for (let i = 1; i < arr.length; i++) {
				if (arr[i].definition) {
					newArr.push(`\n\n${counter}) ${arr[i].definition}`);
					counter++;
				}

				if (arr[i].example) {
					newArr.push(`\n"${arr[i].example}"`);
				}
			}

			return newArr.join("");
		}

		function getSynAnt(arr, choice) {
			var newArr = [],
				synArr = [],
				antArr = [];

			if (choice == 1) {
				for (let j = 0; j < arr.length; j++) {
					if (arr[j].synonyms.length > 0) {
						for (var i = 0; i < arr[j].synonyms.length; i++) {
							synArr.push(arr[j].synonyms[i]);
						}
					}
				}

				// make sure ants aren't too long
				while (synArr.join(", ").split("").length >= 1024) {
					synArr.pop();
				}

				if (synArr.length > 0) {
					newArr.push(synArr.join(", "));
				}
			}

			if (choice == 2) {
				for (let j = 0; j < arr.length; j++) {
					if (arr[j].antonyms.length > 0) {
						for (var i = 0; i < arr[j].antonyms.length; i++) {
							antArr.push(arr[j].antonyms[i]);
						}
					}
				}

				// make sure ants aren't too long
				while (antArr.join(", ").split("").length >= 1024) {
					antArr.pop();
				}

				if (antArr.length > 0) {
					newArr.push(antArr.join(", "));
				}
			}

			// Check if there are no synonyms/antonyms
			if (newArr.length == 0) {
				if (choice == 1) {
					newArr.push("No synonyms");
				}
				if (choice == 2) {
					newArr.push("No antonyms");
				}
			}

			// join the array with all the synonyms or antonyms (dependent on choice), join("") because already joined
			return newArr.join("");
		}

		request(
			`https://api.dictionaryapi.dev/api/v2/entries/en/${interaction.options.getString(
				"word"
			)}`,
			{ json: true },
			(err, res, body) => {
				if (err) {
					console.log(err);
					return interaction.followUp({
						embeds: [
							{
								color: "#cf484a",
								description: "Whoops! There was an error.",
							},
						],
					});
				}

				if (body.title) {
					return interaction.followUp({
						embeds: [
							{
								color: "#cf484a",
								title: ":(",
								description: body.title,
								timestamp: Date.now(),
							},
						],
					});
				}

				var embedd = new MessageEmbed()
					.setTitle(capitaliseFirstLetter(body[0].word))
					.setDescription(
						`
            ${body[0].phonetic}\n
            **${capitaliseFirstLetter(body[0].meanings[0].partOfSpeech)}**\n
            **Origin:** ${
							body[0].origin ? body[0].origin : "Unknown or unregistered"
						}\n
						${getDefExa(body[0].meanings[0].definitions)}
					`
					)
					.addFields(
						{
							name: "Synonyms",
							value: capitaliseFirstLetter(
								getSynAnt(body[0].meanings[0].definitions, 1)
							),
						},
						{
							name: "Antonyms",
							value: capitaliseFirstLetter(
								getSynAnt(body[0].meanings[0].definitions, 2)
							),
						}
					);

				embedd.setTimestamp();
				embedd.setColor(require("../../ranCol").lightCol());

				return interaction.followUp({ embeds: [embedd] });
			}
		);
	},
};
