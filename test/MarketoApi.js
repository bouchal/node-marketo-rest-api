import config from "./config";
import MarketoApi from "../src/marketo/MarketoApi";

describe('Marketo Api', function ()
{
	this.timeout(10000);
	var marketoApi = null;

	before(() =>
	{
		marketoApi = new MarketoApi(
			config.marketoApi.identifyUrl,
			config.marketoApi.baseUrl,
			config.marketoApi.clientId,
			config.marketoApi.clientSecret
		);
	});

	it('should generate brand new access token', (done) =>
	{
		var old = marketoApi._accessToken;
		marketoApi._fillAccessToken(true).then(() => {
			if(old == marketoApi._accessToken) {
				return done('Token isn\'t the same')
			}

			done()
		}, (err) => {
			done(err);
		});
	});

	it('shouldn\'t generate new access token', (done) =>
	{
		var old = marketoApi._accessToken;
		marketoApi._fillAccessToken().then(() => {
			if(old != marketoApi._accessToken) {
				return done('Token is the same')
			}

			done()
		}, (err) => {
			done(err);
		});
	});


	it('should execute GET request', (done) =>
	{
		const query = {
			filterType: 'id',
			filterValues: 1
		};

		marketoApi.get('/v1/leads.json', query).then((result) =>
		{
			return done();
		}, (err) =>
		{
			done(err);
		});
	});
});