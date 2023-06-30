const ainasepics = require("ainasepics");
const { SlashCommandBuilder } = require("discord.js");
const { makeAction } = require("../../actionsHandler");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("punch")
		.setDescription("Punch someone >:)")
		.addUserOption((o) =>
			o.setName("user").setDescription("The user you want to punch")
		)
		.addStringOption((o) =>
			o
				.setName("text")
				.setDescription("The... text string you want to punch?")
				.setMaxLength(100)
		),

	async execute(interaction, errorembed) {
		let punchembed = makeAction(interaction, "punched", ">:)");

		ainasepics
			.get("punch")
			.then((res) => {
				punchembed.setImage(res.url);
				interaction.reply({ embeds: [punchembed] });
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
