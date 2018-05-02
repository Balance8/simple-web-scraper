const request = require('request');
const cheerio = require('cheerio');

const pages = ['index.html', 'page-2.html', 'page-3.html']

pages.forEach(function(elem) {
    scrapeBookSite(elem);
})

function scrapeBookSite(path) {
    // Make an HTTP request to our site and log out the HTML
    request(`http://books.toscrape.com/catalogue/category/books/fantasy_19/${path}`, function(err, response, body) {
        if (err) console.log(err);
        
        const $ = cheerio.load(body)

        $('.price_color').each(function(i, elem) {
            console.log($(elem).text())
        })

    })
}

scrapeBookSite();