const fs = require("node:fs");
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("doesnotexist")
		.setDescription("Gets an AI generated image of a person who doesn't exist"),

	async execute(interaction, errorembed) {
		try {
			const path = "./tmp/doesnotexist.png";

			interaction.reply({
				embeds: [
					{
						timestamp: new Date().toISOString(),
						image: { url: "attachment://doesnotexist.png" },
						title: "This person doesn't exist",
						color: require("../../ranCol").lightCol(),
					},
				],
				files: [
					{
						attachment: path,
						name: "doesnotexist.png",
					},
				],
			});

			fetch("https://thispersondoesnotexist.com/").then((res) =>
				fs.promises.writeFile(path, res.body)
			);
		} catch (err) {
			console.error(err);
			interaction.reply({
				embeds: [errorembed],
				ephemeral: true,
			});
		}
	},
};
