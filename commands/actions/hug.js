const ainasepics = require("ainasepics");
const { SlashCommandBuilder } = require("discord.js");
const { makeAction } = require("../../actionsHandler");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("hug")
		.setDescription("Hug someone :D")
		.addUserOption((o) =>
			o.setName("user").setDescription("The user you want to hug")
		)
		.addStringOption((o) =>
			o
				.setName("text")
				.setDescription("The... text string you want to hug?")
				.setMaxLength(100)
		),

	async execute(interaction, errorembed) {
		let hugembed = makeAction(interaction, "hugged", ":D");

		ainasepics
			.get("hug")
			.then((res) => {
				hugembed.setImage(res.url);
				interaction.reply({ embeds: [hugembed] });
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
