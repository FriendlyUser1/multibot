require("dotenv").config();
const fs = require("node:fs");
const path = require("node:path");
const { Client, Collection, GatewayIntentBits } = require("discord.js");

const client = new Client({
	intents: [GatewayIntentBits.Guilds],
	disableMentions: "everyone",
});

// Command handler
client.commands = new Collection();

const foldersPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(foldersPath);
let categories = [];

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs
		.readdirSync(commandsPath)
		.filter((file) => file.endsWith(".js"));

	if (commandFiles.length < 1) continue;

	categories.push({
		name: `\`${folder} (${commandFiles.length})\``,
		value: commandFiles.join(", ").replaceAll(".js", ""),
	});

	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);

		if ("data" in command && "execute" in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.warn(
				`The command ${filePath
					.split("commands")
					.at(-1)} is missing required properties.`
			);
		}
	}
}

client.categories = categories;

// Event handler
const eventsPath = path.join(__dirname, "events");
const eventFiles = fs
	.readdirSync(eventsPath)
	.filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);

	if (event.once) client.once(event.name, (...args) => event.execute(...args));
	else client.on(event.name, (...args) => event.execute(...args));
}

client.login(process.env.TOKEN);
