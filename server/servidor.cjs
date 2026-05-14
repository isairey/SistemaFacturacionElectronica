const express = require("express");
const app = express();

let functions = require("./functions.cjs");

const swaggerUi = require("swagger-ui-express");
const bodyParser = require("body-parser");
const formData = require("express-form-data");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const session = require("express-session");

let db = new functions.Database();

// Parse application/x-www-form-urlencoded data
app.use(bodyParser.urlencoded({ extended: true }));
// Parse application/json data
app.use(bodyParser.json());
// Parse multipart/form-data data (including files)
app.use(formData.parse());
// Session settings
app.use(
	session({
		secret: "very very secure secret", // Replace with a secure secret
		resave: false,
		saveUninitialized: true,
		cookie: {
			maxAge: 1000 * 60 * 60 * 24, // 1 day
		},
	})
);
// Other settings
app.use(function (req, res, next) {
	// Website you wish to allow to connect
	res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");

	// Request methods you wish to allow
	// res.setHeader(
	// "Access-Control-Allow-Methods",
	// "GET, POST, OPTIONS, PUT, PATCH, DELETE"
	// );

	// Request headers you wish to allow
	res.setHeader(
		"Access-Control-Allow-Headers",
		"X-Requested-With,content-type,Authorization"
	);

	// Set to true if you need the website to include cookies in the requests sent
	// to the API (e.g. in case you use sessions)
	res.setHeader("Access-Control-Allow-Credentials", true);

	// Pass to next layer of middleware
	next();
});

app.post("/login", async (req, res) => {
	const { email, password } = req.body;
	const user = await db.read({
		table: "users",
		ID: email,
	});
	if (user == null) {
		return res
			.status(404)
			.json({ status: 404, success: false, message: "Incorrect email" });
	}
	const hashedPassword = bcryptjs.hashSync(password, user.salt);
	if (hashedPassword == user.password) {
		req.session.user = {
			id: email,
			username: user.username,
			comp_id: user.comp_id,
			token: jwt.sign({ email, comp_id: user.comp_id }, "ilovecats123", {
				expiresIn: "2d",
			}),
		};
		res.status(200).json({
			status: 200,
			success: true,
			token: req.session.user.token,
			username: user.username,
			comp_id: user.comp_id,
		});
	} else {
		return res
			.status(401)
			.json({ status: 401, success: false, message: "Incorrect password" });
	}
});

app.post("/register", async (req, res) => {
	const compName = req.body.compname;
	const email = req.body.email;
	const username = req.body.username;
	const password = req.body.password;

	let userRead = await db.read({
		table: "users",
		ID: email,
	});
	if (userRead != null)
		return res
			.status(403)
			.json({ status: 403, success: false, message: "Usuario ya existe" });

	const salt = bcryptjs.genSaltSync(10);
	const hashedPassword = bcryptjs.hashSync(password, salt);

	//Create company in the db
	let compID = Math.random().toString(36).substring(2, 15);
	let comp = await db.write({
		table: "companies",
		ID: compID,
		dataToUpdate: {
			name: compName,
			owner: email,
			logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEABAMAAACuXLVVAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAACRQTFRF////GRkZyEsxW1tbs7OzLUJjN0BOxMTE0dHRjY2NsrKy6+vr9PznIAAAAhBJREFUeJzt2jlOA0EQRuEWYqkQbmDZVxhyZBLykX0DREpEbt+BI3ACLogXjGfvdrlqGlnvRQg06k9/gDRuh0BEREREREREREREREREREREXT2k1HpqGmn2lBkwLXID0idwAqRP4AVInsALkDyBGyB1AjdA6gR+gFluwBSAIWDRrpxnBiyK3ID4BM6A+ATegOgE3oDoBO6A2ATugNgE/oAyN2AB4OIA99U/vPad2gRMKg9dAQAAAMClAvp+HguwfK/8/sMR0NH+oOoDN01AbwAAAADgBLg9nr/MArg7/o9+ywLYNXwyAAD/BGDzYfUZAJuP6/UAowsLPcDoykYNsLq0UgOsru20ALOLSy3A7OpWCVBeXve+mg0CJslnAQAAAAAAABcCaL2cjg1ovZ6PDWh9QAEAAAAAIwDSr2ycAOmXVl6AvgAAAAAAgAVglRsgfYDPkQDVCWqAr7EA0gP4jp9fmgAqE9QA149RQGEDkG5AeI4OMLcBHCeoA6ITFCav56EyQR0Qm+DwvebzAX8TNACRCQ5fazYASDdgeILyxQ5wmKAJGJygCGs7gHQDhiYon4LYAX4naAEire0AogKIHWA/wamA/QQ2AFEBxA6wm+BkwG4CI4CoAGIH2E5wOmA7gRVAVACxA2wmUAA2E5gBRAUQO0BYaQBhbQcQFUDsAEREREREREREREREREREREQX3w8ELdx5mLZTuwAAAABJRU5ErkJggg==",
			slogan: "",
			anniversary: "",
			ruc: "",
			address: "",
			contact_phone: "",
			contact_email: "",
			attention_hours: "",
		},
	});

	let user = await db.write({
		table: "users",
		ID: email,
		dataToUpdate: {
			comp_id: compID,
			email: email,
			username: username,
			password: hashedPassword,
			salt: salt,
		},
	});
	res.status(201).json({ status: 201, success: true, message: "User created" });
});

