#!/usr/bin/env node

'use strict';

const program = require('commander');
const validUrl = require('valid-url');
const cheerio = require('cheerio');
const request = require('request');


program.version('0.0.1')
    .option('-u, --url <required>', 'Stack Overflow careers page URL')
    .option('-t, --tech <required>', 'Technology that you already know')
    .parse(process.argv);

if (!program.url && !program.tech) {
    console.error('Invalid arguments. Refer to the help (-h option)');
}

if (!validUrl.isUri(program.url)) {
    console.error('Invalid url');
}

request(program.url, function(error, response, body) {
    if (!error && response.statusCode == 200) {
        var cheerio = require('cheerio');
        var $ = cheerio.load(body);
	console.log($('.tags p a').text());
    } else {
        console.error("There was an error. Error is " + error);
    }
})
