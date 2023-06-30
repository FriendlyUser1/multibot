const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("joke")
		.setDescription("Tells a joke")
		.addStringOption((o) =>
			o
				.setName("category")
				.setDescription("The category to recieve a joke from: default is any")
				.addChoices({ name: "Misc", value: "Misc" })
				.addChoices({ name: "Programming", value: "Programming" })
				.addChoices({ name: "Dark", value: "Dark" })
				.addChoices({ name: "Pun", value: "Pun" })
				.addChoices({ name: "Spooky", value: "Spooky" })
				.addChoices({ name: "Christmas", value: "Christmas" })
		),

	async execute(interaction, errorembed) {
		fetch(
			`https://v2.jokeapi.dev/joke/${
				interaction.options.getString("category") ?? "Any"
			}?safe-mode`
		)
			.then((res) => res.json())
			.then((body) => {
				body.type === "single"
					? interaction.reply(body.joke)
					: interaction.reply(`${body.setup}\n${body.delivery}`);
			})
			.catch((err) => {
				console.error(err);
				interaction.reply({ embeds: [errorembed] });
			});
	},
};
