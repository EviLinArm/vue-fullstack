const genericCrud = require("./generic.controllers");
const { Product } = require("../model");


module.exports = {
    ...genericCrud(Product),
};
