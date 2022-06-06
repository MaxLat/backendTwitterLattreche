"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
class BaseRepository {
    model;
    // le model devrait être de type ModelCtor, mais sequelize-typescript n'est pas encore à jour.... (src : slack de sequelize 30/05/2022 )
    constructor(model) {
        this.model = model;
    }
    async create(objectValue) {
        return await this.model.create(objectValue);
    }
    async findOne(where) {
        return this.model.findOne({ where: where });
    }
    async findAll(attributes = null) {
        if (attributes) {
            return await this.model.findAll({ attributes: attributes });
        }
        return await this.model.findAll();
    }
    async remove(where) {
        return await this.model.destroy({ where: where });
    }
    async update(toUpdate, where) {
        return await this.model.update(toUpdate, { where: where });
    }
}
exports.BaseRepository = BaseRepository;
