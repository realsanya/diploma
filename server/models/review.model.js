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
          model: 'users',
          key: 'id',
        },
        allowNull: false,
      },
      articleId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'articles',
          key: 'id',
        },
        allowNull: false,
      }
    }, {
      sequelize,
      modelName: 'review'
    });
    
    return Review;
};