const { readdirSync } = require("fs");
module.exports = {
	name: "info",
	description: "Information about multibot",
	run: async (client, interaction, args) => {
		var commands = [];
		readdirSync("./commands/").forEach((dir) => {
			var dircmds = readdirSync(`./commands/${dir}/`).filter((file) =>
				file.endsWith(".js")
			);

			commands = commands.concat(dircmds);
		});

		return interaction.followUp({
			embeds: [
				{
					description: `
Hi! I'm multibot, nice to meet you.
I was created by Chihiro Fujisaki#0449
with the \`discord.js v14\` library
and currently I have ${commands.length} commands.
`,
					title: "About me :)",
					color: require("../../ranCol").lightCol(),
					timestamp: new Date().toISOString(),
				},
			],
		});
	},
};
