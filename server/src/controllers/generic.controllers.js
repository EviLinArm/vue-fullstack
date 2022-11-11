const boom = require("boom");

const genericCrud = (model, { get = '', getAll = '' }) => ({
    async get({ params: { id } }, res) {
        try {
            const item = await model.findById(id).populate(get.get);
            return res.status(200).send(item);
        } catch (e) {
            return res.status(400).send(boom.boomify(e));
        }
    },
    async getAll(_, res)  {
        try {
            const items = await model.find().populate(getAll.getAll);
            return res.status(200).send(items);
        } catch (e) {
            return res.status(400).send(boom.boomify(e));
        }
    },
    async create({ body }, res)  {
        try {
            const item = new model(body);
            const newItem = await item.save();
            return res.status(200).send(newItem);
        } catch (e) {
            return res.status(400).send(boom.boomify(e));
        }
    },
    async update({ params: { id }, body }, res)  {
        try {
            const item = await model.findByIdAndUpdate(id, body, { new: true });
            return res.status(200).send(item);
        } catch (e) {
            return res.status(400).send(boom.boomify(e));
        }
    },
    async delete({ params: { id } }, res)  {
        try {
            await model.findByIdAndDelete(id);
            return res.status(200).send({ status: 'OK', message: 'Product deleted' });
        } catch (e) {
            return res.status(400).send(boom.boomify(e));
        }
    },
})

module.exports = genericCrud;