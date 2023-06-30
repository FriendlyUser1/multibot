const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("help")
		.setDescription("Shows all available commands")
		.addStringOption((o) =>
			o
				.setName("command")
				.setDescription("A specific command to see information for")
				.setAutocomplete(true)
				.setMaxLength(100)
		),

	async execute(interaction) {
		let cmdOp = interaction.options.getString("command");

		if (!cmdOp) {
			// General help message with all commands
			const allCommandsEmbed = new EmbedBuilder()
				.setTitle("Here are all of my commands:")
				.addFields(interaction.client.categories)
				.setDescription(
					`Use /help with a command name to get more info on a command.`
				)
				.setTimestamp()
				.setColor(5763719);
			interaction.reply({ embeds: [allCommandsEmbed] });

			return;
		}

		// Specific help message for one command
		const command = interaction.client.commands.get(cmdOp);

		if (!command) {
			interaction.reply({
				embeds: [
					{
						color: 13584458,
						title: "Error",
						description: "Could not find that command...",
					},
				],
				ephemeral: true,
			});

			return;
		}

		const commandEmbed = new EmbedBuilder()
			.setTitle(command.data.name)
			.setDescription(command.data.description)
			.setTimestamp()
			.setColor(require("../../ranCol").lightCol());
		interaction.reply({ embeds: [commandEmbed] });
	},

	async autocomplete(interaction) {
		const allCommands = interaction.client.commands.entries();
		let commandNames = [];
		for (let [name, _] of allCommands) commandNames.push(name);

		const filteredCommands = commandNames.filter((cmd) =>
			cmd.includes(interaction.options.getFocused())
		);

		await interaction.respond(
			filteredCommands.map((cmd) => ({ name: cmd, value: cmd })).slice(0, 25)
		);
	},
};
