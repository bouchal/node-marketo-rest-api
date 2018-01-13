export default class MarketoApiAccessTokenException extends Error {
	constructor (...args) {
		super(args);
		Error.captureStackTrace(this, MarketoApiAccessTokenException);
		this.name = 'MarketoApiAccessTokenException';
	}
}