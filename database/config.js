const mongoose = require('mongoose');

const dbConnection = async () => {
	try {
		mongoose.connect(process.env.DB_CNN, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});

		console.log("DB ONLINE");
	} catch (error) {
		throw new Error("Error a la hora de inicializar DB.");
	}
};

module.exports = { dbConnection };
