const { PermissionsBitField } = require("discord.js");
module.exports = {
	name: "nuke",
	description: "Nukes the current channel (admin perms needed)",
	run: async (client, interaction, args) => {
		if (
			!interaction.member.permissions.has(
				PermissionsBitField.Flags.Administrator
			)
		) {
			return interaction.followUp({
				embeds: [
					{
						color: "13584458",
						timestamp: new Date().toISOString(),
						description: "You don't have permission!",
					},
				],
			});
		}

		let pos = interaction.channel.position;
		interaction.channel.clone().then((channel) => {
			channel.setPosition(pos);
			channel.send("Channel nuked!");
		});
		interaction.channel.delete();
	},
};
