module.exports = {
	ranCol() {
		return parseInt(
			(
				"00000" + Math.floor(Math.random() * Math.pow(16, 6)).toString(16)
			).slice(-6),
			16
		);
	},
	lightCol() {
		let colour = "";
		for (let i = 0; i < 3; i++)
			colour += (
				"0" +
				Math.floor(((1 + Math.random()) * Math.pow(16, 2)) / 2).toString(16)
			).slice(-2);
		return parseInt(colour, 16);
	},
	darkCol() {
		let colour = "";
		for (let i = 0; i < 3; i++)
			colour += (
				"0" + Math.floor((Math.random() * Math.pow(16, 2)) / 2).toString(16)
			).slice(-2);
		return parseInt(colour, 16);
	},
};
