const ainasepics = require("ainasepics");
const { SlashCommandBuilder } = require("discord.js");
const { makeAction } = require("../../actionsHandler");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("kiss")
		.setDescription("Kiss someone 😳")
		.addUserOption((o) =>
			o.setName("user").setDescription("The user you want to kiss")
		)
		.addStringOption((o) =>
			o
				.setName("text")
				.setDescription("The... text string you want to kiss?")
				.setMaxLength(100)
		),

	async execute(interaction, errorembed) {
		let kissembed = makeAction(interaction, "kissed", "<3");

		ainasepics
			.get("kiss")
			.then((res) => {
				kissembed.setImage(res.url);
				interaction.reply({ embeds: [kissembed] });
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
