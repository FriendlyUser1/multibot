const { EmbedBuilder } = require("discord.js");
const { errorembed } = require("./events/interactionCreate");

module.exports = {
	makeConverter(name, process, message, encode, decode) {
		try {
			const isEncode = process == "En";

			let conversionEmbed = new EmbedBuilder()
				.setTimestamp()
				.setColor(require("./ranCol").lightCol())
				.setTitle(`${process}coded ${isEncode ? "to" : "from"} ${name}:`);

			conversionEmbed.setDescription(
				isEncode ? encode(message) : decode(message)
			);

			return conversionEmbed;
		} catch (err) {
			console.error(err);
			return errorembed;
		}
	},
};
