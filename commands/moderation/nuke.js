const { Permissions } = require("discord.js")
module.exports = {
	name: "nuke",
	description: "Nukes the current channel (admin perms needed)",
	run: async (client, interaction, args) => {
		if (!interaction.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
			return interaction.followUp({ embeds: [{ color: "#cf484c", timestamp: Date.now(), description: "You don't have permission!" }] });
		}

		interaction.channel.clone().then((channel) => {
			channel.setPosition(interaction.channel.position);
			channel.send("Channel nuked!");
		});
		interaction.channel.delete();
	},
};