app.get("/dashboard", async (req, res) => {
	// console.log(req.headers);
	jwt.verify(
		req.headers.authorization,
		"ilovecats123",
		async (err, authData) => {
			if (err && err.name == "TokenExpiredError")
				return res
					.status(401)
					.json({ error: "TokenExpiredError", success: false });
			if (authData && !authData.comp_id)
				return res.status(403).json({
					status: 403,
					success: false,
					message: "Company ID not found",
					error: "CompanyIDNotFound",
				});
			const comp = await db.read({
				table: "companies",
				ID: authData.comp_id,
			});
			let products = await db.readAll("products", {
				where: {
					comp_id: authData.comp_id,
				},
			});
			let sales = await db.readAll("sales", {
				where: {
					comp_id: authData.comp_id,
				},
			});
			let chartData = [];
			let tempData = [];
			sales.forEach((sale) => {
				// console.log(tempData[parseInt(sale.date.split("-")[1]) - 1])
				if (tempData[parseInt(sale.date.split("-")[2]) - 1] == undefined) {
					tempData[parseInt(sale.date.split("-")[2]) - 1] = 0;
				}
				let saleProducts = JSON.parse(sale.products);
				// console.log(saleProducts)
				let netSell = 0;
				for (let product in saleProducts) {
					netSell +=
						saleProducts[product].unit_price * saleProducts[product].amt -
						saleProducts[product].discount;
				}
				tempData[parseInt(sale.date.split("-")[2]) - 1] += netSell;
			});
			let totalSale = 0;
			for (let i = 0; i < tempData.length; i++) {
				if (!tempData[i]) tempData[i] = 0;
				chartData.push({
					day: i + 1,
					net_sell: tempData[i],
				});
				totalSale += tempData[i];
			}

			let misc = {
				products_length: products.length,
				sales_length: sales.length,
				total_sell: totalSale,
			};
			res.status(200).json({
				status: 200,
				success: true,
				comp: comp,
				misc: misc,
				chartData: chartData,
			});
		}
	);
});

app.post("/sell", async (req, res) => {
	jwt.verify(
		req.headers.authorization,
		"ilovecats123",
		async (err, authData) => {
			if (err && err.name == "TokenExpiredError")
				return res
					.status(401)
					.json({ error: "TokenExpiredError", success: false });
			if (!authData.comp_id)
				return res.status(403).json({
					status: 403,
					success: false,
					message: "Company ID not found",
					error: "CompanyIDNotFound",
				});
			const products = await db.readAll("products", {
				where: {
					comp_id: authData.comp_id,
				},
			});
			const sales = await db.readAll("sales", {
				where: {
					comp_id: authData.comp_id,
				},
			});
			const comp = await db.read({
				table: "companies",
				ID: authData.comp_id,
			});
			// console.log("products", products);
			// console.log("sales", sales);
			res.status(200).json({
				status: 200,
				success: true,
				products: products,
				sales: sales,
				comp: comp,
			});
		}
	);
});

/* Products */

