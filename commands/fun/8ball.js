const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("8ball")
		.setDescription("Gain the wisdom of the mighty 8 ball")
		.addStringOption((o) =>
			o
				.setName("question")
				.setDescription("The question to ask the 8ball")
				.setRequired(true)
				.setMaxLength(250)
		),

	async execute(interaction) {
		const responses = [
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
			"No",
			"Most likely not",
			"It is impossible",
		];

		interaction.reply({
			embeds: [
				{
					color: require("../../ranCol").lightCol(),
					title: "Magic 8-ball 🎱",
					fields: [
						{
							name: `Question: ${interaction.options.getString("question")}`,
							value: `**Answer: ${
								responses[Math.floor(Math.random() * responses.length)]
							}**`,
						},
					],
					timestamp: new Date().toISOString(),
				},
			],
		});
	},
};
