import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
  NonAttribute,
  HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyAddAssociationsMixin,
  HasManySetAssociationsMixin,
  HasManyRemoveAssociationMixin,
  HasManyRemoveAssociationsMixin,
  HasManyHasAssociationMixin,
  HasManyCountAssociationsMixin,
  HasManyHasAssociationsMixin,
  HasManyCreateAssociationMixin,
  Association
} from "sequelize";
import { sequelize } from "../services/dbConnection";
import bcrypt from "bcrypt";
import Post from "./post.model";

class User extends Model<InferAttributes<User , {omit : 'posts'}>, InferCreationAttributes<User, { omit: 'posts' }>> {
  declare id: CreationOptional<number>;
  declare email: string;
  declare password: string;
  declare username: string;
  declare token: CreationOptional<string>;
  declare posts?: NonAttribute<Post[]>;

  declare getProjects: HasManyGetAssociationsMixin<Post>;
  declare addPost: HasManyAddAssociationMixin<Post, number>;
  declare addPosts: HasManyAddAssociationsMixin<Post, number>;
  declare setPosts: HasManySetAssociationsMixin<Post, number>;
  declare removePost: HasManyRemoveAssociationMixin<Post, number>;
  declare removePosts: HasManyRemoveAssociationsMixin<Post, number>;
  declare hasPost: HasManyHasAssociationMixin<Post, number>;
  declare hasPosts: HasManyHasAssociationsMixin<Post, number>;
  declare countPosts: HasManyCountAssociationsMixin;
  declare createPost: HasManyCreateAssociationMixin<Post, 'ownerId'>;

  declare static associations: {
    projects: Association<User, Post>;
  };

}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: "cette email est déja utilisée",
      validate : {
        isEmail : { msg : 'Veuillez rentrer une adresse email valide'}
      }
    },
    username: { type: DataTypes.STRING, allowNull: false, unique: 'ce nom d\'utilisateur est déja utilisée' },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value: string) {
        try {
          const hash = bcrypt.hashSync(value, 10);
          this.setDataValue("password", hash);
        } catch (error) {
          console.log(error);
        }
      },
    },
    token: {
      type: DataTypes.VIRTUAL,
    },
  },
  { 
    tableName : 'users',
    sequelize }
);

User.hasMany(Post, {
  sourceKey: 'id',
  foreignKey: 'ownerId',
  as: 'posts'
});

Post.belongsTo(User,{foreignKey:'ownerId',targetKey:'id'})



export default User;