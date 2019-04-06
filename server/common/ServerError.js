module.exports = class ServerError extends Error {

	constructor(message, statusCode) {
		super(message)
		this.statusCode = statusCode
	}
}