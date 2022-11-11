const genericCrud = require ('./generic.controllers.js');
const { Category } = require ('../model/index.js');

const relations = {
    getAll: 'products',
    get: 'products'
}

module.exports = {
    ...genericCrud(Category, relations),
};
