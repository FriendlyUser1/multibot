const { REST, Routes } = require("discord.js");
require("dotenv").config();
const fs = require("node:fs");
const path = require("node:path");

let commands = [];

const foldersPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs
		.readdirSync(commandsPath)
		.filter((file) => file.endsWith(".js"));

	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ("data" in command && "execute" in command) {
			commands.push(command.data.toJSON());
		} else {
			console.warn(
				`The command ${filePath
					.split("commands")
					.at(-1)} is missing required properties.`
			);
		}
	}
}

const rest = new REST().setToken(process.env.TOKEN);
(async () => {
	try {
		console.log(`Deploying ${commands.length} commands`);

		const data = await rest.put(
			// Routes.applicationGuildCommands(
			// 	process.env.CLIENTID,
			// 	process.env.GUILDID
			// ),
			Routes.applicationCommands(process.env.CLIENTID),
			{ body: commands }
			// { body: [] }
		);

		console.log(`Successfully deployed ${data.length} commands`);
	} catch (err) {
		console.error(err);
	}
})();
