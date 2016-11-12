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

const result = [];
calculate(program.url, 0);

function calculate(url, page) {
    requestAsync(program.url, page)
        .then(
            function(body) {
                const $ = cheerio.load(body);

                $('.tags p a').each(function(i, elem) {
                    result[$(this).text().trim()] = (result[$(this).text().trim()] || 0) + 1;
                });
                console.log(result);
                const total = $('.job-link.selected').attr('title').split(" ")[3];
		//
                //calculate for this page
                //if more pages call calucaulte again
                //else print results 
            })
        .catch(
            function(reason) {
                console.log('Error fetching page.' + reason);
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
