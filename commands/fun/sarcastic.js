module.exports = {
	name: "sarcastic",
	description: "Makes your message sArCaStIc",
	options: [
		{
			name: "text",
			type: "STRING",
			description: "The text to be made sArCaStIc",
			required: true,
		},
	],
	run: async (client, interaction, args) => {
		let s = interaction.options.getString("text").split(""),
			newS = "";
		for (let i = 0; i < s.length; i++) {
			newS += i % 2 === 0 ? s[i].toLowerCase() : s[i].toUpperCase();
		}

		return interaction.followUp({
			embeds: [
				{
					color: require("../../ranCol").lightCol(),
					timestamp: Date.now(),
					description: newS,
				},
			],
		});
	},
};
