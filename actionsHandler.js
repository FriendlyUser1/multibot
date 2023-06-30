const { EmbedBuilder } = require("discord.js");

module.exports = {
	makeAction(interaction, verb, emoticon) {
		let actionEmbed = new EmbedBuilder()
			.setTimestamp()
			.setColor(require("./ranCol").lightCol());

		let userOp = interaction.options.get("user"),
			textOp = interaction.options.getString("text"),
			creatorName = interaction.member.displayName;

		if (userOp) {
			if (userOp.user == interaction.user) {
				actionEmbed.setTitle(`${creatorName} just ${verb} themselves...`);
			} else {
				actionEmbed.setTitle(
					`${creatorName} just ${verb} ${userOp.member.displayName} ${emoticon}`
				);
			}
		} else if (textOp) {
			actionEmbed.setTitle(`${creatorName} just ${verb} ${textOp}`);
		} else {
			actionEmbed.setTitle(`${creatorName} just ${verb} air...`);
		}

		return actionEmbed;
	},
};
