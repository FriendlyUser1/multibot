module.exports = {
	name: "8ball",
	description: "Gain the wisdom of the mighty 8 ball",
	options: [
		{
			name: "question",
			type: "STRING",
			description: "What you want to ask the 8ball",
			required: true,
		}
	],
	run: async (client, interaction, args) => {
		var responses = [
			// affirmative
			"It is certain",
			"It is decidedly so",
			"Without a doubt",
			"Yes - definitely",
			"You may rely on it",
			"As I see it, yes",
			"Most likely",
			"Outlook good",
			"Yes",
			"Signs point to yes",
			// non-committal
			"Reply hazy, try again",
			"Ask again later",
			"Better not tell you now",
			"Cannot predict now",
			"Concentrate and ask again",
			// negative
			"Don't count on it",
			"My reply is no",
			"My sources say no",
			"Outlook not so good",
			"Very doubtful",
		];

		return interaction.followUp({
			embeds: [{
				color: require("../../ranCol").lightCol(),
				title: "Magic 8-ball 🎱",
				fields: [{
					name: `Question: ${interaction.options.getString("question")}`,
					value: `**Answer: ${responses[Math.floor(Math.random() * responses.length)]}**`
				}], timestamp: Date.now()
			}]
		});
	},
};
