export default (sequelize, DataTypes, Model) => {

  class Review extends Model {}

  Review.init({
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      // createdAt: {
      //   type: DataTypes.STRING,
      //   allowNull: false
      // },
    }, {
      sequelize,
      modelName: 'review'
    });
    
    return Review;
};