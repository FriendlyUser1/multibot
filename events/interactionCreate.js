module.exports = {
	name: "interactionCreate",
	errorembed: {
		color: 13584458,
		title: "There was an error :(",
		url: "https://discord.gg/txXN8aWXMZ",
		footer: {
			text: "Try again or report this in the linked server",
		},
	},
	async execute(interaction) {
		if (interaction.isChatInputCommand()) {
			const command = interaction.client.commands.get(interaction.commandName);

			if (!command) {
				console.error(`No command matching ${interaction.commandName} found.`);
				return;
			}

			try {
				await command.execute(interaction, this.errorembed);
			} catch (err) {
				if (!interaction.replied)
					interaction.reply({ embeds: [this.errorembed], ephemeral: true });

				console.error(`Error executing ${interaction.commandName}`);
				console.error(err);
			}
		} else if (interaction.isAutocomplete()) {
			const command = interaction.client.commands.get(interaction.commandName);

			try {
				await command.autocomplete(interaction);
			} catch (error) {
				console.error("Error handling help autocomplete");
				console.error(error);
			}
		}
	},
};
