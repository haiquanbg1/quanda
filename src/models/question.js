"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Question.hasMany(models.Answer, {
        foreignKey: "question_id",
      });
    }
  }
  Question.init(
    {
      user_id: DataTypes.INTEGER,
      title: DataTypes.STRING,
      content: DataTypes.TEXT,
      vote: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Question",
      tableName: "questions",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return Question;
};
