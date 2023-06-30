const ainasepics = require("ainasepics");
const { SlashCommandBuilder } = require("discord.js");
const { makeAction } = require("../../actionsHandler");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("slap")
		.setDescription("Slap someone :0")
		.addUserOption((o) =>
			o.setName("user").setDescription("The user you want to slap")
		)
		.addStringOption((o) =>
			o
				.setName("text")
				.setDescription("The... text string you want to slap?")
				.setMaxLength(100)
		),

	async execute(interaction, errorembed) {
		let slapembed = makeAction(interaction, "slapped", ":0");

		ainasepics
			.get("slap")
			.then((res) => {
				slapembed.setImage(res.url);
				interaction.reply({ embeds: [slapembed] });
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
