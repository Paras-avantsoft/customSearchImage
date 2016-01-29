var http = require('http');
var https = require('https');
var url = require('url');
var fs = require('fs');
var path = require('path');
var cse_token = '008171334859300485105:xjnxxb8dxnk';
var g_api_key = 'AIzaSyDNUZTem7yknzqZuWrJfOGmDUERMi1J6KA';
var no_items = 10;

http.createServer(function(req, res) {
    if (url.parse(req.url,true).pathname === '/customsearch') {
        var value = url.parse(req.url,true).query.q,
            searchUrl = 'https://www.googleapis.com/customsearch/v1?q=' + encodeURIComponent(value) + '&cx=' + encodeURIComponent(cse_token) + '&filter=1&imgSize=small&num=' + no_items + '&searchType=image&fields=context%2Citems%2Ckind%2Cpromotions%2Cqueries%2CsearchInformation%2Cspelling%2Curl&key=' + encodeURIComponent(g_api_key);

        https.get(searchUrl, function(response) {
            var body = '';
            response.on('data', function(d) {
                body += d;
            });
            response.on('end', function() {
                var parsed = JSON.parse(body);
                console.log(body);

                res.setHeader('Access-Control-Allow-Origin', '*');
                res.setHeader('Access-Control-Allow-Methods', '*');
                res.setHeader('Access-Control-Allow-Headers', '*');
                res.setHeader('200',{"Content-Type":"text/html"});
                res.write(body);
                res.end();
            });
        }).on('error', function (e) {
            console.error("error >>>", e);
        });
    }
}).listen(4786);
