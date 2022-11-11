const genericCrud = require("./generic.controllers");
const { Order } = require("../model");


module.exports = {
    ...genericCrud(Order),
};
