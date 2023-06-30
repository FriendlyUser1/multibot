const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("topic")
		.setDescription("Get a random conversation starter/topic"),

	async execute(interaction, errorembed) {
		fetch(`https://friendlyuser1.github.io/apis/randomtopic/randomtopic.json`)
			.then((res) => res.json())
			.then((body) => {
				let foundTopic =
					body.topics[Math.floor(Math.random() * body.topics.length)];

				interaction.reply(foundTopic);
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
