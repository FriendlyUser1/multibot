const { readdirSync } = require("fs");
const { MessageEmbed } = require("discord.js");
module.exports = {
	name: "help",
	description: "Shows all available commands",
	options: [
		{
			name: "command",
			type: "STRING",
			description: "The command you want to see information for",
			required: false,
		},
	],
	run: async (client, interaction, args) => {
		if (!interaction.options.getString("command")) {
			let categories = [];

			readdirSync("./commands/").forEach((dir) => {
				if (dir.toLowerCase() != "owner") {
					const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
						file.endsWith(".js")
					);

					const cmds = commands.map((command) => {
						let file = require(`../../commands/${dir}/${command}`);

						if (!file.name) return "No command name.";

						let name = file.name.replace(".js", "");

						return `\`${name}\``;
					});

					let data = new Object();
					data = {
						name: `${dir.toUpperCase()} [${cmds.length}]`,
						value: cmds.length === 0 ? "In progress." : cmds.join(", "),
					};
					categories.push(data);
				}
			});

			const embed = new MessageEmbed()
				.setTitle("Here are all of my commands:")
				.addFields(categories)
				.setDescription(
					`Use /help with a command name to get more info on a command.`
				)
				.setTimestamp()
				.setColor("GREEN");
			return interaction.followUp({ embeds: [embed] });
		} else {
			let givenCommand = interaction.options.getString("command");
			if (!client.slashCommands.get(givenCommand)) {
				return interaction.followUp({
					embeds: [
						{
							color: "#cf484a",
							description: "Whoops! That isn't a valid command.",
						},
					],
				});
			}

			const command = client.slashCommands.get(givenCommand);

			const embed = new MessageEmbed()
				.setTitle(
					command.name ? `\`${command.name}\`` : "No name for this command."
				)
				.setDescription(
					command.description
						? command.description
						: "No description for this command."
				)
				.setTimestamp()
				.setColor(require("../../ranCol").lightCol());
			return interaction.followUp({ embeds: [embed] });
		}
	},
};
