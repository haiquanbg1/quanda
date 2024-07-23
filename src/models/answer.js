"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Answer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Answer.belongsTo(models.Question, {
        foreignKey: "question_id",
      });
      Answer.belongsTo(models.User, {
        foreignKey: "user_id",
      });
      Answer.hasMany(models.Comment, {
        foreignKey: "answer_id",
      });
    }
  }
  Answer.init(
    {
      question_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
      content: DataTypes.TEXT,
      vote: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Answer",
      tableName: "answers",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return Answer;
};
