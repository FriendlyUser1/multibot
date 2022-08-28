module.exports = {
	name: "binary",
	description: "Converts text to and from binary",
	options: [
		{
			name: "process",
			type: "STRING",
			description: "Specify whether you want to encode to binary or decode from binary",
			required: true,
			choices: [
				{
					name: "encode",
					value: "encode"
				},
				{
					name: "decode",
					value: "decode"
				}
			]
		},
		{
			name: "message",
			type: "STRING",
			description: "The string you want to encode/decode",
			required: true,
		}
	],
	run: async (client, interaction, args) => {
		var message = interaction.options.getString("message")

		if (interaction.options.getString("process") == "encode") {
			var encoded = message.trim().split("").map(item => ("00000000" + item.charCodeAt().toString(2)).split("").slice(-8).join("")).join(" ");

			return interaction.followUp({
				embeds: [{
					title: "Encoded to Binary:", description: encoded.length > 4000 ? "Error: encoded message is too long to display" : encoded, timestamp: Date.now(), color: require("../../ranCol").lightCol()
				}]
			})
		}

		var decoded = message.trim().split(" ").map(item => String.fromCharCode(parseInt(item, 2))).join("");

		return interaction.followUp({
			embeds: [{
				title: "Decoded from Binary:", description: decoded, timestamp: Date.now(), color: require("../../ranCol").lightCol()
			}]
		})
	},
};
