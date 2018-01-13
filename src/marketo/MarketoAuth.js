import request from 'request'

/**
 * For working with Marketo Rest API, we need to generate Access token.
 *
 * For this we use this class and function generateAccessToken.
 */
class MarketoAuth
{
	/**
	 *
	 * @param identifyUrl
	 * @param clientId
	 * @param clientSecret
	 */
	constructor(identifyUrl, clientId, clientSecret) {
		this._identifyUrl = identifyUrl;
		this._clientId = clientId;
		this._clientSecret = clientSecret;
	}

	async generateAccessToken() {
		const qs = {
			'grant_type': 'client_credentials',
			'client_id': this._clientId,
			'client_secret': this._clientSecret
		};

		const url = this._identifyUrl + '/oauth/token';

		const requestParams = {
			url,
			method: 'GET',
			qs,
			json: true
		};

		return new Promise((resolve, reject) => {
			request(requestParams, async (error, response, body) => {
				if (error) {
					return reject(error);
				}

				if (!body.access_token || !body.access_token.length) {
					return reject('Error while generating Marketo API access token - ' + JSON.stringify(body));
				}

				resolve(body.access_token);
			});
		});
	}
}

export default MarketoAuth;