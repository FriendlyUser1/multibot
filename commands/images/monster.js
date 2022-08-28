const DIG = require("discord-image-generation");
const { MessageAttachment } = require("discord.js")
module.exports = {
	name: "monster",
	description: "There's a monster under your bed!",
	options: [
		{
			name: "user1",
			type: "USER",
			description: "The user of the avatar on top",
			required: true
		},
		{
			name: "user2",
			type: "USER",
			description: "The user of the avatar of the monster",
			required: true
		},
	],
	run: async (client, interaction, args) => {
		let image = await new DIG.Bed().getImage(interaction.options.get("user1").member.displayAvatarURL({ format: 'png' }), interaction.options.get("user2").member.displayAvatarURL({ format: 'png' }))
		let attach = new MessageAttachment(image, "monster.png")
		return interaction.followUp({ files: [attach] })
	}
}