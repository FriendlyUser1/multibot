const request = require("request");
const fs = require("fs");
module.exports = {
	name: "doesnotexist",
	description: "Gets an AI generated image of a person who doesn't exist",
	run: async (client, interaction, args) => {
		try {
			const download = (url, path, callback) => {
				request.head(url, (err, res, body) => {
					request(url).pipe(fs.createWriteStream(path)).on("close", callback);
				});
			};

			const url = "https://thispersondoesnotexist.com/image";
			const path = "./tempimgs/doesnotexist.png";

			download(url, path, () => {});

			return interaction.followUp({
				embeds: [
					{
						timestamp: Date.now(),
						image: { url: "attachment://doesnotexist.png" },
						title: "This person doesn't exist",
						color: require("../../ranCol").lightCol(),
					},
				],
				files: [
					{
						attachment: "./tempimgs/doesnotexist.png",
						name: "doesnotexist.png",
					},
				],
			});
		} catch (err) {
			console.log(err);
			return interaction.followUp({
				embeds: [
					{
						color: "#cf484a",
						description: "Whoops! There was an error.",
					},
				],
			});
		}
	},
};