app.get("/products", async (req, res) => {
	jwt.verify(
		req.headers.authorization,
		"ilovecats123",
		async (err, authData) => {
			if (err && err.name == "TokenExpiredError")
				return res
					.status(401)
					.json({ error: "TokenExpiredError", success: false });
			if (!authData.comp_id)
				return res.status(403).json({
					status: 403,
					success: false,
					message: "Company ID not found",
					error: "CompanyIDNotFound",
				});
			const products = await db.readAll("products", {
				where: {
					comp_id: authData.comp_id,
				},
			});
			const comp = await db.read({
				table: "companies",
				ID: authData.comp_id,
			});
			res
				.status(200)
				.json({ status: 200, success: true, products: products, comp: comp });
		}
	);
});

app.get("/products/:id", async (req, res) => {
	const id = req.params.id;
	let product = await db.read({
		table: "products",
		ID: id,
	});
	if (product == null)
		return res.status(404).json({ error: "Product not found" });
	res.status(200).json(product);
});

app.post("/products/:id", async (req, res) => {
	jwt.verify(
		req.headers.authorization,
		"ilovecats123",
		async (err, authData) => {
			if (err && err.name == "TokenExpiredError")
				return res
					.status(401)
					.json({ error: "TokenExpiredError", success: false });
			if (!authData.comp_id)
				return res.status(403).json({
					status: 403,
					success: false,
					message: "Company ID not found",
					error: "CompanyIDNotFound",
				});
			const id = req.params.id;
			let productRead = await db.read({
				table: "products",
				ID: id,
			});
			if (productRead != null)
				return res.status(403).json({ error: "Product already exists" });

			let product = await db.write({
				table: "products",
				ID: id,
				dataToUpdate: req.body.createProductContent,
			});
			res.status(201).json({ status: 201, success: true });
		}
	);
});

app.patch("/products/:id", async (req, res) => {
	const id = req.params.id;
	let productRead = await db.read({
		table: "products",
		ID: id,
	});
	if (productRead == null)
		return res.status(404).json({ error: "Product not found" });
	let params = [
		"name",
		"brand",
		"model",
		"bought_price",
		"sell_price",
		"stock",
	];
	for (let q in req.query)
		if (!params.includes(q))
			return res.status(400).json({ error: `'${q}' is not a valid parameter` });
	let product = await db.write({
		table: "products",
		ID: id,
		dataToUpdate: req.query,
	});
	res.status(201).json(product);
});

app.delete("/products/:id", async (req, res) => {
	const id = req.params.id;
	let productRead = await db.read({
		table: "products",
		ID: id,
	});
	if (productRead == null)
		return res.status(404).json({ error: "Product not found" });
	let product = await db.destroy({
		table: "products",
		ID: id,
	});
	res.status(201).json(product);
});

/* Sales */

app.get("/sales", async (req, res) => {
	let sales = await db.readAll("sales");
	res.status(200).json(sales);
});

app.get("/sales/:comp_id", async (req, res) => {
	jwt.verify(
		req.headers.authorization,
		"ilovecats123",
		async (err, authData) => {
			if (err && err.name == "TokenExpiredError")
				return res
					.status(401)
					.json({ error: "TokenExpiredError", success: false });
			if (!authData.comp_id)
				return res.status(403).json({
					status: 403,
					success: false,
					message: "Company ID not found",
					error: "CompanyIDNotFound",
				});
			let sales = await db.readAll("sales", {
				where: {
					comp_id: req.params.comp_id,
				},
			});
			const comp = await db.read({
				table: "companies",
				ID: authData.comp_id,
			});
			if (sales == null)
				return res.status(404).json({ error: "Sale not found" });

			for (let i = 0; i < sales.length; i++) {
				sales[i].products = JSON.parse(sales[i].products);
				let d = new Date(sales[i].date);
				sales[i].date = d.getTime();
			}
			let returnObj = {};
			for (let i = 0; i < sales.length; i++) {
				returnObj[`V001-${sales[i].id.split("|")[0]}`] = sales[i];
			}

			return res
				.status(200)
				.json({ status: 200, success: true, sales: returnObj, comp: comp });
		}
	);
});

