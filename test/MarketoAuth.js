import config from "./config";
import MarketoAuth from "../src/marketo/MarketoAuth";

const marketoAuth = new MarketoAuth(
	config.marketoApi.identifyUrl,
	config.marketoApi.clientId,
	config.marketoApi.clientSecret
);

describe('Marketo Auth', function ()
{
	this.timeout(10000);

	it('should generate access token', (done) =>
	{
		marketoAuth.generateAccessToken().then((token) => {
			done();
		}, (error) => {
			done(error);
		})
	})
});