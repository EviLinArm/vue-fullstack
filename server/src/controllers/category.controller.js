const genericCrud = require ('./generic.controllers.js');
const { Category } = require ('../model/index.js');

module.exports = {
    ...genericCrud(Category),
};
