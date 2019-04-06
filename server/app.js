const express = require("express")
const app = express()
const morgan = require("morgan")
const ServerError = require("./common/ServerError")

// logging some diagnostic information to the console
app.use(morgan("dev"))

app.use((request, response, next) => {
	response.header("Access-Control-Allow-Origin", "*")
	response.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept, Authorization"
	)
	if (request.method == "OPTIONS") {
		return response.status(200).end()
	}
	next()
})

// errors handling
app.use((request, response, next) => {
	const error = new ServerError("Not found", 404)
	next(error)
})

app.use((error, request, response, next) => {
	response.status(error.statusCode || 500)
	response.json({
		message: error.message,
		path: request.url,
		timestamp: new Date()
	})
})

module.exports = app