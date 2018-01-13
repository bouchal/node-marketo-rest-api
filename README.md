# Node Marketo REST API library

## About

Simple library for Marketo REST API requests based on promises or async/await.

It handle working with access token, generating them and keeping error codes.

For storing access token you can use runtime memory cache or redis.

## Installation

```
npm i node-marketo-rest-api
```

## Usage

### Init

```
import MarketoApi from 'node-marketo-rest-api';

const marketoApi = new MarketoApi(identifyUrl, baseUrl, clientId, clientSecret);
```

### Sending request

__Async / Await__
```
const result = await marketoApi.get('asset/v1/forms.json');

console.log(result);
```

__Promise__
```
marketoApi.get('asset/v1/forms.json').then((result) => { console.log(result); })
```

#### Available methods

- `marketoApi.get`
- `marketoApi.post`
- `marketoApi.del`

### Use Redis cache

```
import MarketoApi from 'node-marketo-rest-api';

// TODO: Find better way
import RedisCacheStorage from 'node-marketo-rest-api/dist/cache/RedisCacheStorage`;

const cacheStorage = new RedisCacheStorage(redisUrl);

const marketoApi = new MarketoApi(identifyUrl, baseUrl, clientId, clientSecret, cacheStorage);
```