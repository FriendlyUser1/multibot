module.exports = {
	name: "reverse",
	description: "reverses a message",
	options: [
		{
			name: "message",
			type: "STRING",
			description: "The string you want to be reversed",
			required: true,
		}
	],
	run: async (client, interaction, args) => {
		var splitString = interaction.options.getString("message").split("");
		var reverseArray = splitString.reverse();
		var joinArray = reverseArray.join("");
		interaction.followUp({ embeds: [{ title: "Reversed message:", description: joinArray, timestamp: Date.now(), color: require("../../ranCol").lightCol() }] });
	},
};
