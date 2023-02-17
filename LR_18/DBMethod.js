module.exports = {
    gets(Model) {
        return Model.findAll({
            raw: true
        });
    }
}