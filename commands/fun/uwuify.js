const { SlashCommandBuilder } = require("discord.js");
module.exports = {
	data: new SlashCommandBuilder()
		.setName("uwuify")
		.setDescription("UwUifies your message!")
		.addStringOption((o) =>
			o
				.setName("text")
				.setDescription("The text to become UwUified")
				.setMaxLength(1000)
				.setRequired(true)
		),

	async execute(interaction) {
		let s = interaction.options.getString("text");

		// Replace solo l or r with w
		s = s.replace(
			/(?:[^lr](l)[^lr]|[^lr](r)[^lr])/gi,
			(match) => match[0] + "w" + match[2]
		);

		// Manually catch start of string
		if ((s[0] == "l" || s[0] == "r") && s[1] != "l" && s[1] != "r") {
			s = "w" + s.substring(1);
		}

		s = s.replace(/!+/g, " >w< "); // Turn ! to >w<
		s = Math.random() < 0.25 ? `${s.charAt(0)}-${s}` : s; // 25% chance of stuttering

		interaction.reply(s);
	},
};
