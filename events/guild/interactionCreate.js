const { InteractionType } = require("discord.js");
module.exports = async (Discord, client, interaction) => {
	if (!interaction.inGuild()) return;
	if (interaction.type === InteractionType.ApplicationCommand) {
		await interaction.deferReply();

		const cmd = client.slashCommands.get(interaction.commandName);
		if (!cmd)
			return interaction.followUp({
				embeds: [
					{
						color: 13584458,
						description: "There was an error - please try again! ",
					},
				],
			});

		const args = [];

		for (let option of interaction.options.data) {
			if (option.type === "SUB_COMMAND") {
				if (option.name) args.push(option.name);
				option.options?.forEach((x) => {
					if (x.value) args.push(x.value);
				});
			} else if (option.value) args.push(option.value);
		}
		interaction.member = interaction.guild.members.cache.get(
			interaction.user.id
		);

		return cmd.run(client, interaction, args);
	}

	// Context Menu Handling
	if (interaction.isContextMenu()) {
		await interaction.deferReply({ ephemeral: false });
		const command = client.slashCommands.get(interaction.commandName);
		if (command) command.run(client, interaction);
	}
	return;
};
