const request = require('request');
const cheerio = require('cheerio');
const books = [];
const pages = ['index.html', 'page-2.html', 'page-3.html'];
const Book = require('./../models/book.js');

pages.forEach(function(elem) {
    scrapeBookSite(elem);
})

function scrapeBookSite(path) {
    request(`http://books.toscrape.com/catalogue/category/books/fantasy_19/${path}`, function(err, response, body) {
        
        if (err) console.log(err);

        const $ = cheerio.load(body)

        $('.product_pod').each(function(i, elem) {

            let newRating = 0;

            if ($(elem).find('.star-rating').hasClass('One')) newRating = 1;
            if ($(elem).find('.star-rating').hasClass('Two')) newRating = 2;
            if ($(elem).find('.star-rating').hasClass('Three')) newRating = 3;
            if ($(elem).find('.star-rating').hasClass('Four')) newRating = 4;
            if ($(elem).find('.star-rating').hasClass('Five')) newRating = 5;

            let book = {
                title: $(elem).find('h3 > a').text(), 
                price: parseFloat((parseFloat($(elem).find('.price_color').text().slice(1)) * 1.36).toFixed(2)), 
                rating: newRating
            }

            books.push(book);

            if (books.length === 48) {
                Book.create({ title: "Yo", price: 1, rating: 5})
                    .then(book => console.log(book))
            }
            
        })
    })
}

scrapeBookSite();