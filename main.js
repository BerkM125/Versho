const http = require('http');
const express = require('express');
const app = express();
const StockXAPI = require('stockx-api');
const stockX = new StockXAPI();
let stockxproduct;
let stockxparams = {
    limit: 5
};

class productclass {
    constructor(lowestask, highestbid, style, model, brand, imageurl, gender, category, description) {
        this.price = lowestask;
        this.highestbid = highestbid;
        this.style = style;
        this.model = model;
        this.brand = brand;
        this.category = category;
        this.gender = gender;
        this.imageurl = imageurl;
        this.description = description;
    }

}

function stockxproducthandler (products) {
    stockxproduct = new productclass(products["0"].lowest_ask, 
                                     products["0"].highest_bid,
                                     products["0"].searchable_traits.Style,
                                     products["0"].model, 
                                     products["0"].brand, 
                                     products["0"].thumbnail_url, 
                                     products["0"].gender, 
                                     products["0"].category, 
                                     products["0"].description);
    console.log(products);
}

function generatestockxhtml (name) {
    let htmlstr;
    htmlstr = `<html><head><style type="text/css">@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@600&display=swap'); body {margin-top:15px;} p{font-family: 'Montserrat', sans-serif;font-size: 1em;} .shoepic{width: 14em;}</style></head><body><p>Name: ${name}</p><p>SKU/Style: ${stockxproduct.style}</p><p style="color: red;">Highest Bid: $${stockxproduct.highestbid}</p><p style="color:lime;">Lowest Ask: $${stockxproduct.price}</p><p>Model: ${stockxproduct.model}</p><p>Brand: ${stockxproduct.brand}</p><img class="shoepic" src="${stockxproduct.imageurl}"/><br><p style="font-size: 1em;">${stockxproduct.description}</p></body></html>`;
    return htmlstr;
}

app.get("/getstockx/:name", (req, res) => {
    console.log(req.params);
    try {
        stockX.newSearchProducts(req.params.name, stockxparams)
        .then((products) => {
            stockxproducthandler(products); 
            console.log(stockxproduct);
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
            res.setHeader('Access-Control-Allow-Credentials', true); // If needed
            res.send(generatestockxhtml(req.params.name));
        }).catch(err => console.log(`Error searching: ${err.message}`));
        
    }
    catch(e){
        console.log('Error: ' + e.message);
    }
});
app.listen(process.env.PORT || 8080, () => {console.log("Running on Heroku, port 8080...")});