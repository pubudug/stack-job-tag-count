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

calculate(program.url, 0);

function calculate(url, page) {
    requestAsync(program.url, page)
        .then(
            function(body) {
		   //calculate for this page
		   //if more pages call calucaulte again
		   //else print results 
                console.log(body+ "page: " +page);
            })
        .catch(
            function(reason) {
                console.log('Error fetching page.');
            });
}

function requestAsync(url) {
    return new Promise(function(fulfill, reject) {
        request(url, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                return fulfill(body);
            } else {
                return reject(error);
            }
        });

    });
}
