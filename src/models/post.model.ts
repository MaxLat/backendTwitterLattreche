import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
  ForeignKey,
  NonAttribute,
} from "sequelize";
import { sequelize } from "../services/dbConnection";
import User from "./user.model";

// order of InferAttributes & InferCreationAttributes is important.
class Post extends Model<InferAttributes<Post>, InferCreationAttributes<Post>> {
  // 'CreationOptional' is a special type that marks the field as optional
  // when creating an instance of the model (such as using Model.create()).
  declare id: CreationOptional<number>;
  declare content: string;
  declare ownerId: ForeignKey<User['id']>;
  declare owner?: NonAttribute<User>;
  declare isEditable :  CreationOptional<boolean>;
  declare imageUrl : CreationOptional<string>
}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.STRING(280),
      allowNull: false,
    },
    isEditable: {
      type: DataTypes.VIRTUAL,
    },
    imageUrl : {
      type : DataTypes.STRING
    }
  },
  {
    tableName: "posts",
    sequelize,
  }
);
export default Post;