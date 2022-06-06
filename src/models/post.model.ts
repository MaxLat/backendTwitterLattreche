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

class Post extends Model<InferAttributes<Post>, InferCreationAttributes<Post>> {
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
      type: DataTypes.STRING(),
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