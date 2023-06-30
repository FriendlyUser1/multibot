const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("define")
		.setDescription("Defines a word")
		.addStringOption((o) =>
			o
				.setName("word")
				.setDescription("The word you want to look up")
				.setRequired(true)
				.setMaxLength(100)
		),

	async execute(interaction, errorembed) {
		function capitaliseFirstLetter(str) {
			return str.charAt(0).toUpperCase() + str.slice(1);
		}

		function definitionsExamples(arr) {
			let results = [],
				counter = 1;

			for (let i = 0; i < arr.length; i++) {
				let defs = arr[i].definitions;
				for (let j = 0; j < defs.length; j++) {
					if (defs[j].definition) {
						results.push(
							`${counter > 1 ? "\n\n" : ""}${counter}) ${defs[j].definition}`
						);
						counter++;
					}

					if (defs[j].example) {
						results.push(`\n"${defs[j].example}"`);
					}
				}
			}

			if (results.length === 0) return `No definitions found for left`;

			return results.join("");
		}

		function synonymsAntonyms(arr, target) {
			let results = [];

			for (let i = 0; i < arr.length; i++) {
				if (arr[i][target].length > 0) {
					for (let j = 0; j < arr[i][target].length; j++) {
						results.push(arr[i][target][j]);
					}
				}
			}

			while (results.join(", ").length >= 1024) {
				results.pop();
			}

			return results.length > 0
				? Array.from(new Set(results)).join(", ")
				: `No ${target}`;
		}

		fetch(
			`https://api.dictionaryapi.dev/api/v2/entries/en/${interaction.options.getString(
				"word"
			)}`
		)
			.then((res) => res.json())
			.then((body) => {
				if (body.title) {
					interaction.reply({
						embeds: [
							{
								color: 13584458,
								title: ":(",
								description: body.title,
								timestamp: new Date().toISOString(),
							},
						],
					});

					return;
				}

				const wordData = body[0].meanings;

				let definitionEmbed = new EmbedBuilder()
					.setTitle(capitaliseFirstLetter(body[0].word))
					.setDescription(
						`
            ${body[0].phonetic}\n
            **${capitaliseFirstLetter(body[0].meanings[0].partOfSpeech)}**\n
            **Origin:** ${body[0].origin ?? "Unknown or unregistered"}\n
						${definitionsExamples(wordData)}`
					)
					.addFields(
						{
							name: "Synonyms",
							value: synonymsAntonyms(wordData, "synonyms"),
						},
						{
							name: "Antonyms",
							value: synonymsAntonyms(wordData, "antonyms"),
						}
					);

				definitionEmbed.setTimestamp();
				definitionEmbed.setColor(require("../../ranCol").lightCol());

				interaction.reply({ embeds: [definitionEmbed] });
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
