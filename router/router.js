const {home,bollywood,technology,hollywood,fitness} = require("../controller/data");
const {register,login} = require("../controller/register")
const verifyUser = require("../middleware/middleware")

const route = require("express").Router();

route.get("/api/home",home)
route.get("/api/bollywood",bollywood)
route.get("/api/technology",technology)
route.get("/api/hollywood",hollywood)
route.get("/api/fitness",fitness)
route.post("/register",register)
route.post("/login",login)

module.exports = route;