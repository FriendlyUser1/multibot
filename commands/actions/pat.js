const ainasepics = require("ainasepics");
const { SlashCommandBuilder } = require("discord.js");
const { makeAction } = require("../../actionsHandler");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("pat")
		.setDescription("Pat someone :)")
		.addUserOption((o) =>
			o.setName("user").setDescription("The user you want to pat")
		)
		.addStringOption((o) =>
			o
				.setName("text")
				.setDescription("The... text string you want to pat?")
				.setMaxLength(100)
		),

	async execute(interaction, errorembed) {
		let patembed = makeAction(interaction, "patted", ":)");

		ainasepics
			.get("pat")
			.then((res) => {
				patembed.setImage(res.url);
				interaction.reply({ embeds: [patembed] });
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
