"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbConnection_1 = require("../services/dbConnection");
const bcrypt_1 = __importDefault(require("bcrypt"));
const post_model_1 = __importDefault(require("./post.model"));
// order of InferAttributes & InferCreationAttributes is important.
class User extends sequelize_1.Model {
}
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: "cette email est déja utilisée"
    },
    username: { type: sequelize_1.DataTypes.STRING, allowNull: false, unique: 'ce nom d\'utilisateur est déja utilisée' },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        set(value) {
            try {
                const hash = bcrypt_1.default.hashSync(value, 10);
                this.setDataValue("password", hash);
            }
            catch (error) {
                console.log(error);
            }
        },
    },
    token: {
        type: sequelize_1.DataTypes.VIRTUAL,
    },
}, {
    tableName: 'users',
    sequelize: dbConnection_1.sequelize
});
User.hasMany(post_model_1.default, {
    sourceKey: 'id',
    foreignKey: 'ownerId',
    as: 'posts' // this determines the name in `associations`!
});
post_model_1.default.belongsTo(User, { foreignKey: 'ownerId', targetKey: 'id' });
exports.default = User;
