const DIG = require("discord-image-generation");
const { MessageAttachment } = require("discord.js");
module.exports = {
	name: "avatar",
	description: "All the avatar image commands!",
	options: [
		{
			name: "format",
			type: "STRING",
			description:
				"The format of the image (not compatible with 'command' option), default png",
			required: false,
			choices: [
				{ name: "webp", value: "webp" },
				{ name: "png", value: "png" },
				{ name: "jpg", value: "jpg" },
				{ name: "jpeg", value: "jpeg" },
			],
		},
		{
			name: "size",
			type: "INTEGER",
			description:
				"The size of the image (not compatible with 'command' option), default 1024",
			required: false,
			choices: [
				{ name: "16", value: 16 },
				{ name: "32", value: 32 },
				{ name: "56", value: 56 },
				{ name: "64", value: 64 },
				{ name: "96", value: 96 },
				{ name: "128", value: 128 },
				{ name: "256", value: 256 },
				{ name: "300", value: 300 },
				{ name: "512", value: 512 },
				{ name: "600", value: 600 },
				{ name: "1024", value: 1024 },
				{ name: "2048", value: 2048 },
				{ name: "4096", value: 4096 },
			],
		},
		{
			name: "command",
			type: "STRING",
			description: "The image command you want to use",
			required: false,
			choices: [
				// filters
				{
					name: "blur",
					value: "new DIG.Blur()",
				},
				{
					name: "gay",
					value: "new DIG.Gay()",
				},
				{
					name: "greyscale",
					value: "new DIG.Greyscale()",
				},
				{
					name: "invert",
					value: "new DIG.Invert()",
				},
				{
					name: "sepia",
					value: "new DIG.Sepia()",
				},
				// gifs
				{
					name: "triggered",
					value: "new DIG.Triggered()",
				},
				// montage
				{
					name: "advert",
					value: "new DIG.Ad()",
				},
				{
					name: "affect",
					value: "new DIG.Affect()",
				},
				{
					name: "beautiful",
					value: "new DIG.Beautiful()",
				},
				{
					name: "bobross",
					value: "new DIG.Bobross()",
				},
				{
					name: "confusedstonk",
					value: "new DIG.ConfusedStonk()",
				},
				{
					name: "delete",
					value: "new DIG.Delete()",
				},
				{
					name: "notstonk",
					value: "new DIG.NotStonk()",
				},
			],
		},
		{
			name: "user",
			type: "USER",
			description:
				"The user with the avatar you want to use (default is yours)",
			required: false,
		},
	],
	run: async (client, interaction, args) => {
		let io = interaction.options,
			avoptions = {
				format: io.getString("format") ? io.getString("format") : "png",
				size: io.get("size") ? io.get("size").value : 1024,
			},
			targetAvatar = io.get("user")
				? io.get("user").member.displayAvatarURL(avoptions)
				: interaction.member.displayAvatarURL(avoptions);

		if (!io.getString("command")) {
			let attach = new MessageAttachment(
				targetAvatar,
				`avatar.${avoptions.format}`
			);
			return interaction.followUp({ files: [attach] });
		}

		eval(io.get("command").value)
			.getImage(targetAvatar)
			.then((image) => {
				let attach =
					io.get("command").value != "new DIG.Triggered()"
						? new MessageAttachment(image, "avataredited.png")
						: new MessageAttachment(image, "avataredited.gif");
				interaction.followUp({ files: [attach] });
			});
	},
};