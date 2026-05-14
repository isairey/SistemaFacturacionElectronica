// eslint-disable-next-line no-undef
const { Sequelize, DataTypes } = require("sequelize");

class Database {
	constructor() {
		this.sequelize = new Sequelize({
			dialect: "sqlite",
			storage: "../db.sqlite",
			logging: false,
		});

		try {
			this.sequelize.authenticate();
			console.log("Connection has been established successfully.");
		} catch (error) {
			console.error("Unable to connect to the database:", error);
		}
		this.createTable("products", {
			id: {
				type: DataTypes.TEXT,
				primaryKey: true,
			},
			name: {
				type: DataTypes.TEXT,
			},
			brand: {
				type: DataTypes.TEXT,
			},
			model: {
				type: DataTypes.TEXT,
			},
			bought_price: {
				type: DataTypes.NUMBER,
			},
			sell_price: {
				type: DataTypes.NUMBER,
			},
			stock: {
				type: DataTypes.NUMBER,
			},
			comp_id: {
				type: DataTypes.TEXT,
			},
		});
		this.createTable("sales", {
			id: {
				type: DataTypes.TEXT,
				primaryKey: true,
			},
			client: {
				type: DataTypes.TEXT,
			},
			date: {
				type: DataTypes.TEXT,
			},
			cashier: {
				type: DataTypes.TEXT,
			},
			products: {
				type: DataTypes.TEXT,
			},
			note: {
				type: DataTypes.TEXT,
			},
			comp_id: {
				type: DataTypes.TEXT,
			},
		});
		this.createTable("users", {
			id: {
				type: DataTypes.TEXT,
				primaryKey: true,
			},
			comp_id: {
				type: DataTypes.TEXT,
			},
			username: {
				type: DataTypes.TEXT,
			},
			email: {
				type: DataTypes.TEXT,
			},
			password: {
				type: DataTypes.TEXT,
			},
			salt: {
				type: DataTypes.TEXT,
			},
		});
		this.createTable("companies", {
			id: {
				type: DataTypes.TEXT,
				primaryKey: true,
			},
			owner: {
				type: DataTypes.TEXT,
			},
			name: {
				type: DataTypes.TEXT,
			},
			logo: {
				type: DataTypes.TEXT,
			},
			slogan: {
				type: DataTypes.TEXT,
			},
			anniversary: {
				type: DataTypes.TEXT,
			},
			ruc: {
				type: DataTypes.TEXT,
			},
			address: {
				type: DataTypes.TEXT,
			},
			contact_phone: {
				type: DataTypes.TEXT,
			},
			contact_email: {
				type: DataTypes.TEXT,
			},
			attention_hours: {
				type: DataTypes.TEXT,
			},
		});
		this.sequelize.sync();
	}

	async read({ table, ID }) {
		// console.log(table, 'table')
		// console.log(ID, 'id')
		let data = this.sequelize.models[table];
		// console.log(data, 'data')
		let returnData = await data.findOne({
			where: {
				id: ID,
			},
		});
		return returnData;
	}

	async readAll(table, params = undefined) {
		let data = this.sequelize.models[table];
		let returnData = await data.findAll(params);
		return JSON.parse(JSON.stringify(returnData));
	}

	async write({ table, ID, dataToUpdate }) {
		let data = await this.read({ table, ID });
		let t = this.sequelize.models[table];
		if (data == null) {
			//If row doesn't exist,
			await t.create({
				//Create it, with the ID
				id: ID,
			});
		}
		for (let item in dataToUpdate) {
			await t.update(
				{ [item]: dataToUpdate[item] },
				{
					where: {
						id: ID,
					},
				}
			);
		}
		return true;
	}

	async destroy({ table, ID }) {
		await this.sequelize.models[table].destroy({
			where: { id: ID },
		});
		return true;
	}
	async increment({ table, ID, data }) {
		let dataTable = this.sequelize.models[table];
		await dataTable.increment(data, { where: { id: ID } });
		return 0;
	}
	async drop(table) {
		let dataTable = this.sequelize.models[table];
		await dataTable.drop();
		return 0;
	}
	async createTable(table, data) {
		return this.sequelize.define(table, data);
	}
}

function httpGetAsync(theUrl, method) {
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.onreadystatechange = function () {
		return xmlHttp;
	};
	xmlHttp.open(method, theUrl, true); // true for asynchronous
	xmlHttp.send(null);
}

function arrayToMatrix(array, k) {
	// Calculate the number of arrays (n) in the matrix
	const n = Math.floor(array.length / k);
	// Create an empty matrix to store the results
	const matrix = [];
	// Loop through the array and create sub-arrays of k elements
	for (let i = 0; i < n; i++) {
		matrix.push(array.slice(i * k, (i + 1) * k));
	}
	// Return the resulting matrix
	return matrix;
}



// eslint-disable-next-line no-undef
exports.Database = Database;
exports.httpGetAsync = httpGetAsync;
exports.arrayToMatrix = arrayToMatrix;