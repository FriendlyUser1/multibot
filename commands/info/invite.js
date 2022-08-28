module.exports = {
	name: "invite",
	description: "Invite multibot to your server!",
	run: async (client, interaction, args) => {
		return interaction.followUp({
			embeds: [{
				title: "Invite me to your server!", description: `<https://discord.com/api/oauth2/authorize?client_id=887065505561706527&permissions=534119836785&scope=applications.commands%20bot>`, color: "#94e4bc", timestamp: Date.now()
			}
			]
		});
	},
};
