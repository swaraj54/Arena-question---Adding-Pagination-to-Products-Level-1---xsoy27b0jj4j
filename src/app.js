const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { off } = require('../models/product.js');
const products = require("../models/product.js");


// Import routes

//Router Middlewares
app.use(express.json());



/* Some Example of Type of Query

1. /?limit=5
2. /?offset=3
3. /?offset=4&limit=4

*/


//default value for limit is 5 and offset is 0
//This route should return an array of _id of all the element that need to be rturned.
//output id can be in any order.

app.get("/", async function (req, res) {
    try {
        const limit = parseInt(req.query.limit) || 5;
        const offset = parseInt(req.query.offset) || 0;
        const productss = await products.find()
            .skip(limit * offset)
            .limit(limit)
            .select('_id');

        const ids = productss.map(product => product._id);
        res.json(ids);
    } catch (error) {
        res.send(error);
    }
});

module.exports = app;