app.post("/sales", async (req, res) => {
	jwt.verify(
		req.headers.authorization,
		"ilovecats123",
		async (err, authData) => {
			if (err && err.name == "TokenExpiredError")
				return res
					.status(401)
					.json({ error: "TokenExpiredError", success: false });
			if (!authData.comp_id)
				return res.status(403).json({
					status: 403,
					success: false,
					message: "Company ID not found",
					error: "CompanyIDNotFound",
				});
			let saleID = req.body.saleID.split("-")[1]; //V001-1|pktuv81idjh
			// console.log(req.body)
			// const saleID = id.split("|")[0].split("-")[1]; //1
			const compID = req.body.comp_id; //pktuv81idjh
			// console.log(compID);
			let saleRead = await db.read({
				table: "sales",
				ID: `${saleID}|${compID}`,
			});
			// console.log(compID);
			while (true) {
				if (saleRead == null) break;
				saleID = saleID + 1;
				// console.log(compID);
				saleRead = await db.read({
					table: "sales",
					ID: `${saleID}|${compID}`,
				});
			}
			// let id = saleID + "|" + compID; //2|pktuv81idjh
			// if (saleRead != null)
			// return res.status(403).json({ error: "Sale already exists" });
			delete req.body.saleContent.id;
			// console.log(compID);
			let sale = await db.write({
				table: "sales",
				ID: `${saleID}|${compID}`,
				dataToUpdate: req.body.saleContent,
			});
			res.status(201).json({ status: 201, success: true });
		}
	);
});

app.patch("/sales/:id", async (req, res) => {
	const id = req.params.id;
	let saleRead = await db.read({
		table: "sales",
		ID: id,
	});
	if (saleRead == null)
		return res.status(404).json({ error: "Sale not found" });
	let params = ["client", "date", "cashier", "products", "note"];
	for (let q in req.query)
		if (!params.includes(q))
			return res.status(400).json({ error: `'${q}' is not a valid parameter` });
	let sale = await db.write({
		table: "sales",
		ID: id,
		dataToUpdate: req.query,
	});
	res.status(201).json(sale);
});

app.delete("/sales/:id", async (req, res) => {
	const id = req.params.id;
	let saleRead = await db.read({
		table: "sales",
		ID: id,
	});
	if (saleRead == null)
		return res.status(404).json({ error: "Sale not found" });
	let sale = await db.destroy({
		table: "sales",
		ID: id,
	});
	res.status(201).json(sale);
});

/* Users */

app.get("/users", async (req, res) => {
	let users = await db.readAll("users");
	res.status(200).json(users);
});

app.get("/users/:id", async (req, res) => {
	const id = req.params.id;
	let user = await db.read({
		table: "users",
		ID: id,
	});
	if (user == null) return res.status(404).json({ error: "User not found" });
	res.status(200).json(user);
});

app.post("/users/:id", async (req, res) => {
	const id = req.params.id;
	let userRead = await db.read({
		table: "users",
		ID: id,
	});
	if (userRead != null)
		return res.status(403).json({ error: "User already exists" });
	let user = await db.write({
		table: "users",
		ID: id,
		dataToUpdate: req.query,
	});
	res.status(201).json(user);
});

app.patch("/users/:id", async (req, res) => {
	const id = req.params.id;
	let userRead = await db.read({
		table: "users",
		ID: id,
	});
	if (userRead == null)
		return res.status(404).json({ error: "User not found" });
	let params = ["comp_name", "username", "email", "password"];
	for (let q in req.query)
		if (!params.includes(q))
			return res.status(400).json({ error: `'${q}' is not a valid parameter` });
	let user = await db.write({
		table: "users",
		ID: id,
		dataToUpdate: req.query,
	});
	res.status(201).json(user);
});

app.delete("/users/:id", async (req, res) => {
	const id = req.params.id;
	let userRead = await db.read({
		table: "users",
		ID: id,
	});
	if (userRead == null)
		return res.status(404).json({ error: "User not found" });
	let user = await db.destroy({
		table: "users",
		ID: id,
	});
	res.status(201).json(user);
});

app.listen(3000);

//https://factucomperu.onrender.com/sales/V001-1?client=00000000&date=2023-11-12 20:22:35.840&cashier=Christopher&products={ "1": { "amt": 2, "unit_price": 180, "discount": 10 } }&note=SN 3133
