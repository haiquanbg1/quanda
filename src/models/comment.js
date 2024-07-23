'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Comment.belongsTo(models.User, {
        foreignKey: "user_id"
      });

      Comment.belongsTo(models.Answer, {
        foreignKey: "answer_id"
      });
    }
  }
  Comment.init({
    user_id: DataTypes.INTEGER,
    content: DataTypes.TEXT,
    answer_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Comment',
    tableName: 'comments',
    createdAt: "created_At",
    updatedAt: "updated_At",
  });
  return Comment;
};