import redis from 'redis-url';

/**
 * For cache some data like access token or forms, we use this class.
 *
 * For saving data we use Redis DB.
 */
class RedisCacheStorage
{
	static get _redisKeyPrefix() {
		return 'mktoApiCache:';
	}

	constructor(redisUrl) {
		this._redisUrl = redisUrl;
		this._redisClient = null;

		this.connect();
	}

	/**
	 *
	 * @param key
	 * @return {Promise}
	 */
	get(key) {
		return new Promise((resolve, reject) => {
			this._redisClient.get(this._redisKeyPrefix + key, (err, res) => {
				if (err) {
					return reject(err);
				}

				resolve(res);
			});
		});
	}

	/**
	 *
	 * @param key
	 * @param value
	 * @param expiration
	 */
	set(key, value, expiration = 3000) {
		return new Promise((resolve, reject) => {
			this._redisClient.set(this._redisKeyPrefix + key, value, 'EX', expiration, (err, res) => {
				if (err) {
					return reject(err);
				}

				resolve(res);
			});
		});
	}

	/**
	 *
	 * @param key
	 * @return {Promise}
	 */
	remove(key) {
		return new Promise((resolve, reject) => {
			this._redisClient.del(this._redisKeyPrefix + key, (err, res) => {
				if (err) {
					return reject(err);
				}

				resolve(res);
			});
		});
	}

	connect() {
		this._redisClient = redis.connect(this._redisUrl);
	}

	disconnect() {
		this._redisClient.quit();
		this._redisClient = null;
	}
}

export default RedisCacheStorage;