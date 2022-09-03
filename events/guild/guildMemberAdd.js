const { MongoClient, ServerApiVersion } = require("mongodb");
module.exports = async (Discord, client, guildmember) => {
	const mongoclient = new MongoClient(
		`mongodb+srv://${process.env.MONGOUSER}:${process.env.MONGOPASS}@multibot.x4ns9q3.mongodb.net/?retryWrites=true&w=majority`,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
			serverApi: ServerApiVersion.v1,
		}
	);

	let roleid;
	mongoclient.connect(async (err) => {
		const collection = mongoclient.db("multibot").collection("welcomeroles");
		roleid = await collection
			.find({ serverid: guildmember.guild.id })
			.toArray();
		roleid = roleid[0].roleid;
		if (!roleid) return;
		guildmember.guild.roles.fetch(roleid).then((role) => {
			if (!role) return;
			guildmember.roles.add(role);
		});
		mongoclient.close();
	});
};
