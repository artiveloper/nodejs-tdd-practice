const models = require('../src/models');

module.exports = () => {
    return models.sequelize.sync({force: true});
}
