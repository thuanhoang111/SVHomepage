const crypto = require("crypto");

const key1 = crypto.randomBytes(32).toString("hex");
const key2 = crypto.randomBytes(32).toString("hex");
const key3 = crypto.randomBytes(8).toString("hex");

console.table({ key3 });
