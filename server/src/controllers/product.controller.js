const genericCrud = require("./generic.controllers");
const { Product } = require("../model");

const relations = {
    getAll: 'category',
    get: 'category'
}

module.exports = {
    ...genericCrud(Product, relations),
};
