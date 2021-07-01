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
    constructor(price, model, brand, imageurl, gender, category, description) {
        this.price = price;
        this.model = model;
        this.brand = brand;
        this.category = category;
        this.gender = gender;
        this.imageurl = imageurl;
        this.description = description;
    }

}

function stockxproducthandler (products) {
    stockxproduct = new productclass(products["0"].price, 
                                     products["0"].model, 
                                     products["0"].brand, 
                                     products["0"].thumbnail_url, 
                                     products["0"].gender, 
                                     products["0"].category, 
                                     products["0"].description);
    console.log(products);
}

app.get("/getstockx/:name", (req, res) => {
    console.log(req.params);
    try {
        stockX.newSearchProducts(req.params.name, stockxparams)
        .then((products) => {
            stockxproducthandler(products); 
            console.log(stockxproduct);
            res.send(stockxproduct);
        }).catch(err => console.log(`Error searching: ${err.message}`));
        
    }
    catch(e){
        console.log('Error: ' + e.message);
    }
});
app.listen(8080, () => {console.log("Running on port 8080...")});