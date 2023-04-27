export default (sequelize, DataTypes, Model) => {

  class Review extends Model {}

  Review.init({
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user',
          key: 'id',
        },
        allowNull: false,
      },
      articleId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'article',
          key: 'id',
        },
        allowNull: false,
      },
      text: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    }, {
      sequelize,
      modelName: 'review',
      freezeTableName: true,
    });
    
    return Review;
};