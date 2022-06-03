"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbConnection_1 = require("../services/dbConnection");
// order of InferAttributes & InferCreationAttributes is important.
class Post extends sequelize_1.Model {
}
Post.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    content: {
        type: sequelize_1.DataTypes.STRING(280),
        allowNull: false,
    },
    isEditable: {
        type: sequelize_1.DataTypes.VIRTUAL,
    },
    imageUrl: {
        type: sequelize_1.DataTypes.STRING
    }
}, {
    tableName: "posts",
    sequelize: dbConnection_1.sequelize,
});
exports.default = Post;
