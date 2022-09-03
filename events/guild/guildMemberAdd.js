const fs = require("fs");
module.exports = async (Discord, client, guildmember) => {
	let roleDB = JSON.parse(fs.readFileSync("./welcomeroles.json", "utf8"));
	if (!roleDB[guildmember.guild.id]) return;
	guildmember.guild.roles.fetch(roleDB[guildmember.guild.id]).then((role) => {
		if (!role) return;
		guildmember.roles.add(role);
	});
};
