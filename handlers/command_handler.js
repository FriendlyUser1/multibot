const { readdirSync } = require("fs");
var arrayOfSlashCommands = [];

module.exports = async (client, Discord) => {
	readdirSync("./commands/").forEach((dir) => {
		const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
			file.endsWith(".js")
		);

		for (let file of commands) {
			let pull = require(`../commands/${dir}/${file}`);
			if (!pull.name) return;
			client.slashCommands.set(pull.name, pull);

			arrayOfSlashCommands.push(pull);
		}
	});

	client.on("ready", async () => {
		// Register for a single guild
		client.guilds.cache.get("842788268634538034").commands.set([]);
		client.guilds.cache.get("913173890124095539").commands.set([]);
		client.guilds.cache.get("804592931586572298").commands.set([]);

		// Register for all the guilds the bot is in
		await client.application.commands.set(arrayOfSlashCommands);
	});
};
