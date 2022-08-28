module.exports = {
	name: "suggest",
	description: "Suggest a feature to be added to the bot!",
	options: [
		{
			name: "suggestion",
			type: "STRING",
			description: "The feature you want to suggestion",
			required: true
		}
	],
	run: async (client, interaction, args) => {
		var owner = client.users.cache.find(
			(user) => user.id === "560183438393737264"
		);

		owner.send(
			`**New suggestion from ${interaction.user.tag} (id: ${interaction.user.id
			})\nin server ${interaction.guild.name} (id: ${interaction.guild.id
			})**\nSuggestion: ${interaction.options.getString("suggestion")}`
		);
		interaction.followUp({ embeds: [{ title: "Your suggestion has been sent!", description: "Thank you for sending a suggestion :)", color: require("../../ranCol").lightCol(), timestamp: Date.now() }] });

	},
};
