import AbstractCacheStorage from "./AbstractCacheStorage";

export default class SimpleCacheStorage extends AbstractCacheStorage {
	constructor()
	{
		super();
		this.cache = [];
	}

	get(key)
	{
		return new Promise((resolve, reject) =>
		{
			resolve(this.cache[key])
		});
	};

	set(key, value)
	{
		return new Promise((resolve, reject) =>
		{
			this.cache[key] = value;
			resolve();
		});
	};

	remove(key)
	{
		return new Promise((resolve, reject) =>
		{
			delete this.cache[key];
			resolve();
		});
	};
}