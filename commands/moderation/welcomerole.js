const { MongoClient, ServerApiVersion } = require("mongodb");
const {
	ApplicationCommandOptionType,
	PermissionsBitField,
} = require("discord.js");
module.exports = {
	name: "welcomerole",
	description:
		"Set or change what role to give new users on server join (admin only)",
	options: [
		{
			name: "role_id",
			type: ApplicationCommandOptionType.String,
			description: "The id of the chosen role",
			required: false,
		},
		{
			name: "clear",
			type: ApplicationCommandOptionType.Boolean,
			description: "Whether to clear the current welcome role",
			required: false,
		},
	],
	run: async (client, interaction, args) => {
		if (
			!interaction.member.permissions.has(
				PermissionsBitField.Flags.Administrator
			)
		) {
			return interaction.followUp({
				embeds: [
					{
						color: "13584458",
						timestamp: new Date().toISOString(),
						description: "You don't have permission!",
					},
				],
			});
		}

		let io = interaction.options;
		if (!io.getString("role_id") && !io.getBoolean("clear")) {
			return interaction.followUp({
				embeds: [
					{
						color: "13584458",
						timestamp: new Date().toISOString(),
						description: "You need to use one of the options",
					},
				],
			});
		}

		const mongoclient = new MongoClient(
			`mongodb+srv://${process.env.MONGOUSER}:${process.env.MONGOPASS}@multibot.x4ns9q3.mongodb.net/?retryWrites=true&w=majority`,
			{
				useNewUrlParser: true,
				useUnifiedTopology: true,
				serverApi: ServerApiVersion.v1,
			}
		);

		mongoclient.connect(async (err) => {
			const collection = mongoclient.db("multibot").collection("welcomeroles");
			await collection.updateOne(
				{ serverid: interaction.guild.id },
				{
					$set: {
						roleid: io.getBoolean("clear")
							? null
							: interaction.options.getString("role_id"),
					},
				},
				{ upsert: true }
			);
			mongoclient.close();
		});

		if (io.getBoolean("clear"))
			return interaction.followUp({
				embeds: [
					{
						color: require("../../ranCol").darkCol(),
						title: "Role cleared!",
						description: "The current role has been removed.",
						timestamp: new Date().toISOString(),
					},
				],
			});
		else
			return interaction.followUp({
				embeds: [
					{
						color: require("../../ranCol").lightCol(),
						title: "Role set!",
						description: `The role with id "${interaction.options.getString(
							"role_id"
						)}" has been set as the new welcome role`,
						timestamp: new Date().toISOString(),
					},
				],
			});
	},
};
