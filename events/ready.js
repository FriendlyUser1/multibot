module.exports = {
	name: "ready",
	once: true,
	execute(client) {
		console.log(`Multibot is ready! Logged in as ${client.user.tag}`);
	},
};
