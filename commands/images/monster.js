const DIG = require("discord-image-generation");
const {
	AttachmentBuilder,
	ApplicationCommandOptionType,
} = require("discord.js");
module.exports = {
	name: "monster",
	description: "There's a monster under your bed!",
	options: [
		{
			name: "user1",
			type: ApplicationCommandOptionType.User,
			description: "The user of the avatar on top",
			required: true,
		},
		{
			name: "user2",
			type: ApplicationCommandOptionType.User,
			description: "The user of the avatar of the monster",
			required: true,
		},
		{
			name: "size",
			type: ApplicationCommandOptionType.Integer,
			description: "The size of the image, default 1024",
			required: false,
			choices: [
				{ name: "16", value: 16 },
				{ name: "32", value: 32 },
				{ name: "64", value: 64 },
				{ name: "128", value: 128 },
				{ name: "256", value: 256 },
				{ name: "512", value: 512 },
				{ name: "1024", value: 1024 },
				{ name: "2048", value: 2048 },
				{ name: "4096", value: 4096 },
			],
		},
	],
	run: async (client, interaction, args) => {
		let avoptions = {
			format: "png",
			size: interaction.options.get("size")
				? interaction.options.get("size").value
				: 1024,
		};
		let image = await new DIG.Bed().getImage(
			interaction.options
				.get("user1")
				.member.displayAvatarURL(avoptions)
				.replace("webp", "png"),
			interaction.options
				.get("user2")
				.member.displayAvatarURL(avoptions)
				.replace("webp", "png")
		);
		let attach = new AttachmentBuilder(image, { name: "monster.png" });
		return interaction.followUp({ files: [attach] });
	},
};
