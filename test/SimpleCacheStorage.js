import SimpleCacheStorage from "../src/cache/SimpleCacheStorage";

let cacheStorage = null;

describe('Marketo cache storage', function ()
{
	const testKey = 'testKeyMarketoApi';
	const testValue = 'Test value';

	this.timeout(5000);

	before(() =>
	{
		cacheStorage = new SimpleCacheStorage();
	});

	it('should set new value', (done) =>
	{
		cacheStorage.set(testKey, testValue).then(() =>
		{
			done();
		}, (err) =>
		{
			done(err);
		})
	});

	it('should get value what we set before', (done) =>
	{
		cacheStorage.get(testKey).then((value) =>
		{
			if(value == testValue) {
				return done();
			}

			done('Value is not same like we saved');
		}, (err) =>
		{
			done(err);
		})
	});

	it('should delete value what we set before', (done) =>
	{
		cacheStorage.remove(testKey).then(() =>
		{
			cacheStorage.get(testKey).then((value) =>
			{
				if(!value) {
					return done();
				}

				done('Value is not deleted');
			})
		}, (err) =>
		{
			done(err);
		})
	});
});
