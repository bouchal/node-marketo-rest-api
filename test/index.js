import config from "./config";

if(
	config.marketoApi.baseUrl.length > 0 &&
	config.marketoApi.identifyUrl.length > 0 &&
	config.marketoApi.clientId.length > 0 &&
	config.marketoApi.clientSecret.length > 0
) {
	require('./MarketoApi');
	require('./MarketoAuth');
}

if(
	config.redis.length > 0
) {
	require('./RedisCacheStorage');
}

require('./SimpleCacheStorage');