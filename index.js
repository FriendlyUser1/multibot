const { Client, Collection } = require("discord.js");
const Discord = require("discord.js");
require("dotenv").config();

const client = new Client({
	intents: 98047,
	disableMentions: "everyone",
});
module.exports = client;

client.slashCommands = new Collection();

["command_handler", "event_handler"].forEach((handler) => {
	require(`./handlers/${handler}`)(client, Discord);
});

client.login(process.env.MULTITOKEN);
