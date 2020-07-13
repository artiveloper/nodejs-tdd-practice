// dummy data
let users = [
    {
        id: 1,
        name: 'alice'
    },
    {
        id: 2,
        name: 'bek'
    },
    {
        id: 3,
        name: 'chris'
    },
];

// api 로직
const index = function (req, res) {
    req.query.limit = req.query.limit || 10;
    const limit = parseInt(req.query.limit, 10);
    if (Number.isNaN(limit)) {
        return res.status(400).end();
    }

    res.json(users.slice(0, limit));
};

const show = function (req, res) {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) {
        return res.status(400).end();
    }
    const user = users.find(user => user.id === id);
    if (!user) {
        return res.status(404).end();
    }

    res.json(user);
};

const destroy = function (req, res) {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) {
        return res.status(400).end();
    }
    users = users.filter(user => user.id !== id);

    res.status(204).end();
};

const create = function (req, res) {
    const name = req.body.name;

    if (!name) {
        return res.status(400).end();
    }

    const isConflict = users.find(user => user.name === name);
    if (isConflict) {
        return res.status(409).end();
    }

    const id = Date.now();
    const user = {id, name}
    users.push(user);

    res.status(201).json(user);
};

const update = function (req, res) {
    const id = parseInt(req.params.id, 10);
    const name = req.body.name;

    if (Number.isNaN(id) || !name) {
        return res.status(400).end();
    }

    let user = users.find(user => user.id === id);
    if (!user) {
        return res.status(404).end();
    }

    const isConflict = users.find(user => user.name === name);
    if (isConflict) {
        return res.status(409).end();
    }

    user.name = name;

    res.json(user);
};

module.exports = {
    index,
    show,
    destroy,
    create,
    update,
};
