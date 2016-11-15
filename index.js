#!/usr/bin/env node

'use strict';

const program = require('commander');
const validUrl = require('valid-url');
const cheerio = require('cheerio');
const request = require('request');
const domurl = require('domurl');


program.version('0.0.1')
    .option('-u, --url <required>', 'Stack Overflow careers page URL')
    .parse(process.argv);

if (!program.url) {
    console.error('Invalid arguments. Refer to the help (-h option)');
}

if (!validUrl.isUri(program.url)) {
    console.error('Invalid url');
}

const result = [];
calculate(program.url, 1);


function calculate(url, page) {
    console.log("Fetching page " + url);
    requestAsync(url, page)
        .then(
            function(body) {
                const $ = cheerio.load(body);

                $('.tags p a').each(function(i, elem) {
                    result[$(this).text().trim()] = (result[$(this).text().trim()] || 0) + 1;
                });
                const total = parseInt($('.job-link.selected').attr('title').split(" ")[3]);
                if (total !== page) {
                    const pageUrl = new domurl(url);
                    pageUrl.query.pg = page + 1;
                    calculate(pageUrl.toString(), page + 1);
                } else {
                    console.log(result.sort(function(a, b) {
                        return a - b;
                    }));
                }
                //
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
