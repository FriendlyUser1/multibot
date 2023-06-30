const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("ageguess")
		.setDescription("I will try to guess your age from your name!")
		.addStringOption((o) =>
			o
				.setName("name")
				.setDescription("The name")
				.setRequired(true)
				.setMaxLength(100)
		),

	async execute(interaction, errorembed) {
		let age = Math.floor(Math.random() * 100);

		fetch(
			`https://api.agify.io/?name=${encodeURI(
				interaction.options.getString("name")
			)}`
		)
			.then((res) => res.json())
			.then((body) => {
				if (body.age) {
					age = body.age;
				}

				interaction.reply({
					embeds: [
						{
							title: `My guess:`,
							fields: [
								{ name: `Name: ${body.name}`, value: `**Age: ${age}**` },
							],
							timestamp: new Date().toISOString(),
							color: require("../../ranCol").lightCol(),
						},
					],
				});
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
