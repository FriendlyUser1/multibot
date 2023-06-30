const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("urban")
		.setDescription("Get a random or specific definition from Urban Dictionary")
		.setNSFW(true)
		.addStringOption((o) =>
			o
				.setName("word")
				.setDescription("Word or term to define")
				.setMaxLength(200)
		),

	async execute(interaction, errorembed) {
		const parse = (s) => s.replace(/([\[\]])/g, "");
		const makeEmbed = (wl) => {
			let wordObj = wl.filter(
				(w) => w.definition.length < 1024 && w.example.length < 1024
			)[0];
			return new EmbedBuilder()
				.setTitle(wordObj.word)
				.setURL(wordObj.permalink)
				.addFields(
					{ name: "Definition", value: parse(wordObj.definition) },
					{ name: "Example", value: parse(wordObj.example) }
				)
				.setColor(require("../../ranCol").lightCol())
				.setTimestamp();
		};

		const word = interaction.options.getString("word");
		const apiUrl =
			"https://api.urbandictionary.com/v0" +
			(word ? `/define?term=${word}` : "/random");

		fetch(apiUrl)
			.then((res) => res.json())
			.then((body) => {
				interaction.reply({ embeds: [makeEmbed(body.list)] });
			})
			.catch((err) => {
				if (err) {
					console.error(err);
					interaction.reply({
						embeds: [errorembed],
						ephemeral: true,
					});
				}
			});
	},
};
