const request = require('request');
async function doRequest(options)
{
    return new Promise(function (resolve, reject) {
        request(options, function (error, response) {
            if (error) throw new Error(error);
            rawData = JSON.parse(response.body);
            resolve(rawData);
        });
      });
}

async function doRequestRaw(options)
{
    return new Promise(function (resolve, reject) {
        request(options, function (error, response) {
            if (error) throw new Error(error);
            rawData = response.body;
            resolve(rawData);
        });
      });
}
async function anyRequest(url)
{
    var options = {
        'method': 'GET',
        'url': url,
        'headers': {
          'user-agent': ' Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36',
          'Content-Type': 'application/json'
        },
      };
      return doRequest(options);
}
async function anyRequests(options)
{
      return doRequest(options);
}
async function anyRequestsRaw(options)
{
      return doRequestRaw(options);
}

module.exports = {
    anyRequest,
    anyRequests,
    anyRequestsRaw
}