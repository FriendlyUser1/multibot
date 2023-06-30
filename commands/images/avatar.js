const DIG = require("discord-image-generation");
const { AttachmentBuilder, SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("avatar")
		.setDescription("Many avatar image commands!")
		.addStringOption((o) =>
			o
				.setName("format")
				.setDescription("The format of the image: default is png")
				.addChoices(
					{ name: "webp", value: "webp" },
					{ name: "jpg", value: "jpg" },
					{ name: "jpeg", value: "jpeg" },
					{ name: "png", value: "png" }
				)
		)
		.addIntegerOption((o) =>
			o
				.setName("size")
				.setDescription("The size of the image: default is 1024")
				.addChoices(
					{ name: "16", value: 16 },
					{ name: "32", value: 32 },
					{ name: "64", value: 64 },
					{ name: "128", value: 128 },
					{ name: "256", value: 256 },
					{ name: "512", value: 512 },
					{ name: "1024", value: 1024 },
					{ name: "2048", value: 2048 },
					{ name: "4096", value: 4096 }
				)
		)
		.addStringOption((o) =>
			o
				.setName("command")
				.setDescription(
					"The image command you want to use. Not compatible with other options"
				)
				.addChoices(
					// filters
					{ name: "blur", value: "new DIG.Blur()" },
					{ name: "gay", value: "new DIG.Gay()" },
					{ name: "greyscale", value: "new DIG.Greyscale()" },
					{ name: "invert", value: "new DIG.Invert()" },
					{ name: "sepia", value: "new DIG.Sepia()" },
					// montage
					{ name: "beautiful", value: "new DIG.Beautiful()" },
					{ name: "bobross", value: "new DIG.Bobross()" },
					{ name: "clown", value: "new DIG.Clown()" },
					{ name: "deepfry", value: "new DIG.Deepfry()" },
					{ name: "delete", value: "new DIG.Delete()" },
					{ name: "heartbreaking", value: "new DIG.Heartbreaking()" },
					{ name: "hitler", value: "new DIG.Hitler()" }
				)
		)
		.addUserOption((o) =>
			o
				.setName("user")
				.setDescription("The user to take the avatar from: default is yourself")
		),

	async execute(interaction, errorembed) {
		const ops = interaction.options,
			nonce = Date.now().toString(16),
			cmd = ops.getString("command");

		const targetAvatar = (
			ops.get("user") ?? interaction
		).member.displayAvatarURL({
			format: ops.getString("format") ?? "png",
			size: ops.getInteger("size") ?? 1024,
			forceStatic: true,
			dynamic: true,
		});

		try {
			if (!cmd) {
				let attach = new AttachmentBuilder(targetAvatar, {
					name: `avatar${nonce}.${ops.getString("format") ?? "png"}`,
				});
				interaction.reply({ files: [attach] });
				return;
			}

			eval(cmd)
				.getImage(targetAvatar.replace("webp", "png"))
				.then((image) => {
					let attach = new AttachmentBuilder(image, {
						name: `avataredited${nonce}.png}`,
					});
					interaction.reply({ files: [attach] });
				});
		} catch (err) {
			console.error(err);
			interaction.reply({
				embeds: [errorembed],
				ephemeral: true,
			});
		}
	},
};
