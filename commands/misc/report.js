module.exports = {
	name: "report",
	description: "Report bugs/glitches in the bot",
	options: [
		{
			name: "report",
			type: "STRING",
			description: "The bug you want to report",
			required: true
		}
	],
	run: async (client, interaction, args) => {
		var owner = client.users.cache.find(
			(user) => user.id === "560183438393737264"
		);

		owner.send(
			`**New report from ${interaction.user.tag} (id: ${interaction.user.id
			})\nin server ${interaction.guild.name} (id: ${interaction.guild.id
			})**\nReport: ${interaction.options.getString("report")}`
		);
		interaction.followUp({ embeds: [{ title: "Your report has been sent!", description: "Thank you for sending a report :)", color: require("../../ranCol").lightCol(), timestamp: Date.now() }] });
	},
};
