export default class AbstractCacheStorage {
	constructor(...args)
	{
		if(new.target === AbstractCacheStorage) {
			throw new TypeError("Cannot construct Abstract instances directly");
		}
	}

	/**
	 * Return promise with value in resolve parameter based on cache key.
	 *
	 * @param key
	 * @return {Promise}
	 */
	get(key)
	{
		throw new TypeError("Must override method 'get'");
	}

	/**
	 * Save value to cache with key.
	 *
	 * @param key
	 * @param value
	 * @return {Promise}
	 */
	set(key, value)
	{
		throw new TypeError("Must override method 'set'");
	}

	/**
	 * Remove value from cache based on key.
	 *
	 * @param key
	 * @return {Promise}
	 */
	remove(key)
	{
		throw new TypeError("Must override method 'remove'");
	}
}