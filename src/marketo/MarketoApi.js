import MarketoAuth from "./MarketoAuth";
import request from "request";
import MarketoApiAccessTokenException from "./MarketoApiAccessTokenException";
import MarketoApiRequestException from "./MarketoApiRequestException";
import SimpleCacheStorage from '../cache/SimpleCacheStorage';

/**
 * This class is definition for creating complete communication and error handling with Marketo API
 *
 * It will automatically create and handle access token and regenerate new one, when it's needed.
 */
class MarketoApi {
	constructor(identifyUrl, baseUrl, clientId, clientSecret, cacheStorage = null)
	{
		this._identifyUrl = identifyUrl;
		this._baseUrl = baseUrl;
		this._clientId = clientId;
		this._clientSecret = clientSecret;

		if(!cacheStorage) {
			cacheStorage = new SimpleCacheStorage();
		}

		this._marketoCacheStorage = cacheStorage;

		this._accessToken = null;
		this._accessTokenCacheKey = 'accessToken';

		this._marketoAuth = new MarketoAuth(identifyUrl, clientId, clientSecret);

		this._fillAccessToken();
	}

	async get(path, data = [])
	{
		return await this._sendRequest('GET', path, data);
	}

	async post(path, query = [], data = [])
	{
		return await this._sendRequest('POST', path, query, data);
	}

	async del(path, data = [])
	{
		return await this._sendRequest('DELETE', path, data);
	}

	/**
	 * When we create instance of Marketo Api, we need to fill marketo access token from cache or generate new.
	 *
	 * @param force
	 * @private
	 */
	async _fillAccessToken(force = false)
	{
		const cachedToken = await this._marketoCacheStorage.get(this._accessTokenCacheKey);

		if(!force && cachedToken) {
			this._accessToken = cachedToken;
			return;
		}

		this._accessToken = await this._marketoAuth.generateAccessToken();
		this._marketoCacheStorage.set(this._accessTokenCacheKey, this._accessToken);
	}

	/**
	 * We need to add to every request URL access_token param.
	 *
	 * @return {{access_token: string}}
	 */
	getBaseUrlData()
	{
		return {
			access_token: this._accessToken
		}
	}

	async _sendRequest(method, path, query, data)
	{
		const url = this._baseUrl + '/' + path.replace(/^\/+/g, '')

		let requestParams = {
			url,
			method,
			qs: this.getBaseUrlData(),
			json: true
		};

		if(query) {
			requestParams.qs = {...requestParams.qs, ...query};
		}

		if(data) {
			requestParams.json = data;
		}

		try {
			return await this._retrieveData(requestParams);
		} catch (e) {
			if(String(e) == 'MarketoApiAccessTokenException') {
				await this._fillAccessToken(true);
				return await this._sendRequest(method, path, query, data);
			}

			return Promise.reject(e);
		}
	}

	_retrieveData(requestParams)
	{
		return new Promise((resolve, reject) =>
		{
			request(requestParams, (error, result, body) =>
			{
				if(error) {
					return reject(error);
				}

				if(body.errors && body.errors.length) {
					const error = body.errors[0];
					const code = error.code ? error.code : 0;

					if([600, 601, 602].indexOf(parseInt(code)) != -1) {
						return reject(new MarketoApiAccessTokenException());
					}

					return reject(new MarketoApiRequestException(error.message, code));
				}

				resolve(body.result ? body.result : null);
			});
		});
	}
}

export default MarketoApi;