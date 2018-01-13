export default class MarketoApiRequestException extends Error {
	constructor (...args) {
		super(args);
		Error.captureStackTrace(this, MarketoApiRequestException);
		this.name = 'MarketoApiRequestException';
	}
}