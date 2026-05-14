
const functions = require('./functions.cjs')
const db = new functions.Database();

// let d = new Date("2023-12-14 11:56:50.000 +00:00");

// console.log(d.getTime())
// db.drop('users')
// db.drop('companies')
// db.drop('sales')
// db.drop('products')
return;

const jwt = require("jsonwebtoken");
const payload = {
	email: "email@gmail.com",
};

const token = jwt.sign(payload, "hashed_password");
jwt.verify(token, "hashed_password", (err, decoded) => {
	if (err) {
		console.log(err);
	}
	console.log(decoded);
});
console.log(token);
